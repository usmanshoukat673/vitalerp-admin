<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuestionComment extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = false;

    protected $fillable = [
        'company_control_question_id',
        'comp_id',
        'parent_id',
        'comment',
        'commented_by',
        'date_commented'
    ];

    public function companyControlQuestion()
    {
        return $this->belongsTo(CompanyControlQuestion::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function parent()
    {
        return $this->belongsTo(QuestionComment::class, 'parent_id');
    }

    public function replies()
    {
        return $this->hasMany(QuestionComment::class, 'parent_id')->with('replies', 'commentedBy');
    }

    public function commentedBy()
    {
        return $this->belongsTo(User::class, 'commented_by')->select('id', 'first_name', 'last_name', 'email');
    }
}
