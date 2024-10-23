import React, { useEffect, useState } from "react";
import LoadingBackgrop from "../LoadingBackgrop";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import AddLocationDialog from "./AddLocationDialog";
import { setAddOfficeLocationDialog } from "../../actions";
import NavigationWithConfirmation from "../../NavigationWithConfirmation";
import { useHistory } from "react-router-dom";
import { getModuleAccess } from "../../helpers/getModuleAccess";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const OfficeLocations = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    const history = useHistory();

    const { company, supplier } = useSelector((state) => ({
        company: state.orgs.company,
        supplier: state.supplier.supplier
    }));

    useEffect(() => {
        if (!getModuleAccess(_.size(company?.roles) > 0 ? company.roles : [], _.size(supplier?.roles) > 0 ? supplier.roles : [], [12, 14, 19, 2, 3, 5])) {
            history.push('/dashboard');
        }
    }, [company, supplier]);

    useEffect(() => {
        setName(supplier?.name)
    }, [supplier]);

    return (
        <>
            {loading && <LoadingBackgrop open={loading} />}

            <NavigationWithConfirmation />

            <Grid container spacing={2} sx={{ mb: 3, pr: '20px', pl: '20px' }}>
                <Grid item xs={12} sm={8}>
                    <TextField placeholder="Search" label="Search" size="small" fullWidth id="" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button size='medium' onClick={() => dispatch(setAddOfficeLocationDialog({ open: true }))} sx={{ pl: '50px', pr: '50px' }} startIcon={<AddIcon />} variant="contained">Add Location</Button>
                </Grid>
            </Grid>

            <section style={{ padding: '20px' }}>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={6}>

                       
                    </Grid>

                </Grid>
            </section >

            <AddLocationDialog />
        </>
    );
}

export default OfficeLocations;