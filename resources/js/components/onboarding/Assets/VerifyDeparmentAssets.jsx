import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import DeparmentAsset from './DeparmentAsset';
import { LoadingButton } from '@mui/lab';
import CustomDeparmentAsset from './CustomDeparmentAsset';
import AddDeparmentAsset from './AddDeparmentAsset';
import _ from 'lodash';
import { scroller } from 'react-scroll';

const VerifyDeparmentAssets = ({ match, history, location }) => {

    const params = new URLSearchParams(location.search);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [assets, setAssets] = useState([]);
    const [custom_assets, setCustomAssets] = useState([]);
    const [build_id, setBuildID] = useState('');
    const [standard_id, setStandardId] = useState('');
    const [prev_page_url, setPrevPageUrl] = useState('');
    const [next_page_url, setNextPageUrl] = useState('');
    // It is AssetPage
    const [asset_page, setAssetPage] = useState({});
    // selected departments 
    const [departments, setDepartments] = useState([]);
    const [current_page, setCurrentPage] = useState(0);

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
        setCurrentPage(params.get('page'));
    }, [build_id, standard_id, params]);

    useEffect(() => {
        if (!_.isEmpty(build_id)) {
            setLoading(true);
            axios.get(`/api/auth/onboarding/depts-assets/${build_id}/${standard_id}?page=${current_page}`)
                .then(e => {

                    setPrevPageUrl(e.data.prev_page_url);
                    setNextPageUrl(e.data.next_page_url);
                    setAssetPage(e.data.data[0]);
                    setLoading(false);
                    setErrors([]);
                    setAssets(_.filter(e.data.data[0].assets, funct => funct.custom == 0));
                    setCustomAssets(_.filter(e.data.data[0].assets, funct => funct.custom == 1));
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

    const handleAddCustomAsset = (activity) => {
        setCustomAssets([...custom_assets, activity]);
    }

    const handleDeleteAsset = (activity) => {
        let the_custom_assets = JSON.parse(JSON.stringify(custom_assets));
        _.remove(the_custom_assets, act => act.id == activity.id);
        setCustomAssets(the_custom_assets);
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
            history.push(`/verify-department-assets/${build_id}/${standard_id}?page=${pageNumber}`);
        }
        else {
            history.push(`/verify-suppliers/${build_id}/${standard_id}?page=1`);
        }
    }

    const handleBack = () => {
        if (prev_page_url != null) {
            scrollToHeading();
            let pageNumber = getQueryStringParameter(prev_page_url, 'page');
            setCurrentPage(pageNumber);
            history.push(`/verify-department-assets/${build_id}/${standard_id}?page=${pageNumber}`);
        }
        else {
            history.push(`/verify-department-functions/${build_id}/${standard_id}?page=1`);
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
                    <Typography variant="h4" name="page__heading" sx={{ marginBottom: '50px' }}>Verify the Business {asset_page.title} Assets</Typography>
                    <form>
                        {
                            _.size(assets) > 0 && <Box sx={{ padding: '0px 10px 15px 10px' }}>
                                {
                                    _.map(assets, funct => (

                                        <DeparmentAsset key={funct.id} activity={funct} departments={departments} />

                                    ))
                                }
                            </Box>
                        }
                        <p style={{ paddingTop: '10px' }}>Please verify key business assets before continuing </p>
                        <Box sx={{ padding: '15px 10px' }}>
                            <Typography variant="h5" sx={{ color: '#000', paddingBottom: '10px' }}>Add Missing {asset_page.title} Assets</Typography>
                            {
                                _.map(custom_assets, activity => (
                                    <CustomDeparmentAsset delete_asset={handleDeleteAsset} key={activity.id} asset={activity} />
                                ))
                            }
                            <AddDeparmentAsset added={handleAddCustomAsset} asset_type={asset_page.key} standard_id={standard_id} deparment_id={asset_page.id} build_id={build_id} />
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

export default VerifyDeparmentAssets;