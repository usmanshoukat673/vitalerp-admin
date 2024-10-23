import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import portalAxiosInstance from "../../api/portalApi";
import { useDispatch } from "react-redux";
import { setPortalActiveDomains, setPortalActiveStandard } from "../../actions";
import { NotificationManager } from "react-notifications";
import { withRouter } from "react-router-dom";
import { truncateText } from "../../utils/stringUtils";

const CatalogItem = ({ standard, history, match }) => {

    let dispatch = useDispatch();

    const navigateStandard = () => {
        portalAxiosInstance.get(`/standards/domains/${standard.id}`)
            .then(e => {
                if (!_.isEmpty(standard)) {
                    dispatch(setPortalActiveStandard(standard));
                    dispatch(setPortalActiveDomains(e.data));
                    history.push(`/policy-panels/${match.params.portal_link}/pp/${standard.slug}`);
                }
                else {
                    NotificationManager.error('UI Error, Please contact customer support.', 'Error');
                }
            })
            .catch(err => {
                if (err.response.status === 404) {
                    NotificationManager.error('NOT FOUND', 'Error');
                }
            });
    }

    return (
        <Row style={{ padding: '20px 0 36px' }}>
            <Col xxl={3} xl={3} lg={3} md={3}>
                <h3 style={{ color: 'rgb(32,33,36)', fontSize: '20px', fontWeight: 500 }}>{standard.name}</h3>
            </Col>
            <Col xxl={9} xl={9} lg={9} md={9}>
                <Row>
                    <Col xxl={8} xl={8} lg={8} md={8}>
                        <p style={{ color: 'rgb(95,99,104)', fontSize: '20px' }}>
                            {truncateText(standard.overview, 55)}
                        </p>
                    </Col>
                    <Col xxl={4} xl={4} lg={4} md={4}>
                        <Card sx={{ minWidth: 172 }}>
                            <div style={{ padding: '24px' }}>
                                <Typography variant="h5" component="div" sx={{ fontSize: '20px', fontWeight: 500, color: 'rgb(32,33,36)' }}>
                                    {standard.name}
                                </Typography>

                            </div>
                            <div style={{ padding: '12px 12px 8px' }}>
                                <span onClick={navigateStandard} style={{ color: 'rgb(26,115,232)', backgroundColor: 'transparent', paddingLeft: '12px', paddingRight: '12px', fontWeight: 500, fontSize: '16px', cursor: 'pointer' }}>View Policies</span>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default withRouter(CatalogItem);