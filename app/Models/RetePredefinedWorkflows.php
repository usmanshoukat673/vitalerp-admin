<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RetePredefinedWorkflows extends Model
{
    use HasFactory;

    protected $table = 'rete_defined_workflows';

    protected $guarded = [];

    protected $casts = [
        'nodes' => 'json',
        'workflow' => 'json',
        'workflowInfo' => 'json',
        'image' => 'json',
        'user' => 'json',
    ];
}
