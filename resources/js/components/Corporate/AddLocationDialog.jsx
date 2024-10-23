import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { setAddOfficeLocationDialog } from '../../actions';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddLocationDialog({ roles }) {
    const { addOfficeLocationDialog } = useSelector((state) => ({
        addOfficeLocationDialog: state.corporate.addOfficeLocationDialog,
    }));

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [countries, setCountries] = useState([]);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        country_code: '+1201',
        phone_number: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        clearError(name);
    }

    const clearError = (fieldName) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[fieldName];
            return newErrors;
        });
    }

    const handleSubmit = () => {

    }

    const handleClose = () => {
        dispatch(setAddOfficeLocationDialog({ open: false }))
    };

    return (
        <React.Fragment>
            <Dialog
                open={addOfficeLocationDialog.open}
                fullWidth
                maxWidth="md"
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="Add office location"
            >
                <DialogTitle>{"Add Office Location"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={9}>
                            <Box>
                                <label>Office Name / Purpose: <span style={{ color: 'red' }}>*</span></label>
                                <TextField size="small" fullWidth id="" variant="outlined" />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <label style={{ display: 'block' }}>Make Primary</label>
                            <Checkbox />
                        </Grid>
                    </Grid>

                    <Box sx={{ mb: 3 }}>
                        <label>Address Line 1: <span style={{ color: 'red' }}>*</span></label>
                        <TextField size="small" fullWidth id="" variant="outlined" />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <label>Address Line 2:</label>
                        <TextField size="small" fullWidth id="" variant="outlined" />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <label>City: <span style={{ color: 'red' }}>*</span></label>
                        <TextField size="small" fullWidth id="" variant="outlined" />
                    </Box>


                    <Box sx={{ mb: 3 }}>
                        <label>State/Province/Region: <span style={{ color: 'red' }}>*</span></label>
                        <Select
                            id="demo-simple-select"
                            size="small"
                            fullWidth
                        >
                            <MenuItem value={`Alabama`}>Alabama</MenuItem>
                            <MenuItem value={`Alaska`}>Alaska</MenuItem>
                            <MenuItem value={`Arizona`}>Arizona</MenuItem>
                            <MenuItem value={`Arkansas`}>Arkansas</MenuItem>
                            <MenuItem value={`California`}>California</MenuItem>
                            <MenuItem value={`Colorado`}>Colorado</MenuItem>
                            <MenuItem value={`Connecticut`}>Alabama</MenuItem>
                            <MenuItem value={`Delaware`}>Delaware</MenuItem>
                            <MenuItem value={`Florida`}>Florida</MenuItem>
                            <MenuItem value={`Georgia`}>Georgia</MenuItem>
                            <MenuItem value={`Hawaii`}>Hawaii</MenuItem>
                            <MenuItem value={`Idaho`}>Idaho</MenuItem>
                            <MenuItem value={`Illinois`}>Illinois</MenuItem>
                            <MenuItem value={`Indiana`}>Indiana</MenuItem>
                            <MenuItem value={`Iowa`}>Iowa</MenuItem>
                            <MenuItem value={`Kansas`}>Kansas</MenuItem>
                            <MenuItem value={`Kentucky`}>Kentucky</MenuItem>
                            <MenuItem value={`Louisiana`}>Louisiana</MenuItem>
                            <MenuItem value={`Maine`}>Maine</MenuItem>
                            <MenuItem value={`Maryland`}>Maryland</MenuItem>
                            <MenuItem value={`Massachusetts`}>Massachusetts</MenuItem>
                            <MenuItem value={`Michigan`}>Michigan</MenuItem>
                            <MenuItem value={`Minnesota`}>Minnesota</MenuItem>
                            <MenuItem value={`Mississippi`}>Mississippi</MenuItem>
                            <MenuItem value={`Missouri`}>Missouri</MenuItem>
                            <MenuItem value={`Montana`}>Montana</MenuItem>
                            <MenuItem value={`Nebraska`}>Nebraska</MenuItem>
                            <MenuItem value={`Nevada`}>Nevada</MenuItem>
                            <MenuItem value={`New Hampshire`}>New Hampshire</MenuItem>
                            <MenuItem value={`New Jersey`}>New Jersey</MenuItem>
                            <MenuItem value={`New Mexico`}>New Mexico</MenuItem>
                            <MenuItem value={`New York`}>New York</MenuItem>
                            <MenuItem value={`North Carolina`}>North Carolina</MenuItem>
                            <MenuItem value={`North Dakota`}>North Dakota</MenuItem>
                            <MenuItem value={`Ohio`}>Ohio</MenuItem>
                            <MenuItem value={`Oklahoma`}>Oklahoma</MenuItem>
                            <MenuItem value={`Oregon`}>Oregon</MenuItem>
                            <MenuItem value={`Pennsylvania`}>Pennsylvania</MenuItem>
                            <MenuItem value={`Rhode Island`}>Rhode Island</MenuItem>
                            <MenuItem value={`South Carolina`}>South Carolina</MenuItem>
                            <MenuItem value={`South Dakota`}>South Dakota</MenuItem>
                            <MenuItem value={`Tennessee`}>Tennessee</MenuItem>
                            <MenuItem value={`Texas`}>Texas</MenuItem>
                            <MenuItem value={`Utah`}>Utah</MenuItem>
                            <MenuItem value={`Vermont`}>Vermont</MenuItem>
                            <MenuItem value={`Virginia`}>Virginia</MenuItem>
                            <MenuItem value={`Washington`}>Washington</MenuItem>
                            <MenuItem value={`West Virginia`}>West Virginia</MenuItem>
                            <MenuItem value={`Wisconsin`}>Wisconsin</MenuItem>
                            <MenuItem value={`Wyoming`}>Wyoming</MenuItem>
                        </Select>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <label>ZIP / Postal Code: <span style={{ color: 'red' }}>*</span></label>
                        <TextField size="small" fullWidth id="" variant="outlined" />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <label>Country: <span style={{ color: 'red' }}>*</span></label>
                        <Select
                            id="demo-simple-select"
                            size="small"
                            fullWidth
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={loading} onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}