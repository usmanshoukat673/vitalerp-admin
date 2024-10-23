<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DelegationUser extends Model
{
    use HasFactory;

    protected $table = 'delegation_users';

    protected $primaryKey = 'delegation_user_id';

    protected $fillable = [
        'delegation_id',
        'user_id',
    ];

    public $timestamps = false;

    /**
     * Get the delegation associated with the delegation user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function delegation()
    {
        return $this->belongsTo(Delegation::class, 'delegation_id', 'delegation_id');
    }

    /**
     * Retrieve the associated User model for this DelegationUser.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
