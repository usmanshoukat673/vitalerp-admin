<?php

return [
    'DOCUMENTS_DIR' => env('DOCUMENTS_DIR'),
    'whistle_dir' => env('WHISTLE_DOCUMENTS_DIR'),

    'WATCH_ACTIVITIES_FILES' => env('WATCH_ACTIVITIES_FILES'),

    'MS_OAUTH_APP_ID' => env('MS_OAUTH_APP_ID'),
    'MS_OAUTH_APP_PASSWORD' => env('MS_OAUTH_APP_PASSWORD'),
    'MS_OAUTH_REDIRECT_URI' => env('MS_OAUTH_REDIRECT_URI'),
    'MS_OAUTH_SCOPES' => env('MS_OAUTH_SCOPES'),
    'MS_OAUTH_AUTHORITY' => env('MS_OAUTH_AUTHORITY'),
    'MS_OAUTH_AUTHORIZE_ENDPOINT' => env('MS_OAUTH_AUTHORIZE_ENDPOINT'),
    'MS_OAUTH_TOKEN_ENDPOINT' => env('MS_OAUTH_TOKEN_ENDPOINT'),

    'IPINFO_TOKEN' => env('IPINFO_TOKEN'),

    'HTMLTOPDF' => env('HTMLTOPDF'),

    'N8N_REDIRECT_URL' => env('N8N_REDIRECT_URL'),
    'N8N_ENCRYPTION_KEY' => env('N8N_ENCRYPTION_KEY'),
    'DEFAULT_QUEUE' => env('REDIS_QUEUE'),

    'emails_logo' => env('EMAILS_LOGO', '/images/motionGRC-03.png'),
    'auth_logo' => env('AUTH_LOGO', ''),
    'header_logo' => env('HEADER_LOGO', ''),

    'chatgpt_key' => env('CHATGPT_API_KEY'),
    'chatsonic_key' => env('CHATSONIC_API_KEY'),

    'mail_cc' => env('MAIL_CC'),

    'prompt_comp_description' => env('PROMPT_GET_COMP_DESC'),
    'prompt_bu_depts' => env('PROMPT_GET_BU_DEPTS'),
    'prompt_bu_functions' => env('PROMPT_GET_BU_FUNCTIONS'),
    'prompt_assets_software' => env('PROMPT_ASSETS_SOFTWARE'),
    'prompt_assets_hardware' => env('PROMPT_ASSETS_HARDWARE'),
    'prompt_assets_vendor' => env('PROMPT_ASSETS_VENDOR'),

    'business_plan' => env('BUSINESS_PLAN_INTERNAL_ID'),
    'inbound_email_domain' => env('INBOUND_EMAIL_DOMAIN')
];
