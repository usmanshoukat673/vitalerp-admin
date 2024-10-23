import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { setControlDocuments, setCreateDocument, setDomainDocuments } from "../../../../actions";
import axiosInstance from "../../../../api/api";
import { NotificationManager } from "react-notifications";

const DocumentNameInput = () => {

    const dispatch = useDispatch();

    const [document_name, setDocumentName] = useState('');

    const { create_document, control_documents, domain_documents, details_panel_type, standard, control, parent_domain, sub_domain } = useSelector((state) => ({
        create_document: state.compliance.create_document,
        control_documents: state.compliance.control_documents,
        domain_documents: state.compliance.domain_documents,
        details_panel_type: state.compliance.details_panel_type,
        control: state.compliance.control,
        standard: state.leftnav.standard,
        parent_domain: state.compliance.parent_domain,
        sub_domain: state.compliance.sub_domain,
    }));

    useEffect(() => {
        setDocumentName(create_document?.document?.name);
    }, [create_document]);

    const handleChange = (event) => {
        setDocumentName(event.target.value);
    }

    const handleFocus = () => {
        if (create_document.document.id == 0 && document_name == '--New Docoument--') {
            setDocumentName('');
        }
    }

    const handleUpdate = () => {
        if (create_document.document.id == 0) {
            let copy_create_document = { ...create_document };
            copy_create_document.document.name = document_name;
            dispatch(setCreateDocument(copy_create_document));
        }
        else {

            let activity_object = {
                page: 'Compliance',
                standard_id: null,
                section_id: null,
                control_id: null
            };

            if (details_panel_type === 'standard') {
                activity_object.standard_id = standard.standard_id;
                activity_object.page = 'standard';
            }
            else if (details_panel_type === 'domain') {
                activity_object.standard_id = standard.standard_id;
                activity_object.section_id = parent_domain.id;
                activity_object.page = 'domain';
            }
            else if (details_panel_type === 'sub_domain') {
                activity_object.standard_id = standard.standard_id;
                activity_object.section_id = sub_domain.id;
                activity_object.page = 'sub_domain';
            }
            else if (details_panel_type === 'control') {
                activity_object.control_id = control.id;
                activity_object.section_id = control.standard_section_id;
                activity_object.standard_id = standard.standard_id;
                activity_object.page = 'control';
            }

            axiosInstance.post(`/api/user/cjfm/rename-document`, {
                document_id: create_document.document.enc_id,
                document_name: document_name,
                ...activity_object
            }).then(e => {

                let copy_create_document = { ...create_document };
                copy_create_document.document = e.data.document;
                dispatch(setCreateDocument(copy_create_document));

                if (create_document.from == 'domain') {
                    let copy_domain_documents = [...domain_documents];
                    let index = _.findIndex(domain_documents, doc => {
                        return doc.document.id === create_document.document.id;
                    });
                    copy_domain_documents[index].document.name = e.data.document.name;
                    copy_domain_documents[index].document.modified = e.data.document.modified;
                    copy_domain_documents[index].document.updated_at = e.data.document.updated_at;
                    dispatch(setDomainDocuments(copy_domain_documents));
                }
                else {
                    let copy_control_documents = [...control_documents];
                    let index = _.findIndex(control_documents, doc => {
                        return doc.document.id === create_document.document.id;
                    });

                    copy_control_documents[index].document.name = e.data.document.name;
                    copy_control_documents[index].document.modified = e.data.document.modified;
                    copy_control_documents[index].document.updated_at = e.data.document.updated_at;
                    dispatch(setControlDocuments(copy_control_documents));
                }

            }).catch(err => {
                if (err.response.status === 422) {
                    NotificationManager.error(err.response.data.errors.document_name[0], 'Error');
                }
            });
        }
    }

    return (
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
            }}
        >
            <TextField
                fullWidth
                id="document_name"
                name="document_name"
                size="small"
                onFocus={handleFocus}
                onChange={handleChange}
                value={document_name}
                onBlur={handleUpdate}
            />
        </Box>
    );
}

export default DocumentNameInput;