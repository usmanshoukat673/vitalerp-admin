import React, { useEffect, useState } from "react";
import LoadingBackgrop from "../LoadingBackgrop";
import { Box, FormControl } from "@mui/material";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axiosInstance from "../../api/api";
import { useHistory } from "react-router-dom";
import { getModuleAccess } from "../../helpers/getModuleAccess";
import { getError, isFieldExistsInErrors } from "../../utils/errorHelper";
import QualityCertsProvider from "./QualityCertsProvider";
import { NotificationManager } from "react-notifications";
import _ from "lodash";
import { setCorporateProfileStatus } from "../../actions";


const SecurityAndCertifications = () => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setFormData] = useState({
        sustainability_program: '',
        sustainability_program_describe: '',
        registred_certifications: [],
        compliant_standards: [],
        security_level: '',
        compliant_requirements: [],
        prepared_to_support: '',
    });

    const { company, supplier, security_levels, compliant_reqs, active_supplier, corporate_profile_status } = useSelector((state) => ({
        company: state.orgs.company,
        supplier: state.supplier.supplier,
        security_levels: state.validvalues.security_levels,
        compliant_reqs: state.validvalues.compliant_reqs,
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
        axiosInstance.get(`/api/user/corporate-profile/security-certifications/${active_supplier.id}`)
            .then(e => {

                let sc = e.data.security_certifications;

                setFormData((prevState) => ({
                    ...prevState,
                    id: sc.id, 
                    sustainability_program: sc.sustainability_program,
                    sustainability_program_describe: _.isEmpty(sc.describe) ? '' : sc.describe,
                    registred_certifications: _.map(sc.registred_certifications, e => e.id),
                    compliant_standards: _.map(sc.compliant_standards, e => e.id),
                    security_level: sc.security_level,
                    compliant_requirements: _.map(sc.compliant_requirements, e => e.id),
                    prepared_to_support: sc.prepared_to_support
                }));

                dispatch(setCorporateProfileStatus({
                    ...corporate_profile_status,
                    security_certifications: e.data.isCompleted
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

    const handleYesNoChange = (event, fieldToClear) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        clearError(name);
        if (fieldToClear && value == 0) {
            setFormData((prevState) => ({
                ...prevState,
                [fieldToClear]: ''
            }));
            clearError(fieldToClear);
        }
    }

    const clearError = (fieldName) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[fieldName];
            return newErrors;
        });
    }

    const handleRegisteredCertsSelection = (registred_certifications) => {
        setFormData((prevState) => ({
            ...prevState,
            registred_certifications: registred_certifications
        }));
        clearError('registred_certifications');
    }

    const handleCompliantStandardsSelection = (compliant_standards) => {
        setFormData((prevState) => ({
            ...prevState,
            compliant_standards: compliant_standards
        }));
        clearError('compliant_standards');
    }

    const handleCompliantRequirementsChange = (event, id) => {
        const isChecked = event.target.checked;
        setFormData((prevFormData) => {
            const { compliant_requirements } = prevFormData;

            if (isChecked) {
                return {
                    ...prevFormData,
                    compliant_requirements: [...compliant_requirements, id],
                };
            } else {
                return {
                    ...prevFormData,
                    compliant_requirements: compliant_requirements.filter((reqId) => reqId !== id),
                };
            }
        });
    };

    const handleUpdate = () => {
        setLoading(true);
        axiosInstance.put(`/api/user/corporate-profile/security-certifications/${active_supplier.id}`, {
            ...formData,
        })
            .then(response => {
                setLoading(false);
                dispatch(setCorporateProfileStatus({
                    ...corporate_profile_status,
                    security_certifications: true
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
                            <label>Do you have a "sustainability" or "green" program?</label>
                            <Select
                                size='small'
                                id="sustainability_program"
                                name="sustainability_program"
                                value={formData.sustainability_program}
                                onChange={(e) => handleYesNoChange(e, 'sustainability_program_describe')}
                                error={isFieldExistsInErrors('sustainability_program', errors)}
                                fullWidth
                                MenuProps={{ style: { display: 'block' } }}
                            >
                                <MenuItem value={1}>{`Yes`}</MenuItem>
                                <MenuItem value={0}>{`No`}</MenuItem>
                            </Select>

                            {isFieldExistsInErrors('sustainability_program', errors) && (
                                <p style={{ color: 'red' }}>{getError('sustainability_program', errors)}</p>
                            )}

                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>If yes you can complete freeform below. {formData.sustainability_program === 1 ? <span style={{ color: 'red' }}>*</span> : ''}</label>
                            <TextField
                                size='small'
                                name='sustainability_program_describe'
                                onChange={handleChange}
                                id='sustainability_program_describe'
                                value={formData.sustainability_program_describe}
                                multiline
                                disabled={formData.sustainability_program !== 1}
                                rows={4}
                                error={isFieldExistsInErrors('sustainability_program_describe', errors)}
                            />
                            {isFieldExistsInErrors('sustainability_program_describe', errors) && (
                                <p style={{ color: 'red' }}>{getError('sustainability_program_describe', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>Do you have a registered or certified quality system that is based on one of the standards listed below? Select those that apply:</label>
                            <QualityCertsProvider
                                selectedItems={formData.registred_certifications}
                                setSelectedItems={handleRegisteredCertsSelection}
                                entityName="Certifications"
                            />

                            {isFieldExistsInErrors('registred_certifications', errors) && (
                                <p style={{ color: 'red' }}>{getError('registred_certifications', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>Are you compliant, but not certified to any of the standards listed below.  Select those that apply:</label>
                            <QualityCertsProvider
                                selectedItems={formData.compliant_standards}
                                setSelectedItems={handleCompliantStandardsSelection}
                                entityName="Standards"
                            />

                            {isFieldExistsInErrors('compliant_standards', errors) && (
                                <p style={{ color: 'red' }}>{getError('compliant_standards', errors)}</p>
                            )}
                        </FormControl>

                       

                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>Is your company compliant with one or more of the following requirements? Select those that apply:</label>
                            <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                                <FormGroup>
                                    {compliant_reqs.map((req) => (
                                        <FormControlLabel
                                            key={req.id}
                                            control={
                                                <Checkbox
                                                    checked={formData.compliant_requirements.includes(req.id)}
                                                    onChange={(event) => handleCompliantRequirementsChange(event, req.id)}
                                                />
                                            }
                                            label={req.name}
                                        />
                                    ))}
                                </FormGroup>
                            </Box>
                            {isFieldExistsInErrors('compliant_requirements', errors) && (
                                <p style={{ color: 'red' }}>{getError('compliant_requirements', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>If requested, are you prepared to support an on-site Quality Management System, product and/or process audit AND are Quality records available for review, if necessary to support purchases to your organization? <span style={{ color: 'red' }}>*</span></label>
                            <Select
                                size='small'
                                id="prepared_to_support"
                                name="prepared_to_support"
                                value={formData.prepared_to_support}
                                onChange={handleChange}
                                error={isFieldExistsInErrors('prepared_to_support', errors)}
                                fullWidth
                                MenuProps={{ style: { display: 'block' } }}
                            >
                                <MenuItem value={1}>{`Yes`}</MenuItem>
                                <MenuItem value={0}>{`No`}</MenuItem>
                            </Select>

                            {isFieldExistsInErrors('prepared_to_support', errors) && (
                                <p style={{ color: 'red' }}>{getError('prepared_to_support', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>What is the highest Security Level your Organization Holds</label>
                            <Select
                                size='small'
                                id="sustainability_program"
                                name="security_level"
                                value={formData.security_level}
                                onChange={handleChange}
                                error={isFieldExistsInErrors('security_level', errors)}
                                fullWidth
                                MenuProps={{ style: { display: 'block' } }}
                            >
                                {
                                    _.map(security_levels, security_level => (
                                        <MenuItem key={`security_level_${security_level.id}`} value={`${security_level.id}`}>{`${security_level.name}`}</MenuItem>
                                    ))
                                }
                            </Select>
                            {isFieldExistsInErrors('security_level', errors) && (
                                <p style={{ color: 'red' }}>{getError('security_level', errors)}</p>
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

export default SecurityAndCertifications;