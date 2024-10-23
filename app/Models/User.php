<?php

namespace App\Models;

use App\Notifications\ChangedCurrentPassword;
use App\Notifications\FreshdeskFailed;
use App\Notifications\FreshserviceFailed;
use App\Notifications\MFADisabled;
use App\Notifications\MFAEnabled;
use App\Notifications\OrganizationInvitation;
use App\Notifications\OrgTeamInvitation;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use PragmaRX\Google2FALaravel\Google2FA;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'changed_password',
        'country_code',
        'phone',
        'mfa_enabled',
        'phone_verified',
        'pwd_rotaion',
        'mfa_reminder',
        'watch_number_cd',
        'watch_number',
        'watch_configured',
        'watch_configured_at',
        'global_api_key',
        'only_panel',
        'google2fa_secret',
        'is_2fa_enabled',
        'last_invite',
        'status',
        'otp_code',
        'otp_expires_at',
        'agreement_accepted',
        'agreement_accepted_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function companies()
    {
        return $this->belongsToMany(Company::class, 'user_companies', 'user_id', 'comp_id')->withTimestamps();
    }

    public function suppliers()
    {
        return $this->belongsToMany(Supplier::class, 'supplier_users', 'user_id', 'supplier_id')->withTimestamps();
    }

    public function supplier_roles()
    {
        return $this->belongsToMany(Role::class, 'user_supplier_roles', 'user_id', 'role_id')->withTimestamps();
    }

    public function supplierRoles()
    {
        return $this->hasMany(UserSupplierRole::class);
    }

    public function user_supplier_companies()
    {
        return $this->belongsToMany(Company::class, 'user_companies', 'user_id', 'comp_id')->withTimestamps();
    }

    public function loginActivities()
    {
        return $this->hasMany(LoginActivity::class, 'user_id');
    }

    public function passwordActivities()
    {
        return $this->hasMany(PasswordActivity::class, 'user_id');
    }

    public function companyLogins()
    {
        return $this->hasMany(UserCompLogs::class, 'user_id');
    }

    public function globalActivities()
    {
        return $this->hasMany(GlobalActivities::class, 'user_id');
    }

    public function twilio_tokens()
    {
        return $this->hasMany(TwilioToken::class, 'user_id');
    }

    public function getPhoneNumber()
    {
        return '+' . $this->country_code . $this->phone;
    }

    public function watch_twilio_tokens()
    {
        return $this->hasMany(TwilioToken::class, 'user_id');
    }

    public function getWatchNumber()
    {
        return '+' . $this->watch_number_cd . $this->watch_number;
    }

    public function getWatchMaskedNumber()
    {
        return str_repeat("*", strlen($this->watch_number) - 4) . substr($this->watch_number, -4);
    }

    public function mfaActivities()
    {
        return $this->hasMany(MFAActivities::class, 'user_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'created_by')->where(['comp_id' => request('comp_id')]);
    }

    public function projects()
    {
        return $this->hasMany(Project::class, 'created_by')->where(['comp_id' => request('comp_id')]);
    }

    public function comments()
    {
        return $this->hasMany(TaskComment::class, 'commented_by')->where(['comp_id' => request('comp_id')]);
    }

    public function project_comments()
    {
        return $this->hasMany(ProjectComments::class, 'commented_by')->where(['comp_id' => request('comp_id')]);
    }

    public function control_comments()
    {
        return $this->hasMany(ControlComment::class, 'commented_by')->where(['comp_id' => request('comp_id')]);
    }

    /**
     * Send the password change notification
     *
     * @param $data
     */
    public function sendPasswordChangedNotification($data)
    {
        $this->notify(new ChangedCurrentPassword($data));
    }

    /**
     * Send the MFA Enabled Notification
     *
     * @param $data
     */
    public function sendMFAEnabledNotification($data)
    {
        $this->notify(new MFAEnabled($data));
    }

    /**
     * Send the MFA Disabled Notification
     *
     * @param $data
     */
    public function sendMFADisabledNotification($data)
    {
        $this->notify(new MFADisabled($data));
    }

    public function sendOrgInvitationNotification($data)
    {
        $this->notify(new OrganizationInvitation($data));
    }

    public function sendOrgDepartmentInvitation($data)
    {
        $this->notify(new OrgTeamInvitation($data));
    }

    public function sendFDFailedNotification($data)
    {
        $this->notify(new FreshdeskFailed($data));
    }

    public function sendFSFailedNotification($data)
    {
        $this->notify(new FreshserviceFailed($data));
    }
    /**
     * Generates a secret key for two-factor authentication using the Google2FA library.
     *
     * @return string The generated secret key.
     */
    public function generateSecretKey()
    {
        $google2fa = new Google2FA(request());
        $this->google2fa_secret = $google2fa->generateSecretKey();
        $this->save();
    }

    public function resetMFASecretKey()
    {
        $this->google2fa_secret = null;
        $this->save();
    }

    public function verify2FA($oneTimePassword)
    {
        $google2fa = new Google2FA(request());
        return $google2fa->verifyGoogle2FA($this->google2fa_secret, $oneTimePassword);
    }

    public function getQRUrlAndSecret()
    {
        $google2fa = new Google2FA(request());
        return [
            $google2fa->getQRCodeUrl(
                config('app.name'),
                $this->email,
                $this->google2fa_secret
            ),
            $this->google2fa_secret
        ];
    }

    /**
     * Check if 2FA (Two-Factor Authentication) is enabled for the user.
     *
     * @return bool
     */
    public function is2FAEnabled()
    {
        return !is_null($this->google2fa_secret) && $this->google2fa_enabled;
    }
}
