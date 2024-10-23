import * as React from 'react';
import { useSelector } from 'react-redux';

export default function RecordInformation() {

    const { parent_asset, sub_asset, record } = useSelector((state) => ({
        parent_asset: state.lanscape.parent_asset,
        sub_asset: state.lanscape.sub_asset,
        record: state.lanscape.record,
    }));

    return (
        <>
            <div className='__information_table'>

                <div className='_row'>
                    <div className='_left_c'>Name</div>
                    <div className='_right_c'>
                        {`${record.name}`}
                    </div>
                </div>

                <div className='_row'>
                    <div className='_left_c'>Type</div>
                    <div className='_right_c'>
                        {`${sub_asset.name}`}
                    </div>
                </div>

                <div className='_row'>
                    <div className='_left_c'>Created By</div>
                    <div className='_right_c'>
                        {`${record.createdby.first_name} ${record.createdby.last_name}`}
                    </div>
                </div>

                <div className='_row'>
                    <div className='_left_c'>Date Created</div>
                    <div className='_right_c'>
                        {`${record.created_at}`}
                    </div>
                </div>
            </div>
        </>
    );
}