import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { List, ListItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCPActiveTab } from './actions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const NavigationWithConfirmation = () => {
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false); // Track unsaved changes
    const [nextRoute, setNextRoute] = useState(null); // Store the next route before navigation
    const [openDialog, setOpenDialog] = useState(false); // Control the dialog
    const history = useHistory(); // For navigation

    const dispatch = useDispatch();

    const { company, active_supplier, corporate_profile_status } = useSelector(state => ({
        company: state.orgs.company,
        active_supplier: state.corporate.active_supplier,
        corporate_profile_status: state.corporate.corporate_profile_status,
    }));

    const handleNavigation = (route) => {
        if (hasUnsavedChanges) {
            setNextRoute(route);
            setOpenDialog(true);
        } else {
            history.push(route);
        }
    };

    const handleDialogClose = (saveChanges) => {
        setOpenDialog(false);
        if (saveChanges) {
            // Handle saving changes here
            console.log('Changes saved!');
        }
        setHasUnsavedChanges(false); // Reset unsaved changes
        if (nextRoute) {
            history.push(nextRoute);
        }
    };

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <List style={{ display: 'flex', padding: 0 }}>
                        <ListItem style={{ width: 'auto', paddingLeft:"8px", paddingRight:"8px"}}>
                            <Button
                                color="inherit"
                                component={NavLink}
                                to={`/${company.slug}/corporate-profile/${active_supplier.slug}/corporate-information`}
                                activeClassName="active"
                                sx={{
                                    color: 'inherit',
                                    '&.active': {
                                        color: 'primary.main',  
                                        fontWeight: 'bold',
                                        borderBottom: '2px solid',
                                        borderColor: 'primary.main', 
                                        borderRadius: '0px',
                                        paddingLeft:"8px", paddingRight:"8px"
                                    },
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(setCPActiveTab('corporate-information'));
                                    handleNavigation(`/${company.slug}/corporate-profile/${active_supplier.slug}/corporate-information`);
                                }}
                            >
                               {corporate_profile_status.corporate_information && <CheckCircleIcon sx={{color: 'green', mr: 1}} />} Corporate Information 
                            </Button>
                        </ListItem>
                        <ListItem style={{ width: 'auto', paddingLeft:"8px", paddingRight:"8px" }}>
                            <Button
                                color="inherit"
                                component={NavLink}
                                to={`/${company.slug}/corporate-profile/${active_supplier.slug}/capability`}
                                activeClassName="active"
                                sx={{
                                    color: 'inherit',
                                    '&.active': {
                                        color: 'primary.main',
                                        fontWeight: 'bold',
                                        borderBottom: '2px solid',
                                        borderColor: 'primary.main', 
                                        borderRadius: '0px',
                                        paddingLeft:"8px", paddingRight:"8px"
                                    },
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(setCPActiveTab('capability'));
                                    handleNavigation(`/${company.slug}/corporate-profile/${active_supplier.slug}/capability`);
                                }}
                            >
                                {corporate_profile_status.supplier_capability && <CheckCircleIcon sx={{color: 'green', mr: 1}} />} Capability
                            </Button>
                        </ListItem>
                        <ListItem style={{ width: 'auto', paddingLeft:"8px", paddingRight:"8px" }}>
                            <Button
                                color="inherit"
                                component={NavLink}
                                to={`/${company.slug}/corporate-profile/${active_supplier.slug}/socioenomic`}
                                activeClassName="active"
                                sx={{
                                    color: 'inherit',
                                    '&.active': {
                                        color: 'primary.main',
                                        fontWeight: 'bold',
                                        borderBottom: '2px solid',
                                        borderColor: 'primary.main', 
                                        borderRadius: '0px',
                                        paddingLeft:"8px", paddingRight:"8px"
                                    },
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(setCPActiveTab('socioenomic'));
                                    handleNavigation(`/${company.slug}/corporate-profile/${active_supplier.slug}/socioenomic`);
                                }}
                            >
                               {corporate_profile_status.supplier_socioenomic && <CheckCircleIcon sx={{color: 'green', mr: 1}} />} Socioeconomic
                            </Button>
                        </ListItem>
                        <ListItem style={{ width: 'auto', paddingLeft:"8px", paddingRight:"8px" }}>
                            <Button
                                color="inherit"
                                component={NavLink}
                                to={`/${company.slug}/corporate-profile/${active_supplier.slug}/security-and-certifications`}
                                activeClassName="active"
                                sx={{
                                    color: 'inherit',
                                    '&.active': {
                                        color: 'primary.main',
                                        fontWeight: 'bold',
                                        borderBottom: '2px solid',
                                        borderColor: 'primary.main', 
                                        borderRadius: '0px',
                                        paddingLeft:"8px", paddingRight:"8px"
                                    },
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(setCPActiveTab('security-and-certifications'));
                                    handleNavigation(`/${company.slug}/corporate-profile/${active_supplier.slug}/security-and-certifications`);
                                }}
                            >
                                {corporate_profile_status.security_certifications && <CheckCircleIcon sx={{color: 'green', mr: 1}} />} Security & Certifications
                            </Button>
                        </ListItem>
                        <ListItem style={{ width: 'auto', paddingLeft:"8px", paddingRight:"8px" }}>
                            <Button
                                color="inherit"
                                component={NavLink}
                                to={`/${company.slug}/corporate-profile/${active_supplier.slug}/past-performance`}
                                activeClassName="active"
                                sx={{
                                    color: 'inherit',
                                    '&.active': {
                                        color: 'primary.main',
                                        fontWeight: 'bold',
                                        borderBottom: '2px solid',
                                        borderColor: 'primary.main', 
                                        borderRadius: '0px',
                                        paddingLeft:"8px", paddingRight:"8px"
                                    },
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(setCPActiveTab('past-performance'));
                                    handleNavigation(`/${company.slug}/corporate-profile/${active_supplier.slug}/past-performance`);
                                }}
                            >
                                {corporate_profile_status.past_performance && <CheckCircleIcon sx={{color: 'green', mr: 1}} />} Past Performance
                            </Button>
                        </ListItem>
                    </List>
                </Box>
                <Box>

                </Box>
            </Box>

            {/* Unsaved Changes Dialog */}
            <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
                <DialogTitle>Unsaved Changes</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You have unsaved changes. Do you want to save them before leaving?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose(false)} color="primary">Discard</Button>
                    <Button onClick={() => handleDialogClose(true)} color="primary" autoFocus>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NavigationWithConfirmation;
