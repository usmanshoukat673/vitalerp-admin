import React from "react";
import ActionAlert from './ActionAlert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import './PolicyPanelBanner.scss';
import CatalogItem from "./CatalogItem";
import { useSelector } from "react-redux";

const PolicyPanelBanner = ({all_standards}) => {

    const { shared_company } = useSelector(state => ({
        shared_company: state.policyportal.shared_company,
    }));
    return (
        <div className="PolicyPanelBanner">
            <div className='pp__intro'>

                <section>
                    <ActionAlert />

                    <Row style={{ marginBottom: '40px' }}>
                        <Col xxl={8} xl={8} lg={8} md={8}>

                            <Typography sx={{ lineHeight: 3, color: 'rgb(95,99,104)' }} variant="h5" gutterBottom>
                                {`${shared_company.name}`}
                            </Typography>

                            <Typography variant="h3" gutterBottom>
                            Your portal to policy excellence - explore, learn, and connect with our compliance universe.
                            </Typography>

                            <Typography variant="body2" gutterBottom sx={{ color: 'rgb(95,99,104)', fontSize: '20px', marginBottom: '30px' }}>
                            We offer a seamless, user-friendly experience, enabling you to effortlessly access, research, and engage with our extensive collection of policies and supporting documents. Our platform is designed to cater to your needs for comprehensive understanding and interaction with governance, risk management, and compliance materials.
                            </Typography>

                            <Stack spacing={2} direction="row">
                                <Button size="large" variant="contained" sx={{textTransform: 'capitalize'}}>Learn more</Button>
                            </Stack>

                        </Col>
                        <Col xxl={4} xl={4} lg={4} md={4}>
                            {/* <Card sx={{ marginTop: '20px', backgroundColor: 'rgb(248,249,250)', borderRadius: '8px', boxShadow: 'none' }}>
                                <div style={{ padding: '24px 24px 8px' }}>
                                    <h3 style={{ color: 'rgb(95,99,104)', fontSize: '16px', fontWeight: 500 }}>Announcements</h3>
                                </div>


                                <Box sx={{ width: '100%' }}>
                                    <nav aria-label="main mailbox folders">
                                        <List>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <ArrowCircleDownIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<p>Build generative AI apps quickly with AppName </p>} />
                                                </ListItemButton>
                                            </ListItem>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <ArrowCircleDownIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<p>Build generative AI apps quickly with AppName </p>} />
                                                </ListItemButton>
                                            </ListItem>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <ArrowCircleDownIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<p>Build generative AI apps quickly with AppName </p>} />
                                                </ListItemButton>
                                            </ListItem>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <ArrowCircleDownIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<p>Build generative AI apps quickly with AppName </p>} />
                                                </ListItemButton>
                                            </ListItem>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <ArrowCircleDownIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<p>Build generative AI apps quickly with AppName </p>} />
                                                </ListItemButton>
                                            </ListItem>

                                        </List>
                                    </nav>

                                </Box>
                            </Card> */}
                        </Col>
                    </Row>
                </section>

                <section>
                    <p style={{ color: 'rgb(95,99,104)', marginTop: '16px', marginBottom: '16px', fontSize: '14px', textTransform: 'uppercase' }}>
                    Compliance Stack
                    </p>
                    {
                        _.map(all_standards, standard => <CatalogItem key={standard.id} standard={standard} />)
                    }
                    
                </section>
            </div>
        </div>
    )
}

export default PolicyPanelBanner;