import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { List, ListItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Stack } from '@mui/material';
import { useSelector } from 'react-redux';

const DomainNavigationWithConfirmation = () => {
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false); // Track unsaved changes
    const [nextRoute, setNextRoute] = useState(null); // Store the next route before navigation
    const [openDialog, setOpenDialog] = useState(false); // Control the dialog
    const history = useHistory(); // For navigation

    const { company } = useSelector(state => ({
        company: state.orgs.company,
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
                        <ListItem style={{ width: 'auto' }}>
                            <Button
                                color="inherit"
                                component={NavLink}
                                to={`/${company.slug}/domains`}
                                activeClassName="active"
                                sx={{
                                    color: 'inherit',
                                    '&.active': {
                                        color: 'primary.main',
                                        fontWeight: 'bold',
                                        borderBottom: '2px solid',
                                        borderColor: 'primary.main',
                                        borderRadius: '0px',
                                    },
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation(`/${company.slug}/domains`);
                                }}
                            >
                                Domains
                            </Button>
                        </ListItem>
                        {/* <ListItem style={{ width: 'auto' }}>
                            <Button
                                color="inherit"
                                component={NavLink}
                                to={`/${company.slug}/all/suppliers`}
                                activeClassName="active"
                                sx={{
                                    color: 'inherit',
                                    '&.active': {
                                        color: 'primary.main',
                                        fontWeight: 'bold',
                                        borderBottom: '2px solid',
                                        borderColor: 'primary.main',
                                        borderRadius: '0px',
                                    },
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation(`/${company.slug}/all/suppliers`);
                                }}
                            >
                                Suppliers
                            </Button>
                        </ListItem> */}
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

export default DomainNavigationWithConfirmation;