@component('mail::message')
# Hello,

Thank you for confirming your email address and joining us in our mission to revolutionize compliance management with the power of AI.

We're excited to introduce you to a whole new way of managing compliance that will not only save you time and effort but also improve your overall compliance posture. With our cutting-edge AI-powered platform, you'll be able to automate your compliance workflows, identify and remediate issues quickly, and get real-time insights into your compliance posture.

We're committed to making compliance management easy and accessible for everyone, and we're confident that you'll love our platform. Our team is always here to help you with any questions or concerns.

Thank you for joining us, and we look forward to helping you achieve compliance success!

@component('mail::button', ['url' => config('app.url') . '/verify-company/' . $verificationId])
    Verify Email
@endcomponent

Best regards,<br>
{{ config('app.name') }} Team

<hr/>

If you’re having trouble clicking the "Verify Email" button, copy and paste the URL below into your web browser:
{{ config('app.url') . '/verify-company/' . $verificationId}}

@endcomponent
