import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Box, Checkbox, FormControl, ListItemText } from "@mui/material";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { setAddPointOfContactDialog } from '../../actions';
import { getError, isFieldExistsInErrors } from '../../utils/errorHelper';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddPointOfContactDialog({ roles }) {
    const { addPointOfContactDialog } = useSelector((state) => ({
        addPointOfContactDialog: state.corporate.addPointOfContactDialog,
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
        phone_number: '',
        roles: []
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        clearError(name);
    }

    const handleRolesChange = (event) => {
        const { value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            roles: typeof value === 'string' ? value.split(',') : value
        }));
        clearError('roles');
    };

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
        dispatch(setAddPointOfContactDialog({ open: false }))
    };

    return (
        <React.Fragment>
            <Dialog
                open={addPointOfContactDialog.open}
                fullWidth
                maxWidth="md"
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="Add Point of Contact"
            >
                <DialogTitle>{"Add Point of Contact"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ mb: 1, flex: 1, mr: 1 }}>
                                    <label>First Name: <span style={{ color: 'red' }}>*</span></label>
                                    <TextField size="small" fullWidth id="" variant="outlined" />
                                </Box>
                                <Box sx={{ mb: 1, flex: 1, ml: 1 }}>
                                    <label>Last Name: <span style={{ color: 'red' }}>*</span></label>
                                    <TextField size="small" fullWidth id="" variant="outlined" />
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ mb: 1, flex: 1, mr: 1 }}>
                                    <Box sx={{ mb: 1 }}>
                                        <label>Phone: <span style={{ color: 'red' }}>*</span></label>
                                        <TextField size="small" fullWidth id="" variant="outlined" />
                                    </Box>
                                </Box>
                                <Box sx={{ mb: 1, flex: 1, ml: 1 }}>
                                    <label>Corporate Title: <span style={{ color: 'red' }}>*</span></label>
                                    <TextField size="small" fullWidth id="" variant="outlined" />
                                </Box>
                            </Box>

                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <label htmlFor="phone_number">Roles(s) <span style={{ color: 'red' }}>*</span></label>
                                <Select
                                    labelId="roles-label"
                                    id="roles"
                                    name="roles"
                                    multiple
                                    size='small'
                                    value={formData.roles}
                                    onChange={handleRolesChange}
                                    renderValue={(selected) => selected.map(id => {
                                        let roleFound = roles.find(r => r.id === id);
                                        return `${roleFound.name}`;
                                    }).join(', ')}
                                    error={isFieldExistsInErrors('roles', errors)}
                                >
                                    {
                                        _.map(roles, role => (
                                            <MenuItem key={role.id} value={role.id} sx={{ display: 'flex !important', alignItems: 'center !important' }}>
                                                <Checkbox checked={formData.roles.indexOf(role.id) > -1} />
                                                <ListItemText primary={role.name} />
                                            </MenuItem>
                                        ))
                                    }
                                </Select>

                                {isFieldExistsInErrors('roles', errors) && (
                                    <p style={{ color: 'red' }}>{getError('roles', errors)}</p>
                                )}
                            </FormControl>

                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={loading} onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}