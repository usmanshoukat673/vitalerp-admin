import React from 'react';
import { AppOnboardingLogo, GlobalAppName } from '../..';

const PPAuthHeader = ({signup}) => {
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
                       
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default PPAuthHeader;