import React from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import { Image } from 'semantic-ui-react';

const DocumentIcon = ({ document }) => {
    return (
        <>
            {document.type === 'file' && <Image src={`/images/icons/${document.ext}.png`} />}

            {document.type === 'document' && <ArticleIcon />}
        </>
    )
}

export default DocumentIcon;