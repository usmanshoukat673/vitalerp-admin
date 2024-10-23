import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { clearUser, clearToken, closeSubLeftNav, selectControlFunction, selectCatalogSection } from '../../actions';
import AccountControlsInfoChart from './info/AccountControlsInfoChart';
import _ from 'lodash';
import CCActivities from '../compliance/cc-category/CCActivities';
import './InfoDashboard.scss';
import DeviceLocationFixer from './DeviceLocationFixer';
import { BiAlbum } from "react-icons/bi";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from 'semantic-ui-react';
import axiosInstance from '../../api/api';
import VisitDashboardBreadcrum from './VisitDashboardBreadcrum';


class InfoDashboard extends Component {

    state = {
        errors: [],
        loading: false,
        implemented_ctrls: 0,
        partially_imple_ctrls: 0,
        applicable_ctrls: 0,
        not_applicable_ctrls: 0,
        activities: [],
        not_applicable_controls: [],
        partially_imple_controls: [],
        implemented_controls: [],
        toggle_na_controls: false,
        toggle_pi_controls: false,
        toggle_im_controls: false,
    }

    componentDidMount() {
        if (_.isEmpty(this.props.user)) {
            this.props.history.push('/login');
        }
        else if (_.isEmpty(this.props.company)) {
            this.props.history.push('/select-organization');
        }
        else {

            this.props.closeSubLeftNav();
            this.props.selectControlFunction({});
            this.props.selectCatalogSection({});

            this.loadAccuntInfo();
        }
    }

    loadAccuntInfo = () => {
        const { standards } = this.props;

        const stds = _.map(standards, std => (std.standard_id));

        this.setState({ errors: [], loading: true });

        axiosInstance.post(`/api/user/compliance/all-standard-info`, {
            standards: stds,
        })
            .then(e => {

                this.setState({
                    errors: [],
                    loading: false,
                    implemented_ctrls: e.data.implemented_ctrls,
                    applicable_ctrls: e.data.applicable_ctrls,
                    not_applicable_ctrls: e.data.not_applicable_ctrls,
                    partially_imple_ctrls: e.data.partially_imple_ctrls,
                    // documents: e.data.documents,
                    activities: e.data.activities,
                    not_applicable_controls: e.data.not_applicable_controls,
                    partially_imple_controls: e.data.partially_imple_controls,
                    implemented_controls: e.data.implemented_controls,
                });

            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                }
            });
    }

    handleWebhook = () => {
        const { company, token } = this.props;

        this.setState({ errors: [], loading: true });

        axiosInstance.post(`/api/user/automation/send-webhook-calls`)
            .then(e => {

                this.setState({
                    errors: [],
                    loading: false,
                });

            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                }
            });
    }

    toggleNAControls = () => {
        this.setState({ toggle_na_controls: !this.state.toggle_na_controls });
    }

    togglePIControls = () => {
        this.setState({ toggle_pi_controls: !this.state.toggle_pi_controls });
    }

    toggleIMControls = () => {
        this.setState({ toggle_im_controls: !this.state.toggle_im_controls });
    }


    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { leftnav,
            company,
            token,
            standards,
            new_location,
            device_newly_assigned
        } = this.props;

        const {
            loading,
            implemented_ctrls,
            partially_imple_ctrls,
            applicable_ctrls,
            not_applicable_ctrls,
            activities,
            not_applicable_controls,
            partially_imple_controls,
            implemented_controls,
            toggle_na_controls,
            toggle_pi_controls,
            toggle_im_controls,
        } = this.state;

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >

                <div className="infodb__mainbd">
                    <div className="infodb__breadcrum"><VisitDashboardBreadcrum /> {' > '} {company.name}</div>

                    <div className="infodb__header">
                        <div className="__name">{company.name}</div>
                        <div className="__actions">

                        </div>
                    </div>
                </div>



                <div className="db_compliance__categories">

                    <div className="cc_overview__panal">
                        <div className="__piechart">
                            <div className="__pieheading">Overview</div>
                            <AccountControlsInfoChart series={[applicable_ctrls, not_applicable_ctrls, implemented_ctrls, partially_imple_ctrls, 0]} />
                        </div>
                        <div className="__pienotes">
                            <div ><span className="n__applicable __count">{applicable_ctrls}</span> Applicable</div>
                            <div onClick={this.toggleNAControls}> <span className="n__not_applicable __count">{not_applicable_ctrls}</span> <span className="__linked">Not Applicable</span></div>
                            <div onClick={this.toggleIMControls}> <span className="n__fullyimpl __count">{implemented_ctrls}</span> <span className="__linked">Implemented</span></div>
                            <div onClick={this.togglePIControls}><span className="n__partimpl __count">{partially_imple_ctrls}</span> <span className="__linked">Partially Implemented</span></div>
                            <div> <span className="n__requiredatten __count">0</span> Excluded</div>
                        </div>

                        <div className="__totaldocs">
                            <div className="__numberof_docs">
                                <div>{_.size(standards)}</div>
                                <div>Standards</div>
                            </div>
                        </div>

                        <CCActivities c_title={true} activities={activities} />

                    </div>

                    {
                        toggle_na_controls && <div className="controls__bucket">
                            <div className="at__bucket__header">
                                <div>
                                    Not Applicable Controls
                                </div>
                                <div>
                                    <IconButton onClick={this.toggleNAControls}>
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <div className="at__bucket__body">
                                {
                                    _.map(not_applicable_controls, na_control => (
                                        <div className="__activity__item" key={na_control.id}>
                                            <div className="__listitem__at_icon">
                                                <BiAlbum />
                                            </div>

                                            <div className="__listitem__at_secion">
                                                <div className="__the__at">
                                                    {`${na_control.control.number}: ${na_control.control.name}`}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }


                    {toggle_im_controls && <div className="controls__bucket">
                        <div className="at__bucket__header">

                            <div>
                                Implemented
                            </div>
                            <div>
                                <IconButton onClick={this.toggleIMControls}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className="at__bucket__body">
                            {
                                _.map(implemented_controls, na_control => (
                                    <div className="__activity__item" key={na_control.id}>
                                        <div className="__listitem__at_icon">
                                            <BiAlbum />
                                        </div>

                                        <div className="__listitem__at_secion">
                                            <div className="__the__at">
                                                {`${na_control.control.number}: ${na_control.control.name}`}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                    }



                    {
                        toggle_pi_controls && <div className="controls__bucket">
                            <div className="at__bucket__header">

                                <div>
                                    Partially Implemented
                                </div>
                                <div>
                                    <IconButton onClick={this.togglePIControls}>
                                        <CloseIcon />
                                    </IconButton>
                                </div>

                            </div>
                            <div className="at__bucket__body">
                                {
                                    _.map(partially_imple_controls, na_control => (
                                        <div className="__activity__item" key={na_control.id}>
                                            <div className="__listitem__at_icon">
                                                <BiAlbum />
                                            </div>

                                            <div className="__listitem__at_secion">
                                                <div className="__the__at">
                                                    {`${na_control.control.number}: ${na_control.control.name}`}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    }



                </div>

                {new_location && !device_newly_assigned && <DeviceLocationFixer token={token} company={company} />}

                <div>
                    <Button onClick={this.handleWebhook} primary>Test Rete Webhook</Button>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    leftnav: state.leftnav,
    token: state.token.activeToken,
    company: state.orgs.company,
    user: state.user.activeUser,
    standards: state.compliance.standards,
    device_newly_assigned: state.user.device_newly_assigned,
    new_location: state.orgs.new_location,
});

export default withRouter(connect(mapStateToProps, { clearUser, clearToken, closeSubLeftNav, selectControlFunction, selectCatalogSection })(InfoDashboard));
