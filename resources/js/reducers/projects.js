import * as actionTypes from '../actions/types';

const initialTaskState = {
    project: {},
    projects: [],
    profile: {},
    tsk_edit_emodel: false,
    tsk_add_emodel: false,
    right_bar_view: 'task', // add_column // edit_column
    field_types: [],
    field_type_to_add: {},
    subjects: [],
    active_subject_id: null,
    column_to_edit: {},
}

const projects_reducer = (state = initialTaskState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_PROJECT:
            return {
                ...state,
                project: action.payload.project,
            };
        case actionTypes.SET_ALL_PROJECTS:
            return {
                ...state,
                projects: action.payload.projects,
            };
        case actionTypes.SET_PROJECT_PROFILE:
            return {
                ...state,
                profile: action.payload.profile,
            };
        case actionTypes.TOGGLE_TASK_EDIT_EMODEL:
            return {
                ...state,
                tsk_edit_emodel: action.payload.tsk_edit_emodel,
            };
        case actionTypes.TOGGLE_TASK_ADD_EMODEL:
            return {
                ...state,
                tsk_add_emodel: action.payload.tsk_add_emodel,
            };
        case actionTypes.SET_PROJECT_RIGHT_VIEW:
            return {
                ...state,
                right_bar_view: action.payload.right_bar_view
            };
        case actionTypes.SET_FIELD_TYPE_TO_ADD:
            return {
                ...state,
                field_type_to_add: action.payload.field_type_to_add
            };
        case actionTypes.SET_COLUMN_TO_EDIT:
            return {
                ...state,
                column_to_edit: action.payload.column_to_edit
            };
        case actionTypes.SET_FIELD_TYPES:
            return {
                ...state,
                field_types: action.payload.field_types
            };
        case actionTypes.SET_ALL_SUBJECTS:
            return {
                ...state,
                subjects: action.payload.subjects
            };
        case actionTypes.SET_ALL_ACTIVE_SUBJECTID:
            return {
                ...state,
                active_subject_id: action.payload.active_subject_id
            };
        default:
            return state;
    }
};

export default projects_reducer;
