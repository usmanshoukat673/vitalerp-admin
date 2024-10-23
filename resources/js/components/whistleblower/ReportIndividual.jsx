import React, { } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import showTZDate from '../../utils/showTZDate';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router-dom';

const ReportIndividual = ({ report, history }) => {

    const { company } = useSelector((state) => ({
        company: state.orgs.company,
    }));

    const view = () => {
        history.push(`/${company.slug}/organization-settings/whistleblower/view/r/${report.enc_id}`);
    }

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {report.category.name}
            </TableCell>
            <TableCell>
                <Button variant="text" onClick={view}>
                    {report.description}
                </Button>
            </TableCell>
            <TableCell>{showTZDate(report.created_at, company.timezone)}</TableCell>
        </TableRow>
    );
}

export default withRouter(ReportIndividual);