<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delegation extends Model
{
    use HasFactory;

    protected $table = 'delegations';

    protected $primaryKey = 'delegation_id';

    protected $fillable = [
        'assignment_id',
        'delegated_by',
    ];

    public $timestamps = false;

    public function assignment()
    {
        return $this->belongsTo(Assignment::class, 'assignment_id', 'assignment_id');
    }

    public function delegatedBy()
    {
        return $this->belongsTo(User::class, 'delegated_by', 'id');
    }

    public function users()
    {
        return $this->hasMany(DelegationUser::class, 'delegation_id', 'delegation_id');
    }
}
