import React from 'react';
import { Section, Bar } from "@column-resizer/react";
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IDOptions from './IDOptions.tsx';

const IDColumn = ({ title, rows, add_row, barClick, barStyle, barSize, subject }) => {

    return (
        <>
            <Bar size={barSize} style={barStyle} onClick={barClick} />
            <Section className='sb__column' >
                <div className='sb__column_heading'><HttpsOutlinedIcon /> {title} </div>
                {
                    _.map(rows, row => (
                        <div key={row.id} className='sb__id_column_record'>
                            {`#${row.id}`}
                            <IDOptions row_id={row.id} subject={subject} />
                        </div>
                    ))
                }
                <div>
                    <Button onClick={add_row} startIcon={<AddIcon />}> Add New item</Button>
                </div>
            </Section>
        </>
    );
}

export default IDColumn;