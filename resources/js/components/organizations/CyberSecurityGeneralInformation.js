import React, { useState } from "react";
import { Form, Input, Label } from 'semantic-ui-react';
import { Box, Typography, Collapse, Table, TableBody, TableCell, TableRow } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CyberSecurityGeneralInformation = ({ company }) => {

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
            <Typography color='primary' onClick={handleECChange} sx={{ padding: '10px', cursor: 'pointer' }} variant="h6" gutterBottom>Cybersecurity General Information {state.collapse ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </Typography>

            <Collapse in={state.collapse}>
                <Box sx={{ padding: '0px 15px 15px 15px' }}>

                    <div>
                        <p>Throughout this application, there are several important terms. For clarity, please use the following definitions to guide your answers.</p>

                        <ul>
                            <li><b>Vital Assets:</b> Assets which are key to the organization’s success and operation. Vital assets include, but are not limited to, applications which support business production, applications which store business critical and/or sensitive data, and core technology services such as directory services, document repositories, and email.</li>
                            <li><b>Domain Administrator:</b> User accounts, excluding Service Accounts, which are privileged (see below). In an Active Directory environment, this would include Enterprise Admins, Domain Admins, and the (built-in domain) Administrators groups, including nested groups/accounts. In Azure, this would include Global Administrators, Hybrid Identity Administrators, and Privileged Role Administrators.</li>
                            <li><b>Service Accounts:</b> Accounts used for running applications and other processes. They are not typically used by humans.</li>
                            <li><b>Privileged:</b> Any account having administrative rights in whatever solution is in use for directory services, identity provider (IdP),
                            rights management, etc. In an Active Directory environment, this would include Enterprise Admins, Domain Admins, and the (built-in domain) Administrators groups, including nested groups/accounts. In Azure, this would include Global Administrators, Hybrid Identity Administrators, and Privileged Role Administrators.</li>
                        </ul>
                    </div>

                    <Form>

                        <Table sx={{marginBottom: '15px'}}>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1. Annual IT budget:</TableCell>
                                    <TableCell>
                                        <Input type='text' placeholder='USD'>
                                            <Label basic>$</Label>
                                            <input />
                                        </Input>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2. Percentage of IT budget spent on cyber security:</TableCell>
                                    <TableCell>
                                        <Input type='text' labelPosition="right">
                                            <input />
                                            <Label basic>%</Label>
                                        </Input>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>3. Full-time IT employees:</TableCell>
                                    <TableCell>
                                        <Input type='text'>
                                            <input />
                                        </Input>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>4. Full-time cybersecurity employees:</TableCell>
                                    <TableCell>
                                        <Input type='text'>
                                            <input />
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

export default CyberSecurityGeneralInformation;