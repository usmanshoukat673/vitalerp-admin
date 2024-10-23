import React from "react";
import YYYYMMDD from "../../../../utils/YYYYMMDD";
import { useDispatch, useSelector } from "react-redux";
import prettyBytes from 'pretty-bytes';
import { Image } from 'semantic-ui-react';
import { setOpenDocument } from "../../../../actions";
import PolicyPanelVisiblityToggle from "./PolicyPanelVisiblityToggle";
import DocumentActions from "./DocumentActions";
import DisplayControlWithTooltip from "./DisplayControlWithTooltip";

const UploadedDocument = ({ from, company_document, action_column, multiple_controls }) => {

    const dispatch = useDispatch(); // 

    const handleOpen = () => {
        dispatch(setOpenDocument({
            open: true,
            document_type: 'file',
            document: company_document.document,
            from
        }));
    }

    return (
        <>
            <tr>
                <td>
                    <div className="cj__document">
                        <Image onClick={handleOpen} style={{ height: '35px' }} src={`/images/icons/${company_document.document.ext}.png`} />
                        <div className="cj__document__name">
                            <span onClick={handleOpen}>{company_document?.document?.name}</span>
                        </div>
                    </div>
                </td>
                <td>
                    {
                        multiple_controls ? <>
                            {company_document?.controls.length > 0 ? <DisplayControlWithTooltip controls={company_document.controls} /> : `${company_document.controls[0].number}`}
                        </> : `${company_document?.control?.number}`
                    }
                </td>
                {
                    from == 'control' && <td>
                        <PolicyPanelVisiblityToggle artifact={company_document} />
                    </td>
                }
                <td>
                    {YYYYMMDD(company_document.document.modified)}
                </td>
                <td>{company_document.document.size ? prettyBytes(company_document.document.size) : ''}</td>
                <td>{company_document.document.docowner ? `${company_document.document.docowner.first_name} ${company_document.document.docowner.last_name}` : '--'}</td>
                <td>File</td>
                {
                    action_column && <td>
                        <DocumentActions company_document={company_document} from={from} />
                    </td>
                }
            </tr>
        </>
    );
}

export default UploadedDocument;
