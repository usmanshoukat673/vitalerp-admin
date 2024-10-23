@component('mail::message')
## Hello,

To access the Policy Panel, please use following OTP:


## One Time Password:
# {{$code}}

If you did not request for for OTP at {{ config('app.name') }}, please ignore this email.

Thank you for using {{ config('app.name') }}. If you have any questions or concerns, please contact our support team.

Best regards,<br>
{{ config('app.name') }} Team

@endcomponent
