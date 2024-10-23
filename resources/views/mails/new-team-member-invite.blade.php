@component('mail::message')
# Hello,

Your teammate {{ $inviter['first_name'] }} {{ $inviter['last_name'] }} has added you to the Organization {{ $org['name'] }} on {{ config('app.name') }}.

## Login Details:
    Email: {{$user['email']}}
    Password: {{$password}}

Click here to get started:

@component('mail::button', ['url' => config('app.url') . '/login' ])
    Get Started
@endcomponent

Regards,<br>
{{ config('app.name') }}

<hr/>

If you’re having trouble clicking the "Get Started" button, copy and paste the URL below into your web browser:
{{ config('app.url') . '/login/' }}

@endcomponent
