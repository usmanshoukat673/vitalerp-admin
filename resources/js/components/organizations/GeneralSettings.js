import React, { Component, useEffect } from 'react';
import _ from 'lodash';
import { setCompany, setCompanies, setCompanyLocations } from '../../actions';
import { connect, useDispatch, useSelector } from 'react-redux';
import CompanyLogo from './CompanyLogo';
import { withRouter } from 'react-router';
import './GeneralSettings.scss';
import CompanyProfile from './CompanyProfile';
import VisitDashboardBreadcrum from '../dashboard/VisitDashboardBreadcrum';
import axiosInstance from '../../api/api';
import { NotificationManager } from 'react-notifications';

const GeneralSettings = () => {

    const dispatch = useDispatch();

    const { company, locations, leftnav, states, countries } = useSelector((state) => ({
        company: state.orgs.company,
        locations: state.locations.locations,
        leftnav: state.leftnav,
        states: state.validvalues.states,
        countries: state.validvalues.countries
    }));

    const [loading, setLoading] = React.useState(false);
   
    const logoUploaded = company => {
        dispatch(setCompany(company));
    }

    return (
        <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''}>

            <div className="gnsettings__mainbd">
                <div className="gnsettings__breadcrum"><VisitDashboardBreadcrum /> {' > '} {company.name}</div>

                <div className="gnsettings__header">
                    <div className="__name">Company Settings</div>
                    <div className="__actions">
                        {/**<Link to="/select-organization"><Button basic color="black">Change Organization</Button></Link> */}
                    </div>
                </div>
            </div>

            <div className="gnsettings__container">

                <CompanyProfile states={states} countries={countries} />

                {/* <CompanyLogo uploaded={logoUploaded} company={company} token={token} /> */}
            </div>
        </div>
    );
}



export default GeneralSettings;