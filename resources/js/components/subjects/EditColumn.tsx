import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideRightSidebar, setActiveSubjectId, setAllProjectSubjects, setFieldTypeToAdd, setProjectRightView, setColumnToEdit } from '../../actions';
import LoadingButton from '@mui/lab/LoadingButton';
import axiosInstance from '../../api/api';

const EditColumn = () => {

    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState(false);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const { column_to_edit, token, subjects } = useSelector(state => ({
        column_to_edit: state.projects.column_to_edit,
        token: state.token.activeToken,
        subjects: state.projects.subjects
    }));

    useEffect(() => {
        if(!_.isEmpty(column_to_edit))
        {
            setName(column_to_edit.name);
            setDescription((column_to_edit.description == null) ? '' : column_to_edit.description);
        }
    }, [column_to_edit]);

    const cancel = () => {
        dispatch(setProjectRightView('task'));
        dispatch(setFieldTypeToAdd({}));
    }

    const handleNameChange = event => {
        setName(event.target.value);
        setTouched(true);
        clearError(event.target.name);
    };

    const handleDescription = event => {
        setDescription(event.target.value);
        setTouched(true);
        clearError(event.target.name);
    };

    const clearError = (error_field) => {
        if (errors.length > 0 && errors[0].hasOwnProperty(error_field)) {
            delete errors[0][error_field];
            setErrors(errors);
        }
    }

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'create__input error' : 'create__input';
    };

    const handleSubmit = () => {
        setLoading(true);
        axiosInstance.post(`/api/user/subjects/update-column`,{
            id: column_to_edit.id,
            name: name,
            description: description
        })
            .then(e => {
                let the_subjects = JSON.parse(JSON.stringify(subjects));
                let index = _.findIndex(the_subjects, (sub) => {
                    return sub.id === column_to_edit.subject_id;
                });
                let cIndex = _.findIndex(the_subjects[index].columns, (col) => {
                    return col.id === column_to_edit.id;
                });
                the_subjects[index].columns[cIndex] = {...the_subjects[index].columns[cIndex], name: e.data.name, description: e.data.description};
                dispatch(setAllProjectSubjects(the_subjects));
                setLoading(false);
                dispatch(setProjectRightView('task'));
                dispatch(setColumnToEdit({}));
                dispatch(setActiveSubjectId(null));
                dispatch(hideRightSidebar());
            })
            .catch(err => {
                setLoading(false);
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            });
    }
 
    return (
        <>
            <div className='_drawer_box'>
                <Typography sx={{ ml: '10px' }} variant='h5' gutterBottom>Edit a column</Typography>
            </div>
            <div className='_drawer_box'>
               <div style={{width: '100%'}}>
               <TextField
                id="name" 
                name="name" 
                fullWidth 
                label="Name" 
                required 
                variant="outlined"
                onChange={handleNameChange}
                className={handlerInputError('name')}
                value={name}
                 />
                  {displayInputError('name')}
               </div>
            </div>
            <div className='_drawer_box'>
                <TextField id="description" name="description" fullWidth multiline rows={5} label="Description" value={description} variant="outlined"
                onChange={handleDescription}
                className={handlerInputError('name')}
                />
            </div>
             
            <div className='_drawer_box'>
                <div>
                    <LoadingButton disabled={!touched} loading={loading} onClick={handleSubmit} color='secondary' variant="contained" >Save</LoadingButton>
                    <Button sx={{ ml: '10px' }} variant="outlined" color="primary"  onClick={cancel}>Cancel</Button>
                </div>
            </div>
        </>
    )
}

export default EditColumn;