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
          <div class="pp-step-subtitle">Entrez votre SIREN. Si vous n'avez pas encore d'entreprise, laissez le champ vide.</div>
          <div id="siren-mode">
            <div class="pp-field-group">
              <label for="siren">Numéro SIREN de votre entreprise</label>
              <span class="pp-hint">9 chiffres — nous préremplirons les informations publiques</span>
              <input type="text" id="siren" name="siren" placeholder="ex : 123 456 789" maxlength="9" autocomplete="off" inputmode="numeric" pattern="[0-9]{9}">
            </div>
            <div class="pp-field-group" style="margin-top:-0.25rem;">
              <button type="button" class="pp-btn pp-btn-outline" onclick="setCreationMode()" style="width:auto; font-size:var(--pp-fs-s);">
                Mon entreprise est en cours de création
              </button>
            </div>
            <div id="siren-confirm" style="display:none;" class="pp-company-confirm">
              <div class="pp-name" id="siren-name">—</div>
              <div class="pp-info" id="siren-info">—</div>
              <div style="margin-top:0.75rem; display:flex; gap:0.5rem;">
                <button type="button" class="pp-btn pp-btn-outline" onclick="confirmSiren()" style="font-size:var(--pp-fs-s); flex:1;">Oui, c'est mon entreprise</button>
                <button type="button" class="pp-btn pp-btn-secondary" onclick="resetSiren()" style="font-size:var(--pp-fs-s); flex:1;">Non, modifier le SIREN</button>
              </div>
            </div>
          </div>
          <div id="creation-mode" style="display:none;">
            <div class="pp-company-confirm">
              <div class="pp-name">Entreprise en création</div>
              <div class="pp-info">Parcours adapté aux porteurs de projet sans entreprise encore immatriculée.</div>
            </div>
            <div class="pp-field-group">
              <label for="creation_secteur">Dans quel secteur allez-vous exercer ?</label>
              <select id="creation_secteur" name="creation_secteur">
                <option value="">Sélectionnez un secteur</option>
                <option value="informatique">Informatique / Numérique</option>
                <option value="commerce">Commerce / Distribution</option>
                <option value="industrie">Industrie / Production</option>
                <option value="btp">BTP / Construction</option>
                <option value="services">Services aux entreprises</option>
                <option value="sante">Santé / Médical</option>
                <option value="hotellerie">Hôtellerie / Restauration</option>
                <option value="transport">Transport / Logistique</option>
                <option value="autre">Autre</option>
              </select>
            </div>
          </div>
          <div class="pp-btn-row">
            <button type="button" class="pp-btn pp-btn-primary" onclick="nextStep(1)">Continuer</button>
          </div>
        </div>

        <div class="pp-step" data-step="2">
          <div class="pp-step-title">Votre projet de financement</div>
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

        <!-- ===== ÉTAPE 4 — Financement ===== -->
        <div class="pp-step" data-step="3">
          <div class="pp-step-title">Votre plan de financement</div>
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

        <!-- ===== ÉTAPE 5 — Activité financière ===== -->
        <div class="pp-step" data-step="4">
          <div class="pp-step-title">Votre activité financière</div>
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

          <div class="pp-btn-row">
            
          <div class="pp-field-group">
            <label>Avez-vous déjà clôturé au moins un exercice fiscal ?</label>
            <span class="pp-hint">Un exercice clos signifie que vous avez déposé vos comptes annuels au moins une fois.</span>
            <div class="pp-radio-group">
              <label class="pp-radio-option"><input type="radio" name="exercice_clos" value="1"> Oui, au moins un exercice clos</label>
              <label class="pp-radio-option"><input type="radio" name="exercice_clos" value="0"> Non, pas encore d'exercice clos</label>
              <label class="pp-radio-option"><input type="radio" name="exercice_clos" value="nsp"> Je ne sais pas</label>
            </div>
          </div>

<button type="button" class="pp-btn pp-btn-secondary" onclick="prevStep(4)">Retour</button>
            <button type="button" class="pp-btn pp-btn-primary" onclick="nextStep(4)">Continuer</button>
          </div>
        </div>

        <!-- ===== ÉTAPE 6 — Situation & incidents ===== -->
        <div class="pp-step" data-step="5">
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

          <div class="pp-btn-row">
            <button type="button" class="pp-btn pp-btn-secondary" onclick="prevStep(5)">Retour</button>
            <button type="button" class="pp-btn pp-btn-primary" onclick="submitForm()">
              Continuer
            </button>
          </div>
        </div>

        <!-- ===== VERDICT — Décision favorable ===== -->
        
        <div class="pp-step" data-step="6">
          <div class="pp-step-title">Dernière étape : vos coordonnées</div>
          <div class="pp-step-subtitle">Votre email nous permet de vous envoyer les résultats de l'évaluation.</div>
          <div class="pp-field-group">
            <label for="email">Votre adresse e-mail professionnelle</label>
            <input type="email" id="email" name="email" placeholder="prenom@entreprise.fr" required>
            <div class="pp-field-error" id="email-error">Veuillez entrer une adresse email valide.</div>
          </div>
          <div class="pp-field-group">
            <div class="pp-checkbox-option" id="rgpd-wrap">
              <input type="checkbox" id="rgpd_consent" name="rgpd_consent" required>
              <label for="rgpd_consent" style="margin-bottom:0; font-weight:400; cursor:pointer;">
                J'accepte que Reki traite mes données pour évaluer l'éligibilité de mon projet. Reki enrichit le dossier à partir de données publiques (Pappers/Infogreffe).
                <a href="https://www.reki.eu/politique-de-confidentialite" target="_blank" style="color:var(--pp-brand-yellow-900); text-decoration:underline;">Politique de confidentialité</a>
              </label>
            </div>
            <div class="pp-field-error" id="rgpd-error">Vous devez accepter pour continuer.</div>
          </div>
          <div class="pp-btn-row">
            <button type="button" class="pp-btn pp-btn-secondary" onclick="prevStep(6)">Retour</button>
            <button type="button" class="pp-btn pp-btn-primary" onclick="submitForm()">Obtenir mon évaluation</button>
          </div>
        </div>


        <div class="pp-step" data-step="verdict-favorable">
          <div class="pp-verdict">
            <div class="pp-verdict-icon" style="color: var(--success);">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h2>Décision de principe favorable</h2>
            <p>Les informations communiquées sont compatibles avec les principaux critères analysés pour un financement professionnel. Cette première orientation doit être confirmée par l'étude de vos justificatifs.</p>
            <div class="pp-estimation-card" id="estimation-card"></div>
            <p style="font-size: var(--fs-xs); color: var(--neural-500);">Ces estimations sont indicatives et seront affinées lors de la constitution de votre dossier.</p>
            <div class="pp-btn-row" style="flex-direction: column; gap: 0.5rem;">
              <a href="mailto:contact@reki.eu?subject=Prise%20de%20rendez-vous%20—%20Pré-diagnostic" class="pp-btn pp-btn-primary">Prendre rendez-vous</a>
              <button type="button" class="pp-btn pp-btn-secondary" onclick="backFromVerdict()">← Modifier mes réponses</button>
            </div>
          </div>
        </div>

        <!-- ===== VERDICT — Décision favorable sous conditions ===== -->
        <div class="pp-step" data-step="verdict-favorable-conditions">
          <div class="pp-verdict">
            <div class="pp-verdict-icon" style="color: var(--brand-yellow-800);">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h2>Décision de principe favorable, sous réserve</h2>
            <p>Plusieurs éléments sont favorables, mais le montage devra probablement être adapté. Voici les points à travailler :</p>
            <div id="v-conditions-score"></div>
            <div class="pp-reasons-box"><ul id="v-conditions-list"></ul></div>
            <div class="pp-btn-row" style="flex-direction: column; gap: 0.5rem;">
              <a href="mailto:contact@reki.eu?subject=Accompagnement%20—%20Pré-diagnostic" class="pp-btn pp-btn-primary">Être accompagné</a>
              <button type="button" class="pp-btn pp-btn-secondary" onclick="backFromVerdict()">← Modifier mes réponses</button>
            </div>
          </div>
        </div>

        <!-- ===== VERDICT — Étude approfondie ===== -->
        <div class="pp-step" data-step="verdict-etude">
          <div class="pp-verdict">
            <div class="pp-verdict-icon" style="color: var(--warning);">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <h2>Étude approfondie nécessaire</h2>
            <p>Votre situation mérite une analyse par un expert. Votre projet présente un potentiel, mais certains éléments nécessitent un examen approfondi :</p>
            <div id="v-analyse-score"></div>
            <div class="pp-reasons-box"><ul id="v-analyse-reasons"></ul></div>
            <p>Un conseiller Reki revient vers vous sous 48h avec une analyse détaillée.</p>
            <div class="pp-btn-row" style="flex-direction: column; gap: 0.5rem;">
              <button type="button" class="pp-btn pp-btn-primary" onclick="alert('Un conseiller vous contactera sous 48h.')">Recevoir l'analyse par email</button>
              <button type="button" class="pp-btn pp-btn-secondary" onclick="backFromVerdict()">← Modifier mes réponses</button>
            </div>
          </div>
        </div>

        <!-- ===== VERDICT — Non éligible ===== -->
        <div class="pp-step" data-step="verdict-non-eligible">
          <div class="pp-verdict">
            <div class="pp-verdict-icon" style="color: var(--neural-500);">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </div>
            <h2>Non éligible — des alternatives existent</h2>
            <p>En l'état, ce projet ne correspond pas au périmètre actuel de notre service de financement bancaire.</p>
            <div class="pp-reasons-box"><ul id="v-hp-reasons"></ul></div>
            <p style="margin-top:1rem;">D'autres solutions peuvent correspondre à votre situation.</p>
            <div class="pp-btn-row" style="flex-direction: column; gap: 0.5rem;">
              <a href="mailto:contact@reki.eu?subject=Orientation%20alternative" class="pp-btn pp-btn-primary">Être orienté vers une alternative</a>
              <button type="button" class="pp-btn pp-btn-secondary" onclick="backFromVerdict()">← Modifier mes réponses</button>
            </div>
          </div>
        </div>

      </form>
    </div>
  </section>`;
    }

    function displayServerVerdict(server, data) {
      document.querySelectorAll('.verdict-notice').forEach(el => el.style.display = 'none');
      const est = server.estimations || {};
      const motifs = server.motifs || [];

      switch (server.verdict) {
        case 'decision_favorable':
          if (server.sous_type === 'sous_conditions') {
            document.getElementById('v-conditions-list').innerHTML = motifs.map(r => `<li>${r}</li>`).join('');
            document.getElementById('v-conditions-score').innerHTML = '';
            showStep('verdict-favorable-conditions');
          } else {
            document.getElementById('v-favorable-msg').textContent = motifs.length > 0 ? motifs[0] : 'Les informations communiquées sont compatibles avec les principaux critères analysés.';
            document.getElementById('estimation-card').innerHTML = buildServerEstimations(est);
            showStep('verdict-favorable');
          }
          break;
        case 'etude_approfondie':
          document.getElementById('v-analyse-reasons').innerHTML = motifs.map(r => `<li>${r}</li>`).join('');
          document.getElementById('v-analyse-score').innerHTML = '';
          showStep('verdict-etude');
          break;
        case 'non_eligible':
          document.getElementById('v-hp-reasons').innerHTML = motifs.map(r => `<li>${r}</li>`).join('');
          showStep('verdict-non-eligible');
          break;
        default:
          const local = computeVerdict(data);
          displayLocalVerdictWithNotice(local, data);
      }
    }

    function displayLocalVerdictWithNotice(verdict, data) {
      document.querySelectorAll('.pp-step').forEach(function(s) { s.classList.remove('pp-active'); });
      var screen = document.getElementById('pp-verdict-screen');
      screen.style.display = 'block';
      document.querySelector('.pp-progress').style.display = 'none';
      document.querySelector('.pp-form-card').scrollIntoView({ behavior: 'smooth' });
      var vType = verdict.verdict;
      var titles = { decision_favorable: 'Decision de principe favorable (indicative)', etude_approfondie: 'Etude approfondie necessaire', non_eligible: 'Projet hors perimetre actuel' };
      var colors = { decision_favorable: 'var(--success)', etude_approfondie: 'var(--warning)', non_eligible: 'var(--neural-500)' };
      document.getElementById('pp-verdict-icon').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
      document.getElementById('pp-verdict-icon').style.color = colors[vType] || 'var(--warning)';
      document.getElementById('pp-verdict-title').textContent = titles[vType] || vType;
      document.getElementById('pp-verdict-msg').textContent = verdict.reasons.length > 0 ? verdict.reasons[0] : '';
      document.getElementById('pp-verdict-reasons').innerHTML = verdict.reasons.length > 1 ? verdict.reasons.slice(1).map(function(r) { return '<li>' + r + '</li>'; }).join('') : '';
      document.getElementById('pp-verdict-estimations').innerHTML = '';
      var badge = document.createElement('div');
      badge.style.cssText = 'margin-top:1rem;padding:0.5rem 1rem;background:var(--brand-yellow-tag-bg);color:var(--brand-yellow-900);border-radius:var(--radius-pill);font-size:var(--fs-xs);text-align:center;';
      badge.textContent = '⚠ Estimation indicative — verification en cours';
      document.getElementById('pp-verdict-estimations').appendChild(badge);
    }    // ============ Pre-fill from URL params ============
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
