import { Company } from "./company";
import { User } from "./user";

export interface CompanyUsers {
    assigned_by?: any;
    comp_id: number;
    company: Company;
    created_at: Date;
    id: number;
    inviting: boolean;
    rete_sync: number;
    role: string;
    updated_at: Date;
    user: User;
    user_id: number;
    watch_invited: boolean;
    watch_invited_at: string;
}