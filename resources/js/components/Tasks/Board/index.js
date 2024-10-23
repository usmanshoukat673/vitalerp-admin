// @flow
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import PageTitle from '../../sub-components/PageTitle';

import _ from 'lodash';

import TaskItem from './Task';

import { setSelectedTask, setAllProjects, setCompanyUsers, setBackPageURL, setTaskToEdit } from '../../../actions';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

import './Board.scss';
import CreateTask from './CreateTask';
import EditTask from './EditTask';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import RenameColumn from './RenameColumn';
import RightDrawer from '../../../layouts/RightDrawer';
import axiosInstance from '../../../api/api';

const RightSidebar = () => {
    return(
        <div>
            TODO
        </div>
    )
}

// kanban
const Kanban = ({ company, history, projects, setSelectedTask, setAllProjects, setCompanyUsers, setBackPageURL, setTaskToEdit }) => {

    const params = useParams();
    const MySwal = withReactContent(Swal);

    const [karban_state, setKarbanState] = useState({
        todoTasks: [],
        inprogressTasks: [],
        reviewTasks: [],
        waitingTasks: [],
        doneTasks: [],
        totalTasks: 0,
        newTaskModal: false,
        newTask: null,
        tasks: [],
        status: '',
    });

    const [edit_task, setEditTask] = useState({
        task: {},
        open: false
    });

    const [rename_column, setRenameColumn] = useState({
        column: {},
        open: false,
        index: 0,
    });

    const [kanban_columns, setKanbanColumns] = useState([]);

    const [all_documents, setAllDocuments] = useState({
        documents: [],
        loading: false,
        errors: []
    });

    const [due_date_sort, setDueDateSort] = useState('asc');
    const [project_id, setPorojectId] = useState('all');
    const [project_options, setProjectOptions] = useState([
        {
            key: 'all',
            text: `All Projects`,
            value: 'all',
        },
        {
            key: '0',
            text: `Unassigned`,
            value: '0',
        }
    ]);

    const [__todo, set__todo] = useState('TODO');
    const [__inprocess, set__inprocess] = useState('In Progress');
    const [__waiting, set__waiting] = useState('Waiting');
    const [__review, set__review] = useState('Review');
    const [__done, set__done] = useState('Done');

    useEffect(() => {
        setPorojectId(params.selected_project);
    }, [params]);

    const loadProjects = () => {
        axiosInstance.get(`/api/user/projects/all/${company.id}`).then(e => {
            setAllProjects(e.data.projects);
        }).catch(err => {
            if (err.response.status === 401) {
                history.push('/login');
            }
        });

        axiosInstance.get(`/api/user/teams/all-users/${company.id}`).then(e => {
            setCompanyUsers(e.data.users);
        }).catch(err => {
            if (err.response.status === 401) {
                history.push('/login');
            }
        });

        axiosInstance.get(`/api/user/tasks/documents/${company.id}/${company.document.id}`).then(e => {

            setAllDocuments(
                {
                    loading: false,
                    errors: [],
                    documents: e.data.documents
                }
            );
        }).catch(err => {
            if (err.response.status === 500) {
                setAllDocuments(
                    {
                        ...all_documents,
                        loading: false,
                        errors: []
                    }
                );
            }
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }

    useEffect(() => {
        loadProjects();
    }, [company]);

    const getTasks = () => {
        axiosInstance.post(`/api/user/projects/tasks`, {
            project_id: project_id
        }).then(e => {
            setKarbanState({
                tasks: e.data.tasks,
                todoTasks: _.filter(e.data.tasks, (t) => t.status === 'Pending'),
                inprogressTasks: _.filter(e.data.tasks, (t) => t.status === 'Inprogress'),
                reviewTasks: _.filter(e.data.tasks, (t) => t.status === 'Review'),
                doneTasks: _.filter(e.data.tasks, (t) => t.status === 'Done'),
                waitingTasks: _.filter(e.data.tasks, (t) => t.status === 'Waiting'),
                totalTasks: _.size(e.data.tasks),
                newTaskModal: false,
                newTask: null,
            });

            setEditTask({
                task: {},
                open: false
            })
        }).catch(err => {
            if (err.response.status === 401) {
                history.push('/login');
            }
        });

        axiosInstance.get(`/api/user/kanban/get-columns/${project_id}/${company.id}`).then(e => {
            setKanbanColumns(e.data.columns);
        }).catch(err => {
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }

    useEffect(() => {
        getTasks();
    }, [company, project_id]);

    useEffect(() => {
        if(_.size(kanban_columns) > 0)
        {
            const kc = kanban_columns;
            set__todo(kc[0].custom_name ? kc[0].custom_name : kc[0].default_name);
            set__inprocess(kc[1].custom_name ? kc[1].custom_name : kc[1].default_name);
            set__waiting(kc[2].custom_name ? kc[2].custom_name : kc[2].default_name);
            set__review(kc[3].custom_name ? kc[3].custom_name : kc[3].default_name);
            set__done(kc[4].custom_name ? kc[4].custom_name : kc[4].default_name);
        }
    }, [kanban_columns, company, project_id]);

    useEffect(() => {
        if (projects) {
            let options = _.map(projects, (pr, index) => ({
                key: `${pr.id}`,
                text: `${pr.title}`,
                value: `${pr.id}`,
            }));

            options.push({
                key: 'all',
                text: `All Projects`,
                value: 'all',
            });

            options.push({
                key: '0',
                text: `Unassigned`,
                value: '0',
            });

            setProjectOptions(
                _.sortBy(options, ['text'])
            );
        }
    }, [projects]);

    /*
     * Form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            project: yup.string().required(),
            title: yup.string().required(),
            priority: yup.string().required(),
            description: yup.string().required(),
            user: yup.string().required(),
        })
    );

    /*
     * Form methods
     */
    const methods = useForm({ resolver: schemaResolver });
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

    /**
     * Toggles the new task modal
     */
    const toggleNewTaskModal = () => {
        setKarbanState({
            ...karban_state,
            newTaskModal: !karban_state.newTaskModal,
        });
    };

    /**
     * Creates new empty task with given statuss
     */
    const newTask = (status, queue) => {
        // setKarbanState({
        //     ...karban_state,
        //     newTask: {
        //         dueDate: new Date(),
        //         userAvatar: defaultAvatar,
        //         status: status,s
        //         queue: queue,
        //     },
        //     status: status,
        //     newTaskModal: true,
        // });

        let url = `/${company.slug}/workbench/tasks/kanban/${project_id}`;
        setBackPageURL(url);
        history.push(`/${company.slug}/workbench/task/add/${status}`);
    };

    /**
     * When date changes
     * @param {} date
     */
    const handleDateChange = (date) => {
        if (karban_state.newTask) {
            setKarbanState({
                ...karban_state,
                newTask: { ...karban_state.newTask, dueDate: date },
            });
        }
    };

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);
        destClone.splice(droppableDestination.index, 0, removed);
        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;
        return result;
    };

    /**
     * Gets the list
     */
    const getList = (id) => karban_state[id];

    /**
     * On drag end
     */
    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const items = reorder(getList(source.droppableId), source.index, destination.index);
            let localState = { ...karban_state };
            localState[source.droppableId] = items;
            setKarbanState(localState);
        } else {

            const result = move(getList(source.droppableId), getList(destination.droppableId), source, destination);
            const localState = { ...karban_state, ...result };

            setKarbanState(localState);

            saveTaskStatus(draggableId, destination.droppableId);
        }
    };

    const saveTaskStatus = (task_id, droppableId) => {

        // 'Pending','Inprogress','Review','Done','Waiting'
        let status = 'Pending';

        if (droppableId == 'inprogressTasks') {
            status = 'Inprogress';
        }
        else if (droppableId == 'reviewTasks') {
            status = 'Review';
        }
        else if (droppableId == 'doneTasks') {
            status = 'Done';
        }
        else if (droppableId == 'waitingTasks') {
            status = 'Waiting';
        }
        else if (droppableId == 'todoTasks') {
            status = 'Pending';
        }

        axiosInstance.post(`/api/user/tasks/update-status`, {
            task_id: task_id,
            status: status,
        }).then(e => {
        }).catch(err => {
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }

    const handleTaskView = (task) => {
        setSelectedTask(task);
        let url = `/${company.slug}/workbench/tasks/kanban/${project_id}`;
        setBackPageURL(url);
        history.push(`/${company.slug}/workbench/tasks/details/${task.id}`);
    }

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        let url = `/${company.slug}/workbench/tasks/kanban/${project_id}`;
        setBackPageURL(url);
        history.push(`/${company.slug}/workbench/task/modify/${task.id}`);
    }



    /**
     * Handles the new task form submission
     */
    const handleNewTask = (event, values) => {
        const formData = {
            project: values.target['project'].value,
            title: values.target['title'].value,
            priority: values.target['priority'].value,
            description: values.target['description'].value,
            user: values.target['user'].value,
        };
        const newTask = {
            ...karban_state.newTask,
            ...formData,
            id: karban_state.totalTasks + 1,
            dueDate: karban_state.newTask.dueDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
            totalComments: 0,
        };

        var localState = { ...karban_state };
        var tasks = localState[newTask.queue];
        tasks.push(newTask);
        localState[newTask.queue] = tasks;
        localState['newTask'] = {
            dueDate: new Date(),
            userAvatar: '',
            status: '',
            queue: '',
        };
        localState['newTaskModal'] = false;
        localState['totalTasks'] = localState.totalTasks + 1;
        setKarbanState(localState);
    };

    const handleDeleteTask = (task, list) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: 'You are attempting to delete the task.',
            icon: 'warning',
            confirmButtonText: 'Delete',
            showCancelButton: true,
        }).then((e) => {
            if (e.isConfirmed) {
                setKarbanState({
                    ...karban_state,
                    [list]: _.filter(karban_state[list], (t) => t.id !== task.id)
                });

                axiosInstance.post(`/api/user/tasks/delete`, {
                    task_id: task.id
                }).then(e => {
                }).catch(err => {
                    if (err.response.status === 401) {
                        history.push('/login');
                    }
                });
            }
        });
    }

    const toggleEditTaskModal = () => {
        setEditTask({
            task: {},
            open: false,
        });
    };

    const handleProjectChange = (event, { value }) => {

        setPorojectId(value);

        history.push(`/${company.slug}/workbench/tasks/kanban/${value}`);

        // const { errors } = this.state;

        // if (errors.length > 0 && errors[0].hasOwnProperty('project_id')) {
        //     delete errors[0]['project_id'];
        //     this.setState({ errors: errors });
        // }
    }

    const handleSortByPriority = (priority, list) => {

        let sortyBy = 'asc';

        if (priority == 'Low') {
            sortyBy = 'desc';
        }
        else if (priority == 'Medium') {
            sortyBy = 'asc';
        }
        else if (priority == 'High') {
            sortyBy = 'asc';
        }

        setKarbanState({
            ...karban_state,
            [list]: _.orderBy(karban_state[list], ['priority'], sortyBy),
        });
    }

    const handleSortByDuedate = (priority, list) => {
        if (due_date_sort == 'asc') {
            setDueDateSort('desc');

            setKarbanState({
                ...karban_state,
                [list]: _.orderBy(karban_state[list], ['due_date'], 'desc'),
            });
        }
        else {
            setDueDateSort('asc');
            setKarbanState({
                ...karban_state,
                [list]: _.orderBy(karban_state[list], ['due_date'], 'asc'),
            });
        }
    }

    const handleColumnUpdate = (e) => {

        let temp_kanban_columns = JSON.parse(JSON.stringify(kanban_columns));

        temp_kanban_columns[rename_column.index] = e.data.column;

        setKanbanColumns(temp_kanban_columns);

        setRenameColumn(
            {
                column: {},
                open: false,
                index: 0,
            }
        );
    }

    const renameColumn = (index) => {
        setRenameColumn({
            column: kanban_columns[index],
            open: true,
            index: index,
        });
    }

    const closeRenameColumn = (index) => {
        setRenameColumn({
            column: {},
            open: false,
            index: 0,
        })
    }



    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Kanban', path: `/${company.slug}/workbench/tasks/kanban/${project_id}`, active: true },
                ]}
                component={<Dropdown
                    options={project_options}
                    selection
                    onChange={handleProjectChange}
                    value={project_id}
                    placeholder="Project"
                    className='__board__projects__dd'
                />}
            />

            <Row>
                <Col>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="board">
                            {/* todo */}
                            <Droppable droppableId="todoTasks">
                                {(provided, snapshot) => (
                                    <div className="tasks" ref={provided.innerRef}>

                                        <OverlayTrigger
                                            key="bottom-right"
                                            placement="bottom"
                                            overlay={<Tooltip>Rename</Tooltip>}>
                                            <button
                                                className="btn btn-link p-0 text-secondary float-end shadow-none px-0 py-2"
                                                onClick={() => renameColumn(0)}
                                            >
                                                <i className="mdi mdi-application-edit-outline"></i>
                                            </button>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                            key="bottom"
                                            placement="bottom"
                                            overlay={<Tooltip>Add New {__todo} Task</Tooltip>}>
                                            <button
                                                className="btn btn-link p-0 text-secondary float-end shadow-none px-0 py-2"
                                                id="addNewTodo"
                                                onClick={() => newTask('Pending', 'todoTasks')}>
                                                <i className="mdi mdi-plus"></i>
                                            </button>
                                        </OverlayTrigger>

                                        <h5 className="mt-0 task-header">{__todo} ({!_.isEmpty(karban_state) && karban_state.todoTasks.length})</h5>

                                        {!_.isEmpty(karban_state) && karban_state.todoTasks.length === 0 && (
                                            <p className="text-center text-muted pt-2 mb-0">No Tasks</p>
                                        )}

                                        {!_.isEmpty(karban_state) && karban_state.todoTasks.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id + ''} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}>
                                                        <TaskItem
                                                            task={item}
                                                            viewTask={handleTaskView}
                                                            listType={'todoTasks'}
                                                            sortByPriority={handleSortByPriority}
                                                            sortByDuedate={handleSortByDuedate}
                                                            index={index}
                                                            deleteTask={handleDeleteTask}
                                                            editTask={handleEditTask}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            {/* in progress */}
                            <Droppable droppableId="inprogressTasks">
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} className="tasks">
                                        <OverlayTrigger
                                            key="bottom-right"
                                            placement="bottom"
                                            overlay={<Tooltip>Rename</Tooltip>}>
                                            <button
                                                className="btn btn-link p-0 text-secondary float-end shadow-none px-0 py-2"
                                                onClick={() => renameColumn(1)}
                                            >
                                                <i className="mdi mdi-application-edit-outline"></i>
                                            </button>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                            key="bottom"
                                            placement="bottom"
                                            overlay={<Tooltip>Add New {__inprocess} Task</Tooltip>}>
                                            <button
                                                className="btn btn-link p-0 text-secondary float-end shadow-none px-0 py-2"
                                                id="addInprogressTask"
                                                onClick={() => newTask('Inprogress', 'inprogressTasks')}>
                                                <i className="mdi mdi-plus"></i>
                                            </button>
                                        </OverlayTrigger>

                                        <h5 className="mt-0 task-header text-uppercase">
                                            {__inprocess} ({!_.isEmpty(karban_state) && karban_state.inprogressTasks.length})
                                        </h5>
                                        {!_.isEmpty(karban_state) && karban_state.inprogressTasks.length === 0 && (
                                            <p className="text-center text-muted pt-2 mb-0">No Tasks</p>
                                        )}

                                        {!_.isEmpty(karban_state) && karban_state.inprogressTasks.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id + ''} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}>
                                                        <TaskItem
                                                            task={item}
                                                            viewTask={handleTaskView}
                                                            index={index}
                                                            listType={'inprogressTasks'}
                                                            sortByPriority={handleSortByPriority}
                                                            sortByDuedate={handleSortByDuedate}
                                                            deleteTask={handleDeleteTask}
                                                            editTask={handleEditTask}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            {/* waiting */}
                            <Droppable droppableId="waitingTasks">
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} className="tasks">
                                        <OverlayTrigger
                                            key="bottom-right"
                                            placement="bottom"
                                            overlay={<Tooltip>Rename</Tooltip>}>
                                            <button
                                                className="btn btn-link p-0 text-secondary float-end shadow-none px-0 py-2"
                                                onClick={() => renameColumn(2)}
                                            >
                                                <i className="mdi mdi-application-edit-outline"></i>
                                            </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            key="bottom"
                                            placement="bottom"
                                            overlay={<Tooltip>Add New {__waiting} Task</Tooltip>}>
                                            <button
                                                className="btn btn-link p-0 text-secondary float-end shadow-none px-0 py-2"
                                                id="addNewWaiting"
                                                onClick={() => newTask('Waiting', 'waitingTasks')}>
                                                <i className="mdi mdi-plus"></i>
                                            </button>
                                        </OverlayTrigger>

                                        <h5 className="mt-0 task-header text-uppercase">
                                            {__waiting} ({!_.isEmpty(karban_state) && karban_state.waitingTasks.length})
                                        </h5>
                                        {!_.isEmpty(karban_state) && karban_state.waitingTasks.length === 0 && (
                                            <p className="text-center text-muted pt-2 mb-0">No Tasks</p>
                                        )}

                                        {!_.isEmpty(karban_state) && karban_state.waitingTasks.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id + ''} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}>
                                                        <TaskItem
                                                            task={item}
                                                            viewTask={handleTaskView}
                                                            listType={'waitingTasks'}
                                                            index={index}
                                                            sortByPriority={handleSortByPriority}
                                                            sortByDuedate={handleSortByDuedate}
                                                            deleteTask={handleDeleteTask}
                                                            editTask={handleEditTask}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            {/* review */}
                            <Droppable droppableId="reviewTasks">
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} className="tasks">
                                        <OverlayTrigger
                                            key="bottom-right"
                                            placement="bottom"
                                            overlay={<Tooltip>Rename</Tooltip>}>
                                            <button
                                                className="btn btn-link p-0 text-secondary float-end shadow-none px-0 py-2"
                                                onClick={() => renameColumn(3)}
                                            >
                                                <i className="mdi mdi-application-edit-outline"></i>
                                            </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            key="bottom"
                                            placement="bottom"
                                            overlay={<Tooltip>Add New {__review} Task</Tooltip>}>
                                            <button
                                                className="btn btn-link p-0 text-secondary float-end shadow-none px-0 py-2"
                                                id="addReviewTask"
                                                onClick={() => newTask('Review', 'reviewTasks')}>
                                                <i className="mdi mdi-plus"></i>
                                            </button>
                                        </OverlayTrigger>

                                        <h5 className="mt-0 task-header text-uppercase">
                                            {__review} ({!_.isEmpty(karban_state) && karban_state.reviewTasks.length})
                                        </h5>
                                        {!_.isEmpty(karban_state) && karban_state.reviewTasks.length === 0 && (
                                            <p className="text-center text-muted pt-2 mb-0">No Tasks</p>
                                        )}

                                        {!_.isEmpty(karban_state) && karban_state.reviewTasks.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id + ''} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}>
                                                        <TaskItem
                                                            task={item}
                                                            viewTask={handleTaskView}
                                                            listType={'reviewTasks'}
                                                            index={index}
                                                            sortByPriority={handleSortByPriority}
                                                            sortByDuedate={handleSortByDuedate}
                                                            deleteTask={handleDeleteTask}
                                                            editTask={handleEditTask}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            {/* done */}
                            <Droppable droppableId="doneTasks">
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} className="tasks">
                                        <OverlayTrigger
                                            key="bottom-right"
                                            placement="bottom"
                                            overlay={<Tooltip>Rename</Tooltip>}>
                                            <button
                                                className="btn btn-link p-0 text-secondary float-end shadow-none px-0 py-2"
                                                onClick={() => renameColumn(4)}
                                            >
                                                <i className="mdi mdi-application-edit-outline"></i>
                                            </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            key="bottom"
                                            placement="bottom"
                                            overlay={<Tooltip>Add New {__done} Task</Tooltip>}>
                                            <button
                                                className="btn btn-link p-0 text-secondary float-end shadow-none px-0 py-2"
                                                id="addNewDone"
                                                onClick={() => newTask('Done', 'doneTasks')}>
                                                <i className="mdi mdi-plus"></i>
                                            </button>
                                        </OverlayTrigger>

                                        <h5 className="mt-0 task-header text-uppercase">
                                            {__done} ({!_.isEmpty(karban_state) && karban_state.doneTasks.length})
                                        </h5>
                                        {!_.isEmpty(karban_state) && karban_state.doneTasks.length === 0 && (
                                            <p className="text-center text-muted pt-2 mb-0">No Tasks</p>
                                        )}

                                        {!_.isEmpty(karban_state) && karban_state.doneTasks.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id + ''} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}>
                                                        <TaskItem
                                                            task={item}
                                                            viewTask={handleTaskView}
                                                            listType={'doneTasks'}
                                                            index={index}
                                                            sortByPriority={handleSortByPriority}
                                                            sortByDuedate={handleSortByDuedate}
                                                            deleteTask={handleDeleteTask}
                                                            editTask={handleEditTask}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </DragDropContext>
                </Col>
            </Row>

            {/* new task model */}

            {
                karban_state.newTaskModal && <CreateTask open={karban_state.newTaskModal} status={karban_state.status} newTaskAdded={getTasks} close={toggleNewTaskModal} />
            }
            {
                edit_task.open && <EditTask task={edit_task.task} open={edit_task.open} newTaskAdded={getTasks} close={toggleEditTaskModal} all_documents={all_documents.documents} />
            }
            {
                rename_column.open && <RenameColumn column={rename_column.column} open={rename_column.open} columnRenamed={handleColumnUpdate} close={closeRenameColumn} />
            }

            {
                /**
                 karban_state.newTask && (
                <Modal show={!_.isEmpty(karban_state) && karban_state.newTaskModal} onHide={toggleNewTaskModal} size="lg" centered>
                    <Modal.Header closeButton>
                        <h4 className="modal-title">Create New Task</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit(handleNewTask)} className="p-2">
                            <FormInput
                                name="project"
                                label="Project"
                                type="select"
                                containerClass="mb-3"
                                className="form-select form-control-light"
                                register={register}
                                key="project"
                                errors={errors}
                                control={control}>
                                <option>Select</option>
                                <option>Hyper</option>
                                <option>CRM</option>
                                <option>iOS App</option>
                            </FormInput>

                            <Row>
                                <Col md={8}>
                                    <FormInput
                                        name="title"
                                        label="Title"
                                        placeholder="Enter title"
                                        type="text"
                                        containerClass="mb-3"
                                        className="form-control form-control-light"
                                        register={register}
                                        key="title"
                                        errors={errors}
                                        control={control}
                                    />
                                </Col>
                                <Col md={4}>
                                    <FormInput
                                        name="priority"
                                        label="Priority"
                                        type="select"
                                        containerClass="mb-3"
                                        className="form-select form-control-light"
                                        register={register}
                                        key="priority"
                                        errors={errors}
                                        control={control}>
                                        <option>Select</option>
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </FormInput>
                                </Col>
                            </Row>

                            <FormInput
                                name="description"
                                label="Description"
                                type="textarea"
                                containerClass="mb-3"
                                className="form-control form-control-light"
                                rows="3"
                                register={register}
                                key="description"
                                errors={errors}
                                control={control}
                            />

                            <Row>
                                <Col md={6}>
                                    <FormInput
                                        name="user"
                                        label="Assign To"
                                        type="select"
                                        containerClass="mb-3"
                                        className="form-select form-control-light"
                                        register={register}
                                        key="user"
                                        errors={errors}
                                        control={control}>
                                        <option>Select</option>
                                        <option>Coderthemes</option>
                                        <option>Robert Carlile</option>
                                        <option>Louis Allen</option>
                                        <option>Sean White</option>
                                        <option>Riley Steele</option>
                                        <option>Zak Turnbull</option>
                                    </FormInput>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="form-label">Due Date</label> <br />
                                        <HyperDatepicker
                                            hideAddon={true}
                                            dateFormat="yyyy-MM-dd"
                                            value={karban_state.newTask.dueDate}
                                            onChange={(date) => {
                                                handleDateChange(date);
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <div className="text-end">
                                <Button variant="light" type="button" className="me-1" onClick={toggleNewTaskModal}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit">
                                    Create
                                </Button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>

            )
        */
            }

            <RightDrawer title="Kanban" component={<RightSidebar />} />
        </>
    );
};

const mapStateToProps = (state) => ({
    projects: state.projects.projects,
});

export default withRouter(connect(mapStateToProps, { setSelectedTask, setAllProjects, setCompanyUsers, setBackPageURL, setTaskToEdit })(Kanban));
