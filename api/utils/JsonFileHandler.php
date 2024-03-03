<?php
class JsonFileHandler 
{
    private static $dataDirectory = '../data/';

    public static function readJsonFile($fileName) 
    {
        $filePath = self::$dataDirectory . $fileName . '.json';
        $json = file_get_contents($filePath);
        return json_decode($json, true);
    }

    public static function writeJsonFile($fileName, $data) 
    {
        $filePath = self::$dataDirectory . $fileName . '.json';
        $json = json_encode($data, JSON_PRETTY_PRINT);
        file_put_contents($filePath, $json, LOCK_EX);
    }
}
