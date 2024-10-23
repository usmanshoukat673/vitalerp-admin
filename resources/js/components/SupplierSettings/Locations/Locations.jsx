import React from "react";
import { useSelector } from "react-redux";
import VisitDashboardBreadcrum from "../../dashboard/VisitDashboardBreadcrum";
import SupplierLocationsList from "./SupplierLocationsList";
import AddSupplierLocationDialog from "./AddSupplierLocationDialog";
import EditSupplierLocationDialog from "./EditSupplierLocationDialog";

const Locations = () => {

    const { company, leftnav, states, countries } = useSelector((state) => ({
        company: state.orgs.company,
        leftnav: state.leftnav,
        states: state.validvalues.states,
        countries: state.validvalues.countries
    }));

    return (
        <>
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''}>
                <div className="gnsettings__mainbd">
                    <div className="gnsettings__breadcrum"><VisitDashboardBreadcrum /> {' > '} Secondary Locations</div>

                    <div className="gnsettings__header">
                        <div className="__name">Secondary Locations</div>
                        <div className="__actions">
                            {/**<Link to="/select-organization"><Button basic color="black">Change Organization</Button></Link> */}
                        </div>
                    </div>
                </div>

                <div className="gnsettings__container">
                    <SupplierLocationsList />
                </div>
            </div>

            <AddSupplierLocationDialog states={states} countries={countries} />

            <EditSupplierLocationDialog states={states} countries={countries} />
        </>
    )
}

export default Locations;