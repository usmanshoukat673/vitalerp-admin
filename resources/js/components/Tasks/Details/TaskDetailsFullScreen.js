import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TaskDetails from './index';
import {  Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { AppDarkLogo } from '../../..';

const TaskDetailsFullScreen = ({ token, company, history, leftnav, location }) => {

    const closeTDetails = () => {
        const params = new URLSearchParams(location.search);
        const back = params.get('back');
        if(!_.isEmpty(back))
        {
            history.push(back);
        }
        else{
            history.push(leftnav.back_url);
        }
    }

    return (
        <>
            <div className="page__header__user">
                <div>
                    <div className="heading-user">
                        <Image style={{ display: 'inline', height: '30px' }} src={AppDarkLogo} /> 
                    </div>
                </div>
                <div>
                    <CloseIcon className="close__settings" onClick={closeTDetails} />
                </div>
            </div>

            <TaskDetails token={token} company={company} title_bar={false} />
        </>

    );
}

export default withRouter(TaskDetailsFullScreen);
