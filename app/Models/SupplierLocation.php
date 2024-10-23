<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupplierLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'address', 'city', 'state', 'country', 'postal_code', 'phone', 'email', 'website', 'supplier_id', 'created_by', 'updated_by', 'default', 'timezone'
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
