<?php

namespace App\Helpers;

class FileHelper
{
    public static function getMimeType($extension)
    {
        $extension = strtolower($extension);

        switch ($extension) {
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            case 'gif':
                return 'image/gif';
            case 'pdf':
                return 'application/pdf';
            case 'doc':
            case 'docx':
                return 'application/msword';
            case 'ppt':
            case 'pptx':
                return 'application/vnd.ms-powerpoint';
            case 'xls':
            case 'xlsx':
                return 'application/vnd.ms-excel';
            case 'txt':
                return 'text/plain';
            default:
                // You may want to handle other extensions or return a default MIME type
                return 'application/octet-stream';
        }
    }
}