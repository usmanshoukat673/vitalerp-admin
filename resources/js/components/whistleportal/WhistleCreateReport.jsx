import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputFileUpload from './InputFileUpload';
import _ from 'lodash';
import SelectedAttachements from './SelectedAttachements';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import Link from '@mui/material/Link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Notice from './Notice';

const WhistleCreateReport = ({ history }) => {

    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [whistle, setWhistle] = useState({});

    const [errors, setErrors] = useState([]);
    const [category, setCategory] = useState('');
    const [more_information, setMoerInformation] = useState('');
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        axios.get('/whistleblows/index', {
            headers: {
                'Custom-Whistle-Report-Link': params.id
            }
        })
            .then(e => {
                setWhistle(e.data);
                setLoading(false);
            })
            .catch(err => {

                if (err.response.status === 500) {
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }

                if (err.response.status === 404) {
                    history.push('/404')
                }
            });
    }, [params]);

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        clearErrors(event.target.name);
    };

    const handleChange = (event) => {
        setMoerInformation(event.target.value);
        clearErrors(event.target.name);
    }

    const onFileChange = event => {
        if (event.target.files.length > 0) {
            if (_.size(attachments) > 0) {
                _.map(event.target.files, file => {
                    console.log(file);
                    setAttachments([...attachments, file]);
                });
            }
            else {
                setAttachments(event.target.files);
            }
        }
    }

    const handleRemove = (file) => {
        let attachments_copy = [...attachments];
        _.remove(attachments_copy, (fl) => {
            return _.isEqual(file, fl);
        });
        setAttachments(attachments_copy);
    }

    const clearErrors = (field) => {
        let errors_copy = [...errors];
        if (errors_copy.length > 0 && errors_copy[0].hasOwnProperty(field)) {
            delete errors_copy[0][field];
            setErrors(errors_copy);
        }
    }

    const submitReport = () => {
        let formData = new FormData();

        if(_.size(attachments) > 0)
        {
            _.forEach(attachments, (file, index) => {
                formData.append(`attachment_${index}`, file);
            });
        }

        formData.append('category', category);
        formData.append('more_information', more_information);

        axios.post('/whistleblows/report/submit', formData, {
            headers: {
                'Custom-Whistle-Report-Link': params.id
            }
        })
            .then(e => {
                setErrors([]);
                history.push(`/whistle/s/${params.id}/${e.data.id}`);
            })
            .catch(err => {

                if (err.response.status === 422) {
                    setErrors([err.response.data.errors]);
                }

                if (err.response.status === 500) {
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }

                if (err.response.status === 404) {
                    history.push('/404')
                }
            });
    }

    return (loading ? <Box sx={{ display: 'flex' }}>
        <CircularProgress />
    </Box> : <div className='__whistle_container'>

        <div>
            <Link
                component="button"
                variant="body2"
                underline="none"
                onClick={() => history.push(`/whistle/${params.id}`)}
            >
              <ArrowBackIcon />  Back to Home Page
            </Link>
        </div>

        <h2 style={{textAlign: 'center'}}>New Report</h2>

        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            <FormControl fullWidth>
                <InputLabel id="category">Category*</InputLabel>
                <Select
                    id="category"
                    name="category"
                    value={category}
                    label="Category*"
                    onChange={handleCategoryChange}
                >
                    <MenuItem value={1}>Suspected Data Breach</MenuItem>
                    <MenuItem value={2}>Bullying</MenuItem>
                    <MenuItem value={3}>Sexual Harassment</MenuItem>
                    <MenuItem value={4}>Discrimination</MenuItem>
                    <MenuItem value={5}>Occupational Health and Safety</MenuItem>
                    <MenuItem value={6}>Non-compliance with Company Policies</MenuItem>
                    <MenuItem value={7}>Theft, Corruption or Embezzlement</MenuItem>
                    <MenuItem value={8}>Environmental</MenuItem>
                    <MenuItem value={9}>Damage to Property</MenuItem>
                    <MenuItem value={10}>Physical Aggression</MenuItem>
                    <MenuItem value={11}>Violation of Law</MenuItem>
                    <MenuItem value={12}>Other</MenuItem>

                </Select>

                {displayInputError('category')}
            </FormControl>

            <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
                Report Recipients:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                {
                    _.map(whistle.recipients, (recipient, index) => (
                        <Chip label={`${recipient.name}`} key={index} color="primary" variant="outlined" />
                    ))
                }
            </Stack>

            <FormControl fullWidth>

                <TextField
                    id="more_information"
                    name="more_information"
                    multiline
                    rows={4}
                    label="Please describe the issue*"
                    onChange={handleChange}
                    value={more_information}
                />

                

            </FormControl>

            {
                _.size(attachments) > 0 && <SelectedAttachements attachments={attachments} remove={handleRemove} />
            }

            {displayInputError('attachments')}

            <br />
            <br />

            <p style={{fontSize: '12px', color: 'rgb(129 128 128)'}}>Allowed file types: [.jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .txt]</p>
            <FormControl>
                <InputFileUpload onFileChange={onFileChange} />
            </FormControl>

            <br />
            <br />

            <FormGroup>
                <FormControlLabel defaultChecked disabled control={<Checkbox defaultChecked />} label="Send the report as anonymous" />
            </FormGroup>

        </Box>

        <br />

        <Stack direction="row" spacing={2}>
            <Button onClick={submitReport} variant="contained">
                Submit Report
            </Button>
        </Stack>

        <br />
        <br />

        <Divider sx={{ margin: '20px 0px' }} />

        <Notice />
    </div>)
}

export default WhistleCreateReport;
