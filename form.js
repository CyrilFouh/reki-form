/**
 * PretPro — Formulaire de prequalification v17 (rebuild from V1)
 * 5 etapes : 1=Entreprise, 2=Projet, 3=Financement, 4=Situation, 5=Email
 * Injecte dans #pp-form. Verdict serveur + fallback local 8s.
 */
(function() {
  'use strict';

  var FORM_HTML = '<nav class="pp-navbar"><div class="pp-navbar-inner"><a href="https://www.reki.eu" class="pp-navbar-logo" aria-label="Reki"><img src="https://cdn.prod.website-files.com/66e83aa7dfde79e2181aec17/67f643c671467ca4c3c34118_LOGO_WEBCLIP.png" alt="Reki" class="pp-logo-icon"><img src="https://cdn.prod.website-files.com/66e83aa7dfde79e2181aec17/67f64110b3be61bad2bbe5b1_TEXT@2x.svg" alt="Reki" class="pp-logo-text"></a><a href="https://www.reki.eu" class="pp-navbar-back"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>Retour au site</a></div></nav>'+
'<section class="pp-hero"><div class="pp-hero-inner"><span class="pp-hero-tag">Pre-diagnostic gratuit — 2 min</span><h1>Votre projet est-il <span class="pp-brand-text">compatible avec un financement</span> bancaire ?</h1><p>Un pre-diagnostic immediat, des estimations personnalisees, et une orientation vers le bon parcours.</p></div></section>'+
'<section class="pp-form-section"><div class="pp-form-card"><div class="pp-progress"><div class="pp-progress-bar"><div class="pp-progress-fill" id="progressFill"></div></div><span class="pp-progress-label" id="progressLabel">Etape 1/5</span></div><form id="rekiForm" novalidate>'+

/* === ETAPE 1 : Entreprise === */
'<div class="pp-step pp-active" data-step="1"><div class="pp-step-title">Votre entreprise</div><div class="pp-step-subtitle">Entrez votre SIREN ou declarez une creation</div>'+
'<div id="siren-mode"><div class="pp-field-group"><label for="siren">Numero SIREN de votre entreprise</label><span class="pp-hint">9 chiffres</span><input type="text" id="siren" name="siren" placeholder="ex : 123 456 789" maxlength="9" autocomplete="off" inputmode="numeric" pattern="[0-9]{9}"></div>'+
'<div class="pp-field-group" style="margin-top:-0.25rem;"><button type="button" class="pp-btn pp-btn-outline" onclick="setCreationMode()" style="width:auto;font-size:var(--pp-fs-s);">Mon entreprise est en cours de creation</button></div>'+
'<div id="siren-confirm" style="display:none;" class="pp-company-confirm"><div class="pp-company-name" id="siren-name">—</div><div class="pp-company-info" id="siren-info">—</div><div style="margin-top:0.75rem;display:flex;gap:0.5rem;"><button type="button" class="pp-btn pp-btn-outline" onclick="confirmSiren()" style="font-size:var(--pp-fs-s);flex:1;">Oui, c\'est mon entreprise</button><button type="button" class="pp-btn pp-btn-secondary" onclick="resetSiren()" style="font-size:var(--pp-fs-s);flex:1;">Non, modifier le SIREN</button></div></div></div>'+
'<div id="creation-mode" style="display:none;"><div class="pp-company-confirm"><div class="pp-company-name">Entreprise en creation</div><div class="pp-company-info">Parcours adapte aux porteurs de projet sans entreprise encore immatriculee.</div></div>'+
'<div class="pp-field-group"><label for="creation_secteur">Dans quel secteur allez-vous exercer ?</label><select id="creation_secteur" name="creation_secteur"><option value="" disabled selected>Choisir un secteur</option><option value="restauration">Restauration</option><option value="commerce">Commerce de detail</option><option value="services">Services aux entreprises</option><option value="btp">BTP — Construction</option><option value="sante">Sante — Bien-etre</option><option value="artisanat">Artisanat</option><option value="franchise">Franchise</option><option value="tech">Tech — Digital</option><option value="autre">Autre</option></select></div>'+
'<div class="pp-field-group"><label for="creation_experience">Avez-vous de l\'experience dans ce secteur ?</label><select id="creation_experience" name="creation_experience"><option value="" disabled selected>Choisir</option><option value="5+">Oui, plus de 5 ans</option><option value="2-5">Oui, 2 a 5 ans</option><option value="1-2">Oui, 1 a 2 ans</option><option value="associe">Non, mais un associe experimente rejoint le projet</option><option value="non">Non</option></select></div>'+
'<div class="pp-field-group"><label>Quel pourcentage d\'apport personnel pouvez-vous mobiliser ?</label><div class="pp-radio-group"><label class="pp-radio-option"><input type="radio" name="creation_apport_pct" value="<10%"> Moins de 10 %</label><label class="pp-radio-option"><input type="radio" name="creation_apport_pct" value="10-20%"> 10 – 20 %</label><label class="pp-radio-option"><input type="radio" name="creation_apport_pct" value="20-30%"> 20 – 30 %</label><label class="pp-radio-option"><input type="radio" name="creation_apport_pct" value=">30%"> Plus de 30 %</label></div></div>'+
'<div class="pp-field-group"><label>Quelles preuves concretes avez-vous deja obtenues ?</label><span class="pp-hint">Cochez tout ce qui s\'applique</span><div class="pp-checkbox-group" id="creation-preuves-group"><label class="pp-checkbox-option"><input type="checkbox" name="creation_preuves" value="contrats"> Contrats ou commandes signes</label><label class="pp-checkbox-option"><input type="checkbox" name="creation_preuves" value="lettres"> Lettres d\'intention</label><label class="pp-checkbox-option"><input type="checkbox" name="creation_preuves" value="ca_deja"> Chiffre d\'affaires deja realise</label><label class="pp-checkbox-option"><input type="checkbox" name="creation_preuves" value="franchise_reseau"> Franchise ou reseau existant</label><label class="pp-checkbox-option"><input type="checkbox" name="creation_preuves" value="devis"> Devis fournisseurs</label><label class="pp-checkbox-option"><input type="checkbox" name="creation_preuves" value="etude"> Etude de marche seulement</label><label class="pp-checkbox-option"><input type="checkbox" name="creation_preuves" value="aucune"> Aucune preuve a ce stade</label></div></div></div>'+
'<div class="pp-btn-row"><button type="button" class="pp-btn pp-btn-primary" onclick="nextStep(1)">Continuer</button></div></div>'+

/* === ETAPE 2 : Projet === */
'<div class="pp-step" data-step="2"><div class="pp-step-title">Votre projet de financement</div><div class="pp-step-subtitle">Decrivez votre besoin pour que nous puissions evaluer sa compatibilite.</div>'+
'<div class="pp-field-group"><label for="project_type">Quel projet souhaitez-vous financer ?</label><select id="project_type" name="project_type"><option value="" disabled selected>Choisir un type de projet</option><option value="creation">Creer une entreprise</option><option value="developpement">Developper une entreprise existante</option><option value="equipement">Acheter du materiel ou des vehicules</option><option value="travaux">Realiser des travaux ou amenagements</option><option value="immobilier">Acheter des locaux professionnels</option><option value="reprise">Reprendre une entreprise ou un fonds de commerce</option><option value="bfr">Financer le besoin en fonds de roulement</option><option value="tresorerie">Besoin de tresorerie ponctuel</option><option value="refinancement">Refinancer des dettes existantes</option><option value="autre">Autre projet</option></select></div>'+
'<div class="pp-field-group"><label for="requested_amount">Quel montant souhaitez-vous emprunter ?</label><div class="pp-money-wrapper"><input type="number" id="requested_amount" name="requested_amount" placeholder="ex : 150 000" min="10000" required><span class="pp-currency">€</span></div><span class="pp-hint">Montant recherche entre 25 000 € et 2 000 000 €</span></div>'+
'<div class="pp-field-group"><label for="total_cost">Quel est le cout total de votre projet ?</label><span class="pp-hint">Incluez investissements, travaux, frais, stocks et besoin de tresorerie initial</span><div class="pp-money-wrapper"><input type="number" id="total_cost" name="total_cost" placeholder="ex : 200 000" min="0"><span class="pp-currency">€</span></div></div>'+
'<div class="pp-btn-row"><button type="button" class="pp-btn pp-btn-secondary" onclick="prevStep(2)">Retour</button><button type="button" class="pp-btn pp-btn-primary" onclick="nextStep(2)">Continuer</button></div></div>'+

/* === ETAPE 3 : Financement === */
'<div class="pp-step" data-step="3"><div class="pp-step-title">Votre plan de financement</div><div class="pp-step-subtitle">L\'apport personnel est un element cle pour les partenaires bancaires.</div>'+
'<div class="pp-field-group"><label for="available_contribution">Quel montant apportez-vous au projet ?</label><span class="pp-hint">Capital, compte courant d\'associe, epargne investie, pret d\'honneur ou subvention accordee</span><div class="pp-money-wrapper"><input type="number" id="available_contribution" name="available_contribution" placeholder="ex : 50 000" min="0"><span class="pp-currency">€</span></div></div>'+
'<div class="pp-field-group" id="contribution-source-field" style="display:none;"><label>Quelle est l\'origine principale de cet apport ?</label><select id="contribution_source" name="contribution_source"><option value="" disabled selected>Choisir</option><option value="capital">Capital / Fonds propres</option><option value="cca">Compte courant d\'associe</option><option value="epargne">Epargne personnelle</option><option value="investisseur">Investisseur</option><option value="pret_honneur">Pret d\'honneur</option><option value="subvention">Subvention accordee</option><option value="credit_vendeur">Credit-vendeur</option><option value="autre_confirme">Autre financement confirme</option></select></div>'+
'<div class="pp-field-group"><label for="funds_needed">Quand avez-vous besoin des fonds ?</label><select id="funds_needed" name="funds_needed"><option value="" disabled selected>Choisir une echeance</option><option value="15j">Moins de 15 jours</option><option value="1m">Entre 15 jours et 1 mois</option><option value="3m">Entre 1 et 3 mois</option><option value="6m">Entre 3 et 6 mois</option><option value="6m+">Plus de 6 mois</option><option value="indetermine">Pas de date precise</option></select></div>'+
'<div class="pp-btn-row"><button type="button" class="pp-btn pp-btn-secondary" onclick="prevStep(3)">Retour</button><button type="button" class="pp-btn pp-btn-primary" onclick="nextStep(3)">Continuer</button></div></div>'+

/* === ETAPE 4 : Situation === */
'<div class="pp-step" data-step="4"><div class="pp-step-title">Votre situation actuelle</div><div class="pp-step-subtitle">Dernieres verifications. Ces elements sont determinants pour l\'analyse.</div>'+
'<div class="pp-field-group" id="exercice-clos-field"><label>Avez-vous deja cloture au moins un exercice fiscal ?</label><span class="pp-hint">Un exercice clos = comptes annuels deposes.</span><div class="pp-radio-group"><label class="pp-radio-option"><input type="radio" name="exercice_clos" value="1"> Oui</label><label class="pp-radio-option"><input type="radio" name="exercice_clos" value="0"> Non</label><label class="pp-radio-option"><input type="radio" name="exercice_clos" value="nsp"> Ne sais pas</label></div></div>'+
'<div class="pp-field-group" id="revenue-field"><label for="revenue_ttm">Quel est votre chiffre d\'affaires sur les 12 derniers mois ?</label><div class="pp-money-wrapper"><input type="number" id="revenue_ttm" name="revenue_ttm" placeholder="ex : 500 000" min="0"><span class="pp-currency">€</span></div></div>'+
'<div class="pp-field-group" id="revenue-trend-field"><label>Comment votre chiffre d\'affaires evolue-t-il par rapport a l\'annee precedente ?</label><div class="pp-radio-group"><label class="pp-radio-option"><input type="radio" name="revenue_trend" value="hausse_forte"> Hausse de plus de 20 %</label><label class="pp-radio-option"><input type="radio" name="revenue_trend" value="hausse_moderee"> Hausse de 5 a 20 %</label><label class="pp-radio-option"><input type="radio" name="revenue_trend" value="stable"> Stable (−5 % a +5 %)</label><label class="pp-radio-option"><input type="radio" name="revenue_trend" value="baisse_moderee"> Baisse de 5 a 20 %</label><label class="pp-radio-option"><input type="radio" name="revenue_trend" value="baisse_forte"> Baisse de plus de 20 %</label><label class="pp-radio-option"><input type="radio" name="revenue_trend" value="nsp"> Je ne sais pas / Trop recent</label></div></div>'+
'<div class="pp-field-group" id="cashgen-field"><label for="annual_cash_generation">Quel montant votre activite genere-t-elle chaque annee avant remboursement d\'emprunts ?</label><span class="pp-hint">EBE, CAF ou capacite d\'autofinancement. En cas de doute, laissez vide.</span><div class="pp-money-wrapper"><input type="number" id="annual_cash_generation" name="annual_cash_generation" placeholder="ex : 80 000 (ou laisser vide)"><span class="pp-currency">€</span></div><div style="margin-top:0.5rem;"><label class="pp-checkbox-option"><input type="checkbox" id="cashgen_nsp" name="cashgen_nsp"> Je ne connais pas ce montant</label></div></div>'+
'<div class="pp-field-group" id="debt-field"><label for="existing_debt_service">Combien votre entreprise rembourse-t-elle deja chaque annee ?</label><span class="pp-hint">Emprunts bancaires, credits-bails, locations financieres. Incluez capital + interets.</span><div class="pp-money-wrapper"><input type="number" id="existing_debt_service" name="existing_debt_service" placeholder="ex : 30 000 (ou 0)" min="0"><span class="pp-currency">€</span></div></div>'+
'<div class="pp-field-group" id="cashpos-field"><label>Quelle est votre situation de tresorerie actuelle ?</label><div class="pp-radio-group"><label class="pp-radio-option"><input type="radio" name="cash_position" value="positive"> Tresorerie positive, sans decouvert</label><label class="pp-radio-option"><input type="radio" name="cash_position" value="faible"> Tresorerie positive mais faible</label><label class="pp-radio-option"><input type="radio" name="cash_position" value="decouvert_ponctuel"> Decouvert utilise ponctuellement</label><label class="pp-radio-option"><input type="radio" name="cash_position" value="decouvert_perm"> Decouvert utilise presque en permanence</label><label class="pp-radio-option"><input type="radio" name="cash_position" value="depassements"> Depassements ou rejets reguliers</label><label class="pp-radio-option"><input type="radio" name="cash_position" value="nsp"> Je ne sais pas</label></div></div>'+
'<div class="pp-field-group"><label>Votre entreprise connait-elle l\'une de ces situations ?</label><span class="pp-hint">Cochez tout ce qui s\'applique</span><div class="pp-checkbox-group" id="adverse-events-group"><label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="none" checked> Aucune de ces situations</label><label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="fp_negatifs"> Capitaux propres negatifs</label><label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="retards_fiscaux"> Retards de paiement fiscaux</label><label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="retards_sociaux"> Retards URSSAF ou sociaux</label><label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="echeancier"> Echeancier fiscal ou social en cours</label><label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="rejets_bancaires"> Rejets ou impayes bancaires</label><label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="procedure_collective"> Procedure de sauvegarde, redressement ou conciliation</label><label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="liquidation"> Liquidation judiciaire</label><label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="nsp"> Je ne sais pas</label></div></div>'+
'<div class="pp-field-group"><label>Avez-vous un expert-comptable ?</label><div class="pp-radio-group" id="ec-group"><label class="pp-radio-option"><input type="radio" name="expert_comptable" value="oui_coords"> Oui, je peux communiquer ses coordonnees</label><label class="pp-radio-option"><input type="radio" name="expert_comptable" value="oui_sans"> Oui, sans les coordonnees sous la main</label><label class="pp-radio-option"><input type="radio" name="expert_comptable" value="non"> Non</label></div></div>'+
'<div id="ec-coords" style="display:none;"><div class="pp-field-group"><label for="ec_nom">Nom du cabinet ou de l\'expert-comptable</label><input type="text" id="ec_nom" name="ec_nom" placeholder="ex : Cabinet Dupont"></div><div class="pp-field-group"><label for="ec_tel">Telephone</label><input type="tel" id="ec_tel" name="ec_tel" placeholder="ex : 01 23 45 67 89"></div><div class="pp-field-group"><label for="ec_email">Email</label><input type="email" id="ec_email" name="ec_email" placeholder="ex : comptable@cabinet.fr"></div></div>'+
'<div class="pp-btn-row"><button type="button" class="pp-btn pp-btn-secondary" onclick="prevStep(4)">Retour</button><button type="button" class="pp-btn pp-btn-primary" onclick="nextStep(4)">Continuer</button></div></div>'+

/* === ETAPE 5 : Email + Submit === */
'<div class="pp-step" data-step="5"><div class="pp-step-title">Vos coordonnees</div><div class="pp-step-subtitle">Derniere etape : recevez votre diagnostic</div>'+
'<div class="pp-field-group"><label for="email">Votre adresse e-mail professionnelle</label><input type="email" id="email" name="email" placeholder="prenom@entreprise.fr" required><div class="pp-field-error" id="email-error">Veuillez entrer une adresse email valide.</div></div>'+
'<div class="pp-field-group"><label class="pp-checkbox-option" id="rgpd-wrap"><input type="checkbox" id="rgpd_consent" name="rgpd_consent" required><span>J\'accepte que Reki traite mes donnees pour evaluer l\'eligibilite de mon projet. <a href="https://www.reki.eu/politique-de-confidentialite" target="_blank" style="color:var(--pp-brand-yellow-900);text-decoration:underline;">Politique de confidentialite</a></span></label><div class="pp-field-error" id="rgpd-error">Vous devez accepter pour continuer.</div></div>'+
'<div class="pp-btn-row"><button type="button" class="pp-btn pp-btn-secondary" onclick="prevStep(5)">Retour</button><button type="button" class="pp-btn pp-btn-primary" id="submit-btn" onclick="submitForm()">Obtenir mon evaluation</button></div></div>'+

'</form>'+
'<div id="pp-verdict-screen" style="display:none;"><div class="pp-verdict"><div class="pp-verdict-icon" id="pp-verdict-icon"></div><h2 id="pp-verdict-title"></h2><p id="pp-verdict-msg"></p><div id="pp-verdict-estimations"></div><div class="pp-reasons-box"><ul id="pp-verdict-reasons"></ul></div><div class="pp-btn-row" style="flex-direction:column;gap:0.5rem;"><a href="https://www.reki.eu" class="pp-btn pp-btn-primary">Retour au site</a></div></div></div>'+
'</div></section>'+
'<footer class="pp-footer"><div class="pp-footer-inner"><div class="pp-footer-brand"><a href="https://www.reki.eu" class="pp-navbar-logo" aria-label="Reki"><img src="https://cdn.prod.website-files.com/66e83aa7dfde79e2181aec17/67f643c671467ca4c3c34118_LOGO_WEBCLIP.png" alt="Reki" class="pp-logo-icon"><img src="https://cdn.prod.website-files.com/66e83aa7dfde79e2181aec17/67f64110b3be61bad2bbe5b1_TEXT@2x.svg" alt="Reki" class="pp-logo-text"></a></div><div class="pp-footer-links"><a href="https://www.reki.eu/politique-de-confidentialite" target="_blank">Confidentialite</a><a href="https://www.reki.eu/mentions-legales" target="_blank">Mentions legales</a><a href="mailto:contact@reki.eu">Contact</a></div><div class="pp-footer-copy">© 2026 Reki — Tous droits reserves</div></div></footer>';

  document.getElementById('pp-form').innerHTML = FORM_HTML;

  // ============ State ============
  var currentStep = 1;
  var totalSteps = 5;
  var isCreation = false;
  var sirenConfirmed = false;

  // ============ Navigation ============
  function showStep(n) {
    var steps = document.querySelectorAll('.pp-step');
    for (var i = 0; i < steps.length; i++) steps[i].classList.remove('pp-active');
    var target = document.querySelector('.pp-step[data-step="' + n + '"]');
    if (target) {
      target.classList.add('pp-active');
      if (typeof n === 'number') { updateProgress(n); currentStep = n; }
      var card = document.querySelector('.pp-form-card');
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.querySelector('.pp-progress').style.display = 'flex';
    }
  }

  function updateProgress(step) {
    var pct = Math.round((step / totalSteps) * 100);
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('progressLabel').textContent = 'Etape ' + step + '/' + totalSteps;
  }

  // ============ SIREN / Creation Mode ============
  function setCreationMode() {
    isCreation = true;
    document.getElementById('siren-mode').style.display = 'none';
    document.getElementById('creation-mode').style.display = 'block';
    var ecf = document.getElementById('exercice-clos-field');
    if (ecf) ecf.style.display = 'none';
  }

  function confirmSiren() { sirenConfirmed = true; }
  function resetSiren() {
    sirenConfirmed = false;
    document.getElementById('siren-confirm').style.display = 'none';
    document.getElementById('siren').value = '';
    document.getElementById('siren').focus();
  }

  document.getElementById('siren').addEventListener('input', function() {
    var val = this.value.replace(/\s/g, '');
    if (val.length === 9 && /^\d{9}$/.test(val)) {
      document.getElementById('siren-name').textContent = 'Entreprise identifiee — SIREN ' + val;
      document.getElementById('siren-info').textContent = 'Les informations publiques seront preremplies.';
      document.getElementById('siren-confirm').style.display = 'block';
    } else {
      document.getElementById('siren-confirm').style.display = 'none';
      sirenConfirmed = false;
    }
  });

  // ============ Validation ============
  function validateStep(step) {
    clearErrors();
    if (step === 5) {
      var email = document.getElementById('email');
      var rgpd = document.getElementById('rgpd_consent');
      var ok = true;
      if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showError('email', 'email-error'); ok = false; }
      if (!rgpd.checked) { showError(null, 'rgpd-error'); ok = false; }
      return ok;
    }
    if (step === 2) {
      var type = document.getElementById('project_type').value;
      if (!type) { alert('Veuillez choisir un type de projet.'); return false; }
      var montant = parseInt(document.getElementById('requested_amount').value) || 0;
      if (montant < 10000) { alert('Le montant minimum est de 10 000 €.'); return false; }
      return true;
    }
    return true;
  }

  function showError(inputId, errorId) {
    if (inputId) document.getElementById(inputId).classList.add('pp-error');
    if (errorId) document.getElementById(errorId).style.display = 'block';
  }
  function clearErrors() {
    var errs = document.querySelectorAll('.pp-error');
    for (var i = 0; i < errs.length; i++) errs[i].classList.remove('pp-error');
    var ferrs = document.querySelectorAll('.pp-field-error');
    for (var j = 0; j < ferrs.length; j++) ferrs[j].style.display = 'none';
  }

  // ============ Step Navigation ============
  function nextStep(from) {
    if (!validateStep(from)) return;
    if (from === 1 && isCreation) {
      var secteur = document.getElementById('creation_secteur');
      if (!secteur.value) { alert('Veuillez choisir un secteur.'); return false; }
    }
    if (from === 1 && !isCreation && !sirenConfirmed) {
      var sirenVal = document.getElementById('siren').value.replace(/\s/g, '');
      if (sirenVal.length !== 9 || !/^\d{9}$/.test(sirenVal)) {
        // Allow proceeding without SIREN confirmation
      }
    }
    if (from === 3) {
      var financialFields = document.querySelectorAll('#revenue-field, #revenue-trend-field, #cashgen-field, #debt-field, #cashpos-field, #exercice-clos-field');
      for (var i = 0; i < financialFields.length; i++) {
        financialFields[i].style.display = isCreation ? 'none' : 'block';
      }
    }
    showStep(from + 1);
  }

  function prevStep(from) { showStep(from - 1); }

  // ============ Checkbox conflicts ============
  document.addEventListener('change', function(e) {
    if (e.target.type === 'radio') {
      var group = e.target.closest('.pp-radio-group');
      if (group) {
        var opts = group.querySelectorAll('.pp-radio-option');
        for (var i = 0; i < opts.length; i++) opts[i].classList.remove('pp-selected');
        e.target.closest('.pp-radio-option').classList.add('pp-selected');
      }
    }
    if (e.target.type === 'checkbox') {
      var opt = e.target.closest('.pp-checkbox-option');
      if (opt) {
        if (e.target.checked) opt.classList.add('pp-selected');
        else opt.classList.remove('pp-selected');
      }
      var cgroup = e.target.closest('.pp-checkbox-group');
      if (cgroup && e.target.name === 'adverse_events') {
        var cbs = cgroup.querySelectorAll('input[type="checkbox"]');
        if (e.target.value === 'none' && e.target.checked) {
          for (var j = 0; j < cbs.length; j++) {
            if (cbs[j].value !== 'none') cbs[j].checked = false;
            cbs[j].closest('.pp-checkbox-option').classList.toggle('pp-selected', cbs[j].checked);
          }
        } else if (e.target.value !== 'none' && e.target.checked) {
          var noneCb = cgroup.querySelector('input[value="none"]');
          if (noneCb) { noneCb.checked = false; noneCb.closest('.pp-checkbox-option').classList.remove('pp-selected'); }
        }
      }
      if (cgroup && e.target.name === 'creation_preuves') {
        var cbs2 = cgroup.querySelectorAll('input[type="checkbox"]');
        if (e.target.value === 'aucune' && e.target.checked) {
          for (var k = 0; k < cbs2.length; k++) {
            if (cbs2[k].value !== 'aucune') cbs2[k].checked = false;
            cbs2[k].closest('.pp-checkbox-option').classList.toggle('pp-selected', cbs2[k].checked);
          }
        } else if (e.target.value !== 'aucune' && e.target.checked) {
          var aucunCb = cgroup.querySelector('input[value="aucune"]');
          if (aucunCb) { aucunCb.checked = false; aucunCb.closest('.pp-checkbox-option').classList.remove('pp-selected'); }
        }
      }
    }
  });

  // ============ Contribution source visibility ============
  document.getElementById('available_contribution').addEventListener('input', function() {
    var val = parseInt(this.value) || 0;
    document.getElementById('contribution-source-field').style.display = val > 0 ? 'block' : 'none';
  });

  // ============ Cashgen NSP toggle ============
  document.getElementById('annual_cash_generation').addEventListener('input', function() {
    if ((parseInt(this.value) || 0) > 0) {
      document.getElementById('cashgen_nsp').checked = false;
      document.getElementById('cashgen_nsp').closest('.pp-checkbox-option').classList.remove('pp-selected');
    }
  });
  document.getElementById('cashgen_nsp').addEventListener('change', function() {
    if (this.checked) document.getElementById('annual_cash_generation').value = '';
  });

  // ============ EC coords toggle ============
  document.getElementById('ec-group').addEventListener('change', function(e) {
    if (e.target.name === 'expert_comptable') {
      document.getElementById('ec-coords').style.display = e.target.value === 'oui_coords' ? 'block' : 'none';
    }
  });

  // ============ SUBMIT ============
  var API_LEAD_URL = 'https://pro.reki.eu/api/lead';
  var API_TIMEOUT_MS = 8000;

  function submitForm() {
    document.querySelector('.pp-progress').style.display = 'none';
    var data = collectData();
    var payload = buildApiPayload(data);
    var submitBtn = document.getElementById('submit-btn');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Analyse en cours...'; }
    var controller = new AbortController();
    var timeoutId = setTimeout(function() { controller.abort(); }, API_TIMEOUT_MS);
    fetch(API_LEAD_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: controller.signal })
      .then(function(response) { clearTimeout(timeoutId); if (!response.ok) throw new Error('API error ' + response.status); return response.json(); })
      .then(function(serverVerdict) { displayServerVerdict(serverVerdict); })
      .catch(function(err) { clearTimeout(timeoutId); console.warn('API indisponible — fallback local:', err.message); displayLocalFallback(); })
      .finally(function() { if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Obtenir mon evaluation'; } });
  }

  function buildApiPayload(data) {
    var adv = data.adverse_events || [];
    var exerciceVal = parseInt(document.querySelector('input[name="exercice_clos"]:checked')?.value);
    return {
      entreprise: { siren: data.siren || '', raison_sociale: '', forme_juridique: '', secteur_naf: data.isCreation ? (data.creation_secteur || '') : '', date_creation: '', anciennete_annees: 0 },
      contact: { nom: '', email: document.getElementById('email')?.value || '', telephone: '', consentement_rgpd: document.getElementById('rgpd_consent')?.checked || false },
      financier: { ca_annuel: data.revenue_ttm || null, ebe_annuel: data.cashgen_unknown ? null : (data.annual_cash_generation || null), dette_financiere: data.existing_debt_service || null, tresorerie_nette: null, exercices_clos: data.isCreation ? 0 : (isNaN(exerciceVal) ? 0 : exerciceVal), capitaux_propres: null, revenue_trend: data.revenue_trend || 'stable' },
      projet: { objet_pret: data.project_type || 'autre', montant_demande: data.requested_amount || 0, apport_personnel: data.available_contribution || 0, duree_souhaitee: 7 },
      flags: { procedure_collective: adv.includes('procedure_collective'), liquidation_judiciaire: adv.includes('liquidation'), retards_fiscaux: adv.includes('retards_fiscaux'), retards_sociaux: adv.includes('retards_sociaux'), rejets_bancaires: adv.includes('rejets_bancaires'), echeancier_en_cours: adv.includes('echeancier'), creation_sans_experience: false, decouvert_ponctuel: false, cash_position_depassements: false, cash_position_decouvert_perm: false, incoherence_pappers_declaratif: false, comptes_publies_degrades: false, historique_dirigeant_liquidations: false, secteur_sensible_non_exclu: false, creation_sans_preuves: false, creation_sans_experience_ni_preuves: false, cashgen_unknown: data.cashgen_unknown || false }
    };
  }

  function collectData() {
    var getRadio = function(name) { var el = document.querySelector('input[name="' + name + '"]:checked'); return el ? el.value : null; };
    var getCheckboxes = function(name) { var els = document.querySelectorAll('input[name="' + name + '"]:checked'); return Array.prototype.map.call(els, function(e) { return e.value; }); };
    var getNum = function(id) { return parseInt(document.getElementById(id)?.value) || 0; };
    var getStr = function(id) { return document.getElementById(id)?.value || ''; };
    return {
      isCreation: isCreation,
      siren: getStr('siren'),
      project_type: getStr('project_type'),
      requested_amount: getNum('requested_amount'),
      total_cost: getNum('total_cost') || getNum('requested_amount'),
      available_contribution: getNum('available_contribution'),
      contribution_source: getStr('contribution_source'),
      funds_needed: getStr('funds_needed'),
      revenue_ttm: getNum('revenue_ttm'),
      revenue_trend: getRadio('revenue_trend'),
      annual_cash_generation: getNum('annual_cash_generation'),
      cashgen_unknown: document.getElementById('cashgen_nsp').checked,
      existing_debt_service: getNum('existing_debt_service'),
      cash_position: getRadio('cash_position'),
      adverse_events: getCheckboxes('adverse_events'),
      expert_comptable: getRadio('expert_comptable'),
      ec_nom: getStr('ec_nom'), ec_tel: getStr('ec_tel'), ec_email: getStr('ec_email'),
      creation_secteur: getStr('creation_secteur'),
      creation_experience: getStr('creation_experience'),
      creation_apport_pct: getRadio('creation_apport_pct'),
      creation_preuves: getCheckboxes('creation_preuves')
    };
  }

  function displayServerVerdict(server) {
    var steps = document.querySelectorAll('.pp-step');
    for (var i = 0; i < steps.length; i++) steps[i].classList.remove('pp-active');
    var screen = document.getElementById('pp-verdict-screen');
    screen.style.display = 'block';
    document.querySelector('.pp-progress').style.display = 'none';
    var est = server.estimations || {};
    var motifs = server.motifs || [];
    var v = server.verdict;
    var icons = {
      decision_favorable: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      etude_approfondie: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
      non_eligible: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
    };
    var colors = { decision_favorable: 'var(--pp-success)', etude_approfondie: 'var(--pp-warning)', non_eligible: 'var(--pp-neural-500)' };
    var titles = { decision_favorable: 'Decision de principe favorable', etude_approfondie: 'Etude approfondie necessaire', non_eligible: 'Projet hors perimetre actuel' };
    var icon = icons[v] || icons.etude_approfondie;
    var color = colors[v] || colors.etude_approfondie;
    var title = titles[v] || titles.etude_approfondie;
    if (server.sous_type === 'sous_conditions') {
      title = 'Decision de principe favorable, sous reserve';
      icon = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
      color = 'var(--pp-brand-yellow-800)';
    }
    document.getElementById('pp-verdict-icon').innerHTML = icon;
    document.getElementById('pp-verdict-icon').style.color = color;
    document.getElementById('pp-verdict-title').textContent = title;
    document.getElementById('pp-verdict-msg').textContent = motifs.length > 0 ? motifs[0] : '';
    document.getElementById('pp-verdict-reasons').innerHTML = motifs.length > 1 ? motifs.slice(1).map(function(r) { return '<li>' + r + '</li>'; }).join('') : '';
    if (est.montant_finançable > 0 || est.mensualite > 0) {
      var mt = est.montant_finançable || 0;
      document.getElementById('pp-verdict-estimations').innerHTML =
        '<div class="pp-estimation-row"><span class="pp-est-label">Montant finançable estime</span><span class="pp-est-value">' + mt.toLocaleString('fr-FR') + ' €</span></div>' +
        '<div class="pp-estimation-row"><span class="pp-est-label">Duree indicative</span><span class="pp-est-value">' + (est.duree || '—') + '</span></div>' +
        '<div class="pp-estimation-row"><span class="pp-est-label">Garanties probables</span><span class="pp-est-value">' + (est.garanties || '—') + '</span></div>' +
        '<div class="pp-estimation-row"><span class="pp-est-label">Mensualite estimee</span><span class="pp-est-value">' + (est.mensualite ? Math.round(est.mensualite).toLocaleString('fr-FR') + ' €/mois' : '—') + '</span></div>';
    } else {
      document.getElementById('pp-verdict-estimations').innerHTML = '';
    }
  }

  function displayLocalFallback() {
    var steps = document.querySelectorAll('.pp-step');
    for (var i = 0; i < steps.length; i++) steps[i].classList.remove('pp-active');
    var screen = document.getElementById('pp-verdict-screen');
    screen.style.display = 'block';
    document.querySelector('.pp-progress').style.display = 'none';
    document.getElementById('pp-verdict-icon').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    document.getElementById('pp-verdict-icon').style.color = 'var(--pp-warning)';
    document.getElementById('pp-verdict-title').textContent = 'Estimation indicative';
    document.getElementById('pp-verdict-msg').textContent = 'Le service d\'analyse est momentanement indisponible. Un conseiller Reki analysera votre dossier et vous contactera dans les meilleurs delais.';
    document.getElementById('pp-verdict-reasons').innerHTML = '';
    var badge = document.createElement('div');
    badge.style.cssText = 'margin-top:1rem;padding:0.5rem 1rem;background:var(--pp-brand-yellow-tag-bg);color:var(--pp-brand-yellow-900);border-radius:var(--pp-radius-pill);font-size:var(--pp-fs-xs);text-align:center;';
    badge.textContent = '\u26A0 Estimation indicative';
    document.getElementById('pp-verdict-estimations').innerHTML = '';
    document.getElementById('pp-verdict-estimations').appendChild(badge);
  }

  // ============ Pre-fill from URL params ============
  (function() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('siren')) {
      var sirenEl = document.getElementById('siren');
      if (sirenEl) { sirenEl.value = params.get('siren'); sirenEl.dispatchEvent(new Event('input')); }
    }
    if (params.get('requested_amount')) document.getElementById('requested_amount').value = params.get('requested_amount');
    if (params.get('project_type')) document.getElementById('project_type').value = params.get('project_type');
    ['email'].forEach(function(key) {
      if (params.get(key)) { var el = document.getElementById(key); if (el) el.value = params.get(key); }
    });
  })();

  // ============ Expose functions globally ============
  window.nextStep = nextStep;
  window.prevStep = prevStep;
  window.showStep = showStep;
  window.setCreationMode = setCreationMode;
  window.confirmSiren = confirmSiren;
  window.resetSiren = resetSiren;
  window.submitForm = submitForm;
  window.collectData = collectData;

})();
