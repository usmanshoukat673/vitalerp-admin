<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignmentHistory extends Model
{
    use HasFactory;

    protected $table = 'assignment_histories';

    protected $primaryKey = 'history_id';

    protected $fillable = [
        'assignment_id',
        'user_id',
        'action',
        'action_by',
    ];

    /**
     * Get the assignment associated with the assignment history.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assignment()
    {
        return $this->belongsTo(Assignment::class, 'assignment_id', 'assignment_id');
    }

    /**
     * Retrieves the associated User model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Retrieves the associated User model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function actionBy()
    {
        return $this->belongsTo(User::class, 'action_by', 'id');
    }
}
