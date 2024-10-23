require('./bootstrap');

export const _appAuthLogo = '/images/logo/logo.png';
let _appDarkLogo = '/images/logo/logo-black.png';
let _appOnboardingLogo = '/images/logo/logo.png'

let _appSmLogo = '/images/logo/logo_sm.png';
let _appSmDarkLogo = '/images/logo/logo_sm.png';

let _appName = 'vitalERP';

if(window.location.host === 'app.mycyberinsurancepolicy.com')
{
    _appDarkLogo = '/images/lockton.png';
    _appAuthLogo = '/images/logo-scrolling-white.svg';
    _appSmLogo = '/images/logo-scrolling-white.svg';
    _appSmDarkLogo = '/images/logo-scrolling-white.svg';
    _appName = 'Lockton Assessments';
}

export const AppAuthLogo = `${window.location.origin}${_appAuthLogo}`;
export const AppDarkLogo = `${window.location.origin}${_appDarkLogo}`;
export const AppOnboardingLogo = `${window.location.origin}${_appOnboardingLogo}`;

export const AppSmLogo = `${window.location.origin}${_appSmLogo}`;
export const AppSmDarkLogo = `${window.location.origin}${_appSmDarkLogo}`;

export const GlobalAppName = _appName;

export const RightDrawerWidth = 350;

require('./App');
