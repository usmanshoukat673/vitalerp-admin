<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BuildSuppliers extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function examples()
    {
        return $this->hasMany(BuildSuppliersExamples::class, 'build_supplier_id', 'id');
    }
}
