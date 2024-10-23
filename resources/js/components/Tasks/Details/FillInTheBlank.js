import React from 'react';
import { Form } from 'semantic-ui-react';
import AnswerTextField from './AnswerTextField';
import axiosInstance from '../../../api/api';

const FillInTheBlank = ({list_items, handle_check}) => {

    const handleFill = (index, answer) => {
        const listItems = [...list_items];
        listItems[index].answer = answer;
        handle_check(listItems)
        handleChange(listItems[index]);
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

    return(
        <Form>
            {
                _.map(list_items, (item, index) => {
                    return (
                        <AnswerTextField key={`FILL-${item.id}`} item={item} index={index} handle_blur={handleFill} />
                    )
                })
            }
        </Form>
    )
}

export default FillInTheBlank