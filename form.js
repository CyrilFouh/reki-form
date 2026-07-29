/**
 * PretPro — Formulaire de prequalification (extracted from V1)
 * Injecte le formulaire dans #pp-form.
 */
(function() {
  'use strict';

  // ── Build form HTML ──
  var FORM_HTML = `<nav class="pp-navbar">    <div class="pp-navbar-inner">
      <a href="https://www.reki.eu" class="pp-navbar-logo" aria-label="Reki">
        <img src="https://cdn.prod.website-files.com/66e83aa7dfde79e2181aec17/67f643c671467ca4c3c34118_LOGO_WEBCLIP.png" alt="Reki" class="pp-logo-icon">
        <img src="https://cdn.prod.website-files.com/66e83aa7dfde79e2181aec17/67f64110b3be61bad2bbe5b1_TEXT@2x.svg" alt="Reki" class="pp-logo-text">
      </a>
      <a href="https://www.reki.eu" class="pp-navbar-back">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Retour au site
      </a>
    </div>
  </nav>

  <section class="pp-hero">
    <div class="pp-hero-inner">
      <span class="pp-hero-tag">Pré-diagnostic gratuit — 2 min</span>
      <h1>Votre projet est-il <span class="pp-brand-text">compatible avec un financement</span> bancaire ?</h1>
      <p>Un pré-diagnostic immédiat, des estimations personnalisées, et une orientation vers le bon parcours.</p>
    </div>
  </section>

  <section class="pp-form-section">
    <div class="pp-form-card">
      <div class="pp-progress">
        <div class="pp-progress-bar"><div class="pp-progress-fill" id="progressFill"></div></div>
        <span class="pp-progress-label" id="progressLabel">Étape 1/6</span>
      </div>

      <form id="rekiForm" novalidate>

        <!-- ===== ÉTAPE 1 — Identification ===== -->
        <div class="pp-step pp-active" data-step="1">
          <div class="pp-step-title">Votre entreprise</div>
          <div class="pp-step-subtitle">Entrez votre SIREN ou déclarez une création</div>
          <div id="siren-mode">
            <div class="pp-field-group"><label for="siren">Numéro SIREN</label><span class="pp-hint">9 chiffres</span><input type="text" id="siren" name="siren" placeholder="ex : 123 456 789" maxlength="9" autocomplete="off" inputmode="numeric" pattern="[0-9]{9}"></div>
            <div class="pp-field-group" style="margin-top:-0.25rem;"><button type="button" class="pp-btn pp-btn-outline" onclick="setCreationMode()" style="width:auto;font-size:var(--pp-fs-s);">Je n'ai pas encore d'entreprise</button></div>
            <div id="siren-confirm" style="display:none;" class="pp-company-confirm"><div class="pp-name" id="siren-name">—</div><div class="pp-info" id="siren-info">—</div><div style="margin-top:0.75rem;display:flex;gap:0.5rem;"><button type="button" class="pp-btn pp-btn-outline" onclick="confirmSiren()" style="font-size:var(--pp-fs-s);flex:1;">Oui</button><button type="button" class="pp-btn pp-btn-secondary" onclick="resetSiren()" style="font-size:var(--pp-fs-s);flex:1;">Non</button></div></div>
          </div>
          <div id="creation-mode" style="display:none;"><div class="pp-company-confirm"><div class="pp-name">Entreprise en création</div><div class="pp-info">Parcours adapté aux porteurs de projet.</div></div><div class="pp-field-group"><label for="creation_secteur">Secteur</label><select id="creation_secteur" name="creation_secteur"><option value="">Sélectionnez</option><option value="informatique">Informatique</option><option value="commerce">Commerce</option><option value="industrie">Industrie</option><option value="btp">BTP</option><option value="services">Services</option><option value="sante">Santé</option><option value="hotellerie">Hôtellerie</option><option value="transport">Transport</option><option value="autre">Autre</option></select></div></div>
          <div class="pp-btn-row"><button type="button" class="pp-btn pp-btn-primary" onclick="nextStep(1)">Continuer</button></div>
        </div>

        <div class="pp-step" data-step="2"><div class="pp-step-title">Votre projet de financement</div>
          <div class="pp-step-subtitle">Décrivez votre besoin pour que nous puissions évaluer sa compatibilité.</div>

          <div class="pp-field-group">
            <label for="project_type">Quel projet souhaitez-vous financer ?</label>
            <select id="project_type" name="project_type" onchange="updateProjectHints()">
              <option value="" disabled selected>Choisir un type de projet</option>
              <option value="creation">Créer une entreprise</option>
              <option value="developpement">Développer une entreprise existante</option>
              <option value="equipement">Acheter du matériel ou des véhicules</option>
              <option value="travaux">Réaliser des travaux ou aménagements</option>
              <option value="immobilier">Acheter des locaux professionnels</option>
              <option value="reprise">Reprendre une entreprise ou un fonds de commerce</option>
              <option value="bfr">Financer le besoin en fonds de roulement</option>
              <option value="tresorerie">Besoin de trésorerie ponctuel</option>
              <option value="refinancement">Refinancer des dettes existantes</option>
              <option value="autre">Autre projet</option>
            </select>
          </div>

          <div class="pp-field-group">
            <label for="requested_amount">Quel montant souhaitez-vous emprunter ?</label>
            <div class="pp-money-wrapper">
              <input type="number" id="requested_amount" name="requested_amount" placeholder="ex : 150 000" min="10000" required>
              <span class="pp-currency">€</span>
            </div>
            <span class="pp-hint">Montant recherché entre 25 000 € et 2 000 000 €</span>
          </div>

          <div class="pp-field-group">
            <label for="total_cost">Quel est le coût total de votre projet ?</label>
            <span class="pp-hint">Incluez investissements, travaux, frais, stocks et besoin de trésorerie initial</span>
            <div class="pp-money-wrapper">
              <input type="number" id="total_cost" name="total_cost" placeholder="ex : 200 000" min="0">
              <span class="pp-currency">€</span>
            </div>
          </div>

          <div class="pp-btn-row">
            <button type="button" class="pp-btn pp-btn-secondary" onclick="prevStep(2)">Retour</button>
            <button type="button" class="pp-btn pp-btn-primary" onclick="nextStep(2)">Continuer</button>
          </div>
        </div>

        <!-- ===== ÉTAPE 3 — Financement ===== -->

        <div class="pp-step" data-step="3"><div class="pp-step-title">Votre plan de financement</div>
          <div class="pp-step-subtitle">L'apport personnel est un élément clé pour les partenaires bancaires.</div>

          <div class="pp-field-group">
            <label for="available_contribution">Quel montant apportez-vous au projet ?</label>
            <span class="pp-hint">Capital, compte courant d'associé, épargne investie, prêt d'honneur ou subvention accordée</span>
            <div class="pp-money-wrapper">
              <input type="number" id="available_contribution" name="available_contribution" placeholder="ex : 50 000" min="0">
              <span class="pp-currency">€</span>
            </div>
          </div>

          <div class="pp-field-group" id="contribution-source-field">
            <label>Quelle est l'origine principale de cet apport ?</label>
            <select id="contribution_source" name="contribution_source">
              <option value="" disabled selected>Choisir</option>
              <option value="capital">Capital / Fonds propres</option>
              <option value="cca">Compte courant d'associé</option>
              <option value="epargne">Épargne personnelle</option>
              <option value="investisseur">Investisseur</option>
              <option value="pret_honneur">Prêt d'honneur</option>
              <option value="subvention">Subvention accordée</option>
              <option value="credit_vendeur">Crédit-vendeur</option>
              <option value="autre_confirme">Autre financement confirmé</option>
            </select>
          </div>

          <div class="pp-field-group">
            <label for="funds_needed">Quand avez-vous besoin des fonds ?</label>
            <select id="funds_needed" name="funds_needed">
              <option value="" disabled selected>Choisir une échéance</option>
              <option value="15j">Moins de 15 jours</option>
              <option value="1m">Entre 15 jours et 1 mois</option>
              <option value="3m">Entre 1 et 3 mois</option>
              <option value="6m">Entre 3 et 6 mois</option>
              <option value="6m+">Plus de 6 mois</option>
              <option value="indetermine">Pas de date précise</option>
            </select>
          </div>

          <div class="pp-btn-row">
            <button type="button" class="pp-btn pp-btn-secondary" onclick="prevStep(3)">Retour</button>
            <button type="button" class="pp-btn pp-btn-primary" onclick="nextStep(3)">Continuer</button>
          </div>
        </div>

        <!-- ===== ÉTAPE 4 — Activité financière ===== -->

        <div class="pp-step" data-step="4"><div class="pp-step-title">Votre activité financière</div>
          <div class="pp-step-subtitle">Ces données permettent d'évaluer la capacité de remboursement. Répondez au mieux.</div>

          <div class="pp-field-group" id="revenue-field">
            <label for="revenue_ttm">Quel est votre chiffre d'affaires sur les 12 derniers mois ?</label>
            <div class="pp-money-wrapper">
              <input type="number" id="revenue_ttm" name="revenue_ttm" placeholder="ex : 500 000" min="0">
              <span class="pp-currency">€</span>
            </div>
          </div>

          <div class="pp-field-group" id="revenue-trend-field">
            <label>Comment votre chiffre d'affaires évolue-t-il par rapport à l'année précédente ?</label>
            <div class="pp-radio-group">
              <label class="pp-radio-option"><input type="radio" name="revenue_trend" value="hausse_forte"> Hausse de plus de 20 %</label>
              <label class="pp-radio-option"><input type="radio" name="revenue_trend" value="hausse_moderee"> Hausse de 5 à 20 %</label>
              <label class="pp-radio-option"><input type="radio" name="revenue_trend" value="stable"> Stable (−5 % à +5 %)</label>
              <label class="pp-radio-option"><input type="radio" name="revenue_trend" value="baisse_moderee"> Baisse de 5 à 20 %</label>
              <label class="pp-radio-option"><input type="radio" name="revenue_trend" value="baisse_forte"> Baisse de plus de 20 %</label>
              <label class="pp-radio-option"><input type="radio" name="revenue_trend" value="nsp"> Je ne sais pas / Trop récent</label>
            </div>
          </div>

          <div class="pp-field-group" id="cashgen-field">
            <label for="annual_cash_generation">Quel montant votre activité génère-t-elle chaque année avant remboursement d'emprunts ?</label>
            <span class="pp-hint">Vous pouvez indiquer votre EBE, CAF ou capacité d'autofinancement. En cas de doute, laissez vide.</span>
            <div class="pp-money-wrapper">
              <input type="number" id="annual_cash_generation" name="annual_cash_generation" placeholder="ex : 80 000 (ou laisser vide)">
              <span class="pp-currency">€</span>
            </div>
            <div style="margin-top:0.5rem;">
              <label class="pp-checkbox-option"><input type="checkbox" id="cashgen_nsp" name="cashgen_nsp"> Je ne connais pas ce montant</label>
            </div>
          </div>

          <div class="pp-field-group" id="debt-field">
            <label for="existing_debt_service">Combien votre entreprise rembourse-t-elle déjà chaque année ?</label>
            <span class="pp-hint">Emprunts bancaires, crédits-bails, locations financières. Incluez capital + intérêts.</span>
            <div class="pp-money-wrapper">
              <input type="number" id="existing_debt_service" name="existing_debt_service" placeholder="ex : 30 000 (ou 0)" min="0">
              <span class="pp-currency">€</span>
            </div>
          </div>

          
<div class="pp-field-group"><label>Avez-vous déjà clôturé au moins un exercice fiscal ?</label><span class="pp-hint">Un exercice clos = comptes annuels déposés.</span><div class="pp-radio-group"><label class="pp-radio-option"><input type="radio" name="exercice_clos" value="1"> Oui</label><label class="pp-radio-option"><input type="radio" name="exercice_clos" value="0"> Non</label><label class="pp-radio-option"><input type="radio" name="exercice_clos" value="nsp"> Ne sais pas</label></div></div>
<div class="pp-step-title">Votre situation actuelle</div>
          <div class="pp-step-subtitle">Dernières vérifications. Ces éléments sont déterminants pour l'analyse.</div>

          <div class="pp-field-group" id="cashpos-field">
            <label>Quelle est votre situation de trésorerie actuelle ?</label>
            <div class="pp-radio-group">
              <label class="pp-radio-option"><input type="radio" name="cash_position" value="positive"> Trésorerie positive, sans découvert</label>
              <label class="pp-radio-option"><input type="radio" name="cash_position" value="faible"> Trésorerie positive mais faible</label>
              <label class="pp-radio-option"><input type="radio" name="cash_position" value="decouvert_ponctuel"> Découvert utilisé ponctuellement</label>
              <label class="pp-radio-option"><input type="radio" name="cash_position" value="decouvert_perm"> Découvert utilisé presque en permanence</label>
              <label class="pp-radio-option"><input type="radio" name="cash_position" value="depassements"> Dépassements ou rejets réguliers</label>
              <label class="pp-radio-option"><input type="radio" name="cash_position" value="nsp"> Je ne sais pas</label>
            </div>
          </div>

          <div class="pp-field-group">
            <label>Votre entreprise connaît-elle l'une de ces situations ?</label>
            <span class="pp-hint">Cochez tout ce qui s'applique</span>
            <div class="pp-checkbox-group" id="adverse-events-group">
              <label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="none" checked> Aucune de ces situations</label>
              <label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="fp_negatifs"> Capitaux propres négatifs</label>
              <label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="retards_fiscaux"> Retards de paiement fiscaux</label>
              <label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="retards_sociaux"> Retards URSSAF ou sociaux</label>
              <label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="echeancier"> Échéancier fiscal ou social en cours</label>
              <label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="rejets_bancaires"> Rejets ou impayés bancaires</label>
              <label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="procedure_collective"> Procédure de sauvegarde, redressement ou conciliation</label>
              <label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="liquidation"> Liquidation judiciaire</label>
              <label class="pp-checkbox-option"><input type="checkbox" name="adverse_events" value="nsp"> Je ne sais pas</label>
            </div>
          </div>

          <div class="pp-field-group">
            <label>Avez-vous un expert-comptable ?</label>
            <div class="pp-radio-group" id="ec-group">
              <label class="pp-radio-option"><input type="radio" name="expert_comptable" value="oui_coords"> Oui, je peux communiquer ses coordonnées</label>
              <label class="pp-radio-option"><input type="radio" name="expert_comptable" value="oui_sans"> Oui, sans les coordonnées sous la main</label>
              <label class="pp-radio-option"><input type="radio" name="expert_comptable" value="non"> Non</label>
            </div>
          </div>

          <div id="ec-coords" style="display:none;">
            <div class="pp-field-group">
              <label for="ec_nom">Nom du cabinet ou de l'expert-comptable</label>
              <input type="text" id="ec_nom" name="ec_nom" placeholder="ex : Cabinet Dupont">
            </div>
            <div class="pp-field-group">
              <label for="ec_tel">Téléphone</label>
              <input type="tel" id="ec_tel" name="ec_tel" placeholder="ex : 01 23 45 67 89">
            </div>
            <div class="pp-field-group">
              <label for="ec_email">Email</label>
              <input type="email" id="ec_email" name="ec_email" placeholder="ex : comptable@cabinet.fr">
            </div>
          </div>

          
<div class="pp-btn-row"><button type="button" class="pp-btn pp-btn-secondary" onclick="prevStep(4)">Retour</button><button type="button" class="pp-btn pp-btn-primary" onclick="nextStep(4)">Continuer</button></div>
        </div>        <div class="pp-step" data-step="5">
          <div class="pp-step-title">Vos coordonnées</div>
          <div class="pp-step-subtitle">Dernière étape : recevez votre diagnostic</div>
          <div class="pp-field-group"><label for="email">Adresse e-mail</label><input type="email" id="email" name="email" placeholder="prenom@entreprise.fr" required><div class="pp-field-error" id="email-error">Email invalide</div></div>
          <div class="pp-field-group"><div class="pp-checkbox-option"><input type="checkbox" id="rgpd_consent" name="rgpd_consent" required><label for="rgpd_consent" style="margin-bottom:0;font-weight:400;cursor:pointer;">J'accepte le traitement de mes données <a href="https://www.reki.eu/politique-de-confidentialite" style="color:var(--pp-brand-yellow-900);text-decoration:underline;">Politique de confidentialité</a></label></div><div class="pp-field-error" id="rgpd-error">Requis</div></div>
          <div class="pp-btn-row"><button type="button" class="pp-btn pp-btn-secondary" onclick="prevStep(5)">Retour</button><button type="button" class="pp-btn pp-btn-primary" onclick="submitForm()">Obtenir mon évaluation</button></div>
        </div></form>

      <div id="pp-verdict-screen" style="display:none;">
        <div class="pp-verdict"><div class="pp-verdict-icon" id="pp-verdict-icon"></div><h2 id="pp-verdict-title"></h2><p id="pp-verdict-msg"></p><div id="pp-verdict-estimations"></div><div class="pp-reasons-box"><ul id="pp-verdict-reasons"></ul></div><div class="pp-btn-row" style="flex-direction:column;gap:0.5rem;"><a href="https://www.reki.eu" class="pp-btn pp-btn-primary">Retour au site</a></div></div>
      </div>

  <footer class="pp-footer">
    <div class="pp-footer-inner">
      <div class="pp-footer-brand">
        <a href="https://www.reki.eu" class="pp-navbar-logo" aria-label="Reki">
          <img src="https://cdn.prod.website-files.com/66e83aa7dfde79e2181aec17/67f643c671467ca4c3c34118_LOGO_WEBCLIP.png" alt="Reki" class="pp-logo-icon">
          <img src="https://cdn.prod.website-files.com/66e83aa7dfde79e2181aec17/67f64110b3be61bad2bbe5b1_TEXT@2x.svg" alt="Reki" class="pp-logo-text">
        </a>
      </div>
      <div class="pp-footer-links">
        <a href="https://www.reki.eu/politique-de-confidentialite" target="_blank">Confidentialité</a>
        <a href="https://www.reki.eu/mentions-legales" target="_blank">Mentions légales</a>
        <a href="mailto:contact@reki.eu">Contact</a>
      </div>
      <div class="pp-footer-copy">© 2026 Reki — Tous droits réservés</div>
    </div>
  </footer>
    </div>
  </section>`;
  document.getElementById('pp-form').innerHTML = FORM_HTML;

// ============ State ============
    let currentStep = 1;
    const totalSteps = 5;
    let isCreation = false;
    let sirenConfirmed = false;

    // ============ Navigation ============
    function showStep(n) {
      document.querySelectorAll('.pp-step').forEach(s => s.classList.remove('pp-active'));
      const target = document.querySelector(`.pp-step[data-step="${n}"]`);
      if (target) {
        target.classList.add('pp-active');
        if (typeof n === 'number') { updateProgress(n); currentStep = n; }
        document.querySelector('.pp-form-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelector('.pp-progress').style.display = 'flex';
      }
    }

    function updateProgress(step) {
      const pct = Math.round((step / totalSteps) * 100);
      document.getElementById('progressFill').style.width = pct + '%';
      document.getElementById('progressLabel').textContent = `Étape ${step}/${totalSteps}`;
    }

    // ============ SIREN / Creation Mode ============
    function setCreationMode() {
      isCreation = true;
      document.getElementById('siren-mode').style.display = 'none';
      document.getElementById('creation-mode').style.display = 'block';
    }

    function confirmSiren() { sirenConfirmed = true; }
    function resetSiren() {
      sirenConfirmed = false;
      document.getElementById('siren-confirm').style.display = 'none';
      document.getElementById('siren').value = '';
      document.getElementById('siren').focus();
    }

    document.getElementById('siren').addEventListener('input', function() {
      const val = this.value.replace(/\s/g, '');
      if (val.length === 9 && /^\d{9}$/.test(val)) {
        // Mock SIREN confirmation (en production : appel API Pappers)
        document.getElementById('siren-name').textContent = 'Entreprise identifiée — SIREN ' + val;
        document.getElementById('siren-info').textContent = 'Les informations publiques seront préremplies lors de la connexion à l\'API.';
        document.getElementById('siren-confirm').style.display = 'block';
      } else {
        document.getElementById('siren-confirm').style.display = 'none';
        sirenConfirmed = false;
      }
      // Show creation button only when SIREN is empty
      isCreation = (val === '');
      if (isCreation) {
        document.querySelector('#siren-mode .btn-outline').style.display = 'inline-flex';
      }
    });

    // ============ Validation ============
    function validateStep(step) {
      clearErrors();
      if (step === 5) {
        const email = document.getElementById('email');
        const rgpd = document.getElementById('rgpd_consent');
        let ok = true;
        if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showError('email', 'email-error'); ok = false; }
        if (!rgpd.checked) { showError(null, 'rgpd-error'); ok = false; }
        return ok;
      }
      if (step === 2 && isCreation) {
        // Validate creation fields exist
        const secteur = document.getElementById('creation_secteur');
        if (!secteur.value) { showError('creation_secteur', null); return false; }
      }
      if (step === 3) {
        const montant = parseInt(document.getElementById('requested_amount').value) || 0;
        if (montant < 10000) { alert('Le montant minimum est de 10 000 €.'); return false; }
        const type = document.getElementById('project_type').value;
        if (!type) { alert('Veuillez choisir un type de projet.'); return false; }
      }
      return true;
    }

    function showError(inputId, errorId) {
      if (inputId) document.getElementById(inputId).classList.add('pp-error');
      if (errorId) document.getElementById(errorId).style.display = 'block';
    }
    function clearErrors() {
      document.querySelectorAll('.pp-error').forEach(e => e.classList.remove('pp-error'));
      document.querySelectorAll('.pp-field-error').forEach(e => e.style.display = 'none');
    }

    // ============ Step Navigation ============
    function nextStep(from) {
      if (!validateStep(from)) return;
      
      if (from === 2) {
        // Show/hide financial fields based on creation mode
        const financialFields = document.querySelectorAll('#revenue-field, #revenue-trend-field, #cashgen-field, #debt-field, #cashpos-field');
        financialFields.forEach(f => f.style.display = isCreation ? 'none' : 'block');
      }
      
      showStep(from + 1);
    }

    function prevStep(from) { showStep(from - 1); }

    function backFromVerdict() {
      document.querySelector('.pp-progress').style.display = 'flex';
      showStep(6); // Retour à la dernière étape
    }

    // ============ Checkbox conflicts: "none" / "nsp" ============
    document.addEventListener('change', function(e) {
      if (e.target.type === 'radio') {
        const group = e.target.closest('.pp-radio-group');
        if (group) {
          group.querySelectorAll('.pp-radio-option').forEach(opt => opt.classList.remove('pp-selected'));
          e.target.closest('.pp-radio-option').classList.add('pp-selected');
        }
      }
      if (e.target.type === 'checkbox') {
        e.target.closest('.pp-checkbox-option')?.classList.toggle('selected', e.target.checked);
        
        // Handle "none" / "nsp" mutual exclusion
        const group = e.target.closest('.pp-checkbox-group');
        if (group && e.target.name === 'adverse_events') {
          const allCbs = group.querySelectorAll('input[type="checkbox"]');
          if (e.target.value === 'none' && e.target.checked) {
            allCbs.forEach(cb => { if (cb.value !== 'none') cb.checked = false; cb.closest('.pp-checkbox-option')?.classList.toggle('selected', cb.checked); });
          } else if (e.target.value !== 'none' && e.target.checked) {
            const noneCb = group.querySelector('input[value="none"]');
            if (noneCb) { noneCb.checked = false; noneCb.closest('.pp-checkbox-option')?.classList.remove('pp-selected'); }
          }
        }
        if (group && e.target.name === 'creation_preuves') {
          const allCbs = group.querySelectorAll('input[type="checkbox"]');
          if (e.target.value === 'aucune' && e.target.checked) {
            allCbs.forEach(cb => { if (cb.value !== 'aucune') cb.checked = false; cb.closest('.pp-checkbox-option')?.classList.toggle('selected', cb.checked); });
          } else if (e.target.value !== 'aucune' && e.target.checked) {
            const noneCb = group.querySelector('input[value="aucune"]');
            if (noneCb) { noneCb.checked = false; noneCb.closest('.pp-checkbox-option')?.classList.remove('pp-selected'); }
          }
        }
      }
    });

    // ============ Update contribution source visibility ============
    document.getElementById('available_contribution').addEventListener('input', function() {
      const val = parseInt(this.value) || 0;
      document.getElementById('contribution-source-field').style.display = val > 0 ? 'block' : 'none';
    });

    // ============ Cash generation: auto-uncheck "nsp" when value entered ============
    document.getElementById('annual_cash_generation').addEventListener('input', function() {
      const val = parseInt(this.value) || 0;
      if (val > 0) {
        document.getElementById('cashgen_nsp').checked = false;
        document.getElementById('cashgen_nsp').closest('.pp-checkbox-option').classList.remove('pp-selected');
      }
    });
    document.getElementById('cashgen_nsp').addEventListener('change', function() {
      if (this.checked) {
        document.getElementById('annual_cash_generation').value = '';
      }
    });

    // ============ EC coords: toggle when "oui_coords" selected ============
    document.getElementById('ec-group').addEventListener('change', function(e) {
      if (e.target.name === 'expert_comptable') {
        document.getElementById('ec-coords').style.display = e.target.value === 'oui_coords' ? 'block' : 'none';
      }
    });

    // ============ SUBMIT — API Server + Fallback Local ============
    const API_LEAD_URL = 'https://pro.reki.eu/api/lead';
    const API_TIMEOUT_MS = 8000;

    function submitForm() {
      document.querySelector('.pp-progress').style.display = 'none';

      const data = collectData();
      const payload = buildApiPayload(data);

      const submitBtn = document.querySelector('#step-6-submit');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Analyse en cours...'; }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

      fetch(API_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      })
      .then(response => { clearTimeout(timeoutId); if (!response.ok) throw new Error('API error ' + response.status); return response.json(); })
      .then(serverVerdict => { displayServerVerdict(serverVerdict, data); })
      .catch(err => { clearTimeout(timeoutId); console.warn('API indisponible — fallback local:', err.message); const localVerdict = computeVerdict(data); displayLocalVerdictWithNotice(localVerdict, data); })
      .finally(() => { if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Obtenir mon pré-diagnostic'; } });
    }

    function buildApiPayload(data) {
      const adv = data.adverse_events || [];
      return {
        entreprise: { siren: data.siren || '', raison_sociale: '', forme_juridique: '', secteur_naf: data.isCreation ? (data.creation_secteur || '') : '', date_creation: '', anciennete_annees: 0 },
        contact: { nom: '', email: document.getElementById('email')?.value || '', telephone: '', consentement_rgpd: document.getElementById('rgpd_consent')?.checked || false },
        financier: { ca_annuel: data.revenue_ttm || null, ebe_annuel: data.cashgen_unknown ? null : (data.annual_cash_generation || null), dette_financiere: data.existing_debt_service || null, tresorerie_nette: null, exercices_clos: data.isCreation ? 0 : (parseInt(document.querySelector('input[name="exercice_clos"]:checked')?.value) || 0), capitaux_propres: null, revenue_trend: data.revenue_trend || 'stable' },
        projet: { objet_pret: data.project_type || 'autre', montant_demande: data.requested_amount || 0, apport_personnel: data.available_contribution || 0, duree_souhaitee: 7 },
        flags: { procedure_collective: adv.includes('procedure_collective'), liquidation_judiciaire: adv.includes('liquidation'), retards_fiscaux: adv.includes('retards_fiscaux'), retards_sociaux: adv.includes('retards_sociaux'), rejets_bancaires: adv.includes('rejets_bancaires'), echeancier_en_cours: adv.includes('echeancier') }
      };
    }

    function collectData() {
      const getRadio = (name) => {
        const el = document.querySelector(`input[name="${name}"]:checked`);
        return el ? el.value : null;
      };
      const getCheckboxes = (name) => {
        return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
      };
      const getNum = (id) => parseInt(document.getElementById(id)?.value) || 0;
      const getStr = (id) => document.getElementById(id)?.value || '';

      return {
        isCreation,
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
        ec_nom: getStr('ec_nom'),
        ec_tel: getStr('ec_tel'),
        ec_email: getStr('ec_email'),
        creation_secteur: getStr('creation_secteur'),
        creation_experience: getStr('creation_experience'),
        creation_apport_pct: getRadio('creation_apport_pct'),
        creation_preuves: getCheckboxes('creation_preuves'),
      };
    }

    function computeVerdict(data) {
      // === CALCULS PRELIMINAIRES ===
      const contributionRatio = data.total_cost > 0 ? data.available_contribution / data.total_cost : 0;
      const actualLoan = Math.min(data.requested_amount, data.total_cost - data.available_contribution);
      
      const durees = { equipement: 7, travaux: 10, immobilier: 15, reprise: 7, bfr: 3, tresorerie: 2, refinancement: 5, developpement: 7, creation: 7, autre: 5 };
      const duree = durees[data.project_type] || 7;
      const rate = 0.055 / 12;
      const n = duree * 12;
      let monthlyPayment = 0;
      if (rate > 0 && n > 0 && actualLoan > 0) {
        monthlyPayment = actualLoan * rate / (1 - Math.pow(1 + rate, -n));
      }
      const newAnnualDebt = monthlyPayment * 12;
      const totalAnnualDebt = data.existing_debt_service + newAnnualDebt;
      
      const cashgen = data.cashgen_unknown ? (data.isCreation ? (data.revenue_ttm * 0.15) : 0) : data.annual_cash_generation;
      const adjustedCashgen = data.isCreation ? cashgen * 0.7 : cashgen;
      const coverage = totalAnnualDebt > 0 ? adjustedCashgen / totalAnnualDebt : (adjustedCashgen > 0 ? 99 : 0);

      // === SCORE (0-100) ===
      let score = 0;
      
      // Capacité de remboursement (30 pts)
      if (coverage >= 1.40) score += 30;
      else if (coverage >= 1.20) score += 24;
      else if (coverage >= 1.00) score += 12;
      else if (coverage > 0) score += 3;
      
      // Rentabilité & dynamique (15 pts)
      if (data.isCreation && data.creation_preuves.some(p => ['contrats','ca_deja','franchise_reseau'].includes(p))) score += 12;
      else if (data.revenue_trend === 'hausse_forte') score += 15;
      else if (data.revenue_trend === 'hausse_moderee') score += 12;
      else if (data.revenue_trend === 'stable') score += 9;
      else if (data.revenue_trend === 'baisse_moderee') score += 5;
      else if (data.revenue_trend === 'baisse_forte') score += 1;
      
      // Trésorerie & incidents (15 pts)
      if (data.cash_position === 'positive') score += 15;
      else if (data.cash_position === 'faible') score += 11;
      else if (data.cash_position === 'decouvert_ponctuel') score += 6;
      else if (data.cash_position === 'decouvert_perm') score += 2;
      if (data.adverse_events.includes('none') || (data.adverse_events.length === 1 && data.adverse_events[0] === 'none')) score += 0;
      else if (data.adverse_events.includes('echeancier')) score -= 3;
      
      // Apport (15 pts)
      if (contributionRatio >= 0.30) score += 15;
      else if (contributionRatio >= 0.20) score += 12;
      else if (contributionRatio >= 0.10) score += 7;
      else if (contributionRatio > 0) score += 3;
      
      // Nature dépenses (10 pts) — basé sur le type de projet
      const bonsObjets = ['equipement', 'immobilier', 'reprise'];
      const moyensObjets = ['travaux', 'developpement'];
      const faiblesObjets = ['bfr', 'tresorerie', 'refinancement'];
      if (bonsObjets.includes(data.project_type)) score += 10;
      else if (moyensObjets.includes(data.project_type)) score += 7;
      else if (faiblesObjets.includes(data.project_type)) score += 4;
      else score += 5; // creation ou autre
      
      // Endettement existant (10 pts)
      if (!data.isCreation) {
        const debtRatio = data.revenue_ttm > 0 ? data.existing_debt_service / data.revenue_ttm : 0;
        if (debtRatio < 0.10) score += 10;
        else if (debtRatio < 0.20) score += 7;
        else if (debtRatio < 0.35) score += 4;
        else score += 1;
      } else { score += 5; } // creation: neutre
      
      // Maturité (5 pts)
      if (data.funds_needed === '6m+' || data.funds_needed === '6m') score += 5;
      else if (data.funds_needed === '3m') score += 3;
      else if (data.funds_needed === '1m') score += 2;
      else score += 1;

      score = Math.max(0, Math.min(100, Math.round(score)));
      
      // Score class: high >= 70, medium >= 40, low < 40
      const scoreClass = score >= 70 ? 'high' : (score >= 40 ? 'medium' : 'low');

      // === HORS PÉRIMÈTRE ===
      const hpReasons = [];
      if (data.requested_amount < 25000) hpReasons.push('Montant inférieur au seuil minimum (25 000 €)');
      if (data.requested_amount > 2000000) hpReasons.push('Montant supérieur à 2 000 000 € — nous contacter pour un accompagnement dédié');
      if (data.adverse_events.includes('liquidation')) hpReasons.push('Liquidation judiciaire en cours');
      if (hpReasons.length > 0) return { verdict: 'non_eligible', reasons: hpReasons, score: 0, scoreClass: 'low' };

      // === ANALYSE HUMAINE REQUISE ===
      const analyseReasons = [];
      if (data.adverse_events.includes('procedure_collective')) analyseReasons.push('Procédure collective en cours');
      if (data.adverse_events.includes('retards_fiscaux')) analyseReasons.push('Retards fiscaux déclarés');
      if (data.adverse_events.includes('retards_sociaux')) analyseReasons.push('Retards URSSAF ou sociaux déclarés');
      if (data.adverse_events.includes('rejets_bancaires')) analyseReasons.push('Rejets ou impayés bancaires');
      if (data.adverse_events.includes('fp_negatifs')) analyseReasons.push('Capitaux propres négatifs');
      if (data.cash_position === 'depassements') analyseReasons.push('Dépassements ou rejets bancaires réguliers');
      if (data.cash_position === 'decouvert_perm') analyseReasons.push('Découvert utilisé en permanence');
      if (data.cashgen_unknown && !data.isCreation) analyseReasons.push('Capacité de remboursement inconnue — dépôt des comptes nécessaire');
      if (data.revenue_trend === 'baisse_forte') analyseReasons.push('Baisse de chiffre d\'affaires supérieure à 20 %');
      if (data.funds_needed === '15j') analyseReasons.push('Besoin des fonds sous 15 jours — délai très court');
      if (data.adverse_events.includes('nsp')) analyseReasons.push('Incidents non connus — vérification nécessaire');
      if (data.isCreation && (!data.creation_experience || data.creation_experience === 'non')) {
        if (!data.creation_preuves.includes('contrats') && !data.creation_preuves.includes('ca_deja') && !data.creation_preuves.includes('franchise_reseau')) {
          analyseReasons.push('Création sans expérience du secteur ni preuves commerciales');
        }
      }
      if (!data.isCreation && data.revenue_ttm > 0) {
        const isExcepte = ['immobilier', 'reprise'].includes(data.project_type);
        if (!isExcepte && data.requested_amount > data.revenue_ttm * 2) {
          analyseReasons.push('Montant demandé supérieur à 2× le chiffre d\'affaires annuel');
        }
      }
      if (coverage < 1.00 && coverage > 0) {
        analyseReasons.push('Capacité de remboursement insuffisante — un ajustement du montant ou de l\'apport est nécessaire');
      }
      if (analyseReasons.length > 0) {
        return { verdict: 'etude_approfondie', reasons: analyseReasons, score, scoreClass, coverage, actualLoan, duree, newAnnualDebt, contributionRatio };
      }

      // === CONDITIONS ===
      const conditions = [];
      const minApport = data.isCreation ? 0.20 : 0.15;
      if (contributionRatio < minApport) {
        const apportManquant = Math.round((minApport * data.total_cost) - data.available_contribution);
        conditions.push(`Apport faible (${Math.round(contributionRatio*100)} %) — un apport supplémentaire de ${apportManquant.toLocaleString('fr-FR')} € renforcerait le dossier`);
      }
      if (coverage < 1.20 && coverage >= 1.00) {
        const montantAjuste = Math.round(adjustedCashgen * 0.80 / (rate / (1 - Math.pow(1 + rate, -n))) / 12);
        conditions.push(`Couverture de remboursement juste (${Math.round(coverage*100)} %) — un montant de ${montantAjuste.toLocaleString('fr-FR')} € serait plus confortable sur ${duree} ans`);
      }
      if (data.revenue_trend === 'baisse_moderee') conditions.push('Baisse modérée du chiffre d\'affaires — préparez une explication');
      if (data.cash_position === 'decouvert_ponctuel') conditions.push('Découvert ponctuel — vérifiez l\'absence de dépassements réguliers');
      if (data.funds_needed === '15j' || data.funds_needed === '1m') conditions.push('Délai court — l\'instruction bancaire prend généralement 3 à 6 semaines');
      if (data.isCreation && (data.creation_preuves.length === 0 || data.creation_preuves.includes('aucune'))) conditions.push('Absence de preuves commerciales — des devis renforceraient votre dossier');
      if (data.adverse_events.includes('echeancier')) conditions.push('Échéancier en cours — produisez l\'accord et justifiez du respect des échéances');

      // === VERDICT FINAL ===
      if (coverage >= 1.20 && score >= 70 && conditions.length === 0) {
        return { verdict: 'decision_favorable', reasons: [], score, scoreClass, coverage, actualLoan, duree, newAnnualDebt, contributionRatio };
      }
      if (score >= 45 && coverage >= 1.00) {
        return { verdict: 'decision_favorable', sous_type: 'sous_conditions', reasons: conditions, score, scoreClass, coverage, actualLoan, duree, newAnnualDebt, contributionRatio };
      }
      if (score >= 30) {
        return { verdict: 'etude_approfondie', reasons: conditions.length > 0 ? conditions : ['Dossier à approfondir — un conseiller vous contactera'], score, scoreClass, coverage, actualLoan, duree, contributionRatio };
      }
      return { verdict: 'etude_approfondie', reasons: conditions, score, scoreClass, coverage, actualLoan, duree, contributionRatio };
    }

    function buildScoreBar(score, scoreClass) {
      return `
        <div class="pp-score-section">
          <div class="pp-score-header">
            <span class="pp-score-label">Score de compatibilité</span>
            <span class="pp-score-pct ${scoreClass}">${score}%</span>
          </div>
          <div class="pp-score-bar-track">
            <div class="pp-score-bar-fill ${scoreClass}" style="width:${score}%;"></div>
          </div>
        </div>`;
    }

    function buildMetrics(verdict, data) {
      return `
        <div class="pp-metric-grid">
          <div class="pp-metric-item">
            <div class="pp-metric-value">${Math.round((verdict.coverage||0)*100)}%</div>
            <div class="pp-metric-label">Couverture de remboursement</div>
          </div>
          <div class="pp-metric-item">
            <div class="pp-metric-value">${Math.round((verdict.contributionRatio||0)*100)}%</div>
            <div class="pp-metric-label">Ratio d'apport</div>
          </div>
          <div class="pp-metric-item">
            <div class="pp-metric-value">${(verdict.actualLoan || data.requested_amount).toLocaleString('fr-FR')} €</div>
            <div class="pp-metric-label">Montant finançable estimé</div>
          </div>
          <div class="pp-metric-item">
            <div class="pp-metric-value">${verdict.duree || 7} ans</div>
            <div class="pp-metric-label">Durée indicative</div>
          </div>
        </div>`;
    }

    function buildServerEstimations(est) {
      const mt = est.montant_finançable || 0;
      return `
        <div class="pp-estimation-row"><span class="pp-est-label">Montant finançable estimé</span><span class="pp-est-value">${mt.toLocaleString('fr-FR')} €</span></div>
        <div class="pp-estimation-row"><span class="pp-est-label">Durée indicative</span><span class="pp-est-value">${est.duree || '—'}</span></div>
        <div class="pp-estimation-row"><span class="pp-est-label">Garanties probables</span><span class="pp-est-value">${est.garanties || '—'}</span></div>
        <div class="pp-estimation-row"><span class="pp-est-label">Mensualité estimée</span><span class="pp-est-value">${est.mensualite ? Math.round(est.mensualite).toLocaleString('fr-FR') + ' €/mois' : '—'}</span></div>`;
    }

    function displayServerVerdict(server, data) {
      document.querySelectorAll('.pp-step').forEach(function(s){s.classList.remove('pp-active');});
      var screen=document.getElementById('pp-verdict-screen');screen.style.display='block';
      document.querySelector('.pp-progress').style.display='none';
      var est=server.estimations||{};var motifs=server.motifs||[];var v=server.verdict;
      var icons={decision_favorable:'<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',etude_approfondie:'<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',non_eligible:'<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'};
      var colors={decision_favorable:'var(--success)',etude_approfondie:'var(--warning)',non_eligible:'var(--neural-500)'};
      var titles={decision_favorable:'Decision de principe favorable',etude_approfondie:'Etude approfondie necessaire',non_eligible:'Projet hors perimetre actuel'};
      var icon=icons[v]||icons.etude_approfondie,color=colors[v]||colors.etude_approfondie,title=titles[v]||titles.etude_approfondie;
      if(server.sous_type==='sous_conditions'){title='Decision de principe favorable, sous reserve';icon='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';color='var(--brand-yellow-800)';}
      document.getElementById('pp-verdict-icon').innerHTML=icon;document.getElementById('pp-verdict-icon').style.color=color;
      document.getElementById('pp-verdict-title').textContent=title;document.getElementById('pp-verdict-msg').textContent=motifs.length>0?motifs[0]:'';
      document.getElementById('pp-verdict-reasons').innerHTML=motifs.length>1?motifs.slice(1).map(function(r){return'<li>'+r+'</li>'}).join(''):'';
      document.getElementById('pp-verdict-estimations').innerHTML=est.montant_financable>0?buildServerEstimations(est):'';
    }

    function displayLocalVerdictWithNotice(verdict, data) {
      document.querySelectorAll('.pp-step').forEach(function(s){s.classList.remove('pp-active');});
      var screen=document.getElementById('pp-verdict-screen');screen.style.display='block';
      document.querySelector('.pp-progress').style.display='none';
      var vType=verdict.verdict;
      document.getElementById('pp-verdict-icon').innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
      document.getElementById('pp-verdict-icon').style.color='var(--warning)';
      document.getElementById('pp-verdict-title').textContent='Estimation indicative';
      document.getElementById('pp-verdict-msg').textContent=verdict.reasons.length>0?verdict.reasons[0]:'';
      document.getElementById('pp-verdict-reasons').innerHTML=verdict.reasons.length>1?verdict.reasons.slice(1).map(function(r){return'<li>'+r+'</li>'}).join(''):'';
      document.getElementById('pp-verdict-estimations').innerHTML='';
      var badge=document.createElement('div');
      badge.style.cssText='margin-top:1rem;padding:0.5rem 1rem;background:var(--brand-yellow-tag-bg);color:var(--brand-yellow-900);border-radius:var(--radius-pill);font-size:var(--fs-xs);text-align:center;';
      badge.textContent='\u26a0 Estimation indicative';
      document.getElementById('pp-verdict-estimations').appendChild(badge);
    }

    // ============ Pre-fill from URL params ============
    (function() {
      const params = new URLSearchParams(window.location.search);
      ['email', 'siren'].forEach(function(key) {
        if (params.get(key)) {
          const el = document.getElementById(key);
          if (el) { el.value = params.get(key); el.dispatchEvent(new Event('input')); }
        }
      });
      if (params.get('requested_amount')) document.getElementById('requested_amount').value = params.get('requested_amount');
      if (params.get('project_type')) document.getElementById('project_type').value = params.get('project_type');
    })();

  // ── Expose functions globally (needed by inline onclick handlers) ──
  window.nextStep = nextStep;
  window.prevStep = prevStep;
  window.showStep = showStep;
  window.validateStep = validateStep;
  window.setCreationMode = setCreationMode;
  window.confirmSiren = confirmSiren;
  window.resetSiren = resetSiren;
  window.backFromVerdict = backFromVerdict;
  window.submitForm = submitForm;
  window.computeVerdict = computeVerdict;
  window.displayVerdict = displayVerdict;
  window.collectData = collectData;
  window.updateProgress = updateProgress;

})();
