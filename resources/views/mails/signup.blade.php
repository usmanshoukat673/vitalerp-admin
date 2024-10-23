@component('mail::message')
# Hi there,

Welcome to the {{ config('app.name') }} family, You are one step away! To start using {{ config('app.name') }}

Here are the login details:

Email: {{ $email }}

Password: {{ $password }}

@component('mail::button', ['url' => config('app.url') . '/login'])
    Login
@endcomponent

Regards,<br>
{{ config('app.name') }}

<hr/>

If you’re having trouble clicking the "Login" button, copy and paste the URL below into your web browser:
{{ config('app.url') . '/login/'}}

@endcomponent
