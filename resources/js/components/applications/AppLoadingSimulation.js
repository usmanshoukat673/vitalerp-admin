import React, { Component } from 'react';
import { Card, Button, Placeholder } from 'semantic-ui-react';

class AppLoadingSimulation extends Component {
    render() {
        return (
            <React.Fragment>
                <Card.Group itemsPerRow={4}>
                    <Card>
                        <Placeholder>
                            <Placeholder.Image />
                        </Placeholder>
                        <Card.Content>
                            <Placeholder>
                                <Placeholder.Header>
                                    <Placeholder.Line length='very short' />
                                    <Placeholder.Line length='medium' />
                                </Placeholder.Header>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line length='short' />
                                </Placeholder.Paragraph>
                            </Placeholder>
                        </Card.Content>
                        <Card.Content extra>
                            <Button disabled basic>Loading...</Button>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Placeholder>
                            <Placeholder.Image />
                        </Placeholder>
                        <Card.Content>
                            <Placeholder>
                                <Placeholder.Header>
                                    <Placeholder.Line length='very short' />
                                    <Placeholder.Line length='medium' />
                                </Placeholder.Header>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line length='short' />
                                </Placeholder.Paragraph>
                            </Placeholder>
                        </Card.Content>
                        <Card.Content extra>
                            <Button disabled basic>Loading...</Button>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Placeholder>
                            <Placeholder.Image />
                        </Placeholder>
                        <Card.Content>
                            <Placeholder>
                                <Placeholder.Header>
                                    <Placeholder.Line length='very short' />
                                    <Placeholder.Line length='medium' />
                                </Placeholder.Header>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line length='short' />
                                </Placeholder.Paragraph>
                            </Placeholder>
                        </Card.Content>
                        <Card.Content extra>
                            <Button disabled basic>Loading...</Button>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Placeholder>
                            <Placeholder.Image />
                        </Placeholder>
                        <Card.Content>
                            <Placeholder>
                                <Placeholder.Header>
                                    <Placeholder.Line length='very short' />
                                    <Placeholder.Line length='medium' />
                                </Placeholder.Header>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line length='short' />
                                </Placeholder.Paragraph>
                            </Placeholder>
                        </Card.Content>
                        <Card.Content extra>
                            <Button disabled basic>Loading...</Button>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </React.Fragment>
        );
    }
}

export default AppLoadingSimulation;
