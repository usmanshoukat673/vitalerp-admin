import React, { useState } from "react";
import { Form } from 'semantic-ui-react';
import { Box, Typography, Collapse } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const IndivudualForm = ({ company }) => {

    const [errors, setErrors] = useState([]);

    const [state, setState] = useState({
        full_name: '',
        surname: '',
        email: '',
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
            <Typography color='primary' onClick={handleECChange} sx={{ padding: '10px', cursor: 'pointer' }} variant="h6" gutterBottom>Individual completing application form information {state.collapse ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </Typography>

            <Collapse in={state.collapse}>
                <Box sx={{ padding: '0px 15px 15px 15px' }}>
                    <Form>
                        <Form.Field>
                            <label>Full name</label>
                            <Form.Input className={handlerInputError('full_name')} onChange={handleChange} fluid type='text' name="full_name" value={state.full_name} />
                            {displayInputError('full_name')}
                        </Form.Field>
                        <Form.Field>
                            <label>Surname</label>
                            <Form.Input className={handlerInputError('surname')} onChange={handleChange} fluid type='text' name="surname" value={state.surname} />
                            {displayInputError('surname')}
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <Form.Input className={handlerInputError('email')} onChange={handleChange} fluid type='email' name="email" value={state.email} />
                            {displayInputError('email')}
                        </Form.Field>
                    </Form>
                </Box>
            </Collapse>
        </Box>
    );
}

export default IndivudualForm;