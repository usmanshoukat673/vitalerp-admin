<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectComments extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = ['replies'];

    public function user()
    {
        return $this->belongsTo(User::class, 'commented_by')->select('id', 'first_name', 'last_name', 'email');
    }

    public function replies()
    {
        return $this->hasMany(ProjectComments::class, 'parent');
    }

    public function getRepliesAttribute()
    {
        return $this->replies()->with('user')->get();
    }
}
