import React, { Component } from 'react';
import _ from 'lodash';
import { Button, Breadcrumb, Placeholder } from 'semantic-ui-react';
import { setFilesDocuments, unSetFilesDocuments } from '../../actions';
import { deleteStore } from '../../store/localStorage';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import Folder from './Folder/Folder';
import NewFolder from './Folder/NewFolder';
import File from './File/File';
import FileUploader from './Folder/FileUploader';
import NewDocument from './Document/NewDocument';
import Document from './Document/Document';
import OpenPDFDocument from './Document/OpenPDFDocument';
import OpenMSDocs from './Document/OpenMSDocs';
import { Table } from 'react-bootstrap';
import './MyFiles.scss';
import { withRouter } from 'react-router-dom';
import axiosInstance from '../../api/api';

class MyFiles extends Component {

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

        if (!_.isEmpty(document_id) && this.state.document_id !== document_id) {
            this.setState({ document_id: document_id });

            this.setState({ loading: true });

            axiosInstance.get(`/api/user/cjfm/list/${company.id}/${document_id}`).then(e => {
                this.setState({ loading: false, documents: e.data.documents, document: e.data.document });

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
        this.props.history.push(`/${company.slug}/filemanager/myfiles/${document.enc_id}`);
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
        // this.setState({ creating_folder: false });
        this.props.cancleCreatingFolder();
    };

    onCancleCreateDocument = () => {
        // this.setState({ creating_document: false });
        this.props.cancleCreatingDocument();
    };

    onNewFolderCreated = document => {
        let documents = this.state.documents;
        documents.push(document);
        this.setState({ documents: documents });
        // this.setState({ creating_folder: false });
        this.props.folderCreated();
    };

    onNewDocumentCreated = document => {
        let documents = this.state.documents;
        documents.push(document);
        this.setState({ documents: documents });
        // this.setState({ creating_document: false });
        this.props.documentCreated();
    };

    onNewFileUploaded = document => {
        let documents = this.state.documents;
        documents.push(document);
        this.setState({ documents: documents });
        // this.setState({ uploading_file: false });
        this.props.fileUploaded();
        NotificationManager.success('Given file has been uploaded successfully!', 'Success');
    }

    onCancleUploadDocument = () => {
        // this.setState({ uploading_file: false });
        this.props.cancelFileUpload();
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
            document,
            documents,
            breadcrumbs,
            active_document,
            open_pdf_document,
            open_ms_document
        } = this.state;

        const { token, company, standards, create_folder, create_document, upload_file } = this.props;

        return (
            <React.Fragment>

                <div className="mt-3">
                    <div style={{ display: 'flex', 'justifyContent': 'space-between' }}>
                        <Breadcrumb className="documents__breadcrumb">
                            {document.parent != null ? this.showBreadcrumb(breadcrumbs) : ''}
                            <Breadcrumb.Section active>{document.name}</Breadcrumb.Section>
                        </Breadcrumb>
                        <div>
                            <Button.Group>
                                {
                                    /**
                                     * <Popup
                                    trigger={<Button onClick={this.toggleCreateDocument} icon disabled={create_document} >
                                        <Icon name='dochub' />
                                    </Button>}
                                    content='New Document'
                                    position='bottom center'
                                />
                                <Popup
                                    trigger={<Button onClick={this.toggleCreateFolder} icon disabled={create_folder} >
                                        <Icon name='folder outline' />
                                    </Button>}
                                    content='New Folder'
                                    position='bottom center'
                                />
            
            
                                <Popup
                                    trigger={<Button onClick={this.toggleUploadFile} disabled={upload_file} icon>
                                        <Icon name='cloud upload' />
                                    </Button>}
                                    content='Upload Document'
                                    position='bottom center'
                                />
            
                                      */
                                }

                            </Button.Group>
                        </div>
                    </div>

                    <div className="cj__documents__container">

                        {upload_file ? <FileUploader document={document} cancel={this.onCancleUploadDocument} uploaded={this.onNewFileUploaded} /> : ''}

                    </div>

                    <Table responsive className="table table-centered table-nowrap mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="border-0">Name</th>
                                <th className="border-0">Last Modified</th>
                                <th className="border-0">Size</th>
                                <th className="border-0">Owner</th>
                                <th className="border-0">Type</th>
                                <th className="border-0" style={{ width: '80px' }}>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {create_folder ? <tr><NewFolder document={document} cancle={this.onCancleCreateFolder} created={this.onNewFolderCreated} /></tr> : ''}
                        {create_document ? <tr><NewDocument document={document} cancle={this.onCancleCreateDocument} created={this.onNewDocumentCreated} /></tr> : ''}

                        {_.isEmpty(documents) || loading ?
                            '' :
                            _.map(documents, document => {
                                if (document.type === 'folder') {
                                    return (<tr key={document.id}><Folder key={`${document.id}-folder`} document={document} open={this.openFolder} delete={this.deleteFolder} renamed={this.folderRenamed} /></tr>);
                                }
                                else if (document.type === 'file') {
                                    return (<tr key={document.id}><File key={`${document.id}-file`} openpdf={this.openPDFDocument} openmsfile={this.openMSDocument} document={document} delete={this.deleteFolder} renamed={this.folderRenamed} /></tr>);
                                }
                                else if (document.type === 'document') {
                                    return (<tr key={document.id}><Document key={`${document.id}-document`} document={document} documents={documents} delete={this.deleteFolder} moved={this.handleMoved} renamed={this.folderRenamed} saved={this.documentSaved} /></tr>);
                                }
                            })}
                        {loading ?
                            <React.Fragment>
                                <tr>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                </tr>
                                <tr>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                </tr>
                                <tr>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                </tr>
                                <tr>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                    <td><Placeholder><Placeholder.Line /></Placeholder></td>
                                </tr>
                            </React.Fragment> : ''}
                            </tbody>
                    </Table>

                    {open_pdf_document ? <OpenPDFDocument renamed={this.folderRenamed} standards={standards} open={open_pdf_document} document={active_document} token={token} company={company} cancle={this.onClosePDFDocument} /> : ''}
                    {open_ms_document ? <OpenMSDocs renamed={this.folderRenamed} open={open_ms_document} document={active_document} token={token} company={company} cancle={this.onCloseMSDocument} /> : ''}

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

export default withRouter(connect(mapStateToProps, { setFilesDocuments, unSetFilesDocuments })(MyFiles));
