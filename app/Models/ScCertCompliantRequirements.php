<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScCertCompliantRequirements extends Model
{
    use HasFactory;

    protected $fillable = [
        'security_certification_id',
        'compliant_req_id',
    ];


    public function securityCertification()
    {
        return $this->belongsTo(SecurityCertification::class, 'security_certification_id');
    }

    public function compliantReq()
    {
        return $this->belongsTo(CompliantReq::class, 'compliant_req_id');
    }
}
