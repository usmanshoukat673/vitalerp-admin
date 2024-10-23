import React, { useState } from "react";
import { Form } from 'semantic-ui-react';
import { Box, Typography, Collapse, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const TypeOfBussiness = ({ company }) => {

    const [errors, setErrors] = useState([]);

    const [state, setState] = useState({
        business_type: '',
        date_established: '',
        business_description: '',
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
            <Typography color='primary' onClick={handleECChange} sx={{ padding: '10px', cursor: 'pointer' }} variant="h6" gutterBottom>Type of business {state.collapse ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </Typography>

            <Collapse in={state.collapse}>
                <Box sx={{ padding: '0px 15px 15px 15px' }}>
                    <Form>
                        <Form.Field>
                            <RadioGroup
                                row
                                aria-labelledby="business_types"
                                name="business_types-buttons-group"
                            >
                                <FormControlLabel value="Sole proprietor" control={<Radio />} label="Sole proprietor" />
                                <FormControlLabel value="Corporation" control={<Radio />} label="Corporation" />
                                <FormControlLabel value="Partnership" control={<Radio />} label="Partnership" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />                                 
                            </RadioGroup>
                        </Form.Field>

                        <Form.Field>
                            <label>Date established</label>
                            <Form.Input className={handlerInputError('date_established')} onChange={handleChange} fluid type='text' name="date_established" value={state.date_established} />
                            {displayInputError('date_established')}
                        </Form.Field>
                        <Form.Field>
                            <label>Business description</label>
                            <Form.TextArea rows={6} className={handlerInputError('business_description')} onChange={handleChange} name="business_description" value={state.business_description} />
                            {displayInputError('business_description')}
                        </Form.Field>
                    </Form>
                </Box>
            </Collapse>
        </Box>
    );
}

export default TypeOfBussiness;