import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from 'react-redux';
import { Box, FormControl, MenuItem, Select, TextField } from '@mui/material';
import _ from 'lodash';
import axiosInstance from '../../api/api';
import { getError, isFieldExistsInErrors } from '../../utils/errorHelper';
import { setAddLaborCategoryDialog } from '../../actions';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddLaborCategoryDialog = ({ naicsCodes }) => {
    const { addLaborCategoryDialog } = useSelector((state) => ({
        addLaborCategoryDialog: state.validvalues.addLaborCategoryDialog,
    }));

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        naics_code: '',
        pcs_code: '',
        description: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        clearError(name);
    };

    const clearError = (fieldName) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[fieldName];
            return newErrors;
        });
    }

    const handleSubmit = () => {
        setLoading(true);
        axiosInstance.post('/api/user/valid-values/labor-categories', formData)
            .then(response => {
                clearFormData();
                if (response.data) {
                    dispatch(setAddLaborCategoryDialog({ open: false, added: true }));
                }
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                    return;
                }
            }).finally(() => {
                setLoading(false);
            });
    }

    const clearFormData = () => {
        setFormData({
            name: '',
            naics_code: '',
            pcs_code: '',
            description: '',
        });
        setErrors({});
    }

    const handleClose = () => {
        clearFormData();
        dispatch(setAddLaborCategoryDialog({ open: false }));
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                maxWidth="md"
                open={addLaborCategoryDialog?.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="Add new Labor Category dialog"
            >
                <DialogTitle>{"Add Labor Category"}</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate autoComplete='off'>
                        <FormControl fullWidth sx={{ mb: '10px' }}>
                            <label htmlFor="name">Name <span style={{ color: 'red' }}>*</span></label>
                            <TextField
                                size='small'
                                name='name'
                                onChange={handleChange}
                                id='name'
                                value={formData.name}
                                error={isFieldExistsInErrors('name', errors)}
                            />
                            {isFieldExistsInErrors('name', errors) && (
                                <p style={{ color: 'red' }}>{getError('name', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '10px' }}>
                            <label htmlFor="naics_code">North American Industry Classification System (NAICS) Code <span style={{ color: 'red' }}>*</span></label>
                            <Select
                                size='small'
                                id="naics_code"
                                name="naics_code"
                                value={formData.naics_code}
                                onChange={handleChange}
                                error={isFieldExistsInErrors('naics_code', errors)}
                                fullWidth
                                MenuProps={{ style: { display: 'block' } }}
                            >
                                {_.map(naicsCodes, naicsCode => (
                                    <MenuItem key={`naics_code_${naicsCode.id}`} value={naicsCode.id}>{`${naicsCode.naics_code} - ${naicsCode.naics_industry_description}`}</MenuItem>
                                ))}
                            </Select>

                            {isFieldExistsInErrors('naics_code', errors) && (
                                <p style={{ color: 'red' }}>{getError('naics_code', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '10px' }}>
                            <label htmlFor="pcs_code">Product Service Code (PSC) <span style={{ color: 'red' }}>*</span></label>
                            <TextField
                                size='small'
                                name='pcs_code'
                                onChange={handleChange}
                                id='pcs_code'
                                value={formData.pcs_code}
                                error={isFieldExistsInErrors('pcs_code', errors)}
                            />
                            {isFieldExistsInErrors('pcs_code', errors) && (
                                <p style={{ color: 'red' }}>{getError('pcs_code', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '10px' }}>
                            <label htmlFor="description">Description</label>
                            <TextField
                                size='small'
                                name='description'
                                onChange={handleChange}
                                id='description'
                                multiline
                                value={formData.description}
                                rows={4}
                                error={isFieldExistsInErrors('description', errors)}
                            />
                            {isFieldExistsInErrors('description', errors) && (
                                <p style={{ color: 'red' }}>{getError('description', errors)}</p>
                            )}
                        </FormControl>
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

export default AddLaborCategoryDialog;