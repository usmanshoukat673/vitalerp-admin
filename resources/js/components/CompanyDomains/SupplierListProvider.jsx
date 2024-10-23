import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Grid, List, ListItem, ListItemText, MenuItem, TextField, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../api/api';

const SupplierListProvider = ({ selectedSuppliers, setSelectedSuppliers }) => {
    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);

    const fetchSuppliers = async (query = '') => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/api/user/domains/search-all/suppliers`, {
                params: { search: query }  
            });
            setSuppliers(response.data); 
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        } finally {
            setIsLoading(false);
        }
    };  

    useEffect(() => {
        fetchSuppliers();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredSuppliers(suppliers);
        } else {
            const filtered = suppliers.filter(supplier =>
                supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSuppliers(filtered);
        }
    }, [searchTerm, suppliers]);

    const handleSelect = (id) => {
        if (selectedSuppliers.includes(id)) {
            setSelectedSuppliers(selectedSuppliers.filter(supplierId => supplierId !== id));
        } else {
            setSelectedSuppliers([...selectedSuppliers, id]);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
                <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                    <TextField
                        fullWidth
                        label="Search Suppliers"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ marginBottom: '10px' }}
                        size="small"
                    />
                    <Box sx={{ height: '300px', overflowY: 'auto' }}>
                        {isLoading ? (
                            <p style={{ color: 'grey', paddingTop: '6px', paddingLeft: '16px' }}>Loading...</p>
                        ) : (
                            filteredSuppliers.map(supplier => (
                                <MenuItem key={supplier.id} value={supplier.id} onClick={() => handleSelect(supplier.id)}>
                                    <Checkbox checked={selectedSuppliers.includes(supplier.id)} />
                                    <ListItemText primary={`${supplier.name}`} />
                                </MenuItem>
                            ))
                        )}
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={6} sm={6}>
                <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                    <Typography variant="h6" gutterBottom>Selected Suppliers</Typography>
                    <Box sx={{ height: '315px', overflowY: 'auto' }}>
                        {
                            _.size(selectedSuppliers) > 0 ? selectedSuppliers.map(id => {
                                const selectedSupplier = suppliers.find(supplier => supplier.id === id);
                                return selectedSupplier ? (
                                    <MenuItem key={selectedSupplier.id} value={selectedSupplier.id}>
                                        {`${selectedSupplier.name}`}
                                        <IconButton
                                            edge="end"
                                            size='small'
                                            aria-label="remove"
                                            onClick={() => handleSelect(selectedSupplier.id)}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </MenuItem>
                                ) : null;
                            }) :
                            <p style={{ color: 'grey', paddingTop: '6px', paddingLeft: '16px' }}><i>No Suppliers selected</i></p>
                        }
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SupplierListProvider;