import React, { useEffect, useState } from "react";
import LoadingBackgrop from "../LoadingBackgrop";
import { Box, FormControl, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import FormControlLabel from '@mui/material/FormControlLabel';
import axiosInstance from "../../api/api";
import { useHistory } from "react-router-dom";
import { getModuleAccess } from "../../helpers/getModuleAccess";
import { getError, isFieldExistsInErrors } from "../../utils/errorHelper";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SocioeconomicListProvider from "./SocioeconomicListProvider";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { NotificationManager } from "react-notifications";
import { setCorporateProfileStatus } from "../../actions";

const Socioenomic = () => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setFormData] = useState({
        socioecomic_status: [],
        exit_date: null, // use dayjs to fill defult value ex dayjs('2022-04-17')
        ethnicity: '',
        mentor_protege_program: '',
        relationships: '',
    });

    const { company, supplier, ethnicities, active_supplier, corporate_profile_status } = useSelector((state) => ({
        company: state.orgs.company,
        supplier: state.supplier.supplier,
        ethnicities: state.validvalues.ethnicities,
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
        axiosInstance.get(`/api/user/corporate-profile/socioenomic/${active_supplier.id}`)
            .then(e => {
                let ss = e.data.supplier_socioenomics;
                setFormData((prevState) => ({
                    ...prevState,
                    id: ss.id,
                    exit_date: ss.exit_date ? dayjs(ss.exit_date) : null,
                    mentor_protege_program: ss.mentor_protege_program,
                    relationships: _.isEmpty(ss.relationships) ? '' : ss.relationships,
                    ethnicity: ss.ethnicity_id,
                    socioecomic_status: _.map(ss.socioenomic_status, e => e.id)
                }));

                dispatch(setCorporateProfileStatus({
                    ...corporate_profile_status,
                    supplier_socioenomic: e.data.isCompleted
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

    const handleSocioeconomicsSelection = (socioecomic_status) => {
        setFormData((prevState) => ({
            ...prevState,
            socioecomic_status: socioecomic_status
        }));
        clearError('socioecomic_status');
    }

    const handleExitDateChange = (value) => {
        setFormData((prevState) => ({
            ...prevState,
            exit_date: value
        }));
        clearError('exit_date');
    };

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
        axiosInstance.put(`/api/user/corporate-profile/socioenomic/${active_supplier.id}`, {
            ...formData,
            exit_date: (formData.exit_date ? formData.exit_date.format('YYYY-MM-DD') : null),
        })
            .then(response => {
                setLoading(false);
                dispatch(setCorporateProfileStatus({
                    ...corporate_profile_status,
                    supplier_socioenomic: true
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

                        <Typography variant="h6" gutterBottom>
                            Business  Size and Classification
                        </Typography>

                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>What is your organization's business type/socio-economic status? <span style={{ color: 'red' }}>*</span></label>
                            <SocioeconomicListProvider
                                selectedItems={formData.socioecomic_status}
                                setSelectedItems={handleSocioeconomicsSelection}
                            />

                            {isFieldExistsInErrors('socioecomic_status', errors) && (
                                <p style={{ color: 'red' }}>{getError('socioecomic_status', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>If you are in or have been in the Small Business Administration (SBA) 8a Program what is or will be your exit date?
                                {formData.socioecomic_status.includes(17) && <span style={{ color: 'red' }}> *</span>}
                            </label>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    name="exit_date"
                                    size="small"
                                    value={formData.exit_date}
                                    onChange={handleExitDateChange}
                                    renderInput={(params) => <TextField size="small" {...params} />}
                                />
                            </LocalizationProvider>

                            {isFieldExistsInErrors('exit_date', errors) && (
                                <p style={{ color: 'red' }}>{getError('exit_date', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>Is your company currently participating in any Mentor-Protege Program <span style={{ color: 'red' }}>*</span></label>
                            <Select
                                size='small'
                                id="mentor_protege_program"
                                name="mentor_protege_program"
                                value={formData.mentor_protege_program}
                                onChange={handleChange}
                                error={isFieldExistsInErrors('mentor_protege_program', errors)}
                                fullWidth
                                MenuProps={{ style: { display: 'block' } }}
                            >
                                <MenuItem value={1}>{`Yes`}</MenuItem>
                                <MenuItem value={0}>{`No`}</MenuItem>
                            </Select>
                            {isFieldExistsInErrors('mentor_protege_program', errors) && (
                                <p style={{ color: 'red' }}>{getError('mentor_protege_program', errors)}</p>
                            )}

                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>If yes, list what relationships you are currently in {formData.mentor_protege_program == 1 && <span style={{ color: 'red' }}>*</span>}</label>
                            <TextField
                                size='small'
                                name='relationships'
                                onChange={handleChange}
                                id='relationships'
                                multiline
                                disabled={formData.mentor_protege_program !== 1}
                                value={formData.relationships}
                                rows={4}
                                error={isFieldExistsInErrors('relationships', errors)}
                            />
                            {isFieldExistsInErrors('relationships', errors) && (
                                <p style={{ color: 'red' }}>{getError('relationships', errors)}</p>
                            )}
                        </FormControl>

                        <Typography variant="h6" gutterBottom>
                            Ethnicity
                        </Typography>

                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>If Supplier represented itself as either disadvantaged or minority-owned, (i.e., Small Disadvantaged Business; Economically Disadvantaged Women-Owned Small Business or Minority-Owned – Other Than Small Business), the supplier is requested to check the category in which its ownership falls. By checking one of the selections below, the supplier certifies that it has done so voluntarily. Select which one is applicable:</label>
                            <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: '5px', padding: '10px', mt: 1 }}>
                                <RadioGroup
                                    aria-labelledby="controlled-ethinity-buttons-group"
                                    name="ethnicity"
                                    id="ethnicity"
                                    value={formData.ethnicity}
                                    onChange={handleChange}
                                >
                                    {
                                        _.map(ethnicities, (ethnicity, index) => (
                                            <FormControlLabel key={`ethnicity-${index}`} value={`${ethnicity.id}`} control={<Radio />} label={`${ethnicity.name}`} />
                                        ))
                                    }
                                </RadioGroup>
                            </Box>

                            {isFieldExistsInErrors('ethnicity', errors) && (
                                <p style={{ color: 'red' }}>{getError('ethnicity', errors)}</p>
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

export default Socioenomic;