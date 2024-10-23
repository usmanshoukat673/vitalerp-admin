<?php

namespace App\Models;

use App\Models\FileManager\Document;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProjectDocuments extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function document()
    {
        return $this->belongsTo(Document::class, 'document_id');
    }
}
