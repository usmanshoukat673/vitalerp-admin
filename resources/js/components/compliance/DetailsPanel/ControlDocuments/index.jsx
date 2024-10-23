import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import DigitalDocument from '../DomainDocuments/DigitalDocument';
import UploadedDocument from '../DomainDocuments/UploadedDocument';
import Alert from '@mui/material/Alert';
import DocumentProvider from './DocumentProvider';

const ControlDocuments = () => {

    const { control_documents } = useSelector((state) => ({
        control_documents: state.compliance.control_documents
    }));

    return (
        <>

            <DocumentProvider />

            {
                _.size(control_documents) > 0 ?
                    <>
                        <Table responsive className="table table-centered table-nowrap mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="border-0">Name</th>
                                    <th className="border-0">Control</th>
                                    <th className="border-0">Policy Panel</th>
                                    <th className="border-0">Date</th>
                                    <th className="border-0">Size</th>
                                    <th className="border-0">Owner</th>
                                    <th className="border-0">Type</th>
                                    <th className="border-0" style={{ width: '80px' }}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    _.map(control_documents, document => {
                                        if (document.document.type === 'file') {
                                            return <UploadedDocument from="control" key={`${document.id}-file`} company_document={document} action_column={true} multiple_controls={false} />
                                        }
                                        else if (document.document.type === 'document') {
                                            return <DigitalDocument from="control" key={`${document.id}-document`} company_document={document} action_column={true} multiple_controls={false} />
                                        }
                                    })
                                }

                            </tbody>
                        </Table>
                    </>
                    : <Alert severity="info">Document not found.</Alert>

            }

        </>
    )
}

export default ControlDocuments;