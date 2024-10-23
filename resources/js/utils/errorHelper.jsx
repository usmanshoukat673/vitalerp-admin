/**
 * Check if a specific field exists in the errors object.
 *
 * @param {string} fieldName - The name of the field to check.
 * @param {object} errors - The errors object to search.
 * @return {boolean} Whether the field exists in the errors object.
 */
export const isFieldExistsInErrors = (fieldName, errors) => {
    return Object.keys(errors).includes(fieldName);
}

/**
 * Retrieve the error message for a specific field if it exists in the errors object.
 *
 * @param {string} fieldName - The name of the field to retrieve the error message for.
 * @param {object} errors - The errors object containing error messages.
 * @return {string|null} The error message for the specified field, or null if not found.
 */
export const getError = (fieldName, errors) => {
    if (isFieldExistsInErrors(fieldName, errors)) {
        return errors[fieldName][0];
    }
    return null;
}