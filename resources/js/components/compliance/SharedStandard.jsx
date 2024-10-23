import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CopyLink from './CopyLink';
import SharedWithEntity from './SharedWithEntity';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function SharedStandard({ standard, close, open }) {

  const [link, setLink] = useState('');

  const { policy_portal } = useSelector((state) => ({
    policy_portal: state.orgs.policy_portal,
  }));

  useEffect(() => {
    setLink(`${window.location.origin}/policy-panels/${policy_portal.link}/introduction`)
  }, [standard, policy_portal]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={close}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {`Share ${standard.standard.name}`}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={close}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>

          <SharedWithEntity standard={standard} />

          <br />
          <Divider />

          <CopyLink link={link} title="Access Link" />

        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Done</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}