/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorCarrito = document.getElementById("contenedor-carrito");
const btnVaciar = document.getElementById("vaciar-carrito");
const btnComprar = document.getElementById("btn-comprar");
const totalCompra = document.getElementById("total-compra");
const modalPago = document.getElementById("modal-pago");
const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");

function corregirRutaImagen(ruta) {
    if (ruta.startsWith("img/")) return ruta;
    return "img/" + ruta;
}

function renderizarCarrito() {
    contenedorCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        if (!producto.cantidad) producto.cantidad = 1;
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${corregirRutaImagen(producto.imagen)}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="precio">S/.${parseFloat(producto.precio).toFixed(2)}</p>
            <div class="cantidad-control">
                <button class="btn-disminuir" data-index="${index}">-</button>
                <span class="cantidad-texto">${producto.cantidad}</span>
                <button class="btn-aumentar" data-index="${index}">+</button>
            </div>
            <button class="btn-eliminar" data-index="${index}">Eliminar</button>
        `;
        contenedorCarrito.appendChild(div);

        total += producto.precio * producto.cantidad;
    });

    totalCompra.textContent = `Total: S/.${total.toFixed(2)}`;

    document.querySelectorAll(".btn-disminuir").forEach(btn =>
        btn.addEventListener("click", (e) => {
            const i = e.target.getAttribute("data-index");
            if (carrito[i].cantidad > 1) carrito[i].cantidad--;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderizarCarrito();
        })
    );

    document.querySelectorAll(".btn-aumentar").forEach(btn =>
        btn.addEventListener("click", (e) => {
            const i = e.target.getAttribute("data-index");
            carrito[i].cantidad++;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderizarCarrito();
        })
    );

    document.querySelectorAll(".btn-eliminar").forEach(btn =>
        btn.addEventListener("click", (e) => {
            const i = e.target.getAttribute("data-index");
            carrito.splice(i, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderizarCarrito();
        })
    );
}

btnVaciar.addEventListener("click", () => {
    if (confirm("¿Estás seguro de vaciar el carrito?")) {
        carrito = [];
        localStorage.removeItem("carrito");
        renderizarCarrito();
    }
});

btnComprar.addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    modalPago.style.display = "flex";
});

document.querySelectorAll(".opcion-pago").forEach(img =>
    img.addEventListener("click", () => {
        modalPago.style.display = "none";
        carrito = [];
        localStorage.removeItem("carrito");
        renderizarCarrito();
        mostrarMensajeCompra();
    })
);

function cerrarModalPago() {
    modalPago.style.display = "none";
}

function mostrarMensajeCompra() {
    mensajeConfirmacion.style.display = "block";
    setTimeout(() => {
        mensajeConfirmacion.style.display = "none";
    }, 3000);
}

renderizarCarrito();