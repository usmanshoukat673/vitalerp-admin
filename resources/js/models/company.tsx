import { ProjectFolder } from "./projectFolder";
import { TaskFolder } from "./taskFolder";

export interface Company {
    id: number;
    name: string;
    slug: string;
    timezone?: string;
    address?: string;
    city?: any;
    state?: any;
    country: string;
    postal_code?: any;
    website?: string;
    phone?: string;
    contact_person?: string;
    email?: string;
    contact_person_phone?: string;
    reference?: string;
    required_mfa: boolean;
    ticketing_system?: any;
    pwd_exp_duration: string;
    pwd_pattern: string;
    maturity_level?: number;
    created_by?: number;
    logo?: string;
    disabled: number;
    disabled_at?: any;
    document: Document;
    enabled_at?: any;
    created_at: Date;
    updated_at: Date;
    project_folder: ProjectFolder;
    task_folder?: TaskFolder;
}