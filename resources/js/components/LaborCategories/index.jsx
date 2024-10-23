import React, { useEffect, useState } from "react";
import { Box, List, ListItem, Button, Typography } from "@mui/material";
import LaborCategoriesList from "./LaborCategoriesList";
import axiosInstance from "../../api/api";
import { NavLink } from "react-router-dom";
import AddLaborCategoryDialog from "./AddLaborCategoryDialog";
import EditLaborCategoryDialog from "./EditLaborCategoryDialog";

const LaborCategories = ({ leftnav }) => {

    const [loading, setLoading] = useState(true);
    const [naicsCodes, setNaicsCodes] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axiosInstance.get('/api/user/valid-values/naics-codes')
            .then(response => {
                if (response.data) {
                    setNaicsCodes(response.data);
                }
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                    return;
                }
            }).finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >
            <Box marginBottom={2} sx={{ display: 'flex', justifyContent: 'space-between', pt: '14px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                    <i className="uil-streering" style={{ marginRight: '10px', fontSize: '24px' }} />
                    <Typography variant='h1' sx={{ fontSize: '24px', fontWeight: '500', color: '#000' }} >
                        Labor Categories
                    </Typography>
                </Box>
            </Box>

            {/* <List style={{ display: 'flex', padding: 0 }}>
                <ListItem style={{ width: 'auto' }}>
                    <Button
                        color="inherit"
                        component={NavLink}
                        to={`/${company.slug}/labor-categories`}
                        activeClassName="active"
                        sx={{
                            color: 'inherit',
                            '&.active': {
                                color: 'primary.main',
                                fontWeight: 'bold',
                                borderBottom: '2px solid',
                                borderColor: 'primary.main',
                                borderRadius: '0px',
                            },
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(`/${company.slug}/labor-categories`);
                        }}
                    >
                        Labor Categories
                    </Button>               
                </ListItem>
            </List> */}

            <Box sx={{ px: 2 }}>
                <LaborCategoriesList />
            </Box>

            <AddLaborCategoryDialog naicsCodes={naicsCodes} />

            <EditLaborCategoryDialog naicsCodes={naicsCodes} />
        </div>
    )
}

export default LaborCategories;