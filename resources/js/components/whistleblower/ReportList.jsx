import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from '../../api/api';
import ReportIndividual from './ReportIndividual';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const ReportList = () => {

    const { leftnav, company, user } = useSelector((state) => ({
        leftnav: state.leftnav,
        company: state.orgs.company,
        user: state.user.activeUser,
    }));

    const [reports, setReports] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/user/whistleblows/reports/index')
            .then(e => {
                setReports(e.data);
            })
            .catch(err => {
                if (err.response.status === 500 || err.response.status === 422) {
                }
                if (err.response.status === 400) {
                }
            });
    }, []);

    return (
        <div className="activity__bucket">
            <div className="at__bucket__header">
                Reports:
            </div>
            <div className="at__bucket__body">
                {
                    _.size(reports) > 0 ?  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="Report list table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Reported</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reports.map((report) => (
                                <ReportIndividual key={report.id} report={report} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> : 
                 <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success">No reports found</Alert>
                </Stack>
                }
               
            </div>
        </div>
    );
}

export default ReportList;