import React, {  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import PortalVisitDashboardBreadcrum from '../../dashboard/PortalVisitDashboardBreadcrum';
import PPControls from './PPControls';


const PPControlsPlaceholder = ({history, match}) => {

    const { active_standard, active_parent_domain } = useSelector((state) => ({
        active_standard: state.policyportal.active_standard,
        active_parent_domain: state.policyportal.active_parent_domain
    }));

    const dispatch = useDispatch();

    const handleCSNaviation = () => {
        history.push(`/policy-panels/${match.params.portal_link}/introduction`);
    }

    const handleStdNaviation = () => {
        history.push(`/policy-panels/${match.params.portal_link}/pp/${active_standard.slug}`);
    }
 
    const openProfile = (control) => {
        setActiveControl(control);
        // dispatch(showRightSidebar());
    }

    return (
        <>
             <div className='policy__panel'>

                <div className="ccroot__mainbd">
                    <div className="ccroot__breadcrum">
                        <PortalVisitDashboardBreadcrum /> {' > '}
                        <span className="_active" onClick={handleCSNaviation} >PolicyPanels</span> {' > '} 
                        <span className="_active" onClick={handleStdNaviation} >{active_standard.name}</span> {' > '} 
                        <span >{active_parent_domain.menu_name}</span> {' > '} Controls
                    </div>

                    <div className="cc__header">
                        <div className="__name">{active_parent_domain.menu_name}</div>
                        <div className="__actions">

                        </div>
                    </div>
                </div>

                <div className="compliance__categories">

                    <PPControls />

                </div>
            </div>

            {/* <ControlProfileDrawer title="Control Profile" error_control={() => setActiveControl({})} control={active_control} /> */}
        </>
    );
}


export default withRouter(PPControlsPlaceholder);