<?php 

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../models/UserModel.php';

class UserTest extends TestCase {

    public function testValidate() {
        // Mock $_SERVER superglobal
        $_SERVER['REMOTE_ADDR'] = '127.0.0.1';
        $_SERVER['HTTP_USER_AGENT'] = 'Firefox';

        // Create a User instance with valid data
        $userData = ['name' => 'karl', 'email' => 'kanzenj@gmail.com'];
        $user = new User($userData);

        // Validate the user
        $this->assertTrue($user->validate());

        // Clean up after the test
        unset($_SERVER['REMOTE_ADDR']);
        unset($_SERVER['HTTP_USER_AGENT']);
    }

    public function testUpsert() {

        // Mock $_SERVER superglobal
        $_SERVER['REMOTE_ADDR'] = '127.0.0.1';
        $_SERVER['HTTP_USER_AGENT'] = 'Firefox';

        // Create a User instance with valid data
        $userData = ['name' => 'karl', 'email' => 'kanzenj@gmail.com'];
        $user = new User($userData);

        // Upsert the user
        $result = $user->upsert();

        // Check if the upsert was successful
        $this->assertNotNull($result);
        $this->assertEquals('karl', $result['name']);

        // Clean up after the test
        unset($_SERVER['REMOTE_ADDR']);
        unset($_SERVER['HTTP_USER_AGENT']);
    }
    
}