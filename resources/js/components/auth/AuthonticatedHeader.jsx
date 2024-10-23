import React from 'react';
import { AppAuthLogo, GlobalAppName } from '../..';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateNewOrg } from '../../actions';

const AuthonticatedHeader = ({ }) => {

    const dispatch = useDispatch();

    const { create_new_org } = useSelector((state) => ({
        create_new_org: state.leftnav.create_new_org
    }));

    const handleCreateOrgToggle = () => {
        dispatch(setCreateNewOrg({
            open: true,
            in_org: true
        }))
    }

    return (
        <div className='authonticated__header'>
            <div className='header__section'>
                <div className='header__tier'>
                    <div className='header__logo'>
                        <div className='h_logo'>
                            <img style={{ height: '40px' }} src={AppAuthLogo} alt={GlobalAppName} />
                            <span className='app_name'>vitalERP</span>
                        </div>
                    </div>
                    <div className='header__center'></div>
                    <div className='header__right'>
                        {/* {
                            create_new_org?.in_org && <Button
                                sx={{ marginRight: '12px' }}
                                onClick={handleCreateOrgToggle}
                                size="large" variant="contained"
                            >
                                Create new organization
                            </Button>
                        } */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthonticatedHeader;