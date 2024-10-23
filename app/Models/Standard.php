<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

    class Standard extends Model
    {
        protected $fillable = ['name', 'slug', 'description'];

        protected $casts = [
            'maturity_levels' => 'boolean',
            'assets' => 'boolean',
            'models' => 'boolean',
        ];

        protected $appends = ['isSubscribed'];

        protected $hidden = ['created_at', 'updated_at'];

        public function sections()
        {
            return $this->hasMany(StandardSection::class, 'standard_id');
        }

        public function setNameAttribute($value)
        {
            $this->attributes['name'] = $value;
            $this->attributes['slug'] = Str::slug($value);
        }

        public function comp_controls()
        {
            return $this->hasMany(CompCtrls::class, 'standard_id')->where(['comp_id' => request('comp_id')]);
        }

        public function comp_std_priority(){
            return $this->hasOne(CompStandards::class, 'standard_id')->where(['comp_id' => request('comp_id')]);
        }

        public function scopeFilter($query, $filters)
        {
            return $filters->apply($query);
        }

        public function families()
        {
            return $this->hasMany(StdnFamily::class, 'standard_id');
        }

        public function versions()
        {
            return $this->hasMany(StdnVersion::class, 'standard_id');
        }

        public function focuses()
        {
            return $this->hasMany(StdNFocuses::class, 'standard_id');
        }

        public function statutes()
        {
            return $this->hasMany(StdNSatutes::class, 'standard_id');
        }

        // check if subscribed 
        public function getIsSubscribedAttribute(){
            // :TODO::
            // get all subscriptions 
            // checout each product 
            return CompStandards::where(['standard_id' => $this->id, 'comp_id' => request('comp_id')])->first() ? true : false;
        }
    }
