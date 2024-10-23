<?php

namespace App\Models;

use App\Models\FileManager\Document;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TaskDocuments extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id');
    }

    public function document()
    {
        return $this->belongsTo(Document::class, 'document_id');
    }
}
