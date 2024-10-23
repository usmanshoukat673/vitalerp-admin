import React, { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import { setRelatedRecord } from '../../../actions';
const AddLocation = React.lazy(() => import('../../record/AddLocation'));

const RecordLocations = ({ module_id, question_id }) => {

    const dispatch = useDispatch();

    const { record_details, assign_related_record } = useSelector((state) => ({
        record_details: state.lanscape.record_details,
        assign_related_record: state.lanscape.assign_related_record,
    }));

    const handleAddRelatedRecord = () => {
        dispatch(setRelatedRecord({
            open: true,
            module_id
            // from: 'control',
            // document: { id: 0, name: '--New Docoument--', content: '', type: 'document' }
        }));
    }

    return (
        <>

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
                            _.map(record_details.locations, l => {
                                return (
                                    <tr key={l.location.id}>
                                        <td>
                                            {`${l.location.name}`}
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            {`${l.created_at}`}
                                        </td>
                                        <td></td>
                                    </tr>
                                );
                            })
                        }
                        {
                            !assign_related_record?.open && <tr>
                                <td colSpan={5}>
                                    <a onClick={handleAddRelatedRecord} className='chand'><AddIcon /> Add location</a>
                                </td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </>

            <Box sx={{ width: '40%' }}>
                <Collapse in={assign_related_record?.open}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AddLocation question_id={question_id} />
                    </Suspense>
                </Collapse>
            </Box>

        </>
    )
}

export default RecordLocations;