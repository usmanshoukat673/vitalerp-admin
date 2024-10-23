import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmSharing({ name, confirm, close}) {

  return (
    <React.Fragment>
      <Dialog
        open={true}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Share ${name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to share {name} standard?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancle</Button>
          <Button onClick={confirm} autoFocus>
            Yes, Share.
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}