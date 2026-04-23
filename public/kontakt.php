<?php
declare(strict_types=1);

header('Content-Type: text/html; charset=UTF-8');

$result = false;
$error = '';
$old = [
    'name' => '',
    'surname' => '',
    'phone' => '',
    'email' => '',
    'subject' => '',
    'message' => '',
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_POST['company'] ?? '')) {
        $error = 'Detektovana je neispravna prijava.';
    } else {
        $formTime = isset($_POST['form_time']) ? (int) $_POST['form_time'] : 0;
        $now = round(microtime(true) * 1000);
        $delta = $now - $formTime;

        if ($formTime <= 0 || $delta < 2000 || $delta > 3600000) {
            $error = 'Neispravan zahtev.';
        } else {
            $old['name'] = trim($_POST['name'] ?? '');
            $old['surname'] = trim($_POST['surname'] ?? '');
            $old['phone'] = trim($_POST['phone'] ?? '');
            $old['email'] = trim($_POST['email'] ?? '');
            $old['subject'] = trim($_POST['subject'] ?? '');
            $old['message'] = trim($_POST['message'] ?? '');

            if (
                $old['name'] === '' ||
                $old['surname'] === '' ||
                $old['phone'] === '' ||
                $old['email'] === '' ||
                $old['subject'] === '' ||
                $old['message'] === ''
            ) {
                $error = 'Sva polja su obavezna.';
            } elseif (mb_strlen($old['name']) < 2 || mb_strlen($old['name']) > 60) {
                $error = 'Ime mora imati između 2 i 60 karaktera.';
            } elseif (mb_strlen($old['surname']) < 2 || mb_strlen($old['surname']) > 60) {
                $error = 'Prezime mora imati između 2 i 60 karaktera.';
            } elseif (!preg_match('/^\+?[0-9][0-9\s()\/-]{5,19}$/', $old['phone'])) {
                $error = 'Telefon nije u ispravnom formatu.';
            } elseif (!filter_var($old['email'], FILTER_VALIDATE_EMAIL)) {
                $error = 'Email adresa nije ispravna.';
            } elseif (mb_strlen($old['subject']) < 3 || mb_strlen($old['subject']) > 120) {
                $error = 'Naslov poruke mora imati između 3 i 120 karaktera.';
            } elseif (mb_strlen($old['message']) < 10 || mb_strlen($old['message']) > 3000) {
                $error = 'Poruka mora imati između 10 i 3000 karaktera.';
            } else {
                $safeName = htmlspecialchars($old['name'], ENT_QUOTES, 'UTF-8');
                $safeSurname = htmlspecialchars($old['surname'], ENT_QUOTES, 'UTF-8');
                $safePhone = htmlspecialchars($old['phone'], ENT_QUOTES, 'UTF-8');
                $safeEmail = filter_var($old['email'], FILTER_SANITIZE_EMAIL);
                $safeSubject = htmlspecialchars($old['subject'], ENT_QUOTES, 'UTF-8');
                $safeMessage = htmlspecialchars($old['message'], ENT_QUOTES, 'UTF-8');

                $headerName = str_replace(["\r", "\n"], '', $safeName);
                $headerSurname = str_replace(["\r", "\n"], '', $safeSurname);
                $headerEmail = str_replace(["\r", "\n"], '', $safeEmail);

                $to = 'office@clovercode.rs';
                $mailSubject = 'Kontakt forma: ' . $safeSubject;

                $body  = "Ime: {$safeName}\r\n";
                $body .= "Prezime: {$safeSurname}\r\n";
                $body .= "Telefon: {$safePhone}\r\n";
                $body .= "Email: {$safeEmail}\r\n";
                $body .= "Naslov: {$safeSubject}\r\n\r\n";
                $body .= "Poruka:\r\n{$safeMessage}\r\n";

                $headers  = "From: {$headerName} {$headerSurname} <office@clovercode.rs>\r\n";
                $headers .= "Reply-To: {$headerName} {$headerSurname} <{$headerEmail}>\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
                $headers .= "Content-Transfer-Encoding: 8bit\r\n";

                if (mail($to, $mailSubject, $body, $headers)) {
                    $result = true;
                    $old = [
                        'name' => '',
                        'surname' => '',
                        'phone' => '',
                        'email' => '',
                        'subject' => '',
                        'message' => '',
                    ];
                } else {
                    $error = 'Došlo je do greške prilikom slanja poruke. Pokušajte ponovo.';
                }
            }
        }
    }
}

// NOVO: Ako je zahtev poslat preko JS (Fetch/AJAX), vrati samo JSON i prekini izvršavanje
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' || isset($_GET['ajax'])) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $result,
        'error' => $error
    ]);
    exit;
}

$templatePath = __DIR__ . '/kontakt.html';

if (!file_exists($templatePath)) {
    http_response_code(500);
    exit('kontakt.html nije pronađen.');
}

$html = file_get_contents($templatePath);

$state = [
    'success' => $result,
    'error' => $error,
    'old' => $old,
];

$stateScript = '<script>window.contactFormState = ' .
    json_encode($state, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) .
    ';</script>';

if (stripos($html, '</body>') !== false) {
    $html = str_ireplace('</body>', $stateScript . "\n</body>", $html);
} else {
    $html .= $stateScript;
}

echo $html;