import React, { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Collapse from '@mui/material/Collapse';
import { setRelatedRecord } from '../../../actions';
const AddUsers = React.lazy(() => import('../../record/AddUsers'));
const AddTeams = React.lazy(() => import('../../record/AddTeams'));

const RecordUsers = ({ question_id }) => {

    const dispatch = useDispatch();

    const { record_details, assign_related_record, record } = useSelector((state) => ({
        record_details: state.lanscape.record_details,
        assign_related_record: state.lanscape.assign_related_record,
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
                        _.map(record_details.users, user => {
                            return user.question_id == question_id && (
                                <tr key={user.user.id}>
                                    <td>
                                        {`${user.user.first_name} ${user.user.last_name}`}
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        {`${user.created_at}`}
                                    </td>
                                    <td></td>
                                </tr>
                            );
                        })
                    }

                    {
                        _.map(record_details.teams, team => {
                            return team.question_id == question_id && (
                                <tr key={team.team.id}>
                                    <td>
                                        {`${team.team.name}`}
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        {`${team.created_at}`}
                                    </td>
                                    <td></td>
                                </tr>
                            );
                        })
                    }

                    {
                        (!assign_related_record?.open || assign_related_record?.type == undefined) && <tr>
                            <td colSpan={5}>
                                <a onClick={() => handleAddRelatedRecord('user')} className='chand'><AddIcon /> Add user {''}</a>
                                &nbsp;&nbsp;&nbsp;
                                <a onClick={() => handleAddRelatedRecord('team')} className='chand'><AddIcon /> Add team</a>
                            </td>
                        </tr>
                    }
                </tbody>
            </Table>

            <Box sx={{ width: '40%' }}>
                <Collapse in={assign_related_record?.open && assign_related_record?.type == 'user'}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AddUsers question_id={question_id} />
                    </Suspense>
                </Collapse>
            </Box>

            <Box sx={{ width: '40%' }}>
                <Collapse in={assign_related_record?.open && assign_related_record?.type == 'team'}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AddTeams question_id={question_id} />
                    </Suspense>
                </Collapse>
            </Box>
        </>
    )
}

export default RecordUsers;