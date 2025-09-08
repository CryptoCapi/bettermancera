// Fallback app.js to satisfy <script src="app.js"> and define required globals
// This duplicates minimal functionality so inline onclick handlers stop erroring.

(function () {
  // Helper: escape for CSS selectors (fallback if CSS.escape not available)
  function _escapeSelector(id) {
    try {
      if (window.CSS && typeof window.CSS.escape === 'function') return window.CSS.escape(id);
    } catch (_) {}
    return String(id).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
  }

  if (typeof window.scrollToSection !== 'function') {
    window.scrollToSection = function (id, options = {}) {
      try {
        if (!id || typeof id !== 'string') return;
        const el = document.getElementById(id) || document.querySelector(`#${_escapeSelector(id)}`);
        if (el && typeof el.scrollIntoView === 'function') {
          el.scrollIntoView({ behavior: 'smooth', block: options.block || 'start' });
        } else if (id) {
          location.hash = `#${id}`;
        }
      } catch (e) {
        console.warn('scrollToSection error (app.js):', e);
      }
    };
  }

  if (typeof window.toggleChat !== 'function') {
    window.toggleChat = function () {
      try {
        // Prefer toggling the chat window panel and icon
        const chatWindow = document.getElementById('chatWindow');
        const chatIcon = document.getElementById('chatIcon');
        if (chatWindow) {
          const isHidden = chatWindow.classList.contains('hidden') || chatWindow.style.display === 'none';
          if (isHidden) {
            chatWindow.classList.remove('hidden');
            chatWindow.style.display = '';
            if (chatIcon) chatIcon.className = 'fas fa-times text-2xl';
          } else {
            chatWindow.classList.add('hidden');
            chatWindow.style.display = 'none';
            if (chatIcon) chatIcon.className = 'fas fa-robot text-2xl';
          }
          return;
        }

        // Fallback to container ids
        const candidates = ['chatWindow', 'chatBot', 'chatbot', 'chat', 'chat-container', 'chatWidget'];
        const el = candidates.map(id => document.getElementById(id)).find(Boolean);
        if (!el) {
          console.warn('toggleChat: no chat element found. Tried ids:', candidates);
          return;
        }
        const isHidden = el.classList.contains('hidden') || el.style.display === 'none';
        if (isHidden) {
          el.classList.remove('hidden');
          el.style.display = '';
          el.setAttribute('aria-hidden', 'false');
        } else {
          el.classList.add('hidden');
          el.style.display = 'none';
          el.setAttribute('aria-hidden', 'true');
        }
      } catch (e) {
        console.warn('toggleChat error (app.js):', e);
      }
    };
  }

  if (typeof window.showProducts !== 'function') {
    window.showProducts = function (categoryId) {
      try {
        if (!categoryId) return;
        const items = document.querySelectorAll('[data-category]');
        if (items.length) {
          items.forEach(el => {
            const match = el.getAttribute('data-category') === String(categoryId);
            el.classList.toggle('hidden', !match);
          });
          const first = Array.from(items).find(el => !el.classList.contains('hidden'));
          if (first) first.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        const target = document.getElementById(categoryId) || document.querySelector(`#${_escapeSelector(categoryId)}`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          target.classList.add('ring-2', 'ring-blue-400');
          setTimeout(() => target.classList.remove('ring-2', 'ring-blue-400'), 1800);
        } else {
          console.warn('showProducts: no matching element for id/data-category =', categoryId);
        }
      } catch (e) {
        console.warn('showProducts error (app.js):', e);
      }
    };
  }

  if (typeof window.downloadCatalog !== 'function') {
    window.downloadCatalog = function () {
      try {
        const url = 'catalogos/catalogosept2508.pdf';
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.setAttribute('download', '');
        document.body.appendChild(a);
        a.click();
        a.remove();
      } catch (e) {
        console.warn('downloadCatalog error (app.js):', e);
      }
    };
  }

  // Optional smooth anchors hookup
  document.addEventListener('DOMContentLoaded', () => {
    try {
      document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', evt => {
          const id = a.getAttribute('href').slice(1);
          if (id) {
            evt.preventDefault();
            window.scrollToSection(id);
          }
        });
      });

      // Add missing hero button: Catálogo de Oportunidades
      try {
        const catBtn = document.querySelector("button[onclick*=\"scrollToSection('catalogo')\"]");
        if (catBtn && !document.getElementById('btnHeroOpp')) {
          const btn = document.createElement('button');
          btn.id = 'btnHeroOpp';
          btn.type = 'button';
          btn.className = 'bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition-colors shadow-lg';
          btn.innerHTML = '<i class="fas fa-medal mr-2"></i>Catálogo de Oportunidades';
          btn.addEventListener('click', () => window.scrollToSection && window.scrollToSection('oportunidades'));
          catBtn.insertAdjacentElement('afterend', btn);
        }
      } catch(_) {}
    } catch (e) {}
  });

  // ---------------- Chatbot IA fallbacks ----------------
  // Provide minimal implementations only if missing, so inline onclick works.

  if (typeof window.addMessage !== 'function') {
    window.addMessage = function addMessage(message, isUser = false) {
      try {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        const wrap = document.createElement('div');
        if (isUser) {
          wrap.innerHTML = `
            <div class="flex items-start space-x-2 justify-end">
              <div class="bg-gradient-to-r from-betterware-blue to-betterware-mint text-white rounded-lg p-3 shadow-sm max-w-xs">
                <p class="text-sm">${message}</p>
              </div>
              <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-user text-gray-600 text-xs"></i>
              </div>
            </div>`;
        } else {
          wrap.innerHTML = `
            <div class="flex items-start space-x-2">
              <div class="w-8 h-8 bg-gradient-to-r from-betterware-blue to-betterware-mint rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-robot text-white text-xs"></i>
              </div>
              <div class="bg-white rounded-lg p-3 shadow-sm max-w-xs">
                <p class="text-sm text-gray-800">${message}</p>
              </div>
            </div>`;
        }
        chatMessages.appendChild(wrap);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      } catch (e) { console.warn('addMessage fallback error:', e); }
    };
  }

  if (typeof window.getBotResponse !== 'function') {
    window.getBotResponse = function getBotResponse(userMessage) {
      const m = (userMessage || '').toLowerCase();
      if (!m) return '¿Podrías repetirlo? Te ayudo con catálogo, productos o precios.';
      if (m.includes('catalogo') || m.includes('catálogo')) {
        return '📖 Nuestro catálogo de Diciembre 2024 está listo. ¿Deseas que te lo envíe por WhatsApp?';
      }
      if (m.includes('precio') || m.includes('costo')) {
        return '💰 Tenemos opciones para todos los presupuestos. ¿Qué categoría te interesa (organización, cocina, limpieza)?';
      }
      if (m.includes('organizacion') || m.includes('organización')) {
        return '📦 Organizadores, cajas y más para tu hogar. ¿Quieres ver productos de organización?';
      }
      if (m.includes('cocina')) {
        return '🍳 Herramientas de cocina prácticas y durables. ¿Te muestro productos de cocina?';
      }
      if (m.includes('limpieza')) {
        return '🧽 Soluciones de limpieza efectivas. ¿Te muestro productos de limpieza?';
      }
      if (m.includes('distribuidor') || m.includes('negocio')) {
        return '🤝 Ser distribuidor ofrece 40% de ganancia promedio. ¿Quieres que te contacte por WhatsApp?';
      }
      return '🤖 Puedo ayudarte con catálogo, productos, precios u oportunidad de distribuidor. ¿Qué te interesa?';
    };
  }

  if (typeof window.addActionButtons !== 'function') {
    window.addActionButtons = function addActionButtons(userMessage) {
      try {
        const m = (userMessage || '').toLowerCase();
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        let buttons = [];
        if (m.includes('catalogo') || m.includes('catálogo')) {
          buttons = [
            { text: '📱 Enviar por WhatsApp', action: 'whatsapp-catalog' },
            { text: '🏠 Ver productos', action: 'show-products' }
          ];
        } else if (m.includes('precio') || m.includes('costo')) {
          buttons = [
            { text: '📖 Ver catálogo completo', action: 'show-catalog' },
            { text: '💬 Consultar precios', action: 'whatsapp-prices' }
          ];
        } else if (m.includes('distribuidor') || m.includes('negocio')) {
          buttons = [
            { text: '📞 Llamada informativa', action: 'whatsapp-distributor' },
            { text: '📊 Ver beneficios', action: 'show-benefits' }
          ];
        } else if (m.includes('organizacion') || m.includes('organización') || m.includes('cocina') || m.includes('limpieza')) {
          const category = m.includes('organizacion') || m.includes('organización') ? 'organizacion' : m.includes('cocina') ? 'cocina' : 'limpieza';
          buttons = [
            { text: `🛍️ Ver productos de ${category}`, action: `show-${category}` },
            { text: '💬 Consultar disponibilidad', action: 'whatsapp-products' }
          ];
        } else if (m.includes('contacto') || m.includes('whatsapp')) {
          buttons = [
            { text: '📱 Abrir WhatsApp', action: 'open-whatsapp' },
            { text: '📋 Copiar teléfono', action: 'copy-phone' }
          ];
        }

        if (!buttons.length) return;
        const container = document.createElement('div');
        container.className = 'flex flex-wrap gap-2 justify-center my-3';
        buttons.forEach(b => {
          const btn = document.createElement('button');
          btn.className = 'bg-gradient-to-r from-betterware-blue to-betterware-mint text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity shadow-sm';
          btn.textContent = b.text;
          btn.onclick = () => window.handleActionButton && window.handleActionButton(b.action);
          container.appendChild(btn);
        });
        chatMessages.appendChild(container);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      } catch (e) { console.warn('addActionButtons fallback error:', e); }
    };
  }

  // ---------------- Oportunidades (Programas/Premios) ----------------
  if (typeof window.loadOportunidades !== 'function') {
    window.loadOportunidades = async function loadOportunidades() {
      try {
        if (window.__oppData) return window.__oppData;
        const resp = await fetch('data/oportunidades.json', { cache: 'no-store' });
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        const json = await resp.json();
        window.__oppData = json && (json.betterware_op_2_2025 || json);
        return window.__oppData;
      } catch (e) {
        console.warn('loadOportunidades error:', e);
        return null;
      }
    }
  }

  if (typeof window.renderOportunidades !== 'function') {
    window.renderOportunidades = async function renderOportunidades(tab = 'programas') {
      try {
        const data = await window.loadOportunidades();
        const wrap = document.getElementById('oportunidadesContent');
        if (!wrap || !data) return;

        // Toggle buttons state
        try {
          const btnProg = document.getElementById('btnProg');
          const btnPrem = document.getElementById('btnPrem');
          if (btnProg && btnPrem) {
            if (tab === 'programas') {
              btnProg.classList.add('bg-yellow-500','text-black');
              btnProg.classList.remove('bg-white/10','text-white');
              btnPrem.classList.add('bg-white/10','text-white');
              btnPrem.classList.remove('bg-yellow-500','text-black');
            } else {
              btnPrem.classList.add('bg-yellow-500','text-black');
              btnPrem.classList.remove('bg-white/10','text-white');
              btnProg.classList.add('bg-white/10','text-white');
              btnProg.classList.remove('bg-yellow-500','text-black');
            }
          }
        } catch(_) {}

        wrap.innerHTML = '';
        const items = (tab === 'premios' ? (data.premios || []) : (data.programas || []));
        if (!items.length) {
          wrap.innerHTML = '<div class="text-center text-white/80 col-span-2">Sin información cargada. Compártenos el PDF para completar.</div>';
          return;
        }

        if (tab === 'programas') {
          items.forEach(p => {
            const liMetas = [];
            if (p.metas && p.metas.ventas) liMetas.push(`<li>Ventas: ${p.metas.ventas}</li>`);
            if (p.metas && p.metas.patrocinios) liMetas.push(`<li>Patrocinios: ${p.metas.patrocinios}</li>`);
            if (p.metas && p.metas.otros) liMetas.push(`<li>Otros: ${p.metas.otros}</li>`);
            const pasos = Array.isArray(p.pasos) ? p.pasos.map(s=>`<li>${s}</li>`).join('') : '';
            const conds = Array.isArray(p.condiciones) ? p.condiciones.map(s=>`<li>${s}</li>`).join('') : '';
            const card = document.createElement('div');
            card.className = 'bg-white/10 border border-yellow-500/30 text-white rounded-2xl p-6 shadow-lg';
            card.innerHTML = `
              <h3 class="text-xl font-bold mb-2 text-yellow-300">${p.nombre || 'Programa'}</h3>
              <p class="mb-3 opacity-90">${p.objetivo || ''}</p>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 class="font-semibold text-yellow-200 mb-1">Pasos</h4>
                  <ul class="list-disc pl-5 text-white/90">${pasos}</ul>
                </div>
                <div>
                  <h4 class="font-semibold text-yellow-2 00 mb-1">Metas</h4>
                  <ul class="list-disc pl-5 text-white/90">${liMetas.join('')}</ul>
                </div>
              </div>
              <div class="mt-3">
                <h4 class="font-semibold text-yellow-200 mb-1">Beneficios</h4>
                <p class="opacity-90">${p.beneficios ? `${p.beneficios.tipo || ''} ${p.beneficios.monto || ''}` : ''}</p>
              </div>
              ${conds ? `<div class="mt-3"><h4 class='font-semibold text-yellow-200 mb-1'>Condiciones</h4><ul class='list-disc pl-5 text-white/90'>${conds}</ul></div>` : ''}
              ${p.ejemplo_calculo ? `<div class="mt-3"><h4 class='font-semibold text-yellow-200 mb-1'>Ejemplo</h4><p class='opacity-90'>${p.ejemplo_calculo}</p></div>` : ''}
            `;
            wrap.appendChild(card);
          });
        } else {
          items.forEach(pr => {
            const card = document.createElement('div');
            card.className = 'bg-white/10 border border-yellow-500/30 text-white rounded-2xl p-6 shadow-lg';
            card.innerHTML = `
              <h3 class="text-xl font-bold mb-2 text-yellow-300">${pr.premio || 'Premio'}</h3>
              <ul class="list-disc pl-5 text-white/90 space-y-1">
                ${pr.requisito ? `<li><span class='font-semibold text-yellow-200'>Requisito:</span> ${pr.requisito}</li>` : ''}
                ${pr.entrega ? `<li><span class='font-semibold text-yellow-200'>Entrega:</span> ${pr.entrega}</li>` : ''}
                ${pr.restricciones ? `<li><span class='font-semibold text-yellow-200'>Restricciones:</span> ${pr.restricciones}</li>` : ''}
              </ul>`;
            wrap.appendChild(card);
          });
        }
      } catch (e) {
        console.warn('renderOportunidades error:', e);
      }
    }
  }

  if (typeof window.handleActionButton !== 'function') {
    window.handleActionButton = function handleActionButton(action) {
      switch (action) {
        case 'whatsapp-catalog':
          window.open('https://wa.me/524772233286?text=Hola! Me interesa recibir el catálogo actualizado de BetterMancera', '_blank');
          window.addMessage && window.addMessage('¡Listo! Te conecté con WhatsApp para recibir el catálogo. 📱');
          break;
        case 'show-products':
          window.addMessage && window.addMessage('Puedes ver productos en las secciones de Organización, Cocina y Limpieza. 🛍️');
          break;
        case 'show-catalog':
          window.addMessage && window.addMessage('Descarga el catálogo desde la sección principal o solicita por WhatsApp. 📖');
          break;
        case 'whatsapp-prices':
          window.open('https://wa.me/524772233286?text=Hola! Me gustaría conocer los precios actuales de los productos BetterMancera', '_blank');
          window.addMessage && window.addMessage('¡Listo! Te darán precios y ofertas. 💰');
          break;
        case 'whatsapp-distributor':
          window.open('https://wa.me/524772233286?text=Hola! Me interesa conocer más sobre la oportunidad de ser distribuidor BetterMancera', '_blank');
          window.addMessage && window.addMessage('¡Genial! Te explicarán todo sobre la oportunidad de negocio. 🤝');
          break;
        case 'show-benefits':
          window.addMessage && window.addMessage('🌟 Beneficios: 40% ganancia, horarios flexibles, capacitación, apoyo y crecimiento.');
          break;
        case 'show-organizacion':
          window.showProducts && window.showProducts('organizacion');
          window.addMessage && window.addMessage('Abrí productos de organización. 📦');
          break;
        case 'show-cocina':
          window.showProducts && window.showProducts('cocina');
          window.addMessage && window.addMessage('Mira estos productos de cocina. 🍳');
          break;
        case 'show-limpieza':
          window.showProducts && window.showProducts('limpieza');
          window.addMessage && window.addMessage('Aquí tienes productos de limpieza. 🧽');
          break;
        case 'whatsapp-products':
          window.open('https://wa.me/524772233286?text=Hola! Me gustaría consultar sobre la disponibilidad de productos BetterMancera', '_blank');
          window.addMessage && window.addMessage('¡Perfecto! Te darán disponibilidad y entregas. 📦');
          break;
        case 'open-whatsapp':
          window.open('https://wa.me/524772233286', '_blank');
          window.addMessage && window.addMessage('Te conecté con WhatsApp. 📱');
          break;
        case 'copy-phone':
          navigator.clipboard && navigator.clipboard.writeText('477-223-3286').then(() => {
            window.addMessage && window.addMessage('📋 Teléfono copiado: 477-223-3286');
          }).catch(() => {
            window.addMessage && window.addMessage('📞 Teléfono: 477-223-3286');
          });
          break;
        default:
          window.addMessage && window.addMessage('¡Gracias por tu interés! ¿En qué más puedo ayudarte? 😊');
      }
    };
  }

  if (typeof window.sendMessage !== 'function') {
    window.sendMessage = function sendMessage() {
      try {
        const input = document.getElementById('chatInput');
        if (!input) return;
        const message = (input.value || '').trim();
        if (!message) return;
        window.addMessage && window.addMessage(message, true);
        input.value = '';
        setTimeout(() => {
          const resp = (window.getBotResponse && window.getBotResponse(message)) || 'Gracias por tu mensaje.';
          window.addMessage && window.addMessage(resp);
          setTimeout(() => window.addActionButtons && window.addActionButtons(message.toLowerCase()), 800);
        }, 600);
      } catch (e) { console.warn('sendMessage fallback error:', e); }
    };
  }

  if (typeof window.sendQuickMessage !== 'function') {
    window.sendQuickMessage = function sendQuickMessage(type) {
      const messages = {
        catalogo: 'Quiero ver el catálogo actualizado',
        productos: '¿Qué productos tienen disponibles?',
        precios: '¿Cuáles son los precios?',
        distribuidor: 'Me interesa ser distribuidor'
      };
      const input = document.getElementById('chatInput');
      if (!input) return;
      input.value = messages[type] || 'Hola';
      window.sendMessage && window.sendMessage();
    };
  }

  if (typeof window.handleEnter !== 'function') {
    window.handleEnter = function handleEnter(event) {
      if (event && (event.key === 'Enter' || event.keyCode === 13)) {
        event.preventDefault && event.preventDefault();
        window.sendMessage && window.sendMessage();
      }
    };
  }
})();

// ---- Contact Form (Formspree) AJAX submit to avoid redirect ----
(function(){
  function onReady(fn){ if(document.readyState!="loading") fn(); else document.addEventListener("DOMContentLoaded", fn); }
  onReady(() => {
    try {
      const form = document.getElementById("contactForm") || document.querySelector("form[action*=\"formspree.io\"]");
      if (!form) return;
      const alertBox = document.getElementById("formAlert");
      const submitBtn = document.getElementById("contactSubmit") || form.querySelector("button[type=\"submit\"]");

      function showAlert(msg, type) {
        if (!alertBox) { try { alert(msg); } catch(_) {} return; }
        alertBox.textContent = msg || (type === 'success' ? 'Mensaje enviado correctamente.' : 'Hubo un problema al enviar.');
        alertBox.classList.remove('hidden');
        alertBox.style.display = 'block';
        alertBox.style.borderRadius = '8px';
        alertBox.style.border = '1px solid';
        alertBox.style.padding = '12px';
        alertBox.style.marginBottom = '12px';
        if (type === "success") {
          alertBox.style.background = '#ECFDF5';
          alertBox.style.color = '#065F46';
          alertBox.style.borderColor = '#A7F3D0';
        } else {
          alertBox.style.background = '#FEF2F2';
          alertBox.style.color = '#991B1B';
          alertBox.style.borderColor = '#FECACA';
        }
        try {
          const t = document.createElement("div");
          t.textContent = msg;
          t.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:9999;padding:10px 14px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.08);font:14px system-ui,-apple-system,Segoe UI,Roboto,Arial';
          if (type==='success'){ t.style.background='#10B981'; t.style.color='#fff'; } else { t.style.background='#EF4444'; t.style.color='#fff'; }
          document.body.appendChild(t);
          setTimeout(()=>{ t.style.transition='opacity .3s'; t.style.opacity='0'; setTimeout(()=>t.remove(),350); }, 3000);
        } catch(_) {}
      }

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        try { if (submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = "0.7"; } } catch(_) {}
        try {
          const formData = new FormData(form);
          const resp = await fetch(form.action, { method: "POST", body: formData, headers: { "Accept": "application/json" } });
          if (resp.ok) {
            showAlert('Enviado correctamente.', 'success');
            try { form.reset(); } catch(_) {}
          } else {
            let data = {};
            try { data = await resp.json(); } catch(_) {}
            const err = data && data.errors ? data.errors.map(x => x.message).join(', ') : 'Error al enviar.';
            showAlert(err, 'error');
          }
        } catch (err) {
          showAlert('No se pudo enviar. Intenta más tarde.', 'error');
        } finally {
          try { if (submitBtn) { submitBtn.disabled = false; submitBtn.style.opacity = ""; } } catch(_) {}
          try { if (alertBox) setTimeout(() => alertBox.classList.add("hidden"), 6000); } catch(_) {}
        }
      });
    } catch (e) { console.warn("contact form handler error:", e); }
  });
})();
// --- Fix mojibake accents on the fly (best-effort) ---
(function fixAccents() {
  try {
    const map = new Map([
      ['Ã¡','á'],['Ã©','é'],['Ã­','í'],['Ã³','ó'],['Ãº','ú'],['Ã±','ñ'],
      ['ÃÁ','Á'],['Ã‰','É'],['ÃÍ','Í'],['Ã“','Ó'],['Ãš','Ú'],['Ã‘','Ñ'],
      ['Â¡','¡'],['Â¿','¿'],['Ã¼','ü'],['Ãœ','Ü'],
      ['ǭ','á'],['ǧ','ú'],['Ǹ','é'],
      ['ci��n','ción'],['ci�n','ción'],['G��mez','Gómez'],['G�mez','Gómez'],
      ['ba��o','baño'],['pa��os','paños'],['tama��os','tamaños'],
      ['dif��ciles','difíciles'],['Ergon��micos','Ergonómicos'],['Distribuci��n','Distribución'],
      ['econ��mico','económico'],['MagnǸtico','Magnético'],['simultǭneamente','simultáneamente'],
      ['Mǧltiples','Múltiples'],['Sǧper','Súper'],['Fǭcil','Fácil'],['hermǸticos','herméticos'],
      ['magnǸtica','magnética'],['Bǧscanos','Búscanos'],['Env��anos','Envíanos'],['TelǸfono','Teléfono'],
      ['quǸ','qué'],
    ]);
    const re = new RegExp(Array.from(map.keys()).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
    function fix(s){ return s.replace(re, m=> map.get(m) || m); }
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => { const t = n.nodeValue; const nt = fix(t); if (t!==nt) n.nodeValue = nt; });
  } catch(e) { /* non-fatal */ }
})();

  // Auto-render oportunidades when section exists
  onReady(() => {
    try {
      if (document.getElementById('oportunidadesContent')) {
        window.renderOportunidades && window.renderOportunidades('programas');
      }
    } catch (e) {}
  });

// Enhanced Oportunidades renderer (tabs, accordions, filters, microcopy)
(function(){
  async function ensureData(){ try { return await (window.loadOportunidades && window.loadOportunidades()); } catch(_) { return null; } }
  function ddmmyyyy(d){ const dd=String(d.getDate()).padStart(2,'0'); const mm=String(d.getMonth()+1).padStart(2,'0'); const yy=d.getFullYear(); return `${dd}/${mm}/${yy}`; }

  window.renderOportunidades = async function renderOportunidades(tab='programas'){
    const data = await ensureData(); if (!data) return;

    // Microcopy: vigencia + ultima actualizacion
    try {
      const sec = document.getElementById('oportunidades');
      if (sec) {
        let p = sec.querySelector('#oportunidadesVigencia');
        if (!p) {
          const hdr = sec.querySelector('.text-center.text-white.mb-8') || sec;
          p = document.createElement('p');
          p.id = 'oportunidadesVigencia';
          p.className = 'text-sm md:text-base text-yellow-300/90';
          hdr.appendChild(p);
        }
        p.innerHTML = `Vigente: Operacion 2-2025 - Ultima actualizacion: <span id="oppUpdated">${ddmmyyyy(new Date())}</span>`;
      }
    } catch(_){}

    // Download button meta
    (async ()=>{
      try{
        const a = document.querySelector('#oppDownloadBtn') || document.querySelector('#oportunidades a[download]');
        if (a) {
          a.setAttribute('href', 'catalogos/Cat._Oportunidades_2-2025IG.pdf');
        }
        let meta = document.getElementById('oportunidadesDownloadMeta');
        if (!meta && a) { meta = document.createElement('span'); meta.id='oportunidadesDownloadMeta'; meta.className='ml-1 text-black/80'; a.appendChild(document.createTextNode(' ')); a.appendChild(meta); }
        let size=null; if(a){ const r=await fetch(a.getAttribute('href'),{method:'HEAD',cache:'no-store'}); if(r.ok) size=r.headers.get('content-length'); }
        if(!size){ const r2=await fetch('catalogos/catalogosept2508.pdf',{method:'HEAD',cache:'no-store'}); if(r2.ok) size=r2.headers.get('content-length'); }
        if(meta){ meta.textContent = size ? `(PDF, ${(Number(size)/(1024*1024)).toFixed(1)} MB)` : '(PDF)'; }
      }catch(_){/* ignore */}
    })();

    // Tabs + panels
    const btnProg=document.getElementById('btnProg');
    const btnPrem=document.getElementById('btnPrem');
    const wrapOld=document.getElementById('oportunidadesContent');
    if(!(btnProg&&btnPrem&&wrapOld)) return;
    const tabsWrap=btnProg.parentElement; if(tabsWrap.getAttribute('role')!=='tablist'){ tabsWrap.setAttribute('role','tablist'); btnProg.setAttribute('role','tab'); btnPrem.setAttribute('role','tab'); }
    const main=tabsWrap.parentElement;
    let filters=document.getElementById('oportunidadesFilters');
    if(!filters){ filters=document.createElement('div'); filters.id='oportunidadesFilters'; filters.className='mb-4 hidden'; filters.setAttribute('aria-hidden','true'); filters.innerHTML=`<div class="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between"><div class="flex gap-2 items-center"><label for="premioCategoria" class="text-white/90 text-sm">Categoria</label><select id="premioCategoria" class="bg-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"><option value="">Todas</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="F">F</option></select></div><div class="flex-1"><label for="premioSearch" class="sr-only">Buscar premio</label><input id="premioSearch" type="search" placeholder="Buscar premio..." class="w-full bg-white/10 text-white placeholder-white/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300" /></div></div>`; main.appendChild(filters); }
    let panelProg=document.getElementById('panelProgramas'); let panelPrem=document.getElementById('panelPremios');
    if(!panelProg){ panelProg=document.createElement('div'); panelProg.id='panelProgramas'; panelProg.setAttribute('role','tabpanel'); panelProg.setAttribute('aria-labelledby','btnProg'); wrapOld.classList.remove('md:grid-cols-2'); wrapOld.classList.add('grid','gap-4'); panelProg.appendChild(wrapOld); main.appendChild(panelProg); }
    if(!panelPrem){ panelPrem=document.createElement('div'); panelPrem.id='panelPremios'; panelPrem.setAttribute('role','tabpanel'); panelPrem.setAttribute('aria-labelledby','btnPrem'); panelPrem.classList.add('hidden'); const wrapPrem=document.createElement('div'); wrapPrem.id='oportunidadesContentPremios'; wrapPrem.className='grid md:grid-cols-2 gap-6'; panelPrem.appendChild(wrapPrem); main.appendChild(panelPrem); }
    let tyc=document.getElementById('oportunidadesTyC'); if(!tyc){ tyc=document.createElement('div'); tyc.id='oportunidadesTyC'; tyc.className='mt-10'; main.appendChild(tyc); }
    btnProg.setAttribute('aria-controls','panelProgramas'); btnPrem.setAttribute('aria-controls','panelPremios');

    function setActive(which){ const isProg=which==='programas'; btnProg.setAttribute('aria-selected',String(isProg)); btnPrem.setAttribute('aria-selected',String(!isProg)); btnProg.classList.toggle('bg-yellow-500',isProg); btnProg.classList.toggle('text-black',isProg); btnProg.classList.toggle('bg-white/10',!isProg); btnProg.classList.toggle('text-white',!isProg); btnPrem.classList.toggle('bg-yellow-500',!isProg); btnPrem.classList.toggle('text-black',!isProg); btnPrem.classList.toggle('bg-white/10',isProg); btnPrem.classList.toggle('text-white',isProg); panelProg.classList.toggle('hidden',!isProg); panelPrem.classList.toggle('hidden',isProg); filters.classList.toggle('hidden',isProg); filters.setAttribute('aria-hidden',String(isProg)); }
    // Toggle collapse on repeated click of the same tab
    if (window.__oppActiveTab === tab && window.__oppVisible) {
      btnProg.setAttribute('aria-selected','false');
      btnPrem.setAttribute('aria-selected','false');
      panelProg.classList.add('hidden');
      panelPrem.classList.add('hidden');
      filters.classList.add('hidden');
      filters.setAttribute('aria-hidden','true');
      window.__oppVisible = false;
      return;
    }
    window.__oppActiveTab = tab;
    window.__oppVisible = true;
    setActive(tab);

    if(tab==='programas'){
      const wrap=document.getElementById('oportunidadesContent'); wrap.innerHTML='';
      (data.programas||[]).forEach(p=>{
        const card=document.createElement('div'); card.className='bg-white/10 border border-yellow-500/30 text-white rounded-2xl shadow-lg overflow-hidden';
        const btn=document.createElement('button'); btn.type='button'; btn.className='w-full text-left px-5 py-4 flex items-start justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-yellow-300'; btn.setAttribute('aria-expanded','false');
        const chevron=document.createElement('span'); chevron.className='ml-auto fa-solid fa-chevron-down text-yellow-300 pt-1'; chevron.setAttribute('aria-hidden','true');
        const title=document.createElement('div'); title.innerHTML=`<h3 class=\"text-lg md:text-xl font-bold text-yellow-300\">${p.nombre||'Programa'}</h3><p class=\"text-white/80 text-sm\">${p.objetivo||''}</p><div class=\"mt-2 flex flex-wrap gap-2 text-xs\">${[p.categoria?`<span class='bg-white/10 px-2 py-1 rounded'>${p.categoria}</span>`:'',p.vigencia?`<span class='bg-white/10 px-2 py-1 rounded'>Vigencia: ${p.vigencia}</span>`:'',p.participantes?`<span class='bg-white/10 px-2 py-1 rounded'>Quien participa: ${p.participantes}</span>`:'',p.periodicidad?`<span class='bg-white/10 px-2 py-1 rounded'>Periodicidad: ${p.periodicidad}</span>`:''].filter(Boolean).join(' ')}</div>`;
        btn.appendChild(title); btn.appendChild(chevron);
        const panel=document.createElement('div'); panel.className='hidden px-5 pb-5';
        const metasList=[]; if(p.metas&&p.metas.ventas) metasList.push(`Ventas: ${p.metas.ventas}`); if(p.metas&&p.metas.patrocinios) metasList.push(`Patrocinios: ${p.metas.patrocinios}`); if(p.metas&&p.metas.otros) metasList.push(`Otros: ${p.metas.otros}`);
        const metas=metasList.length?`<ul class='list-disc pl-5'>${metasList.map(x=>`<li>${x}</li>`).join('')}</ul>`:'-'; const beneficios=p.beneficios?`${p.beneficios.tipo||''} ${p.beneficios.monto||''}`:'-'; const vig=p.vigencia||(data.vigencia||'Op. 2-2025'); const quien=p.participantes||'-';
        panel.innerHTML=`<div class=\"overflow-x-auto\"><table class=\"min-w-full text-sm\"><thead class=\"text-yellow-200\"><tr><th class=\"text-left pr-4 pb-2\">Meta</th><th class=\"text-left pr-4 pb-2\">Recompensa</th><th class=\"text-left pr-4 pb-2\">Vigencia</th><th class=\"text-left pr-4 pb-2\">Quien participa</th></tr></thead><tbody class=\"align-top text-white/90\"><tr><td class=\"pr-4 py-2\">${metas}</td><td class=\"pr-4 py-2\">${beneficios}</td><td class=\"pr-4 py-2\">${vig}</td><td class=\"pr-4 py-2\">${quien}</td></tr></tbody></table></div>${Array.isArray(p.condiciones)&&p.condiciones.length?`<div class='mt-3'><h4 class='font-semibold text-yellow-200 mb-1'>Condiciones</h4><ul class='list-disc pl-5 text-white/90'>${p.condiciones.map(s=>`<li>${s}</li>`).join('')}</ul></div>`:''}`;
        btn.addEventListener('click',()=>{ const exp=btn.getAttribute('aria-expanded')==='true'; btn.setAttribute('aria-expanded',String(!exp)); panel.classList.toggle('hidden'); chevron.classList.toggle('fa-rotate-180'); });
        card.appendChild(btn); card.appendChild(panel); wrap.appendChild(card);
      });
      if(Array.isArray(data.terminos_y_condiciones_generales)){ tyc.innerHTML=`<h3 class='text-xl font-bold text-yellow-300 mb-2'>Terminos y condiciones</h3><ul class='list-disc pl-5 text-white/80 space-y-1'>${data.terminos_y_condiciones_generales.map(s=>`<li>${s}</li>`).join('')}</ul>`; }
    } else {
      const listEl=document.getElementById('oportunidadesContentPremios'); if(!listEl) return; filters.classList.remove('hidden'); filters.setAttribute('aria-hidden','false');
      const items=data.premios||[];
      function renderList(fCat='',q=''){ listEl.innerHTML=''; const norm=s=>(s||'').toString().toLowerCase(); const filtered=items.filter(pr=>{ const okCat=!fCat||(pr.clasificacion||'').toUpperCase()===fCat.toUpperCase(); const txt=`${pr.premio} ${pr.requisito} ${pr.entrega} ${pr.restricciones}`; return okCat && (!q || norm(txt).includes(norm(q))); }); if(!filtered.length){ listEl.innerHTML='<div class="text-center text-white/80 col-span-2">Sin resultados</div>'; return; } filtered.forEach(pr=>{ const card=document.createElement('div'); card.className='bg-white/10 border border-yellow-500/30 text-white rounded-2xl p-6 shadow-lg'; card.innerHTML=`<h3 class=\"text-xl font-bold mb-2 text-yellow-300\">${pr.premio||'Premio'} ${pr.clasificacion?`<span class='text-xs bg-white/10 rounded px-2 py-1 align-middle ml-2'>${pr.clasificacion}</span>`:''}</h3><ul class=\"list-disc pl-5 text-white/90 space-y-1\">${pr.requisito?`<li><span class='font-semibold text-yellow-200'>Requisito:</span> ${pr.requisito}</li>`:''}${pr.entrega?`<li><span class='font-semibold text-yellow-200'>Entrega:</span> ${pr.entrega}</li>`:''}${pr.flete?`<li><span class='font-semibold text-yellow-200'>Flete:</span> ${pr.flete}</li>`:''}${pr.restricciones?`<li><span class='font-semibold text-yellow-200'>Restricciones:</span> ${pr.restricciones}</li>`:''}</ul>`; listEl.appendChild(card); }); }
      const sel=document.getElementById('premioCategoria'); const inp=document.getElementById('premioSearch'); if(sel && inp && !sel.__hooked){ sel.__hooked=true; const onChange=()=>renderList(sel.value,inp.value); sel.addEventListener('change',onChange); inp.addEventListener('input',onChange); }
      const sel2=document.getElementById('premioCategoria'); const inp2=document.getElementById('premioSearch'); renderList(sel2?sel2.value:'', inp2?inp2.value:'');
    }
  };
})();

