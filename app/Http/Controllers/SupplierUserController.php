<?php

namespace App\Http\Controllers;

use App\Mail\SupplierUserInviteMail;
use App\Mail\SupplierUserLoginCredentialMail;
use App\Models\Supplier;
use App\Models\SupplierUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class SupplierUserController extends Controller
{
    /**
     * Retrieves a paginated list of users associated with a supplier, optionally filtered by search query and role.
     *
     * @param Request $request The HTTP request object.
     * @param int $supplierId The ID of the supplier.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the paginated list of users.
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException If the supplier with the given ID is not found.
     */
    public function users(Request $request, $supplierId)
    {
        $perPage = $request->query('perPage', 10);
        $search = $request->query('search', '');

        $supplier = Supplier::findOrFail($supplierId);

        // Start building the query
        $query = User::select('users.id', 'users.first_name', 'users.last_name', 'users.email', 'users.phone', 'users.status')
            ->join('user_supplier_roles', 'users.id', '=', 'user_supplier_roles.user_id')
            ->where('user_supplier_roles.supplier_id', $supplierId)
            ->with(['loginActivities' => function ($query) {
                $query->select('user_id', 'id', 'created_at')->latest()->limit(1);
            }])
            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('users.first_name', 'like', '%' . $search . '%')
                        ->orWhere('users.last_name', 'like', '%' . $search . '%')
                        ->orWhere('users.email', 'like', '%' . $search . '%')
                        ->orWhere('users.phone', 'like', '%' . $search . '%');
                });
            })
            ->with(['supplierRoles' => function ($query) use ($supplierId) {
                // Filter the roles that are associated with this supplier
                $query->where('supplier_id', $supplierId)
                    ->select('user_supplier_roles.user_id', 'user_supplier_roles.role_id')
                    ->with('role:id,name'); // Include the role name
            }]);

        // Filter by roles
        if ($request->has('role') && is_array($request->role) && count($request->role) > 0) {
            $roleIds = $request->role;
            $query->whereIn('user_supplier_roles.role_id', $roleIds);
        }

        // Filter by status
        if ($request->has('status') &&  is_array($request->status) && count($request->status) > 0) {
            $query->whereIn('users.status', $request->status);
        }

        // Group by user to avoid duplicates
        $query->groupBy('users.id', 'users.first_name', 'users.last_name', 'users.email', 'users.phone', 'users.status');

        // Paginate the results
        $users = $query->paginate($perPage);

        return response()->json($users, 200);
    }

    /**
     * Adds a new supplier user to a supplier.
     *
     * @param Request $request The HTTP request object containing the user data.
     *                        Required fields: first_name, last_name, email, roles.
     *                        Optional fields: phone_number.
     * @param int $supplier_id The ID of the supplier to add the user to.
     * @return \Illuminate\Http\JsonResponse The JSON response indicating the result of the operation.
     * @throws \Illuminate\Validation\ValidationException If the input data fails validation.
     */
    public function add(Request $request, $supplier_id)
    {
        $this->validate($request, [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users,email',
                'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
            ],
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,id',
            'phone_number' => 'nullable|string|max:20',
        ], [
            'email.domain' => 'The email domain does not match the supplier\'s domain.',
        ]);

        $supplier = Supplier::findOrFail($supplier_id);

        $supplierDomain = substr(strrchr($supplier->email, "@"), 1);

        $userDomain = substr(strrchr($request->input('email'), "@"), 1);

        if ($supplierDomain !== $userDomain) {
            return response()->json([
                'message' => 'The email domain does not match the supplier\'s domain.',
                'errors' => ['email' => ["The email domain must match the supplier's domain."]]
            ], 422);
        }

        $password =  Str::random(8);

        DB::beginTransaction();

        try {
            $user = User::create([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'email' => $request->input('email'),
                'password' => Hash::make($password),
                'phone' => $request->input('phone_number'),
            ]);

            SupplierUser::firstOrCreate([
                'supplier_id' => $supplier_id,
                'user_id' => $user->id
            ]);

            // Assign roles to the user
            foreach ($request->input('roles') as $roleId) {

                DB::table('user_supplier_roles')->updateOrInsert([
                    'user_id' => $user->id,
                    'supplier_id' => $supplier_id,
                    'role_id' => $roleId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            DB::commit();

            // Send an invitation email
            // $loginUrl = config("services.vitalerp.supplier_app_url") . "/login";
            // Mail::to($user->email)->send(new SupplierUserInvitationMail($supplier, $user, $loginUrl, $password));

            // Return a success response
            return response()->json(['message' => 'Supplier user created successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("error creating supplier user " . $e->getMessage() . $e);
            return response()->json(['message' => 'Something went wrong'], 400);
        }
    }

    /**
     * Updates an existing supplier user.
     *
     * @param Request $request The HTTP request containing the updated supplier user data.
     * @param int $id The ID of the supplier user to update.
     *
     * @throws \Exception If an error occurs while updating the supplier user.
     * @return \Illuminate\Http\JsonResponse A JSON response indicating the result of the update operation.
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users,email,' . $id,
                'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
            ],
            'supplier_id' => 'required|exists:suppliers,id',
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,id',
            'phone' => 'nullable|string|max:20',
        ]);

        $supplier_id = $request->input('supplier_id');
        
        $supplier = Supplier::findOrFail($supplier_id);

        $supplierDomain = substr(strrchr($supplier->email, "@"), 1);

        $userDomain = substr(strrchr($request->input('email'), "@"), 1);

        if ($supplierDomain !== $userDomain) {
            return response()->json([
                'message' => 'The email domain does not match the supplier\'s domain.',
                'errors' => ['email' => ["The email domain must match the supplier's domain."]]
            ], 422);
        }

        DB::beginTransaction();

        try {

            $user = User::findOrFail($id);

            // Update the user details
            $user->update([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'email' => $request->input('email'),
                'phone' => $request->input('phone'),
            ]);

            // Update the user's roles
            $roleIds = $request->input('roles');

            // Get existing roles for the user in the specified supplier
            $existingRoles = $user->supplierRoles()
                ->where('supplier_id', $request->input('supplier_id'))
                ->pluck('role_id')
                ->toArray();

            // Determine roles to remove and add
            $rolesToRemove = array_diff($existingRoles, $request->roles);
            $rolesToAdd = array_diff($request->roles, $existingRoles);


            // Remove roles that are no longer assigned
            if (!empty($rolesToRemove)) {
                $user->supplierRoles()
                    ->where('supplier_id', $supplier_id)
                    ->whereIn('role_id', $rolesToRemove)
                    ->delete();
            }

            // Add new roles
            if (!empty($rolesToAdd)) {
                foreach ($rolesToAdd as $roleId) {
                    $user->supplierRoles()->create([
                        'role_id' => $roleId,
                        'supplier_id' => $supplier_id,
                    ]);
                }
            }

            DB::commit();

            // Return a success response
            return response()->json(['message' => 'Supplier user updated successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("error updating supplier user " . $e->getMessage() . $e);
            return response()->json(['message' => 'Something went wrong'], 400);
        }
    }

    public function resendLoginDetails(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            // Generate a new random password
            $password = Str::random(10);

            // Update the user's password
            $user->update([
                'password' => Hash::make($password),
            ]);

            // Send email with the new login details
            Mail::to($user->email)->send(new SupplierUserLoginCredentialMail($user, $password));

            return response()->json(['message' => 'Login details resent successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function inviteUser(Request $request)
    {

        $this->validate($request, [
            'user_id' => 'required|exists:users,id',
        ]);

        DB::beginTransaction();

        try {
            $user = User::findOrFail($request->input('user_id'));

            $password =  Str::random(8);

            $user->password = Hash::make($password);
            $user->last_invite = now()->toDateTimeString();
            $user->save();

            DB::commit();
            Mail::to($user->email)->send(new SupplierUserInviteMail($user, $password));
            // $loginUrl = config("services.vitalerp.supplier_app_url") . "/login";
            // Mail::to($user->email)->send(new SupplierUserInvitationMail($supplier, $user, $loginUrl, $password));

            //Mail::to($user->email)->send(new CorporateUserCredentialMail($user, $password, $request->companies));

            return response()->json(['message' => 'Invite sent'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Failed to send invite: " . $e->getMessage() . $e);
            return response()->json(['message' => 'Failed to send invite'], 500);
        }
    }


    /**
     * Updates the status of a supplier user.
     *
     * @param Request $request The request containing the updated user status.
     * @param int $id The ID of the supplier user to update.
     * @return \Illuminate\Http\JsonResponse A JSON response indicating the result of the update operation.
     */
    public function changeUserStatus(Request $request, $id)
    {
        $this->validate($request, [
            'status' => 'required|in:Active,Inactive,Banned',
        ]);
        DB::beginTransaction();
        try {

            $user = User::findOrFail($id);
            $user->status = $request->input('status');
            $user->save();
            DB::commit();
            return response()->json(['message' => 'User status updated successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Failed to update user status: " . $e->getMessage() . $e);
            return response()->json(['message' => 'Failed to update user status'], 500);
        }
    }
}
