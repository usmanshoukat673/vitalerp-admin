import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import DigitalDocument from './DigitalDocument';
import UploadedDocument from './UploadedDocument';
import Alert from '@mui/material/Alert';

const DomainDocuments = () => {

    const { domain_documents } = useSelector((state) => ({
        domain_documents: state.compliance.domain_documents
    }));

    return (
        <>
            {
                _.size(domain_documents) > 0 ?
                    <>
                        <Table responsive className="table table-centered table-nowrap mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="border-0">Name</th>
                                    <th className="border-0">Control</th>
                                    <th className="border-0">Date</th>
                                    <th className="border-0">Size</th>
                                    <th className="border-0">Owner</th>
                                    <th className="border-0">Type</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    _.map(domain_documents, document => {
                                        if (document.document.type === 'file') {
                                            return <UploadedDocument from="domain" key={`${document.id}-file`} company_document={document} action_column={false} multiple_controls={true} />
                                        }
                                        else if (document.document.type === 'document') {
                                            return <DigitalDocument from="domain" key={`${document.id}-document`} company_document={document} action_column={false} multiple_controls={true}  />
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

export default DomainDocuments;