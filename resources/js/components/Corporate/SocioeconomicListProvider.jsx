import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Grid, ListItemText, MenuItem, TextField, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import axiosInstance from '../../api/api';
const SocioeconomicListProvider = ({ selectedItems, setSelectedItems }) => {
    const [socionomicItems, setSocionomicItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);

    const fetchItems = async (query = '') => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/api/user/valid-values/socioeconomics`, {
                params: { search: query }
            });
            setSocionomicItems(response.data);
        } catch (error) {
            console.error('Error fetching Socioeconomic status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredItems(socionomicItems);
        } else {
            const filtered = socionomicItems.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredItems(filtered);
        }
    }, [searchTerm, socionomicItems]);

    const handleSelect = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
                <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                    <TextField
                        fullWidth
                        label="Search Status"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ marginBottom: '10px' }}
                        disabled={isLoading}
                        size="small"
                    />
                    <Box sx={{ height: '300px', overflowY: 'auto' }}>
                        {isLoading ? (
                            <p style={{ color: 'grey', paddingTop: '6px', paddingLeft: '16px' }}>Loading...</p>
                        ) : (
                            filteredItems.map(item => (
                                <MenuItem key={item.id} value={item.id} onClick={() => handleSelect(item.id)}>
                                    <Checkbox checked={selectedItems.includes(item.id)} />
                                    <ListItemText primary={`${item.name}`} />
                                </MenuItem>
                            ))
                        )}
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={6} sm={6}>
                <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                    <Typography variant="h6" gutterBottom>Selected Socio-economic Status</Typography>
                    <Box sx={{ height: '315px', overflowY: 'auto' }}>
                        {
                            _.size(selectedItems) > 0 ? selectedItems.map(id => {
                                const selectedItem = socionomicItems.find(item => item.id === id);
                                return selectedItem ? (
                                    <MenuItem key={selectedItem.id} value={selectedItem.id}>
                                        {`${selectedItem.name}`}
                                        <IconButton
                                            edge="end"
                                            aria-label="remove"
                                            onClick={() => handleSelect(selectedItem.id)}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </MenuItem>
                                ) : null;
                            }) :
                                <p style={{ color: 'grey', paddingTop: '6px', paddingLeft: '16px' }}><i>No Socioeconomic Status selected</i></p>
                        }
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SocioeconomicListProvider;