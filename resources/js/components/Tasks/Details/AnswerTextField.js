import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

const AnswerTextField = ({item, index, handle_blur}) => {

    const [answer, setAsnwer] = useState((item.answer == null ? '' : item.answer));

    const handleChange = (e) => {
        setAsnwer(e.target.value);
    }

    const handleBlur = () => {
        handle_blur(index, answer);
    }
    
    return (
        <Form.Field>
            <label>{item.name}</label>
            <input onBlur={handleBlur} onChange={handleChange} value={answer} />
        </Form.Field>
    )
}

export default AnswerTextField