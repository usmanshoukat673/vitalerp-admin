import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from 'react-redux';
import { setTaskListTypes } from '../../../actions';
import { Form } from 'semantic-ui-react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AddListItem from './ListItem/Add';
import ListItems from './ListItem';
import './CreateList.scss';

const CreateList = ({ list_types, list, index, close, setTaskListTypes }) => {

    const [errors, setErrors] = useState([]);

    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const handleChange = event => {

        list_types[index].title = event.target.value;

        setTaskListTypes(list_types);

        clearErrors(event.target.name);
    }

    const clearErrors = (name) => {
        if (errors.length > 0 && errors[0].hasOwnProperty(name)) {
            delete errors[0][name];
            setErrors(errors);
        }
    }

    const handleListTypeChange = (event) => {

        list_types[index].type = event.target.value;

        setTaskListTypes(list_types);
    };


    const handleListItemAdded = (item) => {
        const listTypes = [...list_types];
        listTypes[index].items.push(item);
        setTaskListTypes(listTypes);
    }

    const handleListItemChanged = (item, i) => {
        const listTypes = [...list_types];
        listTypes[index].items[i] = item;
        setTaskListTypes(listTypes);
    }

    const handleListItemRemove = (i) => {
        const listTypes = [...list_types];
        listTypes[index].items.splice(i, 1);
        setTaskListTypes(listTypes);
    }

    return (
        <div className='__the_list_type'>
            <IconButton aria-label="Close" className="deleteButton" onClick={() => close(index)}>
                <CloseIcon />
            </IconButton>

            <Form.Field className="titleField">
                <label>List Name: <sup className='motion__required_field'>*</sup></label>
                <Form.Input
                    className={handlerInputError(errors, 'title')} placeholder="Task" onChange={handleChange} fluid type='text' name="title"

                    value={list.title} />
                {displayInputError(errors, 'title')}
            </Form.Field>

            <FormControl>
            <FormLabel>List Type: <sup className='motion__required_field'>*</sup></FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={list.type}
                    onChange={handleListTypeChange}
                >
                    <FormControlLabel value="checkbox" control={<Radio />} label="Checkbox List" />
                    <FormControlLabel value="radio" control={<Radio />} label="Radio List" />
                    <FormControlLabel value="fill_in_the_blank" control={<Radio />} label="Fill in the Blanks" />
                </RadioGroup>
            </FormControl>

            <div>
                <Form.Field>
                    <label>List Options: <sup className='motion__required_field'>*</sup></label>
                </Form.Field>

                {
                    _.size(list_types[index].items) > 0 && _.map(list_types[index].items, (item, i) => {
                        return <ListItems type={list.type} remove={handleListItemRemove} key={i} index={i} item={item} changed={handleListItemChanged} />
                    })
                }

                <AddListItem type={list.type} added={handleListItemAdded} />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
    list_types: state.tasks.list_types,
});

export default connect(mapStateToProps, { setTaskListTypes })(CreateList)
