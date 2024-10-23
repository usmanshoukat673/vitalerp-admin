import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../api/api';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import Typography from '@mui/material/Typography';
import showCurrentTZDate from '../../utils/showCurrentTZDate';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Attachments from './Attachments';
import VisitDashboardBreadcrum from '../dashboard/VisitDashboardBreadcrum';


const WhistleReportView = ({ history }) => {

    const params = useParams();
    const [report, setReport] = useState({});
    const [loading, setLoading] = useState(true);

    const { leftnav, company } = useSelector((state) => ({
        leftnav: state.leftnav,
        company: state.orgs.company,
    }));

    useEffect(() => {
        axiosInstance.get(`/api/user/whistleblows/reports/view/${params.id}`)
            .then(e => {
                setLoading(false);
                setReport(e.data);
            })
            .catch(err => {
                setLoading(false);
                if (err.response.status === 500 || err.response.status === 422) {
                }
                if (err.response.status === 400) {
                }
            });
    }, [params]);

    const back = () => {
        history.push(`/${company.slug}/organization-settings/whistleblower`);
    }

    return (
        <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >
            <div className="activityroot__mainbd">
                <div className="activity__breadcrum"><VisitDashboardBreadcrum /> {' > '} <span onClick={back} className="_active">Whistleblower</span> {' > '} Report</div>

                <div className="at__header">
                    <div className="__name">Whistleblower Report</div>

                </div>
            </div>

            <div className="org__all__activities">

                {
                    loading ? <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box> :  <div className='__report_view'>

                    <div>
                        <Typography variant="caption" display="block" gutterBottom>
                            Reported
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {showCurrentTZDate(report.date)}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="caption" display="block" gutterBottom>
                            Sender
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Anonym
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="caption" display="block" gutterBottom>
                            Category
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {report.category && report.category.name}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="caption" display="block" gutterBottom>
                            Description:
                        </Typography>
                        <p>
                            {report.description}
                        </p>
                    </div>

                    {
                            _.size(report.files) > 0 && <Attachments files={report.files} />
                        }
                </div>
                }

               
            </div>
        </div>
    )
}

export default WhistleReportView;