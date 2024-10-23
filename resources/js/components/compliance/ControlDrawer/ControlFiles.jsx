// @flow
import React from 'react';
import { Card, Row } from 'react-bootstrap';
import prettyBytes from 'pretty-bytes';
import { Icon, Image } from 'semantic-ui-react';

const ControlFiles = ({ artifacts, openDocument }) => {

    const docIcon = (type, ext) => {
        if (type === 'document') {
            return <Icon name="file" />
        }
        else {
            return <Image style={{ height: '18px' }} src={`/images/icons/${ext}.png`} />
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h5 className="card-title mb-3">Artifacts</h5>

                    {
                        _.map(artifacts, (art) => (
                            <Card key={art.id} className="mb-1 shadow-none border">
                                <div className="p-2">

                                    <Row className="align-items-center">

                                        <div className="col-auto">
                                            {docIcon(art.document.type, art.document.ext)}
                                        </div>
                                        <div className="col ps-0">
                                            <div onClick={() => openDocument(art.document, false)} className="text-muted fw-bold chand">
                                                {art.document.name}
                                            </div>
                                            <p className="mb-0">{art.document.size ? prettyBytes(art.document.size) : ''}</p>
                                        </div>
                                    </Row>
                                </div>
                            </Card>
                        ))
                    }
                </Card.Body>
            </Card>
        </>
    );
};

export default ControlFiles;
