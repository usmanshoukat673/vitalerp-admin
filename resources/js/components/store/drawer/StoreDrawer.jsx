import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideRightSidebar } from '../../../actions';
import CloseIcon from '@mui/icons-material/Close';
import _ from 'lodash';
import { Slide, Box, Drawer, Divider, IconButton, Typography } from '@mui/material';
import { Card } from 'react-bootstrap';
import { RightDrawerWidth } from '../../..';

export default function StoreDrawer({ title }) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const [extendedModel, setExtendedModel] = useState(false);
    const [extendedModelTitle, setExtendedModelTitle] = useState('');


    const { showRightSidebar, standard } = useSelector((state) => ({
        showRightSidebar: state.leftnav.showRightSidebar,
        standard: state.marketplace.standard,
    }));

    useEffect(() => {
        if (!_.isEmpty(standard)) {
            //   setExtendedModel(true);
            //   setExtendedModelTitle(`${control.number} ${control.name}`);
        }
        else {
            dispatch(hideRightSidebar());
        }
    }, [standard]);


    const handleDrawerClose = () => {
        dispatch(hideRightSidebar());
    };

    const closeExtendedDrawer = () => {
        setExtendedModel(false);
        dispatch(hideRightSidebar());
    }


    return (
        <>
            {
                showRightSidebar && <> <div className='custom_right_to_left_slider'>
                    <Slide direction="left" in={true}>
                        <Box className='crtks__container' sx={{ height: '100vh', background: '#fff', width: '60%', position: 'fixed', pt: '15px', pl: '15px', right: '350px', overflow: 'auto' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton onClick={closeExtendedDrawer}>
                                    <CloseIcon />
                                </IconButton>

                                {/* <button onClick={handleDrawerClose} className="dialog__header__close"><CloseIcon /></button> */}

                                <Typography sx={{ ml: '10px', mb: '10px' }} variant='h5' gutterBottom>{standard.name}</Typography>
                            </Box>

                            <Divider />

                            <Card className="d-block">
                                <Card.Body>


                                </Card.Body>
                            </Card>

                        </Box>
                    </Slide>
                </div>
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
                                <h2 className="dialog__header__title">title</h2>
                            </div>
                        </div>

                    </Drawer></>
            }

        </>
    );
}
