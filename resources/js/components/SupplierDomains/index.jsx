import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/api";
import { Box } from "@mui/material";
import SupplierDomainsList from "./SupplierDomainsList";
import AssignDomainDialog from "./AssignDomainDialog";


const SupplierDomains = () => {

    const [domains, setDomains] = useState([]);
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadDomains();
    }, []);

    const loadDomains = () => {
        setLoading(true);
        axiosInstance.get('/api/user/domains/all').then((response) => {
            setDomains(response.data);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
        });
    }

    return (
        <>
            <Box sx={{ px: 2 }}>
                <SupplierDomainsList />
            </Box>

            <AssignDomainDialog domains={domains} />
        </>
    )
}

export default SupplierDomains;