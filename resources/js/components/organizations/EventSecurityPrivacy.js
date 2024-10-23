import React, { useState } from "react";
import { Form } from 'semantic-ui-react';
import { Box, Typography, Collapse } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const EventSecurityPrivacy = ({ company }) => {

    const [errors, setErrors] = useState([]);

    const [state, setState] = useState({
        name: '',
        email: '',
        title: '',
        phone: '',
        touched: false,
        collapse: false
    });

    const handleECChange = () => {
        setState({
            ...state,
            collapse: !state.collapse
        });
    };

    const handleChange = event => {
        setState({ ...state, [event.target.name]: event.target.value, touched: true });
        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            setErrors({ errors: errors });
        }
    }

    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    return (
        <Box sx={{ background: '#fff', boxShadow: '0 0px 1px rgb(0 0 0 / 25%)', marginBottom: '15px', borderRadius: '10px' }}>
            <Typography color='primary' onClick={handleECChange} sx={{ padding: '10px', cursor: 'pointer' }} variant="h6" gutterBottom>Applicant’s principal contact in the event of a security or privacy breach {state.collapse ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </Typography>

            <Collapse in={state.collapse}>
                <Box sx={{ padding: '0px 15px 15px 15px' }}>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Name</label>
                                <Form.Input className={handlerInputError('name')} onChange={handleChange} fluid type='text' name="name" value={state.name} />
                                {displayInputError('name')}
                            </Form.Field>
                            <Form.Field>
                                <label>Email</label>
                                <Form.Input className={handlerInputError('email')} onChange={handleChange} fluid type='email' name="email" value={state.email} />
                                {displayInputError('email')}
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Title</label>
                                <Form.Input className={handlerInputError('title')} onChange={handleChange} fluid type='text' name="title" value={state.title} />
                                {displayInputError('title')}
                            </Form.Field>
                            <Form.Field>
                                <label>Phone</label>
                                <Form.Input className={handlerInputError('phone')} onChange={handleChange} fluid type='text' name="phone" value={state.phone} />
                                {displayInputError('phone')}
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Box>
            </Collapse>
        </Box>
    );
}

export default EventSecurityPrivacy;