const mix = require('laravel-mix');


mix.js('resources/js/index.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');
