import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import _ from 'lodash';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import Link from '@mui/material/Link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import Typography from '@mui/material/Typography';
import Notice from './Notice';
import showCurrentTZDate from '../../utils/showCurrentTZDate';
import UploadedAttachments from './UploadedAttachments';


const WhistleCheckReport = ({ history }) => {

    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [whistle, setWhistle] = useState({});
    const [report, setReport] = useState({});

    const [errors, setErrors] = useState([]);
    const [report_code, setReportCode] = useState('');

    const handleReportCodeChange = (event) => {
        setReportCode(event.target.value);
        clearErrors(event.target.name);
    }

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

    const validate = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? true : false;
    }

    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const clearErrors = (field) => {
        let errors_copy = [...errors];
        if (errors_copy.length > 0 && errors_copy[0].hasOwnProperty(field)) {
            delete errors_copy[0][field];
            setErrors(errors_copy);
        }
    }

    const checkReport = () => {
        setProcessing(true);
        axios.post('/whistleblows/report/check', {
            report_code
        }, {
            headers: {
                'Custom-Whistle-Report-Link': params.id
            }
        })
            .then(e => {
                setProcessing(false);
                setErrors([]);
                setReportCode('');
                setReport(e.data);
            })
            .catch(err => {
                setProcessing(false);
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

    const CheckReportForm = () => {
        return (
            <>
                <h2 style={{ textAlign: 'center' }}>Check Report</h2>

                <p style={{ textAlign: 'center' }}>
                    Please enter your report code.
                </p>

                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '55ch' }, display: 'flex', justifyItems: 'center', justifyContent: 'center'
                    }}
                >
                    <TextField
                        error={validate('report_code')}
                        onChange={handleReportCodeChange}
                        className={handlerInputError('report_code')}
                        id="report_code"
                        label="Report Code *"
                        name="report_code"
                        value={report_code}
                        variant="outlined"
                        sx={{ marginRight: '10px' }}
                        fullWidth
                        type='number'
                    />

                </Box>

                <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyItems: 'center', justifyContent: 'center' }}>
                    {displayInputError('report_code')}
                </Stack>

                <br />

                <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyItems: 'center', justifyContent: 'center' }}>
                    <Button disabled={processing} onClick={checkReport} variant="contained">
                        Continue
                    </Button>
                </Stack>
            </>
        );
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

        {
            _.isEmpty(report) ? <CheckReportForm /> :

                <>
                    <div className='__report_view'>
                        <h2 style={{ textAlign: 'center' }}>My Report</h2>

                        <div>
                            <Typography variant="caption" display="block" gutterBottom>
                                Reported
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                {showCurrentTZDate(report.date)}
                            </Typography>
                        </div>

                        <div>
                            <Typography variant="caption" display="block" gutterBottom>
                                Sender
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                Anonym
                            </Typography>
                        </div>

                        <div>
                            <Typography variant="caption" display="block" gutterBottom>
                                Category
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                {report.category}
                            </Typography>
                        </div>

                        <div>
                            <Typography variant="caption" display="block" gutterBottom>
                                Description:
                            </Typography>
                            <p>
                                {report.description}
                            </p>
                        </div>

                        {
                            _.size(report.attachments) > 0 && <UploadedAttachments attachments={report.attachments} />
                        }

                    </div>



                    <br></br>
                    <div>
                        <Link
                            component="button"
                            variant="body2"
                            underline="none"
                            onClick={() => setReport({})}
                        >
                            <MarkChatReadIcon />  Check another report
                        </Link>
                    </div>
                </>
        }

        <br />
        <br />

        <Divider sx={{ margin: '20px 0px' }} />

        <Notice />
    </div>)
}

export default WhistleCheckReport;
