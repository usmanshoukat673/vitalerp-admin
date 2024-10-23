import React, { useEffect, useState } from "react";
import { Box, List, ListItem, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../api/api";
import CompanyDomainsList from './CompanyDomainsList';
import AddDomainDialog from "./AddDomainDialog";
import EditDomainDialog from "./EditDomainDialog";

const CompanyDomains = () => {

    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    return (
        <>
            <Box sx={{ px: 2 }}>
                <CompanyDomainsList />
            </Box>

            <AddDomainDialog />

            <EditDomainDialog />
        </>
    )
}

export default CompanyDomains;