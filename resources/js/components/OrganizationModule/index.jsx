import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePageAreaState, changeSidebarType, closeSubLeftNav, openSubLeftNave, selectLanAssets, selectLanCategory, selectLanDetailsPanelType, selectTemplates, toggleTreeViewArea } from "../../actions";
import { Grid } from "semantic-ui-react";
import axiosInstance from "../../api/api";
import VisitDashboardBreadcrum from "../dashboard/VisitDashboardBreadcrum";
const ControlsInfoChart = React.lazy(() => import('../compliance/cc-category/ControlsInfoChart'));
import { MODULE_CERTIFICATIONS, MODULE_CONTRACTUAL_REQUIREMENTS, MODULE_LEGAL_REQUIREMENTS, MODULE_PRODUCTS, MODULE_REGULATORY_REQUIREMENTS, MODULE_SCOPES, MODULE_SERVICES, SECTION_ORGANIZATION } from "../../constants/layout";

const orgs_modules = [
    {
        id: MODULE_SERVICES,
        name: 'Services',
        slug: 'services'
    },
    {
        id: MODULE_PRODUCTS,
        name: 'Products',
        slug: 'products'
    },
    {
        id: MODULE_LEGAL_REQUIREMENTS,
        name: 'Legal Requirements',
        slug: 'legal-requirements'
    },
    {
        id: MODULE_REGULATORY_REQUIREMENTS,
        name: 'Regulatory Requirements',
        slug: 'regulatory-requirements'
    },
    {
        id: MODULE_CONTRACTUAL_REQUIREMENTS,
        name: 'Contractual Requirements',
        slug: 'contractual-requirements'
    },
    {
        id: MODULE_CERTIFICATIONS,
        name: 'Certifications',
        slug: 'certifications'
    },
    {
        id: MODULE_SCOPES,
        name: 'Scopes',
        slug: 'scopes'
    },
];

const OrganizationModule = ({ history }) => {

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
                    type: SECTION_ORGANIZATION,
                    route: SECTION_ORGANIZATION
                }));
                dispatch(changeSidebarType('condensed'));
                dispatch(changePageAreaState('focused'));
                setMoving(false);
                history.push(`/${SECTION_ORGANIZATION}/${category.slug}`);
            })
            .catch(err => {
                setMoving(false);
            });
    }

    return (<>
        <div className={open_sub ? 'sub__slide__menu_opened' : ''} >
            <div className="ccroot__mainbd">
                <div className="ccroot__breadcrum"><VisitDashboardBreadcrum /> {' > '} Organization</div>

                <div className="cc__header">
                    <div className="__name">Organization</div>
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
                        _.map(orgs_modules, category => {
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
                                                    <ControlsInfoChart type="orgsmodule" series={[1, 0, 0, 0, 0]} />
                                                </Suspense>
                                            </div>
                                            <div className="__pienotes">
                                                <div> <span className="orgsmodule_fullyimpl __count">0</span> Implemented</div>
                                                <div><span className="orgsmodule_partimpl __count">0</span> Partially Implemented</div>
                                                <div><span className="orgsmodule_applicable __count">0</span> Not Implemented</div>
                                                <div> <span className="orgsmodule_not_applicable __count">0</span> Excluded</div>
                                                <div> <span className="orgsmodule_requiredatten __count">0</span> Not Applicable</div>
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

export default OrganizationModule;