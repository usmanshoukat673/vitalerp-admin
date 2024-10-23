import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenDocument } from '../../../actions';
import DigitalDocumentEditMode from './DomainDocuments/DigitalDocumentEditMode';
import DocumentIcon from './DocumentIcon';
import UploadedDocumentViewMode from './DomainDocuments/UploadedDocumentViewMode';
import UserProfile from './FullScreen/UserProfile';
import DocumentMeta from './DocumentMeta';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const FullscreenPopup = () => {

  const dispatch = useDispatch();

  const { standard, details_panel_type, parent_domain, sub_domain, control, open_document } = useSelector((state) => ({
    standard: state.leftnav.standard,
    details_panel_type: state.compliance.details_panel_type,
    parent_domain: state.compliance.parent_domain,
    sub_domain: state.compliance.sub_domain,
    control: state.compliance.control,
    open_document: state.compliance.open_document,
  }));

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(open_document.open)
  }, [open_document]);

  const handleClose = () => {
    // The reason adding timeout here is because we want to wait if document is still saving the chagnes 
    // if the document waiting to save changes then it will take some time to update redux back again. 
    setTimeout(() => {
      dispatch(setOpenDocument({
        open: false,
        document_type: '',
        document: {},
        from: ''
      }));
    }, 50);
  }

  const buttonText = () => {
    if (open_document.document_type == 'document') {
      return `Save & Close`;
    }
    else {
      return `Close`;
    }
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className='__fullscreen__header'>

          <div className='icon'>
            <DocumentIcon document={open_document.document} />
          </div>

          <div className='_center'>
            <div>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {`${open_document.document.name}`}
              </Typography>
            </div>
            
            <DocumentMeta />
          </div>

          <UserProfile handleClose={handleClose} title={buttonText()} />

        </div>

        <div>
          {open_document.document_type == 'document' && <DigitalDocumentEditMode />}

          {open_document.document_type == 'file' && <UploadedDocumentViewMode />}
        </div>

      </Dialog>
    </React.Fragment>
  );
}

export default FullscreenPopup;