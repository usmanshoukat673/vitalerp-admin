import React from 'react';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import ControlRow from './ControlRow';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const DomainControls = () => {

    const { domain_controls } = useSelector((state) => ({
        domain_controls: state.compliance.domain_controls,
    }));

    return (
        <>
            {
                _.size(domain_controls) > 0 ?
                    <TableContainer component={Paper}>
                        <Table aria-label="Domain Controls">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>
                                        Name
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 600 }} style={{ width: 117 }}>
                                        Maturity Level
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 600 }} style={{ width: 120 }}>
                                        Applicability
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 600 }} style={{ width: 120 }}>
                                        Status
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 600 }} style={{ width: 200 }}>
                                        Last Modified
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600 }} style={{ width: 80 }}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    _.map(domain_controls, control => <ControlRow key={`domain_control-${control.id}`} control={control} />)
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <Alert severity="info">Controls not found.</Alert>

            }

        </>
    )
}

export default DomainControls;