import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import AddProject from './index';
import { AppDarkLogo } from '../../..';

const AddProjectFS = ({ token, company, history, leftnav, location, users }) => {

    const closeTDetails = () => {
        const params = new URLSearchParams(location.search);
        const back = params.get('back');
        if (!_.isEmpty(back)) {
            history.push(back);
        }
        else {
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

            <div className='full_screen__page__header'>
                <h3>Create New Project</h3>
            </div>

            <AddProject token={token} company={company} close={closeTDetails} users={users} />
        </>

    );
}

export default withRouter(AddProjectFS);
