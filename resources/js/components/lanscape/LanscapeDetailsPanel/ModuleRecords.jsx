import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRelatedRecord } from '../../../actions';
import RecordActions from './RecordActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ModuleRecords = () => {

    const dispatch = useDispatch();

    const { category, module_details } = useSelector((state) => ({
        category: state.lanscape.category,
        module_details: state.lanscape.module_details,
    }));

    const handleAddRelatedRecord = () => {
        dispatch(setRelatedRecord({
            open: true,
            module_id: category.id
            // from: 'control',
            // document: { id: 0, name: '--New Docoument--', content: '', type: 'document' }
        }));
    }

    return (
        <>
            {
                <TableContainer component={Paper}>
                    <Table aria-label="Module Records">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>
                                    Name
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: 600 }}>

                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: 600 }}>

                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: 600 }} style={{ width: 220 }}>
                                    Created Date
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 600 }} style={{ width: 80 }}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                _.map(module_details.records, rec => {
                                    return (
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={rec.id}>
                                            <TableCell component="th" scope="row">
                                                {`${rec.name}`}
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell align="left">
                                                {`${rec.created_at}`}
                                            </TableCell>
                                            <TableCell align="right">
                                                <RecordActions record={rec} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>
    )
}

export default ModuleRecords;