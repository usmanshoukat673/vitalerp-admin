import React, { Component } from 'react';
import { Button, Image, Popup, List, Divider } from 'semantic-ui-react';
import './SectionControlDocuments.scss';
import IconButton from '@mui/material/IconButton';
import { GrDocument } from 'react-icons/gr';
import Axios from 'axios';
import { NotificationManager } from 'react-notifications';
import _ from 'lodash';
import OpenDocument from '../file-manager/Document/OpenDocument';
import NewSectionDocument from './NewSectionDocument';
import OpenPDFDocument from '../file-manager/Document/OpenPDFDocument';
import OpenMSDocs from '../file-manager/Document/OpenMSDocs';
import MenuIcon from '@mui/icons-material/Menu';
import { toggleRightSideDocs } from '../../actions';
import { connect } from 'react-redux';


class SectionControlDocuments extends Component {

    state = {
        creating_document: false,
        errors: [],
        loading: false,
        documents: [],
        opening_document: false,
        open_document: false,
        active_document: {},
        active_control: '',
        open_pdf_document: false,
        open_ms_document: false,
    }

    toggleCreateDocument = () => {
        this.setState({ creating_document: true });
    }

    listDocuments = control => {
        return (
            <React.Fragment key={`${control.id}-second-set`} >
                <div className="control__header">
                    {
                        _.truncate(`${control.number} ${control.name}`, {
                            'length': 45,
                            'separator': ' '
                        })
                    }
                </div>
                <List className="sd__documents">
                    {
                        _.map(control.artifacts, doc => {
                            if (doc.document.type === 'document') {
                                return (
                                    <List.Item style={{ cursor: 'auto!important' }} className="sd__document" key={`${doc.document_id}-the-doc`} onClick={() => { this.openDocument(doc.document, control.id) }}>
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
                                        <List.Item className="sd__document" key={`${doc.document_id}-the-doc`} onClick={() => { this.openPDFDocument(doc.document, control.id) }}>
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
                                        <List.Item className="sd__document" key={`${doc.document_id}-the-doc`} onClick={() => { this.openMSDocument(doc.document, control.id) }}>
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
                                    <List.Item className="sd__document" key={`${doc.document_id}-the-doc`}>
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
                </List>

            </React.Fragment>);

    }

    openPDFDocument = (document, control_id) => {
        this.setState({ open_pdf_document: true, active_document: document, active_control: control_id }, () => {
            this.setState({ opening_document: true });
        });
    };

    onClosePDFDocument = () => {
        this.setState({ open_pdf_document: false });
    }

    openMSDocument = (document, control_id) => {
        this.setState({ open_ms_document: true, active_document: document, active_control: control_id }, () => {
            this.setState({ opening_document: true });
        });
    };

    onCloseMSDocument = () => {
        this.setState({ open_ms_document: false });
    }

    openDocument = (document, control_id) => {
        this.setState({ open_document: true, active_document: document, active_control: control_id }, () => {
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


    toggleRightDocs = () => {

        this.props.toggleRightSideDocs(!this.props.leftnav.open_documents_menu);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    handleRenamed = document => {
        this.setState({ active_document: document });
        this.props.renamed(document, this.state.active_control);
    }


    render() {

        const { creating_document, loading, errors, open_document, active_document, open_pdf_document, open_ms_document } = this.state;

        const { token, company, section, controls, leftnav, standards } = this.props;

        return (

            <div className="section__documents">
                <div className="docs__heading">
                    <IconButton size="small" onClick={this.toggleRightDocs}>
                        <MenuIcon />
                    </IconButton>

                    <div className="__heading">Documents</div>
                    <Popup
                        trigger={<IconButton onClick={this.toggleCreateDocument} size="small" disabled={creating_document} >
                            <GrDocument />
                        </IconButton>}
                        content='New Document'
                        position='left center'
                    />
                </div>
                <Divider className="__divider" style={{ borderBottom: '0px!important' }} />
                <div className="docs__listing">

                    {
                        _.map(controls, control => {
                            return this.listDocuments(control);
                        })
                    }


                    {open_document ? <OpenDocument renamed={this.handleRenamed} standards={standards} open={open_document} document={active_document} token={token} company={company} cancle={this.onCloseDocument} saved={this.onSavedDocumentEdits} opened={this.onDocumentOpend} /> : ''}
                    {open_pdf_document ? <OpenPDFDocument renamed={this.handleRenamed} standards={standards} open={open_pdf_document} document={active_document} token={token} company={company} cancle={this.onClosePDFDocument} /> : ''}
                    {open_ms_document ? <OpenMSDocs open={open_ms_document} document={active_document} token={token} company={company} cancle={this.onCloseMSDocument} /> : ''}
                    {creating_document ? <NewSectionDocument section={section} open={creating_document} token={token} company={company} cancle={this.onCloseNewDocument} saved={this.onSavedNewDocument} /> : ''}
                </div>
            </div>

        );

    }
}

const mapStateToProps = (state) => ({
    leftnav: state.leftnav
});
export default connect(mapStateToProps, { toggleRightSideDocs })(SectionControlDocuments);
