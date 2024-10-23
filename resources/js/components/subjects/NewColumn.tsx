import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideRightSidebar, setActiveSubjectId, setAllProjectSubjects, setFieldTypeToAdd, setProjectRightView } from '../../actions';
import LoadingButton from '@mui/lab/LoadingButton';
import axiosInstance from '../../api/api';

const NewColumn = () => {

    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState(false);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const { field_types, field_type_to_add, profile, active_subject_id, subjects} = useSelector(state => ({
        field_types: state.projects.field_types,
        field_type_to_add: state.projects.field_type_to_add,
        active_subject_id: state.projects.active_subject_id,
        profile: state.projects.profile,
        subjects: state.projects.subjects
    }));

    const handleFieldTypeChange = (event) => {
        dispatch(setFieldTypeToAdd(_.find(field_types, (type) => type.id == event.target.value)));
        setTouched(true);
    }

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
        axiosInstance.post(`/api/user/subjects/add-column`,{
            subject_id: active_subject_id,
            field_type_id: field_type_to_add.id,
            field_model: field_type_to_add.field_model,
            component: field_type_to_add.component,
            project_id: profile.id,
            name: name,
            description: description
        })
            .then(e => {
                let the_subjects = JSON.parse(JSON.stringify(subjects));
                let index = _.findIndex(the_subjects, (sub) => {
                    return sub.id === active_subject_id;
                });
                the_subjects[index].columns = [...the_subjects[index].columns, e.data];
                dispatch(setAllProjectSubjects(the_subjects));
                setLoading(false);
                dispatch(setProjectRightView('task'));
                dispatch(setFieldTypeToAdd({}));
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
                <Typography sx={{ ml: '10px' }} variant='h5' gutterBottom>Create a column</Typography>
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
                 />
                  {displayInputError('name')}
               </div>
            </div>
            <div className='_drawer_box'>
                <TextField id="description" name="description" fullWidth multiline rows={5} label="Description" variant="outlined"
                onChange={handleDescription}
                className={handlerInputError('name')}
                />
            </div>
            <div className='_drawer_box'>
                <FormControl variant="standard" fullWidth>
                    <InputLabel id="field_type">Type <sup>*</sup></InputLabel>
                    <Select
                        required
                        labelId="field_type"
                        value={field_type_to_add.id}
                        label="Type"
                        onChange={handleFieldTypeChange}
                    >
                        {
                            _.map(field_types, field_type => (
                                <MenuItem key={field_type.id} value={field_type.id}>{field_type.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
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

export default NewColumn;