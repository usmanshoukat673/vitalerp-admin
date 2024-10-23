export const clearErrors = (setErrors, field) => {
    setErrors((prevErrors) => {
        // Create a new copy of errors
        const newErrors = [...prevErrors];

        // Check if there are errors and the first element has the specified field
        if (newErrors.length > 0 && newErrors[0].hasOwnProperty(field)) {
            // Create a new object without the specified field
            newErrors[0] = { ...newErrors[0] };
            delete newErrors[0][field];
        }

        return newErrors;
    });
};
