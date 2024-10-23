import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { setControlDocuments, setCreateDocument, setDomainDocuments } from "../../../../actions";
import axiosInstance from "../../../../api/api";

const CreateDocument = () => {

    const dispatch = useDispatch();

    const { company, domain_documents, control_documents, create_document, control_info } = useSelector((state) => ({
        company: state.orgs.company,
        domain_documents: state.compliance.domain_documents,
        control_documents: state.compliance.control_documents,
        create_document: state.compliance.create_document,
        control_info: state.compliance.control_info,
    }));

    const [data, setData] = useState('');
    const [opened, setOpened] = useState(false);
    const [_editor, setEditor] = useState(null);

    useEffect(() => {
        setData(create_document.document.content);

        setTimeout(() => {
            setOpened(true);
        }, 100);
    }, [create_document]);

    const handleAutoSave = (data) => {

        if (create_document.document.id == 0) {
            // create document 
            axiosInstance.post(`/api/user/compliance/create-new-artifact`, {
                name: create_document.document.name,
                control_id: control_info.control.control_id,
                section_id: control_info.control.section_id,
                standard_id: control_info.control.standard_id,
                document_id: company.document.id,
                content: data // needs to validated after dicussion
            }).then(e => {
                
                let copy_create_document = {...create_document};
                copy_create_document.document = e.data.control_artifact.document;
                dispatch(setCreateDocument(copy_create_document));

                let copy_control_documents = [...control_documents];
                copy_control_documents.push(e.data.control_artifact);
                dispatch(setControlDocuments(copy_control_documents));

            }).catch(err => {
            });
        }
        else {
            // auto save
            axiosInstance.post(`/api/user/cjfm/save-document`, {
                document_id: create_document.document.enc_id,
                data: data
            }).then(e => {
                if (create_document.from == 'domain') {
                    let copy_domain_documents = [...domain_documents];
                    let index = _.findIndex(domain_documents, doc => {
                        return doc.document.id === create_document.document.id;
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
                        return doc.document.id === create_document.document.id;
                    });

                    copy_control_documents[index].document.content = data;
                    copy_control_documents[index].document.modified = e.data.document.modified;
                    copy_control_documents[index].document.updated_at = e.data.document.updated_at;
                    copy_control_documents[index].document.size = e.data.document.size;
                    dispatch(setControlDocuments(copy_control_documents));
                }

            }).catch(err => {
            });
        }


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

export default CreateDocument;