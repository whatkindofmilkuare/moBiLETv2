<?php

function generateKeyFromFilename($filename) {
    return hash('sha256', $filename, true);
}

function decryptFile($filePath, $key) {
    $ivLength = openssl_cipher_iv_length('AES-256-CBC');
    $encryptedPackage = file_get_contents($filePath);
    $encryptedPackage = base64_decode($encryptedPackage);

    $iv = substr($encryptedPackage, 0, $ivLength);
    $encryptedData = substr($encryptedPackage, $ivLength);

    $decryptedData = openssl_decrypt($encryptedData, 'AES-256-CBC', $key, 0, $iv);

    if ($decryptedData === false) {
        return null;
    }

    return $decryptedData;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['sessionID'])) {
    $sessionID = $_POST['sessionID'];
    $sessionDir = __DIR__ . '/../data/sessions/';
    $sessionFilePath = $sessionDir . $sessionID . '.json';

    if (file_exists($sessionFilePath)) {
        $key = generateKeyFromFilename($sessionID);
        $decryptedData = decryptFile($sessionFilePath, $key);

        if ($decryptedData) {
            header('Content-Type: application/json');
            echo $decryptedData; // Zwracamy odszyfrowane dane JSON
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Nie udało się odszyfrować danych.']);
        }
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Plik nie został znaleziony.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Nieprawidłowe żądanie.']);
}

?>
