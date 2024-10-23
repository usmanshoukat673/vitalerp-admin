import React, { useState } from "react";
import { Form } from 'semantic-ui-react';
import { Box, Typography, Collapse, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ChangesToTheBusiness = ({ company }) => {

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
            <Typography color='primary' onClick={handleECChange} sx={{ padding: '10px', cursor: 'pointer' }} variant="h6" gutterBottom>Changes to the business {state.collapse ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </Typography>

            <Collapse in={state.collapse}>
                <Box sx={{ padding: '0px 15px 15px 15px' }}>

                    <Form>



                        <Form.Field>
                            <label>Does the Applicant anticipate any changes in business activities, mergers, acquisitions, or operations during the next 12 months? If ‘Yes’, please describe in an appendix to this application.</label>
                            <RadioGroup
                                row
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                <FormControlLabel value="N/A" control={<Radio />} label="N/A" />
                            </RadioGroup>
                        </Form.Field>

                        <Form.Field>
                            <label>Please describe any acquisitions, divestitures, and changes to business operations over the past 12 months.</label>
                            <Form.TextArea rows={3} className={handlerInputError('business_description')} onChange={handleChange} name="business_description" value={state.business_description} />
                            {displayInputError('business_description')}
                        </Form.Field>

                        <Form.Field>
                            <label>Are newly acquired companies required to meet certain cybersecurity standards before they are connected to the network?</label>
                            <RadioGroup
                                row
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                <FormControlLabel value="N/A" control={<Radio />} label="N/A" />
                            </RadioGroup>
                        </Form.Field>
                        <Form.Field>
                            <label>Is a cybersecurity audit part of the formal acquisition process?</label>
                            <RadioGroup
                                row
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                <FormControlLabel value="N/A" control={<Radio />} label="N/A" />
                            </RadioGroup>
                        </Form.Field>

                    </Form>
                </Box>
            </Collapse>
        </Box>
    );
}

export default ChangesToTheBusiness;