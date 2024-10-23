export interface TextFieldRows{
    id: number;
    row_id: number;
    subject_id: number;
    column_id: number;
    value: string;
    created_by: number;
    updated_by: number | null;
    created_at: string;
    updated_at: string;
}

export interface Props {
    field: TextFieldRows;
}