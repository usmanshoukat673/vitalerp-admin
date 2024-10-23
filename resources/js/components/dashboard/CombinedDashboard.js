import React, { useEffect } from 'react';
import _ from 'lodash';
import { connect, useSelector } from 'react-redux';
import { closeLeftNav, closeSubLeftNav, selectControlFunction, selectCatalogSection } from '../../actions';
import { Route } from 'react-router-dom';
import Users from '../organizations/OrgProfile/Users';
import InviteUser from '../organizations/OrgProfile/InviteUser';
import GeneralSettings from '../organizations/GeneralSettings';
import NotificationsSettings from '../user/NotificationsSettings';
import SecuritySettings from '../organizations/SecuritySettings';
import Teams from '../teams/Teams';
import NewTeam from '../teams/NewTeam';
import TeamProfile from '../teams/TeamProfile';
import Preferences from '../user/Preferences';
import TicketSystemSettings from '../organizations/TicketSystemSettings';
import UserSections from '../sections/UserSections';
import UserSectionsProfile from '../sections/UserSectionsProfile';
import LocationsSettings from '../organizations/locations/LocationsSettings';
import SubLeftNav from '../Settings/SubLeftNav';
import AllActivities from '../activities/AllActivities';
import InfoDashboard from './InfoDashboard';
import Devices from './Devices';
import RightDrawer from '../../layouts/RightDrawer';
import BillingManagement from '../billing/BillingManagement';
import Subscriptions from '../subscriptions/Subscriptions';
import Whistleblower from '../whistleblower/Whistleblower';
import WhistleReportView from '../whistleblower/WhistleReportView';
import { useHistory } from 'react-router-dom';
import { getModuleAccess } from '../../helpers/getModuleAccess';
import CompanySuppliers from '../CompanySuppliers/CompanySuppliers';

const RightSidebar = () => {
    return(
        <div>
            TODO
        </div>
    )
}

const CombinedDashboard = ({leftnav}) => {

    const history = useHistory();

    const { company, supplier } = useSelector((state) => ({
        company: state.orgs.company,
        supplier: state.supplier.supplier
    }));

    useEffect(() => {
        if (!getModuleAccess(_.size(company?.roles) > 0 ? company.roles : [], (!_.isEmpty(supplier) && _.size(supplier?.roles) > 0) ? supplier?.roles : [], [12])) {
            history.push('/dashboard');
        }
    }, [company, supplier]);

    useEffect(() => {
        closeSubLeftNav();
        selectControlFunction({});
        selectCatalogSection({});
    }, []);

    return (
        <>
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened settings__module' : 'settings__module'} >

                <SubLeftNav company={company} />

                <div className="settings_wrapper">
                    <Route exact path={`/my-account`} component={InfoDashboard} />
                    <Route exact path={`/${company.slug}/organization-settings/general`} component={GeneralSettings} />
                    <Route exact path={`/${company.slug}/organization-settings/locations`} component={LocationsSettings} />
                    <Route exact path={`/${company.slug}/organization-settings/suppliers`} component={CompanySuppliers} />
                    {/* <Route exact path={`/${company.slug}/organization-settings/security`} component={SecuritySettings} /> */}
                    {/* <Route exact path={`/${company.slug}/organization-settings/ticket-system`} component={TicketSystemSettings} /> */}
                    <Route exact path={`/${company.slug}/organization-settings/activities`} component={AllActivities} />
                    {/* <Route exact path={`/${company.slug}/organization-settings/user-accounts`} component={Users} /> */}
                    {/* <Route exact path={`/${company.slug}/organization-settings/team-management`} component={Teams} /> */}
                    {/* <Route exact path={`/${company.slug}/organization-settings/device-logins`} component={Devices} /> */}
                    {/* <Route exact path={`/${company.slug}/organization-settings/add-new-team`} component={NewTeam} /> */}
                    {/* <Route exact path={`/${company.slug}/organization-settings/team-management/:id`} component={TeamProfile} /> */}
                    {/* <Route exact path={`/${company.slug}/organization-settings/user-sections`} component={UserSections} /> */}
                    {/* <Route exact path={`/${company.slug}/organization-settings/user-sections/:id`} component={UserSectionsProfile} /> */}
                    {/* <Route exact path={`/${company.slug}/organization-settings/user-accounts/invite-user`} component={InviteUser} /> */}
                    {/* <Route exact path={`/${company.slug}/organization-settings/preferences`} component={Preferences} /> */}
                    {/* <Route exact path={`/${company.slug}/organization-settings/notifications`} component={NotificationsSettings} /> */}

                    {/* <Route exact path={`/${company.slug}/organization-settings/billing`} component={BillingManagement} /> */}
                    {/* <Route exact path={`/${company.slug}/organization-settings/subscriptions`} component={Subscriptions} /> */}

                    {/* <Route exact path={`/${company.slug}/organization-settings/whistleblower`} component={Whistleblower} /> */}
                    {/* <Route exact path={`/${company.slug}/organization-settings/whistleblower/view/r/:id`} component={WhistleReportView} /> */}
                </div>

            </div>

            <RightDrawer title="My Account" component={<RightSidebar />} />
        </>
    );
}

export default connect(null, { closeLeftNav, closeSubLeftNav, selectControlFunction, selectCatalogSection })(CombinedDashboard);
