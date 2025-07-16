/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header-main');
    const nav = document.querySelector('.header-nav ul');
    
    // Crear botón hamburguesa
    const menuBtn = document.createElement('button');
    menuBtn.innerHTML = '☰ Menú';
    menuBtn.className = 'menu-hamburguesa';
    menuBtn.setAttribute('aria-label', 'Menú');
    
    // Función para mostrar/ocultar menú
    function toggleMenu() {
        if (window.innerWidth <= 768) {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        }
    }
    
    // Insertar botón en el header
    function setupMenu() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.menu-hamburguesa')) {
                // Insertar después del logo/título
                const headerContent = document.querySelector('.header-titulo-img');
                headerContent.parentNode.insertBefore(menuBtn, headerContent.nextSibling);
            }
            nav.style.display = 'none'; // Ocultar inicialmente en móvil
        } else {
            const btn = document.querySelector('.menu-hamburguesa');
            if (btn) btn.remove();
            nav.style.display = 'flex';
        }
    }
    
    // Eventos
    menuBtn.addEventListener('click', toggleMenu);
    window.addEventListener('resize', setupMenu);
    
    // Inicializar
    setupMenu();
});

