import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import PortalVisitDashboardBreadcrum from '../../dashboard/PortalVisitDashboardBreadcrum';
import PPDomains from './PPDomains';
import StandardInformation from './StandardInformation';
import StandardDocuments from './StandardDocs/StandardDocuments';

const PPStandard = ({ history, match }) => {

    const { active_standard } = useSelector((state) => ({
        active_standard: state.policyportal.active_standard
    }));

    const handleCSNaviation = () => {
        history.push(`/policy-panels/${match.params.portal_link}/introduction`);
    }

    return (
        <>
            <div className='policy__panel'>

                <div className="ccroot__mainbd">
                    <div className="ccroot__breadcrum">
                        <PortalVisitDashboardBreadcrum /> {' > '} <span onClick={handleCSNaviation} className="_active">PolicyPanels</span> {' > '} Sections</div>

                    <div className="cc__header">
                        <div className="__name">{active_standard.name}</div>
                        <div className="__actions">
                        </div>
                    </div>
                </div>

                <div className="compliance__categories">

                    <StandardInformation />

                    <StandardDocuments />

                    <PPDomains />

                </div>
            </div>
        </>
    );
}



export default withRouter(PPStandard);