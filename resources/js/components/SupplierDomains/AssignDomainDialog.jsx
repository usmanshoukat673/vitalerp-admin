import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from 'react-redux';
import { Box, FormControl, TextField, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';
import _ from 'lodash';
import axiosInstance from '../../api/api';
import { getError, isFieldExistsInErrors } from '../../utils/errorHelper';
import { setAssignDomainDialog } from '../../actions';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AssignDomainDialog = ({ domains }) => {

    const { assignDomainDialog } = useSelector((state) => ({
        assignDomainDialog: state.supplier.assignDomainDialog,
    }));

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        domain_ids: [],
    });

    useEffect(() => {
        if (!_.isEmpty(assignDomainDialog?.supplier)) {
            setFormData((prevState) => ({
                ...prevState,
                domain_ids: _.map(assignDomainDialog.supplier.domains, d => d.id),
            }));
        }
    }, [assignDomainDialog]);

    /**
     * Handles changes to the form data by updating the state with the new value.
     *
     * @param {object} event - The event object triggered by the change.
     * @return {void}
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        clearError(name);
    }

    const handleDomainsChange = (event) => {
        const { value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            domain_ids: typeof value === 'string' ? value.split(',') : value
        }));
        clearError('domain_ids');
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
        axiosInstance.post(`/api/user/domains/supplier-domains/assign`, { ...formData, supplier_ids: [assignDomainDialog.supplier.id] })
            .then(response => {
                if (response.data) {
                    dispatch(setAssignDomainDialog({ open: false, assigned: true }));
                }
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                    return;
                }
            }).finally(() => setLoading(false));
    }

    const handleClose = () => {
        setFormData({
            domain_ids: []
        });
        dispatch(setAssignDomainDialog({ open: false }));
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                maxWidth="md"
                open={assignDomainDialog?.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="Assign Domain"
            >
                <DialogTitle>{"Assign Domain"}</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate autoComplete='off'>

                        <FormControl fullWidth sx={{ mb: '10px' }}>
                            <label htmlFor="phone_number">Domain(s)<span style={{ color: 'red' }}>*</span></label>
                            <Select
                                labelId="roles-label"
                                id="roles"
                                name="roles"
                                multiple
                                size='small'
                                value={formData.domain_ids}
                                onChange={handleDomainsChange}
                                renderValue={(selected) => selected.map(id => {
                                    let domainFound = domains.find(r => r.id === id);
                                    return `${domainFound?.name}`;
                                }).join(', ')}
                                error={isFieldExistsInErrors('roles', errors)}
                            >
                                {
                                    _.map(domains, domain => (
                                        <MenuItem key={domain.id} value={domain.id} sx={{ display: 'flex !important', alignItems: 'center !important' }}>
                                            <Checkbox checked={formData.domain_ids.indexOf(domain.id) > -1} />
                                            <ListItemText primary={domain.name} />
                                        </MenuItem>
                                    ))
                                }
                            </Select>

                            {isFieldExistsInErrors('roles', errors) && (
                                <p style={{ color: 'red' }}>{getError('roles', errors)}</p>
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

export default AssignDomainDialog;