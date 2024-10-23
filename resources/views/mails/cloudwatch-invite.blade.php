@component('mail::message')
# Hello {{ $invity['first_name'] }},

Your teammate {{ $inviter['first_name'] }} {{ $inviter['last_name'] }} has invited you to use DeviceWatch under the Organization {{ $company_name }}.

Click here to download the application and get started:

@component('mail::button', ['url' => config('app.url')  ])
    Download DeviceWatch
@endcomponent

Regards,<br>
{{ config('app.name') }}

<hr/>

If you’re having trouble clicking the "Download DeviceWatch" button, copy and paste the URL below into your web browser:
{{ config('app.url')  }}

@endcomponent
