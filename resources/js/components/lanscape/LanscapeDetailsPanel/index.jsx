import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import LoadingBackgrop from "../../LoadingBackgrop";
import { Col, Row } from "react-bootstrap";
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { saveModuleDetails, saveRecordDetails, selectLanDetailsPanelType } from "../../../actions";
import axiosInstance from "../../../api/api";
import ControlDescription from "./RecordDecription";
import DeleteRelatedRecord from "./DeleteRelatedRecord";
import DeleteRecord from "./DeleteRecord";
const VisitDashboardBreadcrum = React.lazy(() => import('../../dashboard/VisitDashboardBreadcrum'));
const CreateRecordsFS = React.lazy(() => import('../../record/CreateRecordsFS'));
const AddRecordButton = React.lazy(() => import('../../record/AddRecordButton'));
const RecordInformation = React.lazy(() => import('./RecordInformation'));
const RecordTabs = React.lazy(() => import('./RecordTabs'));
const ModuleTabs = React.lazy(() => import('./ModuleTabs'));

const LanscapeDetailsPanel = ({ history, match }) => {

    const dispatch = useDispatch();

    const [loading_category, setLoadingCategory] = useState(false);
    const [loading_parent_asset, setParentAsset] = useState(false);
    const [loading_sub_asset, setSubAssetLoading] = useState(false);
    const [loading_record, setLoadingRecord] = useState(false);

    const { details_panel_type, category, parent_asset, sub_asset, record, delete_related_record } = useSelector((state) => ({
        details_panel_type: state.lanscape.details_panel_type,
        category: state.lanscape.category,
        parent_asset: state.lanscape.parent_asset,
        sub_asset: state.lanscape.sub_asset,
        record: state.lanscape.record,
        delete_related_record: state.lanscape.delete_related_record,
    }));

    useEffect(() => {
        // Your logic to compare with the specified path
        const expectedPath = `/assets/:category`;
        if (match.path === expectedPath) {
            // Perform actions based on the URL parameters
            console.log("Loading category info...");
            setLoadingCategory(true);
            axiosInstance.get(`/api/user/records/module/details/${category.id}`)
                .then(e => {
                    dispatch(saveModuleDetails({
                        not_configured: e.data.not_configured,
                        records: e.data.records
                    }));
                })
                .catch(err => {
                }).finally(() => setLoadingCategory(false));
        }
    }, [match.path, category]);

    useEffect(() => {
        // Your logic to compare with the specified path
        const expectedPath = `/assets/:category/:parent_asset`;

        if (match.path === expectedPath) {
            // Perform actions based on the URL parameters
            console.log("Loading category parent_asset...");
        }

    }, [match.path, category, parent_asset]);

    useEffect(() => {
        // Your logic to compare with the specified path
        const expectedPath = `/assets/:category/:parent_asset/:child_asset`;

        if (match.path === expectedPath) {
            // Perform actions based on the URL parameters
            console.log("Loading category sub_asset...");
        }

    }, [match.path, category, parent_asset, sub_asset]);

    useEffect(() => {
        // Your logic to compare with the specified path
        const expectedPath = `/assets/:category/:parent_asset/:child_asset/:record`;

        if (match.path === expectedPath) {
            // Perform actions based on the URL parameters
            console.log("Loading category asset record...");
            setLoadingRecord(true);
            axiosInstance.get(`/api/user/records/details/${record.id}`)
                .then(e => {
                    dispatch(saveRecordDetails({
                        relatedrecords: e.data.relatedrecords,
                        teams: e.data.teams,
                        users: e.data.users,
                        locations: e.data.locations
                    }));
                })
                .catch(err => {
                }).finally(() => setLoadingRecord(false));
        }

    }, [match.path, category, parent_asset, sub_asset, record]);

    const handleLanNavigateion = () => {
        history.push(`/assets`);
    }

    const handleLanCategoryNav = () => {
        dispatch(selectLanDetailsPanelType('category'));
        history.push(`/assets/${category.slug}`);
    }

    const LanBreadcrum = () => {

        if (details_panel_type === 'category') {
            return (
                <>
                    <Suspense fallback={<div>Loading...</div>}><VisitDashboardBreadcrum /></Suspense> {' > '}
                    <span className="_active" onClick={handleLanNavigateion} >Assets</span> {' > '}
                    <span>{category.name}</span>
                </>
            )
        }
        else if (details_panel_type === 'parent_asset') {
            return (
                <>
                    <Suspense fallback={<div>Loading...</div>}><VisitDashboardBreadcrum /></Suspense> {' > '}
                    <span className="_active" onClick={handleLanNavigateion} >Assets</span> {' > '}
                    <span className="_active" onClick={handleLanCategoryNav} >{category.name}</span> {' > '}
                    <span>{parent_asset.name}</span>
                </>
            )
        }
        else if (details_panel_type === 'sub_asset') {
            return (
                <>
                    <Suspense fallback={<div>Loading...</div>}><VisitDashboardBreadcrum /></Suspense> {' > '}
                    <span className="_active" onClick={handleLanNavigateion} >Assets</span> {' > '}
                    <span className="_active" onClick={handleLanCategoryNav} >{category.name}</span> {' > '}
                    <span >{parent_asset.name}</span> {' > '}
                    <span>{sub_asset.name}</span>
                </>
            )
        }
        else if (details_panel_type === 'record') {
            return (
                <>
                    <Suspense fallback={<div>Loading...</div>}><VisitDashboardBreadcrum /></Suspense> {' > '}
                    <span className="_active" onClick={handleLanNavigateion} >Assets</span> {' > '}
                    <span className="_active" onClick={handleLanCategoryNav} >{category.name}</span> {' > '}
                    <span >{parent_asset.name}</span> {' > '}
                    <span>{sub_asset.name}</span> {' > '}
                    <span>{record.name}</span>
                </>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

    return (
        <>
            <div className="ccroot__mainbd" style={{ paddingTop: '16px' }}>
                <div className="cc__header">
                    <div className="__name">
                        <LanBreadcrum />
                    </div>
                    <div className="__actions">

                    </div>
                </div>
            </div>

            <div className="new_compliance">

                {details_panel_type === 'category' && <>
                    <LoadingBackgrop open={loading_category} />
                    {
                        !loading_category && <>

                            <div className="action_bar">
                                <div className="__names">
                                    <SpaceDashboardIcon />

                                    <Typography sx={{ fontWeight: 400, fontSize: '18px', marginLeft: '10px' }} variant="h5" gutterBottom>
                                        {category.name}
                                    </Typography>
                                </div>
                                <div className="__actions">

                                </div>
                            </div>

                            <Row style={{ padding: '10px 0px' }}>
                                <Col>
                                    <Typography sx={{ fontWeight: 400, fontSize: '16px', margin: '0px' }} variant="h6" gutterBottom>
                                        Category Info
                                    </Typography>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <ModuleTabs />
                                    </Suspense>
                                </Col>
                            </Row>
                        </>
                    }
                </>
                }

                {details_panel_type === 'parent_asset' && <>
                    <LoadingBackgrop open={loading_parent_asset} />
                    {
                        !loading_parent_asset && <>

                            <div className="action_bar">
                                <div className="__names">
                                    <SpaceDashboardIcon />

                                    <Typography sx={{ fontWeight: 400, fontSize: '18px', marginLeft: '10px' }} variant="h5" gutterBottom>
                                        {parent_asset.name}
                                    </Typography>
                                </div>
                                <div className="__actions">
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <AddRecordButton />
                                    </Suspense>
                                </div>
                            </div>

                            <Row style={{ padding: '10px 0px' }}>
                                <Col>
                                    <Typography sx={{ fontWeight: 400, fontSize: '16px', margin: '0px' }} variant="h6" gutterBottom>
                                        Parent asset Info
                                    </Typography>
                                </Col>
                            </Row>
                            {/* <Row>
                                <Col>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <ModuleTabs />
                                    </Suspense>
                                </Col>
                            </Row> */}
                        </>
                    }
                </>
                }

                {details_panel_type === 'sub_asset' && <>
                    <LoadingBackgrop open={loading_sub_asset} />
                    {
                        !loading_sub_asset && <>

                            <div className="action_bar">
                                <div className="__names">
                                    <SpaceDashboardIcon />

                                    <Typography sx={{ fontWeight: 400, fontSize: '18px', marginLeft: '10px' }} variant="h5" gutterBottom>
                                        {sub_asset.name}
                                    </Typography>
                                </div>
                                <div className="__actions">
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <AddRecordButton />
                                    </Suspense>
                                </div>
                            </div>

                            <Row style={{ padding: '10px 0px' }}>
                                <Col>
                                    <Typography sx={{ fontWeight: 400, fontSize: '16px', margin: '0px' }} variant="h6" gutterBottom>
                                        sub asset Info
                                    </Typography>
                                </Col>
                            </Row>

                            <Row>
                                <Col xm="6">

                                </Col>
                                <Col xm="6">

                                </Col>
                            </Row>

                            <Row>
                                <Col>

                                </Col>
                            </Row>

                        </>
                    }
                </>
                }

                {details_panel_type === 'record' && <>

                    <LoadingBackgrop open={loading_record} />

                    {
                        !loading_record && <>

                            <div className="action_bar">
                                <div className="__names">
                                    <SettingsIcon />

                                    <Typography sx={{ fontWeight: 400, fontSize: '18px', marginLeft: '10px' }} variant="h5" gutterBottom>
                                        {`${record.name}`}
                                    </Typography>
                                </div>
                                <div className="__actions">

                                </div>
                            </div>
                            <Row style={{ padding: '10px 0px' }}>
                                <Col>
                                    <Typography sx={{ fontWeight: 400, fontSize: '16px', margin: '0px' }} variant="h6" gutterBottom>
                                        Record Info
                                    </Typography>
                                </Col>
                            </Row>
                            <Row>
                                <Col xm="6">
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <RecordInformation />
                                    </Suspense>
                                </Col>
                                <Col xm="6">
                                    <ControlDescription />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <RecordTabs />
                                    </Suspense>
                                </Col>
                            </Row>
                        </>
                    }
                </>
                }

            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <CreateRecordsFS />
            </Suspense>

            <DeleteRelatedRecord />
            <DeleteRecord />
        </>
    );
}

export default withRouter(LanscapeDetailsPanel);