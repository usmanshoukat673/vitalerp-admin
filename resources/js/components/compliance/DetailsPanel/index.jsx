import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VisitDashboardBreadcrum from "../../dashboard/VisitDashboardBreadcrum";
import { withRouter } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Typography from '@mui/material/Typography';
import ApiIcon from '@mui/icons-material/Api';
import SettingsIcon from '@mui/icons-material/Settings';
import { setControlActivites, setControlDocuments, setControlInfo, setControlMappings, setControlQuestions, setDetailsPanelType, setDomainActivites, setDomainControls, setDomainDocuments, setDomainInfo, setStandardInfo } from "../../../actions";
import axiosInstance from "../../../api/api";
import LoadingBackgrop from "../../LoadingBackgrop";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { extractIds } from "../../../utils";
import FullscreenPopup from "./FullscreenPopup";
import FSCreateDocument from "./FSCreateDocument";
import UploadDocument from "./ControlDocuments/UploadDocument";
import LinkDocuments from "./ControlDocuments/LinkDocuments";
import LayersIcon from '@mui/icons-material/Layers';
import ShareStandard from "../ShareStandard";
import RenameDocument from "./DomainDocuments/RenameDocument";
import DeleteDocument from "./DomainDocuments/DeleteDocument";
import ControlPanel from "./ControlPanel";
import UnlinkDocument from "./DomainDocuments/UnlinkDocument";
import SubDomainPanel from "./SubDomainPanel";
import DomainPanel from "./DomainPanel";
import StandardPanel from "./StandardPanel";

/**
 * Renders the DetailsPanel component, which displays information related to a standard, domain, sub-domain, or control.
 *
 * @param {Object} props - The props object containing history and match properties.
 * @param {object} props.history - The history object from React Router.
 * @param {object} props.match - The match object from React Router.
 * @return {JSX.Element} The rendered DetailsPanel component.
 */
const DetailsPanel = ({ history, match }) => {

    const [loading_standard, setLoadingStandard] = useState(false);
    const [loading_domain, setLoadingDomain] = useState(false);
    const [loading_control, setLoadingControl] = useState(false);

    const dispatch = useDispatch();

    const { company, standard, details_panel_type, parent_domain, sub_domain, control } = useSelector((state) => ({
        company: state.orgs.company,
        standard: state.leftnav.standard,
        details_panel_type: state.compliance.details_panel_type,
        parent_domain: state.compliance.parent_domain,
        sub_domain: state.compliance.sub_domain,
        control: state.compliance.control,
    }));

    useEffect(() => {
        const expectedPath = `/:name/compliance-stack/:standard_name`;

        if (match.path === expectedPath) {
            // Perform actions based on the URL parameters
            console.log("Loading standard info...");
            loadStandardInfo();
        }

    }, [match.path, standard]);

    // load domain information
    useEffect(() => {
        const expectedPath = `/:name/compliance-stack/:standard_name/:domain_name`;

        if (match.path === expectedPath) {
            // Perform actions based on the URL parameters
            console.log("Loading domain info...");
            loadDomainInfo(extractIds(parent_domain));
        }

    }, [match.path, parent_domain]);

    // Load sub domain information 
    useEffect(() => {
        const expectedPath = `/:name/compliance-stack/:standard_name/:domain_name/:sub_domain_name`;

        if (match.path === expectedPath) {
            console.log("Loading sub domain info...");
            loadDomainInfo([sub_domain.id]);
        }

    }, [match.path, sub_domain, standard]);

    // load control information 
    useEffect(() => {
        const expectedPath = `/:name/compliance-stack/:standard_name/:domain_name/:sub_domain_name/:control_name`;

        if (match.path === expectedPath) {
            // Perform actions based on the URL parameters
            console.log("Loading control info...");
            loadControlInfo();
        }

    }, [match.path, control]);

    const loadStandardInfo = () => {
        setLoadingStandard(true);
        // Perform actions based on the URL parameters
        axiosInstance.post(`/api/user/compliance/standard-information`, {
            standard_id: standard.standard_id,
        })
            .then(e => {
                dispatch(setStandardInfo(e.data.standard_info));
                dispatch(setDomainDocuments(e.data.standard_documents));
                dispatch(setDomainControls(e.data.standard_controls));
                dispatch(setDomainActivites(e.data.standard_activities));
                dispatch(setControlMappings(e.data.control_mappings));
            })
            .catch(err => {
            }).finally(() => setLoadingStandard(false));
    }

    const loadDomainInfo = (sections) => {
        setLoadingDomain(true);
        // Perform actions based on the URL parameters
        axiosInstance.post(`/api/user/compliance/domain-information`, {
            standard_id: standard.standard_id,
            sections: sections
        })
            .then(e => {
                dispatch(setDomainInfo(e.data.domain_info));
                dispatch(setDomainDocuments(e.data.domain_documents));
                dispatch(setDomainControls(e.data.domain_controls));
                dispatch(setDomainActivites(e.data.domain_activities));
                dispatch(setControlMappings(e.data.control_mappings));
            })
            .catch(err => {
            }).finally(() => setLoadingDomain(false));
    }

    const loadControlInfo = () => {
        setLoadingControl(true);
        // Perform actions based on the URL parameters
        axiosInstance.post(`/api/user/compliance/control-information`, {
            standard_id: standard.standard_id,
            id: control.id
        })
            .then(e => {
                dispatch(setControlInfo(e.data.control_info));
                dispatch(setControlDocuments(e.data.control_documents));
                dispatch(setControlActivites(e.data.control_activities));
                dispatch(setControlMappings(e.data.control_mappings));
                dispatch(setControlQuestions(e.data.control_questions));
            })
            .catch(err => {
            }).finally(() => setLoadingControl(false));
    }

    const handleCSNaviation = () => {
        history.push(`/${company.slug}/compliance-stack`);
    }

    const handleStdNaviation = () => {
        dispatch(setDetailsPanelType('standard'));
        history.push(`/${company.slug}/compliance-stack/${standard.standard.slug}`);
    }

    const renderBredcumb = () => {
        if (details_panel_type === 'domain') {
            return (
                <>
                    <span >{parent_domain.menu_name}</span>
                </>
            )
        }
        else if (details_panel_type === 'sub_domain') {
            return (
                <>
                    <span >{parent_domain.menu_name}</span> {' > '}
                    <span >{sub_domain.menu_name}</span>
                </>
            )
        }
        else if (details_panel_type === 'control') {
            return (
                <>
                    <span >{parent_domain.menu_name}</span> {' > '}
                    <span >{sub_domain.menu_name}</span> {' > '}
                    <span >{control.number}</span>
                </>
            )
        }
        else {
            return (<></>)
        }
    }

    const CSBreadcrum = () => {
        return (
            <div className="cs_breadcrum">
                <VisitDashboardBreadcrum /> {' > '}
                <span className="_active" onClick={handleCSNaviation} >ComplianceStack</span> {' > '}
                <span className="_active" onClick={handleStdNaviation} >{standard.standard.name}</span> {' > '}
                {renderBredcumb()}
            </div>
        )
    }

    return (
        <>
            <div>

                <div className="ccroot__mainbd" style={{ paddingTop: '16px' }}>
                    <div className="cc__header">
                        <div className="__name">{standard.standard.name}</div>
                        <div className="__actions">

                        </div>
                    </div>
                </div>

                <div className="new_compliance">

                    {details_panel_type === 'standard' && <>
                        <LoadingBackgrop open={loading_standard} />
                        {
                            !loading_standard && <>

                                <div className="cs_breadcrum">
                                    <VisitDashboardBreadcrum /> {' > '}
                                    <span className="_active" onClick={handleCSNaviation} >ComplianceStack</span> {' > '}
                                    <span>{standard.standard.name}</span>
                                </div>

                                <div className="action_bar">
                                    <div className="__names">
                                        <LayersIcon />

                                        <Typography sx={{ fontWeight: 400, fontSize: '18px', marginLeft: '10px' }} variant="h5" gutterBottom>
                                            {standard.standard.name}
                                        </Typography>
                                    </div>
                                    <div className="__actions">
                                        <ShareStandard standard={standard} />
                                    </div>
                                </div>

                                <StandardPanel />
                            </>
                        }
                    </>
                    }

                    {details_panel_type === 'domain' && <>
                        <LoadingBackgrop open={loading_domain} />
                        {
                            !loading_domain && <>

                                <CSBreadcrum />

                                <div className="action_bar">
                                    <div className="__names">
                                        <FolderOpenIcon />

                                        <Typography sx={{ fontWeight: 400, fontSize: '18px', marginLeft: '10px' }} variant="h5" gutterBottom>
                                            {parent_domain.menu_name}
                                        </Typography>
                                    </div>
                                    <div className="__actions">

                                    </div>
                                </div>

                                <DomainPanel />
                            </>
                        }
                    </>
                    }


                    {details_panel_type === 'sub_domain' && <>
                        <LoadingBackgrop open={loading_domain} />
                        {!loading_domain &&
                            <>

                                <CSBreadcrum />

                                <div className="action_bar">
                                    <div className="__names">
                                        <ApiIcon />

                                        <Typography sx={{ fontWeight: 400, fontSize: '18px', marginLeft: '10px' }} variant="h5" gutterBottom>
                                            {sub_domain.menu_name}
                                        </Typography>
                                    </div>
                                    <div className="__actions">

                                    </div>
                                </div>


                                <SubDomainPanel />
                            </>
                        }
                    </>
                    }

                    {details_panel_type === 'control' && <>

                        <LoadingBackgrop open={loading_control} />

                        {
                            !loading_control && <> <CSBreadcrum />

                                <div className="action_bar">
                                    <div className="__names">
                                        <SettingsIcon />

                                        <Typography sx={{ fontWeight: 400, fontSize: '18px', marginLeft: '10px' }} variant="h5" gutterBottom>
                                            {`${control.number} ${control.name}`}
                                        </Typography>
                                    </div>
                                    <div className="__actions">

                                    </div>
                                </div>

                                <ControlPanel />
                            </>
                        }
                    </>
                    }

                </div>
            </div>

            <FullscreenPopup />
            <FSCreateDocument />
            <UploadDocument />
            <LinkDocuments />
            <RenameDocument />
            <DeleteDocument />
            <UnlinkDocument />
        </>
    )
}

export default withRouter(DetailsPanel);