import * as React from 'react';
import { useSelector } from 'react-redux';
import { controlBaselinePriorytToLabels } from '../../../utils';
import MaturityLevelDropdown from './DomainControls/MaturityLevelDropdown';

export default function ControlInfo() {

    const { standard, control, control_info } = useSelector((state) => ({
        standard: state.leftnav.standard,
        details_panel_type: state.compliance.details_panel_type,
        parent_domain: state.compliance.parent_domain,
        sub_domain: state.compliance.sub_domain,
        control: state.compliance.control,
        control_info: state.compliance.control_info,
    }));

    return (
        <>
            <div className='__information_table'>

                <div className='_row'>
                    <div className='_left_c'>Name</div>
                    <div className='_right_c'>{`${control.number} ${control.name}`}</div>
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
                    <div className='_left_c'>Baseline Priority</div>
                    <div className='_right_c'>
                        {
                            _.size(control_info?.control?.control?.baseline_priorities) > 0 ?
                            _.map(controlBaselinePriorytToLabels(_.size(control_info?.control?.control?.baseline_priorities) > 0 ? control_info.control.control.baseline_priorities : [] ), (priorty, index) => (
                                index === control_info?.control?.control?.baseline_priorities.length - 1 ? priorty : `${priorty}, `
                            )) : 'Default'
                        }
                    </div>
                </div>
                <div className='_row'>
                    <div className='_left_c'>Baseline Privacy</div>
                    <div className='_right_c'>
                        {
                            control_info?.control?.control?.baseline_privacy ? 'Yes' : 'No'
                        }
                    </div>
                </div>
                <div className='_row'>
                    <div className='_left_c'>Documents</div>
                    <div className='_right_c'>{`${control_info.documents_count}`}</div>
                </div>

                <div className='_row'>
                    <div className='_left_c'>Maturity Level</div>
                    <div className='_right_c'>
                        <MaturityLevelDropdown control={control_info.control} />
                    </div>
                </div>

            </div>
        </>
    );
}