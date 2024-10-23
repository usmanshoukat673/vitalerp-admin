import React from 'react';
import DOMPurify from 'dompurify';

const DigitalDocument = ({ document }) => {

    const sanitizedHtml = () => {
        if (!_.isEmpty(document)) {
            return DOMPurify.sanitize(document.document.content);
        }
        return '<p>Empty Document.</p>';
    }

    return (
        <>
            <h1 className='__policy_header'>{!_.isEmpty(document) && document.document.name}</h1>

            <div dangerouslySetInnerHTML={{ __html: sanitizedHtml() }}></div>
        </>
    )
}

export default DigitalDocument;