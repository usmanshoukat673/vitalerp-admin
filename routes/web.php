<?php

use App\Http\Controllers\IndexController;
use App\Http\Controllers\SendWebhookController;
use App\Http\Controllers\Stripe\WebhookController;
use App\Http\Controllers\SupplierDocumentViewer;
use App\Http\Controllers\WebhookManagmentController;
use App\Http\Controllers\WhistlePublicController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'whistleblows', 'middleware' => ['validate_whistle_id']], function(){
    Route::get('index', [WhistlePublicController::class, 'index']);
    Route::get('report/code/{id}', [WhistlePublicController::class, 'code']);
    Route::post('report/submit', [WhistlePublicController::class, 'submit']);
    Route::post('report/check', [WhistlePublicController::class, 'check']);
    Route::get('report/attachment/{id}', [WhistlePublicController::class, 'attachment']);
});

Route::get('send-test-webhook', [SendWebhookController::class, 'send']);

Route::get('webhooks', [WebhookManagmentController::class, 'list']);
Route::put('webhooks', [WebhookManagmentController::class, 'create']);
Route::delete('webhooks/{webhookId}', [WebhookManagmentController::class, 'delete']);

Route::webhooks('webhooks');

Route::get('/view-pdf/{supplier_document_id}/{supplier_id}', [SupplierDocumentViewer::class, 'view']);

Route::get('/unauthorized', function () {
    abort(401);
})->name('login');

Route::post('/stripe/webhook', [WebhookController::class, 'handleWebhook'])->name('cashier.webhook');

Route::get('/{path?}', [
    'uses' => 'App\Http\Controllers\IndexController@index',
    'as' => 'app',
    'where' => ['path' => '.*']
]);

// Internal route for emails
Route::get('reset-password/{token}', [IndexController::class, 'index'])->name('password.reset');
