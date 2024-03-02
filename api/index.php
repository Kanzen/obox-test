<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/models/UserModel.php';

class API 
{
    public function __construct() {}

    public function handleRequests() 
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $this->handleGetRequest();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->handlePostRequest();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $this->handlePutRequest();
        } else {
            $this->respondError('Unsupported request method');
        }
    }

    private function handleGetRequest() 
    {
        if(isset($_GET['email'])) {
            $user = User::getByEmail($_GET['email']);
            $this->sendResponse($user->toArray());
        }

        if (isset($_GET['status']) && $_GET['status'] === 'online') {
            $users = User::getOnlineUsers();
        } else {
            $users = User::getAll();
        }
        $this->sendResponse($users);
    }

    private function handlePostRequest() 
    {
        $postData = json_decode(file_get_contents('php://input'), true);

        if (isset($postData['name']) && isset($postData['email']) && count($postData) === 2) {
            $existingUser = User::getByEmail($postData['email']);

            if ($existingUser) {
                $user = $existingUser->upsert();
                $this->respondSuccess("Success: " . $user['name'] . " successfully logged in.", $user);
            } else {
                $user = new User($postData);
                if ($user->validate()) {
                    $user = $user->upsert();
                    $this->respondSuccess("Success: " . $user['name'] . " successfully logged in.", $user);
                } else {
                    $this->respondError('Invalid user data in POST request');
                }
            }
        } else {
            $this->respondError('Invalid data provided in POST request');
        }
    }

    private function handlePutRequest() 
    {
        $putData = json_decode(file_get_contents('php://input'), true);
        if (isset($putData['email']) && isset($putData['status']) && count($putData) === 2) {
            $existingUser = User::getByEmail($putData['email']);
            if ($existingUser) {
                $existingUser->setFromArray(['status' => $putData['status']]);
                $user = $existingUser->upsert();
                $this->respondSuccess("User updated.", $user);
            }
            $this->respondError('User does not exist');
        }
        $this->respondError('Invalid data provided in PUT request');
    }

    private function respondSuccess($message, $user_details = null) 
    {
        $response = ['status' => 'success', 'message' => $message, 'user_details' => $user_details];
        $this->sendResponse($response);
    }

    private function respondError($message) 
    {
        $response = ['status' => 'error', 'message' => $message];
        $this->sendResponse($response);
    }

    private function sendResponse($response) 
    {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($response);
        exit();
    }
}

$api = new API();
$api->handleRequests();
