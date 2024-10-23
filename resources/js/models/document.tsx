export interface Document {
    comp_id: number;
    content?: any;
    created_at: Date;
    created_by: number;
    deleted_at?: any;
    deleted_by?: any;
    doc_ref?: any;
    enc_id: string;
    ext?: any;
    id: number;
    is_default: number;
    modified?: any;
    name: string;
    parent?: any;
    project_folder: number;
    size?: any;
    slug: string;
    task_folder: number;
    type: string;
    updated_at: Date;
    updated_by?: any;
}