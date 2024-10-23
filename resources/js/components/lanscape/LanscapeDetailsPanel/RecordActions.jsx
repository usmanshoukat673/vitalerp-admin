import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { saveRecord, selectLanChildAsset, selectLanDetailsPanelType, selectLanParentAsset, setDeleteRecord } from '../../../actions';
import _ from 'lodash';
import { withRouter } from "react-router-dom";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const RecordActions = ({ record, history }) => {

    const dispatch = useDispatch();

    const { lan_assets, category, tree_mode } = useSelector((state) => ({
        lan_assets: state.lanscape.lan_assets,
        category: state.lanscape.category,
        tree_mode: state.leftnav.tree_mode,
    }));

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        setAnchorEl(null);
        dispatch(setDeleteRecord({
            open: true,
            record,
        }));
    }

    const handleModify = () => {

        let sub_asset = undefined;
        let parent_asset = undefined;

        _.forEach(lan_assets, pa => {
            sub_asset = _.find(pa.childs, sa => {
                return sa.id == record.asset_id
            });
            if(sub_asset) {return false;}
        });

        if(sub_asset)
        {
            parent_asset = _.find(lan_assets, asset => {
                return asset.id == sub_asset.parent
            });
        }

        if(sub_asset && parent_asset)
        {
            dispatch(selectLanDetailsPanelType('record'));
            dispatch(selectLanParentAsset(parent_asset));
            dispatch(selectLanChildAsset(sub_asset));
            dispatch(saveRecord(record));
            history.push(`/${tree_mode.route}/${category.slug}/${parent_asset.id}/${sub_asset.id}/${record.id}`);
        }
    }

    return (
        <div>
            <IconButton
                aria-label="action menu"
                id="document-action-button"
                aria-controls={open ? 'document-action-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ height: '37px' }}
            >
                <MoreVertIcon />
            </IconButton>
            <StyledMenu
                id="document-action-menu"
                MenuListProps={{
                    'aria-labelledby': 'document-action-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleModify} disableRipple>
                    <EditIcon />
                    Modify
                </MenuItem>
                <MenuItem onClick={handleDelete} disableRipple>
                    <DeleteIcon />
                    Delete
                </MenuItem>
            </StyledMenu>
        </div>
    );
}
export default withRouter(RecordActions);