@component('mail::message')
# Hello,

Your account has been blocked for a minute due to frequent failed login attemps.

If you forget your password you can follow [Reset Password]({{ config('app.url') . '/password-recovery'}}) Page and reset your password.

Divice Used: {{ $system }}

IP Address: {{ $ip }}

Time: {{ $date }}

If you did not try to login to your account, please contact our customer support to take appropriate action towards your account.

Regards,<br>
{{ config('app.name') }}

@endcomponent
