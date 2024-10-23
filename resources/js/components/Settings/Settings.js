import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { closeLeftNav, closeSubLeftNav, selectControlFunction, selectCatalogSection } from '../../actions';
import { Route } from 'react-router-dom';
import SubLeftNav from './SubLeftNav';
import Users from '../organizations/OrgProfile/Users';
import InviteUser from '../organizations/OrgProfile/InviteUser';
import GeneralSettings from '../organizations/GeneralSettings';
import NotificationsSettings from '../user/NotificationsSettings';
import Activities from '../organizations/Activities';
import SecuritySettings from '../organizations/SecuritySettings';
import Teams from '../teams/Teams';
import NewTeam from '../teams/NewTeam';
import TeamProfile from '../teams/TeamProfile';
import Preferences from '../user/Preferences';
import TicketSystemSettings from '../organizations/TicketSystemSettings';
import UserSections from '../sections/UserSections';
import UserSectionsProfile from '../sections/UserSectionsProfile';
import LocationsSettings from '../organizations/locations/LocationsSettings';

class Settings extends Component {

    state = {
        loading: false
    }

    componentDidMount() {
        // this.props.closeLeftNav();
        this.props.closeSubLeftNav();
        this.props.selectControlFunction({});
        this.props.selectCatalogSection({});
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { company, leftnav } = this.props;

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened settings__module' : 'settings__module'} >

                <SubLeftNav company={company} />

                <div className="settings_wrapper">
                    <Route exact path={`/${company.slug}/settings/basic`} component={GeneralSettings} />
                    <Route exact path={`/${company.slug}/settings/locations`} component={LocationsSettings} />
                    <Route exact path={`/${company.slug}/settings/security`} component={SecuritySettings} />
                    <Route exact path={`/${company.slug}/settings/ticket-system`} component={TicketSystemSettings} />
                    <Route exact path={`/${company.slug}/settings/activities`} component={Activities} />
                    <Route exact path={`/${company.slug}/settings/access-management`} component={Users} />
                    <Route exact path={`/${company.slug}/settings/team-management`} component={Teams} />
                    <Route exact path={`/${company.slug}/settings/add-new-team`} component={NewTeam} />
                    <Route exact path={`/${company.slug}/settings/team-management/:id`} component={TeamProfile} />
                    <Route exact path={`/${company.slug}/settings/user-sections`} component={UserSections} />
                    <Route exact path={`/${company.slug}/settings/user-sections/:id`} component={UserSectionsProfile} />
                    <Route exact path={`/${company.slug}/settings/invite-user`} component={InviteUser} />
                    <Route exact path={`/${company.slug}/settings/preferences`} component={Preferences} />
                    <Route exact path={`/${company.slug}/settings/notifications`} component={NotificationsSettings} />
                </div>

            </div>
        );
    }
}

export default connect(null, { closeLeftNav, closeSubLeftNav, selectControlFunction, selectCatalogSection })(Settings);
