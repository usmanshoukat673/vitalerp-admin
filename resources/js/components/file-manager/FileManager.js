import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './FileManager.scss';
import { closeSubLeftNav, selectControlFunction, selectCatalogSection } from '../../actions';
import { Route } from 'react-router-dom';
import Documents from './Documents';
import FileExplorer from './FileExplorer';
import RightDrawer from '../../layouts/RightDrawer';
import { useSelector } from 'react-redux';

const RightSidebar = () => {
    return(
        <div>
            TODO
        </div>
    )
}

const FileManager = ({company, leftnav}) => {

    const [loading, setLoading] = useState(false);

    const { documents } = useSelector((state) => ({
        documents: state.files.documents
    }));

    useEffect(() => {
        closeSubLeftNav();
        selectControlFunction({});
        selectCatalogSection({});
    }, []);

    return (
        <>
        <div className={leftnav.open_sub ? 'sub__slide__menu_opened file__manager__module' : 'file__manager__module'}>

            <FileExplorer documents={documents} company={company} />

            <div className="settings_wrapper">
                <Route exact path={`/:name/files/:document_id`} component={Documents} />
            </div>

        </div>

        <RightDrawer title="File Manager" component={<RightSidebar />} />
    </>
    );
}

export default FileManager;