import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VisitDashboardBreadcrum from "../../dashboard/VisitDashboardBreadcrum";
import axiosInstance from "../../../api/api";
import { NotificationManager } from "react-notifications";
import SupplierUsersList from "./SupplierUsersList";
import AddSupplierUserDialog from "./AddSupplierUserDialog";
import EditSupplierUserDialog from "./EditSupplierUserDialog";

const Users = () => {

    const [roles, setRoles] = useState([]);

    const { leftnav } = useSelector((state) => ({
        leftnav: state.leftnav,
    }));

    useEffect(() => {
        axiosInstance.get('/api/user/suppliers/roles')
            .then(e => {
                setRoles(e.data);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }

            });
    }, []);

    return (
        <>
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''}>
                <div className="gnsettings__mainbd">
                    <div className="gnsettings__breadcrum"><VisitDashboardBreadcrum /> {' > '} Users</div>

                    <div className="gnsettings__header">
                        <div className="__name">Users</div>
                        <div className="__actions">
                            {/**<Link to="/select-organization"><Button basic color="black">Change Organization</Button></Link> */}
                        </div>
                    </div>
                </div>

                <div className="gnsettings__container">

                    <SupplierUsersList roles={roles} />

                </div>
            </div>

            <AddSupplierUserDialog roles={roles} />

            <EditSupplierUserDialog roles={roles} />
        </>
    )
}

export default Users;