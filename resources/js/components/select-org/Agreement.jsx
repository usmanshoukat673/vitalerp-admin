import React, { useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import AgreementData from "./AgreementData";
import axiosInstance from "../../api/api";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearPWDRotation, clearToken, clearUser, setAllProjects, setCompanies, setMaturityLevels, setPWDRotation, setSelectedProject, setSelectedTask, setSupplier, setUser, unsetSearchQuery, unsetSearchResults } from "../../actions";
import { deleteStore } from "../../store/localStorage";
import { scroller } from 'react-scroll';

const Agreement = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleAccept = () => {
        setLoading(true);

        axiosInstance.post('/api/auth/user/accept-agreement')
            .then(response => {
                setSuccess('Agreement accepted successfully.');
                setError('');
                setLoading(false)
                const params = new URLSearchParams(location.search);
                const redirect = params.get('redirect');

                setUserData(response.data);

                if (redirect) {
                    history.push(redirect);
                }
                else {
                    history.push(response.data.redirect);
                }

            })
            .catch(error => {
                setSuccess('');
                if (error.response.status === 400) {
                    setError(error.response.data.error);
                }
                else {
                    setError('Verification failed. Please try again.');
                }
            })
            .finally(() => setLoading(false));
    };

    const setUserData = (data) => {
        dispatch(setUser(data.user));
        dispatch(setCompanies(data.companies));
        dispatch(setMaturityLevels(data.maturity_levels));
        dispatch(setSupplier(data.supplier));
        dispatch(setPWDRotation(data.pwd_rotaion));
    }

    const logOut = () => {
        axiosInstance.get('/api/auth/logout').then(e => {
            dispatch(clearUser());
            dispatch(clearToken());
            dispatch(clearPWDRotation());
            dispatch(unsetSearchQuery());
            dispatch(unsetSearchResults());
            dispatch(setSelectedProject({}));
            dispatch(setAllProjects([]));
            dispatch(setSelectedTask({}));
            deleteStore();
        }).catch(err => {
            dispatch(clearUser());
            dispatch(clearToken());
            dispatch(clearPWDRotation());
            dispatch(unsetSearchQuery());
            dispatch(unsetSearchResults());
            deleteStore();
        });
    }

    const [active_bk, setActiveBookmark] = useState('privacy__intro');

    const scrollToBk = (name) => {
        setActiveBookmark(name);
        scroller.scrollTo(name, {
            duration: 500,
            delay: 0,
            smooth: 'easeInOutQuart',
            containerId: 'scroll-container', // Ensures it's inside the scrolling Box
            offset: -50
        });
    }

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ padding: '5% 20% 0px 20%' }}
        >
            <Grid item xs={12} sm={12} md={12} sx={{
                backgroundColor: "white",
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,
            }}>
                <Typography variant="h4" gutterBottom>
                    User Agreement
                </Typography>
                <Box
                    id="scroll-container"
                    sx={{
                        maxHeight: '60vh',
                        overflowY: 'auto',
                    }}
                >
                    <AgreementData onClickHandler={scrollToBk} />
                </Box>

                <Grid container spacing={2} justifyContent="left" marginTop={2}>
                    <Grid item>
                        <Button onClick={handleAccept} variant="contained" color="primary">
                            Accept Agreement
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={logOut} variant="outlined" color="secondary">
                            Decline
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Agreement;
