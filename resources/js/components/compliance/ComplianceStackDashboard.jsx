import React, { Suspense, useEffect, useState } from 'react';
import axiosInstance from '../../api/api';
import { NotificationManager } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Grid } from 'semantic-ui-react';
import { selectStandard, setCompanyUsers, setPackagesPopupStatus, setParentSections, openSubLeftNave, changeSidebarType, changePageAreaState, toggleTreeViewArea, setDetailsPanelType, closeSubLeftNav } from '../../actions';
import _ from 'lodash';
// import StandardPriority from './StandardPriority';
import VisitDashboardBreadcrum from '../dashboard/VisitDashboardBreadcrum';
import LoadingBackgrop from '../LoadingBackgrop';
const ControlsInfoChart = React.lazy(() => import('./cc-category/ControlsInfoChart'));

const standardTypeOptions = [
    {
        key: 1,
        text: 'Display All',
        value: 'All',
    },
    {
        key: 2,
        text: 'Agreements',
        value: 'Agreement',
    },
    {
        key: 3,
        text: 'Guidelines',
        value: 'Guideline',
    },
    {
        key: 4,
        text: 'Regulations',
        value: 'Regulation',
    }
];

const ComplianceStackDashboard = ({ history, company }) => {

    const [loading, setLoading] = useState(false);
    const [moving, setMoving] = useState(false);
    const [all_standards, setAllStandards] = useState([]);
    const [type, setStandardType] = useState('All');

    let dispatch = useDispatch();

    const { open_sub, standards, leftSideBarType } = useSelector((state) => ({
        open_sub: state.leftnav.open_sub,
        standards: state.compliance.standards,
        leftSideBarType: state.leftnav.leftSideBarType
    }));

    useEffect(() => {
        dispatch(openSubLeftNave());

        dispatch(changeSidebarType('fixed'));

        dispatch(changePageAreaState('non-focused'));

        dispatch(toggleTreeViewArea({
            open: false,
            type: ''
        }));
    }, []);
    
    // Stripe // Motions plans // Motion packages --> uncomment this if want to add package/stripe popup again
    // useEffect(() => {
    //     if (!_.isEmpty(company) && _.isEmpty(company.plan)) {
    //         dispatch(setPackagesPopupStatus(true));
    //     }
    // }, [company]);

    const filter_controls = (controls, column, status) => {
        return _.size(_.filter(controls, (ap_controls) => {
            return ap_controls[column] === status;
        }));
    }

    useEffect(() => {
        setLoading(true);

        let stds = _.map(standards, std => (std.standard_id));

        if (_.size(stds) > 0) {
            axiosInstance.post(`/api/user/compliance/standards-info-all-new`, {
                standards: stds,
                type: type,
                comp_id: company.id
            })
                .then(e => {
                    setAllStandards(e.data);
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                });
        }
        else{
            setLoading(false);
        }
    }, [standards, type]);

    const navigateStandard = (standard) => {
        setMoving(true);
        let std = _.filter(standards, std => { return std.standard_id == standard.id })
        axiosInstance.post(`/api/user/compliance/parent-sections`, {
            standards: [standard.id],
        })
            .then(e => {
                if (!_.isEmpty(std)) {
                    dispatch(selectStandard(std[0]));
                    dispatch(setParentSections(e.data.parent_sections));
                    dispatch(setCompanyUsers(e.data.users));
                    dispatch(setDetailsPanelType('standard'));
                    dispatch(closeSubLeftNav());
                    dispatch(toggleTreeViewArea({
                        open: true,
                        type: 'cs'
                    }));
                    dispatch(changeSidebarType('condensed'));
                    dispatch(changePageAreaState('focused'));
                    setMoving(false);
                    history.push(`/${company.slug}/compliance-stack/${standard.slug}`);
                }
                else {
                    NotificationManager.error('UI Error, Please contact customer support.', 'Error');
                }
            })
            .catch(err => {
                setMoving(false);
            });
    }

    const handleTypeChange = (event, { value }) => {
        setStandardType(value);
    }

    const handlePriorityChanged = (priority, standard_id) => {
        let index = _.findIndex(all_standards, std => {
            return std.id === standard_id;
        });
        let __local_std = [...all_standards];
        __local_std[index].comp_std_priority.priority = priority;
        setAllStandards(__local_std);
    }

    return (
        <>
            {loading && <LoadingBackgrop open={loading} />}

            <div className={open_sub ? 'sub__slide__menu_opened' : ''} >

                <div className="ccroot__mainbd">
                    <div className="ccroot__breadcrum"><VisitDashboardBreadcrum /> {' > '} Compliance</div>

                    <div className="cc__header">
                        <div className="__name">Compliance Stack</div>
                        <div className="__actions">
                            <div className='__filter'>
                                <Dropdown
                                    className='__dropdown'
                                    placeholder='Filter'
                                    fluid
                                    selection
                                    value={type}
                                    options={standardTypeOptions}
                                    onChange={handleTypeChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="__cp_stack">
                <div className="__cp_stack__container">
                    <Grid doubling columns={1}>
                        {moving && <LoadingBackgrop open={moving} />}
                        {
                            _.map(all_standards, standard => {
                                return (<Grid.Column key={standard.id} className="">
                                    <div className='__cps_staindard__box'>
                                        <div className="__cps_staindard__box__header" >
                                            <div className="__sd_title" onClick={() => navigateStandard(standard)}>{standard.name}</div>
                                            {/* <StandardPriority
                                                current_priority={standard.comp_std_priority.priority}
                                                standard_id={standard.id}
                                                changed={handlePriorityChanged}
                                            /> */}
                                        </div>

                                        <div className="cc_overview__panal">
                                            <div className="__piechart">
                                                <div className="__pieheading">Overview</div>
                                                <Suspense fallback={<div>Loading...</div>}>
                                                    <ControlsInfoChart type="controls" series={[standard.chart_info.implemented_ctrls, standard.chart_info.partially_imple_ctrls, standard.chart_info.applicable_ctrls, standard.chart_info.excluded_ctrls, standard.chart_info.not_applicable_ctrls]} />
                                                </Suspense>
                                            </div>
                                            <div className="__pienotes">
                                                <div> <span className="n__fullyimpl __count">{standard.chart_info.implemented_ctrls}</span> Implemented</div>
                                                <div><span className="n__partimpl __count">{standard.chart_info.partially_imple_ctrls}</span> Partially Implemented</div>
                                                <div><span className="n__applicable __count">{standard.chart_info.applicable_ctrls}</span> Not Implemented</div>
                                                <div> <span className="n__requiredatten __count">{standard.chart_info.excluded_ctrls}</span> Excluded</div>
                                                <div> <span className="n__not_applicable __count">{standard.chart_info.not_applicable_ctrls}</span> Not Applicable</div>
                                            </div>

                                            <div className="__totaldocs">
                                                <div className="__numberof_docs">
                                                    <div className='__count'>{standard.documents_count}</div>
                                                    <div>Documents</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Grid.Column>)
                            })
                        }
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default ComplianceStackDashboard;