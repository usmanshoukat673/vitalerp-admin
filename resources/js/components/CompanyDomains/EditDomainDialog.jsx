import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from 'react-redux';
import { Box, FormControl, MenuItem, Select, TextField, Checkbox, ListItemText, Chip, FormControlLabel, List, ListItem, Stack, Pagination } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import _ from 'lodash';
import axiosInstance from '../../api/api';
import { getError, isFieldExistsInErrors } from '../../utils/errorHelper';
import { setEditDomainDialog } from '../../actions';
import { NotificationManager } from 'react-notifications';
import SupplierListProvider from './SupplierListProvider';
import LaborCategoriesProvider from './LaborCategoriesProvider';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditDomainDialog = () => {
    const { editDomainDialog } = useSelector((state) => ({
        editDomainDialog: state.domains.editDomainDialog,
    }));

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [selectedTab, setSelectedTab] = useState('1');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        supplier_ids: [],
        labor_category_ids: []
    });

    useEffect(() => {
        if (!_.isEmpty(editDomainDialog?.domain)) {
            setFormData((prevState) => ({
                ...prevState,
                name: _.isEmpty(editDomainDialog?.domain?.name) ? '' : editDomainDialog.domain.name,
                description: _.isEmpty(editDomainDialog?.domain?.description) ? '' : editDomainDialog.domain.description,
                supplier_ids: _.map(editDomainDialog?.domain?.suppliers, supplier => supplier.id),
                labor_category_ids: _.map(editDomainDialog?.domain?.labor_categories, category => category.id)
            }));
        }
    }, [editDomainDialog]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        clearError(name);
    };

    const handleSuppliersSelection = (supplier_ids) => {
        setFormData((prevState) => ({
            ...prevState,
            supplier_ids: supplier_ids
        }));
        clearError('supplier_ids');
    }

    const handleLaborCategoriesSelection = (labor_category_ids) => {
        setFormData((prevState) => ({
            ...prevState,
            labor_category_ids: labor_category_ids
        }));
        clearError('labor_category_ids');
    }

    const clearError = (fieldName) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[fieldName];
            return newErrors;
        });
    }

    const handleSubmit = () => {
        setLoading(true);
        axiosInstance.put(`/api/user/domains/update/${editDomainDialog?.domain?.id}`, formData)
            .then(response => {
                if (response.data) {
                    dispatch(setEditDomainDialog({ open: false, updated: true }));
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

    const handleClose = () => {
        dispatch(setEditDomainDialog({ open: false }));
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                maxWidth="md"
                open={editDomainDialog?.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="Class Details dialog"
            >
                <DialogTitle>{"Class Details"}</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate autoComplete='off'>
                        <FormControl fullWidth sx={{ mb: '10px' }}>
                            <label htmlFor="name">Name<span style={{ color: 'red' }}>*</span></label>
                            <TextField
                                size='small'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                id='name'
                                error={isFieldExistsInErrors('name', errors)}
                            />
                            {isFieldExistsInErrors('name', errors) && (
                                <p style={{ color: 'red' }}>{getError('name', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '10px' }}>
                            <label htmlFor="description">Description</label>
                            <TextField
                                size='small'
                                name='description'
                                onChange={handleChange}
                                id='description'
                                value={formData.description}
                                multiline
                                rows={4}
                                error={isFieldExistsInErrors('description', errors)}
                            />
                            {isFieldExistsInErrors('description', errors) && (
                                <p style={{ color: 'red' }}>{getError('description', errors)}</p>
                            )}
                        </FormControl>

                        <TabContext value={selectedTab}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={(event, newValue) => setSelectedTab(newValue)} aria-label="Suppliers & Labor categories">
                                    <Tab label={`Labor Categories`} value="1" />
                                    <Tab label={`Suppliers`} value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1" sx={{ px: 0, py: '10px' }}>
                                <LaborCategoriesProvider
                                    selectedCategories={formData.labor_category_ids}
                                    setSelectedCategories={handleLaborCategoriesSelection}
                                />
                            </TabPanel>
                            <TabPanel value="2" sx={{ px: 0, py: '10px' }}>
                                <SupplierListProvider
                                    selectedSuppliers={formData.supplier_ids}
                                    setSelectedSuppliers={handleSuppliersSelection}
                                />
                            </TabPanel>
                        </TabContext>

                        {isFieldExistsInErrors('supplier_ids', errors) && (
                            <p style={{ color: 'red' }}>{getError('supplier_ids', errors)}</p>
                        )}
                        {isFieldExistsInErrors('labor_category_ids', errors) && (
                            <p style={{ color: 'red' }}>{getError('labor_category_ids', errors)}</p>
                        )}
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

export default EditDomainDialog;