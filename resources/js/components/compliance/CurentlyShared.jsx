import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SharedWithUser from './SharedWithUser';

const UsersContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const CurentlyShared = ({ shared_with }) => {
    return (
        <>
            <Typography variant="overline" display="block">
                Currently Shared:
            </Typography>
            <UsersContainer>
                <List dense={true}>
                    {
                        _.map(shared_with, (user, index) => (
                            <SharedWithUser key={index} user={user.user} />
                        ))
                    }
                </List>
            </UsersContainer>
        </>
    )
}

export default CurentlyShared;