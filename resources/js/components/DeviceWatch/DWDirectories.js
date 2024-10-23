import React, { Component } from 'react';
import { Accordion, Icon, Segment, Header, Feed } from 'semantic-ui-react';
import _ from 'lodash';
import showTZDate from '../../utils/showTZDate';

class DWDirectories extends Component {

    state = {
        activeIndex: 0
    };

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    showIcon = type => {
        if (type == 'File') {
            return <Icon name="file" />;
        }
        else if (type == 'Folder') {
            return <Icon name="folder" />;
        }
        else {
            return <Icon name="desktop" />;
        }
    }

    listDirectories = directories => {

        const { activeIndex } = this.state;
        const { company } = this.props;

        return _.map(directories, directory => {
            return (
                <Accordion key={directory.id} fluid styled>
                    <Accordion.Title
                        active={activeIndex === directory.id}
                        index={directory.id}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        {directory.path}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === directory.id}>
                        <Feed>
                            {
                                _.map(directory.ativities, activity => {
                                    return (
                                        <Feed.Event key={activity.id}>
                                            <Feed.Label>
                                                {this.showIcon(activity.type)}
                                            </Feed.Label>
                                            <Feed.Content>
                                                <Feed.Summary>
                                                    The {activity.type} <Feed.User>{activity.name}</Feed.User> has {activity.event} at
                                                    <Feed.Date>{showTZDate(activity.event_date, company.timezone)}</Feed.Date>
                                                </Feed.Summary>
                                            </Feed.Content>
                                        </Feed.Event>
                                    );
                                })
                            }

                        </Feed>
                    </Accordion.Content>
                </Accordion>
            );;
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { directories } = this.props;


        return (
            <Segment>
                <Header as="h3">Directories</Header>

                {this.listDirectories(directories)}
            </Segment>
        );
    }
}

export default DWDirectories;
