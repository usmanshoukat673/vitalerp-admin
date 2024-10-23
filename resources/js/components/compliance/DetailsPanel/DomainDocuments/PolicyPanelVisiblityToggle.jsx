import React, { useEffect, useState } from 'react';
import { Checkbox } from 'semantic-ui-react';
import axiosInstance from '../../../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setControlDocuments } from '../../../../actions';


const PolicyPanelVisiblityToggle = ({ artifact }) => {

    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch();

    const { control_documents } = useSelector((state) => ({
        control_documents: state.compliance.control_documents
    }));

    useEffect(() => {
        setChecked(artifact.pp_visiblity);
    }, [artifact]);

    const handleChange = (e, data) => {
        setChecked(data.checked);
        axiosInstance.post(`/api/user/compliance/toggle-document-visiblity`, {
            id: artifact.id,
            pp_visiblity: data.checked
        }).then(e => {
            let copy_control_documents = [...control_documents];
            let index = _.findIndex(control_documents, doc => {
                return doc.id === artifact.id;
            });
            copy_control_documents[index].pp_visiblity = data.checked; 
            dispatch(setControlDocuments(copy_control_documents));
        });
    };

    return (
        <Checkbox
            onChange={handleChange}
            toggle
            color="primary"
            checked={checked}
        />
    )
}

export default PolicyPanelVisiblityToggle;