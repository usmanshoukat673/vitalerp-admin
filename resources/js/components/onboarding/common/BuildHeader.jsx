import React from 'react';
import { Button } from '@mui/material';
import { AppOnboardingLogo, GlobalAppName } from '../../..';

const BuildHeader = () => {
    return (
        <div className='apibuild__header'>
            <div className='header__section'>
                <div className='header__tier'>
                    <div className='header__logo'>
                        <div className='h_logo'>
                            <img src={AppOnboardingLogo} alt={GlobalAppName} />
                        </div>
                    </div>
                    <div className='header__center'></div>
                    <div className='header__right'>
                    <Button sx={{marginRight: '12px'}} size="large" variant="outlined">Button 1</Button>
                    <Button sx={{marginRight: '12px'}} size="large" variant="contained">Button 2</Button>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default BuildHeader;