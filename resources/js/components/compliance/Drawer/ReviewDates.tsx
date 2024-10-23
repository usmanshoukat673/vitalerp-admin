import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { Box, Typography, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/api';

const ReviewDates = ({ document, saved }) => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [last_review, setLastReview] = useState('');
    const [next_review, setNextReview] = useState('');

    useEffect(() => {
        setLastReview(document.review_at);
        setNextReview(document.next_review_at);
    }, [document]);
    

    const handleLastReviewChange = (value) => {
        setLastReview(value);
        saveReview('review_at', value, 'review_by');
    }

    const handleNextReviewChange = (value) => {
        setNextReview(value);
        saveReview('next_review_at', value, 'next_review_by');
    }

    const saveReview = (field, value, requester) => {
        axiosInstance.post(`/api/user/cjfm/document-review-date`, {
            document_id: document.enc_id,
            field: field,
            requester: requester,
            value: value.format('YYYY-MM-DD hh:mm:ss')
        }).then(e => {
            setLoading(false);
            saved(e.data.document);
        }).catch(err => {
            if (err.response.status === 422) {
                setErrors(errors.concat(err.response.data.errors));
                NotificationManager.error(err.response.data.errors.document_name[0], 'Error');
            }
        }).finally(() => {
            setLoading(false);
                setErrors([]);
        });
    }

    return (<>
        <Typography sx={{ pl: '10px' }} gutterBottom>Review</Typography>

        <Box sx={{ m: '10px' }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                    label="Last Review"
                    inputFormat="MM/DD/YYYY"
                    value={last_review}
                    onChange={handleLastReviewChange}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                />
            </LocalizationProvider>
        </Box>

        <Box sx={{ m: '10px' }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                    label="Next Review"
                    inputFormat="MM/DD/YYYY"
                    value={next_review}
                    onChange={handleNextReviewChange}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                />
            </LocalizationProvider>
        </Box>
    </>);
}

export default ReviewDates;