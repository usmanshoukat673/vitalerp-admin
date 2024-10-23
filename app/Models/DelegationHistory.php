<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DelegationHistory extends Model
{
    use HasFactory;

    protected $table = 'delegation_histories';

    protected $primaryKey = 'history_id';

    protected $fillable = [
        'delegation_id',
        'user_id',
        'action',
        'action_by',
    ];

    /**
     * Returns the related Delegation model for this DelegationHistory instance.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function delegation()
    {
        return $this->belongsTo(Delegation::class, 'delegation_id', 'delegation_id');
    }

    /**
     * Retrieve the user associated with this delegation history entry.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Retrieve the user who performed the action.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function actionBy()
    {
        return $this->belongsTo(User::class, 'action_by', 'id');
    }
}
