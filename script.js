// Royal Retreat – A Luxurious Rental Site
// Shared JS for navigation, filtering, rendering and validation

// Dummy properties
const PROPERTIES = [
  { id: 1, title: 'Palm Court Villa', price: 1200, location: 'Dubai', type: 'Villa', beds: 4, baths: 3, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, title: 'Central Park Penthouse', price: 2800, location: 'New York', type: 'Penthouse', beds: 3, baths: 3, image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, title: 'Riviera Beach House', price: 900, location: 'Nice', type: 'House', beds: 2, baths: 2, image: 'https://images.unsplash.com/photo-1501183007986-d0d080b147f9?q=80&w=1200&auto=format&fit=crop' },
  { id: 4, title: 'Kensington Classic', price: 1900, location: 'London', type: 'Apartment', beds: 2, baths: 2, image: 'https://images.unsplash.com/photo-1499955085172-a104c9463ece?q=80&w=1200&auto=format&fit=crop' },
  { id: 5, title: 'Santorini Sapphire', price: 1100, location: 'Santorini', type: 'Villa', beds: 3, baths: 2, image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop' },
  { id: 6, title: 'Marina Bay Loft', price: 1500, location: 'Singapore', type: 'Loft', beds: 1, baths: 1, image: 'https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?q=80&w=1200&auto=format&fit=crop' },
  { id: 7, title: 'Beverly Hills Estate', price: 3500, location: 'Los Angeles', type: 'House', beds: 5, baths: 4, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop' },
  { id: 8, title: 'Tokyo Sky Suite', price: 2100, location: 'Tokyo', type: 'Apartment', beds: 2, baths: 2, image: 'https://images.unsplash.com/photo-1506423913529-9e8fbfdde4a3?q=80&w=1200&auto=format&fit=crop' },
  { id: 9, title: 'Swiss Alpine Chalet', price: 1700, location: 'Zermatt', type: 'Chalet', beds: 3, baths: 2, image: 'https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1200&auto=format&fit=crop' },
  { id: 10, title: 'Amalfi Cliff Residence', price: 2200, location: 'Amalfi', type: 'House', beds: 3, baths: 2, image: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?q=80&w=1200&auto=format&fit=crop' },
  { id: 11, title: 'Bali Jungle Retreat', price: 950, location: 'Ubud', type: 'Villa', beds: 2, baths: 2, image: 'https://images.unsplash.com/photo-1523419409543-8f6f9a4f3f56?q=80&w=1200&auto=format&fit=crop' },
  { id: 12, title: 'Paris Haussmann Flat', price: 1600, location: 'Paris', type: 'Apartment', beds: 2, baths: 1, image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d52?q=80&w=1200&auto=format&fit=crop' },
  { id: 13, title: 'Sydney Harbour Penthouse', price: 3000, location: 'Sydney', type: 'Penthouse', beds: 3, baths: 3, image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop' },
  { id: 14, title: 'Marrakech Riad Oasis', price: 800, location: 'Marrakech', type: 'House', beds: 3, baths: 2, image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=1200&auto=format&fit=crop' },
  { id: 15, title: 'Reykjavik Nordic Loft', price: 1300, location: 'Reykjavik', type: 'Loft', beds: 1, baths: 1, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop' },
  { id: 16, title: 'Capetown Ocean Villa', price: 1800, location: 'Cape Town', type: 'Villa', beds: 4, baths: 3, image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop' },
  { id: 17, title: 'Barcelona Gothic Apartment', price: 1200, location: 'Barcelona', type: 'Apartment', beds: 2, baths: 2, image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop' },
  { id: 18, title: 'Queenstown Lake Chalet', price: 1400, location: 'Queenstown', type: 'Chalet', beds: 3, baths: 2, image: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1200&auto=format&fit=crop' },
];

// Utilities
function $(selector, root = document) { return root.querySelector(selector); }
function $all(selector, root = document) { return Array.from(root.querySelectorAll(selector)); }

// Navbar active state
function setActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  $all('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if ((path === '' && href.endsWith('index.html')) || href.endsWith(path)) {
      link.classList.add('active');
      link.style.color = 'var(--color-gold-dark)';
    }
  });
}

// Render properties
function renderProperties(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!data || data.length === 0) {
    container.innerHTML = `<p class="muted">No properties match your criteria.</p>`;
    return;
  }
  container.innerHTML = data.map(p => `
    <article class="card" aria-label="${p.title}">
      <img class="card-img" src="${p.image}" alt="${p.title}"/>
      <div class="card-body">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <h3 style="margin:0;font-size:18px;">${p.title}</h3>
          <span class="pill">${p.type}</span>
        </div>
        <div class="muted" style="margin-bottom:6px;">${p.location} • ${p.beds} bd • ${p.baths} ba</div>
        <div class="price">$${p.price}/night</div>
      </div>
    </article>
  `).join('');
}

// Filtering logic on listings page
function setupListingFilters() {
  const filterForm = $('#filters');
  if (!filterForm) return;

  const locationInput = $('#filter-location');
  const typeSelect = $('#filter-type');
  const priceSelect = $('#filter-price');

  function applyFiltersFromControls() {
    const qLocation = (locationInput.value || '').trim().toLowerCase();
    const qType = (typeSelect.value || '').trim();
    const qPrice = (priceSelect.value || '').trim();

    const filtered = PROPERTIES.filter(p => {
      const matchesLocation = qLocation ? p.location.toLowerCase().includes(qLocation) : true;
      const matchesType = qType ? p.type === qType : true;
      let matchesPrice = true;
      if (qPrice === 'lt1000') matchesPrice = p.price < 1000;
      else if (qPrice === '1000-2000') matchesPrice = p.price >= 1000 && p.price <= 2000;
      else if (qPrice === 'gt2000') matchesPrice = p.price > 2000;
      return matchesLocation && matchesType && matchesPrice;
    });
    renderProperties('listing-grid', filtered);
  }

  // Initialize from URL
  const params = new URLSearchParams(location.search);
  if (params.has('location')) locationInput.value = params.get('location');
  if (params.has('type')) typeSelect.value = params.get('type');
  if (params.has('price')) priceSelect.value = params.get('price');

  $all('select, input', filterForm).forEach(el => el.addEventListener('change', applyFiltersFromControls));
  $('#reset-filters')?.addEventListener('click', () => {
    locationInput.value = '';
    typeSelect.value = '';
    priceSelect.value = '';
    applyFiltersFromControls();
  });

  applyFiltersFromControls();
}

// Home search -> navigate to listings with params
function setupHomeSearch() {
  const form = document.getElementById('home-search');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const locationValue = encodeURIComponent($('#home-location').value.trim());
    const typeValue = encodeURIComponent($('#home-type').value);
    const priceValue = encodeURIComponent($('#home-price').value);
    const params = new URLSearchParams();
    if (locationValue) params.set('location', decodeURIComponent(locationValue));
    if (typeValue) params.set('type', decodeURIComponent(typeValue));
    if (priceValue) params.set('price', decodeURIComponent(priceValue));
    window.location.href = `listings.html?${params.toString()}`;
  });
}

// Auth tab toggles and validation
function setupAuth() {
  const renterTab = document.getElementById('tab-renter');
  const listerTab = document.getElementById('tab-lister');
  const renterPanel = document.getElementById('panel-renter');
  const listerPanel = document.getElementById('panel-lister');
  if (!renterTab || !listerTab) return;

  function setRole(role) {
    if (role === 'renter') {
      renterTab.classList.add('active');
      listerTab.classList.remove('active');
      renterPanel.classList.remove('hide');
      listerPanel.classList.add('hide');
    } else {
      listerTab.classList.add('active');
      renterTab.classList.remove('active');
      listerPanel.classList.remove('hide');
      renterPanel.classList.add('hide');
    }
  }

  renterTab.addEventListener('click', () => setRole('renter'));
  listerTab.addEventListener('click', () => setRole('lister'));
  setRole('renter');

  // Inner login/signup toggle per panel
  $all('[data-toggle-group]').forEach(group => {
    const loginBtn = group.querySelector('[data-toggle="login"]');
    const signupBtn = group.querySelector('[data-toggle="signup"]');
    const loginForm = group.parentElement.querySelector('.form-login');
    const signupForm = group.parentElement.querySelector('.form-signup');
    function setMode(mode) {
      if (mode === 'login') {
        loginBtn.classList.add('active'); signupBtn.classList.remove('active');
        loginForm.classList.remove('hide'); signupForm.classList.add('hide');
      } else {
        signupBtn.classList.add('active'); loginBtn.classList.remove('active');
        signupForm.classList.remove('hide'); loginForm.classList.add('hide');
      }
    }
    loginBtn.addEventListener('click', () => setMode('login'));
    signupBtn.addEventListener('click', () => setMode('signup'));
    setMode('login');
  });

  // Simple form validation
  function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
  function isValidPassword(pw) { return /^(?=.*\d).{8,}$/.test(pw); }

  $all('form[data-validate="auth"]')
    .forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const passwordInput = form.querySelector('input[type="password"]');
        const emailErr = form.querySelector('[data-error="email"]');
        const passErr = form.querySelector('[data-error="password"]');
        let ok = true;
        if (!isValidEmail(emailInput.value)) { emailErr.textContent = 'Enter a valid email.'; ok = false; } else { emailErr.textContent = ''; }
        if (!isValidPassword(passwordInput.value)) { passErr.textContent = 'Min 8 chars incl. a number.'; ok = false; } else { passErr.textContent = ''; }
        if (ok) {
          alert('Success! (client-side prototype)');
          form.reset();
        }
      });
    });
}

// Featured on home
function setupFeatured() {
  const container = document.getElementById('featured-grid');
  if (!container) return;
  renderProperties('featured-grid', PROPERTIES.slice(0, 3));
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  setupHomeSearch();
  setupFeatured();
  setupListingFilters();
  setupAuth();
});


