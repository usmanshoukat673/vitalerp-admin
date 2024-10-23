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
// import ActionsButton from "../Global/ActionsButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { setAddDomainDialog, setEditDomainDialog } from "../../actions";
import axiosInstance from "../../api/api";

const CompanyDomainsList = () => {

    const { addDomainDialog, editDomainDialog } = useSelector((state) => ({
        addDomainDialog: state.domains.addDomainDialog,
        editDomainDialog: state.domains.editDomainDialog,
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

    useEffect(() => {
        getDomains();
    }, [page, search]);

    useEffect(() => {
        if (addDomainDialog?.added) {
            setPage(1);
            getDomains();
            dispatch(setAddDomainDialog({ added: false }));
        }
        if (editDomainDialog?.updated) {
            setPage(1);
            getDomains();
            dispatch(setEditDomainDialog({ updated: false }));
        }
    }, [addDomainDialog, editDomainDialog]);

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1); // Reset to first page when search changes
    }

    const getDomains = () => {
        axiosInstance.get(`/api/user/domains`, {
            params: {
                page: page,
                search,
                sort_by: 'name',
                sort_order: 'asc'
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

    const handleAddDomainClick = () => {
        dispatch(setAddDomainDialog({
            open: true
        }));
    }

    const handleEditClick = (domain) => {
        dispatch(setEditDomainDialog({
            open: true,
            domain
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

                        <Button onClick={handleAddDomainClick} startIcon={<AddIcon />} variant="contained">Add Class</Button>

                    </Grid>

                </Grid>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="domains list" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row" align="left">Performance Class</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Labor Category</TableCell>
                            <TableCell align="center">Suppliers</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list?.length > 0 ? (
                            list.map((domain) => (
                                <React.Fragment key={domain.id}>
                                    {/* Domain Details Row */}
                                    <TableRow sx={{ borderBottom: 'none' }}>
                                        <TableCell align="left">
                                            <Link underline="hover" onClick={() => handleEditClick(domain)} style={{ cursor: 'pointer' }}>
                                                {domain.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">{domain?.description?.length > 50 ? `${domain.description.substring(0, 47)}...` : domain.description}</TableCell>
                                        <TableCell align="center">{_.size(domain.labor_categories)}</TableCell>
                                        <TableCell align="center">{_.size(domain.suppliers)}</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} align="center">
                                    No domains found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', mt: 2, pb: '85px' }} spacing={2}>
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Stack>
        </>
    );
}

export default CompanyDomainsList;