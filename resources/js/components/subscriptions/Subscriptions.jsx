import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Subscription from './Subscription';
import VisitDashboardBreadcrum from '../dashboard/VisitDashboardBreadcrum';

const Subscriptions = () => {

    const { leftnav, token, company, user } = useSelector((state) => ({
        leftnav: state.leftnav,
        token: state.token.activeToken,
        company: state.orgs.company,
        user: state.user.activeUser,
    }));

    return (
        <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >
            <div className="activityroot__mainbd">
                <div className="activity__breadcrum"><VisitDashboardBreadcrum /> {' > '} Subscriptions</div>

                <div className="at__header">
                    <div className="__name">Manage Subscriptions</div>

                </div>
            </div>

            <div className="org__all__activities">
                 <Subscription name="Business Pack" />
                 <Subscription name="Custom Plan" />
                 <Subscription name="Standard Name" />
                 <Subscription name="Standard Name" />
            </div>
        </div>
    )
}

export default Subscriptions;