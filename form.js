/**
 * PretPro — Formulaire de prequalification (Webflow Embed)
 * Construit dynamiquement le formulaire dans #pp-form.
 * Zero dependance externe. Prefixe pp- sur toutes les classes.
 * Version: 1.0 — 28/07/2026
 */
(function() {
  'use strict';

  // ── SVG icons (inlined) ──────────────────────────────────
  var ICONS = {
    arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    arrowRight: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 5"/></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    warning: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    search: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  };

  // ── State ────────────────────────────────────────────────
  var currentStep = 1, totalSteps = 6;
  var isCreation = false, sirenConfirmed = false;

  // ── HTML template ────────────────────────────────────────
  function buildHTML() {
    return [
      '<!-- Navbar -->',
      '<nav class="pp-navbar"><div class="pp-navbar-inner">',
        '<a href="https://www.reki.eu" class="pp-navbar-logo" aria-label="Reki">',
          '<img src="https://cdn.prod.website-files.com/66e83aa7dfde79e2181aec17/67f643c671467ca4c3c34118_LOGO_WEBCLIP.png" alt="Reki" class="pp-logo-icon">',
          '<img src="https://cdn.prod.website-files.com/66e83aa7dfde79e2181aec17/67f64110b3be61bad2bbe5b1_TEXT@2x.svg" alt="Reki" class="pp-logo-text">',
        '</a>',
        '<a href="https://www.reki.eu" class="pp-navbar-back">'+ICONS.arrowLeft+' Retour au site</a>',
      '</div></nav>',

      '<!-- Hero -->',
      '<div class="pp-hero"><div class="pp-hero-inner">',
        '<span class="pp-hero-tag">Pré-diagnostic gratuit — 2 min</span>',
        '<h1>Votre projet est-il <span class="pp-brand-text">compatible avec un financement</span> bancaire ?</h1>',
        '<p>Un pré-diagnostic immédiat, des estimations personnalisées, et une orientation vers le bon parcours.</p>',
      '</div></div>',

      '<!-- Form section -->',
      '<div class="pp-form-section"><div class="pp-form-card">',
        '<!-- Progress -->',
        '<div class="pp-progress"><div class="pp-progress-bar"><div class="pp-progress-fill" id="pp-progress-fill"></div></div><span class="pp-progress-label" id="pp-progress-label">Étape 1/6</span></div>',
        '<form id="pp-rekiForm" novalidate></form>',
      '</div></div>',

      '<!-- Footer -->',
      '<footer class="pp-footer"><div class="pp-footer-inner">',
        '<div class="pp-footer-brand">',
          '<img src="https://cdn.prod.website-files.com/66e83aa7dfde79e2181aec17/67f643c671467ca4c3c34118_LOGO_WEBCLIP.png" alt="Reki">',
          '<img src="https://cdn.prod.website-files.com/66e83aa7dfde79e2181aec17/67f64110b3be61bad2bbe5b1_TEXT@2x.svg" alt="Reki">',
        '</div>',
        '<div class="pp-footer-links">',
          '<a href="https://www.reki.eu/mentions-legales" target="_blank">Mentions légales</a>',
          '<a href="https://www.reki.eu/politique-de-confidentialite" target="_blank">Politique de confidentialité</a>',
          '<a href="https://www.reki.eu/conditions-generales" target="_blank">CGU</a>',
          '<a href="mailto:contact@reki.eu">Contact</a>',
        '</div>',
        '<div class="pp-footer-copy">© 2026 Reki. Tous droits réservés.</div>',
      '</div></footer>'
    ].join('\n');
  }

  // ── Step HTML builders ───────────────────────────────────
  function stepHTML(n) {
    var steps = {
      1: [
        '<div class="pp-step pp-active" data-step="1">',
          '<div class="pp-step-title">Commençons par vous identifier</div>',
          '<div class="pp-step-subtitle">Votre email nous permet de vous envoyer les résultats de l\'évaluation.</div>',
          '<div class="pp-field"><label for="pp-email">Votre adresse e-mail professionnelle</label>',
            '<input type="email" id="pp-email" name="email" placeholder="prenom@entreprise.fr" required>',
            '<div class="pp-field-error" id="pp-email-error">Veuillez entrer une adresse email valide.</div></div>',
          '<div class="pp-field">',
            '<div class="pp-checkbox-opt" id="pp-rgpd-wrap">',
              '<input type="checkbox" id="pp-rgpd_consent" name="rgpd_consent" required>',
              '<label for="pp-rgpd_consent" style="margin-bottom:0;font-weight:400;cursor:pointer;">J\'accepte que Reki traite mes données pour évaluer l\'éligibilité de mon projet. <a href="https://www.reki.eu/politique-de-confidentialite" target="_blank" style="color:var(--pp-yellow-900);text-decoration:underline;">Politique de confidentialité</a></label>',
            '</div>',
            '<div class="pp-field-error" id="pp-rgpd-error">Vous devez accepter pour continuer.</div></div>',
          '<div class="pp-btn-row"><button type="button" class="pp-btn pp-btn-primary" onclick="PP.nextStep(1)">Continuer</button></div>',
        '</div>'
      ].join('\n'),
      2: [
        '<div class="pp-step" data-step="2">',
          '<div class="pp-step-title">Votre entreprise</div>',
          '<div class="pp-step-subtitle">Entrez votre SIREN. Si vous n\'avez pas encore d\'entreprise, laissez le champ vide.</div>',
          '<div id="pp-siren-mode">',
            '<div class="pp-field"><label for="pp-siren">Numéro SIREN de votre entreprise</label>',
              '<span class="pp-hint">9 chiffres — nous préremplirons les informations publiques</span>',
              '<input type="text" id="pp-siren" name="siren" placeholder="ex : 123 456 789" maxlength="9" autocomplete="off" inputmode="numeric" pattern="[0-9]{9}"></div>',
            '<div class="pp-field" style="margin-top:-0.25rem;">',
              '<button type="button" class="pp-btn pp-btn-outline" onclick="PP.setCreationMode()">Mon entreprise est en cours de création</button></div>',
            '<div id="pp-siren-confirm" style="display:none;" class="pp-company-confirm">',
              '<div class="pp-company-name" id="pp-siren-name">—</div>',
              '<div class="pp-company-info" id="pp-siren-info">—</div>',
              '<div style="margin-top:0.75rem;display:flex;gap:0.5rem;">',
                '<button type="button" class="pp-btn pp-btn-outline" onclick="PP.confirmSiren()">Oui, c\'est mon entreprise</button>',
                '<button type="button" class="pp-btn pp-btn-secondary" onclick="PP.resetSiren()">Non, modifier le SIREN</button>',
              '</div></div></div>',
          '<div id="pp-creation-mode" style="display:none;">',
            '<div class="pp-company-confirm"><div class="pp-company-name">Entreprise en création</div><div class="pp-company-info">Parcours adapté aux porteurs de projet sans entreprise encore immatriculée.</div></div>',
            '<div class="pp-field"><label for="pp-creation_secteur">Dans quel secteur allez-vous exercer ?</label>',
              '<select id="pp-creation_secteur" name="creation_secteur"><option value="" disabled selected>Choisir un secteur</option>',
              '<option value="restauration">Restauration</option><option value="commerce">Commerce de détail</option><option value="services">Services aux entreprises</option><option value="btp">BTP — Construction</option><option value="sante">Santé — Bien-être</option><option value="artisanat">Artisanat</option><option value="franchise">Franchise</option><option value="tech">Tech — Digital</option><option value="autre">Autre</option></select></div>',
            '<div class="pp-field"><label for="pp-creation_experience">Avez-vous de l\'expérience dans ce secteur ?</label>',
              '<select id="pp-creation_experience" name="creation_experience"><option value="" disabled selected>Choisir</option>',
              '<option value="5+">Oui, plus de 5 ans</option><option value="2-5">Oui, 2 à 5 ans</option><option value="1-2">Oui, 1 à 2 ans</option><option value="associe">Non, mais un associé expérimenté rejoint le projet</option><option value="non">Non</option></select></div>',
            '<div class="pp-field"><label for="pp-creation_apport_pct">Quel pourcentage d\'apport personnel pouvez-vous mobiliser ?</label>',
              '<div class="pp-radio-group">',
                radioOpt('creation_apport_pct','<10%','Moins de 10 %'),
                radioOpt('creation_apport_pct','10-20%','10 – 20 %'),
                radioOpt('creation_apport_pct','20-30%','20 – 30 %'),
                radioOpt('creation_apport_pct','>30%','Plus de 30 %'),
              '</div></div>',
            '<div class="pp-field"><label for="pp-creation_preuves">Quelles preuves concrètes avez-vous déjà obtenues ?</label>',
              '<span class="pp-hint">Cochez tout ce qui s\'applique</span>',
              '<div class="pp-checkbox-group" id="pp-creation-preuves-group">',
                checkboxOpt('creation_preuves','contrats','Contrats ou commandes signés'),
                checkboxOpt('creation_preuves','lettres','Lettres d\'intention'),
                checkboxOpt('creation_preuves','ca_deja','Chiffre d\'affaires déjà réalisé'),
                checkboxOpt('creation_preuves','franchise_reseau','Franchise ou réseau existant'),
                checkboxOpt('creation_preuves','devis','Devis fournisseurs'),
                checkboxOpt('creation_preuves','etude','Étude de marché seulement'),
                checkboxOpt('creation_preuves','aucune','Aucune preuve à ce stade'),
              '</div></div></div>',
          '<div class="pp-btn-row">',
            '<button type="button" class="pp-btn pp-btn-secondary" onclick="PP.prevStep(2)">Retour</button>',
            '<button type="button" class="pp-btn pp-btn-primary" onclick="PP.nextStep(2)">Continuer</button>',
          '</div></div>'
      ].join('\n'),
      3: [
        '<div class="pp-step" data-step="3">',
          '<div class="pp-step-title">Votre projet de financement</div>',
          '<div class="pp-step-subtitle">Décrivez votre besoin pour que nous puissions évaluer sa compatibilité.</div>',
          '<div class="pp-field"><label for="pp-project_type">Quel projet souhaitez-vous financer ?</label>',
            '<select id="pp-project_type" name="project_type"><option value="" disabled selected>Choisir un type de projet</option>',
            '<option value="creation">Créer une entreprise</option><option value="developpement">Développer une entreprise existante</option><option value="equipement">Acheter du matériel ou des véhicules</option><option value="travaux">Réaliser des travaux ou aménagements</option><option value="immobilier">Acheter des locaux professionnels</option><option value="reprise">Reprendre une entreprise ou un fonds de commerce</option><option value="bfr">Financer le besoin en fonds de roulement</option><option value="tresorerie">Besoin de trésorerie ponctuel</option><option value="refinancement">Refinancer des dettes existantes</option><option value="autre">Autre projet</option></select></div>',
          '<div class="pp-field"><label for="pp-requested_amount">Quel montant souhaitez-vous emprunter ?</label>',
            '<div class="pp-money-wrap"><input type="number" id="pp-requested_amount" name="requested_amount" placeholder="ex : 150 000" min="10000" required><span class="pp-currency">€</span></div>',
            '<span class="pp-hint">Montant recherché entre 25 000 € et 2 000 000 €</span></div>',
          '<div class="pp-field"><label for="pp-total_cost">Quel est le coût total de votre projet ?</label>',
            '<span class="pp-hint">Incluez investissements, travaux, frais, stocks et besoin de trésorerie initial</span>',
            '<div class="pp-money-wrap"><input type="number" id="pp-total_cost" name="total_cost" placeholder="ex : 200 000" min="0"><span class="pp-currency">€</span></div></div>',
          '<div class="pp-btn-row">',
            '<button type="button" class="pp-btn pp-btn-secondary" onclick="PP.prevStep(3)">Retour</button>',
            '<button type="button" class="pp-btn pp-btn-primary" onclick="PP.nextStep(3)">Continuer</button>',
          '</div></div>'
      ].join('\n'),
      4: [
        '<div class="pp-step" data-step="4">',
          '<div class="pp-step-title">Votre plan de financement</div>',
          '<div class="pp-step-subtitle">L\'apport personnel est un élément clé pour les partenaires bancaires.</div>',
          '<div class="pp-field"><label for="pp-available_contribution">Quel montant apportez-vous au projet ?</label>',
            '<span class="pp-hint">Capital, compte courant d\'associé, épargne investie, prêt d\'honneur ou subvention accordée</span>',
            '<div class="pp-money-wrap"><input type="number" id="pp-available_contribution" name="available_contribution" placeholder="ex : 50 000" min="0"><span class="pp-currency">€</span></div></div>',
          '<div class="pp-field" id="pp-contribution-source-field" style="display:none;">',
            '<label>Quelle est l\'origine principale de cet apport ?</label>',
            '<select id="pp-contribution_source" name="contribution_source"><option value="" disabled selected>Choisir</option>',
            '<option value="capital">Capital / Fonds propres</option><option value="cca">Compte courant d\'associé</option><option value="epargne">Épargne personnelle</option><option value="investisseur">Investisseur</option><option value="pret_honneur">Prêt d\'honneur</option><option value="subvention">Subvention accordée</option><option value="credit_vendeur">Crédit-vendeur</option><option value="autre_confirme">Autre financement confirmé</option></select></div>',
          '<div class="pp-field"><label for="pp-funds_needed">Quand avez-vous besoin des fonds ?</label>',
            '<select id="pp-funds_needed" name="funds_needed"><option value="" disabled selected>Choisir une échéance</option>',
            '<option value="15j">Moins de 15 jours</option><option value="1m">Entre 15 jours et 1 mois</option><option value="3m">Entre 1 et 3 mois</option><option value="6m">Entre 3 et 6 mois</option><option value="6m+">Plus de 6 mois</option><option value="indetermine">Pas de date précise</option></select></div>',
          '<div class="pp-btn-row">',
            '<button type="button" class="pp-btn pp-btn-secondary" onclick="PP.prevStep(4)">Retour</button>',
            '<button type="button" class="pp-btn pp-btn-primary" onclick="PP.nextStep(4)">Continuer</button>',
          '</div></div>'
      ].join('\n'),
      5: [
        '<div class="pp-step" data-step="5">',
          '<div class="pp-step-title">Votre activité financière</div>',
          '<div class="pp-step-subtitle">Ces données permettent d\'évaluer la capacité de remboursement. Répondez au mieux.</div>',
          '<div class="pp-field" id="pp-revenue-field"><label for="pp-revenue_ttm">Quel est votre chiffre d\'affaires sur les 12 derniers mois ?</label>',
            '<div class="pp-money-wrap"><input type="number" id="pp-revenue_ttm" name="revenue_ttm" placeholder="ex : 500 000" min="0"><span class="pp-currency">€</span></div></div>',
          '<div class="pp-field" id="pp-revenue-trend-field"><label>Comment votre chiffre d\'affaires évolue-t-il par rapport à l\'année précédente ?</label>',
            '<div class="pp-radio-group">',
              radioOpt('revenue_trend','hausse_forte','Hausse de plus de 20 %'),
              radioOpt('revenue_trend','hausse_moderee','Hausse de 5 à 20 %'),
              radioOpt('revenue_trend','stable','Stable (−5 % à +5 %)'),
              radioOpt('revenue_trend','baisse_moderee','Baisse de 5 à 20 %'),
              radioOpt('revenue_trend','baisse_forte','Baisse de plus de 20 %'),
              radioOpt('revenue_trend','nsp','Je ne sais pas / Trop récent'),
            '</div></div>',
          '<div class="pp-field" id="pp-cashgen-field"><label for="pp-annual_cash_generation">Quel montant votre activité génère-t-elle chaque année avant remboursement d\'emprunts ?</label>',
            '<span class="pp-hint">Vous pouvez indiquer votre EBE, CAF ou capacité d\'autofinancement.</span>',
            '<div class="pp-money-wrap"><input type="number" id="pp-annual_cash_generation" name="annual_cash_generation" placeholder="ex : 80 000"><span class="pp-currency">€</span></div>',
            '<div style="margin-top:0.5rem;"><label class="pp-checkbox-opt"><input type="checkbox" id="pp-cashgen_nsp" name="cashgen_nsp"> Je ne connais pas ce montant</label></div></div>',
          '<div class="pp-field" id="pp-debt-field"><label for="pp-existing_debt_service">Combien votre entreprise rembourse-t-elle déjà chaque année ?</label>',
            '<span class="pp-hint">Emprunts bancaires, crédits-bails, locations financières. Incluez capital + intérêts.</span>',
            '<div class="pp-money-wrap"><input type="number" id="pp-existing_debt_service" name="existing_debt_service" placeholder="ex : 30 000 (ou 0)" min="0"><span class="pp-currency">€</span></div></div>',
          '<div class="pp-btn-row">',
            '<button type="button" class="pp-btn pp-btn-secondary" onclick="PP.prevStep(5)">Retour</button>',
            '<button type="button" class="pp-btn pp-btn-primary" onclick="PP.nextStep(5)">Continuer</button>',
          '</div></div>'
      ].join('\n'),
      6: [
        '<div class="pp-step" data-step="6">',
          '<div class="pp-step-title">Votre situation actuelle</div>',
          '<div class="pp-step-subtitle">Dernières vérifications. Ces éléments sont déterminants pour l\'analyse.</div>',
          '<div class="pp-field" id="pp-cashpos-field"><label>Quelle est votre situation de trésorerie actuelle ?</label>',
            '<div class="pp-radio-group">',
              radioOpt('cash_position','positive','Trésorerie positive, sans découvert'),
              radioOpt('cash_position','faible','Trésorerie positive mais faible'),
              radioOpt('cash_position','decouvert_ponctuel','Découvert utilisé ponctuellement'),
              radioOpt('cash_position','decouvert_perm','Découvert utilisé presque en permanence'),
              radioOpt('cash_position','depassements','Dépassements ou rejets réguliers'),
              radioOpt('cash_position','nsp','Je ne sais pas'),
            '</div></div>',
          '<div class="pp-field"><label>Votre entreprise connaît-elle l\'une de ces situations ?</label>',
            '<span class="pp-hint">Cochez tout ce qui s\'applique</span>',
            '<div class="pp-checkbox-group" id="pp-adverse-events-group">',
              checkboxOpt('adverse_events','none','Aucune de ces situations',true),
              checkboxOpt('adverse_events','fp_negatifs','Capitaux propres négatifs'),
              checkboxOpt('adverse_events','retards_fiscaux','Retards de paiement fiscaux'),
              checkboxOpt('adverse_events','retards_sociaux','Retards URSSAF ou sociaux'),
              checkboxOpt('adverse_events','echeancier','Échéancier fiscal ou social en cours'),
              checkboxOpt('adverse_events','rejets_bancaires','Rejets ou impayés bancaires'),
              checkboxOpt('adverse_events','procedure_collective','Procédure de sauvegarde, redressement ou conciliation'),
              checkboxOpt('adverse_events','liquidation','Liquidation judiciaire'),
              checkboxOpt('adverse_events','nsp','Je ne sais pas'),
            '</div></div>',
          '<div class="pp-field"><label>Avez-vous un expert-comptable ?</label>',
            '<div class="pp-radio-group" id="pp-ec-group">',
              radioOpt('expert_comptable','oui_coords','Oui, je peux communiquer ses coordonnées'),
              radioOpt('expert_comptable','oui_sans','Oui, sans les coordonnées sous la main'),
              radioOpt('expert_comptable','non','Non'),
            '</div></div>',
          '<div id="pp-ec-coords" style="display:none;">',
            '<div class="pp-field"><label for="pp-ec_nom">Nom du cabinet ou de l\'expert-comptable</label><input type="text" id="pp-ec_nom" name="ec_nom" placeholder="ex : Cabinet Dupont"></div>',
            '<div class="pp-field"><label for="pp-ec_tel">Téléphone</label><input type="tel" id="pp-ec_tel" name="ec_tel" placeholder="ex : 01 23 45 67 89"></div>',
            '<div class="pp-field"><label for="pp-ec_email">Email</label><input type="email" id="pp-ec_email" name="ec_email" placeholder="ex : comptable@cabinet.fr"></div>',
          '</div>',
          '<div class="pp-btn-row">',
            '<button type="button" class="pp-btn pp-btn-secondary" onclick="PP.prevStep(6)">Retour</button>',
            '<button type="button" class="pp-btn pp-btn-primary" onclick="PP.submitForm()">Obtenir mon pré-diagnostic '+ICONS.arrowRight+'</button>',
          '</div></div>'
      ].join('\n'),
      // Verdict screens
      'vf': [
        '<div class="pp-step" data-step="verdict-favorable"><div class="pp-verdict">',
          '<div class="pp-verdict-icon" style="color:var(--pp-success);">'+ICONS.check+'</div>',
          '<h2>Décision de principe favorable</h2>',
          '<p>Les informations communiquées sont compatibles avec les principaux critères analysés pour un financement professionnel.</p>',
          '<div class="pp-estimation-card" id="pp-estimation-card"></div>',
          '<p style="font-size:12px;color:var(--pp-neutral-500);">Ces estimations sont indicatives.</p>',
          '<div class="pp-btn-row" style="flex-direction:column;gap:0.5rem;">',
            '<a href="mailto:contact@reki.eu?subject=Prise%20de%20rendez-vous" class="pp-btn pp-btn-primary">Prendre rendez-vous</a>',
            '<button type="button" class="pp-btn pp-btn-secondary" onclick="PP.backFromVerdict()">← Modifier mes réponses</button>',
          '</div></div></div>'
      ].join('\n'),
      'vfc': [
        '<div class="pp-step" data-step="verdict-favorable-conditions"><div class="pp-verdict">',
          '<div class="pp-verdict-icon" style="color:var(--pp-yellow-800);">'+ICONS.warning+'</div>',
          '<h2>Décision de principe favorable, sous réserve</h2>',
          '<p>Plusieurs éléments sont favorables, mais le montage devra probablement être adapté :</p>',
          '<div id="pp-v-conditions-score"></div>',
          '<div class="pp-reasons-box"><ul id="pp-v-conditions-list"></ul></div>',
          '<div class="pp-btn-row" style="flex-direction:column;gap:0.5rem;">',
            '<a href="mailto:contact@reki.eu?subject=Accompagnement" class="pp-btn pp-btn-primary">Être accompagné</a>',
            '<button type="button" class="pp-btn pp-btn-secondary" onclick="PP.backFromVerdict()">← Modifier mes réponses</button>',
          '</div></div></div>'
      ].join('\n'),
      've': [
        '<div class="pp-step" data-step="verdict-etude"><div class="pp-verdict">',
          '<div class="pp-verdict-icon" style="color:var(--pp-warning);">'+ICONS.search+'</div>',
          '<h2>Étude approfondie nécessaire</h2>',
          '<p>Votre situation mérite une analyse par un expert :</p>',
          '<div id="pp-v-analyse-score"></div>',
          '<div class="pp-reasons-box"><ul id="pp-v-analyse-reasons"></ul></div>',
          '<p style="font-size:14px;">Un conseiller Reki revient vers vous sous 48h.</p>',
          '<div class="pp-btn-row" style="flex-direction:column;gap:0.5rem;">',
            '<button type="button" class="pp-btn pp-btn-primary" onclick="alert(\'Un conseiller vous contactera sous 48h.\')">Recevoir l\'analyse par email</button>',
            '<button type="button" class="pp-btn pp-btn-secondary" onclick="PP.backFromVerdict()">← Modifier mes réponses</button>',
          '</div></div></div>'
      ].join('\n'),
      'vn': [
        '<div class="pp-step" data-step="verdict-non-eligible"><div class="pp-verdict">',
          '<div class="pp-verdict-icon" style="color:var(--pp-neutral-500);">'+ICONS.info+'</div>',
          '<h2>Non éligible — des alternatives existent</h2>',
          '<p>En l\'état, ce projet ne correspond pas au périmètre actuel de notre service.</p>',
          '<div class="pp-reasons-box"><ul id="pp-v-hp-reasons"></ul></div>',
          '<p style="margin-top:0.75rem;">D\'autres solutions peuvent correspondre à votre situation.</p>',
          '<div class="pp-btn-row" style="flex-direction:column;gap:0.5rem;">',
            '<a href="mailto:contact@reki.eu?subject=Orientation%20alternative" class="pp-btn pp-btn-primary">Être orienté vers une alternative</a>',
            '<button type="button" class="pp-btn pp-btn-secondary" onclick="PP.backFromVerdict()">← Modifier mes réponses</button>',
          '</div></div></div>'
      ].join('\n')
    };
    return steps[n] || '';
  }

  function radioOpt(name, value, label) {
    return '<label class="pp-radio-opt"><input type="radio" name="'+name+'" value="'+value+'"> '+label+'</label>';
  }
  function checkboxOpt(name, value, label, checked) {
    return '<label class="pp-checkbox-opt"><input type="checkbox" name="'+name+'" value="'+value+'"'+(checked?' checked':'')+'> '+label+'</label>';
  }

  // ── Navigation ───────────────────────────────────────────
  function showStep(n) {
    var steps = document.querySelectorAll('#pp-rekiForm .pp-step');
    steps.forEach(function(s) { s.classList.remove('pp-active'); });
    var target = document.querySelector('#pp-rekiForm .pp-step[data-step="'+n+'"]');
    if (target) {
      target.classList.add('pp-active');
      if (typeof n === 'number') { updateProgress(n); currentStep = n; }
      var card = document.querySelector('.pp-form-card');
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.querySelector('.pp-progress').style.display = 'flex';
    }
  }

  function updateProgress(step) {
    document.getElementById('pp-progress-fill').style.width = Math.round(step/totalSteps*100)+'%';
    document.getElementById('pp-progress-label').textContent = 'Étape '+step+'/'+totalSteps;
  }

  // ── SIREN / Creation ─────────────────────────────────────
  function setCreationMode() {
    isCreation = true;
    document.getElementById('pp-siren-mode').style.display = 'none';
    document.getElementById('pp-creation-mode').style.display = 'block';
  }
  function confirmSiren() { sirenConfirmed = true; }
  function resetSiren() {
    sirenConfirmed = false;
    document.getElementById('pp-siren-confirm').style.display = 'none';
    document.getElementById('pp-siren').value = '';
    document.getElementById('pp-siren').focus();
  }

  // ── Validation ───────────────────────────────────────────
  function validateStep(step) {
    clearErrors();
    if (step === 1) {
      var email = document.getElementById('pp-email'), rgpd = document.getElementById('pp-rgpd_consent');
      var ok = true;
      if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showError('pp-email','pp-email-error'); ok = false; }
      if (!rgpd.checked) { showError(null,'pp-rgpd-error'); ok = false; }
      return ok;
    }
    if (step === 2 && isCreation) {
      if (!document.getElementById('pp-creation_secteur').value) { showError('pp-creation_secteur',null); return false; }
    }
    if (step === 3) {
      if ((parseInt(document.getElementById('pp-requested_amount').value)||0) < 10000) { alert('Le montant minimum est de 10 000 €.'); return false; }
      if (!document.getElementById('pp-project_type').value) { alert('Veuillez choisir un type de projet.'); return false; }
    }
    return true;
  }
  function showError(inputId, errorId) {
    if (inputId) document.getElementById(inputId).classList.add('pp-error');
    if (errorId) document.getElementById(errorId).style.display = 'block';
  }
  function clearErrors() {
    var errs = document.querySelectorAll('#pp-rekiForm .pp-error');
    errs.forEach(function(e) { e.classList.remove('pp-error'); });
    var errMsgs = document.querySelectorAll('#pp-rekiForm .pp-field-error');
    errMsgs.forEach(function(e) { e.style.display = 'none'; });
  }

  function nextStep(from) {
    if (!validateStep(from)) return;
    if (from === 2) {
      var fields = ['pp-revenue-field','pp-revenue-trend-field','pp-cashgen-field','pp-debt-field','pp-cashpos-field'];
      fields.forEach(function(id) { var el = document.getElementById(id); if (el) el.style.display = isCreation ? 'none' : 'block'; });
    }
    showStep(from + 1);
  }
  function prevStep(from) { showStep(from - 1); }
  function backFromVerdict() {
    document.querySelector('.pp-progress').style.display = 'flex';
    showStep(6);
  }

  // ── Helpers ──────────────────────────────────────────────
  function getRadio(name) { var el = document.querySelector('input[name="'+name+'"]:checked'); return el ? el.value : null; }
  function getCheckboxes(name) { return Array.from(document.querySelectorAll('input[name="'+name+'"]:checked')).map(function(el){return el.value;}); }
  function getNum(id) { return parseInt(document.getElementById(id)&&document.getElementById(id).value) || 0; }
  function getStr(id) { return (document.getElementById(id)&&document.getElementById(id).value) || ''; }

  // ── Score bar / Metrics builders ─────────────────────────
  function buildScoreBar(score, cls) {
    return '<div class="pp-score-section"><div class="pp-score-header"><span class="pp-score-label">Score de compatibilité</span><span class="pp-score-pct pp-'+cls+'">'+score+'%</span></div><div class="pp-score-bar-track"><div class="pp-score-bar-fill pp-'+cls+'" style="width:'+score+'%;"></div></div></div>';
  }
  function buildMetrics(v, data) {
    return '<div class="pp-metric-grid">'+
      '<div class="pp-metric-item"><div class="pp-metric-value">'+Math.round((v.coverage||0)*100)+'%</div><div class="pp-metric-label">Couverture</div></div>'+
      '<div class="pp-metric-item"><div class="pp-metric-value">'+Math.round((v.contributionRatio||0)*100)+'%</div><div class="pp-metric-label">Ratio d\'apport</div></div>'+
      '<div class="pp-metric-item"><div class="pp-metric-value">'+(v.actualLoan||data.requested_amount).toLocaleString('fr-FR')+' €</div><div class="pp-metric-label">Montant finançable</div></div>'+
      '<div class="pp-metric-item"><div class="pp-metric-value">'+(v.duree||7)+' ans</div><div class="pp-metric-label">Durée indicative</div></div>'+
    '</div>';
  }

  // ── Verdict Engine ───────────────────────────────────────
  function computeVerdict(data) {
    var contribRatio = data.total_cost > 0 ? data.available_contribution / data.total_cost : 0;
    var actualLoan = Math.min(data.requested_amount, data.total_cost - data.available_contribution);
    var durees = {equipement:7,travaux:10,immobilier:15,reprise:7,bfr:3,tresorerie:2,refinancement:5,developpement:7,creation:7,autre:5};
    var duree = durees[data.project_type]||7;
    var rate = 0.055/12, n = duree*12, monthly=0;
    if (rate>0&&n>0&&actualLoan>0) monthly = actualLoan*rate/(1-Math.pow(1+rate,-n));
    var newAnnualDebt = monthly*12;
    var totalAnnualDebt = data.existing_debt_service+newAnnualDebt;
    var cashgen = data.cashgen_unknown ? (data.isCreation?(data.revenue_ttm*0.15):0) : data.annual_cash_generation;
    var adjCashgen = data.isCreation ? cashgen*0.7 : cashgen;
    var coverage = totalAnnualDebt>0 ? adjCashgen/totalAnnualDebt : (adjCashgen>0?99:0);

    // Score
    var score = 0;
    if (coverage>=1.40) score+=30; else if (coverage>=1.20) score+=24; else if (coverage>=1.00) score+=12; else if (coverage>0) score+=3;
    if (data.isCreation&&data.creation_preuves.some(function(p){return['contrats','ca_deja','franchise_reseau'].indexOf(p)>=0;})) score+=12;
    else if (data.revenue_trend==='hausse_forte') score+=15; else if (data.revenue_trend==='hausse_moderee') score+=12; else if (data.revenue_trend==='stable') score+=9; else if (data.revenue_trend==='baisse_moderee') score+=5; else if (data.revenue_trend==='baisse_forte') score+=1;
    if (data.cash_position==='positive') score+=15; else if (data.cash_position==='faible') score+=11; else if (data.cash_position==='decouvert_ponctuel') score+=6; else if (data.cash_position==='decouvert_perm') score+=2;
    if (!(data.adverse_events.indexOf('none')>=0)&&data.adverse_events.indexOf('echeancier')>=0) score-=3;
    if (contribRatio>=0.30) score+=15; else if (contribRatio>=0.20) score+=12; else if (contribRatio>=0.10) score+=7; else if (contribRatio>0) score+=3;
    if (['equipement','immobilier','reprise'].indexOf(data.project_type)>=0) score+=10; else if (['travaux','developpement'].indexOf(data.project_type)>=0) score+=7; else if (['bfr','tresorerie','refinancement'].indexOf(data.project_type)>=0) score+=4; else score+=5;
    if (!data.isCreation) { var dr = data.revenue_ttm>0?data.existing_debt_service/data.revenue_ttm:0; if (dr<0.10) score+=10; else if (dr<0.20) score+=7; else if (dr<0.35) score+=4; else score+=1; } else score+=5;
    if (data.funds_needed==='6m+'||data.funds_needed==='6m') score+=5; else if (data.funds_needed==='3m') score+=3; else if (data.funds_needed==='1m') score+=2; else score+=1;
    score = Math.max(0,Math.min(100,Math.round(score)));
    var scoreClass = score>=70?'high':(score>=40?'medium':'low');

    // Hors perimetre
    var hp=[];
    if (data.requested_amount<25000) hp.push('Montant inférieur au seuil minimum (25 000 €)');
    if (data.requested_amount>2000000) hp.push('Montant supérieur à 2 000 000 €');
    if (data.adverse_events.indexOf('liquidation')>=0) hp.push('Liquidation judiciaire en cours');
    if (hp.length>0) return {verdict:'non_eligible',reasons:hp,score:0,scoreClass:'low'};

    // Etude approfondie
    var ar=[];
    if (data.adverse_events.indexOf('procedure_collective')>=0) ar.push('Procédure collective en cours');
    if (data.adverse_events.indexOf('retards_fiscaux')>=0) ar.push('Retards fiscaux déclarés');
    if (data.adverse_events.indexOf('retards_sociaux')>=0) ar.push('Retards URSSAF ou sociaux');
    if (data.adverse_events.indexOf('rejets_bancaires')>=0) ar.push('Rejets ou impayés bancaires');
    if (data.adverse_events.indexOf('fp_negatifs')>=0) ar.push('Capitaux propres négatifs');
    if (data.cash_position==='depassements') ar.push('Dépassements ou rejets réguliers');
    if (data.cash_position==='decouvert_perm') ar.push('Découvert utilisé en permanence');
    if (data.cashgen_unknown&&!data.isCreation) ar.push('Capacité de remboursement inconnue');
    if (data.revenue_trend==='baisse_forte') ar.push('Baisse de CA supérieure à 20 %');
    if (data.funds_needed==='15j') ar.push('Besoin des fonds sous 15 jours');
    if (data.adverse_events.indexOf('nsp')>=0) ar.push('Incidents non connus');
    if (data.isCreation&&(!data.creation_experience||data.creation_experience==='non')&&data.creation_preuves.indexOf('contrats')<0&&data.creation_preuves.indexOf('ca_deja')<0&&data.creation_preuves.indexOf('franchise_reseau')<0) ar.push('Création sans expérience ni preuves');
    if (!data.isCreation&&data.revenue_ttm>0&&['immobilier','reprise'].indexOf(data.project_type)<0&&data.requested_amount>data.revenue_ttm*2) ar.push('Montant > 2× CA annuel');
    if (coverage<1.00&&coverage>0) ar.push('Capacité de remboursement insuffisante');
    if (ar.length>0) return {verdict:'etude_approfondie',reasons:ar,score:score,scoreClass:scoreClass,coverage:coverage,actualLoan:actualLoan,duree:duree,newAnnualDebt:newAnnualDebt,contributionRatio:contribRatio};

    // Conditions
    var cond=[];
    var minApport = data.isCreation?0.20:0.15;
    if (contribRatio<minApport) { var manquant=Math.round(minApport*data.total_cost-data.available_contribution); cond.push('Apport faible ('+Math.round(contribRatio*100)+' %) — '+manquant.toLocaleString('fr-FR')+' € supplémentaires recommandés'); }
    if (coverage<1.20&&coverage>=1.00) { var ajuste=Math.round(adjCashgen*0.80/(rate/(1-Math.pow(1+rate,-n)))/12); cond.push('Couverture juste ('+Math.round(coverage*100)+' %) — '+ajuste.toLocaleString('fr-FR')+' € serait plus confortable sur '+duree+' ans'); }
    if (data.revenue_trend==='baisse_moderee') cond.push('Baisse modérée du CA — préparez une explication');
    if (data.cash_position==='decouvert_ponctuel') cond.push('Découvert ponctuel — vérifiez l\'absence de dépassements');
    if (data.funds_needed==='15j'||data.funds_needed==='1m') cond.push('Délai court — l\'instruction bancaire prend 3 à 6 semaines');
    if (data.isCreation&&(data.creation_preuves.length===0||data.creation_preuves.indexOf('aucune')>=0)) cond.push('Absence de preuves commerciales — des devis renforceraient le dossier');
    if (data.adverse_events.indexOf('echeancier')>=0) cond.push('Échéancier en cours — produisez l\'accord');

    if (coverage>=1.20&&score>=70&&cond.length===0) return {verdict:'decision_favorable',reasons:[],score:score,scoreClass:scoreClass,coverage:coverage,actualLoan:actualLoan,duree:duree,newAnnualDebt:newAnnualDebt,contributionRatio:contribRatio};
    if (score>=45&&coverage>=1.00) return {verdict:'decision_favorable',sous_type:'sous_conditions',reasons:cond,score:score,scoreClass:scoreClass,coverage:coverage,actualLoan:actualLoan,duree:duree,newAnnualDebt:newAnnualDebt,contributionRatio:contribRatio};
    if (score>=30) return {verdict:'etude_approfondie',reasons:cond.length>0?cond:['Dossier à approfondir'],score:score,scoreClass:scoreClass,coverage:coverage,actualLoan:actualLoan,duree:duree,contributionRatio:contribRatio};
    return {verdict:'etude_approfondie',reasons:cond,score:score,scoreClass:scoreClass,coverage:coverage,actualLoan:actualLoan,duree:duree,contributionRatio:contribRatio};
  }

  // ── Submit & Display ─────────────────────────────────────
  function submitForm() {
    document.querySelector('.pp-progress').style.display = 'none';
    var data = {
      isCreation:isCreation, siren:getStr('pp-siren'), project_type:getStr('pp-project_type'),
      requested_amount:getNum('pp-requested_amount'), total_cost:getNum('pp-total_cost')||getNum('pp-requested_amount'),
      available_contribution:getNum('pp-available_contribution'), contribution_source:getStr('pp-contribution_source'),
      funds_needed:getStr('pp-funds_needed'), revenue_ttm:getNum('pp-revenue_ttm'), revenue_trend:getRadio('revenue_trend'),
      annual_cash_generation:getNum('pp-annual_cash_generation'), cashgen_unknown:document.getElementById('pp-cashgen_nsp').checked,
      existing_debt_service:getNum('pp-existing_debt_service'), cash_position:getRadio('cash_position'),
      adverse_events:getCheckboxes('adverse_events'), expert_comptable:getRadio('expert_comptable'),
      ec_nom:getStr('pp-ec_nom'), ec_tel:getStr('pp-ec_tel'), ec_email:getStr('pp-ec_email'),
      creation_secteur:getStr('pp-creation_secteur'), creation_experience:getStr('pp-creation_experience'),
      creation_apport_pct:getRadio('creation_apport_pct'), creation_preuves:getCheckboxes('creation_preuves')
    };
    var v = computeVerdict(data);
    displayVerdict(v, data);
  }

  function displayVerdict(v, data) {
    var garanties={equipement:'Gage / Réserve de propriété',travaux:'Caution personnelle',immobilier:'Hypothèque',reprise:'Nantissement FDC + Caution',bfr:'Caution personnelle',tresorerie:'Caution personnelle',refinancement:'Caution personnelle',developpement:'Caution PP + BPI possible',creation:'Caution PP + BPI possible'};
    var gt=garanties[data.project_type]||'Caution personnelle';
    switch(v.verdict){
      case 'decision_favorable':
        if (v.sous_type==='sous_conditions') {
          document.getElementById('pp-v-conditions-list').innerHTML=v.reasons.map(function(r){return'<li>'+r+'</li>';}).join('');
          document.getElementById('pp-v-conditions-score').innerHTML=buildScoreBar(v.score,v.scoreClass)+buildMetrics(v,data);
          showStep('verdict-favorable-conditions');
        } else {
          document.getElementById('pp-estimation-card').innerHTML=buildScoreBar(v.score,v.scoreClass)+buildMetrics(v,data)+
            '<div style="margin-top:0.75rem;padding:0.6rem 0.75rem;background:var(--pp-neutral-000);border-radius:var(--pp-radius-card);">'+
            '<div class="pp-estimation-row"><span class="pp-est-label">Garanties probables</span><span class="pp-est-value">'+gt+'</span></div>'+
            '<div class="pp-estimation-row" style="margin-top:0.25rem;"><span class="pp-est-label">Mensualité estimée</span><span class="pp-est-value">'+(v.newAnnualDebt?Math.round(v.newAnnualDebt/12).toLocaleString('fr-FR')+' €/mois':'—')+'</span></div></div>';
          showStep('verdict-favorable');
        }
        break;
      case 'etude_approfondie':
        document.getElementById('pp-v-analyse-reasons').innerHTML=v.reasons.map(function(r){return'<li>'+r+'</li>';}).join('');
        document.getElementById('pp-v-analyse-score').innerHTML=buildScoreBar(v.score,v.scoreClass)+(v.coverage?buildMetrics(v,data):'');
        showStep('verdict-etude');
        break;
      case 'non_eligible':
        document.getElementById('pp-v-hp-reasons').innerHTML=v.reasons.map(function(r){return'<li>'+r+'</li>';}).join('');
        showStep('verdict-non-eligible');
        break;
    }
  }

  // ── Init ─────────────────────────────────────────────────
  function init() {
    var root = document.getElementById('pp-form');
    if (!root) return;
    root.innerHTML = buildHTML();
    var form = document.getElementById('pp-rekiForm');
    if (!form) return;
    // Build all steps
    var stepsHTML = '';
    for (var i=1; i<=6; i++) stepsHTML += stepHTML(i);
    stepsHTML += stepHTML('vf') + stepHTML('vfc') + stepHTML('ve') + stepHTML('vn');
    form.innerHTML = stepsHTML;

    // SIREN input listener
    var sirenEl = document.getElementById('pp-siren');
    if (sirenEl) {
      sirenEl.addEventListener('input', function() {
        var val = this.value.replace(/\s/g,'');
        if (val.length===9&&/^\d{9}$/.test(val)) {
          document.getElementById('pp-siren-name').textContent='Entreprise identifiée — SIREN '+val;
          document.getElementById('pp-siren-info').textContent='Les informations publiques seront préremplies.';
          document.getElementById('pp-siren-confirm').style.display='block';
        } else { document.getElementById('pp-siren-confirm').style.display='none'; sirenConfirmed=false; }
        isCreation=(val==='');
      });
    }

    // Contribution source toggle
    var contribEl = document.getElementById('pp-available_contribution');
    if (contribEl) contribEl.addEventListener('input', function() {
      document.getElementById('pp-contribution-source-field').style.display=(parseInt(this.value)||0)>0?'block':'none';
    });

    // Cashgen NSP toggle
    var cgEl = document.getElementById('pp-annual_cash_generation');
    if (cgEl) cgEl.addEventListener('input', function() {
      if ((parseInt(this.value)||0)>0) {
        document.getElementById('pp-cashgen_nsp').checked=false;
        document.getElementById('pp-cashgen_nsp').closest('.pp-checkbox-opt').classList.remove('pp-selected');
      }
    });
    var nspEl = document.getElementById('pp-cashgen_nsp');
    if (nspEl) nspEl.addEventListener('change', function() {
      if (this.checked) document.getElementById('pp-annual_cash_generation').value='';
    });

    // EC coords toggle
    var ecGroup = document.getElementById('pp-ec-group');
    if (ecGroup) ecGroup.addEventListener('change', function(e) {
      if (e.target.name==='expert_comptable') document.getElementById('pp-ec-coords').style.display=e.target.value==='oui_coords'?'block':'none';
    });

    // Global change listener (radio/checkbox styling + mutual exclusions)
    document.addEventListener('change', function(e) {
      if (!root.contains(e.target)) return;
      if (e.target.type==='radio') {
        var g = e.target.closest('.pp-radio-group');
        if (g) { g.querySelectorAll('.pp-radio-opt').forEach(function(o){o.classList.remove('pp-selected');}); e.target.closest('.pp-radio-opt').classList.add('pp-selected'); }
      }
      if (e.target.type==='checkbox') {
        e.target.closest('.pp-checkbox-opt')&&e.target.closest('.pp-checkbox-opt').classList.toggle('pp-selected',e.target.checked);
        var cg2=e.target.closest('.pp-checkbox-group');
        if (cg2&&e.target.name==='adverse_events') {
          if (e.target.value==='none'&&e.target.checked) cg2.querySelectorAll('input').forEach(function(cb){if(cb.value!=='none'){cb.checked=false;cb.closest('.pp-checkbox-opt').classList.remove('pp-selected');}});
          else if (e.target.value!=='none'&&e.target.checked) { var nc=cg2.querySelector('input[value="none"]'); if(nc){nc.checked=false;nc.closest('.pp-checkbox-opt').classList.remove('pp-selected');} }
        }
        if (cg2&&e.target.name==='creation_preuves') {
          if (e.target.value==='aucune'&&e.target.checked) cg2.querySelectorAll('input').forEach(function(cb){if(cb.value!=='aucune'){cb.checked=false;cb.closest('.pp-checkbox-opt').classList.remove('pp-selected');}});
          else if (e.target.value!=='aucune'&&e.target.checked) { var nc=cg2.querySelector('input[value="aucune"]'); if(nc){nc.checked=false;nc.closest('.pp-checkbox-opt').classList.remove('pp-selected');} }
        }
      }
    });
  }

  // ── Public API ───────────────────────────────────────────
  window.PP = {
    nextStep: nextStep, prevStep: prevStep, backFromVerdict: backFromVerdict,
    setCreationMode: setCreationMode, confirmSiren: confirmSiren, resetSiren: resetSiren,
    submitForm: submitForm, init: init
  };

  // Auto-init on DOM ready
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
