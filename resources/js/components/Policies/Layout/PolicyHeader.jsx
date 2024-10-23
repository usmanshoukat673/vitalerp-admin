import React from 'react';
import { AppOnboardingLogo, GlobalAppName } from '../../..';

const PolicyHeader = () => {
    return (
        <div className='policies__header'>
            <div className='header__section'>
                <div className='header__tier'>
                    <div className='header__logo'>
                        <div className='h_logo'>
                            <img
                                src={AppOnboardingLogo}
                                alt={GlobalAppName}
                                style={{ maxHeight: '50px', width: 'auto' }}
                            />
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

export default PolicyHeader;