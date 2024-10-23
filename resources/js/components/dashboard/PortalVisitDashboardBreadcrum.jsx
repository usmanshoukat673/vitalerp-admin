import classNames from "classnames";
import React from "react";
import { withRouter } from "react-router-dom";

const PortalVisitDashboardBreadcrum = ({history, classes, match}) => {

    const visit = () => {
        history.push(`/policy-panels/${match.params.portal_link}/introduction`);
    }

    return(
        <span onClick={visit} className={classNames(classes, '_active')}>Home</span>
    );
}

export default withRouter(PortalVisitDashboardBreadcrum);