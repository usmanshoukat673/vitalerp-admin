import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { NotificationManager } from 'react-notifications';
import axiosInstance from '../../../api/api';

const Checboxes = ({ list_items, handle_check, token }) => {

    const handleCheck = (event) => {
        const listItems = [...list_items];
        listItems[event.target.value].answer = event.target.checked;
        handle_check(listItems)
        handleChange(listItems[event.target.value]);
    }

    const handleChange = (item) => {
        if(item) 
        {
            axiosInstance.post(`/api/user/tasks/save-list-item-answer`, {
                list_item_id: item.id,
                answer: item.answer,
            }).then(e => {
            }).catch(err => {
                if (err.response.status === 404) {
                    NotificationManager.error('Invalid Request.', 'Error');
                }
            });
        }
    }

    return (
        <FormGroup>
        {
            _.map(list_items, (item, index) => {
                return (
                    <FormControlLabel key={`CHECK-${item.id}`} control={<Checkbox checked={item.answer ? true : false} value={index} onChange={handleCheck} />} label={item.name} />
                )
            })
        }
       
      </FormGroup>
    );
}

export default Checboxes;
