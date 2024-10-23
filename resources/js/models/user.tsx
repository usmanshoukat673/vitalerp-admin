export interface User {
    id: number;
    last_name: string;
    first_name: string;
    email: string;
    email_verified_at?: any;
    changed_password: number;
    country_code: string;
    phone: string;
    watch_number?: string;
    watch_number_cd?: string;
    watch_configured: number;
    watch_configured_at?: any;
    mfa_enabled: number;
    mfa_reminder: string;
    pwd_rotaion: string;
    phone_verified: number;
    global_api_key: string;
    created_at: Date;
    updated_at: Date;
}