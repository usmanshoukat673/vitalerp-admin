import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import Alert from '@mui/material/Alert';
import showTZDate from '../../../../utils/showTZDate';
import { activityFrom } from '../../../../utils';

const DomainActivities = () => {
  const { domainActivities, company } = useSelector((state) => ({
    domainActivities: state.compliance.domain_activities,
    company: state.orgs.company,
  }));

  const renderActivity = (act) => {
    if (!act) {
      return null;
    }

    const { control, activity, user, createdAt } = act;
    const { name = '', number = '' } = control || {};
    const { firstName = '', lastName = '' } = user || {};

    let activityMessage = 'Unknown Activity';
    if (activity) {
      activityMessage = {
        Status: `Status changed to ${activity.ctrlStatus}`,
        Applicability: `Applicability changed to ${activity.ctrlApplicability}`,
        Assign: 'Document Assigned',
        Link: 'Document Linked',
        Unlink: 'Document Unlink',
        Created: 'Document Created',
        Renamed: `${activity.documentName} Renamed`,
        Unlinked: `${activity.documentName} Unlinked`,
      }[activity];
    }

    return (
      <tr key={act?.id}>
        <td>{`${name} ${number}`}</td>
        <td>{activityMessage}</td>
        <td>{`${firstName} ${lastName}`}</td>
        <td>{showTZDate(createdAt, company?.timezone)}</td>
      </tr>
    );
  };

  return (
    <>
      {domainActivities.length > 0 ? (
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
            {domainActivities.map(renderActivity)}
          </tbody>
        </Table>
      ) : (
        <Alert severity="info">Activities not found.</Alert>
      )}
    </>
  );
};

export default DomainActivities;