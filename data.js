const sources = {
  vascularReview: {
    title:
      "Rutman et al. Incidental vascular findings on brain magnetic resonance angiography. British Journal of Radiology (2023).",
    url: "https://doi.org/10.1259/bjr.20220135",
    type: "Radiology review",
    note: "MRA characterization, incidental aneurysms, and vascular mimics; supplements rather than replaces treatment guidelines.",
  },
  pinealReview: {
    title:
      "Jenkinson et al. Management of pineal and colloid cysts. Practical Neurology (2021).",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8327315/",
    type: "Peer-reviewed review",
    note: "Colloid cyst risk assessment and pragmatic observation; not an ACR algorithm.",
  },
  brainReview: {
    title:
      "Incidental findings on brain MRI in adults: imaging spectrum, clinical significance, and management (British Journal of Radiology, 2023).",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9975529/",
    type: "Radiology review",
    note: "Radiology context for incidental intracranial findings; not a lesion-specific validated treatment algorithm.",
  },
  eso: {
    title:
      "Etminan et al. European Stroke Organisation guidelines on management of unruptured intracranial aneurysms (2022).",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9446328/",
    type: "Society guideline",
    note: "Compare estimated rupture risk with treatment risk through a multidisciplinary shared decision; no size-only treatment mandate.",
  },
  pineal: {
    title:
      "Moonis et al. Management of Incidentally Discovered Pineal Cyst on CT and MRI: Recommendations from the ACR Incidental Findings Committee. JACR 2026;23:117–122.",
    url: "https://doi.org/10.1016/j.jacr.2025.09.006",
    type: "ACR consensus algorithm",
    verified: true,
    note: "User-supplied full text and Figures 1–2 reviewed. Adults ≥18 years. MRI and CT have distinct branches; surveillance dates are measured from the initial study.",
  },
  pituitary: {
    title:
      "Freda et al. Pituitary Incidentaloma: An Endocrine Society Clinical Practice Guideline (2011).",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5393422/",
    type: "Society guideline",
    note: "Baseline endocrine evaluation, visual fields when the optic apparatus is involved, and size-dependent MRI surveillance.",
  },
  acr: {
    title:
      "ACR Incidental Findings Committee. Management of Incidental Pituitary Findings on CT, MRI, and 18F-FDG PET (2018).",
    url: "https://doi.org/10.1016/j.jacr.2018.03.037",
    type: "ACR white paper",
    note: "Dedicated incidental pituitary algorithm. Endocrine Society intervals below are identified separately; do not interpret them as an ACR-derived rule.",
  },
  arachnoid: {
    title:
      "Carbone & Sadasivan. Intracranial arachnoid cysts: Review of natural history and proposed treatment algorithm (2021).",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8720473/",
    type: "Peer-reviewed review",
    note: "Most typical asymptomatic cysts need no surveillance; location, size, and symptoms affect referral.",
  },
  meningioma: {
    title:
      "Goldbrunner et al. EANO guideline on the diagnosis and management of meningiomas (2021).",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8563316/",
    type: "Society guideline",
    note: "Observation is a first option for incidental asymptomatic suspected meningioma; MRI generally annually for five years for suspected or WHO grade 1 lesions.",
  },
  vestibular: {
    title:
      "Goldbrunner et al. EANO guideline on the diagnosis and treatment of vestibular schwannoma (2020).",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6954440/",
    type: "Society guideline",
    note: "Observation, radiosurgery, and surgery depend on tumor size and symptoms. Annual MRI and audiometry for five years are supported for untreated tumors.",
  },
  white: {
    title:
      "Ottavi et al. Consensus statement for the management of incidentally found brain white matter hyperintensities (2023).",
    url: "https://doi.org/10.5694/mja2.52079",
    type: "Consensus statement",
    note: "Assess neurological history and cardiovascular risks. Do not prescribe antiplatelets solely for incidental WMH without another indication.",
  },
  aneurysm: {
    title:
      "Thompson et al. AHA/ASA Guidelines for the Management of Patients With Unruptured Intracranial Aneurysms (2015).",
    url: "https://doi.org/10.1161/STR.0000000000000070",
    type: "Society guideline",
    note: "Specialist risk assessment is essential. Initial surveillance at 6–12 months, then yearly or every other year, may be reasonable when observation is selected.",
  },
  carotid: {
    title:
      "Naylor et al. ESVS 2023 Clinical Practice Guidelines on Atherosclerotic Carotid and Vertebral Artery Disease.",
    url: "https://doi.org/10.1016/j.ejvs.2022.04.011",
    type: "Society guideline",
    note: "Management depends on symptoms, stenosis severity, medical therapy, life expectancy, and procedural risk.",
  },
  dva: {
    title:
      "Hsu & Krings. Symptomatic Developmental Venous Anomaly: State-of-the-Art Review (2023).",
    url: "https://doi.org/10.3174/ajnr.A7829",
    type: "Peer-reviewed review",
    note: "Most DVAs are benign incidental findings. Symptomatic presentations require assessment for associated pathology; preserve venous drainage.",
  },
  cavernous: {
    title:
      "Akers et al. Angioma Alliance consensus recommendations for cerebral cavernous malformations (2017).",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5808153/",
    type: "Consensus guideline",
    note: "Routine surveillance timing is not well established. Repeat imaging is driven by symptoms and shared management decisions.",
  },
  skull: {
    title: "Gomez et al. Radiological review of skull lesions (2018).",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6206383/",
    type: "Peer-reviewed review",
    note: "Imaging characterization and clinical context guide workup. This review does not supply a universal follow-up interval.",
  },
};
const topics = [
  {
    id: "pineal",
    name: "Pineal cyst",
    category: "Cysts & incidentalomas",
    color: "#b09af5",
    icon: "◉",
    desc: "Typical vs. atypical cysts, size thresholds, and when to follow up.",
    refs: ["pineal"],
    notes:
      "ACR 2026 defines simple cysts by a thin or imperceptible wall and uniform fluid (MRI: T2/FLAIR; CT: attenuation). Nonsimple means thickened wall, a nodule, or nonsimple fluid. CT and MRI branches differ for nonsimple cysts <10 mm. Aqueduct compromise, tectal abnormality, hydrocephalus, or attributable symptoms override size. Isolated headache alone without pressure/mass-effect features is insufficient for neurosurgical referral. Follow-up dates are measured from the initial study.",
  },
  {
    id: "pituitary",
    name: "Pituitary incidentaloma",
    category: "Cysts & incidentalomas",
    color: "#86b2ed",
    icon: "♧",
    desc: "Size-based surveillance, endocrine evaluation, and visual assessment.",
    refs: ["acr", "pituitary"],
    notes:
      "Assess for hormone hypersecretion and hypopituitarism. Obtain a dedicated pituitary MRI if initially detected on CT. Visual-field testing is indicated for a lesion abutting or compressing the optic nerves or chiasm. MRI intervals here follow the 2011 Endocrine Society guideline.",
  },
  {
    id: "arachnoid",
    name: "Arachnoid cyst",
    category: "Cysts & incidentalomas",
    color: "#75c7b0",
    icon: "◌",
    desc: "Recognize typical findings and identify cases that need referral.",
    refs: ["arachnoid"],
    notes:
      "Typical cysts follow CSF signal and do not restrict diffusion. Large cysts, hydrocephalus-sensitive locations, atypical imaging, or attributable symptoms merit specialist review. Size alone is not a universal treatment threshold.",
  },
  {
    id: "colloid",
    name: "Colloid cyst",
    category: "Cysts & incidentalomas",
    color: "#e2b777",
    icon: "⊙",
    desc: "Risk assessment, hydrocephalus, and neurosurgical review.",
    refs: ["pinealReview"],
    notes:
      "Consider age, headache, cyst diameter, FLAIR signal, and location in the colloid cyst risk score. Do not infer risk from diameter alone. Hydrocephalus or symptoms of raised intracranial pressure require urgent assessment.",
  },
  {
    id: "meningioma",
    name: "Meningioma",
    category: "Tumors",
    color: "#df93b7",
    icon: "⬡",
    desc: "Observation pathways for incidental, asymptomatic lesions.",
    refs: ["meningioma"],
    notes:
      "Growth, edema, proximity to critical structures, symptoms, and patient factors influence observation versus treatment. The annual MRI recommendation is a consensus good-practice point and should be individualized.",
  },
  {
    id: "vestibular",
    name: "Vestibular schwannoma",
    category: "Tumors",
    color: "#b199eb",
    icon: "◔",
    desc: "Imaging surveillance, hearing assessment, and treatment options.",
    refs: ["vestibular"],
    notes:
      "Document hearing and vestibular symptoms, size, growth, and brainstem effects. Observation can be appropriate for small asymptomatic tumors; larger or symptomatic lesions require multidisciplinary evaluation.",
  },
  {
    id: "white",
    name: "White matter lesions",
    category: "Other findings",
    color: "#8ab4d1",
    icon: "∿",
    desc: "Vascular risk assessment and context for incidental hyperintensities.",
    refs: ["white"],
    notes:
      "This pathway applies to presumed vascular incidental white matter hyperintensities in adults. It does not cover suspected demyelination, infection, hereditary disease, or acute infarction.",
  },
  {
    id: "aneurysm",
    name: "Unruptured aneurysm",
    category: "Vascular",
    color: "#e39494",
    icon: "⌁",
    desc: "Individual rupture risk, specialist assessment, and surveillance.",
    refs: ["aneurysm", "eso"],
    notes:
      "Location, morphology, growth, prior subarachnoid hemorrhage, family history, smoking, hypertension, and age matter. Sudden severe headache or neurological deficit warrants urgent emergency evaluation.",
  },
  {
    id: "carotid",
    name: "Carotid stenosis",
    category: "Vascular",
    color: "#dfa37e",
    icon: "⇌",
    desc: "Symptom status, severity, and vascular management pathways.",
    refs: ["carotid"],
    notes:
      "Establish whether recent ipsilateral retinal or cerebral ischemic symptoms are present. Measure severity using an appropriate validated method. Intervention cannot be selected from an incidental imaging finding alone.",
  },
  {
    id: "dva",
    name: "Developmental venous anomaly",
    category: "Vascular",
    color: "#7bc0b2",
    icon: "⑂",
    desc: "Benign venous variants and associated findings to consider.",
    refs: ["dva"],
    notes:
      "A DVA drains normal brain and should not be resected or occluded. Assess associated cavernous malformation, thrombosis, hemorrhage, or venous congestion when symptoms or atypical findings are present.",
  },
  {
    id: "cavernous",
    name: "Cavernous malformation",
    category: "Vascular",
    color: "#a897d5",
    icon: "❋",
    desc: "Symptom-driven imaging and individualized management.",
    refs: ["cavernous"],
    notes:
      "MRI with susceptibility-sensitive sequences helps characterize lesions. Prior symptomatic hemorrhage, brainstem location, seizures, and familial disease affect management. Evidence does not establish a universal routine MRI interval.",
  },
  {
    id: "skull",
    name: "Incidental skull lesion",
    category: "Other findings",
    color: "#a9bd85",
    icon: "⬢",
    desc: "Imaging characterization and signs that merit further workup.",
    refs: ["skull"],
    notes:
      "Assess margins, transition zone, matrix, cortical destruction, periosteal reaction, and soft-tissue extension. Known malignancy changes the differential. No validated universal size-based surveillance algorithm is supplied here.",
  },
];

for (const t of topics) {
  if (!["pineal", "carotid", "skull"].includes(t.id))
    t.refs.push("brainReview");
  if (["aneurysm", "carotid"].includes(t.id)) t.refs.push("vascularReview");
}
// All decision inputs must be supplied explicitly. Unknowns never imply low risk.
const select = (key, label, options, help = "") => ({
  key,
  label,
  options: options.map((o) => (Array.isArray(o) ? o : [o, o])),
  help,
});
const yn = (key, label, help = "") =>
  select(
    key,
    label,
    [
      ["no", "No"],
      ["yes", "Yes"],
      ["unknown", "Unknown / not assessed"],
    ],
    help,
  );
const number = (key, label, min, max, help = "") => ({
  key,
  label,
  type: "number",
  min,
  max,
  help,
});
const common = [
  select("age", "Patient group", [
    ["adult", "Adult (≥18 years)"],
    ["child", "Child / adolescent"],
  ]),
  select(
    "emergency",
    "Acute red flags",
    [
      ["no", "None identified"],
      [
        "yes",
        "Acute deficit, sudden severe headache, acute visual loss, or acute deterioration",
      ],
      ["unknown", "Not assessed"],
    ],
    "Acute symptoms take priority over incidental follow-up.",
  ),
];
const change = () =>
  select("change", "Comparison with prior imaging", [
    ["baseline", "No prior comparison"],
    ["stable", "Stable"],
    ["growth", "Definite growth / new concerning features"],
    ["unknown", "Comparison uncertain"],
  ]);
const schemas = {
  pineal: [
    select("modality", "Study used for this decision", [
      ["MRI", "Brain MRI"],
      ["CT", "Head CT"],
    ]),
    number("size", "Maximum cyst diameter (mm)", 0.1, 200),
    select(
      "structure",
      "Cyst composition",
      [
        ["simple", "Simple: thin wall, uniform fluid"],
        ["nonsimple", "Nonsimple: thick wall, nodule, or nonsimple fluid"],
        ["unknown", "Not confidently characterized"],
      ],
      "Use the modality-specific ACR definitions; septations alone do not establish malignancy.",
    ),
    select("obstruction", "Aqueduct / tectum / hydrocephalus", [
      ["no", "No aqueduct compromise, tectal abnormality, or hydrocephalus"],
      ["yes", "Any aqueduct compromise, tectal abnormality, or hydrocephalus"],
      ["unknown", "Not assessed"],
    ]),
    select("presentation", "Pineal-related clinical features", [
      ["none", "Asymptomatic"],
      [
        "headache",
        "Isolated headache without raised-pressure / mass-effect features",
      ],
      [
        "related",
        "Potentially related visual, pressure, or other neurological symptoms",
      ],
      ["unknown", "Clinical context unavailable"],
    ]),
    select(
      "stage",
      "Surveillance stage",
      [
        ["initial", "Initial study"],
        ["firstStable", "First scheduled follow-up is stable"],
        ["secondStable", "Second scheduled follow-up is stable"],
        ["increased", "Size or complexity increased"],
      ],
      "Follow-up branches require comparison with the initial study. CT first follow-up is performed with MRI.",
    ),
  ],
  pituitary: [
    number("size", "Maximum sellar lesion diameter (mm)", 0.1, 200),
    select("composition", "Sellar lesion characterization", [
      ["solid", "Solid / presumed adenoma"],
      ["cyst", "Simple cyst / possible Rathke cleft cyst"],
      ["unknown", "Indeterminate or incompletely imaged"],
    ]),
    select("optic", "Optic nerve / chiasm relationship", [
      ["clear", "Clear of optic apparatus"],
      ["abut", "Abuts or compresses optic apparatus"],
      ["unknown", "Not assessed"],
    ]),
    select("endocrine", "Endocrine status", [
      ["normal", "Baseline evaluation completed; no abnormality"],
      ["hyper", "Hypersecretion suspected / confirmed"],
      ["hypo", "Hypopituitarism suspected / confirmed"],
      ["unknown", "Not yet evaluated"],
    ]),
    yn("visual", "Visual-field deficit or ophthalmoplegia?"),
    change(),
  ],
  arachnoid: [
    number("size", "Maximum cyst diameter (mm)", 0.1, 300),
    select("signal", "CSF-like signal and diffusion", [
      ["typical", "Typical CSF signal; no diffusion restriction"],
      ["atypical", "Non-CSF signal, restriction, or other atypical feature"],
      ["unknown", "Not adequately characterized"],
    ]),
    select("location", "Location / obstruction risk", [
      ["low", "Typical location without CSF-flow compromise"],
      ["sensitive", "Hydrocephalus-sensitive / critical location"],
      ["unknown", "Not assessed"],
    ]),
    yn("hydro", "Hydrocephalus or clinically important mass effect?"),
    yn("related", "Symptoms plausibly attributable to the cyst?"),
    change(),
  ],
  colloid: [
    number("years", "Patient age (years)", 18, 120),
    number("size", "Maximum cyst diameter (mm)", 0.1, 100),
    yn("headache", "Headache potentially attributable to the cyst?"),
    select("flair", "Cyst FLAIR signal", [
      ["high", "Hyperintense"],
      ["notHigh", "Not hyperintense"],
      ["unknown", "Unknown / MRI unavailable"],
    ]),
    select(
      "riskZone",
      "Colloid cyst risk-score location",
      [
        ["yes", "In a third-ventricular risk zone"],
        ["no", "Outside the risk zones"],
        ["unknown", "Location not classified"],
      ],
      "Requires neuroradiologist classification; do not infer from size alone.",
    ),
    yn("hydro", "Hydrocephalus / foramen of Monro obstruction?"),
    change(),
  ],
  meningioma: [
    number("size", "Maximum tumor diameter (mm)", 0.1, 300),
    yn("edema", "Peritumoral edema or important mass effect?"),
    yn(
      "critical",
      "Threat to optic apparatus, brainstem, or other critical structures?",
    ),
    yn("related", "Attributable symptoms or neurological deficit?"),
    select("certainty", "Diagnostic confidence", [
      ["typical", "Typical suspected meningioma, no histology"],
      ["grade1", "Histologically confirmed WHO grade 1"],
      ["other", "Indeterminate diagnosis or higher grade"],
    ]),
    change(),
  ],
  vestibular: [
    number(
      "size",
      "Maximum extrameatal diameter (mm; 0 if intracanalicular)",
      0,
      150,
    ),
    select("extent", "Tumor extent", [
      ["canal", "Intracanalicular"],
      ["small", "Extrameatal, no brainstem contact"],
      ["contact", "Brainstem contact without compression"],
      ["compression", "Brainstem compression / hydrocephalus"],
      ["unknown", "Not assessed"],
    ]),
    select("hearing", "Hearing / symptom assessment", [
      ["stable", "Stable hearing, minimal symptoms"],
      ["decline", "Progressive hearing loss / vestibular symptoms"],
      ["unknown", "Audiometry not available"],
    ]),
    change(),
  ],
  white: [
    select("pattern", "White matter lesion pattern", [
      ["vascular", "Chronic presumed small-vessel vascular WMH"],
      ["demyelination", "Pattern suspicious for demyelination"],
      [
        "other",
        "Atypical, enhancing, restricted diffusion, or unexplained pattern",
      ],
      ["unknown", "Not characterized"],
    ]),
    select("history", "Neurological history", [
      ["none", "No relevant neurological episode"],
      ["prior", "Prior focal neurological episode / demyelinating symptoms"],
      ["unknown", "History not assessed"],
    ]),
    select("risks", "Cardiovascular risk assessment", [
      ["controlled", "Assessed and managed"],
      ["uncontrolled", "Hypertension / diabetes / other untreated risks"],
      ["unknown", "Not assessed"],
    ]),
    change(),
  ],
  aneurysm: [
    number("years", "Patient age (years)", 18, 120),
    select("fitness", "Clinical fitness / treatment goals", [
      ["candidate", "Potential preventive-treatment candidate"],
      [
        "limited",
        "Major comorbidity / limited life expectancy / would decline treatment",
      ],
      ["unknown", "Not yet assessed"],
    ]),
    number("size", "Maximum aneurysm diameter (mm)", 0.1, 100),
    select("location", "Aneurysm location", [
      ["ica", "Intradural internal carotid"],
      ["mca", "Middle cerebral"],
      ["acom", "Anterior communicating / anterior cerebral"],
      ["pcom", "Posterior communicating"],
      ["posterior", "Posterior circulation"],
      ["cavernous", "Extradural cavernous internal carotid"],
      ["unknown", "Location uncertain"],
    ]),
    select("shape", "Aneurysm morphology", [
      ["regular", "Regular saccular"],
      ["irregular", "Irregular / daughter sac"],
      ["other", "Fusiform / dissecting / uncertain"],
    ]),
    yn(
      "related",
      "Attributable cranial nerve deficit or mass-effect symptoms?",
    ),
    yn("priorSAH", "Prior aneurysmal subarachnoid hemorrhage?"),
    yn("risk", "Smoking, uncontrolled hypertension, or strong family history?"),
    change(),
  ],
  carotid: [
    number(
      "stenosis",
      "Internal carotid stenosis (% NASCET equivalent)",
      0,
      100,
    ),
    select("ischemia", "Ipsilateral retinal / cerebral ischemic symptoms", [
      ["none", "Asymptomatic"],
      [
        "recent",
        "TIA, amaurosis fugax, or nondisabling stroke within 6 months",
      ],
      ["unknown", "Symptom status uncertain"],
    ]),
    select("anatomy", "Carotid lumen assessment", [
      ["conventional", "Conventional stenosis; no near-occlusion"],
      ["near", "Near-occlusion / distal ICA collapse"],
      ["unknown", "Not classified"],
    ]),
    select("measurement", "How severity was established", [
      ["confirmed", "Validated duplex / CTA / MRA, appropriate method"],
      ["uncertain", "Uncertain grading / discordant studies"],
    ]),
    select(
      "candidate",
      "Would the patient consider / be eligible for intervention?",
      [
        ["yes", "Potential candidate after specialist assessment"],
        ["no", "Not a candidate / would decline"],
        ["unknown", "Not assessed"],
      ],
    ),
    yn("highRisk", "High-risk plaque or progression features?"),
  ],
  dva: [
    select("isolation", "DVA and associated findings", [
      ["isolated", "Isolated typical DVA"],
      ["cavernoma", "Associated cavernous malformation"],
      [
        "complicated",
        "Hemorrhage, thrombosis, venous congestion, or atypical imaging",
      ],
      ["unknown", "Not fully characterized"],
    ]),
    yn("related", "Symptoms potentially related to venous pathology?"),
  ],
  cavernous: [
    select("location", "Cavernous malformation location", [
      ["lobar", "Lobar / superficial"],
      ["deep", "Deep / eloquent"],
      ["brainstem", "Brainstem"],
      ["unknown", "Not established"],
    ]),
    yn("bleed", "Prior symptomatic hemorrhage?"),
    yn("seizure", "Seizure plausibly attributable to the lesion?"),
    select("burden", "Lesion burden / family history", [
      ["single", "Single lesion, no known family history"],
      ["multiple", "Multiple lesions or positive family history"],
      ["unknown", "Not assessed"],
    ]),
    select("mri", "MRI characterization", [
      ["adequate", "MRI with susceptibility-sensitive sequences completed"],
      ["incomplete", "Incomplete characterization"],
    ]),
    change(),
  ],
  skull: [
    select("appearance", "Calvarial lesion imaging features", [
      ["benign", "Confident characteristic benign diagnosis"],
      ["indeterminate", "Indeterminate without overt aggressive features"],
      [
        "aggressive",
        "Destruction, soft-tissue extension, or other aggressive features",
      ],
      ["unknown", "Not characterized"],
    ]),
    yn("cancer", "Known malignancy or relevant systemic disease?"),
    yn("pain", "Focal pain, palpable growth, or local neurological symptoms?"),
    select("modality", "Available characterization", [
      ["both", "CT bone windows and appropriate MRI available"],
      ["ct", "CT only"],
      ["mri", "MRI only"],
    ]),
    change(),
  ],
};
function fieldsFor(id) {
  return [...common, ...(schemas[id] || [])];
}
function recommend(id, input = {}) {
  const t = topics.find((t) => t.id === id);
  if (!t) throw new Error("Unknown topic");
  const out = (
    title,
    imaging,
    clinical,
    rationale,
    status = "review",
    refs = t.refs,
  ) => ({ title, text: imaging, imaging, clinical, rationale, status, refs });
  const urgent = () =>
    out(
      "Urgent clinical assessment",
      "Do not defer evaluation for routine surveillance. Appropriate urgent imaging is determined by the presenting syndrome.",
      "Emergency / stroke / neurosurgical assessment as appropriate to the acute presentation.",
      "Acute symptoms override an incidental-finding algorithm.",
      "urgent",
    );
  if (input.emergency === "yes") return urgent();
  if (input.age === "child" && input.emergency === "no")
    return out(
      "Pediatric specialist pathway",
      "Adult thresholds and surveillance schedules are not applied.",
      "Discuss with pediatric neuroradiology and the relevant pediatric clinical team.",
      "These are adult reference pathways.",
    );
  const missing = fieldsFor(id).filter(
    (f) =>
      input[f.key] === undefined ||
      input[f.key] === "" ||
      (f.type === "number"
        ? !Number.isFinite(Number(input[f.key])) ||
          Number(input[f.key]) < f.min ||
          Number(input[f.key]) > f.max
        : !f.options.some((o) => o[0] === input[f.key])),
  );
  if (missing.length)
    return out(
      "More information needed",
      "No follow-up interval can be selected until the required inputs are provided.",
      "Complete: " + missing.map((f) => f.label).join("; ") + ".",
      "Blank or invalid answers are not interpreted as normal.",
      "incomplete",
    );
  if (input.emergency === "unknown")
    return out(
      "Assess acute symptoms first",
      "Do not select a routine interval until acute red flags have been assessed.",
      "Obtain the clinical history and examination.",
      "An unknown symptom assessment is not an asymptomatic presentation.",
      "incomplete",
    );
  if (input.age === "child")
    return out(
      "Pediatric specialist pathway",
      "Adult thresholds and surveillance schedules are not applied.",
      "Discuss with pediatric neuroradiology and the relevant pediatric clinical team.",
      "The pineal ACR algorithm and the reference pathways here are adult pathways.",
    );
  const v = { ...input };
  for (const f of fieldsFor(id))
    if (f.type === "number") v[f.key] = Number(v[f.key]);
  const unknown = () =>
    out(
      "Clarify decision-critical information",
      "Further review or characterization is needed before selecting a surveillance interval.",
      "Resolve the unknown imaging or clinical criteria shown in the questionnaire.",
      "Unknown findings cannot establish eligibility for a low-risk pathway.",
      "incomplete",
    );
  const growth = v.change === "growth";
  if (id === "pineal") {
    const clinical =
      "Neurosurgical consultation. Surgery is a specialist decision; hydrocephalus, raised intracranial pressure, Parinaud syndrome, or pineal apoplexy may support intervention.";
    if (v.obstruction === "yes" || v.presentation === "related")
      return out(
        "Pineal cyst: neurosurgical consultation",
        "Follow-up imaging should be directed by neurosurgical assessment; symptomatic hydrocephalus requires prompt evaluation.",
        clinical,
        "ACR Figures 1–2 and footnotes: aqueduct compromise, tectal abnormality, hydrocephalus, or attributable symptoms override size.",
        "referral",
        ["pineal"],
      );
    if (v.stage === "increased")
      return out(
        "Increasing size / complexity: neurosurgical consultation",
        "Compare with baseline and provide MRI characterization to the specialist.",
        clinical,
        "ACR Figures 1–2: increasing size or complexity during surveillance prompts consultation.",
        "referral",
        ["pineal"],
      );
    if ([v.obstruction, v.presentation, v.structure].includes("unknown"))
      return unknown();
    const note =
      v.presentation === "headache"
        ? " Isolated headache alone, without raised-pressure or mass-effect features, is not sufficient to indicate neurosurgical consultation."
        : "";
    if (v.structure === "nonsimple" && v.size >= 10)
      return out(
        "Nonsimple pineal cyst ≥10 mm: refer",
        "No routine surveillance-only pathway; obtain specialist-directed MRI evaluation.",
        clinical,
        "ACR Figures 1–2 use a ≥10 mm threshold for nonsimple cysts." + note,
        "referral",
        ["pineal"],
      );
    if (
      (v.structure === "simple" && v.size < 15) ||
      (v.modality === "CT" && v.structure === "nonsimple" && v.size < 10)
    )
      return out(
        "No further imaging evaluation",
        "No further imaging evaluation under the ACR adult incidental pathway.",
        "Clinical reassessment if relevant symptoms develop. No routine neurosurgical referral solely for this finding.",
        "ACR " +
          (v.modality === "CT"
            ? "Figure 2: CT simple <15 mm or nonsimple <10 mm."
            : "Figure 1: MRI simple <15 mm.") +
          note,
        "none",
        ["pineal"],
      );
    const simple = v.structure === "simple";
    if (v.stage === "secondStable")
      return out(
        "Surveillance complete if stable",
        "No further imaging evaluation after stability at the second scheduled follow-up.",
        "Reassess if new attributable symptoms develop.",
        "ACR Figure 1; confirm appropriate scheduled studies were completed and no growth or complexity increase occurred.",
        "none",
        ["pineal"],
      );
    if (v.stage === "firstStable")
      return out(
        "Stable first follow-up: one further MRI",
        simple
          ? "Brain MRI at 18–24 months after the initial study."
          : "Brain MRI at 18 months after the initial study.",
        "If stable at that second follow-up, stop imaging; increasing size or complexity prompts neurosurgical consultation.",
        "ACR Figure 1; for a CT-detected simple ≥15 mm cyst, Figure 2 footnote 5 transitions to the second MRI follow-up.",
        "surveillance",
        ["pineal"],
      );
    return out(
      "Scheduled pineal MRI surveillance",
      v.modality === "CT"
        ? "Brain MRI at 6 months. If stable, proceed to MRI at 18–24 months after the initial CT."
        : simple
          ? "Brain MRI at 6–12 months; if stable, repeat at 18–24 months after the initial study."
          : "Brain MRI at 6 months; if stable, repeat at 18 months after the initial study.",
      "Stop after a stable second scheduled follow-up. Refer for any increased size / complexity, aqueduct compromise, tectal abnormality, hydrocephalus, or attributable symptoms.",
      "ACR " +
        (v.modality === "CT"
          ? "Figure 2: simple CT cyst ≥15 mm."
          : "Figure 1: " +
            (simple
              ? "simple MRI cyst ≥15 mm."
              : "nonsimple MRI cyst <10 mm.")) +
        note,
      "surveillance",
      ["pineal"],
    );
  }
  if (id === "pituitary") {
    if (
      v.optic === "abut" ||
      v.visual === "yes" ||
      v.endocrine === "hyper" ||
      growth
    )
      return out(
        "Pituitary specialist assessment",
        "Dedicated pituitary MRI and comparison with prior studies; interval is individualized.",
        "Endocrinology plus pituitary neurosurgery for optic involvement, visual deficit, or growth. Formal visual fields for optic abutment/compression. Hypersecretion requires disease-specific care; prolactinomas are often treated medically rather than surgically.",
        "Optic effects, endocrine activity, and growth are more important than diameter alone. Endocrine Society guidance is distinct from the ACR incidental imaging algorithm.",
        "referral",
      );
    if (
      v.optic === "unknown" ||
      v.visual === "unknown" ||
      v.composition === "unknown" ||
      v.change === "unknown"
    )
      return unknown();
    if (v.composition === "cyst")
      return out(
        "Cystic sellar lesion: characterize and individualize",
        "Confirm a simple cyst without a solid component on dedicated pituitary MRI; do not automatically apply adenoma surveillance intervals.",
        "Correlate endocrine findings and optic relationship; endocrine review if not assessed or abnormal.",
        "ACR addresses cystic lesions separately; the site does not encode an unverified ACR cyst-size algorithm.",
      );
    return out(
      v.size >= 10
        ? "Pituitary macroincidentaloma"
        : "Pituitary microincidentaloma",
      v.size >= 10
        ? "Endocrine Society: MRI at 6 months, then annually if stable; progressively extend later."
        : "Endocrine Society: MRI at 1 year, then every 1–2 years for 3 years if stable, then less frequently.",
      v.endocrine === "unknown"
        ? "Baseline endocrine assessment for hypersecretion and hypopituitarism is still required."
        : v.endocrine === "hypo"
          ? "Endocrinology assessment and management of hormone deficits; consider repeat evaluation during follow-up."
          : "Continue endocrine follow-up as indicated; repeat testing is particularly relevant for macroincidentalomas.",
      "The ≥10 mm division defines macroincidentaloma. These intervals are from the 2011 Endocrine Society guideline, not a reproduced ACR algorithm.",
      "surveillance",
    );
  }
  if (id === "arachnoid") {
    if (
      v.hydro === "yes" ||
      v.related === "yes" ||
      v.location === "sensitive" ||
      growth
    )
      return out(
        "Arachnoid cyst: neurosurgical review",
        "MRI / comparison to evaluate CSF obstruction and mass effect; surveillance individualized.",
        "Neurosurgery may consider fenestration or other treatment when symptoms or obstruction are attributable to the cyst.",
        "A small diameter does not negate hydrocephalus or a sensitive location.",
        "referral",
      );
    if (v.signal === "atypical")
      return out(
        "Confirm the cyst diagnosis",
        "MRI including diffusion and appropriate sequences to distinguish arachnoid cyst from mimics.",
        "Neuroradiology review before applying a benign-cyst pathway.",
        "Restricted diffusion or non-CSF signal is not typical of an arachnoid cyst.",
      );
    if (
      [v.signal, v.hydro, v.related, v.location, v.change].includes("unknown")
    )
      return unknown();
    return out(
      v.size < 25
        ? "Typical small asymptomatic arachnoid cyst"
        : "Larger asymptomatic arachnoid cyst",
      v.size < 25
        ? "Routine surveillance is generally unnecessary for a typical small cyst outside sensitive locations."
        : "Individualize imaging after review of location and mass effect; no universal interval is established.",
      v.size < 25
        ? "Reassure; reassess if new related symptoms occur."
        : "Consider neurosurgical review, particularly if close to CSF pathways. Size alone is not an indication for surgery.",
      "The review uses <2.5 cm to describe small low-risk cysts; it is not a universal operative threshold.",
      v.size < 25 ? "none" : "review",
    );
  }
  if (id === "colloid") {
    if (v.hydro === "yes")
      return out(
        "Colloid cyst with obstruction / hydrocephalus",
        "Prompt assessment of ventricular obstruction; do not wait for routine surveillance.",
        "Prompt neurosurgical review; urgency depends on symptoms and severity. Endoscopic or microsurgical treatment may be considered.",
        "Obstruction overrides the risk score.",
        "referral",
      );
    if (
      [v.headache, v.flair, v.riskZone, v.hydro, v.change].includes("unknown")
    )
      return unknown();
    const score =
      Number(v.years < 65) +
      Number(v.size >= 7) +
      Number(v.headache === "yes") +
      Number(v.flair === "high") +
      Number(v.riskZone === "yes");
    return out(
      "Colloid cyst risk score: " + score + " / 5",
      "MRI characterization and neurosurgical planning. A pragmatic low-risk observation approach is annual clinical follow-up for 2–3 years; there is no validated universal MRI interval.",
      score >= 4 || growth || v.headache === "yes"
        ? "Neurosurgical assessment with a discussion of intervention versus observation; score ≥4 is associated with higher risk, not an automatic surgery instruction."
        : "Neurosurgical review is recommended even for an incidental cyst; discuss observation and clear return precautions.",
      "Score: age <65, headache, diameter ≥7 mm, FLAIR hyperintensity, and risk-zone location (1 each). Scores ≤2 are lower risk, 3 intermediate, ≥4 higher risk; risk-zone classification must be accurate.",
      "referral",
    );
  }
  if (id === "meningioma") {
    if (
      v.edema === "yes" ||
      v.critical === "yes" ||
      v.related === "yes" ||
      growth ||
      v.certainty === "other"
    )
      return out(
        "Meningioma: treatment assessment",
        "MRI characterization, growth comparison, and specialist-directed surveillance.",
        "Neurosurgery / multidisciplinary neuro-oncology evaluation; surgery is often first-line for symptomatic or growing tumors, with radiotherapy considered in selected cases.",
        "Symptoms, growth, edema, critical structures, and diagnostic certainty change an observation pathway.",
        "referral",
      );
    if ([v.edema, v.critical, v.related, v.change].includes("unknown"))
      return unknown();
    return out(
      "Observation of suspected / WHO grade 1 meningioma",
      "EANO: MRI annually for 5 years, then generally every 2 years; tailor to age and clinical condition.",
      "Agree an observation plan with the clinical team. Tumor diameter (" +
        v.size +
        " mm) contributes to risk assessment but has no standalone intervention cutoff here.",
      "Applies to asymptomatic suspected or grade 1 tumors; higher grades follow different schedules.",
      "surveillance",
    );
  }
  if (id === "vestibular") {
    if (v.extent === "compression" || v.size > 30)
      return out(
        "Large / compressive vestibular schwannoma",
        "Specialist-directed MRI evaluation and comparison; assess hydrocephalus.",
        "Multidisciplinary skull-base review. Surgery is generally the primary approach for large tumors with brainstem compression; treatment choice also depends on patient fitness and goals.",
        "EANO describes large tumors >3 cm with brainstem compression as a surgical pathway. Size alone does not establish compression.",
        "referral",
      );
    if (v.extent === "unknown") return unknown();
    if (growth || v.hearing === "decline" || v.extent === "contact")
      return out(
        "Discuss active treatment versus observation",
        "MRI plus audiometry; shorten / individualize follow-up with the treating team.",
        "Skull-base team may consider radiosurgery or microsurgery according to size, growth, hearing, and brainstem relationship.",
        "Progression and symptoms make routine observation less straightforward.",
        "referral",
      );
    if (v.change === "unknown") return unknown();
    return out(
      "Vestibular schwannoma observation pathway",
      "EANO: annual MRI and audiometry for 5 years for untreated tumors; longer intervals if stable.",
      "Establish baseline audiometry" +
        (v.hearing === "unknown" ? " (not yet available)." : ".") +
        " Discuss observation versus radiosurgery, hearing preservation, and patient preferences.",
      "Observation is reasonable for selected small minimally symptomatic tumors.",
      "surveillance",
    );
  }
  if (id === "white") {
    if (v.pattern !== "vascular" || v.history === "prior" || growth)
      return out(
        "White matter lesions: diagnostic assessment",
        "MRI protocol / comparison guided by suspected etiology; incidental vascular-WMH guidance is not sufficient.",
        "Neurology review for possible demyelination or unexplained neurological episodes; acute findings need the corresponding urgent pathway.",
        "Pattern, clinical history, enhancement, and diffusion distinguish chronic vascular WMH from other diseases.",
      );
    if (v.history === "unknown" || v.change === "unknown") return unknown();
    return out(
      "Presumed vascular white matter hyperintensities",
      "No universal routine repeat-MRI interval is recommended solely for incidental chronic vascular WMH.",
      "Assess blood pressure, diabetes, lipids, smoking, and neurological history; " +
        (v.risks === "controlled"
          ? "continue prevention."
          : "complete / optimize cardiovascular risk management.") +
        " Do not start antiplatelets or anticoagulants solely for WMH without another indication.",
      "The WMH consensus emphasizes risk-factor management rather than lesion-size surveillance.",
      "none",
    );
  }
  if (id === "aneurysm") {
    if (
      v.location === "unknown" ||
      v.shape === "other" ||
      [v.related, v.priorSAH, v.risk, v.change].includes("unknown")
    )
      return unknown();
    const extradural = v.location === "cavernous";
    const elevated =
      growth ||
      v.related === "yes" ||
      v.shape === "irregular" ||
      (!extradural &&
        (v.size >= 7 ||
          ["acom", "pcom", "posterior"].includes(v.location) ||
          v.priorSAH === "yes" ||
          v.risk === "yes"));
    return out(
      elevated
        ? "Aneurysm: prioritize neurovascular treatment discussion"
        : "Aneurysm: individualized neurovascular assessment",
      "If observation is chosen, AHA/ASA suggests an initial MRA / CTA at 6–12 months, then yearly or every other year may be reasonable; ESO emphasizes individualized intervals. Confirm anatomy and measurement consistency.",
      (elevated
        ? "Discuss preventive clipping / endovascular treatment with cerebrovascular neurosurgery and interventional neuroradiology. "
        : "Discuss observation versus preventive treatment with a neurovascular team. ") +
        (extradural
          ? "A confirmed extradural cavernous ICA aneurysm has a different SAH risk profile; symptoms, growth, and intradural extension matter. "
          : "") +
        "Treat hypertension and encourage smoking cessation. At age " +
        v.years +
        ", weigh rupture risk against procedural risk, comorbidity, and life expectancy. " +
        (v.fitness === "limited"
          ? "Limited life expectancy, major comorbidity, or preference against treatment can favor conservative care after discussion."
          : v.fitness === "unknown"
            ? "Clinical fitness and treatment goals still need assessment."
            : "Use shared decision-making with the treating team."),
      "Entered size: " +
        v.size +
        " mm. " +
        (v.size >= 25
          ? "Giant aneurysm (≥25 mm): prompt specialist evaluation is especially important. "
          : v.size >= 13
            ? "Larger aneurysm (13–24.9 mm): size strengthens the preventive-treatment discussion. "
            : v.size >= 7
              ? "7–12.9 mm: discuss the added size-related risk with the neurovascular team. "
              : "<7 mm: small size alone does not establish negligible rupture risk. ") +
        "A diameter ≥7 mm is a risk-discussion flag, not a guideline mandate for treatment. Small ACom / PCom or posterior aneurysms can still be important. Growth, irregularity, symptoms, and prior SAH strengthen treatment consideration.",
      "referral",
    );
  }
  if (id === "carotid") {
    if (
      v.ischemia === "unknown" ||
      v.measurement === "uncertain" ||
      v.anatomy === "unknown"
    )
      return unknown();
    if (v.anatomy === "near")
      return out(
        "Carotid near-occlusion: specialist pathway",
        "Confirm near-occlusion and distal ICA collapse with appropriate vascular imaging.",
        "Stroke / vascular assessment. Do not apply conventional percentage-based CEA recommendations; intervention may be considered only in selected cases such as recurrent symptoms despite medical therapy after multidisciplinary review.",
        "ESVS treats near-occlusion separately from conventional 50–99% stenosis.",
        "referral",
      );
    if (v.stenosis === 100)
      return out(
        "Possible complete ICA occlusion",
        "Confirm occlusion versus near-occlusion with appropriate vascular imaging.",
        "Stroke / vascular review; routine carotid endarterectomy for stenosis is not a treatment pathway for established complete occlusion.",
        "Near-occlusion and complete occlusion require separate assessment.",
        "referral",
      );
    if (v.ischemia === "recent")
      return out(
        "Symptomatic carotid stenosis: expedited stroke / vascular review",
        "Confirm NASCET-equivalent severity and infarct / vascular anatomy.",
        v.stenosis >= 70
          ? "CEA is generally recommended for suitable symptomatic 70–99% stenosis; aim for intervention within 14 days of symptom onset when appropriate. Recent large/disabling infarct and other contraindications change timing."
          : v.stenosis >= 50
            ? "CEA should be considered in suitable symptomatic 50–69% stenosis, balancing patient factors and procedural risk; early evaluation is important."
            : "For <50% stenosis, CEA is generally not recommended; optimize medical treatment and evaluate other causes of symptoms.",
        "ESVS: benefit depends on symptom timing, severity, patient selection, and procedural risk. Any ongoing acute deficit uses emergency stroke care.",
        "referral",
      );
    if (v.highRisk === "unknown") return unknown();
    return out(
      "Asymptomatic carotid stenosis: " + v.stenosis + "% NASCET equivalent",
      v.stenosis >= 50 && v.stenosis <= 60 && v.candidate === "yes"
        ? "ESVS supports annual duplex for selected 50–60% asymptomatic stenoses in patients who would consider future intervention."
        : "Surveillance is individualized by the vascular team; there is no universal interval for this combination.",
      v.stenosis >= 60 && v.highRisk === "yes" && v.candidate === "yes"
        ? "Selected 60–99% asymptomatic stenoses with high-risk features may merit discussion of CEA (or selected CAS) if life expectancy exceeds 5 years and procedural stroke/death risk is ≤3%. Optimize medical therapy regardless."
        : "Optimize vascular prevention (lipid lowering, blood pressure, diabetes, smoking cessation, and appropriate antithrombotic therapy) with the clinical team. Do not recommend a procedure solely from the stenosis percentage; assess life expectancy, high-risk features, preferences, and procedural risk.",
      "ESVS selection criteria differ substantially between symptomatic and asymptomatic patients.",
      "review",
    );
  }
  if (id === "dva") {
    if (v.isolation === "unknown" || v.related === "unknown") return unknown();
    if (v.isolation === "complicated" || v.related === "yes")
      return out(
        "DVA: evaluate associated venous pathology",
        "Targeted MRI / venous imaging as indicated for thrombosis, congestion, hemorrhage, or associated lesions.",
        "Neurological / neurovascular assessment. Preserve the DVA; it drains normal brain and should not be resected or occluded.",
        "Symptoms usually warrant searching for complications or another cause.",
        "referral",
      );
    if (v.isolation === "cavernoma")
      return out(
        "DVA with associated cavernous malformation",
        "Use the cavernous malformation pathway, including susceptibility-sensitive MRI, for the associated lesion.",
        "Management is driven by the cavernous lesion and symptoms; preserve DVA drainage.",
        "An associated lesion changes follow-up; an isolated DVA pathway does not cover it.",
      );
    return out(
      "Isolated typical incidental DVA",
      "No routine imaging follow-up is generally needed.",
      "Reassure; preserve normal venous drainage.",
      "Typical isolated asymptomatic DVAs are benign venous drainage variants.",
      "none",
    );
  }
  if (id === "cavernous") {
    if (v.mri === "incomplete")
      return out(
        "Complete cavernous malformation characterization",
        "MRI including susceptibility-sensitive sequences to establish lesion number and associated findings.",
        "Review with neuroradiology; correlate any prior hemorrhage or seizures.",
        "Adequate MRI characterization precedes management decisions.",
      );
    if (
      [v.location, v.bleed, v.seizure, v.burden, v.change].includes("unknown")
    )
      return unknown();
    return out(
      v.bleed === "yes" || v.seizure === "yes" || growth
        ? "Cavernous malformation: specialist management"
        : "Incidental cavernous malformation: individualized observation",
      "Routine MRI intervals are not well established. New / worsening symptoms should prompt timely assessment and MRI.",
      (v.bleed === "yes"
        ? "Discuss hemorrhage history and lesion accessibility with neurosurgery; brainstem / eloquent location raises operative risk. "
        : "") +
        (v.seizure === "yes"
          ? "Neurology-directed seizure treatment; selected accessible epileptogenic lesions may be considered for surgery. "
          : "") +
        (v.burden === "multiple"
          ? "Consider familial disease assessment and genetic counseling. "
          : "") +
        "Asymptomatic deep / eloquent or brainstem lesions are generally not routinely resected.",
      "The 2017 consensus is an older source and must be checked against newer guidance; there is no universal size-based operation or surveillance threshold.",
      "review",
    );
  }
  if (id === "skull") {
    if (
      v.appearance === "unknown" ||
      v.cancer === "unknown" ||
      v.pain === "unknown" ||
      v.change === "unknown"
    )
      return unknown();
    if (
      v.appearance === "aggressive" ||
      v.cancer === "yes" ||
      v.pain === "yes" ||
      growth
    )
      return out(
        "Skull lesion: further workup / referral",
        "CT bone windows and contrast MRI as appropriate to assess matrix, cortex, marrow, dura, and soft tissues; compare priors.",
        "Discuss with the relevant neurosurgical / oncology team. Biopsy or systemic workup may be needed after imaging characterization; do not assume a benign incidental lesion.",
        "Aggressive features, cancer history, local symptoms, or growth preclude routine reassurance.",
        "referral",
      );
    if (v.appearance === "benign")
      return out(
        "Confidently benign calvarial finding",
        "No routine follow-up may be needed when a characteristic benign diagnosis is secure.",
        "Document the diagnosis; reassess for new symptoms or change.",
        "There is no universal skull-lesion interval; imaging diagnosis and context determine management.",
        "none",
      );
    return out(
      "Indeterminate skull lesion",
      "Complementary CT / MRI and prior comparison as indicated; choose any interval only after diagnostic review.",
      "Neuroradiology review and targeted clinical workup rather than an invented size-based schedule.",
      "The skull review is a characterization reference, not a validated incidental management algorithm.",
    );
  }
}
if (typeof module !== "undefined")
  module.exports = { topics, sources, schemas, fieldsFor, recommend };
