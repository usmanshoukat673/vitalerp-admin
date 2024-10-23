// @flow
import React, {useState} from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import EditListOptions from './ListItem/EditListOptions';
import AddWhileModifying from './ListItem/AddWhileModifying';
import { Form } from 'semantic-ui-react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const EditListType = ({ listtype, index, handle_change, handle_deleted }) => {

    const [errors, setErrors] = useState([]);

    const handleCheck = (listItems) => {
        const listType = { ...listtype };
        listType.list_items = listItems;
        handle_change(index, listType)
    }

    const handleListItemAdded = (item) => {
        const listType = { ...listtype };
        listType.list_items.push(item);
        handle_change(index, listType);
    }


    // related to the edit list 
    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const handleChange = event => {

        const listType = { ...listtype };

        listType.title = event.target.value;

        handle_change(index, listType)

        clearErrors(event.target.name);
    }

    const clearErrors = (name) => {
        if (errors.length > 0 && errors[0].hasOwnProperty(name)) {
            delete errors[0][name];
            setErrors(errors);
        }
    }

    const handleListTypeChange = (event) => {

        const listType = { ...listtype };
        listType.type = event.target.value;
        handle_change(index, listType)
    };

    return (
        <Card>
            <Card.Body>

                <Form.Field className="titleField">
                    <label>List Name: <sup className='motion__required_field'>*</sup></label>
                    <Form.Input
                        className={handlerInputError(errors, 'title')} placeholder="Name" onChange={handleChange} fluid type='text' name="title"

                        value={listtype.name} />
                    {displayInputError(errors, 'title')}
                </Form.Field>

                <FormControl>
                    <FormLabel>List Type: <sup className='motion__required_field'>*</sup></FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={listtype.type}
                        onChange={handleListTypeChange}
                    >
                        <FormControlLabel value="checkbox" control={<Radio />} label="Checkbox List" />
                        <FormControlLabel value="radio" control={<Radio />} label="Radio List" />
                        <FormControlLabel value="fill_in_the_blank" control={<Radio />} label="Fill in the Blanks" />
                    </RadioGroup>
                </FormControl>

                <EditListOptions handle_check={handleCheck} type={listtype.type} list_items={listtype.list_items} handle_deleted={handle_deleted} />

                <AddWhileModifying type={listtype.type} added={handleListItemAdded} />
                
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
});

export default connect(mapStateToProps)(EditListType)
