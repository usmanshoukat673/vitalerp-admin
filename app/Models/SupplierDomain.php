<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupplierDomain extends Model
{
    use HasFactory;

    protected $table = 'supplier_domains';

    protected $fillable = [
        'supplier_id', 'domain_id', 'assigned_by'
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function domain()
    {
        return $this->belongsTo(CompanyDomain::class, 'domain_id', 'id');
    }

    public function assignedBy()
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }
}
