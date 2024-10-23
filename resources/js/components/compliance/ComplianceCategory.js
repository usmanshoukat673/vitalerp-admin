import React, { useEffect, useState } from 'react';
import { closeSubLeftNav } from '../../actions';
import _ from 'lodash';
import CCControl from './cc-category/CCControl';
import CCCControlOperations from './cc-category/CCCControlOperations';
import ControlDocuments from './cc-category/ControlDocuments';
import RightDrawer from '../../layouts/RightDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axiosInstance from '../../api/api';
import VisitDashboardBreadcrum from '../dashboard/VisitDashboardBreadcrum';

const ComplianceCategory = ({ user, company, token, history, leftnav }) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [section_id, setSectionId] = useState('');
    const [activePage, setActivePage] = useState(1);
    const [totalPages, settotalPages] = useState(0);
    const [apps, setApps] = useState([]);
    const [section_changed, setSectionChanged] = useState(false);
    const [show_google_search, setShowGoogleSearch] = useState(false);
    const [controls, setControls] = useState([]);
    const [active_control, setActiveControl] = useState({});
    const [open_coperation, setOpenCoperation] = useState(false);
    const [view_documents, setViewDocuments] = useState(false);
    const [docs_count, setDocsCount] = useState(0);

    const dispatch = useDispatch();

    const { maturity_levels, standards, standard, asset_types, control_models, maturity_level, users } = useSelector((state) => ({
        maturity_levels: state.compliance.maturity_levels,
        standards: state.compliance.standards,
        standard: state.leftnav.standard,
        asset_types: state.compliance.asset_types,
        control_models: state.compliance.control_models,
        maturity_level: state.compliance.maturity_level,
        users: state.orgs.company_users,
    }));

    const getApps = () => {

        setErrors([]);
        setLoading(true);

        axiosInstance.post(`/api/user/compliance/apps`, { section_id: section_id })
            .then(e => {
                setErrors([]);
                setLoading(false);
                setApps(e.data.apps);
            })
            .catch(err => {
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            }).finally(() => {
                setErrors([]);
                setLoading(false);
            });
    };


    useEffect(() => {
        dispatch(closeSubLeftNav());
        getApps();
    }, []);

    const getControls = activePage => {
        setErrors([]);
        setLoading(true);
        const levels = _.filter(maturity_levels, ml => {
            return ml.value <= maturity_level.value;
        });

        const clean_levels = _.map(levels, ml => (ml.id));

        const ctl_models = _.filter(control_models, (cm) => {
            return cm.selected === true;
        });

        const models = _.map(ctl_models, cm => (cm.id));

        const ast_types = _.filter(asset_types, (at) => {
            return at.selected === true;
        });

        const assets = _.map(ast_types, at => (at.id));

        axiosInstance.post(`/api/user/compliance/controls?page=${activePage}`, {
            section_id: leftnav.section.id,
            maturity_levels: clean_levels,
            maturity_level: maturity_level.id,
            control_models: models,
            asset_types: assets,
            standard: standard,
        })
            .then(e => {

                setErrors([]);
                setLoading(false);
                setControls(e.data.controls.data);
                setActivePage(e.data.controls.current_page);
                settotalPages(e.data.controls.last_page);
                setDocsCount(e.data.docs_count);

                // this.props.setSectionControls(e.data.controls.data);
            })
            .catch(err => {
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            }).finally(() => {
                setErrors([]);
                setLoading(false);
            });
    };

    useEffect(() => {
        const { section } = leftnav;

        if (!_.isEmpty(section) && section_id !== section.id) {

            setSectionId(section.id);

            getControls(1);

            setSectionChanged(true);
            setShowGoogleSearch(false);
        }
    }, [leftnav.section]);

    const handleGoBack = () => {
        history.push(`/${company.slug}/compliance/${standard.standard.slug}`);
    }

    const handleGoBackToPSection = () => {
        history.push(`/${company.slug}/compliance/section/${leftnav.psection.slug}`);
    }

    const changeControlState = control => {
        let index = _.findIndex(controls, ctrl => {
            return ctrl.id === control.id;
        });
        controls[index] = control;
        setControls(controls);
    }

    const saveControlProperties = (property, value, control) => {
        control.properties[property] = value;
        changeControlState(control);
        axiosInstance.post(`/api/user/riskregister/save/control/properties`, {
            property_id: control.properties.id,
            property: property,
            value: value
        }).then(e => {
        }).catch(err => {
            if (err.response.status === 422) {
                const errors = err.response.data.errors;
                setErrors(errors.concat(errors));
            }
        }).finally(() => {
            setErrors([]);
            setLoading(false);
        });
    }

    const controlArtifactChange = (artifacts, control) => {
        let index = _.findIndex(controls, ctrl => {
            return ctrl.id === control.id;
        });
        control.artifacts = artifacts;
        controls[index] = control;
        setControls(controls);
    }

    const handleRenamed = (document, control_id) => {
        let control_index = _.findIndex(controls, ctr => {
            return ctr.id === control_id;
        });
        const control = controls[control_index];
        let index = _.findIndex(control.artifacts, doc => {
            return doc.document_id === document.id;
        });
        control.artifacts[index].document.name = document.name;
        control.artifacts[index].document.updated_at = document.updated_at;
        controls[control_index] = control;
        setControls(controls);
    }

    const handleRenamedDV = (document) => {
        let new_cotnrols = _.map(controls, (control) => {
            let index = _.findIndex(control.artifacts, doc => {
                return doc.document_id === document.id;
            });
            if (index >= 0) {
                control.artifacts[index].document.name = document.name;
                control.artifacts[index].document.updated_at = document.updated_at;
            }
            return control;
        });
        setControls(new_cotnrols);
    }

    const handleDeleted = (document, control_id) => {
        let control_index = _.findIndex(controls, ctr => {
            return ctr.id === control_id;
        });
        const control = controls[control_index];
        _.remove(control.artifacts, (doc) => {
            return doc.document_id === document.id;
        });
        controls[control_index] = control;
        setControls(controls);
    }

    const openControlOperations = control => {
        setActiveControl(control);
        setOpenCoperation(true);
    }

    const closeControlOperations = () => {
        setActiveControl({});
        setOpenCoperation(false);
    }

    const toggleDocuments = () => {
        setViewDocuments(!view_documents);
    }

    const newSectionDoc = section_documents => {
        console.log(section_documents);
    }

    return (
        <>
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >

                <div className="cc__breadcrum">
                    <VisitDashboardBreadcrum classes="breadcrumb_item" />
                    {' > '}
                    <span className="breadcrumb_item _active" onClick={handleGoBack}>Compliance</span>
                    {' > '}
                    <span className="breadcrumb_item _active" onClick={handleGoBack}>{standard.standard.name}</span>
                    {' > '}
                    <span className="breadcrumb_item _active" onClick={handleGoBackToPSection}> {_.isEmpty(leftnav.psection.name) ? leftnav.psection.menu_name : leftnav.psection.menu_name}</span>
                    {' > '}
                    {_.isEmpty(leftnav.section.name) ? leftnav.section.menu_name : leftnav.section.menu_name}
                </div>

                <div className="compliance__category">

                    <div className="ccsection__header">
                        <div className="__heading">{_.isEmpty(leftnav.section.name) ? leftnav.section.menu_name : leftnav.section.menu_name}</div>
                        <div className="__options">
                            {
                                /**
                                 * <Button size="mini" className={(view_documents ? '__active' : docs_count > 0 ? '__having_docs' : '')} onClick={toggleDocuments}><FileCopyIcon /> documents</Button>
                                 */
                            }
                        </div>
                    </div>

                    <div className="ccsection__controls">
                        {
                            _.map(controls, control => {
                                return <CCControl
                                    key={`${control.id}-${control.name}`}
                                    control={control}
                                    users={users}
                                    token={token}
                                    company={company}
                                    apps={apps}
                                    standard={standard}
                                    standards={standards}
                                    controlStatusChange={saveControlProperties}
                                    handleOperations={openControlOperations}
                                />
                            })
                        }

                        {
                            open_coperation ? <CCCControlOperations
                                control={active_control}
                                open={open_coperation}
                                close={closeControlOperations}
                                controlStatusChange={saveControlProperties}
                                token={token}
                                company={company}
                                apps={apps}
                                users={users}
                                renamed={handleRenamed}
                                ctrdocremoved={handleDeleted}
                                controlArtifactChange={controlArtifactChange}
                                newSectionDocumentUploaded={newSectionDoc}
                            /> : ''
                        }

                    </div>

                </div>
            </div>

            <RightDrawer title={_.isEmpty(leftnav.section.name) ? leftnav.section.menu_name : leftnav.section.menu_name} component={<ControlDocuments
                controls={controls}
                close={toggleDocuments}
                leftnav={leftnav}
                token={token}
                company={company}
                standards={standards}
                renameddv={handleRenamedDV}
            />} />
        </>
    );
}

export default withRouter(ComplianceCategory);
