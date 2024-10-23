import React, { useEffect } from 'react';
import CompanyDomains from '../CompanyDomains';
// import SupplierDomains from '../SupplierDomains';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

const DomainManagement = () => {

    const { company, leftnav } = useSelector((state) => ({
        company: state.orgs.company,
        leftnav: state.leftnav,
    }));

    return (
        <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >

            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, pt: '14px', mb: 2 }}>
                <LanguageOutlinedIcon style={{ marginRight: '10px', fontSize: '24px' }} />
                <Typography variant='h1' sx={{ fontSize: '24px', fontWeight: '500', color: '#000' }} >
                    Performance Class
                </Typography>
            </Box>

            <Route exact path={`/${company.slug}/domains`} component={CompanyDomains} />

            {/* <Route exact path={`/${company.slug}/all/suppliers`} component={SupplierDomains} /> */}
        </div>
    )
}

export default DomainManagement;