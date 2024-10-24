<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['sessionID'])) {
    $sessionID = $_POST['sessionID'];

    // Ścieżka do katalogu z sesjami
    $sessionDir = __DIR__ . '/../data/sessions/';
    $sessionFile = $sessionID . '.json'; // Plik sesji na podstawie sessionID
    $sessionFilePath = $sessionDir . $sessionFile;

    // Generowanie klucza na podstawie sessionID
    $key = hash('sha256', $sessionID, true);

    // Szyfrowanie pliku
    function encryptFile($filePath, $key) {
        $ivLength = openssl_cipher_iv_length('AES-256-CBC');
        $iv = openssl_random_pseudo_bytes($ivLength);

        $data = file_get_contents($filePath);
        $encryptedData = openssl_encrypt($data, 'AES-256-CBC', $key, 0, $iv);
        if ($encryptedData === false) {
            return false;
        }

        // Zapisanie zaszyfrowanych danych i IV
        $encryptedPackage = base64_encode($iv . $encryptedData);
        file_put_contents($filePath, $encryptedPackage);
        return true;
    }

    if (file_exists($sessionFilePath)) {
        if (encryptFile($sessionFilePath, $key)) {
            echo "Plik sesji $sessionID został zaszyfrowany.";
        } else {
            echo "Błąd podczas szyfrowania pliku.";
        }
    } else {
        echo "Plik sesji o ID $sessionID nie został znaleziony.";
    }
} else {
    echo "Błędne żądanie.";
}

?>
