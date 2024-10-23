import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'semantic-ui-react';
import CloseIcon from '@mui/icons-material/Close';
import { NotificationManager } from 'react-notifications';

import { Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSubTasks } from '../../../actions';
import axiosInstance from '../../../api/api';

const RenameColumn = ({ column, open, close, token, columnRenamed }) => {

    const [column_state, setTaskState] = useState({
        errors: [],
        loading: false,
        column_title: column.custom_name ? column.custom_name : column.default_name,
    });

    const handleChange = event => {

        setTaskState(
            {
                ...column_state,
                [event.target.name]: event.target.value,
                touched: true
            }
        );

        clearErrors(event.target.name);
    }

    const clearErrors = (name) => {
        const { errors } = column_state;

        if (errors.length > 0 && errors[0].hasOwnProperty(name)) {
            delete errors[0][name];
            setTaskState(
                {
                    ...column_state,
                    errors: errors
                }
            );
        }
    }

    const handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    const displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }



    const handleSubmit = () => {

        setTaskState(
            {
                ...column_state,
                errors: [],
                loading: true
            }
        );

        const { column_title } = column_state;

        axiosInstance.post('/api/user/kanban/rename-column', {
            name: column_title,
            id: column.id
        })
            .then(e => {

                setTaskState(
                    {
                        ...column_state,
                        finishing: false,
                        touched: false,
                        errors: []
                    }
                );

                NotificationManager.success('Column name has been updated successfully!', 'Success');
                columnRenamed(e);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    setTaskState(
                        {
                            ...column_state,
                            finishing: false,
                            touched: false,
                            errors: []
                        }
                    );
                }
                if (err.response.status === 422) {
                    setTaskState(
                        {
                            ...column_state,
                            finishing: false,
                            touched: false,
                            errors: column_state.errors.concat(err.response.data.errors)
                        }
                    );
                }
            });
    }



    return (
        <Modal
            className="semtic__modal cccc__modal"
            open={open}
            onClose={close}
            size="tiny"
            centered={true}
        >

            <Modal.Content className="cc_modal_container">
                <div className="cccc__header">
                    <div className="__c__number">
                        Rename
                    </div>
                    <div className="__c__close">
                        <CloseIcon onClick={close} />
                    </div>
                </div>

                <div>
                    <Form>

                        <Form.Field>
                            <label>Column Name <sup className='motion__required_field'>*</sup></label>
                            <Form.Input className={handlerInputError(column_state.errors, 'name')} placeholder="Column Name" onChange={handleChange} fluid type='text' name="column_title" value={column_state.column_title} />
                            {displayInputError(column_state.errors, 'name')}
                        </Form.Field>


                        <Form.Group>

                            <Form.Field>
                                <Button type='button' onClick={handleSubmit} className='btn btn-success btn-md mt-2'>Submit</Button>
                            </Form.Field>

                        </Form.Group>
                    </Form>
                </div>
            </Modal.Content>

        </Modal>

    );
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
});

export default withRouter(connect(mapStateToProps, { setSubTasks })(RenameColumn));
