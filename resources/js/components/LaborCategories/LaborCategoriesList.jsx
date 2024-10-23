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
import { Pagination, Stack, TextField, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid, Link, MenuItem } from "@mui/material";
import _ from 'lodash';
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from "../../api/api";
import { setAddLaborCategoryDialog, setEditLaborCategoryDialog } from "../../actions";
import ActionsButton from "../Global/ActionsButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const NaicsCodesList = () => {
    const { addLaborCategoryDialog, editLaborCategoryDialog } = useSelector((state) => ({
        addLaborCategoryDialog: state.validvalues.addLaborCategoryDialog,
        editLaborCategoryDialog: state.validvalues.editLaborCategoryDialog,
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
    const [selectedLaborCategory, setSelectedLaborCategory] = useState(null);

    useEffect(() => {
        getLaborCategories();
    }, [page, search]);

    useEffect(() => {
        if (addLaborCategoryDialog?.added) {
            setPage(1);
            getLaborCategories();
            dispatch(setAddLaborCategoryDialog({ added: false }));
        }
        if (editLaborCategoryDialog?.updated) {
            setPage(1);
            getLaborCategories();
            dispatch(setEditLaborCategoryDialog({ updated: false }));
        }
    }, [addLaborCategoryDialog, editLaborCategoryDialog]);

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1); // Reset to first page when search changes
    }

    const getLaborCategories = () => {
        axiosInstance.get(`/api/user/valid-values/labor-categories`, {
            params: {
                page: page,
                search
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

    const handleDeleteClick = (laborCategory) => {
        setDeleteDialogOpen(true);
        setSelectedLaborCategory(laborCategory);
    }

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedLaborCategory(null);
    }

    const handleDeleteLBConfirm = (id) => {
        axiosInstance.delete(`/api/user/valid-values/labor-categories/${id}`)
            .then(e => {
                handleCloseDeleteDialog();
                getLaborCategories();
                NotificationManager.success('Labor Category deleted successfully.', 'Success');
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    NotificationManager.warning('Cannot deleted Labor Category.', 'Error');
                }
            });
    }

    const handleAddLaborCategories = () => {
        dispatch(setAddLaborCategoryDialog({
            open: true
        }));
    }

    const handleEditClick = (laborCategory) => {
        dispatch(setEditLaborCategoryDialog({
            open: true,
            laborCategory
        }));
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

                        <Button onClick={handleAddLaborCategories} startIcon={<AddIcon />} variant="contained">Add Labor Category</Button>

                    </Grid>

                </Grid>
            </Box>

            <Box>

                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label="labor categories list" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">NAICS Code</TableCell>
                                <TableCell align="center">PCS Code</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                _.map(list, (laborCategory) => (
                                    <TableRow
                                        key={laborCategory.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" align="left">
                                            <Link underline="hover" onClick={() => handleEditClick(laborCategory)} style={{ cursor: 'pointer' }}>
                                                {`${laborCategory.name}`}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                _.isEmpty(laborCategory.naics_code) ? '' : `${laborCategory.naics_code.naics_code} - ${laborCategory.naics_code.naics_industry_description}`
                                            }
                                        </TableCell>
                                        <TableCell align="center">{laborCategory.pcs_code}</TableCell>
                                        <TableCell align="center">{laborCategory.description}</TableCell>
                                        <TableCell align="right">
                                            <ActionsButton>
                                                <MenuItem onClick={() => handleDeleteClick(laborCategory)} disableRipple>
                                                    <DeleteOutlineIcon />
                                                    Delete
                                                </MenuItem>
                                            </ActionsButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>

            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', mt: 2, pb: '85px' }} spacing={2}>
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Stack>

            <Dialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Confirm Delete Labor Category</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this Labor Category?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button color="error" onClick={() => handleDeleteLBConfirm(selectedLaborCategory.id)}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default NaicsCodesList;
