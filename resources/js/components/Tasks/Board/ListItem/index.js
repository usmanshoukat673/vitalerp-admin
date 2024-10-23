import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form, Input } from 'semantic-ui-react';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';

const ListItems = ({ type, item, index, changed, remove }) => {

    const handleChange = event => {
        changed(event.target.value, index);
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
        <div className='mt-3'>
            <Form.Field>
                <Input fluid placeholder='Add List Item' value={item} onChange={handleChange} >
                    {
                        getButton()
                    }
                    <input />
                    <IconButton onClick={() => remove(index)} aria-label="delete" >
                        <DeleteIcon />
                    </IconButton>
                </Input>
            </Form.Field>
        </div>
    );
}

export default ListItems;
