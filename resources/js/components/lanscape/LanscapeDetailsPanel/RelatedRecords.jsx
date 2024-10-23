import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import Collapse from '@mui/material/Collapse';
import { setRelatedRecord } from '../../../actions';
import { Box } from '@mui/material';
import RelatedRecordActions from './RelatedRecordActions';
const AddRelatedRecord = React.lazy(() => import('../../record/AddRelatedRecord'));

const RelatedRecords = ({ module_id, question_id }) => {

    const dispatch = useDispatch();

    const { record_details, assign_related_record, record } = useSelector((state) => ({
        record_details: state.lanscape.record_details,
        assign_related_record: state.lanscape.assign_related_record,
        record: state.lanscape.record,
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

            {
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
                                _.map(record_details.relatedrecords, rec => {

                                    if (rec.relatedrecord.module_id == module_id && rec.record_id == record.id) {
                                        return (
                                            <tr key={rec.relatedrecord.id}>
                                                <td>
                                                    {`${rec.relatedrecord.name}`}
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    {`${rec.created_at}`}
                                                </td>
                                                <td>
                                                    <RelatedRecordActions name={`${rec.relatedrecord.name}`} module_id={module_id} record={record} />
                                                </td>
                                            </tr>
                                        );
                                    }

                                    if (rec.record.module_id == module_id && rec.record_id != record.id) {
                                        return (
                                            <tr key={rec.record.id}>
                                                <td>
                                                    {`${rec.record.name}`}
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    {`${rec.created_at}`}
                                                </td>
                                                <td>
                                                    <RelatedRecordActions name={`${rec.record.name}`} module_id={module_id} record={rec} />
                                                </td>
                                            </tr>
                                        );
                                    }
                                })
                            }

                            {
                                !assign_related_record?.open && <tr>
                                    <td colSpan={5}>
                                        <a onClick={handleAddRelatedRecord} className='chand'><AddIcon /> Add record</a>
                                    </td>
                                </tr>
                            }

                        </tbody>
                    </Table>
                </>
            }

            <Box sx={{ width: '40%' }}>
                <Collapse in={assign_related_record?.open}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AddRelatedRecord module_id={module_id} question_id={question_id} />
                    </Suspense>
                </Collapse>
            </Box>
        </>
    )
}

export default RelatedRecords;