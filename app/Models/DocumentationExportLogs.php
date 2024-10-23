<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentationExportLogs extends Model
{
    use HasFactory;

    protected $table = 'docexports_logs';

    protected $guarded = [];
}
