import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { saveRecordDetails, setCompanyUsers, setRelatedRecord } from "../../actions";
import axiosInstance from "../../api/api";
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';

function idExists(array, targetProperty, targetId, question_id) {
    // Use Array.some() method to check if any object in the array has the targetId
    let target = array.find(item => {
        return item[targetProperty] === targetId ? item : undefined;
    });
    return target != undefined && target['question_id'] == question_id;
  }

const AddUsers = ({ question_id }) => {

    const dispatch = useDispatch();

    const [creating, setCreating] = useState(false);

    const [selected_users, setSelectedUsers] = useState([]);
    const [add_user, setAddUser] = useState(false);
    const [add_user_name, setAddUserName] = useState('');


    const { record_details, record, users } = useSelector((state) => ({
        record_details: state.lanscape.record_details,
        record: state.lanscape.record,
        users: state.orgs.company_users,
    }));

    const handleSubmit = () => {
        setCreating(true);
        axiosInstance.post(`/api/user/records/users/add`, {
            selected_users,
            add_user,
            add_user_name,
            module_id: record.module_id,
            parent: record.id,
            question_id
        })
            .then(e => {
                dispatch(saveRecordDetails({
                    ...record_details,
                    users: e.data.record_users,
                }));
                dispatch(setCompanyUsers(e.data.users));
                setSelectedUsers([]);
                handleClose();
            })
            .catch(err => {
            }).finally(() => setCreating(false));
    }

    const handleClose = () => {
        // The reason adding timeout here is because we want to wait if document is still saving the chagnes 
        // if the document waiting to save changes then it will take some time to update redux back again. 
        setTimeout(() => {
            dispatch(setRelatedRecord({
                open: false,
            }));
        }, 50);
    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <div className="create_record_input_group">
                {
                    !add_user && <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="add_user_name">Select User:</label>
                        <Select
                            id={`user`}
                            size="small"
                            multiple
                            value={selected_users}
                            onChange={(e) => setSelectedUsers(e.target.value)}
                            input={<OutlinedInput label="User" />}
                            renderValue={(selected) => selected.map(id => {
                                let userFound = users.find(us => us.user_id === id);
                                return `${userFound.user.first_name} ${userFound.user.last_name}`;
                            }).join(', ')}
                        >
                            {
                                _.map(users, us => {
                                    return (!idExists(record_details.users, 'user_id', us.user_id, question_id)) && (
                                        <MenuItem key={`user_${us.user_id}`} value={us.user_id}>
                                            <Checkbox checked={selected_users.indexOf(us.user_id) > -1} />
                                            <ListItemText primary={`${us.user.first_name} ${us.user.last_name}`} />
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>

                        {
                            _.size(selected_users) > 0 ? <p style={{ color: '#ccc' }}>
                                Click here to add new User
                            </p> : <Link className="chand" underline="none" onClick={() => setAddUser(true)}>
                                Click here to add new User
                            </Link>
                        }
                    </FormControl>
                }
                {
                    add_user && <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="add_user_name">User First & Last Name:</label>
                        <TextField
                            id=""
                            size="small"
                            label="Add New"
                            name="add_user_name"
                            value={add_user_name}
                            onChange={(e) => setAddUserName(e.target.value)}
                        />
                        <Link className="chand" underline="none" onClick={() => setAddUser(false)}>
                            Click here to select existing user
                        </Link>
                    </FormControl>
                }
            </div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', m: 1 }}>
                <Button disabled={creating} onClick={handleSubmit} variant="contained">Submit</Button>
                <Button sx={{ marginLeft: '10px' }} variant="outlined" onClick={handleClose}>Cancel</Button>
            </Box>
        </Box>
    )
}

export default AddUsers;