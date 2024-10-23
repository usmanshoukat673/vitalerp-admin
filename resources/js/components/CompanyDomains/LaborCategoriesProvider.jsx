import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Grid, List, ListItem, ListItemText, MenuItem, TextField, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../api/api';

const LaborCategoriesProvider = ({ selectedCategories, setSelectedCategories }) => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [filteredCategories, setFilteredCategories] = useState([]);

    const fetchCategories = async (query = '') => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/api/user/valid-values/labor-categories/all/asc`, {
                params: { search: query }  
            });
            setCategories(response.data); 
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredCategories(categories);
        } else {
            const filtered = categories.filter(category =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCategories(filtered);
        }
    }, [searchTerm, categories]);

    const handleSelect = (id) => {
        if (selectedCategories.includes(id)) {
            setSelectedCategories(selectedCategories.filter(categoryId => categoryId !== id));
        } else {
            setSelectedCategories([...selectedCategories, id]);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
                <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                    <TextField
                        fullWidth
                        label="Search Labor Categories"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ marginBottom: '10px' }}
                        size="small"
                    />
                     <Box sx={{ height: '300px', overflowY: 'auto' }}>
                        {isLoading ? (
                            <p style={{ color: 'grey', paddingTop: '6px', paddingLeft: '16px' }}>Loading...</p>
                        ) : (
                            filteredCategories.map(category => (
                                <MenuItem key={category.id} value={category.id} onClick={() => handleSelect(category.id)}>
                                    <Checkbox checked={selectedCategories.includes(category.id)} />
                                    <ListItemText primary={`${category.name}`} />
                                </MenuItem>
                            ))
                        )}
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={6} sm={6}>
                <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                    <Typography variant="h6" gutterBottom>Selected Labor Categories</Typography>
                    <Box sx={{ height: '315px', overflowY: 'auto' }}>
                        {
                            _.size(selectedCategories) > 0 ? selectedCategories.map(id => {
                                const selectedCategory = categories.find(supplier => supplier.id === id);
                                return selectedCategory ? (
                                    <MenuItem key={selectedCategory.id} value={selectedCategory.id}>
                                        {`${selectedCategory.name}`}
                                        <IconButton
                                            edge="end"
                                            size='small'
                                            aria-label="remove"
                                            onClick={() => handleSelect(selectedCategory.id)}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </MenuItem>
                                ) : null;
                            }) :
                            <p style={{ color: 'grey', paddingTop: '6px', paddingLeft: '16px' }}><i>No Labor Categories selected</i></p>
                        }
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LaborCategoriesProvider;