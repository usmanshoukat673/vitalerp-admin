<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupplierSocioenomic extends Model
{
    use HasFactory;

    protected $table = 'supplier_socioenomics';

    protected $fillable = [
        'comp_id',
        'supplier_id',
        'ethnicity_id',
        'exit_date',
        'mentor_protege_program',
        'relationships',
    ];


    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }

    public function ethnicity()
    {
        return $this->belongsTo(Ethnicity::class, 'ethnicity_id');
    }

    public function updatedUser()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function socioenomicStatus()
    {
        return $this->belongsToMany(Socioeconomic::class, 'socioenomic_statuses', 'supplier_socioenomic_id', 'socioenomic_id');
    }
}
