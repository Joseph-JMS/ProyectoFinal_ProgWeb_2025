/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
class ProductoOferta {
    constructor(nombre, precioOriginal, precioActual, imagen, descuento) {
        this.nombre = nombre;
        this.precioOriginal = parseFloat(precioOriginal);
        this.precioActual = parseFloat(precioActual);
        this.imagen = imagen;
        this.descuento = descuento; // Ej: "15% DE DESCUENTO"
    }

    generarHTML() {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${this.imagen}" alt="${this.nombre}">
            <div>
                <h3>${this.nombre}</h3>
                <div class="precio-oferta">
                    <span class="precio-original">S/.${this.precioOriginal.toFixed(2)}</span>
                    <span class="precio-actual">S/.${this.precioActual.toFixed(2)}</span>
                </div>
                <span class="badge-oferta">${this.descuento}</span>
                <button>Comprar</button>
            </div>
        `;
        div.querySelector("button").addEventListener("click", () => agregarAlCarrito(this));
        return div;
    }
}

const enSubcarpeta = window.location.pathname.includes("/categoriasProducto");
const rutaImg = enSubcarpeta ? "../img/" : "img/";

const productosOferta = [
    new ProductoOferta("Cuna Colecho", 349.99, 299.99, rutaImg + "cunas/CunaBebe-1.jpg", "15% DE DESCUENTO"),
    new ProductoOferta("Coche de Paseo", 219.99, 189.99, rutaImg + "coches/CocheBebe-1.jpg", "10% DE DESCUENTO"),
    new ProductoOferta("Set Bloques Educativos", 49.99, 39.99, rutaImg + "juguetes/Juguetes-SetBloques1.jpg", "20% DE DESCUENTO")
];

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    // Guardamos solo la info relevante, y usamos el precio actual para el carrito
    const itemCarrito = {
        nombre: producto.nombre,
        precio: producto.precioActual,
        imagen: producto.imagen
    };
    carrito.push(itemCarrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito por S/.${producto.precioActual.toFixed(2)}`);
}

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.querySelector(".lista-productos");
    if (!contenedor) return;

    productosOferta.forEach(p => contenedor.appendChild(p.generarHTML()));
});

