import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Grid, ListItemText, MenuItem, TextField, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import axiosInstance from '../../api/api';
const NAICSCodeProvider = ({ selectedCodes, setSelectedCodes }) => {
    const [naicsCodes, setNaicsCodes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [filteredCodes, setFilteredCodes] = useState([]);

    const fetchNaicsCodes = async (query = '') => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/api/user/valid-values/naics-codes`, {
                params: { search: query }  
            });
            setNaicsCodes(response.data); 
        } catch (error) {
            console.error('Error fetching NAICS codes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNaicsCodes();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredCodes(naicsCodes);
        } else {
            const filtered = naicsCodes.filter(code =>
                code.naics_code.includes(searchTerm) ||
                code.naics_industry_description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCodes(filtered);
        }
    }, [searchTerm, naicsCodes]);

    const handleSelect = (id) => {
        if (selectedCodes.includes(id)) {
            setSelectedCodes(selectedCodes.filter(codeId => codeId !== id));
        } else {
            setSelectedCodes([...selectedCodes, id]);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
                <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                    <TextField
                        fullWidth
                        label="Search NAICS Codes"
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
                            filteredCodes.map(naicsCode => (
                                <MenuItem key={naicsCode.id} value={naicsCode.id} onClick={() => handleSelect(naicsCode.id)}>
                                    <Checkbox checked={selectedCodes.includes(naicsCode.id)} />
                                    <ListItemText primary={`${naicsCode.naics_code} - ${naicsCode.naics_industry_description}`} />
                                </MenuItem>
                            ))
                        )}
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={6} sm={6}>
                <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                    <Typography variant="h6" gutterBottom>Selected NAICS Codes</Typography>
                    <Box sx={{ height: '315px', overflowY: 'auto' }}>
                        {
                            _.size(selectedCodes) > 0 ? selectedCodes.map(id => {
                                const selectedCode = naicsCodes.find(code => code.id === id);
                                return selectedCode ? (
                                    <MenuItem key={selectedCode.id} value={selectedCode.id}>
                                        {`${selectedCode.naics_code} - ${selectedCode.naics_industry_description}`}
                                        <IconButton
                                            edge="end"
                                            aria-label="remove"
                                            onClick={() => handleSelect(selectedCode.id)}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </MenuItem>
                                ) : null;
                            }) :
                                <p style={{ color: 'grey', paddingTop: '6px', paddingLeft: '16px' }}><i>No NAICS Codes selected</i></p>
                        }
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default NAICSCodeProvider;
