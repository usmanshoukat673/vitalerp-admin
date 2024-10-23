import React from 'react';
import { Modal } from 'semantic-ui-react';
import CloseIcon from '@mui/icons-material/Close';
import TaskDetails from './index';

const TaskDetailsModal = ({ open, close, token, company }) => {

    return (
        <Modal
            className="semtic__modal cccc__modal"
            open={open}
            onClose={close}
            size="large"
            centered={true}
        >

            <Modal.Content className="cc_modal_container">
                <div className="cccc__header">
                    <div className="__c__number">
                    </div>
                    <div className="__c__close">
                        <CloseIcon onClick={close} />
                    </div>
                </div>

                <TaskDetails token={token} company={company} title_bar={false} />
            </Modal.Content>

        </Modal>
    );
}



export default TaskDetailsModal;
