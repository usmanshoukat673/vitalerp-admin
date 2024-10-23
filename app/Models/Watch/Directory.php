<?php

namespace App\Models\Watch;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Directory extends Model
{
    use HasFactory;

    protected $guarded = [];


    public function ativities()
    {
        return $this->hasMany(DirectoryActivities::class, 'directory_id');
    }
}
