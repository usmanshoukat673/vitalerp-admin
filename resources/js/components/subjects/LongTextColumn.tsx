import React from 'react';
import { Section, Bar } from "@column-resizer/react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextArea from './TextArea.tsx';
import ColumnOptions from './ColumnOptions.tsx';

const LongTextColumn = ({ subject, column, barClick, barStyle, barSize }) => {

    return (
        <>
            <Bar size={barSize} style={barStyle} onClick={barClick} />
            <Section className='sb__column'>
                <ColumnOptions column={column} subject={subject} />
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