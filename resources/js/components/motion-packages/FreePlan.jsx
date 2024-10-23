// @flow
import React, { useState } from 'react';
import { Col, Card } from 'react-bootstrap';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { setCompanies, setCompany, setPackagesPopupStatus } from '../../actions';
import axiosInstance from '../../api/api';

let plan1 = {
    id: 'prod_OFtEQkS5jvyEmx',
    name: 'Free Pack',
    icon: 'dripicons-user',
    price: '$0',
    duration: 'Month',
    features: ['ISO 27001 4-10', 'ISO 27001:2013 Annex A', '1 User'],
    isRecommended: false,
    isAvailable: true,
};

const SubmitButton = ({ confirm }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleConfirm = () => {
        setOpen(false);
        confirm();
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button disabled={open} variant="outlined" onClick={handleClickOpen}>
                Choose Plan
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Do you genuinely wish to proceed with the free plan?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your account will experience limitations and restrictions under the free plan. Before making a decision, it's important to consider whether you are fully aware of and comfortable with the constraints associated with this option. Are you absolutely certain that you want to proceed with the free plan despite its limitations?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Explore other plans
                    </Button>
                    <Button onClick={handleConfirm} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const FreePlan = ({ plan }) => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const { company, companies } = useSelector(state => ({
        token: state.token.activeToken,
        company: state.orgs.company,
        companies: state.orgs.companies,
    }))

    const dispatch = useDispatch();

    const confirm = () => {
        setLoading(true);
        axiosInstance.post(`/api/user/marketplace/assign-free-plan`, {
            comp_id: company.id,
        }).then(e => {
            updateRedux(e.data);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }

    const updateRedux = (company) => {
        dispatch(setCompany(company));
        let companies_local = JSON.parse(JSON.stringify(companies));
        let index = _.findIndex(companies_local, cm => {
            return cm.id === company.id;
        });
        companies_local[index] = company;
        dispatch(setCompanies(companies_local));
        dispatch(setPackagesPopupStatus(false));
    }

    return (
        <>
            <Col md={4}>
                <Card
                    className={classNames('card-pricing', {
                        'card-pricing-recommended': plan.is_recommended,
                    })}>
                    <Card.Body className="text-center">
                        <p className="card-pricing-plan-name fw-bold text-uppercase">{plan.name}</p>
                        <i className={classNames('card-pricing-icon', plan.icon, 'text-primary')}></i>
                        <h2 className="card-pricing-price">
                            {plan.price} <span>/ MONTH</span>
                        </h2>
                        {
                            plan.is_available && <SubmitButton confirm={confirm} />
                        }
                        <ul className="card-pricing-features">
                            {plan.features.map((feature, idx1) => {
                                return <li key={idx1}>{feature.feature.name}</li>;
                            })}
                            {plan.description.map((feature, idx1) => {
                                return <li key={idx1}>{feature}</li>;
                            })}
                        </ul>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};

export default FreePlan;
