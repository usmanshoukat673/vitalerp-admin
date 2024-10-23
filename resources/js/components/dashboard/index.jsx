import React from "react";
import { Grid, Box, Typography, Paper, Divider, Link } from "@mui/material";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import DashboardAction from './DashboardAction';

const Dashboard = ({ leftnav }) => {

    const history = useHistory();

    const { company, active_supplier, cp_active_tab } = useSelector(state => ({
        company: state.orgs.company,
        active_supplier: state.corporate.active_supplier,
        cp_active_tab: state.corporate.cp_active_tab,
    }));

    const navigateToCP = () => {
        history.push(`/${company.slug}/corporate-profile/${active_supplier.slug}/${cp_active_tab}`);
    }

    return (
        <div className={classNames(leftnav.open_sub ? 'sub__slide__menu_opened' : '')} >
            <Box marginBottom={2} sx={{ display: 'flex', justifyContent: 'space-between', pt: '14px', ml: 2, mr: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <i className="uil-home-alt" style={{ marginRight: '10px', fontSize: '24px' }} />
                    <Typography variant='h1' sx={{ fontSize: '24px', fontWeight: '500', color: '#000' }} >
                        Dashboard
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ ml: 2, mr: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Box>
                                <Typography sx={{ mb: 2 }}>
                                    Welcome to VitalERP.  This application a fully integrated application that handles the complete government contract life-cycle management.
                                </Typography>
                                <Typography sx={{ mb: 2 }}>
                                    In this initial release only the Corporate profile is available to complete.  The Corporate Profile allows us to have the information on-hand to allow you to participate in Request for Proposals.
                                </Typography>
                                <Typography sx={{ mb: 2 }}>
                                    In the coming quarter, additional functionality will be added to all you to manage your workforce at time of award, see metrics to see how you are performing, and submit and track invoices for timely payment.
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Right Column - 30% */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
                            <Typography variant="h5" gutterBottom>
                                Pending Approvals
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box>
                                <Typography variant="body1" gutterBottom sx={{ textAlign: 'center' }}>
                                    You don't have anything that needs attention
                                </Typography>
                            </Box>
                        </Paper>

                        <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
                            <Typography variant="h5" gutterBottom>
                                Actions
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            
                            <DashboardAction />
                        </Paper>

                        <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
                            <Typography variant="h5" gutterBottom>
                                Quick Links
                            </Typography>
                            <Divider sx={{ mb: 2 }} />

                            <Box>
                                <Link onClick={navigateToCP} sx={{ cursor: 'pointer', fontWeight: 500, fontSize: '16px' }} underline="none">
                                    {'Corporate Profile'}
                                </Link>

                                <Typography variant="body1" gutterBottom>
                                    Complete your corporate profile to be eligible for task orders
                                </Typography>
                            </Box>

                            <Divider sx={{ mb: 2 }} />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Dashboard;
