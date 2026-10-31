(() => {
  const nav = document.querySelector('.primary-nav');
  if (!nav) return;

  const menus = {
    'Qui sommes-nous ?': [['Notre approche', 'a-propos.html'], ['Nos valeurs', 'a-propos.html#values'], ['Notre méthode', 'a-propos.html#values'], ['Nos engagements', 'a-propos.html#values']],
    'Nos services': [['Construction', 'services.html#construction'], ['Ferraillage', 'services.html#ferraillage'], ['Ingénierie BTP', 'services.html#ingenierie'], ['Rénovation', 'services.html#renovation']],
    'Nos réalisations': [['Toutes les réalisations', 'realisations.html'], ['Résidentiel', 'realisations.html?filter=residence'], ['Construction', 'realisations.html?filter=construction'], ['Ingénierie BTP', 'realisations.html?filter=btp']],
    'Nos engagements': [['Qualité', 'a-propos.html#values'], ['Fiabilité', 'a-propos.html#values'], ['Expérience', 'a-propos.html#values'], ['Innovation', 'a-propos.html#values']]
  };

  [...nav.querySelectorAll(':scope > a')].forEach(anchor => {
    const items = menus[anchor.textContent.trim()];
    if (!items) return;
    const item = document.createElement('div');
    item.className = 'nav-item has-menu';
    anchor.parentNode.insertBefore(item, anchor);
    item.appendChild(anchor);
    const menu = document.createElement('div');
    menu.className = 'mega-menu';
    menu.setAttribute('role', 'menu');
    items.forEach(([label, href]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      link.setAttribute('role', 'menuitem');
      menu.appendChild(link);
    });
    item.appendChild(menu);
    anchor.addEventListener('click', event => {
      if (window.innerWidth <= 760) {
        event.preventDefault();
        item.classList.toggle('open');
      }
    });
  });

  const media = document.createElement('a');
  media.href = 'media.html';
  media.textContent = 'Médias';
  media.dataset.page = 'media';
  nav.appendChild(media);
  const recruitment = document.createElement('a');
  recruitment.href = 'recrutement.html';
  recruitment.textContent = 'Recrutement';
  recruitment.className = 'nav-recruitment';
  recruitment.dataset.page = 'recruitment';
  nav.appendChild(recruitment);

  const searchButton = document.createElement('button');
  searchButton.className = 'nav-search';
  searchButton.type = 'button';
  searchButton.setAttribute('aria-label', 'Rechercher');
  searchButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.5"></circle><path d="m16 16 5 5"></path></svg>';
  nav.appendChild(searchButton);

  const overlay = document.createElement('section');
  overlay.className = 'search-overlay';
  overlay.setAttribute('aria-label', 'Recherche');
  overlay.innerHTML = '<div class="search-underlay"></div><div class="search-shell"><div class="search-topline"><span>Rechercher sur Belle House</span><button class="search-close" type="button" aria-label="Fermer la recherche">×</button></div><form class="search-form"><input aria-label="Votre recherche" placeholder="Rechercher..." autocomplete="off"><button type="submit" aria-label="Lancer la recherche">↗</button></form><div class="search-hints"><a href="services.html">Construction</a><a href="realisations.html">Projets</a><a href="contact.html">Contact</a><a href="recrutement.html">Carrière</a></div><div class="search-results"></div></div>';
  document.body.appendChild(overlay);
  const input = overlay.querySelector('input');
  const close = overlay.querySelector('.search-close');
  const resultBox = overlay.querySelector('.search-results');
  const results = [
    ['Construction', 'services.html#construction', 'Service'],
    ['Ferraillage', 'services.html#ferraillage', 'Service'],
    ['Ingénierie BTP', 'services.html#ingenierie', 'Service'],
    ['Nos réalisations', 'realisations.html', 'Projet'],
    ['Nous contacter', 'contact.html', 'Contact'],
    ['Rejoindre Belle House', 'recrutement.html', 'Recrutement']
  ];
  const openSearch = () => { overlay.classList.add('open'); input.value = ''; resultBox.classList.remove('show'); setTimeout(() => input.focus(), 60); };
  const closeSearch = () => overlay.classList.remove('open');
  searchButton.addEventListener('click', openSearch);
  close.addEventListener('click', closeSearch);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeSearch(); });
  overlay.querySelector('.search-form').addEventListener('submit', event => event.preventDefault());
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    const filtered = query ? results.filter(([label, , type]) => `${label} ${type}`.toLowerCase().includes(query)) : results;
    resultBox.innerHTML = filtered.length ? filtered.map(([label, href, type]) => `<a class="search-result" href="${href}"><strong>${label}</strong><span>${type} ↗</span></a>`).join('') : '<div class="search-result"><strong>Aucun résultat</strong><span>Essayez un autre mot</span></div>';
    resultBox.classList.add('show');
  });

  document.querySelectorAll('.footer-links').forEach(footerLinks => {
    if (!footerLinks.querySelector('a[href="media.html"]')) footerLinks.insertAdjacentHTML('beforeend', '<a href="media.html">Médias</a>');
    if (!footerLinks.querySelector('a[href="recrutement.html"]')) footerLinks.insertAdjacentHTML('beforeend', '<a href="recrutement.html">Recrutement</a>');
    if (!footerLinks.querySelector('a[href="recherche.html"]')) footerLinks.insertAdjacentHTML('beforeend', '<a href="recherche.html">Rechercher</a>');
  });
})();
