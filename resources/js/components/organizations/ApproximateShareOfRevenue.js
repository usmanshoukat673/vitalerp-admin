import React, { useState } from "react";
import { Form, Input, Label } from 'semantic-ui-react';
import { Box, Typography, Collapse, Table, TableBody, TableCell, TableRow } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ApproximateShareOfRevenue = ({ company }) => {

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
            <Typography color='primary' onClick={handleECChange} sx={{ padding: '10px', cursor: 'pointer' }} variant="h6" gutterBottom>Approximate share of revenue attributable to {state.collapse ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </Typography>

            <Collapse in={state.collapse}>
                <Box sx={{ padding: '0px 15px 15px 15px' }}>


                    <Form>

                        <Table sx={{ marginBottom: '15px' }}>

                            <TableBody>
                                <TableRow>
                                    <TableCell>Last complete financial year </TableCell>
                                    <TableCell>
                                        <Input labelPosition='right' type='text'>
                                            <input />
                                            <Label>% online trading</Label>
                                        </Input>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Input labelPosition='right' type='text'>
                                            <input />
                                            <Label>% business to business</Label>
                                        </Input>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Input labelPosition='right' type='text'>
                                            <input />
                                            <Label>% business to consumer</Label>
                                        </Input>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Form>
                </Box>
            </Collapse>
        </Box>
    );
}

export default ApproximateShareOfRevenue;