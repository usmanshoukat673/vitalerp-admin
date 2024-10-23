import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import VisitDashboardBreadcrum from "../dashboard/VisitDashboardBreadcrum";
import axiosInstance from "../../api/api";
import { NotificationManager } from "react-notifications";
import SupplierProfile from "./SupplierProfile";

const GeneralSettings = () => {

    const { company, supplier, leftnav, states, countries } = useSelector((state) => ({
        company: state.orgs.company,
        supplier: state.supplier.supplier,
        leftnav: state.leftnav,
        states: state.validvalues.states,
        countries: state.validvalues.countries
    }));

    const [locations, setLocations] = React.useState([]);

    useEffect(() => {
        getLocations();
    }, []);

    const getLocations = () => {
        axiosInstance.get(`/api/user/suppliers/${supplier.id}/all/locations`)
            .then(e => {
                setLocations(e.data);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }
            });
    }

    return (
        <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''}>
            <div className="gnsettings__mainbd">
                <div className="gnsettings__breadcrum"><VisitDashboardBreadcrum /> {' > '} {supplier.name}</div>

                <div className="gnsettings__header">
                    <div className="__name">Supplier</div>
                    <div className="__actions">
                        {/**<Link to="/select-organization"><Button basic color="black">Change Organization</Button></Link> */}
                    </div>
                </div>
            </div>

            <div className="gnsettings__container">

                <SupplierProfile states={states} locations={locations} countries={countries} />

            </div>
        </div>
    )
}

export default GeneralSettings;