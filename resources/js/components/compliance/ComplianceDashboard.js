import React, { Component } from 'react';
import './ComplianceDashboard.scss';
import axiosInstance from '../../api/api';
import { Segment, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeSubLeftNav, selectControlFunction, selectCatalogSection, selectStandard, setParentSections, setCompanyUsers } from '../../actions';
import isEmpty from 'lodash.isempty';

class ComplianceDashboard extends Component {

    state = {
        errors: [],
        loading: false,
        apps: []
    }

    componentDidMount() {
        if (isEmpty(this.props.user)) {
            this.props.history.push('/login');
        }
        else if (isEmpty(this.props.company)) {
            this.props.history.push('/select-organization');
        }
        else {
            this.props.closeSubLeftNav();

            const { standards } = this.props;
            if (!isEmpty(standards[0])) {
                this.switchCompalance(standards[0]);
            }
        }
    }

    switchCompalance = std => {
        const { company, selectStandard, history, token } = this.props;
        selectStandard(std);

        this.setState({ errors: [], openSwitchCompl: '' });

        axiosInstance.post(`/api/user/compliance/parent-sections`, {
            standards: [std.standard_id],
        })
            .then(e => {

                this.setState({
                    errors: [],
                });

                this.props.setParentSections(e.data.parent_sections);
                this.props.setCompanyUsers(e.data.users);

                history.push(`/${company.slug}/compliance/${std.standard.slug}`);
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

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { loading } = this.state;
        const { leftnav } = this.props;

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >
                <div className="page__header">
                    <div className="heading">
                        Loading...
                    </div>
                </div>

                <div style={{ margin: '15px 15px 55px 15px' }}>



                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    standards: state.compliance.standards,
});
export default connect(mapStateToProps, { closeSubLeftNav, selectControlFunction, selectCatalogSection, selectStandard, setParentSections, setCompanyUsers })(ComplianceDashboard);
