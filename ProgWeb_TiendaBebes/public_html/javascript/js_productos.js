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
        const enSubcarpeta = window.location.pathname.includes("categoriasProducto");
        const prefijo = enSubcarpeta ? "../img/" : "img/";

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${prefijo + this.imagen}" alt="${this.nombre}">
            <h3>${this.nombre}</h3>
            <p class="precio">S/.${this.precio.toFixed(2)}</p>
            <button>Comprar</button>
        `;
        div.querySelector("button").addEventListener("click", () => agregarAlCarrito(this));
        return div;
    }
}

const productos = [
    new Producto("Cuna Colecho DreamBaby", 299.99, "cunas/CunaBebe-1.jpg", "cunas"),
    new Producto("Silla de Paseo UltraLigera", 189.99, "coches/CocheBebe-1.jpg", "coches"),
    new Producto("Set Bloques Educativos", 39.99, "juguetes/Juguetes-SetBloques1.jpg", "juguetes"),
    new Producto("Pack Bodys para Niño", 24.99, "ropas/RopaBebe-1.jpg", "ropas"),
    new Producto("Bañera para Bebé", 49.99, "baños/BañoBebe-Bañera1.JPG", "baños"),
    new Producto("Pack Bodys para Niña", 12.99, "ropas/RopaBebe-2.jpg", "ropas"),
    new Producto("Pack Bodys Unisex", 49.99, "ropas/RopaBebe-3.JPG", "ropas"),
    new Producto("Cuna de bebe GrandBaby", 189.39, "cunas/CunaBebe-CieloToral2.jpg", "cunas"),
    new Producto("Asiento Seguro Safety", 24.99, "asientos/AsientoSeguridad-1.jpg", "asientos"),
    new Producto("Asiento Seguro BabyKit", 400.99, "asientos/AsientoSeguridad-2.jpg", "asientos"),
    new Producto("Kit de Cuidado", 59.39, "baños/BañoBebe-KitCuidado2.jpg", "baños"),
    new Producto("Coche de Bebé Premium", 300.99, "coches/CocheBebe-2.jpg", "coches"),
    new Producto("Juguete Didactico", 400.99, "juguetes/Juguetes-SetBloques2.jpg", "juguetes")
];

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito`);
}

function bubbleSortNombre(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j].nombre.localeCompare(arr[j + 1].nombre) > 0) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}

function bubbleSortPrecio(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j].precio > arr[j + 1].precio) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-productos");
    const ordenSelect = document.getElementById("ordenar");
    const buscador = document.getElementById("buscador-productos");

    let productosAMostrar = [...productos];

    const url = window.location.pathname.toLowerCase();
    const categoriaMap = {
        "asientos": "asientos",
        "cunas": "cunas",
        "banios": "baños",
        "juguetes": "juguetes",
        "ropas": "ropas",
        "coches": "coches"
    };

    Object.keys(categoriaMap).forEach(clave => {
        if (url.includes(clave)) {
            productosAMostrar = productos.filter(p => p.categoria === categoriaMap[clave]);
        }
    });

    bubbleSortNombre(productosAMostrar);

    function mostrar(filtro = "") {
        contenedor.innerHTML = "";
        productosAMostrar
            .filter(p => p.nombre.toLowerCase().includes(filtro.toLowerCase()))
            .forEach(p => contenedor.appendChild(p.generarHTML()));
    }

    mostrar();

    if (ordenSelect) {
        ordenSelect.addEventListener("change", () => {
            if (ordenSelect.value === "nombre") {
                bubbleSortNombre(productosAMostrar);
            } else if (ordenSelect.value === "precio") {
                bubbleSortPrecio(productosAMostrar);
            }
            mostrar(buscador.value);
        });
    }

    if (buscador) {
        buscador.addEventListener("input", () => {
            mostrar(buscador.value);
        });
    }
});