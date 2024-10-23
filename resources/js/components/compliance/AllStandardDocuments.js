import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import DescriptionIcon from '@mui/icons-material/Description';
import './AllStandardDocuments.scss';
import OpenDocument from '../file-manager/Document/OpenDocument';
import OpenPDFDocument from '../file-manager/Document/OpenPDFDocument';
import OpenMSDocs from '../file-manager/Document/OpenMSDocs';
import { Image } from 'semantic-ui-react';
import { Collapse, Divider, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const AllStandardDocuments = ({ openDocumentInDrawer, renamed, standards, token, company, documents, standard, saved, stay_docs_open }) => {
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [opening_document, setOpeningDocument] = useState(false);
    const [open_document, setOpenDocument] = useState(false);
    const [active_document, setActiveDocument] = useState({});
    const [open_pdf_document, setOpenPdfDocument] = useState(false);
    const [open_ms_document, setOpenMsDocument] = useState(false);
    const [active_control, setActiveControl] = useState('');

    const [toggle_documents, setToggleDocuments] = useState(false);

    useEffect(() => {
        setToggleDocuments(stay_docs_open);
    }, [stay_docs_open]);

    const handleDocOpen = (doc, control_id) => {

        openDocumentInDrawer(doc.document, control_id);
        // if (doc.document.type === 'document') {
        //     setOpenDocument(true);
        //     setActiveDocument(doc.document);
        //     setActiveControl(control_id);
        //     setOpeningDocument(true);
        // }
        // else if (doc.document.type === 'file') {
        //     if (doc.document.ext === 'pdf') {
        //         setOpenPdfDocument(true);
        //         setActiveDocument(doc.document);
        //         setActiveControl(control_id);
        //         setOpeningDocument(true);
        //     }
        //     let msFiles = ['doc', 'docx', 'pptx', 'xlsx', 'xls', 'ppt'];
        //     if (msFiles.includes(doc.document.ext)) {
        //         setOpenMsDocument(true);
        //         setActiveDocument(doc.document);
        //         setActiveControl(control_id);
        //         setOpeningDocument(true);

        //     }
        // }
    }

    const handleRenamed = document => {
        setActiveDocument(document);
        renamed(document, active_control);
    }

    const handleRenamedDV = document => {
        setActiveDocument(document);
        renamed(document);
    }

    const onCloseDocument = () => {
        setOpenDocument(false);
    }

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

    return (

        <div className="standard__documents">
            
            {
                _.size(documents) > 0 &&  <div className='__documents__toggle' onClick={() => setToggleDocuments(!toggle_documents)}>
                    <div>Documents</div>
                    {!toggle_documents ? <ChevronRightIcon /> : <KeyboardArrowDownIcon />}
                </div>
            }
            

            <Collapse in={toggle_documents}>
            {

                _.map(documents, doc => {

                    return (<div key={`${doc.id}-std-the-doc`} className="__documents__listitem">
                        <div className="__listitem__doc_icon" onClick={() => {handleDocOpen(doc, doc.control_id) }}>
                            {getDocumentIcon(doc.document)}
                        </div>
                        <div className="__listitem__doc_secion">
                            <div className="__doc_secion__name" onClick={() => {handleDocOpen(doc, doc.control_id) }}>
                                {
                                    _.truncate(doc.document.name, {
                                        'length': 35,
                                        'separator': ' '
                                    })
                                }
                            </div>
                            <div className="__doc_secion__number">
                                {
                                    _.map(doc.controls, ctrl => {
                                        return `${ctrl.control.number}, `
                                    })
                                }
                            </div>
                        </div>
                    </div>);

                })

            }
            </Collapse>

            {open_document ? <OpenDocument
                standards={standards}
                open={open_document}
                document={active_document}
                token={token}
                company={company}
                renamed={handleRenamedDV}
                cancle={onCloseDocument}
                saved={saved}
                opened={onDocumentOpend} /> : ''}

            {open_pdf_document ? <OpenPDFDocument
                standards={standards}
                open={open_pdf_document}
                document={active_document}
                token={token}
                company={company}
                renamed={handleRenamedDV}
                cancle={onClosePDFDocument} /> : ''}

            {open_ms_document ? <OpenMSDocs
                open={open_ms_document}
                document={active_document}
                token={token}
                company={company}
                renamed={handleRenamedDV}
                cancle={handleRenamedDV} /> : ''}
        </div>

    );
}

 
export default AllStandardDocuments;
