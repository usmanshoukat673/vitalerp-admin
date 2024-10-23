export interface Task{
    comp_id: number;
    completed: number;
    completed_at?: any;
    created_at: Date;
    created_by: number;
    deleted_at?: any;
    deleted_by?: any;
    description?: string;
    due_date: string;
    due_status: string;
    end: string;
    id: number;
    modified_by?: any;
    name: string;
    parent?: any;
    priority: number;
    priority_text: string;
    project_id: number;
    start: string;
    status: string;
    title: string;
    total_comments: number;
    updated_at: Date;
}