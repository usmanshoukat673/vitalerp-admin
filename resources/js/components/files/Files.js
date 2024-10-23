import React, { Component } from 'react';
import _ from 'lodash';
import './Files.scss';
import { connect } from 'react-redux';
import { closeLeftNav, closeSubLeftNav, selectControlFunction, selectCatalogSection } from '../../actions';
import { Route } from 'react-router-dom';
import FileLeftNav from './FileLeftNav';

import { Row, Col, Card, Dropdown, ButtonGroup, ProgressBar } from 'react-bootstrap';
import PageTitle from '../layout/PageTitle';
import Recent from './Recent';

import { deleteStore } from '../../store/localStorage';
import DefaultAccess from './DefaultAccess';
import SectionFiles from './SectionFiles';
import MyFiles from './MyFiles';
import AllSubDomains from './AllSubDomains';
import RightDrawer from '../../layouts/RightDrawer';
import axiosInstance from '../../api/api';

const RightSidebar = () => {
    return(
        <div>
            TODO
        </div>
    )
}

class Files extends Component {

    state = {
        loading: false,
        errors: [],
        document: '',
        documents: [],
        breadcrumbs: [],
        creating_folder: false,
        create_folder: false,
        create_document: false,
        creating_document: false,
        upload_file: false,
        document_id: '',
        uploading_file: false,
        open_pdf_document: false,
        open_ms_document: false,
        active_document: {},
        resent_docs: [],
        sub_sections: [],
    }

    componentDidMount() {
        this.props.closeSubLeftNav();
        this.props.selectControlFunction({});
        this.props.selectCatalogSection({});
        this.loadDirectory();
    }

    componentDidUpdate(prevProps) {
        this.loadDirectory();
    };

    loadDirectory = () => {
        const { token, company } = this.props;
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

    handleNewFolder = () => {
        this.setState({
            create_folder: true
        });
    }

    handleNewDocument = () => {
        this.setState({
            create_document: true
        });
    }

    handleNewFileUpload = () => {
        this.setState({
            upload_file: true
        });
    }

    folderCreated = () => {
        this.setState({
            create_folder: false
        });
    }

    documentCreated = () => {
        this.setState({
            create_document: false
        });
    }

    fileUploaded = () => {
        this.setState({
            upload_file: false
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { company, leftnav, documents} = this.props;
        const { create_folder, create_document, upload_file} = this.state;

        return (

           <>
             <div className="__Files">
            <PageTitle
                breadCrumbItems={[
                    { label: 'Dashboard', path: `/${company.slug}/compliance-stack` },
                    { label: 'File Manager', path: `/${company.slug}/v2/files/${company.document.enc_id}`, active: true },
                ]}
                title={'File Manager'}
            />

            <Row className='main__files'>
                <Col>
                    <Card className='the__card'>
                        <Card.Body>
                            <div className="page-aside-left">
                                <FileLeftNav
                                newFolder={this.handleNewFolder}
                                newDocument={this.handleNewDocument}
                                uploadFile={this.handleNewFileUpload}
                                create_folder={create_folder}
                                create_document={create_document}
                                upload_file={upload_file}
                                documents={documents}
                                company={company} />
                            </div>

                            <div className="page-aside-right">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="app-search">
                                        <form>
                                            <div className="mb-2 position-relative">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search files..."
                                                />
                                                <span className="mdi mdi-magnify search-icon"></span>
                                            </div>
                                        </form>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-sm btn-light">
                                            <i className="mdi mdi-format-list-bulleted"></i>
                                        </button>
                                        <button type="submit" className="btn btn-sm">
                                            <i className="mdi mdi-view-grid"></i>
                                        </button>
                                        <button type="submit" className="btn btn-sm">
                                            <i className="mdi mdi-information-outline"></i>
                                        </button>
                                    </div>
                                </div>

                                <Route exact path={`/${company.slug}/filemanager/home`} component={DefaultAccess} />
                                <Route exact path={`/${company.slug}/filemanager/myfiles/:document_id`}>
                                    <MyFiles
                                    match={this.props.match}
                                     create_folder={create_folder}
                                     folderCreated={this.folderCreated}
                                      cancleCreatingFolder={this.folderCreated}
                                      create_document={create_document}
                                      documentCreated={this.documentCreated}
                                      cancleCreatingDocument={this.documentCreated}
                                      upload_file={upload_file}
                                      fileUploaded={this.fileUploaded}
                                      cancelFileUpload={this.fileUploaded}
                                      />
                                </Route>
                                <Route exact path={`/${company.slug}/filemanager/task-files/:document_id`}>
                                    <MyFiles
                                    match={this.props.match}
                                     create_folder={create_folder}
                                     folderCreated={this.folderCreated}
                                      cancleCreatingFolder={this.folderCreated}
                                      create_document={create_document}
                                      documentCreated={this.documentCreated}
                                      cancleCreatingDocument={this.documentCreated}
                                      upload_file={upload_file}
                                      fileUploaded={this.fileUploaded}
                                      cancelFileUpload={this.fileUploaded}
                                      />
                                </Route>

                                <Route exact path={`/${company.slug}/filemanager/project-files/:document_id`}>
                                    <MyFiles
                                    match={this.props.match}
                                     create_folder={create_folder}
                                     folderCreated={this.folderCreated}
                                      cancleCreatingFolder={this.folderCreated}
                                      create_document={create_document}
                                      documentCreated={this.documentCreated}
                                      cancleCreatingDocument={this.documentCreated}
                                      upload_file={upload_file}
                                      fileUploaded={this.fileUploaded}
                                      cancelFileUpload={this.fileUploaded}
                                      />
                                </Route>
                                <Route exact path={`/${company.slug}/filemanager/section/:section_id`} component={SectionFiles} />
                                <Route exact path={`/${company.slug}/filemanager/recent`} component={Recent} />
                                <Route exact path={`/${company.slug}/filemanager/all-domains`} component={AllSubDomains} />

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


            </div>

            <RightDrawer title="File Manager" component={<RightSidebar />} />
           </>
        );
    }
}

const mapStateToProps = (state) => ({
    documents: state.files.documents
});

export default connect(mapStateToProps, { closeLeftNav, closeSubLeftNav, selectControlFunction, selectCatalogSection })(Files);
