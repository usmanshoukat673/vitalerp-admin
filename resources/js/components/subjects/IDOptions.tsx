import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../api/api';
import { setActiveSubjectId } from '../../actions';

const ITEM_HEIGHT = 48;

const IDOptions = ({ row_id, subject }) => {

    const [errors, setErrors] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const dispatch = useDispatch();

    const { token } = useSelector(state => ({
        token: state.token.activeToken,
    }));

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteRow = () => {

        dispatch(setActiveSubjectId(subject.id));
        
        axiosInstance.post(`/api/user/subjects/remove-row`, {
            subject_id: subject.id,
            row_id: row_id
        })
            .then(e => {

                // remove row 
                // remove row field fomr each column 

                // let the_subjects = JSON.parse(JSON.stringify(subjects));
                // let index = _.findIndex(the_subjects, (sub) => {
                //     return sub.id === active_subject_id;
                // });
                // the_subjects[index].columns = [...the_subjects[index].columns, e.data];
                // dispatch(setAllProjectSubjects(the_subjects));
                // setLoading(false);
                // dispatch(setProjectRightView('task'));
                // dispatch(setFieldTypeToAdd({}));
                // dispatch(setActiveSubjectId(null));
                // dispatch(hideRightSidebar());
            })
            .catch(err => {
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            });
    }

    return (
        <>
            <IconButton
                aria-label="more"
                id="id-options"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={handleDeleteRow}>
                    Remove
                </MenuItem>
            </Menu>
        </>
    )
}

export default IDOptions;