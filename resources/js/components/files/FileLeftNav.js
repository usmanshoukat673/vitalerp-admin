import React, { Component } from 'react';
import _ from 'lodash';
import './FileLeftNav.scss';
import { VscFileSubmodule } from "react-icons/vsc";
import { NavLink, withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { Row, Col, Card, Dropdown, ButtonGroup, ProgressBar } from 'react-bootstrap';
import { AiOutlineHome } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';


class FileLeftNav extends Component {

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    navigateToAllFiles = () => {
        const {company, history} = this.props;
        history.push(`/${company.slug}/filemanager/myfiles/${company.document.enc_id}`);
    }

    render() {
        const { company, documents, newFolder, newDocument, uploadFile, create_folder,
        create_document,
        upload_file } = this.props;

        return (
            <div className="__FileLeftNav">
            <div>
                <ButtonGroup className="d-block mb-2">
                    <Dropdown>
                        <Dropdown.Toggle className="btn btn-success dropdown-toggle w-100">
                            <i className="mdi mdi-plus"></i> Create New{' '}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={newFolder} disabled={create_folder}>
                                <i className="mdi mdi-folder-plus-outline me-1"></i> Folder
                            </Dropdown.Item>
                            {
                                /**
                                 * <Dropdown.Item>
                                <i className="mdi mdi-file-plus-outline me-1"></i> File
                            </Dropdown.Item>
                                 */
                            }
                            <Dropdown.Item onClick={newDocument} disabled={create_document}>
                                <i className="mdi mdi-file-document me-1"></i> Document
                            </Dropdown.Item>
                            <Dropdown.Item onClick={uploadFile} disabled={upload_file}>
                                <i className="mdi mdi-upload me-1"></i> Choose File
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </ButtonGroup>

                <div className="email-menu-list mt-3">
                    <Link to={`/${company.slug}/filemanager/home`}>
                        <AiOutlineHome className='align-middle font-18 me-2'/> Home
                    </Link>
                    <Link to={`/${company.slug}/filemanager/myfiles/${company.document.enc_id}`}>
                        <i className="mdi mdi-folder-outline font-18 align-middle me-2"></i>All Files
                    </Link>
                    <Link to={`/${company.slug}/filemanager/all-domains`}>
                        <i className="mdi mdi-folder font-18 align-middle me-2"></i>All Domains
                    </Link>
                    <Link to={`/${company.slug}/filemanager/task-files/${company.task_folder.enc_id}`}>
                        <BiTask className='font-18 align-middle me-2' /> Task Files
                    </Link>
                    <Link to={`/${company.slug}/filemanager/project-files/${company.project_folder.enc_id}`}>
                        <BiTask className='font-18 align-middle me-2' /> Project Files
                    </Link>
                    <Link to={`/${company.slug}/filemanager/project-files/${company.emails_folder.enc_id}`}>
                        <BiTask className='font-18 align-middle me-2' /> Email Attachments
                    </Link>
                    <Link to={'#'}>
                        <i className="mdi mdi-share-variant font-18 align-middle me-2"></i>
                        Share with me
                    </Link>
                    <Link to={`/${company.slug}/filemanager/recent`}>
                        <i className="mdi mdi-clock-outline font-18 align-middle me-2"></i>
                        Recent
                    </Link>
                    <Link to={'#'}>
                        <i className="mdi mdi-star-outline font-18 align-middle me-2"></i>
                        Following
                    </Link>
                    <Link to={'#'}>
                        <i className="mdi mdi-delete font-18 align-middle me-2"></i>Deleted Files
                    </Link>
                </div>
            </div>

            {/* <div className="mt-5">
                <h4>
                    <span className="badge rounded-pill p-1 px-2 badge-secondary-lighten">FREE</span>
                </h4>
                <h6 className="text-uppercase mt-3">Storage</h6>
                <ProgressBar variant="success" now={46} className="my-2 progress-sm" />
                <p className="text-muted font-13 mb-0">7.02 GB (46%) of 15 GB used</p>
            </div> */}
        </div>
        );
    }
}

export default withRouter(FileLeftNav);
