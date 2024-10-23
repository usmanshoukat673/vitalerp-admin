import React, { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../api/api";
import { selectStandard, setCompStandards } from "../../../actions";

const BaselinePriority = () => {

    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [priority, setPriority] = useState('High');

    const { standard, standards } = useSelector((state) => ({
        standard: state.leftnav.standard,
        standards: state.compliance.standards,
    }));

    useEffect(() => {
        if (!_.isEmpty(standard)) {
            setPriority(standard.priority);
        }
    }, [standard]);

    const handleChange = (event) => {
        setPriority(event.target.value);

        axiosInstance.post(`/api/user/compliance/change-priority`, {
            standard_id: standard.standard_id,
            priority: event.target.value
        })
            .then(e => {
                let copy_standard = { ...standard };
                copy_standard.priority = event.target.value;
                dispatch(selectStandard(copy_standard));

                let index = _.findIndex(standards, std => {
                    return std.standard_id === standard.standard_id;
                });

                let copy_standards = [...standards];
                copy_standards[index].priority = event.target.value;
                dispatch(setCompStandards(copy_standards));
            })
            .catch(err => {

            });
    }

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                    id="control_status_dropdown"
                    value={priority}
                    onChange={handleChange}
                >
                    <MenuItem value={`1`}>Low</MenuItem>
                    <MenuItem value={`2`}>Medium</MenuItem>
                    <MenuItem value={`3`}>High</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default BaselinePriority;