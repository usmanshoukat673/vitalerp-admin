import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import portalAxiosInstance from "../api/portalApi";
import { setToken } from "../actions";
import { withRouter } from "react-router-dom";

const VisitConsole = ({ history }) => {

    const dispatch = useDispatch();

    const [switching, setSwithing] = useState(false);
    const [has_account, setHasAccount] = useState(false);

    const { user, token, company, portalToken } = useSelector(state => ({
        user: state.user.activeUser,
        token: state.token.activeToken,
        company: state.orgs.company,
        portalToken: state.token.portalToken,
    }));

    useEffect(() => {
        portalAxiosInstance.get(`/has-account`)
            .then(e => {
                setHasAccount(e.data.flag);
            });
    }, []);

    const backToConsole = () => {
        setSwithing(true);
        if (_.isEmpty(user) && _.isEmpty(token) && _.isEmpty(company)) {
            history.push(`/login`);
        }
        else {
            dispatch(setToken(portalToken));
            history.push(`/${company.slug}/compliance-stack`);
        }
        setSwithing(false);
    }

    return (
        <>
            {
                has_account ? <li className="notification-list">
                    <Button disabled={switching} onClick={backToConsole} className='mui-button' variant="outlined">Console</Button>
                </li > : <span></span>
            }
        </>
    )
}

export default withRouter(VisitConsole);