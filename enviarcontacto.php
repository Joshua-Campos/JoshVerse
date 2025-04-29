<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars(trim($_POST["nombre"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensaje = htmlspecialchars(trim($_POST["mensaje"]));

    if (!empty($nombre) && !empty($email) && !empty($mensaje)) {
        $destinatario = "joshua.campos0823@gmail.com"; 
        $asunto = "Nuevo mensaje de contacto de $nombre";

        $contenido = "Nombre: $nombre\n";
        $contenido .= "Correo: $email\n\n";
        $contenido .= "Mensaje:\n$mensaje\n";

        $headers = "From: $nombre <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";

        if (mail($destinatario, $asunto, $contenido, $headers)) {
            echo "<h2>Gracias por tu mensaje. Te responderemos pronto.</h2>";
        } else {
            echo "<h2>Error al enviar el mensaje. Intenta nuevamente más tarde.</h2>";
        }
    } else {
        echo "<h2>Por favor completa todos los campos del formulario.</h2>";
    }
} else {
    echo "<h2>Acceso no autorizado.</h2>";
}
?>