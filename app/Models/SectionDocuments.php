<?php

namespace App\Models;

use App\Models\FileManager\Document;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SectionDocuments extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function document()
    {
        return $this->belongsTo(Document::class, 'document_id');
    }

    public function section()
    {
        return $this->belongsTo(StandardSection::class, 'section_id');
    }
}
