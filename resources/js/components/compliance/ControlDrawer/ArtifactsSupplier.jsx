import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import AddIcon from '@mui/icons-material/Add';
import LinkArtifact from '../LinkArtifact';
import CreateArtifact from '../CreateArtifact';
import UploadArtifact from '../UploadArtifact';
import CloseIcon from '@mui/icons-material/Close';

const ArtifactsSupplier = ({ control, token, company, artifactSupplied }) => {

    const [upload_artifact, setUploadArtifact] = useState(false);
    const [link_artifact, setLinkArtifact] = useState(false);
    const [new_artifact, setNewArtifact] = useState(false);

    const handleLinkedArtifacts = (section_documents, artifacts) => {
        setLinkArtifact(false);
        artifactSupplied(artifacts);
    }

    const handleArtifactCreated = (section_documents, artifacts) => {
        setNewArtifact(false);
        artifactSupplied(artifacts);
    }

    const handleArtifactsUploaded = (section_documents, artifacts) => {
        setUploadArtifact(false);
        artifactSupplied(artifacts);
    }

    return (
        <>
            <div className="__docs__buttons">
                <Button className="__c_c_button" onClick={() => setUploadArtifact(true)}>Upload Document</Button>
                <Button className="__c_c_button" onClick={() => setLinkArtifact(true)}>Link Document</Button>
                {
                    new_artifact ? <div className="__cuttom_button" onClick={() => setNewArtifact(false)}>
                        <CloseIcon />
                        Cancel Creating
                    </div> : <div className="__cuttom_button" onClick={() => setNewArtifact(true)}>
                        <AddIcon />
                        New Document
                    </div>
                }
            </div>

            {
                upload_artifact ? <UploadArtifact
                    uploaded={handleArtifactsUploaded}
                    control={control}
                    open={upload_artifact}
                    close={() => setUploadArtifact(false)}
                    token={token}
                    company={company} /> : ''
            }

            {
                link_artifact ? <LinkArtifact
                    control={control}
                    open={link_artifact}
                    close={() => setLinkArtifact(false)}
                    linked={handleLinkedArtifacts}
                    token={token}
                    company={company} /> : ''
            }

            {
                new_artifact ? <CreateArtifact
                    created={handleArtifactCreated}
                    control={control}
                    open={new_artifact}
                    closed={() => setNewArtifact(false)}
                    token={token}
                    company={company}
                    inline={true}
                /> : ''
            }
        </>
    )
}

export default ArtifactsSupplier;