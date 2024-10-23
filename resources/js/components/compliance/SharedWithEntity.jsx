import React, { useEffect, useState } from "react";
import { Dropdown } from 'semantic-ui-react'
import Typography from '@mui/material/Typography';
import axiosInstance from "../../api/api";
import { NotificationManager } from "react-notifications";
import Button from '@mui/material/Button';
import { Form } from 'semantic-ui-react'
import { Divider } from "@mui/material";
import _ from "lodash";
import CurentlyShared from "./CurentlyShared";

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


const SharedWithEntity = ({ standard }) => {

    const [all_users, setAllUsers] = useState([]);
    const [shared_with, setSharedWith] = useState([]);
    const [errors, setErrors] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    const [options, setOptions] = useState([]);

    useEffect(() => {
        axiosInstance.get(`/api/user/compliance/policy-portal/shared/${standard.standard.id}`).then(e => {
            setAllUsers(e.data.all_users);
            setSharedWith(e.data.currently_shared);
        }).catch(err => {

        });
    }, []);

    useEffect(() => {
        setOptions(_.map(all_users, (user, index) => ({
            key: user.user.id,
            text: `${user.user.email}`,
            value: user.user.id,
        })));
    }, [all_users]);

    const handleAddition = (e, { value }) => {
        if (isValidEmail(value)) {
            axiosInstance.post(`/api/user/compliance/policy-portal/add_portal_user`, {
                email: value,
                standard_id: standard.standard.id
            }).then(e => {
                setOptions([{ text: e.data.email, value: e.data.id, key: e.data.id }, ...options]);
                setSelectedItems([...selectedItems, e.data.id]);
            }).catch(err => {
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            });
        }
        else {
            NotificationManager.error("Invalid email address", "Email");
        }
    }

    const handleChange = (e, { value }) => {
        setSelectedItems(value);
        clearErrors('email');
    };

    const clearErrors = (field) => {
        if (errors.length > 0 && errors[0].hasOwnProperty(field)) {
            delete errors[0][field];
            setErrors(errors);
        }
    }

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const submit = () => {
        if (_.size(selectedItems) > 0) {
            axiosInstance.post(`/api/user/compliance/policy-portal/share`, {
                users: selectedItems,
                standard_id: standard.standard.id
            }).then(e => {
                setSelectedItems([]);
                setSharedWith(e.data);
                NotificationManager.success(`${standard.standard.name} has been successfully shared.`, "Shared");
            }).catch(err => {
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            });
        }
    }

    return (
        <>
            <Form>
                <Form.Field>
                    <Typography variant="overline" display="block">
                        Share With Internal/External User:
                    </Typography>
                    <Dropdown
                        options={options}
                        placeholder='-Choose or type email address-'
                        search
                        selection
                        fluid
                        multiple
                        allowAdditions
                        additionLabel={<i style={{ color: 'green' }}>Shared with New Email/User: </i>}
                        value={selectedItems}
                        onAddItem={handleAddition}
                        onChange={handleChange}
                    />
                    {displayInputError('email')}
                </Form.Field>

                <Form.Field>
                    <Button variant="contained" disabled={_.size(selectedItems) === 0} onClick={submit}>Share</Button>
                </Form.Field>

                <Divider />

                <CurentlyShared shared_with={shared_with}  />
            </Form>
        </>
    )
}

export default SharedWithEntity