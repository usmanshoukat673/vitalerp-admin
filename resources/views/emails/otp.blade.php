@component('mail::message')
# Hello {{ $userName }},

To complete your login, please use the following One-Time Password (OTP):

@component('mail::panel')
# {{ $otp }}
@endcomponent

This OTP is valid for the next 10 minutes. Please do not share this code with anyone.

If you did not attempt to log in, please contact our system admin immediately.

Thank you,<br>
{{ config('app.name') }} Team
@endcomponent
