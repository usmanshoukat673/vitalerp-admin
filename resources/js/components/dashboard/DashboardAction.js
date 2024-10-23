import React, {useEffect} from "react";
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import axiosInstance from '../../api/api';
import { useDispatch, useSelector } from "react-redux";
import { setCorporateProfileStatus } from '../../actions';

const DashboardAction = ({  }) => {

    const dispatch = useDispatch();

    const { supplier, corporate_profile_status} = useSelector(state => ({
        supplier: state.supplier.supplier,
        corporate_profile_status: state.corporate.corporate_profile_status,
    }));
    
    useEffect(() => {
        if (!_.isNull(supplier)) {
            loadCoporateProfileStatus();
        }
    }, [supplier]);

    const loadCoporateProfileStatus = () => {
        axiosInstance.get(`/api/user/corporate-profile/overall-progress/${supplier.id}`)
            .then(e => {
                dispatch(setCorporateProfileStatus({
                    ...corporate_profile_status,
                    ...e.data
                }));
            });
    }

    const steps = [
        { label: "Corporate Information", status: corporate_profile_status.corporate_information },
        { label: "Supplier Capability", status: corporate_profile_status.supplier_capability },
        { label: "Supplier Socioeconomic", status: corporate_profile_status.supplier_socioenomic },
        { label: "Security Certifications", status: corporate_profile_status.security_certifications },
        { label: "Past Performance", status: corporate_profile_status.past_performance }
    ];

    const completedSteps = steps.filter(step => step.status === true).length;
    const totalSteps = steps.length;
    const completionPercentage = (completedSteps / totalSteps) * 100;
    const isProfileCompleted = completedSteps === totalSteps;
  
  return (
    <Box>
        <Typography variant="body1">
        {isProfileCompleted
            ? "Corporate Profile Completed"
            : "Corporate Profile Pending Completion"}
        </Typography>
        <Typography variant="body2">
        Completion: {completionPercentage}%
        </Typography>
        <Box>
        {steps.map((step, index) => (
            <Box key={index} 
                sx={{ display: 'flex', alignItems: 'center', mt: 1}}>

                {step.status ? (
                    <CheckCircleIcon sx={{ color: 'green', mr: 1 }} />
                ) : (
                    <CancelIcon sx={{ color: 'red', mr: 1 }} />
                )}
                <Typography>{step.label}</Typography>
            </Box>
        ))}
        </Box>
    </Box>
  );
};

export default DashboardAction;
