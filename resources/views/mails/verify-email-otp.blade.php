@component('mail::message')
## Hello,

Thank you for signing up for {{ config('app.name') }}. To complete the registration process, we need to verify your email address.

Please use the following verification code to confirm your email address:

## Verification Code:
# {{$code}}

If you did not sign up for {{ config('app.name') }}, please ignore this email.

Thank you for using {{ config('app.name') }}. If you have any questions or concerns, please contact our support team.

Best regards,<br>
{{ config('app.name') }} Team

@endcomponent
