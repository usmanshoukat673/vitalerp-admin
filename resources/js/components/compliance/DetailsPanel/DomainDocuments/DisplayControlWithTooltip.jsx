import React, { useEffect, useState } from 'react';
import TreeTooltip from '../../STDTree/TreeTooltip';
import { forEach } from 'lodash';

const DisplayControlWithTooltip = ({ controls }) => {

    const [first_control, setFirstControl] = useState({});
    const [other_controls, setOtherControls] = useState([]);

    useEffect(() => {
        forEach(controls, (control, index) => {
            if (index == 0) {
                setFirstControl(control);
            }
            else {
                setOtherControls(prevState => [...prevState, control]);
            }
        });
    }, [controls]);

    const getOtherControls = () => {
        return "Also linked to: " + other_controls.map(control => control.number).join(', ');
    }

    return (
        <>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <span>{first_control.number}</span>
                {
                    other_controls.length > 0 && <TreeTooltip id={`control_number_tooltip_${first_control.id}`} tooltipText={getOtherControls()} />
                }
            </div>
        </>
    )
}

export default DisplayControlWithTooltip;