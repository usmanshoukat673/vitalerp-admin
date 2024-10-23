<?php

namespace App\Http\Controllers\Stripe;

use App\Models\Company;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\MotionPlan;
use App\Models\Plan;
use Exception;
use Illuminate\Support\Facades\Log;
use Stripe\StripeClient;

class StripeController extends Controller
{
    protected $stripe;

    public function __construct()
    {
        $this->stripe = new StripeClient(config('services.stripe.secret'));
    }

    public function createSubscription(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'prices' => 'required'
        ]);

        $this->stripe = new StripeClient(config('services.stripe.secret'));

        $comp_id = (int) $request->input('comp_id');
        $prices = (array) $request->input('prices');

        $company = Company::find($comp_id);

        if ($company->stripe_id == null) $company->createStripeAccount();

        foreach ($prices as $value) {
            $map_prices[] = ['price' => $value];
        }

        $subscription = $this->stripe->subscriptions->create([
            'customer' => $company->stripe_id,
            'items' => [$map_prices],
            'payment_behavior' => 'default_incomplete',
            'expand' => ['latest_invoice.payment_intent'],
        ]);

        return response([
            'subscriptionId' => $subscription->id,
            'clientSecret' => $subscription->latest_invoice->payment_intent->client_secret
        ], 200);
    }

    public function createBusinessPlanSubscription(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
        ]);
        
        $this->stripe = new StripeClient(config('services.stripe.secret'));

        $comp_id = (int) $request->input('comp_id');

        $company = Company::find($comp_id);

        if ($company->stripe_id == null) $company->createStripeAccount();

        $plan = Plan::select('id', 'stripe_price_id')->find(config('motion.business_plan'));

        $map_prices[] = ['price' => $plan->stripe_price_id];

        $subscription = $this->stripe->subscriptions->create([
            'customer' => $company->stripe_id,
            'items' => [$map_prices],
            'payment_behavior' => 'default_incomplete',
            'expand' => ['latest_invoice.payment_intent'],
        ]);

        return response([
            'subscriptionId' => $subscription->id,
            'clientSecret' => $subscription->latest_invoice->payment_intent->client_secret
        ], 200);
    }


    public function addSubscriptionItem(Request $request)
    {
        $this->validate($request, [
            'subscriptionId' => 'required',
            'price' => 'required'
        ]);

        $subscriptionId = $request->input('subscriptionId');
        $price = $request->input('price');

        $this->stripe->subscriptionItems->create([
            'subscription' => $subscriptionId,
            'price' => $price,
            'quantity' => 1,
        ]);

        $subscription = $this->stripe->subscriptions->retrieve($subscriptionId);

        return response([
            'subscriptionId' => $subscription->id,
            'clientSecret' => $subscription->latest_invoice->payment_intent->client_secret
        ], 200);
    }

    public function cancelSubscription(Request $request)
    {
        $this->validate($request, [
            'subscriptionId' => 'required'
        ]);

        $subscriptionId = $request->input('subscriptionId');

        try {
            $subscription = $this->stripe->subscriptions->cancel($subscriptionId);
            return response($subscription, 200);
        } catch (Exception $ex) {
            Log::error($ex->getMessage(), ["subject" => 'User tried canceling subscription', 'subscriptionId' => $subscriptionId]);
        }
    }

    public function createPaymentIntent(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'net_total' => 'required'
        ]);

        $company = Company::find($request->input('comp_id'));

        // $payment = $company->pay([
        //     'amount' => 97.00,
        //     'currency' => 'usd',
        //     'automatic_payment_methods' => [
        //         'enabled' => true,
        //     ],
        // ]);

        $payment = $company->createSetupIntent();

        return $payment->client_secret;
    }

    public function billing(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
        ]);

        $company = Company::find($request->input('comp_id'));

        if ($company->stripe_id == null) $company->createStripeAccount();

        return $company->billingPortalUrl($request->header()['referer'][0]);
    }
}
