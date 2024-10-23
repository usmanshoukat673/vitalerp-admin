<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class PdfScanner
{
    /**
     * Check if the given PDF file contains scanned pages or plain text.
     *
     * @param string $filePath The path to the PDF file.
     * @return string Returns 'scanned' if the PDF contains scanned pages, 'text' if it contains plain text.
     */
    public function detectPdfContent($filePath)
    {
        // Get the absolute path to the PDF file
        // $absolutePath = storage_path("app/{$filePath}");

        // Use pdftotext to extract text from the PDF
        $textOutput = shell_exec("pdftotext '{$filePath}' -");

        // Check if the extracted text is empty
        if (empty($textOutput)) {
            return 'scanned'; // PDF contains scanned pages
        } else {
            return 'text'; // PDF contains plain text
        }
    }
}
