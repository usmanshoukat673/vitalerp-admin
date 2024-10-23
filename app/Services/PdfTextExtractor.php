<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class PdfTextExtractor
{
    /**
     * Extract text content from the given PDF file.
     *
     * @param string $filePath The path to the PDF file.
     * @return string|null The extracted text content or null on failure.
     */
    public function extractText($filePath)
    {
        // Get the absolute path to the PDF file
        // $absolutePath = storage_path("app/{$filePath}");

        // Use pdftotext to extract text from the PDF
        $textOutput = shell_exec("pdftotext -layout '{$filePath}' -");

        // Return the extracted text content
        return $textOutput;
    }
}
