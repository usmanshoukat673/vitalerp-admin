import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePageAreaState, changeSidebarType, closeSubLeftNav, openSubLeftNave, selectLanAssets, selectLanCategory, selectLanDetailsPanelType, selectTemplates, toggleTreeViewArea } from "../../actions";
import axiosInstance from "../../api/api";
import VisitDashboardBreadcrum from "../dashboard/VisitDashboardBreadcrum";
import { Grid } from "semantic-ui-react";
const ControlsInfoChart = React.lazy(() => import('../compliance/cc-category/ControlsInfoChart'));

import { MODULE_CLOUDSERVICES, MODULE_DATASETS, MODULE_HARDWARE, MODULE_INFORMATION_SYSTEMS, MODULE_PROCESSES, MODULE_SOFTWARE, SECTION_ASSETS } from "../../constants/layout";

const lan_categories = [
    {
        id: MODULE_HARDWARE,
        name: 'Hardware',
        slug: 'hardware'
    },
    {
        id: MODULE_SOFTWARE,
        name: 'Software',
        slug: 'software'
    },
    {
        id: MODULE_CLOUDSERVICES,
        name: 'Cloud services',
        slug: 'cloud-services'
    },
    {
        id: MODULE_DATASETS,
        name: 'Data sets',
        slug: 'data-sets'
    },
    {
        id: MODULE_PROCESSES,
        name: 'Processes',
        slug: 'processes'
    },
    {
        id: MODULE_INFORMATION_SYSTEMS,
        name: 'Information systems',
        slug: 'information-systems'
    },
];

const Lanscape = ({ history }) => {

    const [moving, setMoving] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { open_sub } = useSelector((state) => ({
        open_sub: state.leftnav.open_sub,
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

    const navigatetoLanCategory = (category) => {
        axiosInstance.get(`/api/user/assets/list/${category.id}`)
            .then(e => {
                dispatch(selectLanAssets(e.data.lan_assets));
                setMoving(true);
                dispatch(selectLanCategory(category));
                dispatch(selectLanDetailsPanelType('category'));
                dispatch(closeSubLeftNav());
                dispatch(toggleTreeViewArea({
                    open: true,
                    type: SECTION_ASSETS,
                    route: SECTION_ASSETS
                }));
                dispatch(changeSidebarType('condensed'));
                dispatch(changePageAreaState('focused'));
                setMoving(false);
                history.push(`/assets/${category.slug}`);
            })
            .catch(err => {
                setMoving(false);
            });
    }

    return (<>
        <div className={open_sub ? 'sub__slide__menu_opened' : ''} >
            <div className="ccroot__mainbd">
                <div className="ccroot__breadcrum"><VisitDashboardBreadcrum /> {' > '}  Assets</div>

                <div className="cc__header">
                    <div className="__name">Assets</div>
                    <div className="__actions">
                        <div className='__filter'>


                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="__cp_stack">

            <div className="__cp_stack__container">
                <Grid doubling columns={2}>
                    {
                        _.map(lan_categories, category => {
                            return (
                                <Grid.Column key={`${category.id}`}>
                                    <div className='__cps_staindard__box'>
                                        <div className="__cps_staindard__box__header" >
                                            <div className="__sd_title" onClick={() => navigatetoLanCategory(category)}>{`${category.name}`}</div>
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
                                                    <ControlsInfoChart type="lanscape" series={[1, 0, 0, 0, 0]} />
                                                </Suspense>
                                            </div>
                                            <div className="__pienotes">
                                                <div> <span className="lan__fullyimpl __count">0</span> Implemented</div>
                                                <div><span className="lan__partimpl __count">0</span> Partially Implemented</div>
                                                <div><span className="lan__applicable __count">0</span> Not Implemented</div>
                                                <div> <span className="lan__not_applicable __count">0</span> Excluded</div>
                                                <div> <span className="lan__requiredatten __count">0</span> Not Applicable</div>
                                            </div>

                                            <div className="__totaldocs">
                                                <div className="__numberof_docs">
                                                    <div className='__count'>0</div>
                                                    <div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Grid.Column>
                            )
                        })
                    }
                </Grid>
            </div>

        </div>

    </>);
}

export default Lanscape;