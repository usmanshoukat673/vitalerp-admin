import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateDocument } from '../../../actions';
import DocumentIcon from './DocumentIcon';
import UserProfile from './FullScreen/UserProfile';
import DocumentNameInput from './ControlDocuments/DocumentNameInput';
import CreateDocument from './ControlDocuments/CreateDocument';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const FSCreateDocument = () => {

  const dispatch = useDispatch();

  const { standard, details_panel_type, parent_domain, sub_domain, control, open_document, create_document } = useSelector((state) => ({
    standard: state.leftnav.standard,
    details_panel_type: state.compliance.details_panel_type,
    parent_domain: state.compliance.parent_domain,
    sub_domain: state.compliance.sub_domain,
    control: state.compliance.control,
    open_document: state.compliance.open_document,
    create_document: state.compliance.create_document,
  }));

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(create_document?.open)
  }, [create_document]);

  const handleClose = () => {
    // The reason adding timeout here is because we want to wait if document is still saving the chagnes 
    // if the document waiting to save changes then it will take some time to update redux back again. 
    setTimeout(() => {
      dispatch(setCreateDocument({
        open: false,
        document: {},
        from: ''
      }));
    }, 100);
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
            <DocumentIcon document={{type: 'document'}} />
          </div>

          <div className='_center'>
            <div>
                <DocumentNameInput />
            </div>
            <div>
              
            </div>
          </div>

          <UserProfile handleClose={handleClose} title={`Save & Close`} />

        </div>

        <div>
           <CreateDocument />
        </div>

      </Dialog>
    </React.Fragment>
  );
}

export default FSCreateDocument;