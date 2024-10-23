import * as React from 'react';
import { useSelector } from 'react-redux';

export default function SubAssetInfo() {

    const { sub_asset } = useSelector((state) => ({
        sub_asset: state.lanscape.sub_asset,
    }));

    return (
        <>
            <div className='__information_table'>

                <div className='_row'>
                    <div className='_left_c'>Name</div>
                    <div className='_right_c'>
                        {/* input box  */}
                    </div>
                </div>

                <div className='_row'>
                    <div className='_left_c'>Contact</div>
                    <div className='_right_c'></div>
                </div>

                 <div className='_row'>
                    <div className='_left_c'>Phone</div>
                    <div className='_right_c'></div>
                </div>

                <div className='_row'>
                    <div className='_left_c'>Address</div>
                    <div className='_right_c'></div>
                </div>

                <div className='_row'>
                    <div className='_left_c'>Hardware(s)</div>
                    <div className='_right_c'>
                        {/* when typing hardware, it should give you sub categories from the hardware, 
                        I can select more than one categories, eg. multiple hardwares Dell 

                        In hardware for lanscapre, there should be vendors - so basically vendor is related to hardwared because of category selection 
                        
                        there will tabs on sub categories 

                        Lanscapre, threat, organation tabs 

                        sub tabs: 

                        Main categories are the sub tabs 

                        vendor - suppier 

                        lanscape = hardware software cloud 

                        last modified isue in docuents 
                        
                        */}
                    </div>
                </div>
                <div className='_row'>
                    <div className='_left_c'>Software(s)</div>
                    <div className='_right_c'></div>
                </div>
                 <div className='_row'>
                    <div className='_left_c'>Cloud(s)</div>
                    <div className='_right_c'></div>
                </div>
                 <div className='_row'>
                    <div className='_left_c'>Certifications</div>
                    <div className='_right_c'></div>
                </div>

            </div>
        </>
    );
}