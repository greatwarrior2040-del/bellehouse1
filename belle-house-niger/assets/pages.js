(() => {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const chatbot = document.getElementById('page-chat');
  const chatInput = document.getElementById('page-chat-input');
  const chatMessages = document.getElementById('page-chat-messages');
  const chatForm = document.getElementById('page-chat-form');
  const closeChat = document.getElementById('page-chat-close');
  const openChatButtons = document.querySelectorAll('[data-open-chat]');
  const page = document.body.dataset.page;

  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 20);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (menuToggle) menuToggle.addEventListener('click', () => {
    const open = !menuToggle.classList.contains('open');
    menuToggle.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.primary-nav a').forEach(link => {
    if (link.dataset.page === page) link.classList.add('active');
    link.addEventListener('click', () => { menuToggle?.classList.remove('open'); header?.classList.remove('menu-open'); });
  });

  const openChat = () => { chatbot.classList.add('open'); chatbot.setAttribute('aria-hidden', 'false'); setTimeout(() => chatInput.focus(), 80); };
  const hideChat = () => { chatbot.classList.remove('open'); chatbot.setAttribute('aria-hidden', 'true'); };
  closeChat?.addEventListener('click', hideChat);
  openChatButtons.forEach(button => button.addEventListener('click', openChat));

  const addMessage = (text, type) => { const bubble = document.createElement('div'); bubble.className = `page-message ${type}`; bubble.textContent = text; chatMessages.appendChild(bubble); chatMessages.scrollTop = chatMessages.scrollHeight; };
  const answer = raw => {
    const text = raw.toLowerCase();
    if (text.includes('service') || text.includes('faire')) return 'Belle House intervient en construction, ferraillage, ingénierie BTP et rénovation. Quelle expertise vous intéresse ?';
    if (text.includes('démarr') || text.includes('étape') || text.includes('projet')) return 'Nous commençons par un échange sur votre besoin, votre terrain et votre budget, puis nous cadrons la suite avec vous.';
    if (text.includes('prix') || text.includes('budget') || text.includes('devis')) return 'Le budget dépend de la surface, du terrain et des finitions. Appelez le +227 92 00 54 54 pour une première orientation.';
    if (text.includes('contact') || text.includes('appeler') || text.includes('email')) return 'Vous pouvez appeler le +227 92 00 54 54 ou écrire à contact@bellehouseniger.com. Le formulaire de contact est aussi disponible sur cette page.';
    if (text.includes('bonjour') || text.includes('salut')) return 'Bonjour. Je suis Belle, votre guide Belle House. Comment puis-je vous orienter ?';
    return 'Je peux vous renseigner sur les services, les étapes, le budget indicatif ou le contact de Belle House.';
  };
  const send = value => { const clean = value.trim(); if (!clean) return; addMessage(clean, 'user'); chatInput.value = ''; setTimeout(() => addMessage(answer(clean), 'bot'), 330); };
  chatForm?.addEventListener('submit', event => { event.preventDefault(); send(chatInput.value); });
  document.querySelectorAll('[data-question]').forEach(button => button.addEventListener('click', () => { openChat(); send(button.dataset.question); }));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); } }), { threshold: .12 });
  document.querySelectorAll('.page-reveal').forEach(item => observer.observe(item));

  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.portfolio-card').forEach(card => { card.style.display = filter === 'all' || card.dataset.category === filter ? 'flex' : 'none'; });
  }));

  document.querySelectorAll('[data-contact-form]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = `Demande de projet Belle House - ${data.get('name')}`;
    const body = `Nom : ${data.get('name')}\nTéléphone : ${data.get('phone')}\nEmail : ${data.get('email')}\n\nProjet :\n${data.get('message')}`;
    window.location.href = `mailto:contact@bellehouseniger.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.querySelector('.page-success').classList.add('show');
  }));
})();
