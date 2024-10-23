@component('mail::message')
# Hi {{ $user['first_name'] }},

To keep your account safe and to ensure you’re the only person who can access it, we recommend enabling Two-Factor Authentication.

How does it work?

Once you enable the Two-Factor Authentication option, we’ll send you a code via SMS every time you sign in from a new device to make sure it’s you.

Click the button below to go to your security settings and switch the Two-Factor Authentication option on.

@component('mail::button', ['url' => config('app.url') . '/settings/user'])
    User Settings
@endcomponent

That’s it!

Thanks!,<br>
The {{ config('app.name') }} Team

<hr/>

If you’re having trouble clicking the "User Settings" button, copy and paste the URL below into your web browser:
{{ config('app.url') . '/settings/user' }}

@endcomponent
