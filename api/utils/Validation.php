<?php

trait ValidationTrait
{
    public function validateName($name)
    {
        return !empty($name);
    }

    public function validateEmail($email)
    {
        return !empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL);
    }
}