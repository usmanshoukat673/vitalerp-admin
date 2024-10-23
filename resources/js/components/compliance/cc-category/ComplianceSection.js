import React, { Suspense, useEffect, useState } from 'react';
import axiosInstance from '../../../api/api';
import { Grid } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSubLeftNav, selectCatalogSection, selectStandard, setParentSections, setCompanyUsers } from '../../../actions';
import _ from 'lodash';
import { useParams, withRouter } from 'react-router-dom';
import AllSectionDocuments from './AllSectionDocuments';
import ChildSection from './ChildSection';
const RightDrawer = React.lazy(() => import('../../../layouts/RightDrawer'));
const ControlsInfoChart = React.lazy(() => import('../cc-category/ControlsInfoChart'));
const CCActivities = React.lazy(() => import('../cc-category/CCActivities'));
const VisitDashboardBreadcrum = React.lazy(() => import('../../dashboard/VisitDashboardBreadcrum'));

import './ComplianceSection.scss';

const RightSidebar = () => {
    return (
        <div>
            TODO
        </div>
    )
}

const ComplianceSection = ({ token, company, location, leftnav, history }) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openSwitchCompl, setOpenSwitchCompl] = useState('');
    const [view_documents, setViewDocuments] = useState(false);
    const [standard_name, setStandardName] = useState('');
    const [documents, setDocuments] = useState([]);
    const [activities, setActivities] = useState([]);
    const [implemented_ctrls, setImplementedCtrls] = useState(0);
    const [partially_imple_ctrls, setPartiallyImpleCtrls] = useState(0);
    const [applicable_ctrls, setApplicableCtrls] = useState(0);
    const [not_applicable_ctrls, setNotApplicableCtrls] = useState(0);

    const params = useParams();
    const dispatch = useDispatch();

    const { standard, standards, users } = useSelector((state) => ({
        standard: state.leftnav.standard,
        standards: state.compliance.standards,
        users: state.orgs.company_users,
    }));

    useEffect(() => {
        dispatch(closeSubLeftNav());
        //TODO:
        const params = new URLSearchParams(location.search);
        const to = params.get('to');
        if (!_.isEmpty(to)) {
        }
    }, []);

    const loadSectionInfo = () => {

        setErrors([]);

        let sections = _.map(leftnav.psection.sections, csection => csection.id);

        axiosInstance.post(`/api/user/compliance/section-info`, {
            standard_id: standard.standard_id,
            sections: sections
        })
            .then(e => {
                setErrors([]);
                setImplementedCtrls(e.data.implemented_ctrls);
                setApplicableCtrls(e.data.applicable_ctrls);
                setNotApplicableCtrls(e.data.not_applicable_ctrls);
                setPartiallyImpleCtrls(e.data.partially_imple_ctrls);
                setDocuments(e.data.documents);
                setActivities(e.data.activities);
            })
            .catch(err => {
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            }).finally(() => {
                setErrors([]);
                setLoading(false);
            });
    }

    useEffect(() => {
        setStandardName(params.standard_name);
        loadSectionInfo();
    }, [params.standard_name]);

    const handleNavigation = section => {
        dispatch(selectCatalogSection(section));
        history.push(`/${company.slug}/compliance/category/${section.slug}`);
    };

    const handleVisitStandard = () => {
        history.push(`/${company.slug}/compliance/${standard.standard.slug}`);
    }

    const handleSwitchComplOpen = event => {
        setOpenSwitchCompl(event.currentTarget);
    };

    const handleSwitchComplClose = () => {
        setOpenSwitchCompl('');
    };

    const switchCompalance = std => {

        dispatch(selectStandard(std));
        setErrors([]);
        setOpenSwitchCompl('');
        axiosInstance.post(`/api/user/compliance/parent-sections`, {
            standards: [std.standard_id],
            sections: [std.standard_id],
        })
            .then(e => {
                setErrors([]);
                dispatch(setParentSections(e.data.parent_sections));
                dispatch(setCompanyUsers(e.data.users));
                history.push(`/${company.slug}/compliance/${std.standard.slug}`);
            })
            .catch(err => {
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            }).finally(() => {
                setErrors([]);
                setLoading(false);
            });
    }

    const toggleDocuments = () => {
        setViewDocuments(!view_documents);
    }

    const handleRenamed = (document, control_id) => {
        let index = _.findIndex(documents, doc => {
            return doc.document.id === document.id;
        });
        if (index >= 0) {
            documents[index].document.name = document.name;
            documents[index].document.updated_at = document.updated_at;
            setDocuments(documents);
        }
    }

    const handleRenamedDV = (document) => {
        let index = _.findIndex(documents, doc => {
            return doc.document.id === document.id;
        });

        if (index >= 0) {
            documents[index].document.name = document.name;
            documents[index].document.updated_at = document.updated_at;
            setDocuments(documents);
        }
    }

    return (
        <>
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >

                <div className="ccroot__mainbd">
                    <div className="ccroot__breadcrum"><Suspense fallback={<div>Loading...</div>}><VisitDashboardBreadcrum /></Suspense> {' > '} <span onClick={handleVisitStandard} className="_active">{standard.standard.name}</span>  {' > '} {leftnav.psection.menu_name}</div>

                    <div className="cc__header">
                        <div className="__name">{leftnav.psection.menu_name}</div>
                        <div className="__actions">
                            {/**
            <Button className={view_documents ? '__active' : ''} onClick={toggleDocuments} size="mini"><FileCopyIcon /> documents</Button>
            */}
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

                <div className="compliance__section">

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
                                <div>{documents.length}</div>
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
                /*
<Button className={view_documents ? '__active' : ''} onClick={toggleDocuments} size="mini"><FileCopyIcon /> documents</Button>
\
                */ }
                            </div>
                        </div>

                        <div className="cp__main__section">
                            <div className="cp__the__sections">
                                <Grid doubling columns={1}>
                                    {
                                        _.map(leftnav.psection.sections, _csection => {
                                            return (
                                                <ChildSection
                                                    _csection={_csection}
                                                    handleNavigation={handleNavigation}
                                                    key={_csection.id}
                                                    id={_csection.slug}
                                                    company={company}
                                                    token={token}
                                                    standard={standard}
                                                    users={users}
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
                <RightDrawer title={leftnav.psection.menu_name} component={<AllSectionDocuments
                    documents={documents}
                    close={toggleDocuments}
                    leftnav={leftnav}
                    company={company}
                    token={token}
                    standards={standards}
                    renamed={handleRenamedDV}
                />} />
            </Suspense>
        </>
    );
}

export default withRouter(ComplianceSection);
