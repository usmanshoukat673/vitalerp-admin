import React from 'react';
import _ from 'lodash';
import ListType from './ListType';

const ViewListTypes = ({ task, handle_change }) => {

    const handleChange = (index, listType) => {
        task.list_types[index] = listType;
        handle_change(task);
    }

    return (
         <>
            {
                _.size(task.list_types) > 0 && _.map(task.list_types, (listtype, index) => {
                    return <ListType key={`LISTTYPE-${listtype.id}`} listtype={listtype} index={index} handle_change={handleChange} />
                })
            }
         </>
    );
}

export default ViewListTypes;
