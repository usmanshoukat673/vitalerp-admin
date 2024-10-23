<?php

namespace App\Services;


class PdfHtmlExtractor
{
    /**
     * Extract text content from the given PDF file.
     *
     * @param string $filePath The path to the PDF file.
     * @return string|null The extracted text content or null on failure.
     */
    public function extractHtml($filePath)
    {
        // Use pdftohtml to extract html from the PDF
        $textOutput = shell_exec("pdftohtml -nomerge -fontfullname -noframes -stdout '{$filePath}'");

        // Return the extracted text content
        return $textOutput;
    }
}
