<?php

namespace App\Exceptions;

use Exception;
use Throwable;

class ProductNotFound extends Exception
{
    public function __construct($productId, $subscriptionId,Throwable $previous = null)
    {
        $message = "User was trying to subscribe to stripe product with ID $productId, but it is not available in the database. stripe subscriotion id $subscriptionId";
        $code = 0;
        parent::__construct($message, $code, $previous);
    }
}
