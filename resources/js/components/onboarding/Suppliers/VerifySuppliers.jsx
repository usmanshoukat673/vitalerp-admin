import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { LoadingButton } from '@mui/lab';
import CustomBuildSupplier from './CustomBuildSupplier';
import AddBuildSupplier from './AddBuildSupplier';
import _ from 'lodash';
import { scroller } from 'react-scroll';
import BuildSupplier from './BuildSupplier';

const VerifySuppliers = ({ match, history, location }) => {

    const params = new URLSearchParams(location.search);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [custom_suppilers, setCustomSuppliers] = useState([]);
    const [build_id, setBuildID] = useState('');
    const [standard_id, setStandardId] = useState('');

    const [departments] = useState([]);

    useEffect(() => {
        setBuildID(match.params.build_id);
        setStandardId(match.params.standard_id);

        setLoading(true);
        // axios.get(`/api/auth/onboarding/selected-business-depts/${match.params.build_id}`)
        //     .then(e => {
        //         setDepartments(e.data);
        //     })
        //     .catch(err => {
        //         setLoading(false);
        //         if (err.response.status === 500) {
        //             NotificationManager.error('Server Error, Please contact customer support.', 'Error');
        //         }
        //         if (err.response.status === 422) {
        //             NotificationManager.error(err.response.data, 'Error');
        //         }
        //     });
    }, [match.params]);

    useEffect(() => {
        if (!_.isEmpty(build_id)) {
            setLoading(true);
            axios.get(`/api/auth/onboarding/build-suppliers/${build_id}/${standard_id}`)
                .then(e => {
                    setLoading(false);
                    setErrors([]);
                    setSuppliers(_.filter(e.data, funct => funct.custom == 0));
                    setCustomSuppliers(_.filter(e.data, funct => funct.custom == 1));
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
    }, [build_id, standard_id]);

    const handleAddCustomAsset = (activity) => {
        setCustomSuppliers([...custom_suppilers, activity]);
    }

    const handleDeleteAsset = (activity) => {
        let the_custom_suppilers = JSON.parse(JSON.stringify(custom_suppilers));
        _.remove(the_custom_suppilers, act => act.id == activity.id);
        setCustomSuppliers(the_custom_suppilers);
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
        history.push(`/verify-404/${build_id}/${standard_id}?page=1`);
    }

    const handleBack = () => {
        history.push(`/verify-department-assets/${build_id}/${standard_id}?page=2`);
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
                    <Typography variant="h4" name="page__heading" sx={{ marginBottom: '50px' }}>Verify the Suppliers</Typography>
                    <form>
                        {
                            _.size(suppliers) > 0 && <Box sx={{ padding: '0px 10px 15px 10px' }}>
                                {
                                    _.map(suppliers, funct => (

                                        <BuildSupplier key={funct.id} activity={funct} departments={departments} />

                                    ))
                                }
                            </Box>
                        }
                        <p style={{ paddingTop: '10px' }}>Please verify key suppliers before continuing </p>
                        <Box sx={{ padding: '15px 10px' }}>
                            <Typography variant="h5" sx={{ color: '#000', paddingBottom: '10px' }}>Add Missing Suppliers</Typography>
                            {
                                _.map(custom_suppilers, activity => (
                                    <CustomBuildSupplier delete_asset={handleDeleteAsset} key={activity.id} asset={activity} />
                                ))
                            }
                            <AddBuildSupplier added={handleAddCustomAsset} standard_id={standard_id} build_id={build_id} />
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

export default VerifySuppliers;