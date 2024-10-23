<?php

namespace App\Http\Controllers;

use App\Http\Traits\DocumentsHelper;
use App\Models\FileManager\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use ZipArchive;

class FileDownloaderController extends Controller
{

    use DocumentsHelper;

    public function file($id)
    {
        if (!$id) {
            abort(404);
        }

        // TODO: check wheter this user has permission to download the file
        $id = decrypt($id);

        $document = Document::find($id);
        $mime = $this->getMimeType($document->ext);
        $path = config('motion.DOCUMENTS_DIR') . $document->comp_id . '/' . $document->id . '.' . $document->ext;
        $name = $this->cleanName($document->name);
        return response()->download($path, $name, ['Content-Type' => $mime]);
    }

    public function folder($id)
    {
        // TODO: check wheter this user has permission to download the file
        if (!$id) {
            abort(404);
        }

        $user = request()->user();

        $id = decrypt($id);

        $document = Document::find($id);

        $name =  $this->cleanName($document->name);

        $root = config('motion.DOCUMENTS_DIR') . $document->comp_id . '/';

        $path =  $name;

        $this->compileFileFolder($document, $root, $path);

        $mime = "application/zip";

        $file_name = $name . '.zip';

        exec("zip -r " . $file_name . " " . $path);

        File::deleteDirectory(public_path($path));

        return response()->download($file_name, $name, ['Content-Type' => $mime])->deleteFileAfterSend(true);
    }

    protected function compileFileFolder($document, $root, $path)
    {
        if (!is_dir($path)) {
            mkdir($path);
        }

        $documents = Document::where(['parent' => $document->id])->get();
        if (count($documents) > 0) {
            foreach ($documents as $child) {
                if ($child->type == 'folder') {
                    $this->compileFileFolder($child, $root, $path . '/' . $this->cleanName($child->name));
                } else if ($child->type == 'file') {
                    // move file
                    copy($root . $child->id . '.' . $child->ext, $path . '/' . $this->cleanName($child->name));
                } else if ($child->type == 'document') {
                    // generate pdf
                    $this->generateHtmlToPdf($child);
                    copy($root . $child->id . '.pdf', $path . '/' . $this->cleanName($child->name) . '.pdf');
                }
            }
        }
    }

    public function getMimeType($ext)
    {
        $mime_types = [
            'pdf' => 'application/pdf',
            'txt' => 'text/plain',
            'html' => 'text/html',
            'htm' => 'text/html',
            'exe' => 'application/octet-stream',
            'zip' => 'application/zip',
            'doc' => 'application/msword',
            'xls' => 'application/vnd.ms-excel',
            'ppt' => 'application/vnd.ms-powerpoint',
            'gif' => 'image/gif',
            'png' => 'image/png',
            'jpeg' => 'image/jpg',
            'jpg' => 'image/jpg',
            'php' => 'text/plain',
            'csv' => 'text/csv',
            'xlsx' => 'application/octet-stream',
            'pptx' => 'application/octet-stream',
            'docx' => 'application/octet-stream'
            // 'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (isset($mime_types[$ext])) {
            return $mime_types[$ext];
        } else {
            return 'application/octet-stream';
        }
    }

    protected function getMimeTypeOLD($filename)
    {
        $mime_types = array(

            'txt' => 'text/plain',
            'htm' => 'text/html',
            'html' => 'text/html',
            'php' => 'text/html',
            'css' => 'text/css',
            'js' => 'application/javascript',
            'json' => 'application/json',
            'xml' => 'application/xml',
            'swf' => 'application/x-shockwave-flash',
            'flv' => 'video/x-flv',

            // images
            'png' => 'image/png',
            'jpe' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'jpg' => 'image/jpeg',
            'gif' => 'image/gif',
            'bmp' => 'image/bmp',
            'ico' => 'image/vnd.microsoft.icon',
            'tiff' => 'image/tiff',
            'tif' => 'image/tiff',
            'svg' => 'image/svg+xml',
            'svgz' => 'image/svg+xml',

            // archives
            'zip' => 'application/zip',
            'rar' => 'application/x-rar-compressed',
            'exe' => 'application/x-msdownload',
            'msi' => 'application/x-msdownload',
            'cab' => 'application/vnd.ms-cab-compressed',

            // audio/video
            'mp3' => 'audio/mpeg',
            'qt' => 'video/quicktime',
            'mov' => 'video/quicktime',

            // adobe
            'pdf' => 'application/pdf',
            'psd' => 'image/vnd.adobe.photoshop',
            'ai' => 'application/postscript',
            'eps' => 'application/postscript',
            'ps' => 'application/postscript',

            // ms office
            'doc' => 'application/msword',
            'rtf' => 'application/rtf',
            'xls' => 'application/vnd.ms-excel',
            'ppt' => 'application/vnd.ms-powerpoint',

            // open office
            'odt' => 'application/vnd.oasis.opendocument.text',
            'ods' => 'application/vnd.oasis.opendocument.spreadsheet',
        );

        $explod = explode('.', $filename);
        $ext = strtolower(array_pop($explod));
        if (array_key_exists($ext, $mime_types)) {
            return $mime_types[$ext];
        } elseif (function_exists('finfo_open')) {
            $finfo = finfo_open(FILEINFO_MIME);
            $mimetype = finfo_file($finfo, $filename);
            finfo_close($finfo);
            return $mimetype;
        } else {
            return 'application/octet-stream';
        }
    }
}
