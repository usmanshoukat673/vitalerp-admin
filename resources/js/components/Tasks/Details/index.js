// @flow
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';

import { connect } from 'react-redux';
import { clearUser, clearToken, setCompanyUsers, clearPWDRotation, setSelectedTask, setTaskToEdit, setBackPageURL } from '../../../actions';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

// components
import PageTitle from '../../sub-components/PageTitle';

import TaskAttachments from './TaskAttachments';
import './Details.scss';

import ViewTask from './ViewTask';
import TaskComments from './TaskComments';
import ViewListTypes from './ViewListTypes';
import axiosInstance from '../../../api/api';

// TaskDetails
const TaskDetails = ({ previewTask, token, company, title_bar, setSelectedTask, setTaskToEdit, history, setBackPageURL }) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleNewDocs = documents => {
        let the_task = JSON.parse(JSON.stringify(previewTask));
        the_task.documents = documents;
        setSelectedTask(the_task);
    }

    const handleCreated = comment => {
        let the_task = JSON.parse(JSON.stringify(previewTask));
        the_task.comments.push(comment);
        the_task.total_comments = the_task.total_comments + 1;
        setSelectedTask(the_task);
    }

    const newCommentAdded = number => {
        let the_task = JSON.parse(JSON.stringify(previewTask));
        the_task.total_comments = the_task.total_comments + number;
        setSelectedTask(the_task);
    }

    const handleUpload = (new_files) => {

        setErrors([]);
        setLoading(true);

        const formData = new FormData();

        formData.append('comp_id', company.id);
        formData.append('task_id', previewTask.id);
        formData.append('task_folder_id', company.task_folder.id);

        if (_.size(new_files) > 0) {
            _.forEach(new_files, (file, index) => {
                formData.append(`file_${index}`, file);
            });
        }

        axiosInstance.post('/api/user/tasks/additional/attachments', formData)
            .then(e => {
                handleNewDocs(e.data.documents);
                setErrors([]);
                setLoading(false);
                NotificationManager.success('New Task attachements has been successuflly uploaded!', 'Success');
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

    const handleTaskChange = (the_task) => {
        setSelectedTask(the_task);
    }

    const handleEditTask = () => {
        setTaskToEdit(previewTask);
        let url = `/${company.slug}/workbench/tasks/details/${previewTask.id}`;
        history.push(`/${company.slug}/workbench/task/modify/${previewTask.id}?back=${url}`);
    }


    return (
        <div className='__Details'>
            {
                title_bar && <PageTitle
                    breadCrumbItems={[
                        { label: 'WorkBench', path: `/${company.slug}/workbench/list` },
                        { label: 'Task Detail', path: '/apps/tasks/details', active: true },
                    ]}
                    title={previewTask.title}
                />
            }

            <Row>
                <Col xxl={8} xl={7}>
                    <ViewTask task={previewTask} editTask={handleEditTask} />
                    <ViewListTypes task={previewTask} handle_change={handleTaskChange} />
                    <TaskComments 
                        comments={previewTask.comments} 
                        handleCreated={handleCreated} 
                        newCommentAdded={newCommentAdded} 
                        task={previewTask} 
                        token={token}
                     />
                </Col>
                <Col xxl={4} xl={5}>
                    <TaskAttachments handleUpload={handleUpload} token={token} documents={previewTask.documents} />
                </Col>
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => ({
    previewTask: state.tasks.task,
});

export default withRouter(connect(mapStateToProps, { clearUser, clearToken, setCompanyUsers, clearPWDRotation, setSelectedTask, setTaskToEdit, setBackPageURL })(TaskDetails));
