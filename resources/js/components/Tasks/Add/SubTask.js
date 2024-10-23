import React, { useState } from 'react';
import { Button, Modal, Dropdown, Form } from 'semantic-ui-react';
import CloseIcon from '@mui/icons-material/Close';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { NotificationManager } from 'react-notifications';
import formatDate from "../../../utils/formatDate";
import getFormatedDate from '../../../utils/getFormatedDate';

import './SubTask.scss';

const SubTask = ({ open, close, users, added, priorityOptions }) => {

    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [assign_to, setAssignTo] = useState([]);
    const [priority, setPriority] = useState('1');
    const [due_date, setDueDate] = useState(new Date());

    const userOptions = _.map(users, (us, index) => ({
        key: us.user.id,
        text: `${us.user.first_name} ${us.user.last_name}`,
        value: us.user.id,
    }));

    const handleChange = event => {
        // this.setState({ [event.target.name]: event.target.value });
        // this.setState({ touched: true });
        // const { errors } = this.state;

        // if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
        //     delete errors[0][event.target.name];
        //     this.setState({ errors: errors });
        // }
    }

    const handleTitleChange = event => {
        setTitle(event.target.value);
    }

    const handleUserChange = (event, { value }) => {

        setAssignTo(value);

        // if (errors.length > 0 && errors[0].hasOwnProperty(assign_to)) {
        //     delete errors[0][assign_to];
        //     this.setState({ errors: errors });
        // }
    }

    const isValidDate = (dateString) => {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false;  // Invalid format
        var d = new Date(dateString);
        var dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0, 10) === dateString;
    }

    const handleDuDateTimeChange = (date) => {

        if (due_date instanceof Date && !isNaN(date) && isValidDate(formatDate(date))) {
            setDueDate(date);
        }


        // const { errors } = this.state;
        // if (errors.length > 0 && errors[0].hasOwnProperty(due_date)) {
        //     delete errors[0][due_date];
        //     this.setState({ errors: errors });
        // }
    };


    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const handlePriorityChange = (event, { value }) => {
        setPriority(value);
    };

    const handleSubSubmit = () => {

        if (title == '') {
            NotificationManager.error('Input Error, Title Field is required.', 'Error');
        }
        else if (_.size(assign_to) < 1) {
            NotificationManager.error('Input Error, Please assign users to the task.', 'Error');
        }
        else if (priority == '') {
            NotificationManager.error('Input Error, Priority field is required.', 'Error');
        }
        else if (due_date == '') {
            NotificationManager.error('Input Error, Due Date field is required.', 'Error');
        }
        else {
            added({
                title: title,
                assign_to: assign_to,
                priority: priority,
                due_date: getFormatedDate(due_date),
            });

            setTitle('');
            setAssignTo([])
        }
    }

    return (
        <Modal
            className="semtic__modal sectonowner__modal"
            onClose={() => { }}
            open={open}
            size="small"
        >
            <Modal.Content className="sectonowner_modal_container">
                <div className="sss__header">
                    <div className="__ss__number">
                        Add Sub Task
                    </div>
                    <div className="__ss__close">
                        <CloseIcon onClick={close} />
                    </div>
                </div>

                <div className="__ss__main__section">

                    <Form>

                        <Form.Field>
                            <label>Title <sup className='motion__required_field'>*</sup></label>
                            <Form.Input className={handlerInputError('title')} placeholder="Task" onChange={handleTitleChange} fluid type='text' name="title" value={title} />
                            {displayInputError('title')}
                        </Form.Field>

                        <Form.Field>
                            <label>Assign To <sup className='motion__required_field'>*</sup></label>
                            <Dropdown
                                clearable
                                options={userOptions}
                                selection
                                onChange={handleUserChange}
                                value={assign_to}
                                placeholder="Select User"
                                multiple
                            />
                            {displayInputError('assign_to')}
                        </Form.Field>

                        <Form.Group>
                            <Form.Field width={8}>
                                <label>Priority <sup className='motion__required_field'>*</sup></label>
                                <Dropdown
                                    clearable
                                    options={priorityOptions}
                                    selection
                                    onChange={handlePriorityChange}
                                    value={priority}
                                    placeholder="Select"
                                />
                                {displayInputError(errors, 'priority')}
                            </Form.Field>
                            <Form.Field width={8}>
                                <label>Due Date <sup className='motion__required_field'>*</sup></label>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="mm/dd/yyyy"
                                        value={due_date}
                                        onChange={handleDuDateTimeChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                {displayInputError('due_date')}
                            </Form.Field>
                        </Form.Group>


                        <Form.Group>
                            <Form.Field>
                                <Button type='button' onClick={handleSubSubmit} className='btn btn-success btn-md mt-2'>Submit</Button>
                            </Form.Field>

                        </Form.Group>
                    </Form>

                </div>

            </Modal.Content>

        </Modal>
    );
}

export default SubTask;
