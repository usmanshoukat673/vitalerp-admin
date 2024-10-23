import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const DHeader = ({title, close}) => {
    return (
        <div className="dialog__header">
            <div className="dialog__header__content">
                <div>
                    <button onClick={close} className="dialog__header__close"><CloseIcon /></button>
                </div>
                <h2 className="dialog__header__title">{title}</h2>
            </div>
        </div>
    );
}

export default DHeader;