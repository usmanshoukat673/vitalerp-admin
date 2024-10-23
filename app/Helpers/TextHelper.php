<?php

namespace App\Helpers;

use Illuminate\Support\Str;

class TextHelper
{
    public static function truncateText($text, $length)
    {
        return Str::limit($text, $length);
    }

    public static function removeSpecialChars($text)
    {
        return preg_replace('/[^a-zA-Z0-9]/', '', $text);
    }

    public static function sanitizeAndTrimName($name)
    {
        // Remove special characters and spaces from the name
        $sanitizedName = preg_replace('/[^a-zA-Z0-9]/', '', $name);

        // Take the first 8 characters of the sanitized name
        $result = substr($sanitizedName, 0, 8);

        return $result;
    }

    public static function generateEmail($name, $id)
    {
        return strtolower(self::sanitizeAndTrimName($name) . $id) . config('motion.inbound_email_domain');
    }
}
