import React, { useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import axiosInstance from '../../../api/api';

const Radios = ({ list_items, type_id, handle_check, token }) => {

    const [selected_item, setSelectedItem] = React.useState('');

    useEffect(() => {
        let index = _.findIndex(list_items, function (item) { return item.answer == 1; });
        setSelectedItem(index);
    }, []);

    const handleCheck = (event) => {
        setSelectedItem(event.target.value);
        let listItems = [...list_items];
        const unchecked = [];
        let the_checked = 0;
        listItems = _.map(listItems, (i, ind) => {
            if (event.target.value != ind) {
                unchecked.push(i.id);
            }
            else {
                the_checked = i.id;
            }

            i.answer = 0;
            return i;
        });
        listItems[event.target.value].answer = 1;
        handle_check(listItems);
        handleChange(unchecked, the_checked);
    }

    const handleChange = (unchecked, the_checked) => {
        axiosInstance.post(`/api/user/tasks/save-list-item-answer-radio`, {
            the_checked: the_checked,
            unchecked: unchecked,
        }).then(e => {
        }).catch(err => {
            if (err.response.status === 404) {
                NotificationManager.error('Invalid Request.', 'Error');
            }
        });
    }


    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name={`checklist-${type_id}`}
                onChange={handleCheck}
                value={`${selected_item}`}
            >
                {
                    _.map(list_items, (item, index) => {
                        return (
                            <FormControlLabel key={`SELECTONE-${item.id}`} value={`${index}`} control={<Radio />} label={item.name} />
                        )
                    })
                }

            </RadioGroup>
        </FormControl>
    );
}

export default Radios;
