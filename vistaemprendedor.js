/* ============================================================
   vistaEmprendedor.js — YO Impulso · Panel del Emprendedor
   ============================================================ */

// Títulos y subtítulos por vista interna
const viewTitles = {
  dashboard:   ['Dashboard de Visibilidad',    'Mayo 2026 · 2 emprendimientos activos'],
  productos:   ['Mis Emprendimientos',          'Gestión de productos y categorías'],
  perfil:      ['Mi Perfil',                    'María Flores · @mariaf'],
  tutoriales:  ['Capacitación',                 'Formación para emprendedoras · 3 módulos disponibles'],
};

/**
 * Cambia la vista interna del panel (dashboard / productos / perfil)
 * @param {string} name - nombre de la vista
 * @param {HTMLElement|null} navEl - elemento .nav-item que se activó
 */
function showView(name, navEl) {
  // Ocultar todas las vistas
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  // Mostrar la vista solicitada
  const target = document.getElementById('view-' + name);
  if (target) target.classList.add('active');

  // Actualizar nav activo
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (navEl) navEl.classList.add('active');

  // Actualizar topbar
  const [title, sub] = viewTitles[name] || ['', ''];
  document.getElementById('page-title').textContent = title;
  document.getElementById('page-sub').textContent   = sub;
}

/**
 * Filtra por categoría en la vista de productos
 */
function filterCat(el) {
  document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

/**
 * Cambia el emprendimiento activo en la vista de productos
 */
function switchEmp(el) {
  document.querySelectorAll('.emp-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

/**
 * Abre el panel de detalle de un módulo de tutoriales
 * @param {'videos'|'storytelling'|'greenwashing'} moduleId
 */
function openModule(moduleId) {
  const panel = document.getElementById('tut-detail-panel');
  // Ocultar todos los detalles
  document.querySelectorAll('.tut-detail').forEach(d => d.classList.add('hidden'));
  // Mostrar el solicitado
  const target = document.getElementById('detail-' + moduleId);
  if (target) target.classList.remove('hidden');
  // Mostrar el panel
  panel.style.display = 'block';
  // Scroll suave al panel
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Cierra el panel de detalle y vuelve a los módulos
 */
function closeModule() {
  const panel = document.getElementById('tut-detail-panel');
  panel.style.display = 'none';
  document.querySelectorAll('.tut-detail').forEach(d => d.classList.add('hidden'));
  // Scroll suave a los módulos
  document.querySelector('.tut-modules-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


document.addEventListener('DOMContentLoaded', () => {

  // Period tabs del gráfico de barras
  document.querySelectorAll('.period-tab').forEach(btn => {
    btn.addEventListener('click', function () {
      this.closest('.period-tabs')
        .querySelectorAll('.period-tab')
        .forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // La vista inicial es dashboard (ya marcada en HTML con .active)
  // No hace falta hacer nada extra aquí.
});