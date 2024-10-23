import React, { useState } from "react";
import { Form, Input, Label } from 'semantic-ui-react';
import { Box, Typography, Collapse, Alert, Table, TableBody, TableCell, TableRow, Radio, RadioGroup, FormControlLabel, TableHead } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const AnnualRevenues = ({ company }) => {

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
            <Typography color='primary' onClick={handleECChange} sx={{ padding: '10px', cursor: 'pointer' }} variant="h6" gutterBottom>Annual Revenues {state.collapse ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </Typography>

            <Collapse in={state.collapse}>
                <Box sx={{ padding: '0px 15px 15px 15px' }}>

                    <Alert severity="info"><b>Healthcare applicants:</b> Please provide net patient services revenues. All other applicants — please provide gross revenues.</Alert>

                    <Form>

                        <Table sx={{marginBottom: '15px'}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Last complete financial year</TableCell>
                                    <TableCell>Current year (estimate)</TableCell>
                                    <TableCell>Next year (estimate)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>U.S. revenue</TableCell>
                                    <TableCell>
                                        <Input type='text' placeholder='USD'>
                                            <Label basic>$</Label>
                                            <input />
                                        </Input>
                                    </TableCell>
                                    <TableCell>
                                        <Input type='text' placeholder='USD'>
                                            <Label basic>$</Label>
                                            <input />
                                        </Input>
                                    </TableCell>
                                    <TableCell>
                                        <Input type='text' placeholder='USD'>
                                            <Label basic>$</Label>
                                            <input />
                                        </Input>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>International revenue</TableCell>
                                    <TableCell>
                                        <Input type='text' placeholder='USD'>
                                            <Label basic>$</Label>
                                            <input />
                                        </Input>
                                    </TableCell>
                                    <TableCell>
                                        <Input type='text' placeholder='USD'>
                                            <Label basic>$</Label>
                                            <input />
                                        </Input>
                                    </TableCell>
                                    <TableCell>
                                        <Input type='text' placeholder='USD'>
                                            <Label basic>$</Label>
                                            <input />
                                        </Input>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Gross profits</TableCell>
                                    <TableCell>
                                        <Input type='text' placeholder='USD'>
                                            <Label basic>$</Label>
                                            <input />
                                        </Input>
                                    </TableCell>
                                    <TableCell>
                                        <Input type='text' placeholder='USD'>
                                            <Label basic>$</Label>
                                            <input />
                                        </Input>
                                    </TableCell>
                                    <TableCell>
                                        <Input type='text' placeholder='USD'>
                                            <Label basic>$</Label>
                                            <input />
                                        </Input>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <Form.Field>
                            <label>Do you generate revenues and have a presence i.e. “an establishment” in territories outside the U.S.?</label>
                            <RadioGroup
                                row
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                <FormControlLabel value="N/A" control={<Radio />} label="N/A" />
                            </RadioGroup>
                            <span>
                            If ‘Yes’, please provide a breakdown by appendix to this application. Please note that revenues in Canada and
                            Australia should be further broken down by province and state for tax purposes.</span>
                        </Form.Field>

                        <Form.Field>
                            <label>Do you generate revenues and have a presence, i.e., “an establishment”, in territories Inside the EEA Yes (excluding U.K.)?</label>
                            <RadioGroup
                                row
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                <FormControlLabel value="N/A" control={<Radio />} label="N/A" />
                            </RadioGroup>
                        </Form.Field>

                        <Form.Field>
                            <label>If ‘Yes’, please list the territories:</label>
                            <Form.Input className={handlerInputError('territories')} onChange={handleChange} fluid type='text' name="territories" value={state.territories} />
                            {displayInputError('territories')}
                        </Form.Field>
                    </Form>
                </Box>
            </Collapse>
        </Box>
    );
}

export default AnnualRevenues;