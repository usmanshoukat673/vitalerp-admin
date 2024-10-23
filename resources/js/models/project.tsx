export interface Project {
    id: number;
    category_id: number;
    comp_id: number;
    completed: number;
    completed_at?: Date;
    created_at: Date;
    created_by: number;
    deleted_at?: Date;
    deleted_by?: number;
    description?: any;
    end_date: string;
    modified_by?: number;
    priority: number;
    priority_text: string;
    start_date: string;
    title: string;
    total_comments: number;
    updated_at: Date;
    url?: string;
}