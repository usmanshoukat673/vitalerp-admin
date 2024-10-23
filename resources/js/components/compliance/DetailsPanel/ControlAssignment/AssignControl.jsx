import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axiosInstance from "../../../../api/api";
import { NotificationManager } from "react-notifications";
import { setControlInfo } from "../../../../actions";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

/**
 * Renders a component for assigning users to a control.
 *
 * @return {JSX.Element} The rendered component.
 */
const AssignControl = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [user_ids, setUserIds] = useState([]);

    const { users, control_info, parent_domain } = useSelector((state) => ({
        users: state.orgs.company_users,
        control_info: state.compliance.control_info,
        parent_domain: state.compliance.parent_domain,
    }));

    useEffect(() => {
        setUserIds(control_info.assigned_users ? control_info.assigned_users : []);
    }, [control_info]);

    const displayErrorMessage = (fieldName) => {
        const error = errors.find(error => error.hasOwnProperty(fieldName));
        return error ? <p className="form-error-message">{error[fieldName]}</p> : '';
    }

    const handleChange = (event) => {
        setErrors([]);
        setUserIds(event.target.value);
    }

    const handleSubmit = () => {
        setLoading(true);
        axiosInstance.post(`/api/user/compliance/assign-control`, {
            domain_id: parent_domain.id,
            subdomain_id: control_info.control.section_id,
            control_id: control_info.control.control_id,
            user_ids,
        }).then(e => {
            setLoading(false);
            setErrors([]);
            let copy_control_info = {...control_info};
            copy_control_info.assigned_users = e.data.assigned_users;
            dispatch(setControlInfo(copy_control_info));
            NotificationManager.success(e.data.message, 'Success');
        }).catch(err => {
            if (err.response.status === 422) {
                setErrors([err.response.data.errors]);
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    const determineCanAssign = () => {
        return !_.size(control_info.deligated_users) > 0;
    }

    return (
        <>
            <div style={{ padding: '0px 0px' }}>
                <FormControl sx={{ m: 1, minWidth: 350 }} size="small" disabled={!determineCanAssign()}>
                    <FormLabel>Assign User(s)</FormLabel>
                    <Select
                        multiple
                        id="control_assignment_dropdown"
                        value={user_ids}
                        renderValue={(selected) => selected.map(id => {
                            let selectedUSer = users.find(u => u.user.id === id);
                            return `${selectedUSer.user.first_name} ${selectedUSer.user.last_name}`;
                        }).join(', ')}
                        onChange={handleChange}
                        MenuProps={MenuProps}
                        disabled={!determineCanAssign()}
                    >
                        {
                            _.map(users, user =>
                                <MenuItem key={user.id} value={user.user.id}>{ }
                                    <Checkbox checked={user_ids.indexOf(user.user.id) > -1} />
                                    <ListItemText primary={`${user.user.first_name} ${user.user.last_name}`} />
                                </MenuItem>)
                        }
                    </Select>
                    {displayErrorMessage('user_ids')}
                </FormControl>


                <Stack spacing={2} direction="row" sx={{ml: '9px'}}>
                    <Button disabled={!determineCanAssign()} onClick={handleSubmit} variant="outlined">Submit</Button>
                </Stack>
            </div>
        </>
    )
}

export default AssignControl;