import React, { useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { closeSubLeftNav, selectControlFunction, selectCatalogSection } from '../../actions';
import { Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getModuleAccess } from '../../helpers/getModuleAccess';
import GeneralSettings from './GeneralSettings';
import SSLeftNav from './SSLeftNav';
import Locations from './Locations/Locations';
import Users from './Users/Users';
import './style.scss';

const SupplierSettings = ({ leftnav }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const { company, supplier } = useSelector((state) => ({
        company: state.orgs.company,
        supplier: state.supplier.supplier
    }));

    useEffect(() => {
        if (_.isEmpty(supplier)) {
            history.push('/dashboard');
        }
        if (!getModuleAccess(_.size(company?.roles) > 0 ? company.roles : [], (!_.isEmpty(supplier) && _.size(supplier?.roles) > 0) ? supplier?.roles : [], [1])) {
            history.push('/dashboard');
        }
    }, [company, supplier]);

    useEffect(() => {
        dispatch(closeSubLeftNav());
        dispatch(selectControlFunction({}));
        dispatch(selectCatalogSection({}));
    }, []);

    return (
        <>
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened settings__module' : 'settings__module'} >

                <SSLeftNav supplier={supplier} />

                <div className="settings_wrapper">
                    <Route exact path={`/${supplier.slug}/supplier-settings/general`} component={GeneralSettings} />
                    <Route exact path={`/${supplier.slug}/supplier-settings/locations`} component={Locations} />
                    <Route exact path={`/${supplier.slug}/supplier-settings/users`} component={Users} />
                </div>

            </div>
        </>
    );
}

export default SupplierSettings;
