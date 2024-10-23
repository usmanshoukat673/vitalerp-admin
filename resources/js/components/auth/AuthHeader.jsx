import React from 'react';
import { Button } from '@mui/material';
import { AppAuthLogo, GlobalAppName } from '../..';
import { Link } from 'react-router-dom';

const AuthHeader = ({signup}) => {
    return (
        <div className='apibuild__header'>
            <div className='header__section'>
                <div className='header__tier'>
                    <div className='header__logo'>
                        <div className='h_logo'>
                            {/* <img src={AppAuthLogo} alt={GlobalAppName} /> */}
                        </div>
                    </div>
                    <div className='header__center'></div>
                    <div className='header__right'>
                        {/* {
                            !signup ? <Button component={Link} to={'/signup-for-free'} sx={{marginRight: '12px'}} size="large" variant="contained">Sign Up</Button> : 
                            <Button component={Link} to={'/login'} sx={{marginRight: '12px'}} size="large" variant="contained">Sign In</Button>
                        } */}
                        { signup && <Button component={Link} to={'/login'} sx={{marginRight: '12px'}} size="large" variant="contained">Sign In</Button>}
                        
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default AuthHeader;