<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupplierCapability extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplier_id',
        'comp_id',
        'primary_naics_code',
        'has_prime_contracts',
        'primed_contract_last_two_years',
        'acquisition_contracts',
        'product_and_services',
        'updated_by'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }


    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function updatedUser()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function primaryNaicsCode()
    {
        return $this->belongsTo(NaicsCode::class, 'primary_naics_code');
    }

    public function secondaryNaicsCodes()
    {
        return $this->belongsToMany(NaicsCode::class, 'capability_secondary_codes', 'supplier_capability_id', 'naics_code_id')
            ->withTimestamps();
    }

    public function agencies()
    {
        return $this->belongsToMany(Agency::class, 'capability_agencies', 'supplier_capability_id', 'agency_id')
            ->withTimestamps();
    }

    public function primeContracts()
    {
        return $this->belongsToMany(PrimeContract::class, 'capability_prime_contracts', 'supplier_capability_id', 'prime_contract_id')
            ->withTimestamps();
    }

    public function states()
    {
        return $this->belongsToMany(CountryState::class, 'capability_states', 'supplier_capability_id', 'state_id')
            ->withTimestamps();
    }

    public function countries()
    {
        return $this->belongsToMany(CountryCode::class, 'capability_countries', 'supplier_capability_id', 'country_code_id')
            ->withTimestamps();
    }
}
