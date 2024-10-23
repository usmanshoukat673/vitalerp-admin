import * as React from 'react';
import { useSelector } from 'react-redux';
import { extractIds } from '../../../utils';
import BaselinePriority from './BaselinePriority';

export default function StandardInfo() {

    const { standard, parent_domain, standard_info } = useSelector((state) => ({
        standard: state.leftnav.standard,
        parent_domain: state.compliance.parent_domain,
        standard_info: state.compliance.standard_info,
    }));

    return (
        <>
            <div className='__information_table'>

                <div className='_row'>
                    <div className='_left_c'>Name</div>
                    <div className='_right_c'>{`${standard.standard.name}`}</div>
                </div>

                <div className='_row'>
                    <div className='_left_c'>Type</div>
                    <div className='_right_c'>{`${standard.standard.type}`}</div>
                </div>
                <div className='_row'>
                    <div className='_left_c'>Family</div>
                    <div className='_right_c'>
                        {
                            _.map(standard.standard.families, (family, index) => <span key={index}>
                                {`${family.family.name}${index < standard.standard.families.length - 1 ? ', ' : ''}`}
                            </span>)
                        }
                    </div>
                </div>
                <div className='_row'>
                    <div className='_left_c'>Focus</div>
                    <div className='_right_c'>
                        {
                            _.map(standard.standard.focuses, (focus, index) => <span key={index}>
                                {`${focus.focus.name}${index < standard.standard.focuses.length - 1 ? ', ' : ''}`}
                            </span>)
                        }
                    </div>
                </div>
                <div className='_row'>
                    <div className='_left_c'>Statutes</div>
                    <div className='_right_c'>
                        {
                            _.map(standard.standard.statutes, (statue, index) => <span key={index}>
                                {`${statue.satue.name}${index < standard.standard.statutes.length - 1 ? ', ' : ''}`}
                            </span>)
                        }
                    </div>
                </div>
                 {/* <div className='_row'>
                    <div className='_left_c'>Domains</div>
                    <div className='_right_c'>{extractIds(parent_domain).length}</div>
                </div> */}
                <div className='_row'>
                    <div className='_left_c'>Controls</div>
                    <div className='_right_c'>{standard_info?.control_count}</div>
                </div>
                <div className='_row'>
                    <div className='_left_c'>Documents</div>
                    <div className='_right_c'>{standard_info?.documents_count}</div>
                </div>
                 <div className='_row'>
                    <div className='_left_c'>Baseline Priority</div>
                    <div className='_right_c'>
                        <BaselinePriority />
                    </div>
                </div>
            </div>
        </>
    );
}