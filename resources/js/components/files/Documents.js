import React, { Component } from 'react';
import _ from 'lodash';
import { Segment, Divider, Button, Icon, Popup, Breadcrumb, Message, Placeholder, Table } from 'semantic-ui-react';
import { setFilesDocuments, unSetFilesDocuments } from '../../actions';
import { deleteStore } from '../../store/localStorage';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import Folder from '../file-manager/Folder/Folder';
import NewFolder from '../file-manager/Folder/NewFolder';
import './Documents.scss';
import File from '../file-manager/File/File';
import FileUploader from '../file-manager/Folder/FileUploader';
import NewDocument from '../file-manager/Document/NewDocument';
import Document from '../file-manager/Document/Document';
import OpenPDFDocument from '../file-manager/Document/OpenPDFDocument';
import OpenMSDocs from '../file-manager/Document/OpenMSDocs';
import axiosInstance from '../../api/api';

class Documents extends Component {

    state = {
        loading: false,
        errors: [],
        document: '',
        documents: [],
        breadcrumbs: [],
        creating_folder: false,
        creating_document: false,
        document_id: '',
        uploading_file: false,
        open_pdf_document: false,
        open_ms_document: false,
        active_document: {},
    };

    constructor(props) {
        super(props);
        this.loadDirectory = this.loadDirectory.bind(this);
    }

    componentDidMount() {
        this.loadDirectory();
    }

    componentDidUpdate(prevProps) {
        this.loadDirectory();
    };

    loadDirectory = () => {
        const { company } = this.props;
        const { document_id } = this.props.match.params;

        console.log(document_id);

        if (!_.isEmpty(document_id) && this.state.document_id !== document_id) {
            this.setState({ document_id: document_id });

            this.setState({ loading: true });

            axiosInstance.get(`/api/user/cjfm/list/${company.id}/${document_id}`).then(e => {
                this.setState({ loading: false, documents: e.data.documents, document: e.data.document });
                console.log(e.data.documents);
                this.props.setFilesDocuments(e.data.documents);

                if (e.data.document.parent != null) {
                    this.setState({ breadcrumbs: _.reverse(e.data.breadcrumbs) });
                }
                // set documents here into redux
            }).catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 401) {
                    deleteStore();
                    this.props.clearUser();
                    this.props.clearToken();
                    this.props.history.push('/login');
                }
            });
        }
    };

    listDocuments = documents => {
        return _.map(documents, document => {

            if (document.type === 'folder') {
                // return (<Folder key={document.created_at} document={document} open={this.openFolder} delete={this.deleteFolder} renamed={this.folderRenamed} />);
            }
            else if (document.type === 'file') {
                // return (<File key={document.created_at} document={document} delete={this.deleteFolder} renamed={this.folderRenamed} />);
            }
            else if (document.type === 'document') {
                // return (<Document key={document.created_at} document={document} delete={this.deleteFolder} renamed={this.folderRenamed} saved={this.documentSaved} />);
            }
        }
        );
    };

    showBreadcrumb = breadcrumbs => {
        return _.map(breadcrumbs, document => {
            return (<React.Fragment key={document.created_at} >
                <Breadcrumb.Section onClick={() => this.openFolder(document)} link>{document.name}</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron'></Breadcrumb.Divider>
            </React.Fragment>);
        });
    };

    openFolder = document => {
        const { company } = this.props;
        this.props.history.push(`/${company.slug}/files/${document.enc_id}`);
    };

    deleteFolder = document => {
        const { documents } = this.state;
        _.remove(documents, (doc) => {
            return doc.id === document.id;
        });
        this.setState({ documents });
    };

    handleMoved = document => {
        const { documents } = this.state;
        _.remove(documents, (doc) => {
            return doc.id === document.id;
        });
        this.setState({ documents });
    };

    folderRenamed = document => {
        const { documents } = this.state;
        let index = _.findIndex(documents, doc => {
            return doc.id === document.id;
        });
        documents[index] = document;
        this.setState({ documents });
    }

    documentSaved = document => {
        const { documents } = this.state;
        let index = _.findIndex(documents, doc => {
            return doc.id === document.id;
        });
        documents[index] = document;
        this.setState({ documents });
    }

    toggleCreateFolder = () => {
        this.setState({ creating_folder: true });
    };

    toggleUploadFile = () => {
        this.setState({ uploading_file: true });
    };

    toggleCreateDocument = () => {
        this.setState({ creating_document: true });
    };

    onCancleCreateFolder = () => {
        this.setState({ creating_folder: false });
    };

    onCancleCreateDocument = () => {
        this.setState({ creating_document: false });
    };

    onNewFolderCreated = document => {
        let documents = this.state.documents;
        documents.push(document);
        this.setState({ documents: documents });
        this.setState({ creating_folder: false });
    };

    onNewDocumentCreated = document => {
        let documents = this.state.documents;
        documents.push(document);
        this.setState({ documents: documents });
        this.setState({ creating_document: false });
    };

    onNewFileUploaded = document => {
        let documents = this.state.documents;
        documents.push(document);
        this.setState({ documents: documents });
        this.setState({ uploading_file: false });
        NotificationManager.success('Given file has been uploaded successfully!', 'Success');
    }

    onCancleUploadDocument = () => {
        this.setState({ uploading_file: false });
    };

    openPDFDocument = (document) => {
        this.setState({ open_pdf_document: true, active_document: document }, () => {
            this.setState({ opening_document: true });
        });
    };

    onClosePDFDocument = () => {
        this.setState({ open_pdf_document: false });
    }

    openMSDocument = (document) => {
        this.setState({ open_ms_document: true, active_document: document }, () => {
            this.setState({ opening_document: true });
        });
    };

    onCloseMSDocument = () => {
        this.setState({ open_ms_document: false });
    }


    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { errors,
            loading,
            creating_folder,
            document,
            documents,
            breadcrumbs,
            uploading_file,
            creating_document,
            active_document,
            open_pdf_document,
            open_ms_document
        } = this.state;

        const { token, company, standards } = this.props;

        return (
            <React.Fragment>

                <div className="row" style={{ margin: '15px 5px 55px 5px' }}>
                    <div className="col-md-12">
                        <Segment piled style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', 'justifyContent': 'space-between' }}>
                                <Breadcrumb className="documents__breadcrumb">
                                    {document.parent != null ? this.showBreadcrumb(breadcrumbs) : ''}
                                    <Breadcrumb.Section active>{document.name}</Breadcrumb.Section>
                                </Breadcrumb>
                                <div>
                                    <Button.Group>
                                        <Popup
                                            trigger={<Button onClick={this.toggleCreateDocument} icon disabled={creating_document} >
                                                <Icon name='dochub' />
                                            </Button>}
                                            content='New Document'
                                            position='bottom center'
                                        />
                                        <Popup
                                            trigger={<Button onClick={this.toggleCreateFolder} icon disabled={creating_folder} >
                                                <Icon name='folder outline' />
                                            </Button>}
                                            content='New Folder'
                                            position='bottom center'
                                        />

                                        <Popup
                                            trigger={<Button onClick={this.toggleUploadFile} disabled={uploading_file} icon>
                                                <Icon name='cloud upload' />
                                            </Button>}
                                            content='Upload Document'
                                            position='bottom center'
                                        />

                                    </Button.Group>
                                </div>
                            </div>

                            <div className="cj__documents__container">

                                {uploading_file ? <FileUploader document={document} cancel={this.onCancleUploadDocument} uploaded={this.onNewFileUploaded} /> : ''}

                            </div>

                            <Table singleLine striped>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>Options</Table.HeaderCell>
                                        <Table.HeaderCell>Size</Table.HeaderCell>
                                        <Table.HeaderCell>Type</Table.HeaderCell>
                                        <Table.HeaderCell>Modified</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header><tbody>
                                    {_.isEmpty(documents) || loading ?
                                        '' :
                                        _.map(documents, document => {
                                            if (document.type === 'folder') {
                                                return (<Table.Row key={document.id}><Folder key={`${document.id}-folder`} document={document} open={this.openFolder} delete={this.deleteFolder} renamed={this.folderRenamed} /></Table.Row>);
                                            }
                                            else if (document.type === 'file') {
                                                return (<Table.Row key={document.id}><File key={`${document.id}-file`} openpdf={this.openPDFDocument} openmsfile={this.openMSDocument} document={document} delete={this.deleteFolder} renamed={this.folderRenamed} /></Table.Row>);
                                            }
                                            else if (document.type === 'document') {
                                                return (<Table.Row key={document.id}><Document key={`${document.id}-document`} document={document} documents={documents} delete={this.deleteFolder} moved={this.handleMoved} renamed={this.folderRenamed} saved={this.documentSaved} /></Table.Row>);
                                            }
                                        })}
                                    {creating_folder ? <Table.Row><NewFolder document={document} cancle={this.onCancleCreateFolder} created={this.onNewFolderCreated} /></Table.Row> : ''}
                                    {creating_document ? <Table.Row><NewDocument document={document} cancle={this.onCancleCreateDocument} created={this.onNewDocumentCreated} /></Table.Row> : ''}
                                    {loading ?
                                        <React.Fragment>
                                            <Table.Row>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                                <Table.Cell><Placeholder><Placeholder.Line /></Placeholder></Table.Cell>
                                            </Table.Row>
                                        </React.Fragment> : ''}</tbody>
                            </Table>

                            {open_pdf_document ? <OpenPDFDocument renamed={this.folderRenamed} standards={standards} open={open_pdf_document} document={active_document} token={token} company={company} cancle={this.onClosePDFDocument} /> : ''}
                            {open_ms_document ? <OpenMSDocs renamed={this.folderRenamed} open={open_ms_document} document={active_document} token={token} company={company} cancle={this.onCloseMSDocument} /> : ''}

                        </Segment>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
    standards: state.compliance.standards,
});

export default connect(mapStateToProps, { setFilesDocuments, unSetFilesDocuments })(Documents);
