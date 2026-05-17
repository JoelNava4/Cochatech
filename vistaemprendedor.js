/* ============================================================
   vistaEmprendedor.js — YO Impulso · Panel del Emprendedor
   ============================================================ */

// Títulos y subtítulos por vista interna
const viewTitles = {
  dashboard:   ['Dashboard de Visibilidad',    'Mayo 2026 · 2 emprendimientos activos'],
  productos:   ['Mis Emprendimientos',          'Gestión de productos y categorías'],
  perfil:      ['Mi Perfil',                    'María Flores · @mariaf'],
  tutoriales:  ['Capacitación',                 'Formación para emprendedoras · 3 módulos disponibles'],
  colaboracion: ['Red de Colaboración',            'Comparte recursos · Construye alianzas · Crece juntas'],
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
/**
 * Cambia sub-vista de Colaboración
 */
function switchColabTab(el, tabId) {
  document.querySelectorAll('.colab-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.colab-subview').forEach(v => v.classList.remove('active'));
  const target = document.getElementById('colab-' + tabId);
  if (target) target.classList.add('active');
}

/**
 * Filtra categoría en explorar colaboración
 */
function filterColabCat(el) {
  document.querySelectorAll('.colab-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
}

/**
 * Abre/cierra formulario nueva oferta
 */
function openNewOffer() {
  const form = document.getElementById('new-offer-form');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
  if (form.style.display === 'block') form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function closeNewOffer() {
  document.getElementById('new-offer-form').style.display = 'none';
}

/**
 * Modal de contacto colaboración
 */
const colabProfiles = {
  sofia:  { name: 'Sofía Herrera',  resource: 'Aceite de Coco Extra Virgen' },
  carla:  { name: 'Carla Mendoza',  resource: 'Etiquetadora Industrial' },
  rosa:   { name: 'Rosa Quispe',    resource: 'Frascos de Vidrio 100ml' },
  lucia:  { name: 'Lucía Vargas',   resource: 'Reparto compartido en moto' },
  andrea: { name: 'Andrea Torrico', resource: 'Mentoría en Costos y Precios' },
};

function openColabModal(id) {
  const profile = colabProfiles[id] || { name: id, resource: '' };
  const overlay = document.createElement('div');
  overlay.className = 'colab-modal-overlay';
  overlay.innerHTML = `
    <div class="colab-modal">
      <h3>Contactar a ${profile.name}</h3>
      <p>Recurso: <strong>${profile.resource}</strong><br>
      Escribe un mensaje presentándote y explicando cómo te gustaría colaborar.</p>
      <textarea placeholder="Hola ${profile.name.split(' ')[0]}, soy emprendedora de... Me interesa tu recurso porque..."></textarea>
      <div class="colab-modal-actions">
        <button class="btn-colab-pause" onclick="this.closest('.colab-modal-overlay').remove()">Cancelar</button>
        <button class="btn-colab-contact" onclick="sendColabMsg(this)">Enviar mensaje 🚀</button>
      </div>
    </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function sendColabMsg(btn) {
  const overlay = btn.closest('.colab-modal-overlay');
  const modal = overlay.querySelector('.colab-modal');
  modal.innerHTML = `
    <div style="text-align:center;padding:16px 0">
      <div style="font-size:48px;margin-bottom:12px">🎉</div>
      <h3 style="margin-bottom:8px">¡Mensaje enviado!</h3>
      <p style="color:var(--gray-500)">Te notificaremos cuando responda.<br>¡Buena suerte con tu colaboración!</p>
      <button class="btn-colab-contact" style="margin-top:20px" onclick="this.closest('.colab-modal-overlay').remove()">Cerrar</button>
    </div>`;
}