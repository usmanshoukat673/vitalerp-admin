import React, { Component } from 'react';
import { Button, Image, Popup, List, Divider } from 'semantic-ui-react';
import './SectionDocuments.scss';
import IconButton from '@mui/material/IconButton';
import { GrDocument } from 'react-icons/gr';
import _ from 'lodash';
import OpenDocument from '../file-manager/Document/OpenDocument';
import NewSectionDocument from './NewSectionDocument';
import OpenPDFDocument from '../file-manager/Document/OpenPDFDocument';
import OpenMSDocs from '../file-manager/Document/OpenMSDocs';
import axiosInstance from '../../api/api';


class SectionDocuments extends Component {

    state = {
        creating_document: false,
        errors: [],
        loading: false,
        documents: [],
        opening_document: false,
        open_document: false,
        active_document: {},
        open_pdf_document: false,
        open_ms_document: false,
    }

    componentDidMount() {
        this.loadDocuments();
    }

    loadDocuments = () => {
        const { section } = this.props;

        this.setState({ loading: true });

        axiosInstance.post(`/api/user/compliance/section/documents`, {
            section_id: section.id,
            function_id: section.function_id,
        }).then(e => {

            this.setState({ loading: false, documents: e.data.documents });

        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.props.history.push('/login');
            }
        });
    }

    toggleCreateDocument = () => {
        this.setState({ creating_document: true });
    }

    listDocuments = documents => {
        return (<List className="sd__documents">
            {
                _.map(documents, doc => {
                    if (doc.document.type === 'document') {
                        return (
                            <List.Item style={{ cursor: 'auto!important' }} className="sd__document" key={doc.document_id} onClick={() => { this.openDocument(doc.document) }}>
                                <List.Icon name='file' />
                                <List.Content>{
                                    _.truncate(doc.document.name, {
                                        'length': 35,
                                        'separator': ' '
                                    })
                                }</List.Content>
                            </List.Item>
                        );
                    }
                    else if (doc.document.type === 'file') {

                        if (doc.document.ext === 'pdf') {
                            return (
                                <List.Item className="sd__document" key={doc.document_id} onClick={() => { this.openPDFDocument(doc.document) }}>
                                    <Image style={{ height: '18px' }} src={`/images/icons/${doc.document.ext}.png`} />
                                    <List.Content>{
                                        _.truncate(doc.document.name, {
                                            'length': 35,
                                            'separator': ' '
                                        })
                                    }</List.Content>
                                </List.Item>
                            );
                        }

                        let msFiles = ['doc', 'docx', 'pptx', 'xlsx', 'xls', 'ppt'];

                        if (msFiles.includes(doc.document.ext)) {
                            return (
                                <List.Item className="sd__document" key={doc.document_id} onClick={() => { this.openMSDocument(doc.document) }}>
                                    <Image style={{ height: '18px' }} src={`/images/icons/${doc.document.ext}.png`} />
                                    <List.Content>{
                                        _.truncate(doc.document.name, {
                                            'length': 35,
                                            'separator': ' '
                                        })
                                    }</List.Content>
                                </List.Item>
                            );
                        }

                        return (
                            <List.Item className="sd__document" key={doc.document_id}>
                                <Image style={{ height: '18px' }} src={`/images/icons/${doc.document.ext}.png`} />
                                <List.Content>{
                                    _.truncate(doc.document.name, {
                                        'length': 35,
                                        'separator': ' '
                                    })
                                }</List.Content>
                            </List.Item>
                        );
                    }
                })
            }
        </List>);

    }

    openPDFDocument = document => {
        this.setState({ open_pdf_document: true, active_document: document }, () => {
            this.setState({ opening_document: true });
        });
    };

    onClosePDFDocument = () => {
        this.setState({ open_pdf_document: false });
    }

    openMSDocument = document => {
        this.setState({ open_ms_document: true, active_document: document }, () => {
            this.setState({ opening_document: true });
        });
    };

    onCloseMSDocument = () => {
        this.setState({ open_ms_document: false });
    }

    openDocument = document => {
        this.setState({ open_document: true, active_document: document }, () => {
            this.setState({ opening_document: true });
        });
    };

    onDocumentOpend = () => {
        this.setState({ opening_document: false });
    }

    onCloseDocument = () => {
        this.setState({ open_document: false });
    }

    onCloseNewDocument = () => {
        this.setState({ creating_document: false });
    }

    onSavedDocumentEdits = document => {
        const { documents } = this.state;
        let index = _.findIndex(documents, doc => {
            return doc.document_id === document.id;
        });
        documents[index]['document'] = document;
        this.setState({ documents });
    };

    onSavedNewDocument = () => {
        this.setState({ creating_document: false });
        this.loadDocuments();
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { creating_document, documents, loading, errors, open_document, active_document, open_pdf_document, open_ms_document } = this.state;

        const { token, company, section } = this.props;

        return (<div className="section__documents">
            <div className="docs__heading">
                <div className="__heading">Documents</div>
                <Popup
                    trigger={<IconButton onClick={this.toggleCreateDocument} size="small" disabled={creating_document} >
                        <GrDocument />
                    </IconButton>}
                    content='New Document'
                    position='left center'
                />
            </div>
            <Divider className="__divider" />
            <div className="docs__listing">
                {this.listDocuments(documents)}

                {open_document ? <OpenDocument open={open_document} document={active_document} token={token} company={company} cancle={this.onCloseDocument} saved={this.onSavedDocumentEdits} opened={this.onDocumentOpend} /> : ''}
                {open_pdf_document ? <OpenPDFDocument open={open_pdf_document} document={active_document} token={token} company={company} cancle={this.onClosePDFDocument} /> : ''}
                {open_ms_document ? <OpenMSDocs open={open_ms_document} document={active_document} token={token} company={company} cancle={this.onCloseMSDocument} /> : ''}
                {creating_document ? <NewSectionDocument section={section} open={creating_document} token={token} company={company} cancle={this.onCloseNewDocument} saved={this.onSavedNewDocument} /> : ''}
            </div>
        </div>);
    }
}

export default SectionDocuments;
