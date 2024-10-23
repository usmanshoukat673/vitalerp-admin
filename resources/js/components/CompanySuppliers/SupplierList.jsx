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


const SupplierList = () => {

    // const { addSupplierDialog } = useSelector((state) => ({
    //     addSupplierDialog: state.supplier.addSupplierDialog
    // }));

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
        getSuppliers();
    }, [page, search]);

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1); // Reset to first page when search changes
    }

    const getSuppliers = () => {
        axiosInstance.get(`/api/user/domains/supplier-with-domains`, {
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

    return (
        <>
            <Box sx={{ width: '100%', mb: 2 }}>
                <Grid container>
                    <Grid item xs={12} md={12} lg={12} xl={12} sx={{
                        pr: {
                            xs: 0,
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

                    {/* <Grid item xs={6} md={5} lg={3} xl={2} sx={{
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

                        <Button onClick={handleAssignDomainClick} startIcon={<AddIcon />} variant="contained">Add Domain</Button>

                    </Grid> */}

                </Grid>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row" align="left">Legal Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            {/* <TableCell align="center">Status</TableCell> */}
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            _.map(list, (supplier) => (
                                <React.Fragment key={supplier.id}>
                                    {/* supplier Details Row */}
                                    <TableRow sx={{ borderBottom: 'none' }}>
                                        <TableCell align="left">
                                            {supplier.name}
                                            {/* <Link underline="hover" onClick={() => handleAssignDomainClick(supplier)} style={{ cursor: 'pointer' }}>
                                            
                                        </Link> */}
                                        </TableCell>
                                        <TableCell align="center">{supplier.email}</TableCell>
                                        <TableCell align="center">{supplier.phone}</TableCell>
                                        {/* <TableCell align="right"></TableCell> */}
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', mt: 2, pb: '85px' }} spacing={2}>
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Stack>
        </>
    )
}

export default SupplierList;