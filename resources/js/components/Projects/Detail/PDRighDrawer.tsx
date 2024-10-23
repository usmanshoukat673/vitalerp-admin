import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Slide, Box, Drawer, Divider, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { hideRightSidebar, setFieldTypeToAdd, setSelectedTask, setTaskToEdit, toggleTaskEditEModel, toggleTslAddEModel, setProjectRightView } from '../../../actions';
import DHeader from '../../compliance/Drawer/DHeader';
import { Card, Col, Row } from 'react-bootstrap';
import getInitial from '../../../utils/getInitial';
import ShowCurrentTZDateMoment from '../../../utils/showCurrentTZDateMoment';

import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CommentForm from '../../Tasks/Details/CommentForm';
import DownloadDocumentButton from '../DownloadDocumentButton';
import DeleteDocumentButton from '../DeleteDocumentButton';
import prettyBytes from 'pretty-bytes';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { RightDrawerWidth } from '../../..';
import ModifyTask from '../../Tasks/Details/ModifyTask';
import AddNewTask from '../../Tasks/Board/AddNewTask.tsx';
import ProjectAttachments from '../Details/ProjectAttachments';
import ProgressChart from './ProgressChart';
import NewColumn from '../../subjects/NewColumn.tsx';
import EditColumn from '../../subjects/EditColumn.tsx';
import DeleteColumn from '../../subjects/DeleteColumn.tsx';

export default function PDRighDrawer({ title, documents, handleUpload }) {

  const dispatch = useDispatch();

  const [editorState, setEditorState] = useState();

  const { right_bar_view, showRightSidebar, task, tsk_edit_emodel, tsk_add_emodel, token, field_type_to_add } = useSelector((state) => ({
    token: state.token.activeToken,
    field_type_to_add: state.projects.field_type_to_add,
    showRightSidebar: state.leftnav.showRightSidebar,
    task: state.tasks.task,
    tsk_edit_emodel: state.projects.tsk_edit_emodel,
    tsk_add_emodel: state.projects.tsk_add_emodel,
    right_bar_view: state.projects.right_bar_view
  }));

  const theme = useTheme();

  const handleDrawerClose = () => {
    dispatch(hideRightSidebar());
    dispatch(setFieldTypeToAdd({}));
    dispatch(setProjectRightView('task'));
  };

  useEffect(() => {
    const html = (task.description != null ? `<p class="m-0">${task.description}</p>` : '');
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [task]);

  /**
    * On editor body change
    */
  const onEditorStateChange = (editorStates) => {
    setEditorState(editorStates);
  };

  /*
   * mark completd on selected task
   */
  const markCompleted = (e) => setCompleted(e.target.checked);

  const handleCreated = comment => {
    let the_task = JSON.parse(JSON.stringify(task));
    the_task.comments.push(comment);
    the_task.total_comments = the_task.total_comments + 1;
    dispatch(setSelectedTask(the_task));
  }

  const handleOnDelete = task_document => {
    let the_task = JSON.parse(JSON.stringify(task));

    _.remove(the_task.documents, (doc) => {
      return doc.id === task_document.id
    });
    dispatch(setSelectedTask(the_task));
  }

  const initEditModel = () => {
    dispatch(setTaskToEdit(task));
    dispatch(toggleTaskEditEModel(true));
  }

  if (right_bar_view == '') return 'Loading...!';

  if (right_bar_view == 'add_column') {
    return (
      <Drawer
        sx={{
          width: RightDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: RightDrawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={showRightSidebar}
        className="a_custom_drawer"
      >

        <DHeader title={title} close={handleDrawerClose} />

        <NewColumn />
      </Drawer>
    );
  }

  if (right_bar_view == 'edit_column') {
    return (
      <Drawer
        sx={{
          width: RightDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: RightDrawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={showRightSidebar}
        className="a_custom_drawer"
      >

        <DHeader title={title} close={handleDrawerClose} />

        <EditColumn />
      </Drawer>
    );
  }

  if (right_bar_view == 'delete_column') {
    return (
      <Drawer
        sx={{
          width: RightDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: RightDrawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={showRightSidebar}
        className="a_custom_drawer"
      >

        <DHeader title={title} close={handleDrawerClose} />

        <DeleteColumn />
      </Drawer>
    );
  }

  return (
    <>
      {
        tsk_edit_emodel && <div className='custom_right_to_left_slider'>
          <Slide direction="left" in={tsk_edit_emodel}>
            <Box className='crtks__container' sx={{ height: '100vh', background: '#fff', width: '60%', position: 'fixed', pt: '15px', pl: '15px', right: '350px', overflow: 'auto' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => dispatch(toggleTaskEditEModel(false))}>
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: '10px' }} variant='h5' gutterBottom>Modify Task</Typography>
              </Box>

              <Divider />

              {
                !_.isEmpty(task) && <ModifyTask />
              }

            </Box>
          </Slide>
        </div>
      }

      {
        tsk_add_emodel && <div className='custom_right_to_left_slider'>
          <Slide direction="left" in={tsk_add_emodel}>
            <Box className='crtks__container' sx={{ height: '100vh', background: '#fff', width: '60%', position: 'fixed', pt: '15px', pl: '15px', right: '350px', overflow: 'auto' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => dispatch(toggleTslAddEModel(false))}>
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: '10px' }} variant='h5' gutterBottom>Create New Task</Typography>
              </Box>

              <Divider />

              {
                <AddNewTask />
              }

            </Box>
          </Slide>
        </div>
      }

      <Drawer
        sx={{
          width: RightDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: RightDrawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={showRightSidebar}
        className="a_custom_drawer"
      >

        <DHeader title={title} close={handleDrawerClose} />

        {
          (!_.isEmpty(task) && _.isEmpty(field_type_to_add)) && <>
            <div className='_drawer_box'>
              <Typography gutterBottom sx={{ fontWeight: '500', fontSize: '18px', lineHeight: '15px' }}>{task.title}</Typography>

              <IconButton aria-label="Modify Task" color='primary' onClick={initEditModel}>
                <EditIcon />
              </IconButton>
            </div>

            <Row className='_drawer_box'>
              <Col>
                <p className="mt-2 mb-1 text-muted">Assigned To</p>

                <div className="d-flex">
                  {
                    _.map(task.assign_to, user => {
                      return (
                        <div key={user.id}>
                          <div className="userInitials">{getInitial(`${user.user.first_name} ${user.user.last_name}`)}</div>
                        </div>
                      )
                    })
                  }

                </div>

              </Col>

              <Col>
                <p className="mt-2 mb-1 text-muted">Due Date</p>
                <div className="d-flex">
                  <i className="uil uil-schedule font-18 text-success me-1"></i>
                  <div>
                    <h5 className="mt-1 font-14"><ShowCurrentTZDateMoment date={task.due_date} /></h5>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="_drawer_box">
              <Col>
                <p className="mt-2 mb-1 text-muted">Overview</p>
                <Editor
                  toolbarHidden
                  toolbarClassName="draft-toolbar"
                  wrapperClassName="react-draft-wrapper border px-2"
                  editorStyle={{ minHeight: '150px' }}
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                />
              </Col>
            </Row>

            <div className='_drawer_box'>

              <Typography gutterBottom sx={{ fontWeight: '500', fontSize: '18px', lineHeight: '15px' }}>Sub-tasks</Typography>

              {task.sub_tasks.map((checklist, index) => (
                <div className="form-check mt-1" key={index}>
                  <label
                    htmlFor={`checklist-${checklist.id}`}>
                    {checklist.title}
                  </label>
                </div>
              ))}

            </div>

            <div className='_drawer_box'>
              <Typography gutterBottom sx={{ fontWeight: '500', fontSize: '18px', lineHeight: '15px' }}>Attachments</Typography>

              {/* attachments */}
              {task.documents.map((f, index) => {
                return (
                  <Card key={index} className="mb-2 shadow-none border">
                    <div className="p-1">
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <div className="avatar-sm">
                            <span className="avatar-title rounded">.{f.document ? f.document.ext : 'Doc'}</span>
                          </div>
                        </Col>
                        <Col className="ps-0">
                          <Link to="#" className="text-muted fw-bold">
                            {f.document ? f.document.name : ''}
                          </Link>
                          <p className="mb-0">{f.document.size ? prettyBytes(f.document.size) : ''}</p>
                        </Col>
                        <Col className="col-auto">
                          <DownloadDocumentButton document={f.document} />
                          <DeleteDocumentButton project_document={f} deleted={handleOnDelete} />
                        </Col>
                      </Row>
                    </div>
                  </Card>
                );
              })}

            </div>

            <div className="_drawer_box">
              <Typography gutterBottom sx={{ fontWeight: '500', fontSize: '18px', lineHeight: '15px' }}>Comments</Typography>

              {/* comments */}
              {task.comments.map((cmt, idx) => (
                <React.Fragment key={idx}>
                  <div key={idx} className="d-flex mt-3 p-1">
                    <div className="userInitials">{getInitial(`${cmt.user.first_name} ${cmt.user.last_name}`)}</div>
                    <div className="w-100">
                      <h5 className="mt-0 mb-0">
                        <span className="float-end text-muted font-12">
                          <ShowCurrentTZDateMoment date={cmt.created_at} />
                        </span>
                        {`${cmt.user.first_name} ${cmt.user.last_name}`}
                      </h5>
                      <p className="mt-1 mb-0 text-muted">{cmt.comment}</p>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
            </div>

            <Row className="_drawer_box">
              <Col>
                <div className="border rounded">

                  <CommentForm task={task} created={handleCreated} showCancel={false} parent={null} cancel={() => { }} />

                </div>
              </Col>
            </Row>

            {/* New sections */}
            <ProgressChart />

            <ProjectAttachments token={token} documents={documents} handleUpload={handleUpload} />
          </>
        }

      </Drawer>
    </>
  );

}
