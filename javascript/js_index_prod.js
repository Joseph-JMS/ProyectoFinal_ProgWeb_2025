/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
class Producto {
    constructor(nombre, precio, imagen, categoria) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.imagen = imagen;
        this.categoria = categoria;
    }

    generarHTML() {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${this.imagen}" alt="${this.nombre}">
            <h3>${this.nombre}</h3>
            <p class="precio">S/.${this.precio.toFixed(2)}</p>
            <button>Comprar</button>
        `;
        div.querySelector("button").addEventListener("click", () => agregarAlCarrito(this));
        return div;
    }
}

const enSubcarpeta = window.location.pathname.includes("/categoriasProducto");
const rutaImg = enSubcarpeta ? "../img/" : "img/";

const productosDestacados = [
    new Producto("Cuna Colecho DreamBaby", 299.99, rutaImg + "cunas/CunaBebe-1.jpg", "cunas"),
    new Producto("Silla de Paseo UltraLigera", 189.99, rutaImg + "coches/CocheBebe-1.jpg", "coches"),
    new Producto("Juguete Didactico", 400.99, rutaImg + "juguetes/Juguetes-SetBloques2.jpg", "juguetes")
];

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito`);
}

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    productosDestacados.forEach(p => contenedor.appendChild(p.generarHTML()));
});

/*Seccion index - Mensaje enviar correo*/
const btn = document.getElementById("btn-suscribirse");
const emailInput = document.getElementById("entrada-email");
const mensaje = document.getElementById("mensaje-boton");

// Estilo del mensaje en la parte superior central
mensaje.style.position = "fixed";
mensaje.style.top = "20px";
mensaje.style.left = "50%";
mensaje.style.transform = "translateX(-50%)";
mensaje.style.padding = "12px 20px";
mensaje.style.backgroundColor = "#d1ecf1";
mensaje.style.color = "#0c5460";
mensaje.style.border = "1px solid #bee5eb";
mensaje.style.borderRadius = "5px";
mensaje.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
mensaje.style.fontSize = "16px";
mensaje.style.zIndex = "9999";
mensaje.style.opacity = "0";
mensaje.style.transition = "opacity 0.5s ease-in-out";

btn.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (email === "") {
        alert("Por favor, ingresa tu correo electrónico.");
        return;
    }

    mensaje.textContent = "¡Correo enviado con éxito!";
    mensaje.style.opacity = "1";

    emailInput.value = "";

    setTimeout(() => {
        mensaje.style.opacity = "0";
    }, 3000);
});