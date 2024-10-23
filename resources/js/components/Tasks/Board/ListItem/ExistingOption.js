import React, { useState } from 'react';
import { Form, Input } from 'semantic-ui-react';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'

const ExistingOption = ({ type, item, index, handle_blur, remove }) => {

    const [option_name, setOptionName] = useState((item.name == null ? '' : item.name));

    const handleChange = (e) => {
        setOptionName(e.target.value);
    }

    const handleBlur = () => {
        handle_blur(index, option_name);
    }

    const getButton = () => {
        if (type === 'checkbox') {
            return <Checkbox label="Checkbox" />;
        }
        else if (type === 'radio') {
            return <Radio label="Radio" />
        }
        else {
            return '';
        }
    }

    return (
        <Form.Field>
            <Input action fluid placeholder='List Item' onBlur={handleBlur} onChange={handleChange} value={option_name} >
                {getButton()}
                <input />
                <IconButton onClick={() => remove(index)} aria-label="delete" >
                    <DeleteIcon />
                </IconButton>
            </Input>
        </Form.Field>


    )
}

export default ExistingOption