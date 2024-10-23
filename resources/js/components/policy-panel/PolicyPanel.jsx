import React, { useEffect, useState } from 'react';
import portalAxiosInstance from '../../api/portalApi';
import PortalVisitDashboardBreadcrum from '../dashboard/PortalVisitDashboardBreadcrum';
import PolicyPanelBanner from './PolicyPanelBanner';
import LoadingBackgrop from '../LoadingBackgrop';

const standardTypeOptions = [
    {
        key: 1,
        text: 'Display All',
        value: 'All',
    },
    {
        key: 2,
        text: 'Agreeement',
        value: 'Agreeement',
    },
    {
        key: 3,
        text: 'Guideline',
        value: 'Guideline',
    },
    {
        key: 4,
        text: 'Regulation',
        value: 'Regulation',
    }
];

const PolicyPanel = () => {

    const [loading, setLoading] = useState(false);
    const [all_standards, setAllStandards] = useState([]);
    const [type, setStandardType] = useState('All');

    const handleTypeChange = (event, { value }) => {
        setStandardType(value);
    }

    const filter_controls = (controls, column, status) => {
        return _.size(_.filter(controls, (ap_controls) => {
            return ap_controls[column] === status;
        }));
    }

    useEffect(() => {
        setLoading(true);

        portalAxiosInstance.get(`/standards/${type}`)
            .then(e => {
                setAllStandards(e.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    }, [type]);

    return (<div className='policy__panel'>
        <div className="ccroot__mainbd">
            <div className="ccroot__breadcrum"><PortalVisitDashboardBreadcrum /> {' > '} Compliance</div>

            <div className="cc__header">
                <div className="__name">Policy Panels</div>
                <div className="__actions">
                    <div className='__filter'>
                        {/* <Dropdown
                                    className='__dropdown'
                                    placeholder='Filter'
                                    fluid
                                    selection
                                    value={type}
                                    options={standardTypeOptions}
                                    onChange={handleTypeChange}
                                /> */}
                    </div>
                </div>
            </div>
        </div>

        <div className="__cp_stack">

            <div className="__cp_stack__container">

                {loading && <LoadingBackgrop open={loading} />}

                <PolicyPanelBanner all_standards={all_standards} />

            </div>
        </div>

    </div>)
}

export default PolicyPanel;
