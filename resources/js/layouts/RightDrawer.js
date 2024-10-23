import React, {useState} from 'react';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { hideRightSidebar } from '../actions';
import { Slide, Box, Drawer, Divider, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { RightDrawerWidth } from '..';
import DHeader from '../components/compliance/Drawer/DHeader';

export default function RightDrawer({ title, component }) {

  const dispatch = useDispatch();

  const [extendedModel, setExtendedModel] = useState(false);
  const [extendedModelTitle, setExtendedModelTitle] = useState('');

  const {  showRightSidebar, users, token, company } = useSelector((state) => ({
    users: state.orgs.company_users,
    token: state.token.activeToken,
    company: state.orgs.company,
    showRightSidebar: state.leftnav.showRightSidebar,
  }));

  const theme = useTheme();

  const handleDrawerClose = () => {
    dispatch(hideRightSidebar());
  };

  
  return (
    <>
      {
        extendedModel && <div className='custom_right_to_left_slider'>
          <Slide direction="left" in={extendedModel}>
            <Box className='crtks__container' sx={{ height: '100vh', background: '#fff', width: '60%', position: 'fixed', pt: '15px', pl: '15px', right: '350px', overflow: 'auto' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => setExtendedModel(false)}>
                  <CloseIcon />
                </IconButton>

                <Typography sx={{ ml: '10px' }} variant='h5' gutterBottom>{extendedModelTitle}</Typography>
              </Box>

              <Divider />

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
      >
        
        <DHeader title={title} close={handleDrawerClose} />

        {!extendedModel && component}

      </Drawer>
    </>
  );
}
