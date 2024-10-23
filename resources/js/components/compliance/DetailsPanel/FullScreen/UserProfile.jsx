import React from "react";
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import getInitial from "../../../../utils/getInitial";
import DownloadDocument from "../DownloadDocument";

const CustomButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[900]),
  backgroundColor: purple[900],
  '&:hover': {
    backgroundColor: purple[900],
  },
}));

const UserProfile = ({ handleClose, title }) => {

    const { company, user, open_document } = useSelector((state) => ({
        company: state.orgs.company,
        user: state.user.activeUser,
        open_document: state.compliance.open_document,
    }));

    return (
        <div className='right'>

            <DownloadDocument 
                document={open_document.document} 
                title="Download"

             />

            <CustomButton sx={{ml: '10px', mr: '10px'}} onClick={handleClose} variant="contained">{title}</CustomButton>

            <div className='active_user'>
                <span className="__the_initials">
                    {getInitial(`${user.first_name} ${user.last_name}`)}
                </span>
                <div className='user'>
                    <div className="account-user-name">{`${user.first_name} ${user.last_name}`}</div>
                    <div className="account-position">{company.name} [{company.plan}]</div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;