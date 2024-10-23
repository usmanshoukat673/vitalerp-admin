import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { NotificationManager } from 'react-notifications';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/api';

const CustomDocument = ({ document, cancle, saved, digi_changed, hit_save }) => {
    const [data, setData] = useState('');
    const [errors, setErrors] = useState([]);

    const [editor, setEditor] = useState({});

    const { token, company } = useSelector(state => ({
        token: state.token.activeToken,
        company: state.orgs.company,
    }));

    useEffect(() => {
        axiosInstance.get(`/api/user/cjfm/view-document/${document.id}`).then(e => {
            setData(e.data.document.content);
        }).catch(err => {
            if (err.response.status === 422) {
                setErrors(errors.concat(err.response.data.errors));
                NotificationManager.error(err.response.data.errors[0].document_name, 'Error');
            }
        }).finally(() => {
            setErrors([]);
        });

    }, [document]);

    useEffect(() => {
        if(hit_save == true)
        {
            handleSave();
        }
    }, [hit_save]);

    const handleSave = () => {
        axiosInstance.post(`/api/user/cjfm/save-document`, {
            document_id: document.enc_id,
            data: data
        }).then(e => {
            saved(e.data.document);
            cancle();
        }).catch(err => {
            if (err.response.status === 422) {
                setErrors(errors.concat(err.response.data.errors));
                NotificationManager.error(err.response.data.errors[0].document_name, 'Error');
            }
        }).finally(() => {
            setErrors([]);
        });
    }

    return (
        <>
            <div className="document-editor">
                <div className="document-editor__toolbar"></div>
                <div className="document-editor__editable-container">
                    <CKEditor

                        data={_.isEmpty(data) ? `<p></p>` : data}
                        editor={DecoupledEditor}
                        onReady={editor => {

                            const toolbarContainer = window.document.querySelector('.document-editor__toolbar');
                            toolbarContainer.appendChild(editor.ui.view.toolbar.element);

                            window.editor = editor;
                            // You can store the "editor" and use when it is needed.
                            // console.log('Editor is ready to use!', editor);
                            setEditor(editor);
                        }}

                        onChange={(event, editor) => {
                            // console.log({ event, editor, data });
                            setData(editor.getData());
                            if(!_.isEmpty(data))
                            {
                                digi_changed();
                            }
                        }}
                        onBlur={(event, editor) => {
                            // console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            // console.log('Focus.', editor);
                        }}
                    />
                </div>
            </div>
        </>
    );

}

export default CustomDocument;
