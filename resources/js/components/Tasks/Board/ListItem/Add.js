    import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form, Input } from 'semantic-ui-react';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';

const AddListItem = ({type, added}) => {

    const [item, setItem] = useState('');

    const handleAddListItem = () => {
        added(item);
        setItem('');
    }

    const handleChange = event => {
        setItem(event.target.value);
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
                <Input action fluid placeholder='Add List Item' value={item} onChange={handleChange} >
                    {getButton()}
                    <input  />
                    <Button onClick={handleAddListItem} type='button'>Add</Button>
                </Input>
            </Form.Field>
        </div>
    );
}

export default AddListItem;
