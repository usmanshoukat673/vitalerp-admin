import React, { Component } from 'react';
import { Button, Modal, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    setCompany,
    clearUser,
    clearToken,
    setCompStandards,
    setAssetTypes,
    setControlModels,
    setMaturityLevel,
    setDeviceAssignStatus,
    setLocationStatus,
    selectStandard,
    setCompanyLocations,
    setSelectedTask,
    setAllProjects,
    setAllTasks,
    setCompanyUsers,
    setFieldTypes,
    setStandardFamilies,
    setStandardVersions,
    setStandardFocuses,
    setStandardStatutes,
    setStripeKey,
    resetCartSummary,
    setPackagesPopupStatus,
    setCompanyPolicyPortal,
    setCreateNewOrg,
    setCompanyTeams,
    setStates,
    setCountries,
    setNaicsCodes,
    setSuppliersCount,
    setEthnicities,
    setCompliantReqs,
    setSecurityLevels,
    setCompanySuppliers,
    setActiveSupplier,
} from '../../actions';
import { deleteStore } from '../../store/localStorage';
import CreateNewOrgnization from './CreateNewOrgnization';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { AiFillCheckCircle } from 'react-icons/ai';
// import IdentificationLogo from '../auth/IdentificationLogo';
import { Box, TextField, Typography } from '@mui/material';

class ChooseOrganization extends Component {

    state = {
        companies: [],
        company: {},
        errors: [],
        loading: false,
        search_loading: false,
        show_mfa_required: false,
        account_disabled: false,
        determine_visibility: true,
    };

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.handleSelectOrg = this.handleSelectOrg.bind(this);
    }

    componentDidMount() {
        this.setState({ companies: this.props.companies, switch_company: '' });
        const { company } = this.props;
        if (_.isEmpty(company)) {
            const default_company = this.props.companies[0];
            this.setState({ company: default_company });
            this.props.setCompany(default_company);


        }
        else {
            this.setState({ company });
        }

        if (_.size(this.props.companies) === 1) {
            this.handleSelectOrg(this.props.companies[0]);
        }
        else{
            this.setState({ determine_visibility: false });
        }

        const { action } = this.props.match.params;

        this.props.setCreateNewOrg({
            open: (action === 'new' ? true : false),
            in_org: true
        });
    }

    handleSelectOrg(company) {
        const { user, new_device } = this.props;
        if (company.required_mfa && !user.mfa_enabled) {
            // do not force MFA for user for now as twilio is not working
            // this.setState({ show_mfa_required: true });
        }
        else if (company.disabled === 1) {
            this.setState({ account_disabled: true });
        }
        else {
            this.setState({ errors: [], loading: true, switch_company: company.id, company: company });
            this.props.setCompany(company);

            const { token, cookies } = this.props;

            let request_ip = cookies.get('__REQUEST_IP__');

            axios.post('/api/user/org/record/user-login', { comp_id: company.id, request_ip: request_ip, new_device: new_device }, {
                headers: {
                    'Authorization': `${token.token_type} ${this.props.token.access_token}`
                }
            }).then(e => {

                this.setState({ errors: [], loading: false, switch_company: '' });

                cookies.set(`__REQUEST_IP__`, e.data.requested_ip, { path: '/', domain: window.location.host })

                this.props.setCompStandards(e.data.standards);
                this.props.setControlModels(e.data.control_models);
                this.props.setAssetTypes(e.data.asset_types);
                this.props.setMaturityLevel(e.data.maturity_level);
                this.props.setDeviceAssignStatus(e.data.device_status);
                this.props.setLocationStatus(e.data.new_location);
                this.props.setCompanyLocations(e.data.locations);
                this.props.selectStandard({});
                this.props.setSelectedTask({});
                this.props.setAllProjects(e.data.projects);
                this.props.setAllTasks(e.data.tasks);
                this.props.setCompanyUsers(e.data.users);
                this.props.setCompanyTeams(e.data.teams);
                this.props.setFieldTypes(e.data.field_types);
                this.props.setStandardFamilies(e.data.std_families);
                this.props.setStandardVersions(e.data.std_versions);
                this.props.setStandardFocuses(e.data.std_focuses);
                this.props.setStandardStatutes(e.data.std_statutes);
                this.props.setStripeKey(e.data.publishable_key);
                this.props.setCompanyPolicyPortal(e.data.policy_portal);
                this.props.setStates(e.data.states);
                this.props.setCountries(e.data.countries);
                this.props.setNaicsCodes(e.data.naics_codes);
                this.props.setEthnicities(e.data.ethnicities);
                this.props.setCompliantReqs(e.data.compliant_reqs);
                this.props.setSecurityLevels(e.data.security_levels);
                this.props.setSuppliersCount(e.data.suppliers_count);
                this.props.setCompanySuppliers(e.data.company_suppliers);
                this.props.resetCartSummary();
                this.props.setPackagesPopupStatus(false);
                this.props.setActiveSupplier(e.data.active_supplier);

                this.props.history.push(`/dashboard`);
                // this.props.history.push(`/${company.slug}/compliance-stack`);

            }).catch(err => {
                this.setState({ errors: [], loading: false, switch_company: '' });
                if (err.response.status === 500) {
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }
                if (err.response.status === 401) {
                    NotificationManager.error('Session Expired.', 'Error');
                    deleteStore();
                    this.props.clearUser();
                    this.props.clearToken();
                    this.props.history.push('/login');
                }
            });
        }
    }

    displayRole = role => {
        if (role === 'A') {
            return ' (Organization Admin)'
        }
        else if (role === 'N') {
            return ' (Organization Member)'
        }
        else {
            return ' (Member)';
        }
    }

    listCompanies = () => {
        const { companies } = this.props;

        return _.map(companies, company => {

            const active = this.props.company && this.props.company.id === company.id ? 'active' : '';

            return (
                <div
                    onClick={() => { this.handleSelectOrg(company) }}
                    className={`__organization ${active}`}
                    key={company.created_at}
                >
                    <div className="select_check">
                        <AiFillCheckCircle />
                    </div>
                    <div>{company.name}</div>
                </div>
            )
        });
    }

    closeNewOrg = (e) => {
        this.props.setCreateNewOrg({
            open: false,
            in_org: true
        });
        this.props.history.push('/select-organization');
    }

    orgCreated = (company) => {
        this.props.setCreateNewOrg({
            open: false,
            in_org: true
        });
        this.handleSelectOrg(company);
    }

    visitMFASetup = () => {
        this.setState({ show_mfa_required: false }, () => {
            this.props.history.push('/user/enable-mfa?strict=true');
        });

    }

    closeMFAMessage = () => {
        this.setState({ show_mfa_required: false });
    }
    closeDisabledMessage = () => {
        this.setState({ account_disabled: false });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    }

    handleSearchChange = (event) => {

        const { companies } = this.props;
        const re = new RegExp(_.escapeRegExp(event.target.value), 'i')
        const isMatch = (result) => re.test(result.company.name)

        this.setState({ companies: _.filter(companies, isMatch) });
    }

    useAIBuilder = () => {
        const { user } = this.props;
        axios.post('/api/auth/onboarding/get-build-id-for-existing', {
            email: user.email
        }).then(e => {
            this.props.history.push(`/verify-company/${e.data}`);

        }).catch(err => {
            this.setState({ errors: [], loading: false, switch_company: '' });
            if (err.response.status === 500) {
                NotificationManager.error('Server Error, Please contact customer support.', 'Error');
            }
        });
    }

    render() {
        const { token, create_new_org } = this.props;
        const { show_mfa_required, account_disabled, determine_visibility } = this.state;

        return (
            !determine_visibility ?
                <>

                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>

                        <Box sx={{ margin: '0 30px', padding: '20px', borderRadius: '6px', mt: '50px', border: '2px solid #ccc', width: '800px' }}>
                            <Typography variant="h4" sx={{ color: '#fff' }}>Choose Organization</Typography>
                            <Typography sx={{ marginBottom: '50px', color: '#fff' }}>Here are the organizations you are part of.  Select one to get started.</Typography>

                            <Box sx={{ marginBottom: '15px' }}>

                                <TextField fullWidth label="Search Organization..." variant="outlined"
                                    onChange={this.handleSearchChange}
                                    name="search_text"
                                    className="build__input"
                                />
                            </Box>

                            <div className="choose_organization">
                                {this.listCompanies()}
                            </div>
                        </Box>
                    </Box>

                    <Modal
                        open={show_mfa_required}
                        size='small'
                        className="semtic__modal cccc__modal"
                    >
                        <Header icon='key' content='Multi-Factor Authentication' />
                        <Modal.Content className="">
                            <h3>This orgnazation requires you to enable a two-factor authentication to gain access, you can contact orgnazation admin for information.</h3>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='green' onClick={this.visitMFASetup} inverted>
                                <Icon name='checkmark' /> Setup Now
                            </Button>
                            <Button color='red' onClick={this.closeMFAMessage} inverted>
                                Cancel
                            </Button>
                        </Modal.Actions>
                    </Modal>

                    <Modal
                        open={account_disabled}
                        size='small'
                        className="semtic__modal cccc__modal"
                    >
                        <Header icon='dont' content='Account Disabled' />
                        <Modal.Content className="">
                            <h3>This account has been disabled, please contact customer care.</h3>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='red' onClick={this.closeDisabledMessage} inverted>
                                Close
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </> :
                <>
                    <p>Loading...</p>
                </>
        );
    }
}

const mapStateToProps = (state) => ({
    companies: state.orgs.companies,
    new_device: state.user.new_device,
    create_new_org: state.leftnav.create_new_org,
    supplier: state.supplier.supplier
});

export default connect(mapStateToProps, {
    setCompany,
    clearUser,
    clearToken,
    setCompStandards,
    setAssetTypes,
    setControlModels,
    setMaturityLevel,
    setDeviceAssignStatus,
    setLocationStatus,
    selectStandard,
    setCompanyLocations,
    setSelectedTask,
    setAllProjects,
    setAllTasks,
    setCompanyUsers,
    setFieldTypes,
    setStandardFamilies,
    setStandardVersions,
    setStandardFocuses,
    setStandardStatutes,
    setStripeKey,
    resetCartSummary,
    setPackagesPopupStatus,
    setCompanyPolicyPortal,
    setCreateNewOrg,
    setCompanyTeams,
    setStates,
    setCountries,
    setNaicsCodes,
    setSuppliersCount,
    setEthnicities,
    setCompliantReqs,
    setSecurityLevels,
    setCompanySuppliers,
    setActiveSupplier
})(withCookies(ChooseOrganization));
