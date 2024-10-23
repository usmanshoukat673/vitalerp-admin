import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import TaskSection from '../../Tasks/List/TaskSection';
import { useDispatch, useSelector } from 'react-redux';
import { clearPWDRotation, clearToken, clearUser, setBackPageURL, setSelectedTask, showRightSidebar, toggleTslAddEModel } from '../../../actions';
import { deleteStore } from '../../../store/localStorage';
import { withRouter } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../../../api/api';

const ProjectTasks = ({ project, history }) => {

    const { company, tsk_edit_emodel, tsk_add_emodel } = useSelector((state) => ({
        company: state.orgs.company,
        tsk_edit_emodel: state.projects.tsk_edit_emodel,
        tsk_add_emodel: state.projects.tsk_add_emodel
    }));

    const [loading, setLoading] = useState(false);
    const [todays_tasks, setTodaysTasks] = useState([]);
    const [this_weeks_tasks, setThisWeekTasks] = useState([]);
    const [next_weeks_tasks, setNextWeekTasks] = useState([]);
    const [dues_tasks, setDueTasks] = useState([]);
    const [upcomingTask, setUpcomingTasks] = useState([]);

    const totalTasks = () => {
        return _.size(todays_tasks) + _.size(this_weeks_tasks) + _.size(next_weeks_tasks) + _.size(dues_tasks) + _.size(upcomingTask);
    }

    const dispatch = useDispatch();

    const handleSelectTask = (task) => {
        // dispatch(setSelectedTask(task));
        // let url = `/${company.slug}/projects/details/${project.id}`;
        // dispatch(setBackPageURL(url));
    };

    const loadTasks = () => {
        setLoading(true);
        axiosInstance.get(`/api/user/projects/filtered-tasks/${company.id}/${project.id}`).then(e => {
            setTodaysTasks(e.data.todays);
            setThisWeekTasks(e.data.this_weeks);
            setNextWeekTasks(e.data.next_weeks);
            setDueTasks(e.data.dues);
            setUpcomingTasks(e.data.upcomming);

            if (_.size(e.data.todays) > 0) {
                return dispatch(setSelectedTask(e.data.todays[0]));
            }
            else if (_.size(e.data.this_weeks) > 0) {
                return dispatch(setSelectedTask(e.data.this_weeks[0]));
            }
            else if (_.size(e.data.next_weeks) > 0) {
                return dispatch(setSelectedTask(e.data.next_weeks[0]));
            }
            else if (_.size(e.data.upcomming) > 0) {
                return dispatch(setSelectedTask(e.data.upcomming[0]));
            }
            else if (_.size(e.data.dues) > 0) {
                return dispatch(setSelectedTask(e.data.dues[0]));
            }

        }).catch(err => {
            if (err.response.status === 401) {
                deleteStore();
                clearUser();
                clearToken();
                clearPWDRotation();
                history.push('/login');
            }
        });
    }

    useEffect(() => {
        if(tsk_edit_emodel === false){
            loadTasks();
        }
    }, [tsk_edit_emodel]);

    useEffect(() => {
        if(tsk_add_emodel === false){
            loadTasks();
        }
    }, [tsk_add_emodel]);

    // load project tasks 
    useEffect(() => {
        loadTasks();
    }, [company]);

    const handleNewTask = () => {
        dispatch(toggleTslAddEModel(true));
    }

    return (
        <Card className='__projects__tasks'>
            <Card.Header className='__projects__tasks__header'>
                <h4 className="my-1">Tasks ({totalTasks()})</h4>

                <Button onClick={handleNewTask} variant="contained" color='secondary' size="small" startIcon={<AddIcon />}>
                    New Task
                </Button>
            </Card.Header>
            <Card.Body>

                {/* tasks */}
                {
                    _.size(dues_tasks) > 0 && <div className="mt-2">
                        <TaskSection title="Overdue" tasks={dues_tasks} ></TaskSection>
                    </div>
                }

                <div className="mt-2">
                    <TaskSection title="Today" tasks={todays_tasks} ></TaskSection>
                </div>
                <div className="mt-2">
                    <TaskSection title="This Week" tasks={this_weeks_tasks} ></TaskSection>
                </div>
                <div className="mt-2">
                    <TaskSection title="Next Week" tasks={next_weeks_tasks} ></TaskSection>
                </div>
                <div className="mt-2">
                    <TaskSection title="Scheduled" tasks={upcomingTask} ></TaskSection>
                </div>

            </Card.Body>
        </Card>
    );
};

export default withRouter(ProjectTasks);
