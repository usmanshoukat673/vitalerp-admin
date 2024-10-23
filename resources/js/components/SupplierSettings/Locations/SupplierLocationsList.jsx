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
import { setAddSupplierLocationDialog, setEditSupplierLocationDialog } from "../../../actions";
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from "../../../api/api";
import _ from "lodash";
import { Pagination, Stack, TextField, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid, Link, MenuItem } from "@mui/material";


const SupplierLocationsList = () => {

    const { supplier, addSupplierLocationDialog, editSupplierLocationDialog } = useSelector((state) => ({
        supplier: state.supplier.supplier,
        addSupplierLocationDialog: state.locations.addSupplierLocationDialog,
        editSupplierLocationDialog: state.locations.editSupplierLocationDialog
    }));

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        getLocations();
    }, [page, search]);

    useEffect(() => {
        if (addSupplierLocationDialog?.added) {
            setPage(1);
            getLocations();
            dispatch(setAddSupplierLocationDialog({ added: false }));
        }
        if (editSupplierLocationDialog?.updated) {
            setPage(1);
            getLocations();
            dispatch(setEditSupplierLocationDialog({ updated: false }));
        }
    }, [addSupplierLocationDialog, editSupplierLocationDialog]);

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1); // Reset to first page when search changes
    }


    const getLocations = () => {
        setLoading(true);
        axiosInstance
            .get(`/api/user/suppliers/${supplier.id}/locations?page=${page}&search=${search}`)
            .then((res) => {
                setLoading(false);
                setList(res.data.data);
                setTotalItems(res.data.total);
                setTotalPages(res.data.total_pages);
                setNextPage(res.data.next_page_url);
                setPrevPage(res.data.prev_page_url);
            })
            .catch((err) => {
                setLoading(false);
                NotificationManager.error('Server Error, Please contact customer support.', 'Error');
            });
    }

    const handleAddLocation = () => {
        dispatch(setAddSupplierLocationDialog({ open: true }));
    }

    const handleEditClick = (location) => {
        dispatch(setEditSupplierLocationDialog({ open: true, location }));
    }

    const handleDeleteClick = (location) => {
        setDeleteDialogOpen(true);
        setSelectedLocation(location);
    }

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedLocation(null);
    }

    const handleDeleteLBConfirm = (id) => {
        axiosInstance.delete(`/api/user/suppliers/locations/${id}`)
            .then(e => {
                handleCloseDeleteDialog();
                setPage(1);
                getLocations();
                NotificationManager.success('Location deleted successfully.', 'Success');
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    NotificationManager.warning('Cannot deleted Location.', 'Error');
                }
            });
    }

    return (
        <>
            <Box sx={{ width: '100%', mb: 2 }}>
                <Grid container>
                    <Grid item xs={6} md={7} lg={9} xl={10} sx={{
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

                    <Grid item xs={6} md={5} lg={3} xl={2} sx={{
                        textAlign: {
                            xs: 'right',
                            md: 'right',
                            lg: 'right',
                            xl: 'right'
                        },
                        pl: {
                            xs: 1,
                            md: 0,
                            lg: 0,
                            xl: 0
                        },
                        verticalAlign: 'middle',
                    }}>

                        <Button onClick={handleAddLocation} startIcon={<AddIcon />} variant="contained">Add Location</Button>

                    </Grid>

                </Grid>
            </Box>

            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="locations list" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">Address</TableCell>
                                <TableCell align="center">City</TableCell>
                                <TableCell align="center">State</TableCell>
                                {/* <TableCell align="center">Zip Code</TableCell> */}
                                <TableCell align="center">Country</TableCell>
                                <TableCell align="center">Timezone</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                _.size(list) > 0 ? _.map(list, (location) => (
                                    <TableRow
                                        key={location.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">
                                            <Link underline="hover" onClick={() => handleEditClick(location)} style={{ cursor: 'pointer' }}>
                                                {location.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">{location.address}</TableCell>
                                        <TableCell align="center">{location.city}</TableCell>
                                        <TableCell align="center">{location.state}</TableCell>
                                        {/* <TableCell align="center">{location.zip_code}</TableCell> */}
                                        <TableCell align="center">{location.country}</TableCell>
                                        <TableCell align="center">{location.timezone}</TableCell>
                                        <TableCell align="right">

                                        </TableCell>
                                    </TableRow>
                                )) : <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        No locations found
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', mt: 2, pb: '85px' }} spacing={2}>
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} />
                </Stack>

            </div>

            <Dialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Confirm Delete Location</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this Location?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button color="error" onClick={() => handleDeleteLBConfirm(selectedLocation.id)}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SupplierLocationsList;
