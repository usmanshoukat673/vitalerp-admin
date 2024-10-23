<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FileManager\Document;

class CompCtrlDocs extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = ['pp_visiblity' => 'boolean'];

    public function control()
    {
        return $this->belongsTo(SectionControl::class, 'control_id');
    }

    public function standard()
    {
        return $this->belongsTo(Standard::class, 'standard_id');
    }

    public function section()
    {
        return $this->belongsTo(StandardSection::class, 'section_id');
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
