import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import NavigationWithConfirmation from '../../NavigationWithConfirmation';
import Capability from './Capability';
import CorporateInformation from './CorporateInformation';
import Socioenomic from './Socioenomic';
import SecurityAndCertifications from './SecurityAndCertifications';
import PastPerformance from './PastPerformance';
import classNames from 'classnames';
import { getModuleAccess } from '../../helpers/getModuleAccess';
import CompanySuppliersSubLeftNav from './CompanySuppliersSubLeftNav';
import { Box, Grid, Typography } from '@mui/material';

const CoporateProfileManagement = () => {

    const { company, leftnav, supplier, suppliers_count } = useSelector((state) => ({
        company: state.orgs.company,
        leftnav: state.leftnav,
        supplier: state.supplier.supplier,
        suppliers_count: state.orgs.suppliers_count,
    }));

    const [multiSupplierMode, setMultiSupplierMode] = React.useState(false);

    useEffect(() => {
        setMultiSupplierMode(getModuleAccess(_.size(company?.roles) > 0 ? company.roles : [], (!_.isEmpty(supplier) && _.size(supplier?.roles) > 0) ? supplier?.roles : [], [12, 14, 19]) && suppliers_count > 0 ? true : false);
    }, [company, supplier]);

    return (

        // If user is supplier user then no need to have settings module 
        <div className={classNames(leftnav.open_sub ? 'sub__slide__menu_opened' : '')} >

            <Box marginBottom={2} sx={{ display: 'flex', justifyContent: 'space-between', pt: '14px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                    <i className="uil-layer-group" style={{ marginRight: '10px', fontSize: '24px' }} />
                    <Typography variant='h1' sx={{ fontSize: '24px', fontWeight: '500', color: '#000' }} >
                        Corporate Profile
                    </Typography>
                </Box>
            </Box>

            <div className={classNames(multiSupplierMode ? 'coporate_profile__module' : '')} >

                <Grid container spacing={2}>
                    {
                        multiSupplierMode && <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                            <CompanySuppliersSubLeftNav />
                        </Grid>
                    }

                    <Grid item xs={multiSupplierMode ? 10 : 12} sm={multiSupplierMode ? 10 : 12} md={multiSupplierMode ? 10 : 12} lg={multiSupplierMode ? 10 : 12} xl={multiSupplierMode ? 10 : 12}>
                        <div className={classNames(multiSupplierMode ? 'cp_wrapper' : '')}>
                            <NavigationWithConfirmation />
                            <Route exact path='/:name/corporate-profile/:supplier_name/corporate-information' component={CorporateInformation} />
                            <Route exact path='/:name/corporate-profile/:supplier_name/capability' component={Capability} />
                            <Route exact path='/:name/corporate-profile/:supplier_name/socioenomic' component={Socioenomic} />
                            <Route exact path='/:name/corporate-profile/:supplier_name/security-and-certifications' component={SecurityAndCertifications} />
                            <Route exact path='/:name/corporate-profile/:supplier_name/past-performance' component={PastPerformance} />
                        </div>
                    </Grid>
                </Grid>



            </div>
        </div>
    )
}

export default CoporateProfileManagement;