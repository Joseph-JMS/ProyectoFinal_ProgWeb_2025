/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

const form = document.getElementById("formContacto");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que se recargue la página

    // Crear mensaje de confirmación
    const mensaje = document.createElement("div");
    mensaje.textContent = "¡Formulario enviado correctamente!";
    
    mensaje.style.position = "fixed";
    mensaje.style.top = "20px";
    mensaje.style.left = "50%";
    mensaje.style.transform = "translateX(-50%)";
    mensaje.style.backgroundColor = "#d1ecf1";
    mensaje.style.color = "#0c5460";
    mensaje.style.border = "1px solid #bee5eb";
    mensaje.style.borderRadius = "5px";
    mensaje.style.padding = "12px 20px";
    mensaje.style.fontSize = "16px";
    mensaje.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
    mensaje.style.zIndex = "9999";
    mensaje.style.opacity = "1";
    mensaje.style.transition = "opacity 0.5s ease-in-out";

    document.body.appendChild(mensaje);

    // Ocultar después de 3 segundos
    setTimeout(() => {
        mensaje.style.opacity = "0";
        setTimeout(() => mensaje.remove(), 500); // Eliminar del DOM
    }, 3000);

    form.reset(); // Limpiar el formulario
});
