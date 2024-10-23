<?php

namespace App\Traits;

use App\Models\MaturityLevel;
use App\Models\Supplier;
use App\Models\SupplierUser;
use App\Models\UserCompanies;
use Carbon\Carbon;

trait PasswordRotation
{
    protected function determineRotation($user)
    {
        $last_changed = $user->passwordActivities()->latest()->first();
        if ($last_changed) {
            $date = Carbon::parse($last_changed->created_at);
            $now = Carbon::now();
            $diff = $date->diffInDays($now);
            $changed_sinces = ($user->pwd_rotaion - $diff);

            if ($changed_sinces >= 1 && $changed_sinces <= 10) {
                return ['pwd_warning' => 1, 'days' => round($diff), 'message' => 'show notiricaiton', 'close' => false];
            } else if ($changed_sinces < 1) {
                return ['pwd_warning' => 2, 'days' => round($diff), 'message' => 'stricly change password', 'close' => false];
            } else {
                return ['pwd_warning' => 0, 'days' => round($diff), 'message' => 'do not show anyting', 'close' => false];
            }
        } else {
            return ['pwd_warning' => 0, 'days' => $user->pwd_rotaion, 'message' => 'do not show anyting', 'close' => false];
        }
    }
     
    /**
     * Retrieves user data including user companies, associated supplier, password rotation status, and maturity levels.
     *
     * @param User $user The user object.
     * @return array An array containing the user object, associated supplier object, collection of user companies, password rotation status, and maturity levels.
     */
    protected function getUserData($user): array
    {
        // $supplier = SupplierUser::select('supplier_id')->where('user_id', $user->id)->first();

        // if (empty($supplier)) {
        //     return response()->json(['errors' => ['email' => ['Unable to find supplier']]], 422);
        // }

        // $supplier = Supplier::with('companies')->findOrFail($supplier->supplier_id);

        // $companies = UserCompanies::with('company')->where(['user_id' => $user->id])->get();

        $userCompanies = $user->companies()->with(['roles' => function ($query) use ($user) {
            $query->wherePivot('user_id', $user->id);
        }])->get();

        // supplier associated with the user along with roles
        $userSupplier = $user->suppliers()->with(['roles' => function ($query) use ($user) {
            $query->wherePivot('user_id', $user->id);
        }])->first();

        $companies = $userCompanies->toBase();

        if ($userSupplier) {
            // companies associated with the supplier
            $supplierCompanies = $userSupplier->companies()->with(['roles' => function ($query) use ($user) {
                $query->wherePivot('user_id', $user->id);
            }])->get();
    
            // Merge the supplier companies with the user companies ensuring uniqueness
            $companies = $companies->merge($supplierCompanies)->unique('id');
        }

        $pwd_rotaion = $this->determineRotation($user);

        $maturity_levels = MaturityLevel::select('id', 'name', 'value')->orderBy('name', 'asc')->get();

        return [$user, $userSupplier, $companies, $pwd_rotaion, $maturity_levels];
    }
}
