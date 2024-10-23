import React from 'react';
import { Section, Bar } from "@column-resizer/react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextArea from './TextArea.tsx';

const LongTextColumn = ({ title, column, barSize }) => {

    return (
        <>
            <Bar size={barSize} style={barStyle} onClick={} />
            <Section className='sb__column'>
                <div className='sb__column_heading'>{title} <KeyboardArrowDownIcon /></div>
                {
                    _.map(column.fields, field => (
                        <TextArea key={field.id} field={field} />
                    ))
                }
            </Section>
        </>
    );
}

export default LongTextColumn;