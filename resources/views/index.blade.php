<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

         <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

        <title>{{ config('app.name') }}</title>

        <!-- Fonts -->
        {{--  <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">  --}}
        {{--  <link href="https://fonts.googleapis.com/css?family=Lato:400,700,700i,900,900i&display=swap" rel="stylesheet" />  --}}
        {{--  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />  --}}
        {{--  <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300&display=swap" rel="stylesheet">  --}}

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600&display=swap" rel="stylesheet">

        <link href="{{ asset('css/app.css') }}" rel="stylesheet" />
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>

        <div id="root"></div>
        <script src="{{ asset('js/index.js') }}"></script>

        @if (config('app.env') === 'production')
            <script type="text/javascript">
                var sc_project=12222349;
                var sc_invisible=1;
                var sc_security="4be7c848";
                </script>
                <script type="text/javascript"
                src="https://www.statcounter.com/counter/counter.js"
                async>
                </script>
        @endif
    </body>
</html>
