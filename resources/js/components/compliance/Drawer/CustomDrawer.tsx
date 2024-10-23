import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideRightSidebar } from '../../../actions';
import CloseIcon from '@mui/icons-material/Close';
import CustomDocument from './CustomDocument.tsx';
import PDFDocument from './PDFDocument.tsx';
import MSDocument from './MSDocument.tsx';
import CustomDocumentProperties from './CustomDocumentProperties.tsx';
import AllStandardDocuments from '../AllStandardDocuments';
import _ from 'lodash';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Slide, Box, Drawer, Divider, IconButton, Typography, Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import './CustomDrawer.scss';
import DHeader from './DHeader';
import CreateDigiDoc from './CreateDigiDoc.tsx';
import CreateDigiDocProps from './CreateDigiDocProps.tsx';
import UploadNewDocument from './UploadNewDocument.tsx';
import { RightDrawerWidth } from '../../..';

export default function CustomDrawer({ title, documents, renamed, saved, newDocumentAddedToSection }) {

  const dispatch = useDispatch();

  const [open_document, setOpenDocument] = useState(false);
  const [opening_document, setOpeningDocument] = useState(false);
  const [active_document, setActiveDocument] = useState({});
  const [open_pdf_document, setOpenPdfDocument] = useState(false);
  const [open_ms_document, setOpenMsDocument] = useState(false);
  const [view_documents, setViewDocuments] = useState(false);

  const [extendedModel, setExtendedModel] = useState(false);
  const [extendedModelTitle, setExtendedModelTitle] = useState('');
  const [control_id, setControlId] = useState(0);

  const [create_digidoc, setCreateDigiDoc] = useState(false);
  const [upload_document, setUploadDocument] = useState(false);


  const [toggle_documents, setToggleDocuments] = useState(false);

  // handle digitial document changes 
  const [digidoc_changed, setDigidocChanged] = useState(false);
  const [hit_save, setHitSave] = useState(false);

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

  const theme = useTheme();

  const handleDrawerClose = () => {
    dispatch(hideRightSidebar());
  };

  useEffect(() => {
    if (active_document.type === 'document') {
      setOpenDocument(true);
      setActiveDocument(active_document);
      setOpeningDocument(true);
    }
    else if (active_document.type === 'file') {
      if (active_document.ext === 'pdf') {
        setOpenDocument(true);
        setActiveDocument(active_document);
        setOpeningDocument(true);
      }
      let msFiles = ['doc', 'docx', 'pptx', 'xlsx', 'xls', 'ppt'];
      if (msFiles.includes(active_document.ext)) {
        setOpenDocument(true);
        setActiveDocument(active_document);
        setOpeningDocument(true);

      }
    }
  }, [active_document, control_id]);

  const handleRenamed = (document) => {
    setActiveDocument(document);
    renamed(document);
  }

  const handleDocumentUpdate = (document) => {
    setActiveDocument(document);
    saved(document);
    setDigidocChanged(false);
  }

  const toggleDocuments = () => {
    setViewDocuments(!view_documents);
  }

  const openDocumentInDrawer = (document, control_id) => {
    setExtendedModel(true);
    setActiveDocument(document);
    setExtendedModelTitle(document.name);
    setControlId(control_id);
  }

  const msFiles = ['doc', 'docx', 'pptx', 'xlsx', 'xls', 'ppt'];

  const handleSaved = document => {
    setActiveDocument(document);
    saved(document);
  }

  const handleDigiChanged = () => {
    setDigidocChanged(true);
  }

  const saveDigidocChanges = () => {
    setHitSave(true);
    setDigidocChanged(false);
  }

  const closeExtendedDrawer = () => {
    setExtendedModel(false);
    setToggleDocuments(true);
    setCreateDigiDoc(false);
  }

  const handleCreateDigiInit = () => {

    setExtendedModel(true);
    setActiveDocument({});
    setExtendedModelTitle('');
    setControlId(0);
    setCreateDigiDoc(true);
    setUploadDocument(false);
  }

  const handleUploadDocument = () => {
    setUploadDocument(true);
    setExtendedModel(false);
    setActiveDocument({});
    setExtendedModelTitle('');
    setControlId(0);
    setCreateDigiDoc(false);
  }

  const cancelUploadingDocument = () => {
    setExtendedModel(false);
    setCreateDigiDoc(false);
    setUploadDocument(false);
  }

  const [newDocumentData, setNewDocumentData] = useState('');

  const handleNewDocDataChange = (documentData) => {
    setNewDocumentData(documentData);
  }

  const handleDigiDocCreated = (section_documents) => {
    newDocumentAddedToSection(section_documents);
    setExtendedModel(false);
    setToggleDocuments(true);
    setCreateDigiDoc(false);
    setUploadDocument(false);
  }

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

                <Typography sx={{ ml: '10px', mb: '10px' }} variant='h5' gutterBottom>{extendedModelTitle}</Typography>
              </Box>

              <Divider />

              {open_document && active_document.type === 'document' && <CustomDocument
                document={active_document}
                saved={handleDocumentUpdate}
                digi_changed={handleDigiChanged}
                hit_save={hit_save}
              />}

              {create_digidoc && <CreateDigiDoc dataChanged={handleNewDocDataChange} />}

              {(open_document && active_document.type === 'file' && active_document.ext == 'pdf') && <PDFDocument
                standards={standards}
                document={active_document}
                token={token}
                company={company}
                renamed={handleRenamed}
              />}

              {(open_document && active_document.type === 'file' && msFiles.includes(active_document.ext)) && <MSDocument
                document={active_document}
                token={token}
                company={company}
                renamed={handleRenamed}
              />}

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
          !extendedModel && <>
            <div className='_drawer_box'>
              <Typography gutterBottom sx={{ fontWeight: '500', fontSize: '18px', lineHeight: '15px' }}>{_.isEmpty(last_active_section_name) ? standard.standard.name : last_active_section_name}</Typography>
            </div>
            
            {
              (!upload_document && last_active_section_id > 0) &&  <div className='_drawer_box'>
              <IconButton color="secondary" disabled={upload_document} onClick={handleCreateDigiInit} aria-label="Create Document">
                <LibraryAddIcon />
              </IconButton>

              <IconButton color="secondary" disabled={create_digidoc} onClick={handleUploadDocument} aria-label="Upload Document">
                <CloudUploadIcon />
              </IconButton>
            </div>
            }
          
          </>
        }

        {(upload_document) ? <UploadNewDocument
          cancled={cancelUploadingDocument}
          created={handleDigiDocCreated}
        /> : ''}


        {!extendedModel && _.size(documents) > 0 && <div className='_drawer_box'><AllStandardDocuments
          documents={documents}
          standard={standard}
          company={company}
          token={token}
          standards={standards}
          renamed={handleRenamed}
          saved={handleSaved}
          openDocumentInDrawer={openDocumentInDrawer}
          stay_docs_open={toggle_documents}
        /></div>}

        {(extendedModel && !create_digidoc) ? <CustomDocumentProperties
          open={open_document}
          document={active_document}
          renamed={handleRenamed}
          documentUpdated={handleDocumentUpdate}
        /> : ''}

        {(extendedModel && create_digidoc) ? <CreateDigiDocProps
          cancled={closeExtendedDrawer}
          newDocumentData={newDocumentData}
          created={handleDigiDocCreated}
        /> : ''}


        {
          (extendedModel && active_document.type === 'document') ? <>
            <Box sx={{ display: 'flex', pt: '10px', pl: '10px' }}>
              <Button size="medium" disabled={!digidoc_changed} onClick={saveDigidocChanges} color="success" variant="contained">Save Changes</Button>
            </Box>
          </> : ''
        }

      </Drawer>


    </>
  );
}
