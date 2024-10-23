@component('mail::message')
# Hello,

Your teammate {{ $inviter['first_name'] }} {{ $inviter['last_name'] }} has invited you to the Organization {{ $org['name'] }} on {{ config('app.name') }}.

Click here to get started:

@component('mail::button', ['url' => config('app.url') . '/join/' . $invite['remember_token'] . '/' . $invite['email'] ])
    Get Started
@endcomponent

Regards,<br>
{{ config('app.name') }}

<hr/>

If you’re having trouble clicking the "Get Started" button, copy and paste the URL below into your web browser:
{{ config('app.url') . '/join/' . $invite['remember_token'] . '/' . $invite['email'] }}

@endcomponent
