import React, { Component } from 'react';
import _ from 'lodash';
import DescriptionIcon from '@mui/icons-material/Description';
import OpenDocument from '../../file-manager/Document/OpenDocument';
import OpenPDFDocument from '../../file-manager/Document/OpenPDFDocument';
import OpenMSDocs from '../../file-manager/Document/OpenMSDocs';
import './AllSectionDocuments.scss';
import { Image } from 'semantic-ui-react';

class AllSectionDocuments extends Component {

    state = {
        errors: [],
        loading: false,
        opening_document: false,
        open_document: false,
        active_document: {},
        open_pdf_document: false,
        open_ms_document: false,
        active_control: '',
    }

    handleDocOpen = (doc, control_id) => {
        if (doc.document.type === 'document') {
            this.setState({ open_document: true, active_document: doc.document, active_control: control_id }, () => {
                this.setState({ opening_document: true });
            });
        }
        else if (doc.document.type === 'file') {
            if (doc.document.ext === 'pdf') {
                this.setState({ open_pdf_document: true, active_document: doc.document, active_control: control_id }, () => {
                    this.setState({ opening_document: true });
                });
            }

            let msFiles = ['doc', 'docx', 'pptx', 'xlsx', 'xls', 'ppt'];

            if (msFiles.includes(doc.document.ext)) {
                this.setState({ open_ms_document: true, active_document: doc.document, active_control: control_id }, () => {
                    this.setState({ opening_document: true });
                });
            }
        }
    }

    handleRenamed = document => {
        this.setState({ active_document: document });
        this.props.renamed(document, this.state.active_control);
    }

    handleRenamedDV = document => {
        this.setState({ active_document: document });
        this.props.renamed(document);
    }

    onCloseDocument = () => {
        this.setState({ open_document: false });
    }

    onSavedDocumentEdits = document => {
        const { documents } = this.state;
        let index = _.findIndex(documents, doc => {
            return doc.document_id === document.id;
        });
        documents[index]['document'] = document;
        this.setState({ documents });
    };

    onDocumentOpend = () => {
        this.setState({ opening_document: false });
    }

    onClosePDFDocument = () => {
        this.setState({ open_pdf_document: false });
    }

    onCloseMSDocument = () => {
        this.setState({ open_ms_document: false });
    }

    getDocumentIcon = (document) => {
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

    render() {

        const { standards, token, company, documents, leftnav } = this.props;

        const { loading, errors, open_document, active_document, open_pdf_document, open_ms_document } = this.state;

        return (

            <div className="section__documents">
                <div className="__documents__heading">
                    <div>
                        <div className="__heading_name">
                            Documents
                        </div>
                        <div className="__heading__sub">
                            in {leftnav.psection.menu_name}
                        </div>
                    </div>
                    <div className="__documents__close">
                        {/**
                        <IconButton onClick={this.props.close}>
                            <CloseIcon />
                        </IconButton>
                        */}
                    </div>
                </div>

                {

                    _.map(documents, doc => {

                        return (<div key={`${doc.id}-std-the-doc`} className="__documents__listitem">
                            <div className="__listitem__doc_icon" onClick={() => { this.handleDocOpen(doc, doc.control_id) }}>
                                {this.getDocumentIcon(doc.document)}
                            </div>
                            <div className="__listitem__doc_secion">
                                <div className="__doc_secion__name" onClick={() => { this.handleDocOpen(doc, doc.control_id) }}>
                                    {
                                        _.truncate(doc.document.name, {
                                            'length': 35,
                                            'separator': ' '
                                        })
                                    }
                                </div>
                                <div className="__doc_secion__number">
                                    {
                                        _.map(doc.document.controls, ctrl => {
                                            return `${ctrl.control.number}, `
                                        })
                                    }
                                </div>
                            </div>
                        </div>);

                    })

                }

                {open_document ? <OpenDocument
                    standards={standards}
                    open={open_document}
                    document={active_document}
                    token={token}
                    company={company}
                    renamed={this.handleRenamedDV}
                    cancle={this.onCloseDocument}
                    saved={this.onSavedDocumentEdits}
                    opened={this.onDocumentOpend} /> : ''}

                {open_pdf_document ? <OpenPDFDocument
                    standards={standards}
                    open={open_pdf_document}
                    document={active_document}
                    token={token}
                    company={company}
                    renamed={this.handleRenamedDV}
                    cancle={this.onClosePDFDocument} /> : ''}

                {open_ms_document ? <OpenMSDocs
                    open={open_ms_document}
                    document={active_document}
                    token={token}
                    company={company}
                    renamed={this.handleRenamedDV}
                    cancle={this.handleRenamedDV} /> : ''}
            </div>

        );
    }
}

export default AllSectionDocuments;
