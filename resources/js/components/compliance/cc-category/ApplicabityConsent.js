import React from 'react';
import { Modal, Header, Button, Icon } from 'semantic-ui-react';

const ApplicabityConsent = ({ control_conset, keepControlAsIs, setControlNA }) => {
    return (
        <Modal
            className="semtic__modal"
            open={control_conset}
        >
            <Modal.Content className="cc_modal_container">
                <p>
                    Setting this control as not applicable may cause an issue during an assessment.
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button className="cj__custom__button __cj__green" onClick={keepControlAsIs}>
                    Cancel
                </Button>
                <Button className="cj__custom__button __cj__red" onClick={setControlNA}>
                    <Icon name='checkmark' /> Continue
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default ApplicabityConsent;
