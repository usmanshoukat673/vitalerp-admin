import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import Alert from '@mui/material/Alert';
import ControlRow from './ControlRow';

const NotApplicableControls = () => {

    const { domain_controls } = useSelector((state) => ({
        domain_controls: state.compliance.domain_controls,
    }));

    return (
        <>
            {
                _.size(domain_controls) > 0 ?
                    <>
                        <Table responsive className="table table-centered table-nowrap mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="border-0">Name</th>
                                    <th className="border-0">Maturity Level</th>
                                    <th className="border-0">Applicability</th>
                                    <th className="border-0">Status</th>
                                    <th className="border-0">Last Modified</th>
                                    <th className="border-0" style={{ width: '80px' }}>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    _.map(domain_controls, control => {
                                        return control.applicable == 'Not Applicable' && <ControlRow key={`domain_control-${control.id}`} control={control} />
                                    })
                                }

                            </tbody>
                        </Table>
                    </>
                    : <Alert severity="info">Controls not found.</Alert>

            }

        </>
    )
}

export default NotApplicableControls;