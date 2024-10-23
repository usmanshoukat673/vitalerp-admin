<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class SupplierDocument extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'supplier_id',
        'parent',
        'name',
        'slug',
        'size',
        'ext',
        'type',
        'created_by',
        'updated_by'
    ];

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function parent_folder()
    {
        return $this->belongsTo(static::class, 'parent');
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'created_by')->select('id', 'first_name', 'last_name', 'email');
    }

    public function updatedUser()
    {
        return $this->belongsTo(User::class, 'updated_by')->select('id', 'first_name', 'last_name', 'email');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function getEncIdAttribute()
    {
        return encrypt($this->id);
    }
}
