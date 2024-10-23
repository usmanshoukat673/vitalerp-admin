// @flow
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';

import { connect } from 'react-redux';
import { clearUser, clearToken, setCompanyUsers, clearPWDRotation, setSelectedProject } from '../../../actions';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
// components
import PageTitle from '../../sub-components/PageTitle';
import ProjectAttachments from './ProjectAttachments';

import ViewProject from './ViewProject';
import ProjectComments from './ProjectComments';
import axiosInstance from '../../../api/api';

const ProejctDetails = ({previewProject, token, company, setSelectedProject}) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleNewDocs = documents => {
        let the_project = JSON.parse(JSON.stringify(previewProject));
        the_project.documents = documents;
        setSelectedProject(the_project);
    }

    const handleCreated = comment => {
        let the_project = JSON.parse(JSON.stringify(previewProject));
        the_project.comments.push(comment);
        the_project.total_comments = the_project.total_comments + 1;
        setSelectedProject(the_project);
    }

    const newCommentAdded = number => {
        let the_project = JSON.parse(JSON.stringify(previewProject));
        the_project.total_comments = the_project.total_comments + number;
        setSelectedProject(the_project);
    }

    const handleUpload = (new_files) => {

        setErrors([]);
        setLoading(true);

        const formData = new FormData();

        formData.append('comp_id', company.id);
        formData.append('project_id', previewProject.id);
        formData.append('project_folder_id', company.project_folder.id);

        if(_.size(new_files) > 0)
        {
            _.forEach(new_files, (file, index) => {
                formData.append(`file_${index}`, file);
            });
        }


        axiosInstance.post('/api/user/projects/additional/attachments',formData)
            .then(e => {
                handleNewDocs(e.data.documents);
                setErrors([]);
                setLoading(false);
                NotificationManager.success('New Project attachements has been successuflly uploaded!', 'Success');
            })
            .catch(err => {
                if (err.response.status === 500) {
                    setErrors([]);
                    setLoading(false);
                }
                if (err.response.status === 422) {
                    setLoading(false);
                    setErrors(errors.concat(err.response.data.errors));
                }
            });
    }

    return (
        <div className='__Details'>
            <PageTitle
                breadCrumbItems={[
                    { label: 'WorkBench', path: `/${company.slug}/workbench/prokects/list` },
                    { label: 'Project Detail', path: '/apps/prokects/details', active: true },
                ]}
                title={previewProject.title}
            />
            <Row>
                <Col xxl={8} xl={7}>
                    <ViewProject project={previewProject} />
                    <ProjectComments comments={previewProject.comments} handleCreated={handleCreated} newCommentAdded={newCommentAdded} project={previewProject} />
                </Col>
                <Col xxl={4} xl={5}>
                    <ProjectAttachments handleUpload={handleUpload} token={token} documents={previewProject.documents} />
                </Col>
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => ({
    previewProject: state.projects.project,
});

export default withRouter(connect(mapStateToProps, {clearUser, clearToken, setCompanyUsers, clearPWDRotation, setSelectedProject})(ProejctDetails));
