/**
 * =============================================
 * BRASA VIVA — Script Principal
 * script.js | Restaurante & Churrascaria
 * =============================================
 * Funcionalidades:
 * 1. Menu fixo com efeito ao rolar
 * 2. Menu mobile (hambúrguer)
 * 3. Scroll suave entre seções
 * 4. Animações de reveal ao rolar
 * 5. Abas do cardápio
 * 6. Animação das barras de avaliação
 * 7. Botão voltar ao topo
 * 8. Link ativo no menu
 * 9. Ano atual no rodapé
 */

'use strict';

/* ===================================================
   UTILITÁRIOS
=================================================== */

/**
 * Seleciona um elemento do DOM
 * @param {string} selector
 * @param {Element} [scope=document]
 * @returns {Element|null}
 */
const $ = (selector, scope = document) => scope.querySelector(selector);

/**
 * Seleciona todos os elementos do DOM
 * @param {string} selector
 * @param {Element} [scope=document]
 * @returns {NodeList}
 */
const $$ = (selector, scope = document) => scope.querySelectorAll(selector);


/* ===================================================
   1. ANO ATUAL NO RODAPÉ
=================================================== */
(function setCurrentYear() {
  const yearSpan = $('#year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();


/* ===================================================
   2. HEADER — COMPORTAMENTO AO ROLAR
=================================================== */
(function initScrollHeader() {
  const header = $('#header');
  if (!header) return;

  const SCROLL_THRESHOLD = 60; // px para ativar header escuro

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Roda no carregamento caso já esteja rolado
})();


/* ===================================================
   3. MENU MOBILE (HAMBÚRGUER)
=================================================== */
(function initMobileMenu() {
  const hamburger   = $('#hamburger');
  const navLinks    = $('#navLinks');
  const navOverlay  = $('#navOverlay');

  if (!hamburger || !navLinks || !navOverlay) return;

  /**
   * Abre ou fecha o menu mobile
   */
  function toggleMenu() {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    navOverlay.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    // Trava o scroll do body quando menu está aberto
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  /**
   * Fecha o menu mobile
   */
  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    navOverlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Abre/fecha ao clicar no hambúrguer
  hamburger.addEventListener('click', toggleMenu);

  // Fecha ao clicar no overlay (fora do menu)
  navOverlay.addEventListener('click', closeMenu);

  // Fecha ao clicar em qualquer link do menu
  $$('.nav-link, .nav-cta', navLinks).forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha ao pressionar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ===================================================
   4. SCROLL SUAVE PARA ÂNCORAS INTERNAS
=================================================== */
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Ignora links que são apenas "#"
      if (href === '#') return;

      const target = $(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();


/* ===================================================
   5. ANIMAÇÕES DE REVEAL AO ROLAR (Intersection Observer)
=================================================== */
(function initRevealAnimations() {
  const revealElements = $$('.reveal-up, .reveal-left, .reveal-right');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Desconecta após animar (performance)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,    // Inicia quando 12% do elemento está visível
      rootMargin: '0px 0px -40px 0px' // Antecipa um pouco antes do viewport
    }
  );

  revealElements.forEach(el => observer.observe(el));
})();


/* ===================================================
   6. ABAS DO CARDÁPIO
=================================================== */
(function initCardapioTabs() {
  const tabBtns    = $$('.tab-btn');
  const tabContents = $$('.tab-content');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = 'tab-' + this.dataset.tab;

      // Remove 'active' de todos os botões e conteúdos
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Ativa o botão clicado
      this.classList.add('active');

      // Ativa o conteúdo correspondente
      const targetContent = $('#' + targetId);
      if (targetContent) {
        targetContent.classList.add('active');

        // Reinicia as animações dos cards dentro da nova aba
        const cards = $$('.reveal-up', targetContent);
        cards.forEach(card => {
          card.classList.remove('visible');
          // Pequeno timeout para re-triggerar o observer
          setTimeout(() => card.classList.add('visible'), 50);
        });
      }
    });
  });
})();


/* ===================================================
   7. ANIMAÇÃO DAS BARRAS DE RATING
=================================================== */
(function initRatingBars() {
  const bars = $$('.bar-fill');
  if (!bars.length) return;

  // Cada barra tem sua largura definida no HTML via style inline
  // Salvamos o valor alvo e iniciamos em 0
  bars.forEach(bar => {
    const targetWidth = bar.style.width || '0%';
    bar.style.width = '0%'; // Reseta
    bar.dataset.target = targetWidth;
  });

  // Usa Intersection Observer para animar quando visível
  const ratingSection = $('.rating-bars');
  if (!ratingSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bars.forEach((bar, i) => {
            setTimeout(() => {
              bar.style.width = bar.dataset.target;
            }, i * 120); // Stagger entre barras
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(ratingSection);
})();


/* ===================================================
   8. BOTÃO VOLTAR AO TOPO
=================================================== */
(function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;

  const SHOW_AFTER = 400; // px

  // Mostra/esconde baseado na posição de scroll
  function onScroll() {
    if (window.scrollY > SHOW_AFTER) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Volta ao topo ao clicar
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ===================================================
   9. LINK ATIVO NO MENU (Highlight ao rolar)
=================================================== */
(function initActiveNavLink() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');

          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === '#' + id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0
    }
  );

  sections.forEach(section => observer.observe(section));
})();


/* ===================================================
   10. EFEITO DE DIGITAÇÃO NA HERO (typewriter sutil)
       — Anima o subtítulo com efeito de aparecimento
=================================================== */
(function initHeroAnimation() {
  const heroContent = $('.hero-content');
  if (!heroContent) return;

  const elements = $$('.reveal-up', heroContent);

  // Inicia as animações com delay escalonado
  elements.forEach((el, i) => {
    el.style.transitionDelay = `${0.2 + i * 0.2}s`;
    // Força reflow para garantir a animação
    setTimeout(() => {
      el.classList.add('visible');
    }, 100 + i * 200);
  });
})();


/* ===================================================
   11. CONTADOR ANIMADO (Sobre - Estatísticas)
=================================================== */
(function initCounters() {
  const statNums = $$('.stat-num');
  if (!statNums.length) return;

  /**
   * Anima um número de 0 até o valor final
   * @param {Element} el - Elemento a animar
   * @param {number} target - Valor final
   * @param {string} suffix - Sufixo após o número (ex: "+", "★")
   * @param {number} duration - Duração em ms
   */
  function animateCounter(el, target, suffix, duration = 1500) {
    const start = performance.now();
    const isDecimal = !Number.isInteger(target);

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      el.textContent = isDecimal
        ? current.toFixed(1) + suffix
        : Math.floor(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = isDecimal
          ? target.toFixed(1) + suffix
          : target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const rawText = el.textContent.trim();

          // Extrai o número e sufixo do texto
          const match = rawText.match(/^([\d.]+)(.*)$/);
          if (match) {
            const value = parseFloat(match[1]);
            const suffix = match[2] || '';
            animateCounter(el, value, suffix);
          }

          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach(el => observer.observe(el));
})();


/* ===================================================
   12. FECHAR MENU AO REDIMENSIONAR PARA DESKTOP
=================================================== */
(function initResizeHandler() {
  const navLinks   = $('#navLinks');
  const hamburger  = $('#hamburger');
  const navOverlay = $('#navOverlay');

  if (!navLinks) return;

  let resizeTimer;

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('open');
        hamburger && hamburger.classList.remove('open');
        navOverlay && navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }, 100);
  });
})();


/* ===================================================
   13. LAZY LOADING DO MAPA (Performance)
=================================================== */
(function initLazyMap() {
  const mapWrapper = $('.mapa-wrapper');
  if (!mapWrapper) return;

  const iframe = $('iframe', mapWrapper);
  if (!iframe) return;

  // Salva o src real e remove temporariamente
  const realSrc = iframe.src;
  iframe.removeAttribute('src');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          iframe.src = realSrc;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(mapWrapper);
})();


/* ===================================================
   14. NOTIFICAÇÃO DE HORÁRIO DE FUNCIONAMENTO
       — Mostra se o restaurante está aberto agora
=================================================== */
(function initOpenStatus() {
  /**
   * Verifica se o restaurante está aberto no momento
   * @returns {{ isOpen: boolean, message: string }}
   */
  function checkOpenStatus() {
    const now    = new Date();
    const day    = now.getDay();   // 0=Dom, 1=Seg, ..., 6=Sáb
    const hour   = now.getHours();
    const minute = now.getMinutes();
    const time   = hour + minute / 60;

    let isOpen = false;

    // Seg–Sex: 11h–15h ou 18h–22h
    if (day >= 1 && day <= 5) {
      isOpen = (time >= 11 && time < 15) || (time >= 18 && time < 22);
    }
    // Sáb–Dom: 11h–23h
    else if (day === 0 || day === 6) {
      isOpen = time >= 11 && time < 23;
    }

    return {
      isOpen,
      message: isOpen
        ? '🟢 Aberto agora! Venha nos visitar.'
        : '🔴 Fechado no momento. Consulte nossos horários.'
    };
  }

  // Cria e insere o badge de status nos cards de contato
  const horarioInfo = document.querySelector('.info-card:nth-child(4)');
  if (!horarioInfo) return;

  const status = checkOpenStatus();
  const badge  = document.createElement('span');
  badge.className = 'open-status-badge';
  badge.textContent = status.message;
  badge.style.cssText = `
    display: block;
    margin-top: 0.5rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: ${status.isOpen ? '#25D366' : '#E74C3C'};
  `;

  const infoBody = horarioInfo.querySelector('div');
  if (infoBody) infoBody.appendChild(badge);
})();


/* ===================================================
   15. FEEDBACK VISUAL AO CLICAR NOS BOTÕES "PEDIR"
=================================================== */
(function initMenuButtonFeedback() {
  $$('.menu-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Cria ripple effect
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0; left: 0;
        border-radius: inherit;
        background: rgba(255,255,255,0.2);
        animation: rippleEffect 0.4s ease-out forwards;
        pointer-events: none;
      `;

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 400);
    });
  });

  // Injeta keyframes do ripple via JS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleEffect {
      from { transform: scale(0); opacity: 1; }
      to   { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();


/* ===================================================
   16. LOG DE INICIALIZAÇÃO (Debug — remover em produção)
=================================================== */
console.log(
  '%c🔥 Brasa Viva%c\nSite carregado com sucesso!\n(54) 9 9999-9999 | BR-116, Vacaria - RS',
  'color: #D4AF37; font-size: 1.5rem; font-weight: bold;',
  'color: #888; font-size: 0.9rem;'
);
