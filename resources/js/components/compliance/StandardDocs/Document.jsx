import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Moment from 'react-moment';
import CardContent from '@mui/material/CardContent';
import DescriptionIcon from '@mui/icons-material/Description';
import FileColoredIcon from './FileColoredIcon';

export default function Document({ document }) {

    return (
        <Card sx={{ maxWidth: 259 }}>
            <CardHeader
                avatar={
                    <DescriptionIcon />
                }
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                title={`${document.document.owner.first_name} uploaded`}
                subheader={<Moment fromNow>{document.created_at}</Moment>}
            />
            <CardContent sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img style={{height: '80px'}} src={`/images/icons/${document.document.ext}.png`} />
            </CardContent>
            <CardHeader
                avatar={
                    <FileColoredIcon document={document.document} />
                }
                title={`${document.document.name}`}
            />
        </Card>
    );
}