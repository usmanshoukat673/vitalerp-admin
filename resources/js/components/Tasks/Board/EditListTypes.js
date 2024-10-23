import React from 'react';
import _ from 'lodash';
import EditListType from './EditListType';

const EditListTypes = ({ list_types, handle_change, handle_deleted }) => {

    const handleChange = (index, listType) => {
        list_types[index] = listType;
        handle_change(list_types);
    }

    return (
        <>
            {
                _.size(list_types) > 0 && _.map(list_types, (listtype, index) => {
                    return <EditListType key={`LISTTYPE-${index}`} listtype={listtype} index={index} handle_change={handleChange} handle_deleted={handle_deleted} />
                })
            }
        </>
    );
}

export default EditListTypes;
