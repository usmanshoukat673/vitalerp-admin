import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePageAreaState, changeSidebarType, closeSubLeftNav, openSubLeftNave, selectLanAssets, selectLanCategory, selectLanDetailsPanelType, selectTemplates, toggleTreeViewArea } from "../../actions";
import axiosInstance from "../../api/api";
import { Grid } from "semantic-ui-react";
const ControlsInfoChart = React.lazy(() => import('../compliance/cc-category/ControlsInfoChart'));
const VisitDashboardBreadcrum = React.lazy(() => import('../dashboard/VisitDashboardBreadcrum'));
import { MODULE_SUPPLIERS, MODULE_VENDORS, SECTION_THIRDPARTIES } from "../../constants/layout";

const thirdparties = [
    {
        id: MODULE_VENDORS,
        name: 'Vendors',
        slug: 'vendors'
    },
    {
        id: MODULE_SUPPLIERS,
        name: 'Suppliers',
        slug: 'suppliers'
    },
];

const ThirdParties = ({ history }) => {

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
                    type: SECTION_THIRDPARTIES,
                    route: SECTION_THIRDPARTIES
                }));
                dispatch(changeSidebarType('condensed'));
                dispatch(changePageAreaState('focused'));
                setMoving(false);
                history.push(`/${SECTION_THIRDPARTIES}/${category.slug}`);
            })
            .catch(err => {
                setMoving(false);
            });
    }

    return (<>
        <div className={open_sub ? 'sub__slide__menu_opened' : ''} >
            <div className="ccroot__mainbd">
                <div className="ccroot__breadcrum"><Suspense fallback={<div>Loading...</div>}><VisitDashboardBreadcrum /></Suspense> {' > '} Third Parties</div>

                <div className="cc__header">
                    <div className="__name">Third Parties</div>
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
                        _.map(thirdparties, category => {
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
                                                    <ControlsInfoChart type="third-parties" series={[1, 0, 0, 0, 0]} />
                                                </Suspense>
                                            </div>
                                            <div className="__pienotes">
                                                <div> <span className="third_fullyimpl __count">0</span> Implemented</div>
                                                <div><span className="third_partimpl __count">0</span> Partially Implemented</div>
                                                <div><span className="third_applicable __count">0</span> Not Implemented</div>
                                                <div> <span className="third_not_applicable __count">0</span> Excluded</div>
                                                <div> <span className="third_requiredatten __count">0</span> Not Applicable</div>
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

export default ThirdParties;