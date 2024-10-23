import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import _ from 'lodash';
import { NotificationManager } from 'react-notifications';
import './RenameDoc.scss';
import axiosInstance from '../../../api/api';

const RenameDocument = ({document, cancel, token, company, renamed}) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [renaming, setRenaming] = useState(false);
    const [name_changed, setNameChanged] = useState(false);
    const [document_name, setDocumentName] = useState('');

    useEffect(() => {
        setDocumentName(document.name);
    }, [document]);

    const handleChange = event => {
        setDocumentName(event.target.value);
        setNameChanged(true);
        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            setErrors(errors);
        }
    };

    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'create__input error' : 'create__input';
    };

    const saveRenameDocument = () => {

        setLoading(true);
        setRenaming(true);
        setNameChanged(false);

        axiosInstance.post(`/api/user/cjfm/rename-document`, {
            document_id: document.enc_id,
            document_name: document_name
        }).then(e => {
            setLoading(false);
            setRenaming(false);
            renamed(e.data.document);
        }).catch(err => {
            if (err.response.status === 422) {
                setLoading(false);
                setErrors(errors.concat(err.response.data.errors));
                setRenaming(false);
                NotificationManager.error(err.response.data.errors.document_name[0], 'Error');
            }
            if (err.response.status === 500) {
                setLoading(false);
                setErrors([]);
                setRenaming(false);
            }
        });
    }

    return (
        <div>
            <input
                type="text"
                autoFocus
                id="document_name"
                name="document_name"
                className={handlerInputError('document_name')}
                value={document_name}
                onChange={handleChange}
            />
            <Button
                disabled={renaming || !name_changed}
                className={renaming ? 'loading' : ''}
                basic color="teal"
                onClick={saveRenameDocument}
                size='mini'>
                Save
            </Button>
            <Button
                basic
                size='mini'
                onClick={cancel}>
                Cancel
            </Button>
        </div>
    );
}

export default RenameDocument;
