<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecurityCertification extends Model
{
    use HasFactory;

    protected $fillable = [
        'comp_id',
        'supplier_id',
        'sustainability_program',
        'describe',
        'security_level',
        'prepared_to_support',
        'updated_by',
    ];


    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }


    public function registredCertifications()
    {
        return $this->belongsToMany(QualityCert::class, 'sc_cert_registered_certs', 'security_certification_id', 'quaility_cert_id');
    }

    public function compliantStandards()
    {
        return $this->belongsToMany(QualityCert::class, 'sc_cert_compliant_standards', 'security_certification_id', 'quaility_cert_id');
    }

    public function compliantRequirements()
    {
        return $this->belongsToMany(CompliantReq::class, 'sc_cert_compliant_requirements', 'security_certification_id', 'compliant_req_id');
    }

    public function updatedUser()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
