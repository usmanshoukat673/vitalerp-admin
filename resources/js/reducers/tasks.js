import * as actionTypes from '../actions/types';

const initialTaskState = {
    task: {},
    tasks: {},
    edit_task: {},
    sub_tasks: [],
    list_types: [],
}

const tasks_reducer = (state = initialTaskState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_TASK:
            return {
                ...state,
                task: action.payload.task,
            };
        case actionTypes.SET_ALL_TASKS:
            return {
                ...state,
                tasks: action.payload.tasks,
            };
        case actionTypes.SET_SUB_TASKS:
            return {
                ...state,
                sub_tasks: action.payload.sub_tasks,
            };
        case actionTypes.SET_TASK_LIST_TYPE:
            return {
                ...state,
                list_types: action.payload.list_types,
            };
        case actionTypes.TASK_TO_EDIT:
                return {
                    ...state,
                    edit_task: action.payload.edit_task,
                };
        default:
            return state;
    }
};

export default tasks_reducer;
