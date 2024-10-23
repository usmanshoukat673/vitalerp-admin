import React, { useEffect, useState, Suspense } from 'react';
import _ from 'lodash';
import './WorkBench.scss';
import { connect } from 'react-redux';
import { closeLeftNav, closeSubLeftNav, selectControlFunction, selectCatalogSection } from '../../actions';
import { Route } from 'react-router-dom';

import TasksLeftNav from './TasksLeftNav';

import { Row, Col, Card } from 'react-bootstrap';

import TaskList from './List/';
import Task from './Add/Task';
import TaskDetails from './Details';

import ProjectDetails from '../Projects/Details';
import ProjectsList from '../Projects/List/index';
import RightDrawer from '../../layouts/RightDrawer';
import PageTitle from '../sub-components/PageTitle';

const Kanban = React.lazy(() => import('../Tasks/Board'));

const RightSidebar = () => {
    return(
        <div>
            TODO
        </div>
    )
}


const LoadComponent = ({ component: Component, token, company }) => (
    <Suspense fallback={loading()}>
        <Component token={token} company={company} />
    </Suspense>
);

const WorkBench = ({ token, company, users }) => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [document, setDocument] = useState('');
    const [documents, setDocuments] = useState([]);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [creating_folder, setCreatingFolder] = useState(false);
    const [create_folder, setCreateFolder] = useState(false);
    const [create_document, setCreateDocument] = useState(false);
    const [creating_document, setCreatingDocument] = useState(false);
    const [upload_file, setUploadFile] = useState(false);
    const [document_id, setDocumentId] = useState(false);
    const [uploading_file, setUploadingFile] = useState(false);
    const [open_pdf_document, setOpenPdfDocument] = useState(false);
    const [open_ms_document, setOpenMsDocument] = useState(false);
    const [active_document, setActiveDocument] = useState({});
    const [resent_docs, setResentDocs] = useState([]);
    const [sub_sections, setSubSections] = useState([]);

    useEffect(() => {
        loadDirectory();
    }, []);

    const loadDirectory = () => {

        // setState({ loading: true });

        // axiosInstance.get(`/api/user/cjfm/list/${company.id}/${document_id}`).then(e => {
        //     setState({ loading: false, documents: e.data.documents, document: e.data.document });

        //     props.setFilesDocuments(e.data.documents);

        //     if (e.data.document.parent != null) {
        //         setState({ breadcrumbs: _.reverse(e.data.breadcrumbs) });
        //     }
        //     // set documents here into redux
        // }).catch(err => {
        //     if (err.response.status === 500) {
        //         setState({ errors: [], loading: false });
        //     }
        //     if (err.response.status === 401) {
        //         props.clearUser();
        //         props.clearToken();
        //         props.history.push('/login');
        //     }
        // });

    };

    const handleNewFolder = () => {
        setCreateFolder(true);
    }

    const handleNewDocument = () => {

        setCreateDocument(true);
    }

    const handleNewFileUpload = () => {

        setUploadFile(true);
    }

    const folderCreated = () => {

        setCreateFolder(false);
    }

    const documentCreated = () => {

        setCreateDocument(false);
    }

    const fileUploaded = () => {
        setUploadFile(false);
    }

    return (
        <>
            <div className="__WorkBench">
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Dashboard', path: `/${company.slug}/compliance-stack` },
                        { label: 'WorkBench', path: `/${company.slug}/v2/files/${company.document.enc_id}`, active: true },
                    ]}
                    title={'WorkBench'}
                />

                <Row className='main__files'>
                    <Col>
                        <Card className='the__card'>
                            <Card.Body>
                                <div className="page-aside-left">
                                    <TasksLeftNav
                                        newFolder={handleNewFolder}
                                        newDocument={handleNewDocument}
                                        uploadFile={handleNewFileUpload}
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
                                                        placeholder="Search..."
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

                                    <Route exact path={`/${company.slug}/workbench/projects/list`}>
                                        <ProjectsList token={token} company={company} />
                                    </Route>

                                    <Route exact path={`/${company.slug}/workbench/projects/details/:project_id`}>
                                        <ProjectDetails token={token} company={company} />
                                    </Route>

                                    <Route exact path={`/${company.slug}/workbench/list`}>
                                        <TaskList token={token} company={company} />
                                    </Route>

                                    <Route exact path={`/${company.slug}/workbench/list/add/:status`} component={Task} />
                                    <Route exact path={`/${company.slug}/workbench/list/details/:task_id`}>
                                        <TaskDetails token={token} company={company} title_bar={true} />
                                    </Route>


                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

            <RightDrawer title="Workbench" component={<RightSidebar />} />
        </>
    );
}

const mapStateToProps = (state) => ({
    documents: state.files.documents,
    users: state.orgs.company_users,
});

export default connect(mapStateToProps, { closeLeftNav, closeSubLeftNav, selectControlFunction, selectCatalogSection })(WorkBench);
