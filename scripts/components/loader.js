/**
 * Component Loader - Handles loading HTML partials
 */

export async function loadComponent(selector) {
  const container = document.querySelector(selector);
  if (!container) return;

  const source = container.dataset.source;
  if (!source) return;

  try {
    const baseUrl = window.location.origin + '/api/preview-68a992878b427e2380d8c23e/';
    const response = await fetch(baseUrl + source);
    if (response.ok) {
      const html = await response.text();
      container.innerHTML = html;
      
      // Initialize component-specific scripts
      if (source.includes('navbar')) {
        initNavbar();
      }
    }
  } catch (error) {
    console.error(`Failed to load component: ${source}`, error);
  }
}

function initNavbar() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('close-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggleBtn && closeBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('-translate-x-full');
    });

    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.add('-translate-x-full');
    });
  }
}