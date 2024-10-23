import React, { useCallback, useEffect, useState } from "react";
import {
    Checkbox,
    TextField,
    Box,
    TableCell,
    TableRow,
    FormControlLabel,
    Select,
    MenuItem,
    ListItemText
} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from "react-redux";
import { getError, isFieldExistsInErrors } from "../../utils/errorHelper";
import axiosInstance from "../../api/api";
import { debounce } from 'lodash';
import { setCorporateProfileStatus } from "../../actions";

const customerTypes = [
    "Federal", "State", "Commercial"
];

const DomainLaborCategory = ({ category }) => {

    const dispatch = useDispatch();

    const { active_supplier, states, corporate_profile_status } = useSelector((state) => ({
        active_supplier: state.corporate.active_supplier,
        states: state.validvalues.states,
        corporate_profile_status: state.corporate.corporate_profile_status
    }));

    const [hasFormChanged, setHasFormChanged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        past_performance: false,
        last_date_performed_services: null,
        max_num_on_one_contract: '',
        locations_serviced: [],
        customer_type: [],
        service_rating: ''
    });

    useEffect(() => {
        setFormData((prevState) => ({
            ...prevState,
            past_performance: category.past_performance,
            last_date_performed_services: category.last_date_performed_services ? dayjs(category.last_date_performed_services) : null,
            max_num_on_one_contract: category.max_num_on_one_contract == null ? '' : category.max_num_on_one_contract,
            locations_serviced: _.map(category.locations_serviced, (location) => location.state_id),
            customer_type: !_.isEmpty(category.customer_type) ? JSON.parse(category.customer_type) : [],
            service_rating: category.service_rating
        }));
        setHasFormChanged(false);
    }, [category, active_supplier]);

    const debouncedSaveChanges = useCallback(
        debounce(() => {
            if (hasFormChanged) {
                handleSaveChanges();
            }
        }, 1000),
        [formData, hasFormChanged]
    );

    useEffect(() => {
        if (hasFormChanged) {
            debouncedSaveChanges();
        }
    }, [formData, hasFormChanged, debouncedSaveChanges]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setHasFormChanged(true);
        clearError(name);
    };

    const clearError = (fieldName) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[fieldName];
            return newErrors;
        });
    }

    const handleMultiSelectChange = (event) => {
        const { value, name } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: typeof value === 'string' ? value.split(',') : value
        }));
        setHasFormChanged(true);
        clearError(name);
    };

    const handleLastDateChange = (value) => {
        setFormData((prevState) => ({
            ...prevState,
            last_date_performed_services: value
        }));
        setHasFormChanged(true);
        clearError('last_date_performed_services');
    };

    const handlePastPerformanceChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            past_performance: event.target.checked
        }));
        setHasFormChanged(true);
    }

    const handleSaveChanges = () => {
        setLoading(true);
        axiosInstance.put(`/api/user/corporate-profile/past-performance/${active_supplier.id}`, {
            ...formData,
            last_date_performed_services: formData.last_date_performed_services ? formData.last_date_performed_services.format('YYYY-MM-DD') : null,
            id: category.supplier_labor_category_detail_id
        })
            .then(e => {
                setLoading(false);
                dispatch(setCorporateProfileStatus({
                    ...corporate_profile_status,
                    past_performance: e.data.isCompleted
                }));
            })
            .catch(error => {
                setLoading(false);
                setErrors(error.response.data.errors || {});
            });
    };

    return (
        <TableRow>
            <TableCell width={"200px"} sx={{ px: '5px' }}>{category.name}</TableCell>
            <TableCell align='center' sx={{ px: '5px' }}>
                <Checkbox
                    checked={formData.past_performance}
                    onChange={handlePastPerformanceChange}
                />
            </TableCell>
            <TableCell sx={{ px: '5px' }} align="center">
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { width: '20ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disabled={formData.past_performance}
                            value={formData.last_date_performed_services}
                            onChange={handleLastDateChange}
                            name="last_date_performed_services"
                            size="small"
                            renderInput={(params) => <TextField aucomplete="off" size="small" {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
            </TableCell>
            <TableCell sx={{ px: '5px' }} align="center">
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { width: '12ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        disabled={formData.past_performance}
                        size='small'
                        name='max_num_on_one_contract'
                        onChange={handleChange}
                        id='max_num_on_one_contract'
                        value={formData.max_num_on_one_contract}
                        error={isFieldExistsInErrors('max_num_on_one_contract', errors)}
                    />
                    {isFieldExistsInErrors('max_num_on_one_contract', errors) && (
                        <p style={{ color: 'red' }}>{getError('max_num_on_one_contract', errors)}</p>
                    )}
                </Box>
            </TableCell>
            <TableCell sx={{ px: '5px' }} align="center">
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { width: '20ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    <Select
                        size='small'
                        disabled={formData.past_performance}
                        id="locations_serviced"
                        name="locations_serviced"
                        multiple
                        value={formData.locations_serviced}
                        onChange={handleMultiSelectChange}
                        error={isFieldExistsInErrors('locations_serviced', errors)}
                        renderValue={(selected) => selected.map(stateId => {
                            let found = states.find(r => r.id === stateId);
                            return `${found?.name}`;
                        }).join(', ')}
                        fullWidth
                        MenuProps={{ style: { display: 'block' } }}
                    >
                        {_.map(states, state => (
                            <MenuItem key={`state_${state.id}`} value={state.id}>
                                <Checkbox checked={formData.locations_serviced?.indexOf(state.id) > -1} />
                                <ListItemText primary={state.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </TableCell>
            <TableCell sx={{ px: '5px' }} align="center">
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { width: '16ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    <Select
                        disabled={formData.past_performance}
                        size='small'
                        value={formData.customer_type}
                        id="customer_type"
                        name="customer_type"
                        onChange={handleMultiSelectChange}
                        fullWidth
                        multiple
                        renderValue={(selected) => selected.map(type => {
                            let found = customerTypes.find(r => r === type);
                            return found;
                        }).join(', ')}
                        MenuProps={{ style: { display: 'block' } }}
                    >
                        {
                            _.map(customerTypes, type => (
                                <MenuItem key={`customer_type_${type}`} value={type}>
                                    <Checkbox checked={formData.customer_type?.indexOf(type) > -1} />
                                    <ListItemText primary={type} />
                                </MenuItem>
                            ))
                        }
                    </Select>
                </Box>
            </TableCell>
            <TableCell sx={{ px: '5px' }} align="center">
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { width: '18ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    <Select
                        disabled={formData.past_performance}
                        size='small'
                        id="service_rating"
                        name="service_rating"
                        value={formData.service_rating}
                        onChange={handleChange}
                        fullWidth
                        MenuProps={{ style: { display: 'block' } }}
                    >
                        <MenuItem value={5}>{`5-Exceptional`}</MenuItem>
                        <MenuItem value={4}>{`4-Very Good`}</MenuItem>
                        <MenuItem value={3}>{`3-Satisfactory`}</MenuItem>
                        <MenuItem value={2}>{`2-Marginal`}</MenuItem>
                        <MenuItem value={1}>{`1-Unsatistfactory`}</MenuItem>
                    </Select>
                </Box>
            </TableCell>
        </TableRow>
    )
}

export default DomainLaborCategory;