import React, { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Collapse from '@mui/material/Collapse';
import { setRelatedRecord, toggleCreateRecord } from '../../../actions';
import Button from '@mui/material/Button';
const AddUsers = React.lazy(() => import('../../record/AddUsers'));
const AddTeams = React.lazy(() => import('../../record/AddTeams'));

const NonConfiguredRecords = ({ question_id }) => {

    const dispatch = useDispatch();

    const { module_details, record } = useSelector((state) => ({
        module_details: state.lanscape.module_details,
        record: state.lanscape.record,
    }));

    const handleAddRelatedRecord = (type) => {
        dispatch(setRelatedRecord({
            open: true,
            module_id: record.module_id,
            type
            // from: 'control',
            // document: { id: 0, name: '--New Docoument--', content: '', type: 'document' }
        }));
    }

    const configure = (rec) => {
        dispatch(toggleCreateRecord({
            open: true,
            record_to_configure: rec,
            type: 'configure', // add // configure
        }));
    }

    return (
        <>

            <Table responsive className="table table-centered table-nowrap mb-0">
                <thead className="table-light">
                    <tr>
                        <th className="border-0">Name</th>
                        <th className="border-0"></th>
                        <th className="border-0"></th>
                        <th className="border-0">Created Date</th>
                        <th className="border-0" style={{ width: '80px' }}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        _.map(module_details.not_configured, rec => {
                            return (
                                <tr key={rec.id}>
                                    <td>
                                        {`${rec.name}`}
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        {`${rec.created_at}`}
                                    </td>
                                    <td>
                                        <Button onClick={() => configure(rec)} size='small' variant="outlined">Configure</Button>
                                    </td>
                                </tr>
                            );
                        })
                    }

                    
                  
                </tbody>
            </Table>

            
        </>
    )
}

export default NonConfiguredRecords;