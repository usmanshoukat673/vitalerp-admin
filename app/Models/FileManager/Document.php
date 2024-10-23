<?php

namespace App\Models\FileManager;

use App\Models\CompCtrlDocs;
use App\Models\SectionControl;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Document extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name', 'comp_id',
        'parent', 'ext', 'size',
        'type', 'content', 'is_default', 
        'created_by', 'updated_by', 'doc_ref', 
        'modified', 
        'version',
        'doc_owner',
        'classification',
        'task_folder', 
        'deleted_by', 'project_folder', 'review_at', 'review_by', 'next_review_by', 'next_review_at', 'emails_folder', 'created_at'
    ];

    protected $appends = ['enc_id'];

    public function getEncIdAttribute()
    {
        return encrypt($this->id);
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function parent_folder()
    {
        return $this->belongsTo(static::class, 'parent');
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'created_by')->select('id', 'first_name', 'last_name', 'email');
    }

    public function docowner()
    {
        return $this->belongsTo(User::class, 'doc_owner')->select('id', 'first_name', 'last_name', 'email');
    }

    public function modified_by()
    {
        return $this->belongsTo(User::class, 'updated_by')->select('id', 'first_name', 'last_name', 'email');
    }

    public function controls()
    {
        return $this->hasMany(CompCtrlDocs::class, 'document_id');
    }
}
