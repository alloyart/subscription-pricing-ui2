import { copy } from './copy.js';

const PROCESSING_MS = 300;
const EXIT_MS = 170;

const icon = (name) => {
  const icons = {
    plus: '<path d="M12 5v14M5 12h14"/>',
    spark: '<path d="M12 3l1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1L6.5 8.5l4.1-1.4L12 3Z"/><path d="M18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z"/>',
    doc: '<path d="M7 3.5h7l3 3V20.5H7z"/><path d="M14 3.5v4h4M9.5 11h5M9.5 14.5h5M9.5 18h3.5"/>',
    slides: '<rect x="4" y="5" width="16" height="12" rx="1"/><path d="M8 20h8M12 17v3M8 9h8M8 12h5"/>',
    plans: '<path d="M5 5.5h14v13H5z"/><path d="M8 9h8M8 12h5M8 15h6"/>',
    check: '<path d="m5 12.5 4.2 4.2L19 7"/>',
    close: '<path d="m7 7 10 10M17 7 7 17"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[name]}</svg>`;
};

function navItem(label, iconName, active = false) {
  return `<a class="nav-item${active ? ' is-active' : ''}" href="#" ${active ? 'aria-current="page"' : ''}>${icon(iconName)}<span>${label}</span></a>`;
}

function featureRow(text) {
  return `<li><span>${text}</span></li>`;
}

function planCard(planKey) {
  const plan = copy.plans[planKey];
  const isFree = planKey === 'free';
  const isPro = planKey === 'pro';
  const priceLabel = `${plan.price} per month`;

  let action = '';
  if (isFree) {
    action = `<div class="plan-state" id="current-free" aria-label="${copy.states.current}">${copy.states.current}</div>`;
  } else if (isPro) {
    action = `<button class="plan-button plan-button--primary" id="upgrade-pro" type="button">${copy.actions.upgradePro}</button>`;
  } else {
    action = `<button class="plan-button plan-button--secondary" id="upgrade-ultra" type="button">${copy.actions.upgradeUltra}</button>`;
  }

  return `
    <article class="plan-card${isPro ? ' plan-card--featured' : ''}" data-plan="${planKey}">
      <div class="plan-topline">
        <h2 id="plan-title-${planKey}"${isPro ? ' tabindex="-1"' : ''}>${plan.name}</h2>
        ${isPro ? `<span class="recommended-badge">${copy.states.recommended}</span>` : ''}
      </div>
      <p class="plan-description">${plan.description}</p>
      <div class="price-row" aria-label="${priceLabel}">
        <span class="price-value" aria-hidden="true">${plan.price}</span>
        <span class="price-unit" aria-hidden="true">${copy.priceUnit}</span>
      </div>
      <div class="action-row" data-action-for="${planKey}">${action}</div>
      <div class="feature-block">
        <p class="feature-heading">${plan.group}</p>
        <ul>${plan.features.map(featureRow).join('')}</ul>
      </div>
    </article>`;
}

function modalBenefit(text) {
  return `<li>${icon('check')}<span>${text}</span></li>`;
}

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="app-shell" id="app-shell">
    <aside class="sidebar">
      <div class="sidebar-top">
        <a class="product-mark" href="#" aria-label="${copy.nav.productHomeA11y}">
          <span></span><span></span><span></span><span></span>
        </a>
        <button class="new-task" type="button">${icon('plus')}<span>${copy.nav.newTask}</span></button>
        <nav class="nav-list" aria-label="${copy.nav.productNavA11y}">
          ${navItem(copy.nav.assistant, 'spark')}
          ${navItem(copy.nav.docs, 'doc')}
          ${navItem(copy.nav.slides, 'slides')}
          ${navItem(copy.nav.plans, 'plans', true)}
        </nav>
      </div>
      <div class="account-row">
        <div class="avatar" aria-hidden="true">AM</div>
        <div class="account-copy">
          <span class="account-name">${copy.account.name}</span>
          <span class="account-plan">${copy.account.initialPlan}</span>
        </div>
      </div>
    </aside>

    <main class="main-content">
      <section class="pricing-hero">
        <p class="eyebrow">${copy.nav.plans}</p>
        <div class="hero-copy">
          <h1>${copy.page.title}</h1>
          <div class="hero-support">
            <p>${copy.page.description}</p>
            <p>${copy.page.support}</p>
          </div>
        </div>
      </section>

      <section class="pricing-section" aria-label="${copy.page.comparisonA11y}">
        <div class="plan-grid">
          ${planCard('free')}
          ${planCard('pro')}
          ${planCard('ultra')}
        </div>
        <p class="credits-help">${copy.creditHelp}</p>
      </section>

      <section class="terms" aria-label="${copy.termsA11y}">
        ${copy.terms.map((item) => `<p>${item}</p>`).join('')}
      </section>
    </main>
  </div>

  <div class="modal-layer" id="pro-modal-layer" hidden>
    <div class="modal-backdrop" data-modal-backdrop></div>
    <section class="success-modal" role="dialog" aria-modal="true" aria-labelledby="success-title" aria-describedby="success-description">
      <button class="modal-close" id="modal-close" type="button" aria-label="${copy.modal.closeA11y}">${icon('close')}</button>
      <div class="success-mark" aria-hidden="true">${icon('check')}</div>
      <div class="modal-heading">
        <h2 id="success-title" tabindex="-1">${copy.modal.title}</h2>
        <p id="success-description">${copy.modal.description}</p>
      </div>
      <div class="modal-benefits">
        <p>${copy.modal.group}</p>
        <ul>${copy.modal.benefits.map(modalBenefit).join('')}</ul>
      </div>
      <button class="modal-primary" id="start-pro" type="button">${copy.modal.primary}</button>
    </section>
  </div>`;

const shell = document.querySelector('#app-shell');
const accountPlan = document.querySelector('.account-plan');
const proActionRow = document.querySelector('[data-action-for="pro"]');
const freeActionRow = document.querySelector('[data-action-for="free"]');
const proTitle = document.querySelector('#plan-title-pro');
const modalLayer = document.querySelector('#pro-modal-layer');
const modal = modalLayer.querySelector('.success-modal');
const modalTitle = document.querySelector('#success-title');
const modalClose = document.querySelector('#modal-close');
const startPro = document.querySelector('#start-pro');
const upgradePro = document.querySelector('#upgrade-pro');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let state = 'initial';
let processingTimer = null;
let closing = false;

function currentPlanState(id) {
  return `<div class="plan-state" id="${id}" aria-label="${copy.states.current}">${copy.states.current}</div>`;
}

function setProcessing() {
  if (state !== 'initial') return;
  state = 'processing';
  upgradePro.disabled = true;
  upgradePro.setAttribute('aria-busy', 'true');
  upgradePro.innerHTML = `<span class="button-spinner" aria-hidden="true"></span><span>${copy.actions.processingPro}</span>`;

  processingTimer = window.setTimeout(() => {
    commitPro();
    openModal();
  }, PROCESSING_MS);
}

function commitPro() {
  state = 'success';
  accountPlan.textContent = copy.account.proPlan;
  freeActionRow.innerHTML = '<div class="plan-state plan-state--empty" aria-hidden="true"></div>';
  proActionRow.innerHTML = currentPlanState('current-pro');
}

function focusableElements() {
  return [...modal.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')]
    .filter((element) => !element.hidden && element.getAttribute('aria-hidden') !== 'true');
}

function lockBackground() {
  shell.inert = true;
  document.documentElement.classList.add('is-modal-open');
}

function unlockBackground() {
  shell.inert = false;
  document.documentElement.classList.remove('is-modal-open');
}

function openModal() {
  lockBackground();
  modalLayer.hidden = false;
  requestAnimationFrame(() => {
    modalLayer.classList.add('is-open');
    modalTitle.focus({ preventScroll: true });
  });
}

function finishClose() {
  modalLayer.hidden = true;
  modalLayer.classList.remove('is-open', 'is-closing');
  unlockBackground();
  closing = false;
  state = 'completed';
  proTitle.focus({ preventScroll: true });
}

function closeModal() {
  if (state !== 'success' || closing) return;
  closing = true;
  modalLayer.classList.remove('is-open');
  modalLayer.classList.add('is-closing');

  if (reducedMotion.matches) {
    finishClose();
    return;
  }

  window.setTimeout(finishClose, EXIT_MS);
}

function handleModalKeydown(event) {
  if (state !== 'success' || modalLayer.hidden) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    closeModal();
    return;
  }

  if (event.key !== 'Tab') return;
  const focusables = focusableElements();
  if (!focusables.length) {
    event.preventDefault();
    modalTitle.focus();
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && (active === first || active === modalTitle)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

upgradePro.addEventListener('click', setProcessing);
modalClose.addEventListener('click', closeModal);
startPro.addEventListener('click', closeModal);
modalLayer.addEventListener('keydown', handleModalKeydown);

// Backdrop activation intentionally does not close the confirmation dialog.
modalLayer.querySelector('[data-modal-backdrop]').addEventListener('click', () => {
  if (state === 'success') modalTitle.focus({ preventScroll: true });
});

window.addEventListener('beforeunload', () => {
  if (processingTimer) window.clearTimeout(processingTimer);
});
