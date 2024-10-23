import React, { useEffect, useState } from 'react';
import { Checkbox } from 'semantic-ui-react';
import axiosInstance from '../../../api/api';

const DocumentVisisbleToggle = ({ artifact }) => {

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(artifact.pp_visiblity);
    }, [artifact]);

    const handleChange = (e, data) => {
        setChecked(data.checked);
        axiosInstance.post(`/api/user/compliance/toggle-document-visiblity`, {
            id: artifact.id,
            pp_visiblity: data.checked
        });
    };

    return (
        <div style={{ position: 'absolute', right: '4px', top: '4px' }}>
            <Checkbox
                onChange={handleChange}
                toggle
                color="primary"
                checked={checked}
            />
        </div>
    )
}

export default DocumentVisisbleToggle;