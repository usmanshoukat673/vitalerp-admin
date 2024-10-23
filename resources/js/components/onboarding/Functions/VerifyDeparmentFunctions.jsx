import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import DeparmentFunction from './DeparmentFunction';
import { LoadingButton } from '@mui/lab';
import CustomDeparmentFunction from './CustomDeparmentFunction';
import AddDeparmentFunction from './AddDeparmentFunction';
import _ from 'lodash';
import { scroller } from 'react-scroll';

const VerifyDeparmentFunctions = ({ match, history, location }) => {

    const params = new URLSearchParams(location.search);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [functions, setFunctions] = useState([]);
    const [custom_functions, setCustomFunctions] = useState([]);
    const [build_id, setBuildID] = useState('');
    const [standard_id, setStandardId] = useState('');
    const [prev_page_url, setPrevPageUrl] = useState('');
    const [next_page_url, setNextPageUrl] = useState('');
    const [department, setDepartment] = useState({});
    const [current_page, setCurrentPage] = useState(0);

    useEffect(() => {
        setBuildID(match.params.build_id);
        setStandardId(match.params.standard_id);
    }, [match.params]);

    useEffect(() => {
        setCurrentPage(params.get('page'));
    }, [build_id, standard_id, params]);

    useEffect(() => {
        if (!_.isEmpty(build_id)) {
            setLoading(true);
            axios.get(`/api/auth/onboarding/depts-functions/${build_id}/${standard_id}?page=${current_page}`)
                .then(e => {

                    setPrevPageUrl(e.data.prev_page_url);
                    setNextPageUrl(e.data.next_page_url);
                    setDepartment(e.data.data[0]);
                    setLoading(false);
                    setErrors([]);
                    setFunctions(_.filter(e.data.data[0].functions, funct => funct.custom == 0));
                    setCustomFunctions(_.filter(e.data.data[0].functions, funct => funct.custom == 1));
                    (e.data.current_page != current_page) && setCurrentPage(e.data.current_page);
                })
                .catch(err => {
                    setLoading(false);
                    if (err.response.status === 500) {
                        NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                    }
                    if (err.response.status === 422) {
                        NotificationManager.error(err.response.data, 'Error');
                    }
                });
        }
    }, [build_id, standard_id, current_page]);

    const handleAddCustomFunction = (activity) => {
        setCustomFunctions([...custom_functions, activity]);
    }

    const handleDeleteFunction = (activity) => {
        let the_custom_functions = JSON.parse(JSON.stringify(custom_functions));
        _.remove(the_custom_functions, act => act.id == activity.id);
        setCustomFunctions(the_custom_functions);
    }

    const getQueryStringParameter = (url, param) => {
        const params = new URL(url).searchParams;
        return params.get(param);
    }

    const scrollToHeading = () => {
        scroller.scrollTo(`page__heading`, {
            duration: 500,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }

    const handleNext = (event) => {
        if (next_page_url != null) {
            scrollToHeading();
            let pageNumber = getQueryStringParameter(next_page_url, 'page');
            setCurrentPage(pageNumber);
            history.push(`/verify-department-functions/${build_id}/${standard_id}?page=${pageNumber}`);
        }
        else {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        setLoading(true);
        axios.post(`/api/auth/onboarding/verify-assets`, {
            build_id: build_id,
            standard_id: standard_id,
        })
            .then(e => {
                setLoading(false);
                setErrors([]);
                history.push(`/verify-department-assets/${build_id}/${standard_id}?page=1`);
            })
            .catch(err => {
                setLoading(false);
                if (err.response.status === 500) {
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            });
    }

    const handleBack = () => {
        if (prev_page_url != null) {
            scrollToHeading();
            let pageNumber = getQueryStringParameter(prev_page_url, 'page');
            setCurrentPage(pageNumber);
            history.push(`/verify-department-functions/${build_id}/${standard_id}?page=${pageNumber}`);
        }
        else {
            history.push(`/verify-bussiness-departments/${build_id}/${standard_id}`);
        }
    }

    return (<>
        <div className="auth_page_content">
            <Box sx={{ display: 'flex', marginTop: '30px' }}>
                <Box sx={{ flex: '0.4', marginRight: '50px', marginTop: '50px', fontSize: '19px' }}>
                    <h2>An automated step by step onboarding process typically involves the following steps:</h2>

                    <p>Initial registration: The new hire provides their personal information, such as name, address, and contact details.</p>

                    <p>Verification: The system verifies the employee's identity through email or SMS.</p>

                    <p>Electronic signature: The employee signs all required paperwork, such as the employment contract and non-disclosure agreement, electronically.</p>

                    <p>HR forms: The employee completes all HR forms, such as the tax forms, emergency contact information, and benefit elections.</p>
                </Box>
                <Box sx={{ flex: '0.6', padding: '20px', borderRadius: '6px' }}>
                    <Typography variant="h4" name="page__heading" sx={{ marginBottom: '50px' }}>Verify the Business {department.name} Functions</Typography>
                    <form>
                        {
                            _.size(functions) > 0 && <Box sx={{ padding: '0px 10px 15px 10px' }}>
                                {
                                    _.map(functions, funct => (

                                        <DeparmentFunction key={funct.id} activity={funct} />

                                    ))
                                }
                            </Box>
                        }
                        <p style={{ paddingTop: '10px' }}>Please verify key business functions before continuing </p>
                        <Box sx={{ padding: '15px 10px' }}>
                            <Typography variant="h5" sx={{ color: '#000', paddingBottom: '10px' }}>Add Missing</Typography>
                            {
                                _.map(custom_functions, activity => (
                                    <CustomDeparmentFunction delete_activity={handleDeleteFunction} key={activity.id} activity={activity} />
                                ))
                            }
                            <AddDeparmentFunction added={handleAddCustomFunction} standard_id={standard_id} deparment_id={department.id} build_id={build_id} />
                        </Box>
                        <div className="mt-3">
                            <Button onClick={handleBack} variant="outlined" >Back</Button>
                            <LoadingButton sx={{ marginLeft: '15px' }} size='large' loading={loading} onClick={handleNext} loadingIndicator="Processing..." variant="contained">
                                Next
                            </LoadingButton>
                        </div>
                    </form>
                </Box>
            </Box>
        </div>
    </>);
}

export default VerifyDeparmentFunctions;