import * as React from 'react';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';

export default function ControlDescription() {

    const { control_info } = useSelector((state) => ({
        control_info: state.compliance.control_info,
    }));

    const sanitizedHtml = (text) => {
        if (!_.isEmpty(text)) {
            return DOMPurify.sanitize(text);
        }
        return '';
    }

    return (
        <>
            <div>
                <div style={{fontWeight: '600'}}>Description:</div>
                <div dangerouslySetInnerHTML={{ __html: sanitizedHtml(control_info?.control?.control?.description) }}></div>
            </div>
        </>
    );
}