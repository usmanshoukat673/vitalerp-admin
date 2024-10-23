import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Attachment from './Attachment';

const FilesContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const UploadedAttachments = ({ attachments }) => {
    return (
        <Grid item xs={12} md={6}>

            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Attachments:
            </Typography>
            <FilesContainer>
                <List dense={true}>
                    {
                        _.map(attachments, (file, index) => (
                            <Attachment key={index} file={file} />
                        ))
                    }
                </List>
            </FilesContainer>
        </Grid>
    )
}

export default UploadedAttachments;