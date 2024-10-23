<?php

use App\Http\Controllers\AcceptInviteController;
use App\Http\Controllers\AccountSetupController;
use App\Http\Controllers\AgencyController;
use App\Http\Controllers\AgreementController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\ResetPasswordController;
use App\Http\Controllers\AssignDocumentsMng;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ComplianceController;
use App\Http\Controllers\CoportaProfileController;
use App\Http\Controllers\CorporateInformationController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\CountryStateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeviceLocationFixerController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\DomainController;
use App\Http\Controllers\EthnicitiesController;
use App\Http\Controllers\FileDownloaderController;
use App\Http\Controllers\FileManager;
use App\Http\Controllers\JoinFromInvite;
use App\Http\Controllers\LaborCategoriesController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LoginEmailOTPController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\MoptionPacksController;
use App\Http\Controllers\MultiFactorAuthController;
use App\Http\Controllers\N8N\CrediatialTestController;
use App\Http\Controllers\NAICSCodeController;
use App\Http\Controllers\Onboarding\AssetExamplesController;
use App\Http\Controllers\Onboarding\BuildStandardController;
use App\Http\Controllers\Onboarding\BuildSupplierExamplesController;
use App\Http\Controllers\Onboarding\BuildSuppliersController;
use App\Http\Controllers\Onboarding\BussinessActivityController;
use App\Http\Controllers\Onboarding\BussinessDepartmentController;
use App\Http\Controllers\Onboarding\DepartmentAssets;
use App\Http\Controllers\Onboarding\DepartmentFunctions;
use App\Http\Controllers\Onboarding\VerifyBusinessDepartments;
use App\Http\Controllers\Onboarding\VerifyCompanyController;
use App\Http\Controllers\Onboarding\VerifyDepartmentAssets;
use App\Http\Controllers\Onboarding\VerifyEmailController;
use App\Http\Controllers\Onboarding\VerifyOverviewController;
use App\Http\Controllers\Org\ActivityController;
use App\Http\Controllers\Org\InvitesController;
use App\Http\Controllers\Org\LocationsController;
use App\Http\Controllers\Org\OnboardingController;
use App\Http\Controllers\Org\OrgManager;
use App\Http\Controllers\Org\OrgMFAManager;
use App\Http\Controllers\Org\PasswordSecurity;
use App\Http\Controllers\Org\TeamMemebersController;
use App\Http\Controllers\Org\TimeZoneSettings;
use App\Http\Controllers\PlansController;
use App\Http\Controllers\PolicyPanelAuthController;
use App\Http\Controllers\PrimeContractHistoryController;
use App\Http\Controllers\QualityCertsController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SecurityCertificationsController;
use App\Http\Controllers\SignUpController;
use App\Http\Controllers\SocioeconomicsController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\Stripe\PaymentMethodController;
use App\Http\Controllers\Stripe\StripeController;
use App\Http\Controllers\SupplierCapabilityController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\SupplierDomainController;
use App\Http\Controllers\SupplierLocationController;
use App\Http\Controllers\SupplierPerformanceController;
use App\Http\Controllers\SupplierSocioenomicController;
use App\Http\Controllers\SupplierUserController;
use App\Http\Controllers\SuppplierRolesController;
use App\Http\Controllers\TeamManagement;
use App\Http\Controllers\TwoFactorAuthController;
use App\Http\Controllers\UserActivitiesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserMFAController;
use App\Http\Controllers\UserOAuthClientManager;
use App\Http\Controllers\UserPasswordController;
use App\Http\Controllers\UserSectionManagement;
use App\Http\Controllers\Watch\LoginController as WatchLoginController;
use App\Http\Controllers\Watch\UserController as WatchUserController;
use App\Http\Controllers\Watch\WatchDevicesController;
use App\Http\Controllers\Watch\WatchDirectoryController;
use App\Http\Controllers\Watch\WatchVerificationController;
use App\Http\Controllers\WebhookManagmentController;
use App\Http\Controllers\WhistleController;
use App\Http\Controllers\WhistleRecipientController;
use App\Http\Controllers\WhistleRerportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [LoginController::class, 'login']);
    Route::post('signup', [SignUpController::class, 'signup']);
    Route::post('signup-for-free', [SignUpController::class, 'signupForFree']);
    Route::post('verify-email', [SignUpController::class, 'verifyEmail']);
    Route::post('join', [JoinFromInvite::class, 'signup']);
    Route::post('setup-new-account', [AccountSetupController::class, 'setup']);
    Route::post('sent-reset-password-link', [ForgotPasswordController::class, 'sendResetLinkEmail']);
    Route::post('reset-password', [ResetPasswordController::class, 'reset']);

    Route::post('policy-panels-login', [PolicyPanelAuthController::class, 'requestOTP']);
    Route::post('policy-panel-resend-otp', [PolicyPanelAuthController::class, 'resentOTP']);
    Route::post('policy-panel-verify-login', [PolicyPanelAuthController::class, 'verifyOTP']);

    Route::group(['prefix' => 'onboarding'], function () {
        Route::get('/us-states', [VerifyCompanyController::class, 'usStates']);
        Route::post('/get-build-id', [VerifyEmailController::class, 'getBuildId']);
        Route::post('/get-build-id-for-existing', [VerifyEmailController::class, 'getBuildIdEx']);
        Route::post('/send-verfication-email', [VerifyEmailController::class, 'send']);

        Route::post('/verify-company', [VerifyCompanyController::class, 'verify']);
        Route::get('/verify-company/{build_id}', [VerifyCompanyController::class, 'orerview']);
        Route::get('/selected-standards/{build_id}', [BuildStandardController::class, 'selected_standards']);
        Route::get('/standards', [BuildStandardController::class, 'standards']);
        Route::post('/start-building-standard', [BuildStandardController::class, 'startBuilding']);

        Route::post('/verify-overview', [VerifyOverviewController::class, 'verifyOverview']);

        Route::get('/business-dept/{build_id}', [BussinessDepartmentController::class, 'depts']);
        Route::get('/selected-business-depts/{build_id}', [BussinessDepartmentController::class, 'selectedDepts']);
        Route::post('/business-dept', [BussinessDepartmentController::class, 'select']);
        Route::post('/business-dept-owner', [BussinessDepartmentController::class, 'saveOwner']);
        Route::post('/add-business-dept', [BussinessDepartmentController::class, 'add']);
        Route::post('/update-business-dept', [BussinessDepartmentController::class, 'update']);
        Route::post('/delete-business-dept', [BussinessDepartmentController::class, 'remove']);

        Route::post('/verify-departments', [VerifyBusinessDepartments::class, 'verifyDepts']);

        Route::get('/depts-functions/{build_id}/{standard_id}', [DepartmentFunctions::class, 'functions']);
        Route::post('/select-business-function', [DepartmentFunctions::class, 'select']);
        Route::post('/add-business-function', [DepartmentFunctions::class, 'add']);
        Route::post('/update-business-function', [DepartmentFunctions::class, 'update']);
        Route::post('/delete-business-function', [DepartmentFunctions::class, 'remove']);

        Route::post('/verify-assets', [VerifyDepartmentAssets::class, 'verifyAssets']);

        // handle assets
        Route::get('/depts-assets/{build_id}/{standard_id}', [DepartmentAssets::class, 'assets']);
        Route::post('/select-business-asset', [DepartmentAssets::class, 'select']);
        Route::post('/add-business-asset', [DepartmentAssets::class, 'add']);
        Route::post('/update-business-asset', [DepartmentAssets::class, 'update']);
        Route::post('/delete-business-asset', [DepartmentAssets::class, 'remove']);

        Route::group(['prefix' => 'asset-example'], function () {
            Route::post('/add-new', [AssetExamplesController::class, 'add']);
            Route::post('/toggle', [AssetExamplesController::class, 'toggle']);
            Route::post('/unselect-all', [AssetExamplesController::class, 'unselect']);
        });

        Route::get('/build-suppliers/{build_id}/{standard_id}', [BuildSuppliersController::class, 'suppliers']);
        Route::post('/select-build-supplier', [BuildSuppliersController::class, 'select']);
        Route::post('/add-build-supplier', [BuildSuppliersController::class, 'add']);
        Route::post('/update-build-supplier', [BuildSuppliersController::class, 'update']);
        Route::post('/delete-build-supplier', [BuildSuppliersController::class, 'remove']);

        Route::group(['prefix' => 'supplier-example'], function () {
            Route::post('/add-new', [BuildSupplierExamplesController::class, 'add']);
            Route::post('/toggle', [BuildSupplierExamplesController::class, 'toggle']);
            Route::post('/unselect-all', [BuildSupplierExamplesController::class, 'unselect']);
        });

        // unused
        Route::get('/business-activities/{build_id}', [BussinessActivityController::class, 'activities']);
        Route::post('/business-activities', [BussinessActivityController::class, 'select']);
        Route::post('/add-business-activity', [BussinessActivityController::class, 'add']);
        Route::post('/update-business-activity', [BussinessActivityController::class, 'update']);
        Route::post('/delete-business-activity', [BussinessActivityController::class, 'remove']);
    });

    Route::group(['middleware' => 'auth:api'], function () {

        Route::post('/email/2fa/verify', [LoginEmailOTPController::class, 'validateOTP']);
        Route::post('/email/2fa/resend', [LoginEmailOTPController::class, 'resendEmailOtp']);
        Route::post('/user/accept-agreement', [AgreementController::class, 'acceptAgreement']);

        Route::get('/2fa/setup', [TwoFactorAuthController::class, 'setup2FA']);
        Route::get('/2fa/later', [TwoFactorAuthController::class, 'later']);
        Route::post('/2fa/enable', [TwoFactorAuthController::class, 'enable2FA']);
        Route::post('/2fa/verify', [TwoFactorAuthController::class, 'enable2FA']);

        Route::get('logout', [LoginController::class, 'logout']);
        Route::get('user', [UserController::class, 'user']);
        Route::post('verify-otp', [UserMFAController::class, 'verifyOTP']);
        Route::post('resend-otp', [UserMFAController::class, 'resendOTP']);
    });
});

Route::group(['prefix' => 'user', 'middleware' => 'auth:api'], function () {

    Route::group(['prefix' => 'org'], function () {
        Route::post('/record/user-login', [ActivityController::class, 'record']);
        Route::get('/fetch/standards/{comp_id}', [ActivityController::class, 'featchStandards']);
        Route::get('/index', [OrgManager::class, 'index']);
        Route::post('/add', [OrgManager::class, 'add']);
        Route::post('/invite', [InvitesController::class, 'invite']);
        Route::post('/user/update', [OrgManager::class, 'updateUser']);
        Route::post('/watch/invite', [InvitesController::class, 'watchInvite']);
        Route::get('/users/{id}', [OrgManager::class, 'listUsers']);
        Route::get('/users/all/{id}', [OrgManager::class, 'listAllUsers']);
        Route::get('/invites/{id}', [OrgManager::class, 'listInvites']);
        Route::get('/activites/{id}', [ActivityController::class, 'list']);
        Route::post('/save-basic-details', [OrgManager::class, 'saveBasics']);
        Route::post('/upload-logo', [OrgManager::class, 'uploadLogo']);
        Route::get('/tz-list/{comp_id}', [TimeZoneSettings::class, 'getTzList']);
        Route::get('/all-activities/{comp_id}', [ActivityController::class, 'allActivities']);
        Route::get('/general-activities/{comp_id}', [ActivityController::class, 'generaActivities']);
        Route::get('/location-activities/{comp_id}', [ActivityController::class, 'locationActivities']);
        Route::get('/document-activities/{comp_id}', [ActivityController::class, 'documentActivities']);
        Route::get('/control-activities/{comp_id}', [ActivityController::class, 'controlActivities']);

        // onboarding
        Route::group(['prefix' => 'onboarding'], function () {
            Route::post('/add-memeber', [TeamMemebersController::class, 'addTeamMember']);
            Route::get('/list-users/execpt-active/{comp_id}', [OnboardingController::class, 'users']);
            Route::get('/assing-work/get-sections/{comp_id}', [OnboardingController::class, 'sections']);
        });

        Route::group(['prefix' => 'security'], function () {
            Route::post('/toggle-mfa', [OrgMFAManager::class, 'toggleMFA']);
            Route::post('/password-duration', [PasswordSecurity::class, 'savePwdDuration']);
        });
    });

    Route::group(['prefix' => 'activities'], function () {
        Route::get('/login', [UserActivitiesController::class, 'login']);
        Route::get('/password', [UserActivitiesController::class, 'password']);
        Route::get('/mfa', [UserActivitiesController::class, 'mfa']);
    });

    Route::post('accept-invite', [AcceptInviteController::class, 'accept']);
    Route::post('change-current-password', [UserController::class, 'changeCurrentPassword']);
    Route::post('change-password', [UserController::class, 'changePassword']);
    Route::post('update-profile', [UserController::class, 'updateProfile']);
    Route::post('verify-number', [MultiFactorAuthController::class, 'verify']);
    Route::post('verify-otp', [MultiFactorAuthController::class, 'verifyOTP']);
    Route::post('resend-otp', [MultiFactorAuthController::class, 'resendOTP']);
    Route::post('disable-mfa', [MultiFactorAuthController::class, 'disable']);
    Route::post('password-rotation', [UserPasswordController::class, 'changePwdRotation']);

    // Client & API
    Route::get('oauth/clients', [UserOAuthClientManager::class, 'create']);

    Route::group(['prefix' => 'cjfm'], function () {
        Route::get('list/{comp_id}/{document_id}', [FileManager::class, 'list']);

        Route::get('default-access/{comp_id}/{document_id}', [FileManager::class, 'defaultAccess']);
        Route::get('quick-access/{comp_id}', [FileManager::class, 'quickAccess']);
        Route::get('recent-docs/{comp_id}', [FileManager::class, 'recentDocs']);
        Route::get('section-docs/{comp_id}/{section_id}', [FileManager::class, 'sectionDocs']);
        Route::post('all-sub-domains', [ComplianceController::class, 'allSubDoamins']);


        Route::post('create-folder', [FileManager::class, 'createFolder']);
        Route::post('delete-folder', [FileManager::class, 'deleteFolder']);
        Route::post('rename-folder', [FileManager::class, 'renameFolder']);
        Route::post('rename-file', [FileManager::class, 'renameFile']);
        Route::post('upload-file', [FileManager::class, 'uploadFile']);
        Route::post('delete-file', [FileManager::class, 'deleteFile']);
        Route::post('document-review-date', [FileManager::class, 'updateReview']);
        Route::get('download-file/{id}', [FileDownloaderController::class, 'file']);
        Route::get('download-folder/{id}', [FileDownloaderController::class, 'folder']);
        Route::post('create-document', [FileManager::class, 'createDocument']);
        Route::post('create-document-control-db', [FileManager::class, 'createDocumentCD']);
        Route::post('rename-document', [FileManager::class, 'reanameDocument']);
        Route::post('save-document', [FileManager::class, 'saveDocument']);
        Route::post('delete-document', [FileManager::class, 'deleteDocument']);
        Route::post('unlink-document', [FileManager::class, 'unlinkDocument']);
        Route::post('move-document', [FileManager::class, 'moveDocument']);
        Route::get('get-sections/{comp_id}/{id}', [AssignDocumentsMng::class, 'sections']);
        Route::get('get-sections/{comp_id}', [AssignDocumentsMng::class, 'plainSections']);
        Route::post('assign-sections', [AssignDocumentsMng::class, 'assign']);
        Route::get('get-controls/{comp_id}/{id}', [AssignDocumentsMng::class, 'controls']);
        Route::post('assign-controls', [AssignDocumentsMng::class, 'assignControls']);
        Route::get('view-document/{document_id}', [FileManager::class, 'viewDigitalDoc']);

        Route::post('save-meta-data', [DocumentController::class, 'saveMeta']);
    });

    Route::group(['prefix' => 'teams'], function () {
        Route::get('all-users/{comp_id}', [TeamManagement::class, 'companyUsers']);
        Route::get('all-teams/{comp_id}', [TeamManagement::class, 'allTeams']);
        Route::get('list/{comp_id}', [TeamManagement::class, 'list']);
        Route::get('profile/{comp_id}/{id}', [TeamManagement::class, 'profile']);
        Route::get('profile/users/{comp_id}/{id}', [TeamManagement::class, 'getUsersToAssign']);
        Route::post('create-team', [TeamManagement::class, 'createTeam']);
        Route::post('edit-team', [TeamManagement::class, 'editTeam']);
        Route::post('remove-team', [TeamManagement::class, 'removeTeam']);
        Route::post('assign-user', [TeamManagement::class, 'assignUser']);
        Route::post('remove-user', [TeamManagement::class, 'removeUser']);
    });

    Route::group(['prefix' => 'locations'], function () {
        Route::get('list/{comp_id}', [LocationsController::class, 'list']);
        Route::post('add-location', [LocationsController::class, 'addLocation']);
        Route::post('save-location-changes', [LocationsController::class, 'saveLocationChanges']);
        Route::post('add-location-on-the-fly', [LocationsController::class, 'addLocation']);
    });

    Route::group(['prefix' => 'user-sections'], function () {
        Route::post('list', [UserSectionManagement::class, 'list']);
        Route::get('profile/{comp_id}/{id}', [UserSectionManagement::class, 'profile']);
        Route::get('profile/users/{comp_id}/{id}', [UserSectionManagement::class, 'getUsersToAssign']);
        Route::post('assign-user', [UserSectionManagement::class, 'assignUser']);
        Route::post('remove-user', [UserSectionManagement::class, 'removeUser']);
    });

    Route::group(['prefix' => 'marketplace'], function () {
        Route::get('products', [StoreController::class, 'bundleUp']);
        Route::get('featured-products', [StoreController::class, 'featuredProducts']);
        Route::get('list', [MarketplaceController::class, 'list']);
        Route::get('apps', [MarketplaceController::class, 'apps']);
        Route::post('app-count', [CategoriesController::class, 'appCount']);
        Route::group(['prefix' => 'stripe'], function () {
            Route::post('create-subscription', [StripeController::class, 'createSubscription']);
            Route::post('create-bu-plan-subscription', [StripeController::class, 'createBusinessPlanSubscription']);
            Route::post('cancel-subscription', [StripeController::class, 'cancelSubscription']);
            Route::post('add-subscription-item', [StripeController::class, 'addSubscriptionItem']);
            Route::post('create-payment-intent', [StripeController::class, 'createPaymentIntent']);
            Route::group(['prefix' => 'paymet-method'], function () {
                Route::post('create', [PaymentMethodController::class, 'create']);
                Route::post('list', [PaymentMethodController::class, 'list']);
                Route::post('update', [PaymentMethodController::class, 'update']);
                Route::post('delete', [PaymentMethodController::class, 'delete']);
            });
            Route::post('stripe-billing-portal', [StripeController::class, 'billing']);

            Route::post('handle-billing', [StripeController::class, 'billing'])->name('billing'); // not in use
        });

        Route::post('assign-free-plan', [MoptionPacksController::class, 'freePlan']);
        Route::get('plans', [PlansController::class, 'plans']);
    });

    Route::group(['prefix' => 'search'], function () {
        Route::post('query', [SearchController::class, 'search']);
        Route::post('custom-query', [SearchController::class, 'custom']);
    });

    Route::group(['prefix' => 'dashboard'], function () {
        Route::get('apps/{comp_id}', [DashboardController::class, 'apps']);
        Route::get('devices/{comp_id}', [DashboardController::class, 'devices']);
        Route::post('device-ip-change', [DeviceLocationFixerController::class, 'updateIP']);
        Route::post('device-location-changed', [DeviceLocationFixerController::class, 'updateDevice']);
        Route::post('company-new-device', [DeviceLocationFixerController::class, 'assignNewDevice']);
    });

    Route::group(['prefix' => 'whistleblows'], function () {

        Route::get('index', [WhistleController::class, 'index']);

        Route::group(['prefix' => 'recipients'], function () {
            Route::post('add', [WhistleRecipientController::class, 'add']);
            Route::delete('delete/{id}', [WhistleRecipientController::class, 'delete']);
        });

        Route::group(['prefix' => 'reports'], function () {
            Route::get('index', [WhistleRerportController::class, 'index']);
            Route::get('view/{id}', [WhistleRerportController::class, 'view']);
            Route::get('attachment/{id}', [WhistleRerportController::class, 'attachment']);
        });
    });

    Route::group(['prefix' => 'valid-values'], function () {
        Route::get('/naics-codes', [NAICSCodeController::class, 'naicsCodes']);
        Route::get('/socioeconomics', [SocioeconomicsController::class, 'index']);
        Route::get('/ethnicities', [EthnicitiesController::class, 'index']);
        Route::get('/quality-certs', [QualityCertsController::class, 'index']);
        Route::get('/agencies', [AgencyController::class, 'index']);
        Route::get('/pime-contract-history', [PrimeContractHistoryController::class, 'index']);
        Route::get('/country-states/id-name/{order}', [CountryStateController::class, 'idName']);
        Route::get('/country-codes/id-name/{order}', [CountryController::class, 'idName']);

        Route::group(['prefix' => 'labor-categories'], function () {
            Route::get('/', [LaborCategoriesController::class, 'index']);
            Route::get('/all/{order}', [LaborCategoriesController::class, 'all']);
            Route::post('/', [LaborCategoriesController::class, 'store']);
            Route::post('/get-labor-categories-details', [LaborCategoriesController::class, 'getLaborCategories']); // not in use
            Route::delete('/{id}', [LaborCategoriesController::class, 'destroy']);
            Route::put('/{id}', [LaborCategoriesController::class, 'update']);
        });
    });

    Route::prefix('domains')->group(function () {
        Route::get('/', [DomainController::class, 'index']);
        Route::post('/add', [DomainController::class, 'add']);
        Route::put('/update/{id}', [DomainController::class, 'update']);
        Route::delete('/delete/{id}', [DomainController::class, 'destroy']);

        Route::get('/all', [DomainController::class, 'all']);
        Route::get('/all/suppliers', [CompanyController::class, 'allSuppliers']);
        Route::get('/search-all/suppliers', [CompanyController::class, 'searchSuppliers']);
        Route::get('supplier-with-domains', [SupplierDomainController::class, 'index']);
        Route::post('supplier-domains/assign', [SupplierDomainController::class, 'assign']);
    });

    Route::prefix('suppliers')->group(function () {

        Route::put('/{supplierId}', [SupplierController::class, 'saveProfile']);

        Route::get('/roles', [SuppplierRolesController::class, 'index']);
        Route::get('{supplierId}/default-location', [SupplierLocationController::class, 'defaultLocation']);
        Route::get('{supplierId}/locations', [SupplierLocationController::class, 'index']);
        Route::get('{supplierId}/all/locations', [SupplierLocationController::class, 'all']);

        Route::prefix('locations')->group(function () {
            Route::post('/', [SupplierLocationController::class, 'store']);
            Route::put('/{id}', [SupplierLocationController::class, 'update']);
            Route::delete('/{id}', [SupplierLocationController::class, 'destroy']);
        });

        Route::prefix('users')->group(function () {
            Route::get('/{suppilerId}', [SupplierUserController::class, 'users']);
            Route::post('/add/{supplier_id}', [SupplierUserController::class, 'add']);
            // Route::delete('/delete/{id}', [SupplierUserController::class, 'delete']);
            Route::put('/update/{id}', [SupplierUserController::class, 'update']);
            Route::post('/resend-login-details/{id}', [SupplierUserController::class, 'resendLoginDetails']);
            Route::post('/invite-user', [SupplierUserController::class, 'inviteUser']);
            Route::post('/chnage-user-status/{id}', [SupplierUserController::class, 'changeUserStatus']);
        });
    });

    Route::prefix('corporate-profile')->group(function () {

        Route::prefix('corporate-information')->group(function () {
            Route::get('/{supplierId}', [CorporateInformationController::class, 'getCorporateInformation']);
            Route::post('/{supplierId}', [CorporateInformationController::class, 'saveCorporateInformation']);
            Route::get('/download-brochure/{supplierId}/{documentId}', [CorporateInformationController::class, 'downloadBrochure']);
        });

        Route::prefix('capability')->group(function () {
            Route::get('/{supplierId}', [SupplierCapabilityController::class, 'getCapabilities']);
            Route::put('/{supplierId}', [SupplierCapabilityController::class, 'saveCapabilities']);
        });

        Route::prefix('socioenomic')->group(function () {
            Route::get('/{supplierId}', [SupplierSocioenomicController::class, 'getSocioenomics']);
            Route::put('/{supplierId}', [SupplierSocioenomicController::class, 'saveSocioenomics']);
        });

        Route::prefix('security-certifications')->group(function () {
            Route::get('/{supplierId}', [SecurityCertificationsController::class, 'getSecurityCertifications']);
            Route::put('/{supplierId}', [SecurityCertificationsController::class, 'saveSecurityCertifications']);
        });

        Route::prefix('past-performance')->group(function () {
            Route::get('/{supplierId}', [SupplierPerformanceController::class, 'getPerformance']);
            Route::put('/{supplierId}', [SupplierPerformanceController::class, 'savePerformance']);
        });

        Route::prefix('overall-progress')->group(function () {
            Route::get('/{supplierId}', [CoportaProfileController::class, 'getStatus']);
        });
    });
});

Route::group(['prefix' => 'n8n', 'middleware' => 'json.response'], function () {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('test-access', [CrediatialTestController::class, 'test']);
        Route::get('webhooks', [WebhookManagmentController::class, 'list']);
        Route::get('comapnies', [WebhookManagmentController::class, 'comapnies']);
    });
});