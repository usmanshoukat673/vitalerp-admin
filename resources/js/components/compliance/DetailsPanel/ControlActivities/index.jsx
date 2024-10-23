import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import Alert from '@mui/material/Alert';
import showTZDate from '../../../../utils/showTZDate';
import { activityFrom } from '../../../../utils';

const ControlActivities = () => {

    const { control_activities, company } = useSelector((state) => ({
        control_activities: state.compliance.control_activities,
        company: state.orgs.company,
    }));

    return (
        <>
            {
                _.size(control_activities) > 0 ?
                    <>
                        <Table responsive className="table table-centered table-nowrap mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="border-0">Control</th>
                                    <th className="border-0">Activity</th>
                                    <th className="border-0">User</th>
                                    <th className="border-0">Date & Time</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    _.map(control_activities, act => {
                                        if (act.activity === 'Status') {
                                            return (
                                                <tr key={`control-activity-${act.id}`}>
                                                    <td>
                                                        {`${act.control?.name} ${act.control?.number}`}
                                                    </td>
                                                    <td>
                                                        {`Status changed to ${act.ctrl_status}`}
                                                    </td>
                                                    <td>
                                                        {`${act.user.first_name} ${act.user.last_name}`}
                                                    </td>
                                                    <td>
                                                        {showTZDate(act.created_at, company.timezone)}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        else if (act.activity === 'Applicability') {
                                            return (
                                                <tr key={`control-activity-${act.id}`}>
                                                    <td>
                                                        {`${act.control?.name} ${act.control?.number}`}
                                                    </td>
                                                    <td>
                                                        {`Applicability changed to ${act.ctrl_applicability}`}
                                                    </td>
                                                    <td>
                                                        {`${act.user.first_name} ${act.user.last_name}`}
                                                    </td>
                                                    <td>
                                                        {showTZDate(act.created_at, company.timezone)}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        else if (act.activity === 'Assign') {
                                            return (
                                                <tr key={`control-activity-${act.id}`}>
                                                    <td>
                                                        {`${act.control?.name} ${act.control?.number}`}
                                                    </td>
                                                    <td>
                                                        {`Document Assigned`}
                                                    </td>
                                                    <td>
                                                        {`${act.user.first_name} ${act.user.last_name}`}
                                                    </td>
                                                    <td>
                                                        {showTZDate(act.created_at, company.timezone)}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        else if (act.activity === 'Link') {
                                            return (
                                                <tr key={`control-activity-${act.id}`}>
                                                    <td>
                                                        {`${act.control?.name} ${act.control?.number}`}
                                                    </td>
                                                    <td>
                                                        {`Document Linked`}
                                                    </td>
                                                    <td>
                                                        {`${act.user.first_name} ${act.user.last_name}`}
                                                    </td>
                                                    <td>
                                                        {showTZDate(act.created_at, company.timezone)}
                                                    </td>
                                                </tr>
                                            )

                                        }
                                        else if (act.activity === 'Unlink') {
                                            return (
                                                <tr key={`control-activity-${act.id}`}>
                                                    <td>
                                                        {`${act.control?.name} ${act.control?.number}`}
                                                    </td>
                                                    <td>
                                                        {`Document Unlink`}
                                                    </td>
                                                    <td>
                                                        {`${act.user.first_name} ${act.user.last_name}`}
                                                    </td>
                                                    <td>
                                                        {showTZDate(act.created_at, company.timezone)}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        else if (act.activity === 'Created' && act.event_type === 'document') {
                                            return (
                                                <tr key={`control-activity-${act.id}`}>
                                                    <td>
                                                        {`${act.control?.name} ${act.control?.number}`}
                                                    </td>
                                                    <td>
                                                        {`Document Created`}
                                                    </td>
                                                    <td>
                                                        {`${act.user.first_name} ${act.user.last_name}`}
                                                    </td>
                                                    <td>
                                                        {showTZDate(act.created_at, company.timezone)}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        else if (act.activity === 'Renamed' && act.event_type === 'document') {
                                            return (
                                                <tr key={`control-activity-${act.id}`}>
                                                    <td>
                                                        {activityFrom(act)}
                                                    </td>
                                                    <td>
                                                        {`${act.document?.name} Renamed`}
                                                    </td>
                                                    <td>
                                                        {`${act.user.first_name} ${act.user.last_name}`}
                                                    </td>
                                                    <td>
                                                        {showTZDate(act.created_at, company.timezone)}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        else if (act.activity === 'Unlinked' && act.event_type === 'document') {
                                            return (
                                                <tr key={`control-activity-${act.id}`}>
                                                    <td>
                                                        {activityFrom(act)}
                                                    </td>
                                                    <td>
                                                        {`${act.document?.name} Unlinked`}
                                                    </td>
                                                    <td>
                                                        {`${act.user.first_name} ${act.user.last_name}`}
                                                    </td>
                                                    <td>
                                                        {showTZDate(act.created_at, company.timezone)}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })
                                }

                            </tbody>
                        </Table>
                    </>
                    : <Alert severity="info">Activities not found.</Alert>

            }

        </>
    )

}

export default ControlActivities;