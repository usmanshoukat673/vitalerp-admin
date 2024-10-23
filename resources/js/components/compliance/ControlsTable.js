import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import _ from 'lodash';
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import './ControlsTable.scss';

class ControlsTable extends Component {

    getRiskRating = risk_rating => {
        let rating = '';

        if (risk_rating > 0 && risk_rating <= 3) {
            rating = 'risk__low';
        }
        else if (risk_rating > 3 && risk_rating <= 6) {
            rating = 'risk__mid';
        }
        else if (risk_rating > 6 && risk_rating <= 9) {
            rating = 'rish__high';
        }
        else {
            rating = '';
        }

        return rating;

    };

    getApplicability = properties => {
        if (properties.applicable == null) {
            return '';
        }

        return (properties.applicable === 'Not Applicable' ? <AiOutlineCloseCircle className="control__not__applicable" /> : <BsCheckCircle className="control__applicable" />);
    };

    navigate = id => {
        this.props.navigate(id);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { controls } = this.props;

        return (
            <TableContainer className="ControlsTable" component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" colSpan={6}>Controls</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="center">APPLICABLE</TableCell>
                            <TableCell align="right">STATUS</TableCell>
                            <TableCell align="right">ARTIFACTS</TableCell>
                            <TableCell align="right">RISK</TableCell>
                            <TableCell align="right">MAPPED</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            _.map(controls, control => {
                                return ((
                                    <TableRow key={control.id}>
                                        <TableCell component="th" scope="row">
                                            <div className="control__link" onClick={() => { this.navigate(control.id) }}>
                                                {
                                                    _.truncate(`${control.number} ${control.name}`, {
                                                        'length': 40,
                                                        'separator': ' '
                                                    })
                                                }
                                            </div>
                                        </TableCell>
                                        <TableCell align="center">{control.properties ? this.getApplicability(control.properties) : ''}</TableCell>
                                        <TableCell align="right">{control.properties ? control.properties.status : ''}</TableCell>
                                        <TableCell align="right">{control.artifacts ? control.artifacts.length : ''}</TableCell>
                                        <TableCell align="right" className={this.getRiskRating(control.assessment_question ? control.assessment_question.risk_rating : 0)}></TableCell>
                                        <TableCell align="right">{control.mapped ? control.mapped.length : ''}</TableCell>
                                    </TableRow>
                                ))
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}


export default ControlsTable;
