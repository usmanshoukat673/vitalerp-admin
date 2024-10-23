import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import axiosInstance from "../../../../api/api";
import { setControlDocuments, setDomainDocuments } from "../../../../actions";

const DigitalDocumentEditMode = () => {

    const dispatch = useDispatch();

    const { open_document, domain_documents, control_documents } = useSelector((state) => ({
        open_document: state.compliance.open_document,
        domain_documents: state.compliance.domain_documents,
        control_documents: state.compliance.control_documents,
    }));

    const [data, setData] = useState('');
    const [opened, setOpened] = useState(false);
    const [_editor, setEditor] = useState(null);

    useEffect(() => {
        setData(open_document.document.content);

        setTimeout(() => {
            setOpened(true);
        }, 100);
    }, [open_document]);

    const handleAutoSave = (data) => {
        axiosInstance.post(`/api/user/cjfm/save-document`, {
            document_id: open_document.document.enc_id,
            data: data
        }).then(e => {
            if (open_document.from == 'domain') {
                let copy_domain_documents = [...domain_documents];
                let index = _.findIndex(domain_documents, doc => {
                    return doc.document.id === open_document.document.id;
                });

                copy_domain_documents[index].document.content = data;
                copy_domain_documents[index].document.modified = e.data.document.modified;
                copy_domain_documents[index].document.updated_at = e.data.document.updated_at;
                copy_domain_documents[index].document.size = e.data.document.size;
                dispatch(setDomainDocuments(copy_domain_documents));
            }
            else {
                let copy_control_documents = [...control_documents];
                let index = _.findIndex(control_documents, doc => {
                    return doc.document.id === open_document.document.id;
                });

                copy_control_documents[index].document.content = data;
                copy_control_documents[index].document.modified = e.data.document.modified;
                copy_control_documents[index].document.updated_at = e.data.document.updated_at;
                copy_control_documents[index].document.size = e.data.document.size;
                dispatch(setControlDocuments(copy_control_documents));
            }

        }).catch(err => {
        });
    };

    return (
        <>
            {
                !opened ? <p>Loading...</p> :
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


                                }}
                                onBlur={(event, editor) => {
                                    // console.log('Blur.', editor);
                                    handleAutoSave(editor.getData());
                                }}
                                onFocus={(event, editor) => {
                                    // console.log('Focus.', editor);
                                }}
                            />
                        </div>
                    </div>
            }
        </>
    );
}

export default DigitalDocumentEditMode;