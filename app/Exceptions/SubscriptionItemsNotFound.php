<?php

namespace App\Exceptions;

use Exception;
use Throwable;

class SubscriptionItemsNotFound extends Exception
{
    protected $errorCode;
    protected $errorData;

    public function __construct($message = 'Custom exception occurred.', $code = 0, $errorCode = '', $errorData = [], Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
        $this->errorCode = $errorCode;
        $this->errorData = $errorData;
    }

    public function getErrorCode()
    {
        return $this->errorCode;
    }

    public function getErrorData()
    {
        return $this->errorData;
    }
}
