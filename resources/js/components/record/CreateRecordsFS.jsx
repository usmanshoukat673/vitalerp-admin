import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from "react-redux";
import { saveModuleDetails, selectLanAssets, toggleCreateRecord } from "../../actions";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CreateHardwareRecord from "./CreateHardwareRecord";
import CreateThirdPartyRecord from "./CreateThirdPartyRecord";
import CreateSoftwareRecord from './CreateSoftwareRecord';
import CreateDatasetRecord from './CreateDatasetRecord';
import CreateInfoSystemRecord from './CreateInfoSystemRecord';
import CreateCloudServicesRecord from "./CreateCloudServicesRecord";
import { MODULE_CLOUDSERVICES, MODULE_DATASETS, MODULE_HARDWARE, MODULE_INFORMATION_SYSTEMS, MODULE_SOFTWARE, MODULE_SUPPLIERS, MODULE_VENDORS } from "../../constants/layout";
import _ from "lodash";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CreateRecordsFS = () => {

    const dispatch = useDispatch();

    const { create_record, category, parent_asset, lan_assets, module_details } = useSelector((state) => ({
        create_record: state.lanscape.create_record,
        category: state.lanscape.category,
        parent_asset: state.lanscape.parent_asset,
        lan_assets: state.lanscape.lan_assets,
        module_details: state.lanscape.module_details,
    }));

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(create_record?.open)
    }, [create_record]);

    const pushRecordInTree = (record, sub_asset_id) => {

         // Update configured & non configure records 
         if (create_record?.type == "configure") {
            let copy_module_details = { ...module_details };
            let copy_not_configured = [...copy_module_details.not_configured];

            copy_module_details.records.push(record);

            _.remove(copy_not_configured, rec => {
                return rec.id === record.id;
            });

            copy_module_details.not_configured = copy_not_configured;

            dispatch(saveModuleDetails(copy_module_details));
        }

        let copy_lan_assets = [...lan_assets];

        let parent_asset_index = _.findIndex(copy_lan_assets, asset => {
            let parentIndex = _.findIndex(asset.childs, child_asset => {
                return child_asset.id === sub_asset_id;
            });
            return parentIndex > -1;
        });

        let child_asset_index = _.findIndex(copy_lan_assets[parent_asset_index].childs, child_asset => {
            return child_asset.id === sub_asset_id;
        });
        copy_lan_assets[parent_asset_index].childs[child_asset_index].records.push(record);

        dispatch(selectLanAssets(copy_lan_assets));
    }

    const handleClose = () => {
        // The reason adding timeout here is because we want to wait if document is still saving the chagnes 
        // if the document waiting to save changes then it will take some time to update redux back again. 
        setTimeout(() => {
            dispatch(toggleCreateRecord({
                open: false,
            }));
        }, 50);
    }


    return (
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                sx={{ maxWidth: '60vw', right: '0', left: '40vw' }}
            >
                <div className='__add_record__header'>

                    <IconButton onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>



                    <div className='_center'>

                        {
                            create_record?.type == 'add' && <div>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Add New {category.name} Record
                                </Typography>
                            </div>
                        }

                        {
                            create_record?.type == 'configure' && <div>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Configure Record
                                </Typography>
                            </div>
                        }

                        {/* 
{details_panel_type === 'parent_asset' && parent_asset.name}
                                {details_panel_type === 'sub_asset' && sub_asset.name}
*/}
                    </div>

                    {/* can add button here */}

                </div>

                {category.id == MODULE_HARDWARE && <CreateHardwareRecord pushRecordInTree={pushRecordInTree} />}

                {(category.id == MODULE_VENDORS || category.id == MODULE_SUPPLIERS) && <CreateThirdPartyRecord pushRecordInTree={pushRecordInTree} />}

                {(category.id == MODULE_SOFTWARE) && <CreateSoftwareRecord pushRecordInTree={pushRecordInTree} />}

                {(category.id == MODULE_CLOUDSERVICES) && <CreateCloudServicesRecord pushRecordInTree={pushRecordInTree} />}

                {(category.id == MODULE_DATASETS) && <CreateDatasetRecord pushRecordInTree={pushRecordInTree} />}

                {(category.id == MODULE_INFORMATION_SYSTEMS) && <CreateInfoSystemRecord pushRecordInTree={pushRecordInTree} />}
            </Dialog>
        </>
    )
}

export default CreateRecordsFS;