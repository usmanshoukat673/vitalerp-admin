import * as React from 'react';
import { useSelector } from 'react-redux';

export default function ControlDescription() {

    const { record } = useSelector((state) => ({
        record: state.lanscape.record,
    }));

    return (
        <>
            <div>
                <div style={{fontWeight: '600'}}>Description:</div>
                {record?.description}
            </div>
        </>
    );
}