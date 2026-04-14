<?php

$result = null;
$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Honeypot zaštita
    if (!empty($_POST['company'])) {
        $error = 'Spam detection triggered.';
    } else {
        $name = trim($_POST['name'] ?? '');
        $surname = trim($_POST['surname'] ?? '');
        $phone = trim($_POST['phone'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $subject = trim($_POST['subject'] ?? '');
        $message = trim($_POST['message'] ?? '');

        // Osnovna validacija
        if (
            $name === '' ||
            $surname === '' ||
            $phone === '' ||
            $email === '' ||
            $subject === '' ||
            $message === ''
        ) {
            $error = 'Sva polja su obavezna.';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $error = 'Email adresa nije ispravna.';
        } else {
            // Sanitizacija
            $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
            $safeSurname = htmlspecialchars($surname, ENT_QUOTES, 'UTF-8');
            $safePhone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
            $safeEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
            $safeSubject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
            $safeMessage = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

            $to = 'info@katizma.rs';
            $mailSubject = 'Kontakt forma: ' . $safeSubject;

            $body = "Ime: {$safeName}\r\n";
            $body .= "Prezime: {$safeSurname}\r\n";
            $body .= "Telefon: {$safePhone}\r\n";
            $body .= "Email: {$safeEmail}\r\n";
            $body .= "Naslov: {$safeSubject}\r\n\r\n";
            $body .= "Poruka:\r\n{$safeMessage}\r\n";

            // Bitno: From neka bude domen sajta
            $headers = "From: Katizma Studio <info@katizma.rs>\r\n";
            $headers .= "Reply-To: {$safeName} {$safeSurname} <{$safeEmail}>\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
            $headers .= "Content-Transfer-Encoding: 8bit\r\n";

            if (mail($to, $mailSubject, $body, $headers)) {
                $result = true;
            } else {
                $error = 'Došlo je do greške prilikom slanja poruke.';
            }
        }
    }
}

include 'kontakt.html';