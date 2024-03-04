<?php 

require_once __DIR__ . '/../utils/JsonFileHandler.php';
require_once __DIR__ . '/../utils/Validation.php';

class User 
{
    use ValidationTrait;

    private $name;
    private $email;
    private $entrance_time;
    private $last_update_time;
    private $user_ip;
    private $user_agent;
    private $visits_count;
    private $status;

    public function __construct($userData) 
    {
        $this->name = htmlspecialchars($userData['name']) ?? null;
        $this->email = $userData['email'] ?? null;
        $this->entrance_time = $userData['entrance_time'] ?? date('c'); // UTC format
        $this->last_update_time = $userData['last_update_time'] ?? date('c');
        $this->user_ip = $userData['user_ip'] ?? $_SERVER['REMOTE_ADDR'];
        $this->user_agent = $userData['user_agent'] ?? $_SERVER['HTTP_USER_AGENT'];
        $this->visits_count = $userData['visits_count'] ?? 1;
        $this->status = (isset($userData['status']) && in_array($userData['status'], ['online', 'offline'])) ? $userData['status'] : 'online';
    }

    public function validate() 
    {
        if (!$this->validateName($this->name) || !$this->validateEmail($this->email)) {
            return false;
        }
        return true;
    }

    public function upsert() 
    {
        $users = JsonFileHandler::readJsonFile('users');
        $userExists = false;
        $currentUser = null;

        foreach ($users as $index => $user) {
            if ($user['email'] === $this->email) {
                $userExists = true;
                $users[$index]['last_update_time'] = date('c');
                $users[$index]['status'] =  'online';
                $users[$index]['entrance_time'] = date('c');
                $currentUser = $users[$index];
                break;
            }
        }

        if (!$userExists) {
            $currentUser = $this->toArray();
            echo "<pre>";print_r($currentUser);die();
            $users[] = $currentUser;
        }
    
        JsonFileHandler::writeJsonFile('users', $users);
        return $currentUser;
    }

    public function setFromArray($userData) 
    {
        foreach ($userData as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function toArray() 
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'entrance_time' => $this->entrance_time,
            'last_update_time' => $this->last_update_time,
            'user_ip' => $this->user_ip,
            'user_agent' => $this->user_agent,
            'visits_count' => $this->visits_count,
            'status' => $this->status,
        ];
    }

    public static function getByEmail($email) 
    {
        $users = JsonFileHandler::readJsonFile('users');
        foreach ($users as $user) {
            if ($user['email'] === $email) {
                return new User($user);
            }
        }
        return null;
    }

    public static function getAll() 
    {
        $data = JsonFileHandler::readJsonFile('users');
        return $data ?? [];
    }
    
    public static function getOnlineUsers() 
    {
        $users = JsonFileHandler::readJsonFile('users');

        return array_filter($users, function($user) {
            return $user['status'] === 'online';
        });
    }
}
