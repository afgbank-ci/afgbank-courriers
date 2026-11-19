const MOTIVES = [
  {
    id: "debit",
    icon: "↗",
    title: "Réclamation pour débit à tort",
    description: "Contester un débit effectué par AFG Bank ou enregistré sur un distributeur confrère.",
    subject: "Réclamation relative à un débit effectué à tort",
    fields: [
      {
        type: "radio",
        name: "lieuOperation",
        label: "Où l'opération a-t-elle eu lieu ?",
        required: true,
        options: [
          ["gab-afg", "Sur un distributeur automatique (GAB) d'AFG Bank"],
          ["gab-confrere", "Sur un distributeur automatique (GAB) d'une autre banque"],
          ["guichet-afg", "Au guichet d'AFG Bank"],
          ["compte", "Erreur de prélèvement directement sur le compte"]
        ]
      },
      { type: "date", name: "dateOperation", label: "Date de l'opération", required: true },
      { type: "number", name: "montant", label: "Montant débité en FCFA", required: true, min: "1", step: "1" },
      { type: "textarea", name: "precision", label: "Précision complémentaire", optional: true, placeholder: "Ex. Lors de cette opération, le distributeur n'a pas délivré les billets." }
    ]
  },
  {
    id: "resiliation",
    icon: "▤",
    title: "Gestion de contrat BP Capital / NSIA : Résiliation ou Renouvellement",
    description: "Choisir l'arrêt définitif ou le renouvellement de votre contrat.",
    subject: "",
    fields: [
      { type: "text", name: "contrat", label: "Numéro de police / numéro du contrat", required: true },
      { type: "date", name: "dateSouscription", label: "Date de souscription", required: true },
      { type: "date", name: "dateEcheance", label: "Date de fin / d'échéance du contrat", required: true },
      {
        type: "radio",
        name: "actionContrat",
        label: "Action souhaitée",
        required: true,
        options: [
          ["resiliation", "Arrêt définitif (Résiliation du contrat)"],
          ["renouvellement", "Renouvellement (Reconduction du contrat)"]
        ]
      },
      {
        type: "select",
        name: "natureSomme",
        label: "Nature de la somme à récupérer",
        required: true,
        options: [["epargne", "Mon épargne"], ["capital", "Mon capital"]],
        when: ["actionContrat", "resiliation"]
      }
    ]
  },
  {
    id: "carte",
    icon: "▣",
    title: "Carte magnétique : perte, vol, capture, code PIN",
    description: "Demander une opposition définitive, le renouvellement d'une carte, la réédition du code confidentiel.",
    subject: "Demande relative à ma carte magnétique",
    fields: [
      {
        type: "radio",
        name: "demandeCarte",
        label: "Nature de la demande",
        required: true,
        options: [
          ["perdue", "Carte perdue"],
          ["volee", "Carte volée"],
          ["capturee", "Carte avalée par un distributeur"],
          ["code", "Code secret (PIN)"]
        ]
      },
      {
        type: "radio",
        name: "etatCode",
        label: "État du code secret",
        required: true,
        options: [["oublie", "Code oublié"], ["bloque", "Code bloqué"]],
        when: ["demandeCarte", "code"]
      },
      { type: "textarea", name: "precisionCarte", label: "Précision complémentaire", optional: true, placeholder: "Ajoutez une information utile à votre demande." }
    ]
  },
  {
    id: "cloture",
    icon: "⌂",
    title: "Clôture de compte bancaire",
    description: "Demander la fermeture d'un compte bancaire ou de vos deux comptes.",
    subject: "",
    fields: [
      {
        type: "radio",
        name: "comptesCloture",
        label: "Compte(s) à clôturer",
        required: true,
        options: [
          ["courant", "Compte Courant uniquement"],
          ["epargne", "Compte Épargne uniquement"],
          ["deux", "Compte Courant et Compte Épargne (les deux comptes)"]
        ]
      },
      {
        type: "text",
        name: "secondAccount",
        label: "Numéro du second compte (Compte Épargne)",
        required: true,
        placeholder: "Le premier numéro saisi en haut correspond au Compte Courant.",
        when: ["comptesCloture", "deux"]
      },
      {
        type: "radio",
        name: "recuperation",
        label: "Mode de récupération du solde",
        required: true,
        options: [["guichet", "Retrait en espèces au guichet"], ["virement", "Virement bancaire"]]
      },
      {
        type: "text",
        name: "beneficiaire",
        label: "RIB / numéro de compte bénéficiaire",
        optional: true,
        when: ["recuperation", "virement"]
      }
    ]
  },
  {
    id: "cheque",
    icon: "▧",
    title: "Opposition sur chèque / chéquier",
    description: "Signaler la perte ou le vol de chèques et demander leur mise en opposition.",
    subject: "Demande d'opposition sur chèque(s)",
    fields: [
      { type: "select", name: "motifOpposition", label: "Motif de l'opposition", required: true, options: [["perte", "Perte"], ["vol", "Vol"]] },
      { type: "select", name: "typeCheque", label: "Type de support", required: true, options: [["unique", "Chèque unique"], ["chequier", "Chéquier complet"]] },
      { type: "text", name: "numeroCheque", label: "Numéro du chèque", required: true, placeholder: "Ex. 000125", when: ["typeCheque", "unique"] },
      { type: "text", name: "numeroDebut", label: "Numéro du premier chèque", required: true, placeholder: "Ex. 000125", when: ["typeCheque", "chequier"] },
      { type: "text", name: "numeroFin", label: "Numéro du dernier chèque", required: true, placeholder: "Ex. 000150", when: ["typeCheque", "chequier"] }
    ]
  },
  {
    id: "mise-a-jour",
    icon: "✎",
    title: "Mise à jour des informations client",
    description: "Actualiser votre numéro de téléphone, votre adresse ou votre pièce d'identité.",
    subject: "Demande de mise à jour de mes informations client",
    fields: [
      {
        type: "checkbox-group",
        name: "elementsModification",
        label: "Élément(s) à modifier",
        required: true,
        options: [
          ["telephone", "Nouveau numéro de téléphone"],
          ["adresse", "Nouvelle adresse géographique"],
          ["identite", "Renouvellement de pièce d'identité"]
        ]
      },
      { type: "textarea", name: "nouvellesCoordonnees", label: "Nouvelles coordonnées / précisions", required: true, placeholder: "Indiquez les nouvelles informations à enregistrer." }
    ]
  }
];

const form = document.querySelector("#letter-form");
const selectionPanel = document.querySelector("#selection-panel");
const formPanel = document.querySelector("#form-panel");
const previewPanel = document.querySelector("#preview-panel");
const appShell = document.querySelector("#app-shell");
const welcomeScreen = document.querySelector("#welcome-screen");
const specificFieldGrid = document.querySelector("#specific-field-grid");
const downloadButton = document.querySelector("#download-button");
const downloadStatus = document.querySelector("#download-status");
const formError = document.querySelector("#form-error");
const valuesByMotive = new Map();
let selectedMotive = null;
let welcomeExitTimer;

function getLocalDate() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

form.querySelector('[name="date"]').value = getLocalDate();

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function requiredMark(field) {
  return field.required ? ' <b aria-label="obligatoire">*</b>' : ' <small>Facultatif</small>';
}

function renderField(field, fieldIndex) {
  const conditionAttributes = field.when
    ? `data-when-name="${field.when[0]}" data-when-value="${field.when[1]}" hidden`
    : "";
  if (field.type === "radio") {
    const options = field.options.map(([value, label], optionIndex) => {
      const id = `${field.name}-${optionIndex}`;
      return `<label class="choice-option" for="${id}">
        <input id="${id}" type="radio" name="${field.name}" value="${escapeAttribute(value)}" ${field.required ? "required" : ""}>
        <span>${label}</span>
      </label>`;
    }).join("");
    return `<fieldset class="choice-field" ${conditionAttributes}>
      <legend>${field.label}${requiredMark(field)}</legend>
      <div class="choice-list">${options}</div>
    </fieldset>`;
  }

  if (field.type === "checkbox-group") {
    const options = field.options.map(([value, label], optionIndex) => {
      const id = `${field.name}-${optionIndex}`;
      return `<label class="check-option" for="${id}">
        <input id="${id}" type="checkbox" name="${field.name}" value="${escapeAttribute(value)}">
        <span>${label}</span>
      </label>`;
    }).join("");
    return `<fieldset class="choice-field checkbox-field" data-checkbox-group="${field.name}">
      <legend>${field.label}${requiredMark(field)}</legend>
      <div class="choice-list">${options}</div>
    </fieldset>`;
  }

  const label = `<span>${field.label}${requiredMark(field)}</span>`;
  if (field.type === "select") {
    const options = field.options.map(([value, text]) => `<option value="${escapeAttribute(value)}">${text}</option>`).join("");
    return `<label class="field" for="specific-${fieldIndex}" ${conditionAttributes}>${label}
      <select id="specific-${fieldIndex}" name="${field.name}" ${field.required ? "required" : ""}>
        <option value="">Choisir une option</option>${options}
      </select>
    </label>`;
  }
  if (field.type === "textarea") {
    return `<label class="field field-wide" for="specific-${fieldIndex}" ${conditionAttributes}>${label}
      <textarea id="specific-${fieldIndex}" name="${field.name}" rows="3" ${field.required ? "required" : ""} ${field.placeholder ? `placeholder="${escapeAttribute(field.placeholder)}"` : ""}></textarea>
    </label>`;
  }
  const constraints = [
    field.required ? "required" : "",
    field.min ? `min="${field.min}"` : "",
    field.step ? `step="${field.step}"` : "",
    field.placeholder ? `placeholder="${escapeAttribute(field.placeholder)}"` : ""
  ].filter(Boolean).join(" ");
  return `<label class="field" for="specific-${fieldIndex}" ${conditionAttributes}>${label}
    <input id="specific-${fieldIndex}" type="${field.type}" name="${field.name}" ${constraints}>
  </label>`;
}

function saveSpecificValues() {
  if (!selectedMotive) return;
  const values = {};
  specificFieldGrid.querySelectorAll("input, select, textarea").forEach((input) => {
    if (input.type === "radio") {
      if (input.checked) values[input.name] = input.value;
    } else if (input.type === "checkbox") {
      if (!values[input.name]) values[input.name] = [];
      if (input.checked) values[input.name].push(input.value);
    } else {
      values[input.name] = input.value;
    }
  });
  valuesByMotive.set(selectedMotive.id, values);
}

function restoreSpecificValues() {
  const values = valuesByMotive.get(selectedMotive.id);
  if (!values) return;
  specificFieldGrid.querySelectorAll("input, select, textarea").forEach((input) => {
    if (input.type === "radio") {
      input.checked = values[input.name] === input.value;
    } else if (input.type === "checkbox") {
      input.checked = (values[input.name] || []).includes(input.value);
    } else if (Object.hasOwn(values, input.name)) {
      input.value = values[input.name];
    }
  });
}

function updateConditionalFields() {
  specificFieldGrid.querySelectorAll("[data-when-name]").forEach((field) => {
    const visible = fieldValue(field.dataset.whenName) === field.dataset.whenValue;
    field.hidden = !visible;
    field.querySelectorAll("input, select, textarea").forEach((control) => {
      control.disabled = !visible;
      control.required = visible && selectedMotive.fields.find((item) => item.name === control.name).required;
    });
  });
  const accountHint = document.querySelector("#account-number-hint");
  accountHint.hidden = selectedMotive.id !== "cloture" || fieldValue("comptesCloture") !== "deux";
}

function updateCardRequirement() {
  const origin = checkedValue("lieuOperation");
  const required = selectedMotive?.id === "carte"
    || (selectedMotive?.id === "debit" && ["gab-afg", "gab-confrere"].includes(origin));
  const first = form.querySelector('[name="cardFirst"]');
  const last = form.querySelector('[name="cardLast"]');
  first.required = required;
  last.required = required;
  document.querySelector("#card-requirement-label").textContent = required ? "Obligatoire" : "Facultatif";
  document.querySelector("#card-first-required").hidden = !required;
  document.querySelector("#card-last-required").hidden = !required;

  const eitherDigitEntered = first.value !== "" || last.value !== "";
  const pairValid = !eitherDigitEntered || (
    /^\d{4}$/.test(first.value)
    && /^\d{4}$/.test(last.value)
  );
  first.setCustomValidity(pairValid ? "" : "Saisissez exactement quatre chiffres dans chaque champ.");
  last.setCustomValidity(pairValid ? "" : "Saisissez exactement quatre chiffres dans chaque champ.");
}

function getMaskedCardNumber() {
  const first = fieldValue("cardFirst");
  const last = fieldValue("cardLast");
  return first && last ? `${first} **** **** ${last}` : "";
}

function renderMotives() {
  const list = document.querySelector("#reason-list");
  list.innerHTML = MOTIVES.map((motive) => `
    <label class="reason-card">
      <input class="sr-only" type="radio" name="motif" value="${motive.id}" aria-label="${motive.title}" ${selectedMotive?.id === motive.id ? "checked" : ""}>
      <span class="reason-icon" aria-hidden="true">${motive.icon}</span>
      <span class="reason-copy"><strong>${motive.title}</strong><span>${motive.description}</span></span>
      <span class="reason-arrow" aria-hidden="true">→</span>
    </label>
  `).join("");

  list.addEventListener("change", (event) => {
    if (event.target.name !== "motif") return;
    saveSpecificValues();
    selectedMotive = MOTIVES.find((motive) => motive.id === event.target.value);
    document.querySelector("#continue-button").disabled = !selectedMotive;
  });
}

function showStep(step) {
  selectionPanel.hidden = step !== 1;
  formPanel.hidden = step !== 2;
  previewPanel.hidden = step !== 3;
  document.querySelectorAll("[data-step-indicator]").forEach((indicator) => {
    const number = Number(indicator.dataset.stepIndicator);
    indicator.classList.toggle("is-active", number === step);
    indicator.classList.toggle("is-complete", number < step);
    if (number === step) indicator.setAttribute("aria-current", "step");
    else indicator.removeAttribute("aria-current");
  });
}

function revealApplication() {
  if (!welcomeScreen.classList.contains("is-leaving")) return;
  window.clearTimeout(welcomeExitTimer);
  welcomeScreen.hidden = true;
  welcomeScreen.classList.remove("is-leaving");
  appShell.hidden = false;
  appShell.inert = false;
  appShell.setAttribute("aria-hidden", "false");
  showStep(1);
  window.scrollTo(0, 0);
}

function enterApplication() {
  if (welcomeScreen.classList.contains("is-leaving")) return;
  welcomeScreen.classList.add("is-leaving");
  welcomeExitTimer = window.setTimeout(revealApplication, 450);
}

function returnToWelcome() {
  showStep(1);
  appShell.hidden = true;
  appShell.inert = true;
  appShell.setAttribute("aria-hidden", "true");
  welcomeScreen.hidden = false;
  welcomeScreen.classList.remove("is-leaving", "welcome-animate");
  void welcomeScreen.offsetWidth;
  welcomeScreen.classList.add("welcome-animate");
  window.scrollTo(0, 0);
  document.querySelector("#welcome-cta").focus({ preventScroll: true });
}

function openForm() {
  if (!selectedMotive) return;
  document.querySelector("#selected-reason").textContent = selectedMotive.title;
  document.querySelector("#specific-legend").textContent = `Détails : ${selectedMotive.title}`;
  specificFieldGrid.innerHTML = selectedMotive.fields.map(renderField).join("");
  restoreSpecificValues();
  updateConditionalFields();
  updateCardRequirement();
  setCheckboxGroupValidity();
  formError.hidden = true;
  showStep(2);
  form.querySelector('[name="nom"]').focus({ preventScroll: true });
  formPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function formatDate(value) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    .format(new Date(`${value}T12:00:00`));
}

function fieldValue(name) {
  const control = form.querySelector(`[name="${name}"]`);
  if (control?.type === "radio") return checkedValue(name);
  return control ? control.value.trim() : "";
}

function checkedValue(name) {
  return form.querySelector(`[name="${name}"]:checked`)?.value || "";
}

function selectedLabels(name) {
  const values = new Set([...form.querySelectorAll(`[name="${name}"]:checked`)].map((input) => input.value));
  const field = selectedMotive.fields.find((item) => item.name === name);
  return field.options.filter(([value]) => values.has(value)).map(([, label]) => label);
}

function normalizePrecision(value) {
  const text = value.trim().replace(/\s+/g, " ");
  if (!text) return "";
  const sentence = text.replace(/[.!?…,:;]+$/u, "");
  if (!sentence) return "";
  const initial = [...sentence][0];
  return `${initial.toLocaleUpperCase("fr-FR")}${sentence.slice(initial.length)}.`;
}

function appendPrecision(paragraph, value) {
  const precision = normalizePrecision(value);
  return precision ? `${paragraph}\n\n${precision}` : paragraph;
}

function debitBody() {
  const location = checkedValue("lieuOperation");
  const amount = new Intl.NumberFormat("fr-FR").format(Number(fieldValue("montant")));
  const date = formatDate(fieldValue("dateOperation"));
  const opening = location === "gab-afg"
    ? `Je viens par la présente solliciter votre bienveillance au sujet d'un débit de ${amount} FCFA effectué le ${date} sur un guichet automatique d'AFG Bank`
    : location === "gab-confrere"
      ? `Je viens par la présente solliciter votre bienveillance au sujet d'un débit de ${amount} FCFA effectué le ${date} sur le guichet automatique d'une banque confrère`
      : location === "guichet-afg"
        ? `Je viens par la présente solliciter votre bienveillance au sujet d'un débit injustifié de ${amount} FCFA effectué le ${date} au guichet d'AFG Bank`
        : `Je viens par la présente solliciter votre bienveillance au sujet d'un débit injustifié de ${amount} FCFA enregistré le ${date} directement sur mon compte`;
  const cardReference = ["gab-afg", "gab-confrere"].includes(location) ? getMaskedCardNumber() : "";
  const referenceSentence = cardReference ? `\n\nLa carte concernée porte le numéro ${cardReference}.` : "";
  const body = `${opening}.${referenceSentence}\n\nJe vous remercie de vérifier cette opération et de régulariser le montant débité si ma réclamation est fondée.`;
  return appendPrecision(body, fieldValue("precision"));
}

function resiliationBody() {
  const action = checkedValue("actionContrat");
  const contrat = fieldValue("contrat");
  const souscription = formatDate(fieldValue("dateSouscription"));
  const echeance = formatDate(fieldValue("dateEcheance"));

  if (action === "renouvellement") {
    return `Je viens par la présente vous demander le renouvellement de mon contrat n° ${contrat}, souscrit le ${souscription} et arrivant à échéance le ${echeance}.\n\nJe vous prie de bien vouloir reconduire ce contrat aux conditions convenues et de maintenir les prélèvements automatiques associés sur mon compte bancaire à compter de la nouvelle période.\n\nDans l'attente de la confirmation de cette reconduction, je vous prie d'agréer, Madame, Monsieur, l'expression de ma considération distinguée.`;
  }

  const sum = fieldValue("natureSomme") === "capital" ? "mon capital" : "mon épargne";
  return `Je viens par la présente vous demander la résiliation définitive de mon contrat n° ${contrat}, souscrit le ${souscription} et arrivant à échéance le ${echeance}.\n\nJe vous prie également de bien vouloir procéder à l'arrêt définitif des prélèvements automatiques liés à ce contrat sur mon compte bancaire, ainsi qu'au règlement de ${sum} conformément aux conditions prévues.\n\nDans l'attente de la prise en compte de ma demande, je vous prie d'agréer, Madame, Monsieur, l'expression de ma considération distinguée.`;
}

function cardBody() {
  const reference = getMaskedCardNumber();
  const precision = normalizePrecision(fieldValue("precisionCarte"));
  const detail = precision ? ` ${precision}` : "";
  const request = checkedValue("demandeCarte");
  const closing = "Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, l'expression de ma considération distinguée.";
  const actions = {
    perdue: `Je viens par la présente porter à votre connaissance la perte de ma carte bancaire portant le numéro ${reference}.${detail}\n\nAfin de sécuriser mon compte, je vous prie de bien vouloir enregistrer sans délai une opposition définitive sur cette carte et de procéder à la commande d'une nouvelle carte de remplacement.\n\n${closing}`,
    volee: `Je viens par la présente porter à votre connaissance le vol de ma carte bancaire portant le numéro ${reference}.${detail}\n\nAfin de prévenir toute utilisation frauduleuse, je vous prie de bien vouloir enregistrer immédiatement une opposition définitive sur cette carte et de lancer la fabrication d'une nouvelle carte.\n\n${closing}`,
    capturee: `Je viens par la présente vous informer que ma carte bancaire portant le numéro ${reference} a été retenue par un distributeur automatique de billets.${detail}\n\nJe vous prie de bien vouloir prendre les dispositions nécessaires afin de me la restituer ou de procéder à son remplacement.\n\n${closing}`,
    code: `Je viens par la présente solliciter votre bienveillance concernant ma carte bancaire portant le numéro ${reference}, dont le code secret est ${checkedValue("etatCode") === "oublie" ? "oublié" : "bloqué"}.${detail}\n\nJe vous prie de bien vouloir procéder à la réédition d'un nouveau code confidentiel afin que je puisse à nouveau utiliser ma carte normalement.\n\n${closing}`
  };
  return actions[request];
}

function closureBody() {
  const bothAccounts = fieldValue("comptesCloture") === "deux";
  const accountType = fieldValue("comptesCloture") === "courant" ? "courant" : "épargne";
  const recovery = fieldValue("recuperation") === "guichet"
    ? "par retrait en espèces au guichet"
    : `par virement bancaire${fieldValue("beneficiaire") ? ` vers le compte bénéficiaire n° ${fieldValue("beneficiaire")}` : ""}`;
  if (bothAccounts) {
    return `Je viens par la présente vous demander de bien vouloir procéder à la clôture définitive de mes comptes ouverts dans vos livres, à savoir mon compte courant n° ${fieldValue("compte")} ainsi que mon compte épargne n° ${fieldValue("secondAccount")}.\n\nJe vous prie de bien vouloir me restituer les soldes créditeurs éventuels ${recovery}, après déduction des frais éventuels liés à ces clôtures.\n\nDans l'attente de la confirmation de ces opérations, je vous prie d'agréer, Madame, Monsieur, l'expression de ma considération distinguée.`;
  }
  return `Je viens par la présente vous demander de bien vouloir procéder à la clôture définitive de mon compte ${accountType} n° ${fieldValue("compte")} ouvert dans vos livres.\n\nJe vous prie de bien vouloir me restituer le solde créditeur éventuel ${recovery}, après déduction des frais éventuels liés à cette clôture.\n\nDans l'attente de la confirmation de cette opération, je vous prie d'agréer, Madame, Monsieur, l'expression de ma considération distinguée.`;
}

function chequeBody() {
  const reason = fieldValue("motifOpposition") === "perte" ? "la perte" : "le vol";
  const isCheckbook = fieldValue("typeCheque") === "chequier";
  const report = isCheckbook
    ? `${reason} de mon chéquier complet, du n° ${fieldValue("numeroDebut")} au n° ${fieldValue("numeroFin")}`
    : `${reason} du chèque n° ${fieldValue("numeroCheque")}`;
  return `Je viens par la présente porter à votre connaissance ${report}. Je vous prie d'enregistrer une opposition sur les chèques rattachés à mon compte n° ${fieldValue("compte")} et d'empêcher leur paiement.`;
}

function joinFrench(items) {
  if (items.length < 2) return items[0] || "";
  if (items.length === 2) return `${items[0]} et ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} et ${items.at(-1)}`;
}

function updateBody() {
  const elements = joinFrench(selectedLabels("elementsModification"));
  return `Je viens par la présente solliciter la mise à jour des informations associées à mon compte n° ${fieldValue("compte")}. Les éléments à modifier sont les suivants : ${elements}. Voici les nouvelles informations à enregistrer : ${fieldValue("nouvellesCoordonnees")}. Je reste à votre disposition pour transmettre les pièces justificatives nécessaires.`;
}


function getLetterBody() {
  const templates = {
    debit: debitBody,
    resiliation: resiliationBody,
    carte: cardBody,
    cloture: closureBody,
    cheque: chequeBody,
    "mise-a-jour": updateBody
  };
  return templates[selectedMotive.id]();
}

function renderPreview() {
  const fullName = `${fieldValue("prenoms")} ${fieldValue("nom")}`;
  document.querySelector("#document-name").textContent = fullName;
  const accountLabel = document.querySelector("#document-account");
  const secondAccountLabel = document.querySelector("#document-second-account");
  if (selectedMotive.id === "cloture" && fieldValue("comptesCloture") === "deux") {
    accountLabel.textContent = `N° de compte courant : ${fieldValue("compte")}`;
    secondAccountLabel.textContent = `N° de compte épargne : ${fieldValue("secondAccount")}`;
    secondAccountLabel.hidden = false;
  } else {
    accountLabel.textContent = `N° de compte : ${fieldValue("compte")}`;
    secondAccountLabel.textContent = "";
    secondAccountLabel.hidden = true;
  }
  document.querySelector("#document-phone").textContent = `Téléphone : ${fieldValue("telephone")}`;
  document.querySelector("#document-email").textContent = `E-mail : ${fieldValue("email")}`;
  const branch = document.querySelector("#document-sender-branch");
  branch.textContent = fieldValue("agence") ? `Agence : ${fieldValue("agence")}` : "";
  branch.hidden = !fieldValue("agence");
  const cardReference = getMaskedCardNumber();
  const card = document.querySelector("#document-card");
  card.textContent = cardReference ? `Carte bancaire : ${cardReference}` : "";
  card.hidden = !cardReference;
  document.querySelector("#document-date").textContent = `Fait à Abidjan, le ${formatDate(fieldValue("date"))}`;
  const subject = selectedMotive.id === "resiliation"
    ? `${checkedValue("actionContrat") === "renouvellement" ? "Demande de renouvellement" : "Demande de résiliation définitive"} du contrat n° ${fieldValue("contrat")}`
    : selectedMotive.id === "cloture"
      ? fieldValue("comptesCloture") === "deux"
        ? "Demande de clôture de mes comptes courant et épargne"
        : `Demande de clôture de compte ${fieldValue("comptesCloture") === "courant" ? "courant" : "épargne"}`
      : selectedMotive.subject;
  document.querySelector("#document-subject").textContent = subject;
  document.querySelector("#document-body").textContent = getLetterBody();
  const closing = document.querySelector(".document-closing");
  const salutation = document.querySelector(".document-salutation");
  const hasFullTemplate = ["resiliation", "carte", "cloture"].includes(selectedMotive.id);
  closing.hidden = hasFullTemplate;
  salutation.hidden = hasFullTemplate;
  document.querySelector("#document-signature").textContent = fullName;
}

function setCheckboxGroupValidity() {
  const group = form.querySelector('[data-checkbox-group="elementsModification"]');
  if (!group) return;
  const firstCheckbox = group.querySelector('input[type="checkbox"]');
  const hasSelection = group.querySelector('input[type="checkbox"]:checked');
  firstCheckbox.setCustomValidity(hasSelection ? "" : "Sélectionnez au moins un élément à modifier.");
}

const welcomeLogoImage = document.querySelector("#welcome-logo img");
const welcomeLogoFallback = document.querySelector(".welcome-logo-fallback");
function showWelcomeLogoFallback() {
  welcomeLogoImage.hidden = true;
  welcomeLogoFallback.hidden = false;
}
welcomeLogoImage.addEventListener("error", showWelcomeLogoFallback);
if (welcomeLogoImage.complete && welcomeLogoImage.naturalWidth === 0) showWelcomeLogoFallback();

document.querySelector("#welcome-cta").addEventListener("click", enterApplication);
welcomeScreen.addEventListener("transitionend", (event) => {
  if (event.target === welcomeScreen && event.propertyName === "opacity") revealApplication();
});
document.querySelector("#brand-home").addEventListener("click", (event) => {
  event.preventDefault();
  returnToWelcome();
});

const qrModal = document.querySelector("#qr-modal");
const showQrButton = document.querySelector("#show-qr-button");
showQrButton.addEventListener("click", () => qrModal.showModal());
document.querySelector("#close-qr-button").addEventListener("click", () => qrModal.close());
qrModal.addEventListener("click", (event) => {
  if (event.target === qrModal) qrModal.close();
});

document.querySelector("#continue-button").addEventListener("click", openForm);
document.querySelector("#back-to-reasons").addEventListener("click", () => {
  saveSpecificValues();
  showStep(1);
  selectionPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});
document.querySelector("#form-back-button").addEventListener("click", () => {
  saveSpecificValues();
  showStep(1);
  selectionPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

specificFieldGrid.addEventListener("change", (event) => {
  if (event.target.type === "checkbox") setCheckboxGroupValidity();
  updateConditionalFields();
  if (event.target.name === "lieuOperation") updateCardRequirement();
});
specificFieldGrid.addEventListener("input", () => {
  formError.hidden = true;
});
form.addEventListener("input", (event) => {
  if (event.target.name === "cardFirst" || event.target.name === "cardLast") {
    updateCardRequirement();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  setCheckboxGroupValidity();
  updateCardRequirement();
  if (!form.reportValidity()) {
    formError.textContent = "Veuillez vérifier les champs obligatoires avant de continuer.";
    formError.hidden = false;
    return;
  }

  saveSpecificValues();
  renderPreview();
  downloadStatus.textContent = "";
  showStep(3);
  document.querySelector("#preview-title").focus({ preventScroll: true });
  previewPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#edit-button").addEventListener("click", () => {
  showStep(2);
  form.querySelector('[name="nom"]').focus({ preventScroll: true });
  formPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

downloadButton.addEventListener("click", async () => {
  if (typeof html2pdf !== "function") {
    downloadStatus.textContent = "Le service PDF n'a pas pu être chargé. Vérifiez votre connexion puis réessayez.";
    return;
  }

  downloadButton.disabled = true;
  downloadStatus.textContent = "Préparation de votre document PDF…";
  const letterDocument = document.querySelector("#letter-document");
  letterDocument.classList.add("is-exporting");
  const safeName = `${fieldValue("nom")}_${fieldValue("prenoms")}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  try {
    await html2pdf()
      .set({
        margin: 0,
        filename: `Courrier_AFGBank_${safeName || "Client"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff", scrollY: 0 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"], avoid: [".document-header", ".recipient-block", ".signature-row"] }
      })
      .from(letterDocument)
      .save();
    downloadStatus.textContent = "Votre courrier PDF a été téléchargé.";
  } catch (error) {
    console.error("Échec de la génération du PDF.", error);
    downloadStatus.textContent = "Le téléchargement a échoué. Vérifiez votre connexion puis réessayez.";
  } finally {
    letterDocument.classList.remove("is-exporting");
    downloadButton.disabled = false;
  }
});

renderMotives();
