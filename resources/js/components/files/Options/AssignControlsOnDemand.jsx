import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import AssignDocToControls from '../../file-manager/Document/AssignDocToControls';
import ArticleIcon from '@mui/icons-material/Article';

const AssignControlsOnDemand = ({ document }) => {

    const [assign, setAssign] = useState(false);
    const [active_document, setActiveDocument] = useState([]);

    const { token, company, standards } = useSelector(state => ({
        token: state.token.activeToken,
        company: state.orgs.company,
        standards: state.compliance.standards,
    }));

    const handleAssign = () => {
        setAssign(true);
        setActiveDocument(document);
    }

    const handleAssignClose = () => {
        setAssign(false);
        setActiveDocument({});
    }

    return (
        <>
            <IconButton onClick={handleAssign} color={assign ? 'secondary' : 'default'} >
                <ArticleIcon style={{color: '#2722a1', fontSize: '35px'}} />
            </IconButton>

            {assign ? <AssignDocToControls document={active_document} token={token} company={company} standards={standards} onclose={handleAssignClose} /> : ''}
        </>
    );
}

export default AssignControlsOnDemand;