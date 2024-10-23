import React, { Component } from 'react';
import './LeftNav.scss';
import { clearUser, clearToken, clearPWDRotation, toggleSubLeftNave, openSubLeftNave, closeSubLeftNav, selectControlFunction, toggleSideMenuXButton, selectStandard, setParentSections, setCompanyUsers } from '../../../actions';
import { deleteStore } from '../../../store/localStorage';
import { connect } from 'react-redux';
import { Image, Transition } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { IoIosAnalytics } from "react-icons/io";
import { VscFileSubmodule, VscDashboard } from "react-icons/vsc";
import { AiOutlineBug } from "react-icons/ai";
import _ from 'lodash';
import axiosInstance from '../../../api/api';

class LeftNav extends Component {

    state = {
        catalog_menu_toggle: true,
        in_compaliance: false,
        in_dashboard: false,
    }

    componentDidMount() {
        // this.props.closeSubLeftNav();
        // this.props.selectControlFunction({});
    }

    componentDidUpdate(prevProps) {

        const { company, location } = this.props;

        let check = _.startsWith(location.pathname, `/${company.slug}/compliance/`);

        if (this.state.in_compaliance !== check) {
            this.setState({ in_compaliance: check });
        }

        let dbcheck = _.startsWith(location.pathname, `/${company.slug}/organization-settings/`);

        if (this.state.in_dashboard !== dbcheck) {
            this.setState({ in_dashboard: dbcheck });
        }


    }

    logOut = () => {
        axiosInstance.get('/api/auth/logout').then(e => {
            this.props.clearUser();
            this.props.clearPWDRotation();
            this.props.clearToken();
            deleteStore();
        }).catch(err => {
            this.props.clearUser();
            this.props.clearPWDRotation();
            this.props.clearToken();
            deleteStore();
        });
    }

    handleMenuStatus = leftnav => {
        return leftnav.open ? 'left__nav open__app' : 'left__nav close__app';
    }

    displayTopLogo = leftnav => {
        return leftnav.open ? <Image src='/images/logo/motion-grc.png' /> : <Image src='/images/logo/cjshortprimary.png' />;
    }

    handleCatalogMenuVisibility = () => this.setState((prevState) => ({ catalog_menu_toggle: !prevState.catalog_menu_toggle }));

    // handleCatalogMenuVisibility = () => {
    //     this.props.openSubLeftNave();
    // }

    listControlFunctions = full => {
        const { standards, leftnav } = this.props;

        // className={leftnav.control_function.id === func.id ? 'active' : ''}
        const menu_status = (full ? 'sb__open' : 'sb__close')

        return (<ul>
            {
                _.map(standards, standard => {
                    const nav_class = (leftnav.standard.standard_id === standard.standard_id && leftnav.open_sub ? 'active' : '');
                    return (<li key={standard.standard_id}>
                        <a className={`${nav_class} ${menu_status}`} onClick={() => { this.handleStandard(standard) }}>{full ? standard.standard.expand_name : standard.standard.collapse_name}</a>
                    </li>)
                })
            }
        </ul>)
    }

    listControlFunctionsNew = full => {
        const { standards, leftnav } = this.props;

        // className={leftnav.control_function.id === func.id ? 'active' : ''}
        const menu_status = (full ? 'sb__open' : 'sb__close')

        return (<ul>
            {
                _.map(standards, standard => {
                    const nav_class = (leftnav.standard.standard_id === standard.standard_id ? 'active' : '');
                    return (<li key={standard.standard_id}>
                        <a className={`${nav_class} ${menu_status}`} onClick={() => { this.navigateStandard(standard) }}>{full ? standard.standard.expand_name : standard.standard.collapse_name}</a>
                    </li>)
                })
            }
        </ul>)
    }

    navigateStandard = std => {
        const { company, selectStandard, history, token } = this.props;
        selectStandard(std);

        // load sections
        this.setState({ errors: [] });

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

    handleStandard = standard => {

        const { leftnav } = this.props;

        if (leftnav.standard.standard_id === standard.standard_id) {
            this.props.toggleSubLeftNave(!leftnav.open_sub);
        }
        else {

            this.props.selectStandard(standard);

            this.props.toggleSubLeftNave(true);
            // load sections
            this.setState({ errors: [] });

            const { maturity_levels, control_models, asset_types } = this.props;

            axiosInstance.post(`/api/user/compliance/parent-sections`, {
                standards: [standard.standard_id],
            })
                .then(e => {

                    this.setState({
                        errors: [],
                    });

                    this.props.setParentSections(e.data.parent_sections);
                    this.props.setCompanyUsers(e.data.users);
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

    }

    handleControlFunction = func => {
        this.props.selectControlFunction(func);
        this.props.openSubLeftNave();

        const { path } = this.props.match;
        if (path === '/:name/compliance') {
            this.props.toggleSideMenuXButton(false);
        }
        else {
            this.props.toggleSideMenuXButton(true);
        }
    }

    renderMenu = (leftnav, company) => {

        const { catalog_menu_toggle, in_compaliance, in_dashboard } = this.state;

        return leftnav.open
         ? <ul>
            <li>
                <NavLink exact activeClassName="active" className={in_dashboard ? 'active' : ''} to="/dashboard">Home</NavLink>
            </li>

            <li>
                <NavLink exact activeClassName="active" to="/analytics">Analytics</NavLink>
            </li>

            <li>
            <NavLink exact={false} activeClassName="active" to={`/${company.slug}/workbench/list`} >WorkBench</NavLink>
            </li>

            <li>
                <NavLink exact activeClassName="active" className={in_compaliance ? 'active' : ''} to={`/${company.slug}/compliance1`}>Standards</NavLink>
                <Transition.Group animation="slide down" duration="500">

                    {this.listControlFunctionsNew(true)}
                    {/*this.listControlFunctions(true)*/}
                </Transition.Group>
            </li>

            {
                /**
                 * <li>
                <NavLink exact={false} activeClassName="active" to={`/${company.slug}/compliancev2`} >Compliance 2.0 <sup>beta</sup></NavLink>
            </li>
                 */
            }

            {
                /** hide files form now
                 * <li>
                <NavLink exact={false} activeClassName="active" to={`/${company.slug}/files/${company.document.enc_id}`} >Files</NavLink>
            </li>
                 */
            }
            <li>
                <NavLink exact={false} activeClassName="active" to={`/${company.slug}/filemanager/home`} >File Manager</NavLink>
            </li>



            {
                /**
            <li>
                <NavLink exact={false} activeClassName="active" to={`/${company.slug}/device-watch`} >Device Watch</NavLink>
            </li>
                */
            }
            <li>
                <NavLink exact={false} activeClassName="active" to={`/${company.slug}/issue-tracker`} >Issue Tracker</NavLink>
            </li>

            <li>
                <NavLink exact={false} activeClassName="active" to={`/${company.slug}/assets`} >Assets</NavLink>
            </li>
            <li>
                <NavLink exact={false} activeClassName="active" to={`/${company.slug}/reports`} >Reports</NavLink>
            </li>

        </ul> :

            <ul>
                <li>
                    <NavLink exact activeClassName="active" to="/dashboard"><VscDashboard /></NavLink>
                </li>

                <li>
                    <NavLink exact activeClassName="active" to="/analytics"><IoIosAnalytics /></NavLink>
                </li>

                <li>
                    <NavLink exact activeClassName="active" to={`/${company.slug}/compliance`}><MdDashboard /></NavLink>
                    <Transition.Group animation="slide down" duration="500">
                        {this.listControlFunctions(false)}
                    </Transition.Group>
                </li>

               {
                   /**
                    *  <li>
                    <NavLink exact activeClassName="active"  to={`/${company.slug}/compliancev2`}><MdDashboard /></NavLink>
                </li>
                    */
               }

                {
                    /** hide files for now
                     * <li>
                    <NavLink exact={false} activeClassName="active" to={`/${company.slug}/files/${company.document.enc_id}`} > <VscFileSubmodule /></NavLink>
                </li>
                     */
                }
                <li>
                    <NavLink exact={false} activeClassName="active" to={`/${company.slug}/filemanager/home`} > <VscFileSubmodule /></NavLink>
                </li>


                {
                    /*
  <li>
                     <NavLink exact={false} activeClassName="active" to={`/${company.slug}/device-watch`} > <IoIosSync /></NavLink>
                 </li>

                    */
                }
                <li>
                    <NavLink exact={false} activeClassName="active" to={`/${company.slug}/issue-tracker`} > <AiOutlineBug /></NavLink>
                </li>
                <li>
                    <NavLink exact={false} activeClassName="active" to={`/${company.slug}/assets`} >AST</NavLink>
                </li>
                <li>
                    <NavLink exact={false} activeClassName="active" to={`/${company.slug}/reports`} >RST</NavLink>
                </li>
            </ul>;
    }

    render() {

        const { leftnav, company } = this.props;

        return (
            <div className={this.handleMenuStatus(leftnav)}>
                <div className="menus">
                    {this.renderMenu(leftnav, company)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    standards: state.compliance.standards,
    maturity_levels: state.compliance.maturity_levels,
    asset_types: state.compliance.asset_types,
    control_models: state.compliance.control_models
});

export default withRouter(connect(mapStateToProps, { clearUser, clearToken, clearPWDRotation, toggleSubLeftNave, openSubLeftNave, closeSubLeftNav, selectControlFunction, selectStandard, toggleSideMenuXButton, setParentSections, setCompanyUsers })(LeftNav));
