import React, { Component } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import './RGSubHeaderRow.scss';

class RGSubHeaderRow extends Component {

    state = {
        errors: [],
        loading: false,
    }

    render() {

        return (
            <TableRow>
                <TableCell className="TableCell__sub">

                </TableCell>
                <TableCell className="TableCell__sub">

                </TableCell>
                <TableCell className="TableCell__sub"> </TableCell>
                <TableCell className="TableCell__sub"> </TableCell>
                <TableCell className="TableCell__sub"> </TableCell>
                <TableCell className="TableCell__sub">1-3</TableCell>
                <TableCell className="TableCell__sub">1-3</TableCell>
                <TableCell className="TableCell__sub">Impact x Prob.</TableCell>
                <TableCell className="TableCell__sub">(Avoid, Mitigate, Transfer, Accept)</TableCell>
                <TableCell className="TableCell__sub">

                </TableCell>
            </TableRow>
        );
    }
}

export default RGSubHeaderRow;
