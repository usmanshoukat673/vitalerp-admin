import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import { Pagination, Stack, TextField, FormControl, InputLabel, Select, MenuItem, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Link, Typography, Chip, Grid, Checkbox, ListItemText } from "@mui/material";
import _ from 'lodash';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useHistory } from 'react-router-dom';
import moment from "moment";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/Key';
import SendIcon from '@mui/icons-material/Send';
import axiosInstance from "../../../api/api";
import { setAddSupplierUserDialog, setEditSupplierUserDialog } from "../../../actions";
import RolePopover from '../../Global/RolePopover';
import ActionsButton from "../../Global/ActionsButton";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';

const accountStateses = [
    {
        id: 'Active',
        name: 'Active',
    },
    {
        id: 'Inactive',
        name: 'Inactive',
    },
]

const SupplierUsersList = ({ roles }) => {
    const { addSupplierUserDialog, editSupplierUserDialog, supplier } = useSelector((state) => ({
        addSupplierUserDialog: state.supplier.addSupplierUserDialog,
        editSupplierUserDialog: state.supplier.editSupplierUserDialog,
        supplier: state.supplier.supplier
    }));

    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [totalItems, setTotalItems] = useState(0);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
    const [resendDialogOpen, setResedDialogOpen] = useState(false);
    const [activateDialogOpen, setActivateDialogOpen] = useState(false);
    const [disableDialogOpen, setDisableDialogOpen] = useState(false);

    useEffect(() => {
        getSuppliersUsers();
    }, [page, search, selectedRoles, selectedStates]);

    useEffect(() => {
        if (addSupplierUserDialog?.added) {
            setPage(1);
            getSuppliersUsers();
            dispatch(setAddSupplierUserDialog({ added: false }));
        }
        if (editSupplierUserDialog?.updated) {
            setPage(1);
            getSuppliersUsers();
            dispatch(setEditSupplierUserDialog({ updated: false }));
        }

    }, [addSupplierUserDialog, editSupplierUserDialog]);

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1); // Reset to first page when search changes
    }

    const handleRoleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedRoles(
            typeof value === 'string' ? value.split(',') : value,
        );
        setPage(1); // Reset to first page when roles change
    }

    const handleAccountStatusChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedStates(
            typeof value === 'string' ? value.split(',') : value,
        );
        setPage(1); // Reset to first page when roles change
    }

    const getSuppliersUsers = () => {
        axiosInstance.get(`/api/user/suppliers/users/${supplier.id}`, {
            params: {
                page: page,
                search,
                role: selectedRoles,
                status: selectedStates
            }
        })
            .then(e => {
                setList(e.data.data);
                setTotalPages(e.data.last_page);
                setNextPage(e.data.next_page_url);
                setPrevPage(e.data.prev_page_url);
                setTotalItems(e.data.total);
                setLoading(false);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }
            });
    }

    const handleDeleteClick = (user) => {
        setDeleteDialogOpen(true);
        setSelectedUser(user);
    }

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedUser(null);
    }

    const handleDeleteSupplierConfirm = (id) => {
        axiosInstance.delete(`/api/user/suppliers/users/delete/${id}`)
            .then(e => {
                handleCloseDeleteDialog();
                getSuppliersUsers();
                NotificationManager.success('User deleted successfully.', 'Success');
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    NotificationManager.warning('Cannot deleted supplier.', 'Error');
                }
            });
    }

    const handleResendClick = (user) => {
        setResedDialogOpen(true);
        setSelectedUser(user);
    }

    const handleCloseResendDialog = () => {
        setResedDialogOpen(false);
        setSelectedUser(null);
    }

    const handleResendLoginDetailsConfirm = (id) => {
        axiosInstance.post(`/api/user/suppliers/users/resend-login-details/${id}`)
            .then(e => {
                handleCloseResendDialog();
                NotificationManager.success(e.data.message, 'Success');
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    NotificationManager.warning(err.response.data.message, 'Error');
                }
            });
    }

    const handleInviteClick = (user) => {
        setInviteDialogOpen(true);
        setSelectedUser(user);
    }

    const handleCloseInviteDialog = () => {
        setInviteDialogOpen(false);
        setSelectedUser(null);
    }

    const handleInviteUserConfirm = (id) => {
        axiosInstance.post(`/api/user/suppliers/users/invite-user`, { user_id: id })
            .then(e => {
                handleCloseInviteDialog();
                NotificationManager.success(e.data.message, 'Success');
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    NotificationManager.warning(err.response.data.message, 'Error');
                }
            });
    }

    const handleActivateClick = (user) => {
        setActivateDialogOpen(true);
        setSelectedUser(user);
    }

    const handleCloseActivateDialog = () => {
        setActivateDialogOpen(false);
        setSelectedUser(null);
    }

    const handleActiveUserConfirm = (id) => {
        axiosInstance.post(`/api/user/suppliers/users/chnage-user-status/${id}`, { status: 'Active' })
            .then(e => {
                handleCloseActivateDialog();
                NotificationManager.success(e.data.message, 'Success');
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    NotificationManager.warning(err.response.data.message, 'Error');
                }
            });
    }

    const handleDisableClick = (user) => {
        setDisableDialogOpen(true);
        setSelectedUser(user);
    }

    const handleCloseDisableDialog = () => {
        setDisableDialogOpen(false);
        setSelectedUser(null);
    }

    const handleDisableUserConfirm = (id) => {
        axiosInstance.post(`/api/user/suppliers/users/chnage-user-status/${id}`, { status: 'Inactive' })
            .then(e => {
                handleCloseDisableDialog();
                NotificationManager.success(e.data.message, 'Success');
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    NotificationManager.warning(err.response.data.message, 'Error');
                }
            });
    }

    const handleAddSupplierUser = () => {
        dispatch(setAddSupplierUserDialog({
            open: true
        }));
    }

    const handleUserEdit = (user) => {
        dispatch(setEditSupplierUserDialog({
            open: true,
            user
        }));
    }

    return (
        <>
            <Box sx={{ width: '100%', mb: 2 }}>
                <Grid container>
                    <Grid item xs={6} md={6} lg={4} xl={4} sx={{
                        pr: {
                            xs: 1,
                            md: 0,
                            lg: 0,
                            xl: 0
                        }
                    }}>
                        <TextField
                            fullWidth
                            label="Search"
                            variant="outlined"
                            value={search}
                            onChange={handleSearchChange}
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={6} md={6} lg={3} xl={3} sx={{
                        pl: {
                            xs: 1,
                            md: 0,
                            lg: 0,
                            xl: 0
                        }
                    }} >

                        <FormControl fullWidth size="small" sx={{
                            ml: {
                                xs: 0,
                                md: 2,
                                lg: 2,
                                xl: 2
                            }
                        }}>
                            <InputLabel id="role_select_label">Role</InputLabel>
                            <Select
                                labelId="role_select_label"
                                label="Role"
                                id="role_select"
                                multiple
                                value={selectedRoles}
                                onChange={handleRoleChange}
                                renderValue={(selected) => selected.map(roleId => {
                                    const role = roles.find(r => r.id === roleId);
                                    return role ? role.name : '';
                                }).join(', ')}
                            >
                                <MenuItem value="" disabled>
                                    <em>All Roles</em>
                                </MenuItem>
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id} sx={{ display: 'flex !important', alignItems: 'center !important' }}>
                                        <Checkbox checked={selectedRoles.indexOf(role.id) > -1} />
                                        <ListItemText primary={role.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Grid>

                    <Grid item xs={6} md={6} lg={3} xl={3} sx={{
                        pl: {
                            xs: 0,
                            md: 0,
                            lg: 2,
                            xl: 2
                        }
                    }} >

                        <FormControl fullWidth size="small" sx={{
                            ml: {
                                xs: 0,
                                md: 0,
                                lg: 2,
                                xl: 2
                            },
                            mt: {
                                xs: 2,
                                md: 2,
                                lg: 0,
                                xl: 0
                            }
                        }}>
                            <InputLabel id="status_select_label">Account Status</InputLabel>
                            <Select
                                labelId="status_select_label"
                                label="Account Status"
                                id="role_select"
                                multiple
                                value={selectedStates}
                                onChange={handleAccountStatusChange}
                                renderValue={(selected) => selected.map(statusId => {
                                    const status = accountStateses.find(r => r.id === statusId);
                                    return status ? status.name : '';
                                }).join(', ')}
                            >
                                <MenuItem value="" disabled >
                                    <em>All</em>
                                </MenuItem>
                                {accountStateses.map((user) => (
                                    <MenuItem key={user.id} value={user.id} sx={{ display: 'flex !important', alignItems: 'center !important' }}>
                                        <Checkbox checked={selectedStates.indexOf(user.id) > -1} />
                                        <ListItemText primary={user.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Grid>

                    <Grid item xs={6} md={6} lg={2} xl={2} sx={{
                        textAlign: {
                            xs: 'left',
                            md: 'left',
                            lg: 'right',
                            xl: 'right'
                        },
                        mt: {
                            xs: 2,
                            md: 2,
                            lg: 0,
                            xl: 0
                        },
                        pl: {
                            xs: 2,
                            md: 2,
                        }
                    }}>
                        <Button onClick={handleAddSupplierUser} startIcon={<AddIcon />} variant="contained">Add User</Button>
                    </Grid>

                </Grid>
            </Box>

            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="user list" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">User Name</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Phone</TableCell>
                            <TableCell align="left">Roles</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Last Logon</TableCell>
                            <TableCell align="center">Last Invite</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            _.map(list, (user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="left">
                                        <Link onClick={() => handleUserEdit(user)} underline="none" sx={{ cursor: 'pointer' }}>
                                            {user.email}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">
                                        {`${user.last_name}, ${user.first_name}`}
                                    </TableCell>
                                    <TableCell align="left">{user.phone}</TableCell>
                                    <TableCell align="left">
                                        <Stack direction="row" spacing={1}>
                                            <RolePopover roles={user.supplier_roles} />
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center">{user.status}</TableCell>
                                    <TableCell align="center">
                                        {
                                            _.size(user.login_activities) > 0 ? moment(user.login_activities[0].created_at).format('MM/DD/YYYY HH:mm') : 'Never'
                                        }
                                    </TableCell>
                                    <TableCell align="center">
                                        {!_.isEmpty(user.last_invite) ? moment(user.last_invite).format('MM/DD/YYYY HH:mm') : 'Never'}
                                    </TableCell>
                                    <TableCell align="right">
                                        <ActionsButton>
                                            <MenuItem onClick={() => handleInviteClick(user)} disableRipple>
                                                <SendIcon />
                                                Invite User
                                            </MenuItem>
                                            <MenuItem onClick={() => handleResendClick(user)} disableRipple>
                                                <KeyIcon />
                                                Resend Login
                                            </MenuItem>
                                            {
                                                user.status === 'Active' ? (
                                                    <MenuItem onClick={() => handleDisableClick(user)} disableRipple>
                                                        <DoDisturbOnIcon />
                                                        Disable Account
                                                    </MenuItem>
                                                ) : (
                                                    <MenuItem onClick={() => handleActivateClick(user)} disableRipple>
                                                        <CheckCircleIcon />
                                                        Enable Account
                                                    </MenuItem>)
                                            }

                                        </ActionsButton>
                                        {/*<Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end' }} spacing={2}>
                                             <Button
                                                aria-label="Edit supplier"
                                                size="small"
                                                variant="contained"
                                                startIcon={<EditIcon />}
                                                onClick={() => handleEditClick(user)}
                                            >
                                                Edit
                                            </Button> 
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<DeleteOutlineIcon />}
                                                aria-label="Delete supplier user"
                                                onClick={() => handleDeleteClick(user)}
                                                color="secondary"
                                            >
                                                Delete
                                            </Button>  
                                            
                                        </Stack> */}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', mt: 2, pb: '85px' }} spacing={2}>
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Stack>

            <Dialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Confirm Delete Supplier User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this Supplier User?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button color="error" onClick={() => handleDeleteSupplierConfirm(selectedUser.id)}>Delete</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={resendDialogOpen}
                onClose={handleCloseResendDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Confirm Resend Login Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to reset and send login details via email?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleCloseResendDialog}>Cancel</Button>
                    <Button color="error" onClick={() => handleResendLoginDetailsConfirm(selectedUser.id)}>Send</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={inviteDialogOpen}
                onClose={handleCloseInviteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Confirm Invite User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to invite this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleCloseInviteDialog}>Cancel</Button>
                    <Button color="error" onClick={() => handleInviteUserConfirm(selectedUser.id)}>Invite</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={activateDialogOpen}
                onClose={handleCloseActivateDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Confirm enable user account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to enable this user account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleCloseActivateDialog}>Cancel</Button>
                    <Button color="error" onClick={() => handleActiveUserConfirm(selectedUser.id)}>Enable</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={disableDialogOpen}
                onClose={handleCloseDisableDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Confirm disable user account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to disable this user account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleCloseDisableDialog}>Cancel</Button>
                    <Button color="error" onClick={() => handleDisableUserConfirm(selectedUser.id)}>Diable</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SupplierUsersList;
