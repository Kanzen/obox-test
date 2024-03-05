<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../utils/JsonFileHandler.php';

class JsonFileHandlerTest extends TestCase {
    public function testReadWriteJsonFileWithUserModels() {
        $fileName = 'test_data';
        $userModelsData = [
            ['name' => 'Karl', 'email' => 'kanzenj@gmail.com'],
            ['name' => 'KJ', 'email' => 'karl@alphadogdigital.co.za'],
        ];

        // Write user models data to a file
        JsonFileHandler::writeJsonFile($fileName, $userModelsData);

        // Read user models data from the file
        $readUserModelsData = JsonFileHandler::readJsonFile($fileName);

        // Assert that the user data is as expected
        $this->assertEquals($userModelsData, $readUserModelsData);
    }
}
