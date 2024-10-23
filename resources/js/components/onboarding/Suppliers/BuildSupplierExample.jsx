import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const BuildSupplierExample = ({ asset }) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [examples, setExamples] = useState([]);
    const [exampleOptions, setExampleOptions] = useState([]);

    useEffect(() => {
        if (!_.isEmpty(asset)) {

            setExampleOptions(_.map(asset.examples, (ex, index) => ({
                key: ex.id,
                text: ex.name,
                value: ex.id,
            })));

            const selected_examples = _.filter(asset.examples, (ex) => {
                return ex.selected == 1;
            });

            setExamples(_.map(selected_examples, (m, index) => (m.id)));
        }
    }, [asset]);

    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const handleExampleChange = (event, { value }) => {

        let items = value.filter(e => typeof e !== "string");

        setExamples(items);

        if (items.length > 0) {
            toggleExamples('toggle', {
                example_ids: items,
                build_supplier_id: asset.id,
            });
        }
        else {
            toggleExamples('unselect-all', {
                build_supplier_id: asset.id
            });
        }

        clearErrors('examples');
    };

    const toggleExamples = (enpoint, object) => {

        setLoading(true);
        let url = `/api/auth/onboarding/supplier-example/${enpoint}`;

        axios.post(url, object)
            .then(e => {
                setErrors([]);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                if (err.response.status === 500) {
                    setErrors([]);
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            });
    }

    const handleAddExample = (e, { value }) => {

        setErrors([]);
        setLoading(true);

        axios.post('/api/auth/onboarding/supplier-example/add-new', {
            name: value,
            build_supplier_id: asset.id,
            standard_id: asset.standard_id
        })
            .then(response => {
                setErrors([]);
                setLoading(false);

                setExamples([
                    ...examples,
                    response.data.id
                ]);

                setExampleOptions([...exampleOptions, {
                    key: response.data.id,
                    value: response.data.id,
                    text: response.data.name,
                }])

            })
            .catch(err => {
                setLoading(false);
                if (err.response.status === 500) {
                    setErrors([]);
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));

                }
            });
    }

    const clearErrors = (field) => {
        if (errors.length > 0 && errors[0].hasOwnProperty(field)) {
            delete errors[0][field];
            setErrors(errors);
        }
    }

    return (
        <>
            <Box>
                <label>Examples:</label>
                <Dropdown
                    placeholder='Examples'
                    onChange={handleExampleChange}
                    value={examples}
                    onAddItem={handleAddExample}
                    multiple
                    search
                    fluid
                    allowAdditions
                    selection
                    options={exampleOptions}
                    className="__asset__example__dd"
                />
                {displayInputError(errors, 'examples')}
            </Box>
        </>
    )
}

export default BuildSupplierExample;