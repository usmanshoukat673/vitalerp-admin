import React, { useEffect, useState } from 'react';
import { Checkbox, Dropdown, Form, Input } from 'semantic-ui-react';
import ApplicabityConsent from '../cc-category/ApplicabityConsent';

const statusOptions = [
    { key: 'Implemented', text: 'Implemented', value: 'Implemented' },
    { key: 'Partially Implemented', text: 'Partially Implemented', value: 'Partially Implemented' },
    { key: 'Not Implemented', text: 'Not Implemented', value: 'Not Implemented' }
];

const ControlApplicability = ({ properties, propertChanged }) => {

    const [applicable, setApplicability] = useState('');
    const [control_status, setControlStatus] = useState('');
    const [justification, setJustification] = useState('');
    const [control_consent, setControlConsent] = useState(false);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!_.isEmpty(properties)) {
            setApplicability(properties.applicable != null ? properties.applicable : '');
            setControlStatus(properties.status != null ? properties.status : '');
            setJustification(properties.justification != null ? properties.justification : '');
        }
    }, [properties]);

    const handlerCustomInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? true : false;
    }

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const toggleApplicability = () => {
        if (applicable == 'Applicable') {
            setControlConsent(true);
        }
        else {
            controlApplicability();
        }
    }

    const controlApplicability = () => {
        let applicability = applicable == 'Applicable' ? 'Not Applicable' : 'Applicable';
        setApplicability(applicability);
        propertChanged('applicable', applicability);
        if (applicable === 'Not Applicable') {
            setControlStatus('Not Implemented');
            propertChanged('status', 'Not Implemented');
        }
    }

    const handleJustiChange = event => {
        setJustification(event.target.value);
        clearErrors(event.target.name);
    };

    const handleJustificationBlur = event => {
        propertChanged('justification', event.target.value);
    }

    const clearErrors = (field) => {
        if (errors.length > 0 && errors[0].hasOwnProperty(field)) {
            delete errors[0][field];
            setErrors(errors);
        }
    }

    const handleControlStatusChange = (event, { value }) => {
        setControlStatus(value);
        propertChanged('status', value);
        clearErrors('control_status');
    };

    const setControlNA = () => {
        setControlConsent(false);
        controlApplicability();
    }

    return (
        <>
            <Form size="mini">
                <Form.Group widths="equal">
                    <Form.Field className="__theapplicability">
                        <div>Applicable</div>
                        <div>
                            <Checkbox
                                checked={applicable === 'Applicable'}
                                onChange={toggleApplicability}
                                toggle
                                color="primary"
                            />
                        </div>
                    </Form.Field>

                    {applicable == 'Not Applicable' ?
                        <Form.Field>
                            <Input
                                fluid
                                placeholder='Control Justification'
                                name="justification"
                                onChange={handleJustiChange}
                                onBlur={handleJustificationBlur}
                                value={justification}
                                className="justfication__box"
                            />
                            {displayInputError('justification')}
                        </Form.Field>
                        :
                        <Form.Field>
                            <Dropdown
                                disabled={applicable == 'Not Applicable'}
                                clearable
                                options={statusOptions}
                                selection
                                onChange={handleControlStatusChange}
                                value={control_status}
                                placeholder="Select Control Status"
                                error={handlerCustomInputError('control_status')}
                                name="control_status"
                            />
                        </Form.Field>
                    }

                </Form.Group>
            </Form>

            <ApplicabityConsent
                control_conset={control_consent}
                keepControlAsIs={() => setControlConsent(false)}
                setControlNA={setControlNA}
            />
        </>
    )
}

export default ControlApplicability;