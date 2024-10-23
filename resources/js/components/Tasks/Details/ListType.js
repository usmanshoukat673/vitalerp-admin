// @flow
import React from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import Checkboxes from './Checkboxes';
import Radios from './Radios';
import FillInTheBlank from './FillInTheBlank';
import { connect } from 'react-redux';

const ListType = ({ listtype, index, handle_change, token }) => {

    const handleCheck = (listItems) => {
        const listType = {...listtype};
        listType.list_items = listItems;
        handle_change(index, listType)
    }

    const getOptions = () => {
        if (listtype.type === 'checkbox') {
            return <Checkboxes handle_check={handleCheck} list_items={listtype.list_items} token={token} />
        }
        else if (listtype.type === 'radio') {
            return <Radios list_items={listtype.list_items} type_id={listtype.id} handle_check={handleCheck} token={token} />
        }
        else if (listtype.type === 'fill_in_the_blank') {
            return <FillInTheBlank handle_check={handleCheck} list_items={listtype.list_items} token={token} />
        }
    }

    return (
        <Card>
            <Card.Header>
                <h4 className="my-1">{listtype.name}</h4>
            </Card.Header>
            <Card.Body>
                {getOptions()}
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
});

export default connect(mapStateToProps)(ListType)
