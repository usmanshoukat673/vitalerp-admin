import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const VisitDashboardBreadcrum = ({history, classes}) => {

    const { company } = useSelector((state) => ({
        company: state.orgs.company
    }));

    const visit = () => {
        history.push(`/dashboard`);
    }

    return(
        <span onClick={visit} className={classNames(classes, '_active')}>Home</span>
    );
}

export default withRouter(VisitDashboardBreadcrum);