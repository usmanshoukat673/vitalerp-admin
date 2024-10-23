import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideRightSidebar } from '../../../actions';
import CloseIcon from '@mui/icons-material/Close';
import _ from 'lodash';
import { Slide, Box, Drawer, Divider, IconButton, Typography } from '@mui/material';
import { RightDrawerWidth } from '../../..';
import { Card } from 'react-bootstrap';
import classNames from 'classnames';
import ControlFiles from './ControlFiles';
import ControlApplicability from './ControlApplicability';
import './ControlProfileDrawer.scss';
import ArtifactsSupplier from './ArtifactsSupplier';
import OpenDocument from '../../file-manager/Document/OpenDocument';
import OpenPDFDocument from '../../file-manager/Document/OpenPDFDocument';
import OpenMSDocs from '../../file-manager/Document/OpenMSDocs';
import axiosInstance from '../../../api/api';
import DefaultDocument from './DefaultDocument';

export default function ControlProfileDrawer({ title, control, error_control }) {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const [extendedModel, setExtendedModel] = useState(false);
  const [extendedModelTitle, setExtendedModelTitle] = useState('');
  const [artifacts, setArtifacts] = useState([]);
  const [profile, setProfile] = useState({});
  const [properties, setProperties] = useState({});

  // documents preview 
  const [open_document, setOpenDocument] = useState(false);
  const [opening_document, setOpeningDocument] = useState(false);
  const [active_document, setActiveDocument] = useState({});
  const [modal_inline, setModalInline] = useState(true);


  const { showRightSidebar, standard, standards, users, token, company, last_active_section_name, last_active_section_id } = useSelector((state) => ({
    showRightSidebar: state.leftnav.showRightSidebar,
    standard: state.leftnav.standard,
    standards: state.compliance.standards,
    users: state.orgs.company_users,
    token: state.token.activeToken,
    company: state.orgs.company,
    last_active_section_name: state.compliance.last_active_section_name,
    last_active_section_id: state.compliance.last_active_section_id
  }));

  const featchArtifacts = () => {
    setLoading(true);
    axiosInstance.get(`/api/user/compliance/control-profile/artifacts/${company.id}/${control.id}`).then(e => {
      setLoading(false);
      setArtifacts(e.data);
    }).catch(err => {
      setLoading(false);
      if (err.response.status === 422) {
        setErrors(errors.concat(err.response.data.errors));
      }
    });
  }

  const featchControlProfile = () => {
    setLoading(true);
    axiosInstance.get(`/api/user/compliance/control-profile/${control.id}/${company.id}`).then(e => {
      setLoading(false);
      setProperties(e.data[1]);
      setProfile({ ...e.data[0], 'standard_section_id': e.data[1].section_id, 'standard_id': e.data[1].standard_id });
    }).catch(err => {
      setLoading(false);
      if (err.response.status === 422) {
        setErrors(errors.concat(err.response.data.errors));
      }
    });
  }

  useEffect(() => {
    if (!_.isEmpty(control)) {
      setExtendedModel(true);
      setExtendedModelTitle(`${control.number} ${control.name}`);

      featchControlProfile();
      featchArtifacts();
    }
    else {
      dispatch(hideRightSidebar());
    }
  }, [control]);


  const handleDrawerClose = () => {
    dispatch(hideRightSidebar());
  };

  const closeExtendedDrawer = () => {
    setExtendedModel(false);
    dispatch(hideRightSidebar());
    error_control();
  }

  const handlePropertyChange = (property, value) => {
    properties[property] = value;
    setProperties(properties);
    axiosInstance.post(`/api/user/riskregister/save/control/properties`, {
      property_id: properties.id,
      property: property,
      value: value
    }).then(e => {
    }).catch(err => {
      if (err.response.status === 422) {
        const errors = err.response.data.errors;
        setErrors(errors.concat(errors));
      }
    }).finally(() => {
      setErrors([]);
      setLoading(false);
    });
  }

  const handleArtifactSupplied = (artifacts) => {
    setArtifacts(artifacts);
  }

  const openDocument = (document, inline) => {
    console.log(inline);
    setActiveDocument(document);
    setOpenDocument(true);
    setOpeningDocument(true);
    setModalInline(inline);
  };

  const onDocumentOpend = () => {
    setOpeningDocument(false);
  }

  const onCloseDocument = () => {
    setActiveDocument({});
    setOpenDocument(false);
  }

  const handleRenamed = document => {
    setActiveDocument(document);

    let index = _.findIndex(artifacts, doc => {
      return doc.document_id === document.id;
    });

    artifacts[index].document.name = document.name;
    artifacts[index].document.updated_at = document.updated_at;
    setArtifacts(artifacts);
  }

  const onSavedDocumentEdits = document => {
  };

  let msFiles = ['doc', 'docx', 'pptx', 'xlsx', 'xls', 'ppt', 'odt', 'odp', 'ods', 'rtf'];

  return (
    <>
      {
        extendedModel && <div className='custom_right_to_left_slider'>
          <Slide direction="left" in={extendedModel}>
            <Box className='crtks__container' sx={{ height: '100vh', background: '#fff', width: '60%', position: 'fixed', pt: '15px', pl: '15px', right: '350px', overflow: 'auto' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={closeExtendedDrawer}>
                  <CloseIcon />
                </IconButton>

                {/* <button onClick={handleDrawerClose} className="dialog__header__close"><CloseIcon /></button> */}

                <Typography sx={{ ml: '10px', mb: '10px' }} variant='h5' gutterBottom>{extendedModelTitle}</Typography>
              </Box>

              <Divider />

              <Card className="d-block">
                <Card.Body>
                  <div
                    className={classNames(
                      'badge',
                      {
                        'bg-success': properties.status === 'Implemented',
                        'bg-secondary': properties.status === 'Not Implemented',
                        'bg-warning': properties.status === 'Partially Implemented',
                      },
                      'text-light',
                      'mb-3'
                    )}>
                    {properties.status}
                  </div>

                  <ControlApplicability properties={properties} propertChanged={handlePropertyChange} />

                  <h5>Control Overview:</h5>

                  <p className="text-muted mb-2">
                    {profile.description}
                  </p>

                </Card.Body>
              </Card>

              {
                _.size(artifacts) > 0 && !open_document && <DefaultDocument openDocument={openDocument} artifacts={artifacts} />
              }

              {open_document && active_document.type == 'document' ? <OpenDocument
                open={open_document}
                renamed={handleRenamed}
                standards={standards}
                document={active_document}
                token={token}
                company={company}
                cancle={onCloseDocument}
                opened={onDocumentOpend}
                saved={onSavedDocumentEdits}
                modal_inline={modal_inline}
                /> : ''}

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

        <div className="dialog__header">
          <div className="dialog__header__content">
            <h2 className="dialog__header__title">{(_.isEmpty(control) ? title : control.number)}</h2>
          </div>
        </div>

        <ControlFiles artifacts={artifacts} openDocument={openDocument} />

        {open_document && active_document.type == 'file' && active_document.ext == 'pdf' ?
          <OpenPDFDocument
            renamed={handleRenamed}
            standards={standards}
            open={open_document}
            document={active_document}
            token={token}
            company={company}
            cancle={onCloseDocument} /> : ''}

        {open_document && active_document.type == 'file' && msFiles.includes(active_document.ext) ?
          <OpenMSDocs
            open={open_document}
            document={active_document}
            token={token}
            company={company}
            cancle={onCloseDocument}
          /> : ''}
      </Drawer>
    </>
  );
}
