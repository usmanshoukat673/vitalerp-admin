import React, { forwardRef, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { withRouter } from 'react-router-dom';
import Slide from '@mui/material/Slide';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setPackageSummary, setPackagesPopupStatus } from '../../actions';
import FreePlan from './FreePlan';
import BusinessPlan from './BusinessPlan';
import CustomPlan from './CustomPlan';
import { Button } from '@mui/material';
import MakeSubscriptionPayment from './MakeSubscriptionPayment';
import { cancelSubscription } from '../store/cart/cartApi';
import axiosInstance from '../../api/api';

const darkTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
    },
});

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MotionPakages = ({ history }) => {

    const { open, company, summary, token } = useSelector(state => ({
        open: state.mpackages.open,
        company: state.orgs.company,
        summary: state.mpackages.summary,
        token: state.token.activeToken,
    }))

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        loadPackages();
    }, []);

    const dispatch = useDispatch();

    const handleClose = () => {
        if (!_.isEmpty(company.plan)) {
            dispatch(setPackagesPopupStatus(false));
        }
    };

    const switchOrg = () => {
        dispatch(setPackagesPopupStatus(false));
        history.push('/select-organization');
    }

    const handleCancelSubcription = () => {
        cancelSubscription(summary.subscriptionId, token);
        dispatch(setPackageSummary({
            ...summary,
            subscriptionId: '',
            clientSecret: ''
        }));
    }

    const loadPackages = () => {
        setLoading(true);
        axiosInstance.get(`/api/user/marketplace/plans`).then(e => {
            setPlans(e.data);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }

    return (
        <Dialog
            fullWidth
            maxWidth="xl"
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            className='MotionPakagesDialog'
            disableEscapeKeyDown
        >
            <ThemeProvider theme={darkTheme}>
                <AppBar sx={{ position: 'relative' }}>
                    {
                        _.isEmpty(summary.subscriptionId) ? <Toolbar>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Select your pack
                            </Typography>
                            <Button color="inherit" variant="outlined" onClick={switchOrg}>
                                Logout
                            </Button>
                        </Toolbar> : <Toolbar>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Please make payment
                            </Typography>
                        </Toolbar>
                    }
                </AppBar>
                <Row className="justify-content-center">
                    <Col xl={10}>
                        <br />
                        <div className="text-center">
                            <h3 className="mb-2">Our Plans and Pricing</h3>
                            <p className="text-muted w-50 m-auto">
                                We have plans and prices that fit your business perfectly. Make your client site a success
                                with our products.
                            </p>
                        </div>
                        {
                            _.isEmpty(summary.subscriptionId) && !loading && <Row className="mt-sm-5 mt-3 mb-3">
                                <FreePlan plan={plans[0]} />
                                <BusinessPlan plan={plans[1]} />
                                <CustomPlan plan={plans[2]} />
                            </Row>
                        }

                        {
                            !_.isEmpty(summary.subscriptionId) && <Row className="mt-4">
                                <Col sm={12}>
                                    <MakeSubscriptionPayment cancelPayment={handleCancelSubcription} />
                                </Col>
                            </Row>
                        }

                    </Col>
                </Row>
            </ThemeProvider>
        </Dialog>
    );
}

export default withRouter(MotionPakages);