import React, { Component } from 'react';
import './AllActivities.scss';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { clearUser, clearToken } from '../../actions';
import GeneralActivities from './GeneralActivities';
import LocationActivities from './LocationActivities';
import DocumentActivities from './DocumentActivities';
import ControlActivities from './ControlActivities';
import VisitDashboardBreadcrum from '../dashboard/VisitDashboardBreadcrum';

class AllActivities extends Component {

    state = {
        errors: [],
        loading: false,
        activities: [],
        activePage: 1,
        totalPages: 0,
    }

    componentDidMount() {
        if (_.isEmpty(this.props.user)) {
            this.props.history.push('/login');
        }
        else if (_.isEmpty(this.props.company)) {
            this.props.history.push('/select-organization');
        }
        else {

        }
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const {
            loading,
            activities, activePage, totalPages

        } = this.state;
        const { leftnav, company, token } = this.props;

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >


                <div className="activityroot__mainbd">
                    <div className="activity__breadcrum"><VisitDashboardBreadcrum /> {' > '} Activities</div>

                    <div className="at__header">
                        <div className="__name">All Activities </div>

                    </div>
                </div>

                <div className="org__all__activities">

                    <GeneralActivities company={company} token={token} />
                    <LocationActivities company={company} token={token} />
                    <DocumentActivities company={company} token={token} />
                    <ControlActivities company={company} token={token} />

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
});

export default withRouter(connect(mapStateToProps, { clearUser, clearToken })(AllActivities));
