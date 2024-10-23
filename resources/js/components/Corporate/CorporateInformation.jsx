import React, { useEffect, useState } from "react";
import LoadingBackgrop from "../LoadingBackgrop";
import IconButton from '@mui/material/IconButton';
import { Box, FormControl, Link, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getModuleAccess } from "../../helpers/getModuleAccess";
import axiosInstance from "../../api/api";
import { NotificationManager } from "react-notifications";
import { getError, isFieldExistsInErrors } from "../../utils/errorHelper";
import _ from "lodash";
import { setCorporateProfileStatus } from "../../actions";
import ViewPDFDocument from "./ViewPDFDocument";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const CorporateInformation = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { company, supplier, active_supplier, states, corporate_profile_status } = useSelector((state) => ({
        company: state.orgs.company,
        supplier: state.supplier.supplier,
        active_supplier: state.corporate.active_supplier,
        states: state.validvalues.states,
        corporate_profile_status: state.corporate.corporate_profile_status,
    }));

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        another_name: '',
        parent_organization: '',
        parent_organization_name: '',
        established_year: '',
        entity_type: '',
        registration_state: '',
        usa_owned_entity: '',
        foreign_ownership: '',
        uei_code: '',
        cage_code: '',
        duns_number: '',
        business_web_page: '',
        full_time_employees: '',
        average_annual_revenue: '',
        dcaa_approved: '',
        special_awards: '',
        other_comments: '',
    });

    const [file, setFile] = useState(null);
    const [supplier_document, setSupplierDocument] = useState({});

    const [openPDFDocument, setOpenPDFDocument] = useState(false);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!getModuleAccess(_.size(company?.roles) > 0 ? company.roles : [], _.size(supplier?.roles) > 0 ? supplier.roles : [], [12, 14, 19, 2, 3, 5])) {
            history.push('/dashboard');
        }
    }, [company, supplier]);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get(`/api/user/corporate-profile/corporate-information/${active_supplier.id}`)
            .then(e => {

                let ci = e.data.corporate_information;

                setFormData((prevState) => ({
                    ...prevState,
                    id: ci.id,
                    name: active_supplier.name,
                    another_name: !_.isEmpty(ci.another_name) ? ci.another_name : '',
                    parent_organization: ci.parent_organization,
                    parent_organization_name: !_.isEmpty(ci.parent_organization_name) ? ci.parent_organization_name : '',
                    established_year: !_.isEmpty(ci.established_year) ? ci.established_year : '',
                    entity_type: !_.isEmpty(ci.entity_type) ? ci.entity_type : '',
                    registration_state: !_.isEmpty(ci.registration_state) ? ci.registration_state : '',
                    usa_owned_entity: ci.usa_owned_entity,
                    foreign_ownership: ci.foreign_ownership,
                    uei_code: !_.isEmpty(ci.uei_code) ? ci.uei_code : '',
                    cage_code: !_.isEmpty(ci.cage_code) ? ci.cage_code : '',
                    duns_number: !_.isEmpty(ci.duns_number) ? ci.duns_number : '',
                    business_web_page: !_.isEmpty(ci.business_web_page) ? ci.business_web_page : '',
                    full_time_employees: !_.isEmpty(ci.full_time_employees) ? ci.full_time_employees : '',
                    average_annual_revenue: !_.isEmpty(ci.average_annual_revenue) ? ci.average_annual_revenue : '',
                    dcaa_approved: ci.dcaa_approved,
                    special_awards: !_.isEmpty(ci.special_awards) ? ci.special_awards : '',
                    other_comments: !_.isEmpty(ci.other_comments) ? ci.other_comments : '',
                }));
                setSupplierDocument(ci.supplier_document);

                dispatch(setCorporateProfileStatus({
                    ...corporate_profile_status,
                    corporate_information: e.data.isCompleted
                }));
            })
            .catch(err => {
                if (err.response.status === 500) {
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }

            }).finally(() => setLoading(false));
    }, [active_supplier]);

    const onFileChange = event => {
        setFile(event.target.files[0]);
        setErrors([]);
    };

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

    const handleUpdate = () => {
        setLoading(true);

        const fmData = new FormData();
        if (file) {
            fmData.append('file', file);
        }
        fmData.append('id', formData.id);
        fmData.append('name', formData.name);
        fmData.append('another_name', formData.another_name);
        fmData.append('parent_organization', formData.parent_organization);
        fmData.append('parent_organization_name', formData.parent_organization_name);
        fmData.append('established_year', formData.established_year);
        fmData.append('entity_type', formData.entity_type);
        fmData.append('registration_state', formData.registration_state);
        fmData.append('usa_owned_entity', formData.usa_owned_entity);
        fmData.append('foreign_ownership', formData.foreign_ownership);
        fmData.append('uei_code', formData.uei_code);
        fmData.append('cage_code', formData.cage_code);
        fmData.append('duns_number', formData.duns_number);
        fmData.append('business_web_page', formData.business_web_page);
        fmData.append('full_time_employees', formData.full_time_employees);
        fmData.append('average_annual_revenue', formData.average_annual_revenue);
        fmData.append('dcaa_approved', formData.dcaa_approved);
        fmData.append('special_awards', formData.special_awards);
        fmData.append('other_comments', formData.other_comments);

        axiosInstance.post(`/api/user/corporate-profile/corporate-information/${active_supplier.id}`, fmData)
            .then(response => {
                setLoading(false);

                dispatch(setCorporateProfileStatus({
                    ...corporate_profile_status,
                    corporate_information: true
                }));

                NotificationManager.success(response.data.message, 'Success');
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

    const handleOpenPDFDocument = () => {
        if (_.isEmpty(supplier_document)) return;

        setOpenPDFDocument(true);
    }

    const handleClosePDFDocument = () => {
        setOpenPDFDocument(false);
    }

    return (
        <>
            {loading && <LoadingBackgrop open={loading} />}

            <section style={{ padding: 20 }}>
                <Grid container spacing={2} >

                    <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>

                        <Typography sx={{ mb: '18px' }} gutterBottom>
                            Full Legal Entity Name: {active_supplier.name}
                        </Typography>

                        <FormControl fullWidth sx={{ mb: '18px' }}>
                            <label>Doing business as another name?</label>
                            <TextField
                                size='small'
                                name='another_name'
                                onChange={handleChange}
                                id='another_name'
                                fullWidth
                                value={formData.another_name}
                                error={isFieldExistsInErrors('another_name', errors)}
                            />
                            {isFieldExistsInErrors('another_name', errors) && (
                                <p style={{ color: 'red' }}>{getError('another_name', errors)}</p>
                            )}
                        </FormControl>

                        <Grid container spacing={2} sx={{ mb: '18px' }}>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} container alignItems="flex-end">
                                <FormControl fullWidth>
                                    <label style={{ marginBottom: '8px' }}>Are there any related or controlled entities associated with your Entity?</label>
                                    <Select
                                        size='small'
                                        id="parent_organization"
                                        name="parent_organization"
                                        value={formData.parent_organization}
                                        onChange={(e) => handleYesNoChange(e, 'parent_organization_name')}
                                        error={isFieldExistsInErrors('parent_organization', errors)}
                                        fullWidth
                                        MenuProps={{ style: { display: 'block' } }}
                                    >
                                        <MenuItem value={1}>{`Yes`}</MenuItem>
                                        <MenuItem value={0}>{`No`}</MenuItem>
                                    </Select>

                                    {isFieldExistsInErrors('parent_organization', errors) && (
                                        <p style={{ color: 'red' }}>{getError('parent_organization', errors)}</p>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} container alignItems="flex-end">
                                <FormControl fullWidth>
                                    <label style={{ marginBottom: '8px' }}>If Yes, please provide:</label>
                                    <TextField
                                        size='small'
                                        name='parent_organization_name'
                                        onChange={handleChange}
                                        id='parent_organization_name'
                                        type="text"
                                        disabled={!formData.parent_organization}
                                        fullWidth
                                        value={formData.parent_organization_name}
                                        error={isFieldExistsInErrors('parent_organization_name', errors)}
                                    />
                                    {isFieldExistsInErrors('parent_organization_name', errors) && (
                                        <p style={{ color: 'red' }}>{getError('parent_organization_name', errors)}</p>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Box sx={{ mb: '18px' }}>
                            <label>Year Entity Established:<span style={{ color: 'red' }}>*</span></label>
                            <TextField
                                size='small'
                                name='established_year'
                                onChange={handleChange}
                                id='established_year'
                                type="number"
                                fullWidth
                                value={formData.established_year}
                                error={isFieldExistsInErrors('established_year', errors)}
                            />
                            {isFieldExistsInErrors('established_year', errors) && (
                                <p style={{ color: 'red' }}>{getError('established_year', errors)}</p>
                            )}
                        </Box>

                        <Box sx={{ mb: '18px' }}>
                            <label>Legal Entity Type:<span style={{ color: 'red' }}>*</span></label>
                            <Select
                                id="entity_type"
                                name="entity_type"
                                value={formData.entity_type}
                                size="small"
                                onChange={handleChange}
                                error={isFieldExistsInErrors('entity_type', errors)}
                                fullWidth
                                MenuProps={{ style: { display: 'block' } }}
                            >
                                <MenuItem value={`Sole Proprietor`}>Sole Proprietor</MenuItem>
                                <MenuItem value={`Limited-Liabilty Company`}>Limited-Liabilty Company</MenuItem>
                                <MenuItem value={`Limited Partnership`}>Limited Partnership</MenuItem>
                                <MenuItem value={`Partnership`}>Partnership</MenuItem>
                            </Select>
                            {isFieldExistsInErrors('entity_type', errors) && (
                                <p style={{ color: 'red' }}>{getError('entity_type', errors)}</p>
                            )}
                        </Box>

                        <Box sx={{ mb: '18px' }}>
                            <label>State of Registration of Primary Entity:<span style={{ color: 'red' }}>*</span></label>
                            <Select
                                size='small'
                                id="registration_state"
                                name="registration_state"
                                value={formData.registration_state}
                                onChange={handleChange}
                                error={isFieldExistsInErrors('registration_state', errors)}
                                fullWidth
                                MenuProps={{ style: { display: 'block' } }}
                            >
                                {_.map(states, state => (
                                    <MenuItem key={`state_${state.id}`} value={state.name}>{`${state.name}`}</MenuItem>
                                ))}
                            </Select>

                            {isFieldExistsInErrors('registration_state', errors) && (
                                <p style={{ color: 'red' }}>{getError('registration_state', errors)}</p>
                            )}
                        </Box>

                        <Box sx={{ mb: '18px' }}>
                            <label>Are you “United States" Owned Entity? <span style={{ color: 'red' }}>*</span></label>
                            <Select
                                size='small'
                                id="usa_owned_entity"
                                name="usa_owned_entity"
                                value={formData.usa_owned_entity}
                                onChange={handleChange}
                                error={isFieldExistsInErrors('usa_owned_entity', errors)}
                                fullWidth
                                MenuProps={{ style: { display: 'block' } }}
                            >
                                <MenuItem value={1}>{`Yes`}</MenuItem>
                                <MenuItem value={0}>{`No`}</MenuItem>
                            </Select>
                            {isFieldExistsInErrors('usa_owned_entity', errors) && (
                                <p style={{ color: 'red' }}>{getError('usa_owned_entity', errors)}</p>
                            )}
                        </Box>

                        <Box sx={{ mb: '18px' }}>
                            <label>Are there any Foreign influences or Foreign minority ownership? <span style={{ color: 'red' }}>*</span></label>
                            <Select
                                size='small'
                                id="foreign_ownership"
                                name="foreign_ownership"
                                value={formData.foreign_ownership}
                                onChange={handleChange}
                                error={isFieldExistsInErrors('foreign_ownership', errors)}
                                fullWidth
                                MenuProps={{ style: { display: 'block' } }}
                            >
                                <MenuItem value={1}>{`Yes`}</MenuItem>
                                <MenuItem value={0}>{`No`}</MenuItem>
                            </Select>
                            {isFieldExistsInErrors('foreign_ownership', errors) && (
                                <p style={{ color: 'red' }}>{getError('foreign_ownership', errors)}</p>
                            )}
                        </Box>

                        <Grid container spacing={2} sx={{ mb: '18px' }}>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>

                                <Box >
                                    <label>Unique Entity Identifer (UEI) Code: <span style={{ color: 'red' }}>*</span></label>
                                    <TextField
                                        size='small'
                                        name='uei_code'
                                        onChange={handleChange}
                                        id='uei_code'
                                        fullWidth
                                        autoComplete="off"
                                        value={formData.uei_code}
                                        error={isFieldExistsInErrors('uei_code', errors)}
                                    />
                                    {isFieldExistsInErrors('uei_code', errors) && (
                                        <p style={{ color: 'red' }}>{getError('uei_code', errors)}</p>
                                    )}
                                </Box>

                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>

                                <Box >
                                    <label>Commercial and Govement Entity (CAGE) Code</label>
                                    <TextField
                                        size='small'
                                        name='cage_code'
                                        onChange={handleChange}
                                        id='cage_code'
                                        autoComplete="off"
                                        fullWidth
                                        value={formData.cage_code}
                                        error={isFieldExistsInErrors('cage_code', errors)}
                                    />
                                    {isFieldExistsInErrors('cage_code', errors) && (
                                        <p style={{ color: 'red' }}>{getError('cage_code', errors)}</p>
                                    )}
                                </Box>

                            </Grid>

                        </Grid>

                        <Box sx={{ mb: '18px' }}>
                            <label>Dun & Bradstreet Global Data Universal Numbering Systems (DUNS) Number?</label>
                            <TextField
                                size='small'
                                name='duns_number'
                                onChange={handleChange}
                                id='duns_number'
                                fullWidth
                                autoComplete="off"
                                value={formData.duns_number}
                                error={isFieldExistsInErrors('duns_number', errors)}
                            />
                            {isFieldExistsInErrors('duns_number', errors) && (
                                <p style={{ color: 'red' }}>{getError('duns_number', errors)}</p>
                            )}
                        </Box>

                        <Box sx={{ mb: '18px' }}>
                            <label>Business Web Page:<span style={{ color: 'red' }}>*</span></label>
                            <TextField
                                size='small'
                                name='business_web_page'
                                onChange={handleChange}
                                id='business_web_page'
                                fullWidth
                                value={formData.business_web_page}
                                error={isFieldExistsInErrors('business_web_page', errors)}
                            />
                            {isFieldExistsInErrors('business_web_page', errors) && (
                                <p style={{ color: 'red' }}>{getError('business_web_page', errors)}</p>
                            )}
                        </Box>

                        <Box sx={{ mb: '18px' }}>
                            <label>Average number of employees (including affiliates) over the last 24 calendar months<span style={{ color: 'red' }}>*</span></label>
                            <TextField
                                size='small'
                                name='full_time_employees'
                                onChange={handleChange}
                                id='full_time_employees'
                                fullWidth
                                value={formData.full_time_employees}
                                error={isFieldExistsInErrors('full_time_employees', errors)}
                            />
                            {isFieldExistsInErrors('full_time_employees', errors) && (
                                <p style={{ color: 'red' }}>{getError('full_time_employees', errors)}</p>
                            )}
                        </Box>

                        <Box sx={{ mb: '18px' }}>
                            <label>Average Annual Receipts (including affiliates) for the last 5 years:<span style={{ color: 'red' }}>*</span></label>
                            <TextField
                                size='small'
                                name='average_annual_revenue'
                                onChange={handleChange}
                                id='average_annual_revenue'
                                fullWidth
                                value={formData.average_annual_revenue}
                                error={isFieldExistsInErrors('average_annual_revenue', errors)}
                            />
                            {isFieldExistsInErrors('average_annual_revenue', errors) && (
                                <p style={{ color: 'red' }}>{getError('average_annual_revenue', errors)}</p>
                            )}
                        </Box>

                        <Box sx={{ mb: '18px' }}>
                            <label>Do you use a DCAA (Defense Contract Audit Agency) approved accounting system?:<span style={{ color: 'red' }}>*</span></label>
                            <Select
                                size='small'
                                id="dcaa_approved"
                                name="dcaa_approved"
                                value={formData.dcaa_approved}
                                onChange={handleChange}
                                error={isFieldExistsInErrors('dcaa_approved', errors)}
                                fullWidth
                                MenuProps={{ style: { display: 'block' } }}
                            >
                                <MenuItem value={1}>{`Yes`}</MenuItem>
                                <MenuItem value={0}>{`No`}</MenuItem>
                            </Select>
                            {isFieldExistsInErrors('dcaa_approved', errors) && (
                                <p style={{ color: 'red' }}>{getError('dcaa_approved', errors)}</p>
                            )}
                        </Box>

                        <Box sx={{ mb: '18px' }}>
                            <label>List any special awards or recognition in the last two years:</label>
                            <TextField
                                size='small'
                                name='special_awards'
                                onChange={handleChange}
                                id='special_awards'
                                fullWidth
                                multiline
                                rows={4}
                                value={formData.special_awards}
                                error={isFieldExistsInErrors('special_awards', errors)}
                            />
                            {isFieldExistsInErrors('special_awards', errors) && (
                                <p style={{ color: 'red' }}>{getError('special_awards', errors)}</p>
                            )}
                        </Box>

                        <Box sx={{ mb: '18px' }}>
                            <label>Additional Comments or Concerns that should be noted in your Corporate Profile</label>
                            <TextField
                                size='small'
                                name='other_comments'
                                onChange={handleChange}
                                id='other_comments'
                                fullWidth
                                multiline
                                rows={4}
                                value={formData.other_comments}
                                error={isFieldExistsInErrors('other_comments', errors)}
                            />
                            {isFieldExistsInErrors('other_comments', errors) && (
                                <p style={{ color: 'red' }}>{getError('other_comments', errors)}</p>
                            )}
                        </Box>

                        <Box sx={{ mb: '22px' }}>
                            <label>Change to “If you have a marketing brochure in PDF format that you would like to upload please click below:</label>
                            {
                                !file && _.isEmpty(supplier_document) && <Box>
                                    <Button
                                        sx={{ mt: '18px' }}
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Corporate Marketing Document
                                        <VisuallyHiddenInput onChange={onFileChange} type="file" />
                                    </Button>
                                </Box>
                            }
                            {file && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <Typography variant="body2" sx={{ mr: 1 }}>
                                        {file.name}
                                    </Typography>
                                    <IconButton onClick={() => setFile(null)}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            )}
                            {isFieldExistsInErrors('file', errors) && (
                                <p style={{ color: 'red' }}>{getError('file', errors)}</p>
                            )}

                            {
                                !_.isEmpty(supplier_document) && <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <Link onClick={handleOpenPDFDocument} underline="hover" sx={{ mr: 1, cursor: 'pointer' }}>
                                        {`${supplier_document.name}`}
                                    </Link>
                                    <IconButton onClick={() => setSupplierDocument({})}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            }
                        </Box>

                        <Box sx={{ mb: '18px' }}>
                            <Stack direction="row" spacing={2}>
                                <Button onClick={handleUpdate} disabled={loading} sx={{ pl: '50px', pr: '50px' }} size='large' variant="contained">Update</Button>
                            </Stack>
                        </Box>

                    </Grid>

                </Grid>
            </section>

            {
                openPDFDocument && <ViewPDFDocument
                    open={openPDFDocument}
                    close={handleClosePDFDocument}
                    document_id={supplier_document.id}
                    supplier_id={active_supplier.id}
                    name={supplier_document.name}
                />
            }
        </>
    );
}

export default CorporateInformation;