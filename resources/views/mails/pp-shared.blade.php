@component('mail::message')
# Hello,

{{ $company_name }} has shared the documentation for {{ $standard_name }} with you on {{ config('app.name') }}

To access the panel click/copy following link and use your email address to access Policy Panels 

Click here to get started:

@component('mail::button', ['url' => config('app.url') . '/' . $portal_link . '/policy-panels-login?email=' . base64_encode($email) ])
    Get Started
@endcomponent

Regards,<br>
{{ config('app.name') }}

<hr/>

If you’re having trouble clicking the "Get Started" button, copy and paste the URL below into your web browser:
{{ config('app.url') . '/' . $portal_link . '/policy-panels-login?email=' . base64_encode($email) }}

@endcomponent
