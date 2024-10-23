<?php

namespace App\Models;

use App\Models\FileManager\Document;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GlobalActivities extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id')
            ->select('id', 'first_name', 'last_name', 'email');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }

    public function control()
    {
        return $this->belongsTo(SectionControl::class, 'control_id')
            ->select('id', 'name', 'number', 'short_name');
    }

    public function section()
    {
        return $this->belongsTo(StandardSection::class, 'section_id')
            ->select('id', 'name');
    }

    public function standard()
    {
        return $this->belongsTo(Standard::class, 'standard_id')
            ->select('id', 'name');
    }

    public function document()
    {
        return $this->belongsTo(Document::class, 'document_id')
            ->select('id', 'name', 'ext', 'type', 'size')
            ->withTrashed();
    }
}
