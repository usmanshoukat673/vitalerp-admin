import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

const IdleTimeOutModal = ({handleClose, showModal, handleLogout}) => {
    return (
        <Modal size="tiny" className="semtic__modal cccc__modal" open={showModal} onClose={handleClose}>
            <Modal.Header>You Have Been Idle!</Modal.Header>
            <Modal.Content>
                <p>You Will Get Timed Out. You want to stay?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={handleLogout}>Logout</Button>
                <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content='Stay'
                    onClick={handleClose}
                />
            </Modal.Actions>
        </Modal>
    );
}

export default IdleTimeOutModal;