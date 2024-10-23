import React, { useState, useEffect, Suspense } from 'react';
import { Grid } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSubLeftNav, selectCatalogSection, selectStandard, setParentSections, setCompanyUsers, selectCatalogParentSection } from '../../actions';
import _ from 'lodash';
import { useParams, withRouter } from 'react-router-dom';
import SectionTile from './SectionTile';
import axiosInstance from '../../api/api.jsx';
import VisitDashboardBreadcrum from '../dashboard/VisitDashboardBreadcrum.jsx';
const ControlsInfoChart = React.lazy(() => import('./cc-category/ControlsInfoChart'));
const CCActivities = React.lazy(() => import('./cc-category/CCActivities'));
const CustomDrawer = React.lazy(() => import('./Drawer/CustomDrawer.tsx'));

const ComplianceStandard = ({ company, token, history }) => {

    const { standard, users, parent_sections, open_sub, last_active_section_id } = useSelector((state) => ({
        standard: state.leftnav.standard,
        users: state.orgs.company_users,
        parent_sections: state.leftnav.parent_sections,
        open_sub: state.leftnav.open_sub,
        last_active_section_id: state.compliance.last_active_section_id,
    }));

    const [state, setState] = useState({
        errors: [],
        loading: false,
    });

    const [openSwitchCompl, setOpenSwitchCompl] = useState('');
    const [standard_name, setStandardName] = useState('');
    const [active_section_documents, setActiveSectionDocuments] = useState([]);
    const [activities, setActivities] = useState([]);
    const [implemented_ctrls, setImplementedCtrls] = useState(0);
    const [partially_imple_ctrls, setPartiallyImpleCtrls] = useState(0);
    const [applicable_ctrls, setApplicableCtrls] = useState(0);
    const [not_applicable_ctrls, setNotApplicableCtrls] = useState(0);
    const [standard_doc_docunt, setStandarDocCount] = useState(0);

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        let docCount = 0;
        _.forEach(parent_sections, (psection) => {
            docCount+= _.size(psection.limitted_info.documents);
        });
        setStandarDocCount(docCount);
    }, [parent_sections, active_section_documents]);

    const loadStdInfo = () => {

        setState({ ...state, errors: [] })

        axiosInstance.post(`/api/user/compliance/standard-info`, {
            standard_id: standard.standard_id,
            getdocs: false
        })
            .then(e => {
                setState({
                    ...state,
                    errors: [],
                });

                setActivities(e.data.activities);
                setImplementedCtrls(e.data.implemented_ctrls);
                setPartiallyImpleCtrls(e.data.partially_imple_ctrls);
                setApplicableCtrls(e.data.applicable_ctrls);
                setNotApplicableCtrls(e.data.not_applicable_ctrls);

            })
            .catch(err => {
                if (err.response.status === 422) {
                    setState({ ...state, errors: state.errors.concat(err.response.data.errors), loading: false });
                }
            }).finally(() => {
                setState({ ...state, errors: [], loading: false });
            });
    }


    useEffect(() => {
        loadStdInfo();
    }, [company, standard]);

    useEffect(() => {
        dispatch(closeSubLeftNav());
    }, [standard]);

    useEffect(() => {
        setStandardName(params.standard_name);
    }, [params.standard_name]);

    const handleNavigation = section => {
        dispatch(selectCatalogSection(section));
        history.push(`/${company.slug}/compliance/category/${section.slug}`);
    };

    const handleSectionNav = section => {
        dispatch(selectCatalogParentSection(section));
        history.push(`/${company.slug}/compliance/section/${section.slug}`);
    };

    const handleSubSectionNav = (section, slug) => {
        dispatch(selectCatalogParentSection(section));
        history.push(`/${company.slug}/compliance/section/${section.slug}?to=${slug}`);
    };

    const handleCSNaviation = () => {
        history.push(`/${company.slug}/compliance-stack`);
    }

    const handleSwitchComplOpen = event => {
        setOpenSwitchCompl(event.currentTarget);
    };

    const handleSwitchComplClose = () => {
        setOpenSwitchCompl('');
    };

    // const switchCompalance = std => {

    //     dispatch(selectStandard(std));

    //     setState({ ...state, errors: [] });

    //     setOpenSwitchCompl('');

    //     axiosInstance.post(`/api/user/compliance/parent-sections`, {
    //         comp_id: company.id,
    //         standards: [std.standard_id],
    //     })
    //         .then(e => {

    //             setState({
    //                 ...state,
    //                 errors: [],
    //             });

    //             dispatch(setParentSections(e.data.parent_sections));
    //             dispatch(setCompanyUsers(e.data.users));

    //             history.push(`/${company.slug}/compliance/${std.standard.slug}`);
    //         })
    //         .catch(err => {
    //             if (err.response.status === 422) {
    //                 setState({ ...state, errors: state.errors.concat(err.response.data.errors), loading: false });
    //             }
    //         })
    //         .finally(() => {
    //             setState({ ...state, errors: [], loading: false });
    //         });
    // }

    const handleRenamedDV = (document) => {
    
        setExtendedModelTitle(document.name);

        let index = _.findIndex(active_section_documents, doc => {
            return doc.document.id === document.id;
        });

        if (index >= 0) {
            active_section_documents[index].document = document;
            setActiveSectionDocuments(active_section_documents);
        }
    }

    const handleSectionInfoChanged = (psection, info) => {
        let parentSections = parent_sections;
        let index = _.findIndex(parentSections, sec => {
            return sec.id === psection.id;
        });
        parentSections[index].custodian_teams = info.custodian_teams;
        parentSections[index].custodians = info.custodians;
        parentSections[index].owner_teams = info.owner_teams;
        parentSections[index].owners = info.owners;
        parentSections[index].owner_thirdparty = info.owner_thirdparty;
        parentSections[index].custodian_thirdparty = info.custodian_thirdparty;
        dispatch(setParentSections(parentSections));
    }
    
    const handleDocumentSaved = document => {
        
        let index = _.findIndex(active_section_documents, doc => {
            return doc.document.id === document.id;
        });

        if (index >= 0) {
            active_section_documents[index].document = document;
            setActiveSectionDocuments(active_section_documents);
        }

    };

    const handleSectionLiked = (psection, like) => {
        let parentSections = parent_sections;
        let index = _.findIndex(parentSections, sec => {
            return sec.id === psection.id;
        });
        parentSections[index].like = like;
        dispatch(setParentSections(parentSections));
    }

    const handleActiveSectionDocs = (section_docs) => {
        setActiveSectionDocuments(section_docs);
        // update the docs in redux 
        let parentSections = parent_sections;
        let index = _.findIndex(parentSections, sec => {
            return sec.id === last_active_section_id;
        });
        if (index >= 0) {
            parentSections[index].limitted_info.documents = section_docs;
            dispatch(setParentSections(parentSections));
        }
    }

    return (
        <>
            <div className={open_sub ? 'sub__slide__menu_opened' : ''} >

                <div className="ccroot__mainbd">
                    <div className="ccroot__breadcrum"><VisitDashboardBreadcrum /> {' > '} <span onClick={handleCSNaviation} className="_active">ComplianceStack</span> {' > '} Compliance</div>

                    <div className="cc__header">
                        <div className="__name">{standard.standard.name}</div>
                        <div className="__actions">

                            {/**
                         <Button className={view_documents ? '__active' : ''} onClick={toggleDocuments}><FileCopyIcon /> Documents</Button> */}
                            {
                                /*
    
                                <Button onClick={handleSwitchComplOpen}><LoopIcon /> Switch Compliance</Button>
    
                            <Menu
                                id="compailance-menu"
                                anchorEl={openSwitchCompl}
                                keepMounted
                                open={Boolean(openSwitchCompl)}
                                onClose={handleSwitchComplClose}
                            >
                                <div className="__cm__heading">
                                    Compliance
                                </div>
    
                                <Divider style={{ marginTop: '0px' }} />
    
                                {
                                    _.map(standards, std => {
                                        return (
                                            <MenuItem className="__cm__menu" key={`std-${std.standard_id}`} onClick={() => { switchCompalance(std) }} >
                                                {std.standard.expand_name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Menu>
                            */
                            }
                        </div>
                    </div>
                </div>

                <div className="compliance__categories">

                    <div className="cc_overview__panal">
                        <div className="__piechart">
                            <div className="__pieheading">Overview</div>
                            <Suspense fallback={<div>Loading...</div>}>
                                <ControlsInfoChart type="controls" series={[implemented_ctrls, partially_imple_ctrls, applicable_ctrls, 0, not_applicable_ctrls]} />
                            </Suspense>
                        </div>
                        <div className="__pienotes">
                             <div> <span className="n__fullyimpl __count">{implemented_ctrls}</span> Implemented</div>
                            <div><span className="n__partimpl __count">{partially_imple_ctrls}</span> Partially Implemented</div>
                            <div><span className="n__applicable __count">{applicable_ctrls}</span> Not Implemented</div>
                            <div> <span className="n__requiredatten __count">0</span> Excluded</div>
                            <div> <span className="n__not_applicable __count">{not_applicable_ctrls}</span> Not Applicable</div>
                        </div>

                        <div className="__totaldocs">
                            <div className="__numberof_docs">
                                <div>{standard_doc_docunt}</div>
                                <div>Documents</div>
                            </div>
                        </div>
                        <Suspense fallback={<div>Loading...</div>}>
                            <CCActivities c_title={true} activities={activities} />
                        </Suspense>
                    </div>

                    <div className="categories__panal">
                        <div className="cp__header__section">
                            <div className="cp__header">Categories</div>
                            <div className="cp__actions">
                                <div>view by:</div>
                                <div className="active">Category</div>
                                <div>Topic</div>
                                <div>Custom</div>
                            </div>
                            <div className="cp__options">
                                {
                                    /**
                                     * <Button className={view_documents ? '__active' : ''} onClick={toggleDocuments} size="mini"><FileCopyIcon /> documents</Button>
                                     */
                                }
                            </div>
                        </div>

                        <div className="cp__main__section">
                            <div className="cp__the__sections">
                                <Grid doubling columns={1}>
                                    {
                                        _.map(parent_sections, psection => {
                                            return (
                                                <SectionTile
                                                    company={company}
                                                    token={token}
                                                    standard={standard}
                                                    psection={psection}
                                                    key={psection.id}
                                                    users={users}
                                                    navigate={handleSectionNav}
                                                    subnavigate={handleSubSectionNav}
                                                    sectionInfoChanged={handleSectionInfoChanged}
                                                    sectionLiked={handleSectionLiked}
                                                    useActiveSectionDocuments={handleActiveSectionDocs}
                                                />
                                            )
                                        })
                                    }

                                </Grid>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
            <Suspense fallback={<div>Loading...</div>}>
                <CustomDrawer title="Compliance"
                    renamed={handleRenamedDV}
                    saved={handleDocumentSaved}
                    documents={active_section_documents}
                    newDocumentAddedToSection={handleActiveSectionDocs}
                    />
            </Suspense>
        </>
    );
}


export default withRouter(ComplianceStandard);