@component('mail::message')
# New whistleblower report

You have received the following report:

Category: {{ $category }}

@component('mail::button', ['url' => $url ])
    View More
@endcomponent

Regards,<br>
{{ config('app.name') }}

<hr/>

If you’re having trouble clicking the "View More" button, copy and paste the URL below into your web browser:
{{ $url }}

@endcomponent