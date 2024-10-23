<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;

    protected $table = 'assignments';

    protected $primaryKey = 'assignment_id';

    protected $fillable = [
        'comp_id',
        'domain_id',
        'subdomain_id',
        'control_id',
        'question_id',
        'assigned_by',
        'assignment_date',
    ];

    public $timestamps = false;

    /**
     * Get the company that owns the assignment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id', 'id');
    }

    /**
     * A description of the entire PHP function.
     *
     * @return Some_Return_Value
     */
    public function domain()
    {
        return $this->belongsTo(Domain::class, 'domain_id', 'id');
    }

    /**
     * Retrieve the subdomain associated with this assignment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function subDomain()
    {
        return $this->belongsTo(Domain::class, 'subdomain_id', 'id');
    }

    /**
     * Get the associated SectionControl model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function control()
    {
        return $this->belongsTo(SectionControl::class, 'control_id', 'id');
    }

    /**
     * Retrieves the associated ControlQuestion model for this instance.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function controlQuestion()
    {
        return $this->belongsTo(ControlQuestion::class, 'question_id', 'id');
    }

    /**
     * Retrieve the user who assigned this assignment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assignedBy()
    {
        return $this->belongsTo(User::class, 'assigned_by', 'id');
    }

    public function users()
    {
        return $this->hasMany(AssignmentUser::class, 'assignment_id', 'assignment_id');
    }

    public function deligation()
    {
        return $this->hasOne(Delegation::class, 'assignment_id', 'assignment_id');
    }
    
}
