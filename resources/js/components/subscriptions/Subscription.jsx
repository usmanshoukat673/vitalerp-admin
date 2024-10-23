import { Button } from '@mui/material';
import React from 'react';

const Subscription = ({name}) => {
    return (
        <div className="activity__bucket">
            <div className="at__bucket__header">{name}</div>
            <div className="at__bucket__body">
                <Button variant='outlined'>Modify</Button>
                &nbsp;&nbsp;
                <Button variant='outlined'>Cancel</Button>
            </div>
        </div>
    );
}

export default Subscription;