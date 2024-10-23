import * as React from 'react';
import { useSelector } from 'react-redux';
import { extractIds } from '../../../utils';

export default function DomainInfo() {

    const { company, standard, details_panel_type, parent_domain, sub_domain, control, domain_info } = useSelector((state) => ({
        company: state.orgs.company,
        standard: state.leftnav.standard,
        details_panel_type: state.compliance.details_panel_type,
        parent_domain: state.compliance.parent_domain,
        sub_domain: state.compliance.sub_domain,
        control: state.compliance.control,
        domain_info: state.compliance.domain_info,
    }));

    return (
        <>
            <div className='__information_table'>

                <div className='_row'>
                    <div className='_left_c'>Name</div>
                    <div className='_right_c'>{`${sub_domain.name}`}</div>
                </div>

                <div className='_row'>
                    <div className='_left_c'>Standard Name</div>
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
                 <div className='_row'>
                    <div className='_left_c'>Sub Domains</div>
                    <div className='_right_c'>{extractIds(parent_domain).length}</div>
                </div>
                <div className='_row'>
                    <div className='_left_c'>Controls</div>
                    <div className='_right_c'>{domain_info?.control_count}</div>
                </div>
                <div className='_row'>
                    <div className='_left_c'>Documents</div>
                    <div className='_right_c'>{domain_info?.documents_count}</div>
                </div>

            </div>
        </>
    );
}