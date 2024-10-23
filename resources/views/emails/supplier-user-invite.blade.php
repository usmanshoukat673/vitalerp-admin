@component('mail::message')
Dear {{ $userName }},

You have been invited to join VitalERP. 

Your login credentials are below. These will expire in within 24 hours.
@component('mail::panel')
**Email**: {{ $user->email }}

**Password**: {{ $password }}

**Login URL**: [{{ $loginUrl }}]({{ $loginUrl }})
@endcomponent

Thank you,

VitalERP
@endcomponent