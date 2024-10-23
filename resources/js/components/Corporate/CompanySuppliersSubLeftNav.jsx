import React, { useEffect } from 'react';
import _ from 'lodash';
import { IoMdSettings } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { setActiveSupplier, setCorporateProfileStatus } from '../../actions';
import axiosInstance from '../../api/api';

const CompanySuppliersSubLeftNav = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const { company, suppliers_count, company_suppliers, cp_active_tab, active_supplier, corporate_profile_status } = useSelector((state) => ({
        company: state.orgs.company,
        suppliers_count: state.orgs.suppliers_count,
        company_suppliers: state.orgs.company_suppliers,
        cp_active_tab: state.corporate.cp_active_tab,
        active_supplier: state.corporate.active_supplier,
        corporate_profile_status: state.corporate.corporate_profile_status,
    }));

    useEffect(() => {
        if (!_.isEmpty(active_supplier)) {
            loadCoporateProfileStatus(active_supplier);
        }
    }, [active_supplier]);

    const loadCoporateProfileStatus = (supplier) => {
        axiosInstance.get(`/api/user/corporate-profile/overall-progress/${supplier.id}`)
            .then(e => {
                dispatch(setCorporateProfileStatus({
                    ...corporate_profile_status,
                    ...e.data
                }));
            });
    }

    const handleNavigation = (e, supplier) => {
        e.preventDefault();
        dispatch(setActiveSupplier(supplier));
        history.push(`/${company.slug}/corporate-profile/${supplier.slug}/${cp_active_tab}`)
    }

    return (
        <div className="sub__left__menu">
            <div className="sub__settings_box">
                <div className="heading"><IoMdSettings /> Suppliers</div>
                {
                    _.map(company_suppliers, (supplier, index) => {
                        return <NavLink className={location.pathname.includes(`/${company.slug}/corporate-profile/${supplier.slug}`) ? 'active' : ''} activeClassName="active" onClick={(e) => handleNavigation(e, supplier)} to={`/${company.slug}/corporate-profile/${supplier.slug}/${cp_active_tab}`} key={index} >{supplier.name}</NavLink>
                    })
                }
            </div>

        </div>
    );
}


export default CompanySuppliersSubLeftNav;
