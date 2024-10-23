import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSubLeftNav, showRightSidebar } from '../../actions';
import _ from 'lodash';
import { useParams, withRouter } from 'react-router-dom';
import StandardBanner from './StandardBanner';
import ControlBoxes from './ControlBoxes';
import ControlProfileDrawer from './ControlDrawer/ControlProfileDrawer';
import VisitDashboardBreadcrum from '../dashboard/VisitDashboardBreadcrum';


const ControlBoxesPlaceHolder = ({history}) => {

    const [active_control, setActiveControl] = useState({});

    const { standard, open_sub, parent_domain, company} = useSelector((state) => ({
        standard: state.leftnav.standard,
        open_sub: state.leftnav.open_sub,
        parent_domain: state.compliance.parent_domain,
        company: state.orgs.company,
    }));

    const [standard_name, setStandardName] = useState('');

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(closeSubLeftNav());
    }, [standard]);

    useEffect(() => {
        setStandardName(params.standard_name);
    }, [params.standard_name]);

    const handleCSNaviation = () => {
        history.push(`/${company.slug}/compliance-stack`);
    }

    const handleStdNaviation = () => {
        history.push(`/${company.slug}/compliance-stack/${standard.standard.slug}`);
    }
 
    const openProfile = (control) => {
        setActiveControl(control);
        dispatch(showRightSidebar());
    }

    return (
        <>
            <div className={open_sub ? 'sub__slide__menu_opened' : ''} >

                <div className="ccroot__mainbd">
                    <div className="ccroot__breadcrum">
                        <VisitDashboardBreadcrum /> {' > '}
                        <span className="_active" onClick={handleCSNaviation} >ComplianceStack</span> {' > '} 
                        <span className="_active" onClick={handleStdNaviation} >{standard.standard.name}</span> {' > '} 
                        <span >{parent_domain.menu_name}</span> {' > '} Controls
                    </div>

                    <div className="cc__header">
                        <div className="__name">{parent_domain.menu_name}</div>
                        <div className="__actions">

                        </div>
                    </div>
                </div>

                <div className="compliance__categories">

                    {/* <StandardBanner /> */}

                    <ControlBoxes openProfile={openProfile} />

                </div>
            </div>

            <ControlProfileDrawer title="Control Profile" error_control={() => setActiveControl({})} control={active_control} />
        </>
    );
}


export default withRouter(ControlBoxesPlaceHolder);