import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import LoadingBackgrop from "../../LoadingBackgrop";
import VisitDashboardBreadcrum from "../../dashboard/VisitDashboardBreadcrum";
import { Col, Row } from "react-bootstrap";
import Typography from '@mui/material/Typography';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { selectLanDetailsPanelType } from "../../../actions";

const ThreatTrendsDetailsPanel = ({ history, match }) => {

    const dispatch = useDispatch();

    const [loading_category, setLoadingCategory] = useState(false);
    const [loading_parent_asset, setParentAsset] = useState(false);
    const [loading_sub_asset, setSubAssetLoading] = useState(false);

    const { company, details_panel_type, category, parent_asset, sub_asset } = useSelector((state) => ({
        company: state.orgs.company,
        details_panel_type: state.lanscape.details_panel_type,
        category: state.lanscape.category,
        parent_asset: state.lanscape.parent_asset,
        sub_asset: state.lanscape.sub_asset,
    }));

    useEffect(() => {
        // Your logic to compare with the specified path
        const expectedPath = `/threat-trends/:category`;

        if (match.path === expectedPath) {
            // Perform actions based on the URL parameters
            console.log("Loading category info...");
        }

    }, [match.path, category]);

    useEffect(() => {
        // Your logic to compare with the specified path
        const expectedPath = `/threat-trends/:category/:parent_asset`;

        if (match.path === expectedPath) {
            // Perform actions based on the URL parameters
            console.log("Loading category parent_asset...");
        }

    }, [match.path, category, parent_asset]);

    useEffect(() => {
        // Your logic to compare with the specified path
        const expectedPath = `/threat-trends/:category/:parent_asset/:child_asset`;

        if (match.path === expectedPath) {
            // Perform actions based on the URL parameters
            console.log("Loading category sub_asset...");
        }

    }, [match.path, category, parent_asset, sub_asset]);

    const handleLanNavigateion = () => {
        history.push(`/threat-trends`);
    }

    const handleLanCategoryNav = () => {
        dispatch(selectLanDetailsPanelType('category'));
        history.push(`/threat-trends/${category.slug}`);
    }

    const LanBreadcrum = () => {
        return (
            <div className="cs_breadcrum">
                <VisitDashboardBreadcrum /> {' > '}
                <span className="_active" onClick={handleLanNavigateion} >Threat Trends</span> {' > '}
                <span className="_active" onClick={handleLanCategoryNav} >{category.name}</span> {' > '}
                <span>{parent_asset.name}</span>
            </div>
        )
    }

    return (
        <>
            <div className="ccroot__mainbd" style={{ paddingTop: '16px' }}>
                <div className="cc__header">
                    <div className="__name">{category.name}</div>
                    <div className="__actions">

                    </div>
                </div>
            </div>

            <div className="new_compliance">

                {details_panel_type === 'category' && <>
                    <LoadingBackgrop open={loading_category} />
                    {
                        !loading_category && <>

                            <div className="cs_breadcrum">
                                <VisitDashboardBreadcrum /> {' > '}
                                <span className="_active" onClick={handleLanNavigateion} >Threat Trends</span> {' > '}
                                <span>{category.name}</span>
                            </div>

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


                        </>
                    }
                </>
                }

                {details_panel_type === 'parent_asset' && <>
                    <LoadingBackgrop open={loading_parent_asset} />
                    {
                        !loading_parent_asset && <>

                            <LanBreadcrum />

                            <div className="action_bar">
                                <div className="__names">
                                    <SpaceDashboardIcon />

                                    <Typography sx={{ fontWeight: 400, fontSize: '18px', marginLeft: '10px' }} variant="h5" gutterBottom>
                                        {parent_asset.name}
                                    </Typography>
                                </div>
                                <div className="__actions">

                                </div>
                            </div>

                            <Row style={{ padding: '10px 0px' }}>
                                <Col>
                                    <Typography sx={{ fontWeight: 400, fontSize: '16px', margin: '0px' }} variant="h6" gutterBottom>
                                        Parent asset Info
                                    </Typography>
                                </Col>
                            </Row>


                        </>
                    }
                </>
                }

                {details_panel_type === 'sub_asset' && <>
                    <LoadingBackgrop open={loading_sub_asset} />
                    {
                        !loading_sub_asset && <>

                            <LanBreadcrum />

                            <div className="action_bar">
                                <div className="__names">
                                    <SpaceDashboardIcon />

                                    <Typography sx={{ fontWeight: 400, fontSize: '18px', marginLeft: '10px' }} variant="h5" gutterBottom>
                                        {sub_asset.name}
                                    </Typography>
                                </div>
                                <div className="__actions">

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

                        </>
                    }
                </>
                }

            </div>
        </>
    );
}

export default withRouter(ThreatTrendsDetailsPanel);