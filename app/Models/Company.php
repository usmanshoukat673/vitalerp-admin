<?php

namespace App\Models;

use App\Helpers\TextHelper;
use App\Models\FileManager\Document;
use App\Traits\RecordActivity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Laravel\Cashier\Billable;

use function Illuminate\Events\queueable;

class Company extends Model
{
    use Billable;

    protected $fillable = [
        'name',
        'email',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'created_by',
        'slug',
        'required_mfa',
        'ticketing_system',
        'pwd_exp_duration',
        'timezone',
        'maturity_level',
        'logo',
        'website',
        'phone',
        'plan',
        'compass_email',
        'description'
    ];

    protected $casts = ['required_mfa' => 'boolean'];

    protected $appends = [
        'document', 
        'task_folder', 
        'project_folder',
        'emails_folder'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'contact_person',
        'contact_person_phone',
        'reference'
    ];

    protected static function booted(): void
    {
        static::updated(queueable(function (Company $customer) {
            if ($customer->hasStripeId()) {
                $customer->syncStripeCustomerDetails();
            }
        }));
    }

    protected static function boot()
    {
        parent::boot();
        static::created(function ($model) {
            $model->documents()->create(
                ['name' => 'All Files', 'created_by' => $model->created_by, 'is_default' => true, 'type' => 'folder']
            );

            $model->documents()->create(
                ['name' => 'Task Files', 'created_by' => $model->created_by, 'task_folder' => true, 'type' => 'folder']
            );

            $model->documents()->create(
                ['name' => 'Project Files', 'created_by' => $model->created_by, 'project_folder' => true, 'type' => 'folder']
            );

            $model->documents()->create(
                ['name' => 'Email Attachments', 'created_by' => $model->created_by, 'emails_folder' => true, 'type' => 'folder']
            );

            $model->teams()->create([
                'name' => 'Admins',
                'created_by' => $model->created_by,
                'is_default' => true
            ]);

            $model->teams()->create([
                'name' => 'IT',
                'created_by' => $model->created_by,
            ]);

            $model->teams()->create([
                'name' => 'Support',
                'created_by' => $model->created_by,
            ]);

            $model->teams()->create([
                'name' => 'HR',
                'created_by' => $model->created_by,
            ]);

            $model->teams()->create([
                'name' => 'Accounting',
                'created_by' => $model->created_by,
            ]);

            $model->kanban_columns()->create([
                'strict_name' => 'todoTasks',
                'default_name' => 'TODO',
            ]);
            $model->kanban_columns()->create([
                'strict_name' => 'inprogressTasks',
                'default_name' => 'In Progress',
            ]);
            $model->kanban_columns()->create([
                'strict_name' => 'waitingTasks',
                'default_name' => 'Waiting',
            ]);
            $model->kanban_columns()->create([
                'strict_name' => 'reviewTasks',
                'default_name' => 'Review',
            ]);
            $model->kanban_columns()->create([
                'strict_name' => 'doneTasks',
                'default_name' => 'Done',
            ]);

            $model->whistle()->create();

            $model->policy_portal()->create();

            $model->compass_email = TextHelper::generateEmail($model->name, $model->id);
            $model->save();
        });
    }

    public function users()
    {
        return $this->hasMany(UserCompanies::class, 'comp_id');
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'comp_id');
    }

    public function getDocumentAttribute()
    {
        return $this->documents()->where(['is_default' => true])->first();
    }

    public function getTaskFolderAttribute()
    {
        return $this->documents()->select('id')->where(['task_folder' => true])->first();
    }

    public function getProjectFolderAttribute()
    {
        return $this->documents()->select('id')->where(['project_folder' => true])->first();
    }

    public function getEmailsFolderAttribute()
    {
        return $this->documents()->select('id')->where(['emails_folder' => true])->first();
    }

    public function teams()
    {
        return $this->hasMany(Team::class, 'comp_id');
    }

    public function kanban_columns()
    {
        return $this->hasMany(KanbanColumn::class, 'comp_id');
    }

    public function projects()
    {
        return $this->hasMany(Project::class, 'comp_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'comp_id');
    }

    public function createStripeAccount()
    {
        return $this->createOrGetStripeCustomer();
    }

    public function whistle()
    {
        return $this->hasOne(Whistleblow::class, 'comp_id');
    }

    public function policy_portal()
    {
        return $this->hasOne(PolicyPortal::class, 'comp_id');
    }

    // public function users()
    // {
    //     return $this->belongsToMany(User::class, 'user_roles', 'comp_id', 'user_id')
    //                 ->withPivot('role_id')
    //                 ->withTimestamps();
    // }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_company_roles', 'comp_id', 'role_id')
                    ->withPivot('user_id')
                    ->withTimestamps();
    }

    public function suppliers()
    {
        return $this->belongsToMany(Supplier::class, 'supplier_companies', 'comp_id', 'supplier_id')->withTimestamps();
    }
}
