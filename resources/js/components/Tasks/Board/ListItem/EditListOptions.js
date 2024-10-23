import React from 'react';
import ExistingOption from './ExistingOption';

const EditListOptions = ({ type, list_items, handle_check, handle_deleted }) => {

    const handleFill = (index, name) => {
        const listItems = [...list_items];
        listItems[index].name = name;
        handle_check(listItems)
    }

    const handleRemove = (index) => {
        const listItems = [...list_items];
        if (listItems[index].id > 0) {
            handle_deleted(listItems[index].id);
            listItems.splice(index, 1);
            handle_check(listItems)
        }
        else {
            listItems.splice(index, 1);
            handle_check(listItems)
        }
    }

    return (
        <>
            {
                _.map(list_items, (item, index) => {
                    return (
                        <ExistingOption key={`Option-${item.type}-${index}`} type={type} item={item} index={index} remove={handleRemove} handle_blur={handleFill} />
                    )
                })
            }
        </>
    )
}

export default EditListOptions