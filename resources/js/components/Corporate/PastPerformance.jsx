import React, { useEffect, useState } from "react";
import LoadingBackgrop from "../LoadingBackgrop";
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/api";
import { useHistory, useParams } from "react-router-dom";
import { getModuleAccess } from "../../helpers/getModuleAccess";
import DomainLaborCategoryForm from "./DomainLaborCategoryForm";
import { setCorporateProfileStatus } from "../../actions";
import { Divider, useTheme } from "@mui/material";

const PastPerformance = () => {

    const theme = useTheme();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [domains, setDomains] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    const { supplier_name } = useParams();

    const { active_supplier, company, supplier, corporate_profile_status } = useSelector((state) => ({
        active_supplier: state.corporate.active_supplier,
        company: state.orgs.company,
        supplier: state.supplier.supplier,
        corporate_profile_status: state.corporate.corporate_profile_status
    }));

    useEffect(() => {
        if (!getModuleAccess(_.size(company?.roles) > 0 ? company.roles : [], _.size(supplier?.roles) > 0 ? supplier.roles : [], [12, 14, 19, 2, 3, 5])) {
            history.push('/dashboard');
        }
    }, [company, supplier]);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get(`/api/user/corporate-profile/past-performance/${active_supplier.id}`)
            .then(e => {
                setDomains(e.data.past_performance);
                dispatch(setCorporateProfileStatus({
                    ...corporate_profile_status,
                    past_performance: e.data.isCompleted
                }));
                setLoading(false);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }

            }).finally(() => {
                setLoading(false);
            });
    }, [active_supplier, supplier_name]);

    return (
        <>
            {loading && <LoadingBackgrop open={loading} />}

            <section style={{ padding: '20px' }}>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        {
                            _.isEmpty(domains) && <h4>No Past Performance Found</h4>
                        }
                        {
                           !_.isEmpty(domains) && <hr style={{borderColor: theme.palette.primary.default, marginTop: '0px'}} />
                        }
                        {
                            _.map(domains, (domain, index) => {
                                return (
                                    <DomainLaborCategoryForm key={index} domain={domain} />
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </section >
        </>
    );
}

export default PastPerformance;