import React, { useState } from 'react';
import _ from 'lodash';
import DescriptionIcon from '@mui/icons-material/Description';
import './ControlDocuments.scss';
import OpenDocument from '../../file-manager/Document/OpenDocument';
import OpenPDFDocument from '../../file-manager/Document/OpenPDFDocument';
import OpenMSDocs from '../../file-manager/Document/OpenMSDocs';
import { Image } from 'semantic-ui-react';

const ControlDocuments = ({renamed, renameddv, leftnav, controls, standards, token, company}) => {
    const [errors, setErrors] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [opening_document, setOpeningDocument] = useState(false);
    const [open_document, setOpenDocument] = useState(false);
    const [active_document, setActiveDocument] = useState({});
    const [open_pdf_document, setOpenPdfDocument] = useState(false);
    const [open_ms_document, setOpenMsDocument] = useState(false);
    const [active_control, setActiveControl] = useState('');

    const handleDocOpen = (doc, control_id) => {
        if (doc.document.type === 'document') {
            setOpenDocument(true);
            setActiveDocument(doc.document);
            setActiveControl(control_id);
            setOpeningDocument(true);
        }
        else if (doc.document.type === 'file') {
            if (doc.document.ext === 'pdf') {
                setOpenPdfDocument(true);
                setActiveDocument(doc.document);
                setActiveControl(control_id);
                setOpeningDocument(true);

            }

            let msFiles = ['doc', 'docx', 'pptx', 'xlsx', 'xls', 'ppt'];

            if (msFiles.includes(doc.document.ext)) {
                setOpenMsDocument(true);
                setActiveDocument(doc.document);
                setActiveControl(control_id);
                setOpeningDocument(true);

            }
        }
    }

    const handleRenamed = document => {
        setActiveDocument(document);
        renamed(document, active_control);
    }

    const handleRenamedOnDocView = document => {
        setActiveDocument(document);
        renameddv(document);
    }

    const onCloseDocument = () => {
        setOpenDocument(false);
    }

    const onSavedDocumentEdits = document => {
        let index = _.findIndex(documents, doc => {
            return doc.document_id === document.id;
        });
        documents[index]['document'] = document;
        setDocuments(documents);
    };

    const onDocumentOpend = () => {
        setOpeningDocument(false);
    }

    const onClosePDFDocument = () => {
        setOpenPdfDocument(false);
    }

    const onCloseMSDocument = () => {
        setOpenMsDocument(false);
    }

    const getDocumentIcon = (document) => {
        if(document.type === 'document')
        {
            return <DescriptionIcon />
        }
        else if(document.type === 'file')
        {
            return <Image style={{ height: '18px' }} src={`/images/icons/${document.ext}.png`} />
        }
        else{
            return <DescriptionIcon />
        }
    }

    const  listDocuments = control => {
        return (
            <React.Fragment key={`${control.id}-second-set`} >

                {
                    _.map(control.artifacts, doc => {

                        return (<div key={`${doc.document_id}-the-doc`} className="__documents__listitem">
                            <div className="__listitem__doc_icon" onClick={() => { handleDocOpen(doc, control.id) }}>
                                {getDocumentIcon(doc.document)}
                            </div>
                            <div className="__listitem__doc_secion">
                                <div className="__doc_secion__name" onClick={() => { handleDocOpen(doc) }}>
                                    {
                                        _.truncate(doc.document.name, {
                                            'length': 35,
                                            'separator': ' '
                                        })
                                    }
                                </div>
                                <div className="__doc_secion__number">
                                    {control.number}
                                </div>
                            </div>
                        </div>);

                    })
                }

            </React.Fragment>
        );

    }

    return(
        <div className="ccsection__documents">
        {
            /**
             * <div className="__documents__heading">
            <div>
                <div className="__heading_name">
                    Documents
                </div>
                <div className="__heading__sub">
                    in {_.isEmpty(leftnav.section.name) ? leftnav.section.menu_name : leftnav.section.menu_name}
                </div>
            </div>
            <div className="__documents__close">
                <IconButton onClick={props.close}>
                    <CloseIcon />
                </IconButton>
            </div>
        </div>
             */
        }

        {
            _.map(controls, control => {
                return listDocuments(control);
            })
        }

        {open_document ? <OpenDocument
            standards={standards}
            open={open_document}
            document={active_document}
            token={token}
            company={company}
            renamed={handleRenamedOnDocView}
            cancle={onCloseDocument}
            saved={onSavedDocumentEdits}
            opened={onDocumentOpend} /> : ''}

        {open_pdf_document ? <OpenPDFDocument
            standards={standards}
            open={open_pdf_document}
            document={active_document}
            token={token}
            company={company}
            renamed={handleRenamedOnDocView}
            cancle={onClosePDFDocument} /> : ''}

        {open_ms_document ? <OpenMSDocs
            standards={standards}
            open={open_ms_document}
            document={active_document}
            token={token}
            company={company}
            renamed={handleRenamedOnDocView}
            cancle={onCloseMSDocument} /> : ''}

    </div>
    );
}

 

export default ControlDocuments;
