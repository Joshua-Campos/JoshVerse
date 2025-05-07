<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Incluye los archivos necesarios de PHPMailer
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars(trim($_POST["nombre"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensaje = htmlspecialchars(trim($_POST["mensaje"]));

    if (!empty($nombre) && !empty($email) && !empty($mensaje)) {
        $mail = new PHPMailer(true);

        try {
            // Configura SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'joshua.campos0823@gmail.com'; // ✅ tu correo
            $mail->Password = 'zpvsudrqrknxtvcp'; // ✅ no tu contraseña normal
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            // Correo del remitente y destinatario
            $mail->setFrom($email, $nombre); // el que envía
            $mail->addAddress('joshua.campos0823@gmail.com'); // ✅ tu correo para recibir

            // Contenido del mensaje
            $mail->isHTML(false);
            $mail->Subject = "Nuevo mensaje de contacto de $nombre";
            $mail->Body = "Nombre: $nombre\nCorreo: $email\n\nMensaje:\n$mensaje";

            $mail->send();
            echo "<h2>Mensaje enviado correctamente. ¡Gracias!</h2>";
        } catch (Exception $e) {
            echo "<h2>Error al enviar el mensaje: {$mail->ErrorInfo}</h2>";
        }
    } else {
        echo "<h2>Por favor completa todos los campos.</h2>";
    }
} else {
    echo "<h2>Acceso no autorizado.</h2>";
}
?>
