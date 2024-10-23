<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Process;

class PdfToHtmlConverter
{
    /**
     * Convert the given PDF file to HTML.
     *
     * @param string $pdfPath The path to the PDF file.
     * @param string $outputPath The path where the HTML output will be saved.
     * @return bool True on success, false on failure.
     */
    public function convertToHtml($pdfPath, $outputPath)
    {
        try {
            // Ensure the output directory exists
            $outputDirectory = pathinfo($outputPath, PATHINFO_DIRNAME);
            if (!file_exists($outputDirectory)) {
                mkdir($outputDirectory, 0777, true);
            }

            $command = [
                'pdftohtml',
                '-nomerge',
                '-fontfullname',
                '-noframes',
                '-stdout',
                escapeshellarg($pdfPath),
            ];

            // Run the pdf2htmlEX command
            $process = new Process($command);
            $process->run();

            // Check if the process was successful
            if (!$process->isSuccessful()) {
                throw new \Exception("Conversion failed: " . $process->getErrorOutput());
            }

            return true;
        } catch (\Exception $e) {
            // Handle exceptions (log, throw, etc.)
            // For simplicity, we'll just log it for now
            Log::error("PdfToHtmlConverter: " . $e->getMessage());
            return false;
        }
    }
}
