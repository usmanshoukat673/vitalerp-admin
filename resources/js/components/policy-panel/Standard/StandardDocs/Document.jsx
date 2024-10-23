import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import FileColoredIcon from './FileColoredIcon';
import Typography from '@mui/material/Typography';

export default function Document({ document, open }) {

    const openDocument = () => open(document);

    return (
        <Card sx={{ maxWidth: 259 }}>
            <CardContent>
                <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                    Shared document
                </Typography>
            </CardContent>
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px' }}>
                <img onClick={openDocument} style={{ height: '35px', cursor: 'pointer' }} src={`/images/icons/${document.document.ext}.png`} />
            </CardContent>
            <CardHeader
                onClick={openDocument}
                sx={{cursor: 'pointer'}}
                avatar={
                    <FileColoredIcon document={document.document} />
                }
                title={`${document.document.name}`}
            />
        </Card>
    );
}