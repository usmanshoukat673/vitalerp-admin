<?php

namespace App\Models;

use App\Models\FileManager\Document;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompStdDocs extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function standard()
    {
        return $this->belongsTo(Standard::class, 'standard_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }

    public function document()
    {
        return $this->belongsTo(Document::class, 'document_id');
    }
}
