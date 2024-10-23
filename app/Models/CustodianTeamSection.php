<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustodianTeamSection extends Model
{
    use HasFactory;

    protected $table = 'custo_team_sections';

    protected $guarded = [];

    public function team()
    {
        return $this->belongsTo(Team::class, 'team_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }

    public function section()
    {
        return $this->belongsTo(StandardSection::class, 'section_id')
            ->select('id', 'name', 'menu_name');
    }

    public function standard()
    {
        return $this->belongsTo(Standard::class, 'standard_id');
    }

    public function sections()
    {
        return $this->hasMany(UserSection::class, 'parent');
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_by')->select('id', 'first_name', 'last_name', 'email');
    }
}
