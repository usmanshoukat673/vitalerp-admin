import React from 'react';
import { Section, Bar } from "@column-resizer/react";
import TextField from './TextField.tsx';
import ColumnOptions from './ColumnOptions.tsx';

const TextColumn = ({ barClick, column, barStyle, barSize, subject }) => {

    return (
        <>
            <Bar size={barSize} style={barStyle} onClick={barClick} />
            <Section className='sb__column'>

                <ColumnOptions column={column} subject={subject} />

                {
                    _.map(column.fields, field => (
                        <TextField key={field.id} field={field} />
                    ))
                }
            </Section>
        </>
    );
}

export default TextColumn;