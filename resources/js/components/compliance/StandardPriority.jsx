import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Form } from "semantic-ui-react";
import axiosInstance from "../../api/api";
import { setCompStandards } from "../../actions";

const priorityOptions = [
    { key: 1, text: 'Low', value: '1' },
    { key: 2, text: 'Medium', value: '2' },
    { key: 3, text: 'High', value: '3' },
];

const StandardPriority = ({ current_priority, standard_id, changed }) => {

    const dispatch = useDispatch();

    const [priority, setPriority] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const { standards } = useSelector((state) => ({
        standards: state.compliance.standards,
    }));

    useEffect(() => {
        setPriority(current_priority);
    }, [current_priority]);

    const handlePriorityChange = (event, { value }) => {
        changed(value, standard_id);
        if (errors.length > 0 && errors[0].hasOwnProperty('priority')) {
            delete errors[0]['priority'];
            setErrors(errors);
        }
        setLoading(true);
        axiosInstance.post(`/api/user/compliance/change-priority`, {
            standard_id: standard_id,
            priority: value
        })
            .then(e => {
                setLoading(false);

                let index = _.findIndex(standards, std => {
                    return std.standard_id === standard_id;
                });

                let copy_standards = [...standards];
                copy_standards[index].priority = event.target.value;
                dispatch(setCompStandards(copy_standards));
            })
            .catch(err => {
                setLoading(false);
            });
    };

    return (
        <Form.Field>
            <Dropdown
                size="tiny"
                clearable
                options={priorityOptions}
                selection
                onChange={handlePriorityChange}
                value={priority}
                placeholder="Priority"
            />
        </Form.Field>
    );
}

export default StandardPriority;