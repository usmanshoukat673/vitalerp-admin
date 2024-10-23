import React, { useEffect, useState } from "react";
import LoadingBackgrop from "../LoadingBackgrop";
import { Autocomplete, Box, FormControl, ListItemText } from "@mui/material";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import Checkbox from '@mui/material/Checkbox';
import axiosInstance from "../../api/api";
import { useHistory } from "react-router-dom";
import { getModuleAccess } from "../../helpers/getModuleAccess";
import { getError, isFieldExistsInErrors } from "../../utils/errorHelper";
import NAICSCodeProvider from "./NAICSCodeProvider";
import { NotificationManager } from "react-notifications";
import AgenciesProvider from "./AgenciesProvider";
import PimeContractHistoryProvider from "./PimeContractHistoryProvider";
import { setCorporateProfileStatus } from "../../actions";

const Capability = () => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setFormData] = useState({
        primary_naics_code: null,
        secondary_codes: [],
        agencies: [],
        states: [],
        countries: [],
        has_prime_contracts: '', // yes or no
        primed_contract_last_two_years: '',
        prime_contract_history: [],
        acquisition_contracts: '',
        product_and_services: '',
    });

    const { company, supplier, naics_codes, states, countries, active_supplier, corporate_profile_status } = useSelector((state) => ({
        company: state.orgs.company,
        supplier: state.supplier.supplier,
        naics_codes: state.validvalues.naics_codes,
        states: state.validvalues.states,
        countries: state.validvalues.countries,
        active_supplier: state.corporate.active_supplier,
        corporate_profile_status: state.corporate.corporate_profile_status,
    }));

    useEffect(() => {
        if (!getModuleAccess(_.size(company?.roles) > 0 ? company.roles : [], _.size(supplier?.roles) > 0 ? supplier.roles : [], [12, 14, 19, 2, 3, 5])) {
            history.push('/dashboard');
        }
    }, [company, supplier]);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get(`/api/user/corporate-profile/capability/${active_supplier.id}`)
            .then(e => {

                let scap = e.data.supplier_capability;

                setFormData((prevState) => ({
                    ...prevState,
                    id: scap.id,
                    primary_naics_code: scap.primary_naics_code,
                    secondary_codes: _.map(scap.secondary_naics_codes, e => e.id),
                    agencies: _.map(scap.agencies, e => e.id),
                    prime_contract_history: _.map(scap.prime_contracts, e => e.id),
                    states: _.map(scap.states, e => e.id),
                    countries: _.map(scap.countries, e => e.id),
                    has_prime_contracts: scap.has_prime_contracts,
                    primed_contract_last_two_years: scap.primed_contract_last_two_years,
                    acquisition_contracts: scap.acquisition_contracts,
                    product_and_services: scap.product_and_services
                }));

                dispatch(setCorporateProfileStatus({
                    ...corporate_profile_status,
                    supplier_capability: e.data.isCompleted
                }));
            })
            .catch(err => {
                if (err.response.status === 500) {
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }

            }).finally(() => setLoading(false));
    }, [active_supplier]);

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

    const handleSecondaryNaiceCodeChange = (event) => {
        const { value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            secondary_codes: typeof value === 'string' ? value.split(',') : value
        }));
        clearError('secondary_codes');
    };

    const handleSecondaryNaiceCodeSelection = (secondary_codes) => {
        setFormData((prevState) => ({
            ...prevState,
            secondary_codes: secondary_codes
        }));
        clearError('secondary_codes');
    }

    const handleAgenciesSelection = (agencies) => {
        setFormData((prevState) => ({
            ...prevState,
            agencies: agencies
        }));
        clearError('agencies');
    }

    const handlePrimeContractHistorySelection = (prime_contract_history) => {
        setFormData((prevState) => ({
            ...prevState,
            prime_contract_history: prime_contract_history
        }));
        clearError('prime_contract_history');
    }

    const handleMultiSelectChange = (event) => {
        const { value, name } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: typeof value === 'string' ? value.split(',') : value
        }));
        clearError(name);
    };

    const handleUpdate = () => {
        setLoading(true);
        axiosInstance.put(`/api/user/corporate-profile/capability/${active_supplier.id}`, {
            ...formData,
            primary_naics_code: formData.primary_naics_code?.id,
        })
            .then(response => {
                setLoading(false);
                dispatch(setCorporateProfileStatus({
                    ...corporate_profile_status,
                    supplier_capability: true
                }));
                NotificationManager.success(response.data.message, 'Success');
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                    return;
                }
            }).finally(() => {
                setLoading(false);
            });
    }
    return (
        <>
            {loading && <LoadingBackgrop open={loading} />}

            <section style={{ padding: '20px' }}>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>Primary North American Industry Classification System (NAICS) Code <span style={{ color: 'red' }}>*</span></label>
                            <Autocomplete
                                options={naics_codes}
                                id="primary_naics_code"
                                name="primary_naics_code"
                                size="small"
                                value={formData.primary_naics_code}
                                onChange={(event, newValue) => {
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        primary_naics_code: newValue
                                    }));
                                    clearError('primary_naics_code');
                                }}
                                getOptionLabel={(option) => `${option.naics_code} - ${option.naics_industry_description}`}
                                renderInput={(params) => <TextField size="small" {...params} variant="outlined" />}
                                isOptionEqualToValue={(option, value) => option.naics_code === value.naics_code}
                            />

                            {isFieldExistsInErrors('primary_naics_code', errors) && (
                                <p style={{ color: 'red' }}>{getError('primary_naics_code', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '18px' }}>

                            <label htmlFor="secondary_codes">Secondary North American Industry Classification System (NAICS) Codes</label>

                            <NAICSCodeProvider
                                selectedCodes={formData.secondary_codes}
                                setSelectedCodes={handleSecondaryNaiceCodeSelection}
                            />

                            {isFieldExistsInErrors('secondary_codes', errors) && (
                                <p style={{ color: 'red' }}>{getError('secondary_codes', errors)}</p>
                            )}

                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>Federal Agencies you have supported <span style={{ color: 'red' }}>*</span></label>

                            <AgenciesProvider
                                selectedItems={formData.agencies}
                                setSelectedItems={handleAgenciesSelection}
                                entityName={`Agencies`}
                            />

                            {isFieldExistsInErrors('agencies', errors) && (
                                <p style={{ color: 'red' }}>{getError('agencies', errors)}</p>
                            )}
                        </FormControl>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                                <FormControl fullWidth sx={{ mb: '18px' }}>
                                    <label>State(s) where you currently support customers <span style={{ color: 'red' }}>*</span></label>
                                    <Select
                                        size='small'
                                        id="states"
                                        name="states"
                                        multiple
                                        value={formData.states}
                                        onChange={handleMultiSelectChange}
                                        error={isFieldExistsInErrors('states', errors)}
                                        renderValue={(selected) => selected.map(stateId => {
                                            let found = states.find(r => r.id === stateId);
                                            return `${found?.name}`;
                                        }).join(', ')}
                                        fullWidth
                                        MenuProps={{ style: { display: 'block' } }}
                                    >
                                        {_.map(states, state => (
                                            <MenuItem key={`state_${state.id}`} value={state.id}>
                                                <Checkbox checked={formData.states?.indexOf(state.id) > -1} />
                                                <ListItemText primary={state.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>

                                    {isFieldExistsInErrors('state', errors) && (
                                        <p style={{ color: 'red' }}>{getError('state', errors)}</p>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                                <FormControl fullWidth sx={{ mb: '18px' }}>
                                    <label>Countries where you currently support customers <span style={{ color: 'red' }}>*</span></label>
                                    <Select
                                        size='small'
                                        id="countries"
                                        name="countries"
                                        multiple
                                        value={formData.countries}
                                        onChange={handleMultiSelectChange}
                                        error={isFieldExistsInErrors('countries', errors)}
                                        renderValue={(selected) => selected.map(countryId => {
                                            let found = countries.find(r => r.id === countryId);
                                            return `${found?.name}`;
                                        }).join(', ')}
                                        fullWidth
                                        MenuProps={{ style: { display: 'block' } }}
                                    >
                                        {_.map(countries, country => (
                                            <MenuItem key={`state_${country.id}`} value={country.id}>
                                                <Checkbox checked={formData.countries?.indexOf(country.id) > -1} />
                                                <ListItemText primary={country.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>

                                    {isFieldExistsInErrors('countries', errors) && (
                                        <p style={{ color: 'red' }}>{getError('countries', errors)}</p>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                                <FormControl fullWidth sx={{ mb: '18px' }}>
                                    <label>Does your company currently have the ability to prime contracts?</label>
                                    <Select
                                        size='small'
                                        id="has_prime_contracts"
                                        name="has_prime_contracts"
                                        value={formData.has_prime_contracts}
                                        onChange={handleChange}
                                        error={isFieldExistsInErrors('has_prime_contracts', errors)}
                                        fullWidth
                                        MenuProps={{ style: { display: 'block' } }}
                                    >
                                        <MenuItem value={1}>{`Yes`}</MenuItem>
                                        <MenuItem value={0}>{`No`}</MenuItem>
                                    </Select>
                                    {isFieldExistsInErrors('has_prime_contracts', errors) && (
                                        <p style={{ color: 'red' }}>{getError('has_prime_contracts', errors)}</p>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                                <FormControl fullWidth sx={{ mb: '18px' }}>
                                    <label>Has your company primed a contract within the last two years?</label>
                                    <Select
                                        size='small'
                                        id="primed_contract_last_two_years"
                                        name="primed_contract_last_two_years"
                                        value={formData.primed_contract_last_two_years}
                                        onChange={handleChange}
                                        error={isFieldExistsInErrors('primed_contract_last_two_years', errors)}
                                        fullWidth
                                        MenuProps={{ style: { display: 'block' } }}
                                    >
                                        <MenuItem value={1}>{`Yes`}</MenuItem>
                                        <MenuItem value={0}>{`No`}</MenuItem>
                                    </Select>
                                    {isFieldExistsInErrors('primed_contract_last_two_years', errors) && (
                                        <p style={{ color: 'red' }}>{getError('primed_contract_last_two_years', errors)}</p>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>

                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>Prime Contract History <span style={{ color: 'red' }}>*</span></label>
                            
                            <PimeContractHistoryProvider
                                selectedItems={formData.prime_contract_history}
                                setSelectedItems={handlePrimeContractHistorySelection}
                            />
                           
                            {isFieldExistsInErrors('prime_contract_history', errors) && (
                                <p style={{ color: 'red' }}>{getError('prime_contract_history', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>List active Government Wide Acquisition Contracts, GSA Schedules, or Contract Vehicles that your organization primes</label>
                            <TextField
                                size='small'
                                name='acquisition_contracts'
                                onChange={handleChange}
                                multiline
                                rows={3}
                                id='acquisition_contracts'
                                value={formData.acquisition_contracts}
                                error={isFieldExistsInErrors('acquisition_contracts', errors)}
                            />
                            {isFieldExistsInErrors('acquisition_contracts', errors) && (
                                <p style={{ color: 'red' }}>{getError('acquisition_contracts', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>Provide multiple keywords, separated by comma, that best describe your organization's products and/or services</label>
                            <TextField
                                size='small'
                                name='product_and_services'
                                onChange={handleChange}
                                multiline
                                rows={3}
                                id='product_and_services'
                                value={formData.product_and_services}
                                error={isFieldExistsInErrors('product_and_services', errors)}
                            />
                            {isFieldExistsInErrors('product_and_services', errors) && (
                                <p style={{ color: 'red' }}>{getError('product_and_services', errors)}</p>
                            )}
                        </FormControl>

                        <Box sx={{ mb: '18px' }}>
                            <Stack direction="row" spacing={2}>
                                <Button onClick={handleUpdate} loading={loading} sx={{ pl: '50px', pr: '50px' }} size='large' variant="contained">Update</Button>
                            </Stack>
                        </Box>

                    </Grid>

                </Grid>
            </section >
        </>
    );
}

export default Capability;