// Menu mobile
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const ouvert = nav.classList.toggle('ouvert');
  menuBtn.setAttribute('aria-expanded', String(ouvert));
});
nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('ouvert');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

// Visionneuse de la galerie
const visionneuse = document.getElementById('visionneuse');
const grandeImage = visionneuse.querySelector('img');
const legende = visionneuse.querySelector('.legende');
document.querySelectorAll('.galerie figure').forEach((fig) => {
  fig.querySelector('button').addEventListener('click', () => {
    const img = fig.querySelector('img');
    grandeImage.src = img.src;
    grandeImage.alt = img.alt;
    legende.textContent = fig.querySelector('figcaption')?.textContent || '';
    visionneuse.showModal();
  });
});
visionneuse.querySelector('.fermer').addEventListener('click', () => visionneuse.close());
visionneuse.addEventListener('click', (e) => { if (e.target === visionneuse) visionneuse.close(); });

// Copier l'adresse e-mail
document.querySelectorAll('.copier').forEach((btn) => {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copie);
      btn.textContent = 'Adresse copiée';
    } catch {
      btn.textContent = btn.dataset.copie;
    }
  });
});

// Formulaire : prépare un e-mail dans la messagerie du visiteur
const DESTINATAIRE = 'maisonpapejules2@yahoo.com';
const form = document.getElementById('formulaire');
const erreur = document.getElementById('erreur');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const champs = ['nom', 'email', 'message'].map((id) => document.getElementById(id));
  let premierVide = null;
  champs.forEach((c) => {
    const ok = c.value.trim() !== '' && (c.type !== 'email' || c.checkValidity());
    c.setAttribute('aria-invalid', String(!ok));
    if (!ok && !premierVide) premierVide = c;
  });
  if (premierVide) {
    erreur.textContent = premierVide.id === 'email' && premierVide.value.trim()
      ? "L'adresse e-mail semble incomplète. Vérifiez-la pour que le propriétaire puisse vous répondre."
      : 'Renseignez votre nom, votre e-mail et votre message.';
    erreur.hidden = false;
    premierVide.focus();
    return;
  }
  erreur.hidden = true;

  const nom = form.nom.value.trim();
  const sujet = `${form.objet.value} : ${nom}`;
  const corps = `${form.message.value.trim()}\n\n${nom}\n${form.email.value.trim()}`;
  window.location.href = `mailto:${DESTINATAIRE}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
});
