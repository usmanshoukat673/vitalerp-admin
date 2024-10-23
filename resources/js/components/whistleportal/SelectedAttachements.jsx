import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Typography from '@mui/material/Typography';

const FilesContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const SelectedAttachements = ({ attachments, remove }) => {
    return (
        <Grid item xs={12} md={6}>

            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Attachments:
            </Typography>
            <FilesContainer>
                <List dense={true}>
                    {
                        _.map(attachments, (file, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <IconButton onClick={() => remove(file)} edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <AttachFileIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${file.name}`}
                                />
                            </ListItem>
                        ))
                    }
                </List>
            </FilesContainer>
        </Grid>
    )
}

export default SelectedAttachements;