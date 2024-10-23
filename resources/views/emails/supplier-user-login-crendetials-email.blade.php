@component('mail::message')
Dear {{ $userName }},

Your login credentials are below:
@component('mail::panel')
**Email**: {{ $user->email }}

**Password**: {{ $password }}

**Login URL**: [{{ $loginUrl }}]({{ $loginUrl }})
@endcomponent

Thank you,

VitalERP
@endcomponent