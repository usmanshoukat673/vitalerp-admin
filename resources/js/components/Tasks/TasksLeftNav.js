import React, { Component } from 'react';
import _ from 'lodash';
import './TasksLeftNav.scss';
import { withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { Dropdown, ButtonGroup, ProgressBar } from 'react-bootstrap';
import { AiOutlineHome } from 'react-icons/ai';
import { setBackPageURL } from '../../actions';
import { connect } from 'react-redux';

class TasksLeftNav extends Component {

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    newTask = () => {
        const { company, history, setBackPageURL } = this.props;
      let url = `/${company.slug}/workbench/list`;
      setBackPageURL(url);
      history.push(`/${company.slug}/workbench/task/add/Pending`);
    }

    newProject = () => {
      const { company, history, setBackPageURL } = this.props;
      let url = `/${company.slug}/workbench/list`;
      setBackPageURL(url);
      history.push(`/${company.slug}/projects/create`);
    }

    render() {
        const { company, documents, newFolder, newDocument, uploadFile, create_folder,
            create_document,
            upload_file } = this.props;

        return (
            <div className="__TasksLeftNav">
                <div>
                    <ButtonGroup className="d-block mb-2">
                        <Dropdown>
                            <Dropdown.Toggle className="btn btn-success dropdown-toggle w-100">
                                <i className="mdi mdi-plus"></i> Create New{' '}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>

                                {
                                    /**
                                     * <Dropdown.Item>
                                    <i className="mdi mdi-file-plus-outline me-1"></i> File
                                </Dropdown.Item> BiTask
                                     */
                                }

                                <Dropdown.Item onClick={this.newProject}>
                                    <i className="mdi mdi-file-document me-1"></i> Project
                                </Dropdown.Item>
                                <Dropdown.Item onClick={this.newTask}>
                                    <i className="mdi mdi-folder-plus-outline me-1"></i> Task
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ButtonGroup>

                    <div className="email-menu-list mt-3">
                        <Link to={`/${company.slug}/workbench/projects/list`}>
                            <AiOutlineHome className='align-middle font-18 me-2' /> All Projects
                        </Link>
                        <Link to={`/${company.slug}/workbench/list`}>
                            <AiOutlineHome className='align-middle font-18 me-2' /> All Tasks
                        </Link>
                        <Link to="/apps/file">
                            <i className="mdi mdi-share-variant font-18 align-middle me-2"></i>
                            Share with me
                        </Link>
                        <Link to="/apps/file">
                            <i className="mdi mdi-star-outline font-18 align-middle me-2"></i>
                            Following
                        </Link>
                        <Link to="/apps/file">
                            <i className="mdi mdi-delete font-18 align-middle me-2"></i>Deleted Tasks
                        </Link>
                    </div>
                </div>

                <div className="mt-5">
                    <h4>
                        <span className="badge rounded-pill p-1 px-2 badge-secondary-lighten">FREE</span>
                    </h4>
                    <h6 className="text-uppercase mt-3">Storage</h6>
                    <ProgressBar variant="success" now={46} className="my-2 progress-sm" />
                    <p className="text-muted font-13 mb-0">7.02 GB (46%) of 15 GB used</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

export default withRouter(connect(mapStateToProps, { setBackPageURL })(TasksLeftNav));
