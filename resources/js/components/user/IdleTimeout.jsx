import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteStore } from '../../store/localStorage';
import { clearToken, clearUser } from '../../actions';
import axiosInstance from '../../api/api';

const IdleTimeout = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { token, user } = useSelector((state) => ({
        token: state.token.activeToken,
        user: state.user.activeUser,
    }));

    const [open, setOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes countdown  {120}
    const idleTimeout = 600000; // 10 minutes in milliseconds {600000}
    const warningTimeout = 480000; // 8 minutes in milliseconds (to show the warning after 8 mins) {480000}

    const logOut = () => {
        axiosInstance.get('/api/auth/logout').then(e => {
            dispatch(clearUser());
            dispatch(clearToken());
            deleteStore();
            setOpen(false);
            history.push('/login?idealogout=true');
        }).catch(err => {
            dispatch(clearUser());
            dispatch(clearToken());
            deleteStore();
        });
    };

    useEffect(() => {

        if (!user) {
            return; // If the user is already logged out, do nothing.
        }

        let idleTimer = null;
        let warningTimer = null;

        const handleUserActivity = () => {
            clearTimers();
            idleTimer = setTimeout(() => {
                setOpen(true);
                startCountdown();
            }, warningTimeout);

            warningTimer = setTimeout(() => {
                logOut(token); // Call logOut method
            }, idleTimeout);
        };

        const startCountdown = () => {
            setTimeLeft(120);
            const countdown = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(countdown);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        };

        const clearTimers = () => {
            if (idleTimer) clearTimeout(idleTimer);
            if (warningTimer) clearTimeout(warningTimer);
        };

        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keypress', handleUserActivity);

        handleUserActivity(); // Initialize timers on load

        return () => {
            clearTimers();
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keypress', handleUserActivity);
        };
    }, [user]);

    const handleClose = () => {
        setOpen(false);
        window.location.reload(); // Extend session by reloading or other logic
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Session Timeout Warning"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You have been idle for a while. You will be logged out in {timeLeft} seconds due to inactivity.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Stay Logged In
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default IdleTimeout;