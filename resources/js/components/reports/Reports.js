import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Reports.scss';
import STDDocs from './STDDocs';
import SOAReport from './SOAReport';
import RightDrawer from '../../layouts/RightDrawer';
import VisitDashboardBreadcrum from '../dashboard/VisitDashboardBreadcrum';

const RightSidebar = () => {
    return (
        <div>
            TODO
        </div>
    )
}

const Reports = ({ history, leftnav, company, token }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const { standards } = useSelector((state) => ({
        standards: state.compliance.standards,
    }));

    return (
        <>
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >
                <div className="reports__mainbd">
                    <div className="reports__breadcrum"><VisitDashboardBreadcrum /> {' > '} Reports</div>

                    <div className="rpt__header">
                        <div className="__name">Reports</div>
                        <div className="__actions">

                        </div>
                    </div>
                </div>

                <div className="reports__types">
                    <STDDocs company={company} token={token} standards={standards} />
                    <SOAReport company={company} token={token} standards={standards} />
                </div>
            </div>

            <RightDrawer title="Reports" component={<RightSidebar />} />
        </>
    )
}

export default withRouter(Reports);