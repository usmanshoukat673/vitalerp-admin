import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import Alert from '@mui/material/Alert';
import showTZDate from '../../../../utils/showTZDate';

const ControlMappings = () => {

    const { control_mappings, company } = useSelector((state) => ({
        control_mappings: state.compliance.control_mappings,
        company: state.orgs.company,
    }));

    return (
        <>
            {
                _.size(control_mappings) > 0 ?
                    <>
                        <Table responsive className="table table-centered table-nowrap mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="border-0">Standard</th>
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
                                    _.map(control_mappings, control => (
                                        <tr key={`mapped_control-${control.id}`}>
                                            <td>
                                                <span>{`${control.control.standard.name}`}</span>
                                            </td>
                                            <td>
                                                <span>{`${control.control.number} ${control.control.name}`}</span>
                                            </td>
                                            <td>
                                                {control.control.maturity_level && `${control.control.maturity_level}`}
                                            </td>
                                            <td>
                                                {control?.applicable}
                                            </td>
                                            <td>
                                                {control?.status}
                                            </td>

                                            <td>
                                                {showTZDate(control.updated_at, company.timezone)}
                                            </td>
                                            <td></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </>
                    : <Alert severity="info">Records not found.</Alert>

            }

        </>
    )
}

export default ControlMappings;