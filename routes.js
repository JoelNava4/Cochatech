/* ============================================================
   routes.js — YO Impulso · Sistema de navegación entre vistas
   ============================================================
   
   ESTRUCTURA DE RUTAS:
   ┌──────────────────────────────────────────────────────────┐
   │  /vistaEmprendedor.html  →  Panel del Emprendedor        │
   │  /index.html             →  Vista del Cliente (pública)  │
   └──────────────────────────────────────────────────────────┘

   USO: Incluir este archivo en cualquier página del proyecto.
   <script src="routes.js"></script>
   ============================================================ */

const Routes = (() => {

  // ─── Definición de rutas ──────────────────────────────────
  const ROUTES = {
    emprendedor: 'vistaEmprendedor.html',
    cliente:     'index.html',
  };

  // ─── Detectar la ruta actual ──────────────────────────────
  function currentPage() {
    const path = window.location.pathname;
    if (path.includes('vistaEmprendedor')) return 'emprendedor';
    return 'cliente';
  }

  // ─── Navegar a una vista ──────────────────────────────────
  function goTo(route) {
    const target = ROUTES[route];
    if (!target) {
      console.warn(`[Routes] Ruta desconocida: "${route}"`);
      return;
    }
    window.location.href = target;
  }

  // ─── Ir a vista Emprendedor ───────────────────────────────
  function goToEmprendedor() { goTo('emprendedor'); }

  // ─── Ir a vista Cliente ───────────────────────────────────
  function goToCliente() { goTo('cliente'); }

  // ─── Inicialización: la app arranca en vistaEmprendedor ───
  function init() {
    // Si estamos en la raíz o en index.html sin intención explícita
    // de estar ahí, redirigir a vistaEmprendedor.
    // Para no romper la vista cliente, sólo redireccionamos
    // si la URL es exactamente "/" o "/index.html" Y el usuario
    // no viene de la vista cliente (usando el flag en sessionStorage).
    const page = currentPage();
    const cameFromCliente = sessionStorage.getItem('yo_came_from_cliente');

    if (page === 'cliente' && !cameFromCliente) {
      // Primera visita → ir al panel del emprendedor
      window.location.replace(ROUTES.emprendedor);
      return;
    }

    // Limpiar el flag si ya lo procesamos
    sessionStorage.removeItem('yo_came_from_cliente');

    // Marcar que estamos saliendo hacia cliente al hacer clic en sus links
    _attachClienteLinks();
  }

  // ─── Marcar links de "Vista Cliente" para que no reboten ──
  function _attachClienteLinks() {
    document.querySelectorAll('[data-goto="cliente"], .go-to-cliente').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.setItem('yo_came_from_cliente', '1');
        window.location.href = ROUTES.cliente;
      });
    });
  }

  // Exponer API pública
  return { init, goTo, goToEmprendedor, goToCliente, currentPage, ROUTES };

})();

// Inicializar al cargar el DOM
document.addEventListener('DOMContentLoaded', Routes.init);