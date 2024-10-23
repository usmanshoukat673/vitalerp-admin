// @flow
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// images
import avatar1 from '../../../../images/users/avatar-6.jpg';
import avatar2 from '../../../../images/users/avatar-7.jpg';
import avatar3 from '../../../../images/users/avatar-8.jpg';
import avatar4 from '../../../../images/users/avatar-4.jpg';
import avatar5 from '../../../../images/users/avatar-5.jpg';
import avatar6 from '../../../../images/users/avatar-3.jpg';

const TeamMembers = ({assign_to}) => {
    return (
        <>
            <h5>Team Members:</h5>

           {
                _.map(assign_to, user => (
                    <OverlayTrigger key={user.id} placement="top" overlay={<Tooltip>`${user.user.first_name} ${user.user.last_name}`</Tooltip>}>
                            <Link to="#" className="d-inline-block me-1">
                                <img src={avatar1} className="rounded-circle img-thumbnail avatar-sm" alt="friend" />
                            </Link>
                    </OverlayTrigger>
                ))
           }
        </>
    );
};

export default TeamMembers;
