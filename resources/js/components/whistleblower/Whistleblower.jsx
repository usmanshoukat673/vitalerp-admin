import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WhiltleConfiguration from './WhiltleConfiguration';
import WhiltleContent from './WhiltleContent';
import axiosInstance from '../../api/api';
import ReportList from './ReportList';
import VisitDashboardBreadcrum from '../dashboard/VisitDashboardBreadcrum';

const Whistleblower = ({history}) => {

    const [whistle, setWhistle] = useState({});

    const { leftnav, company, user } = useSelector((state) => ({
        leftnav: state.leftnav,
        company: state.orgs.company,
        user: state.user.activeUser,
    }));

    useEffect(() => {
        axiosInstance.get('/api/user/whistleblows/index')
            .then(e => {
                setWhistle(e.data);
            })
            .catch(err => {
                if (err.response.status === 500 || err.response.status === 422) {
                }
                if (err.response.status === 400) {
                }
            });
    }, []);

    const handleRecipentAdded = (recipent) => {
        let whistle_copy = { ...whistle };
        whistle_copy.recipients = [...whistle_copy.recipients, recipent];
        setWhistle(whistle_copy);
    }

    const onWhistleUpdate = (rcpts) => {
        let whistle_copy = { ...whistle };
        whistle_copy.recipients = rcpts;
        setWhistle(whistle_copy);
    }

    return (
        <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >
            <div className="activityroot__mainbd">
                <div className="activity__breadcrum"><VisitDashboardBreadcrum /> {' > '} Whistleblower</div>

                <div className="at__header">
                    <div className="__name">Whistleblower</div>

                </div>
            </div>

            <div className="org__all__activities">
                <WhiltleConfiguration whistle={whistle} recipent_added={handleRecipentAdded} updatedWhistle={onWhistleUpdate} />

                <WhiltleContent />

                <ReportList />
            </div>
        </div>
    )
}

export default Whistleblower;