const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  topics,
  sources,
  schemas,
  fieldsFor,
  recommend,
} = require("../data.js");
const cases = require("./cases.cjs");
const run = (id, patch = {}) => recommend(id, { ...cases[id], ...patch });
test("all 12 schemas are distinct, use valid cited sources, and produce complete results", () => {
  assert.equal(topics.length, 12);
  assert.equal(
    new Set(topics.map((t) => JSON.stringify(schemas[t.id]))).size,
    12,
  );
  for (const t of topics) {
    const r = run(t.id);
    assert.notEqual(r.status, "incomplete", t.id);
    for (const k of ["title", "imaging", "clinical", "rationale"])
      assert.ok(r[k], t.id + k);
    for (const key of r.refs) assert.match(sources[key].url, /^https:\/\//);
  }
});
test("every missing field and invalid select prevents a low-risk recommendation", () => {
  for (const t of topics) {
    for (const f of fieldsFor(t.id)) {
      const values = { ...cases[t.id] };
      delete values[f.key];
      assert.equal(recommend(t.id, values).status, "incomplete", t.id + f.key);
      values[f.key] = "invalid";
      assert.equal(recommend(t.id, values).status, "incomplete", t.id + f.key);
    }
  }
});
test("acute red flags override missing inputs, pediatric cases never use adult rules", () => {
  for (const t of topics) {
    assert.equal(recommend(t.id, { emergency: "yes" }).status, "urgent");
    assert.match(run(t.id, { age: "child" }).title, /Pediatric/);
    assert.equal(run(t.id, { emergency: "unknown" }).status, "incomplete");
  }
});
for (const modality of ["MRI", "CT"]) {
  test(`${modality}: simple pineal <15 mm stops; 15 mm starts surveillance`, () => {
    assert.equal(run("pineal", { modality, size: 14.9 }).status, "none");
    assert.equal(run("pineal", { modality, size: 15 }).status, "surveillance");
    assert.match(
      run("pineal", { modality, size: 15 }).imaging,
      modality === "CT" ? /6 months/ : /6–12 months/,
    );
  });
  test(`${modality}: nonsimple threshold is 10 mm`, () => {
    assert.equal(
      run("pineal", { modality, structure: "nonsimple", size: 9.9 }).status,
      modality === "CT" ? "none" : "surveillance",
    );
    assert.equal(
      run("pineal", { modality, structure: "nonsimple", size: 10 }).status,
      "referral",
    );
  });
  test(`${modality}: obstruction and growth override small size`, () => {
    assert.equal(
      run("pineal", { modality, size: 3, obstruction: "yes" }).status,
      "referral",
    );
    assert.equal(
      run("pineal", { modality, size: 3, stage: "increased" }).status,
      "referral",
    );
  });
}
test("pineal second-study timing is from baseline and stability ends surveillance", () => {
  assert.match(
    run("pineal", { size: 15, stage: "firstStable" }).imaging,
    /18–24 months after the initial/,
  );
  assert.match(
    run("pineal", { size: 8, structure: "nonsimple", stage: "firstStable" })
      .imaging,
    /18 months after the initial/,
  );
  assert.equal(
    run("pineal", { size: 15, stage: "secondStable" }).status,
    "none",
  );
  assert.equal(
    run("pineal", { size: 8, structure: "nonsimple", stage: "secondStable" })
      .status,
    "none",
  );
});
test("isolated headache alone is not automatic pineal referral; unknowns never reassure", () => {
  assert.equal(run("pineal", { presentation: "headache" }).status, "none");
  assert.match(
    run("pineal", { presentation: "headache" }).rationale,
    /not sufficient/,
  );
  assert.equal(run("pineal", { presentation: "related" }).status, "referral");
  for (const key of ["structure", "presentation", "obstruction"])
    assert.equal(run("pineal", { [key]: "unknown" }).status, "incomplete");
});
test("pituitary size boundary and clinical overrides", () => {
  assert.match(run("pituitary", { size: 9.9 }).imaging, /1 year/);
  assert.match(run("pituitary", { size: 10 }).imaging, /6 months/);
  for (const patch of [
    { optic: "abut" },
    { visual: "yes" },
    { endocrine: "hyper" },
    { change: "growth" },
  ])
    assert.equal(run("pituitary", patch).status, "referral");
  assert.doesNotMatch(
    run("pituitary", { composition: "cyst" }).imaging,
    /at 1 year/,
  );
});
test("arachnoid cyst obstruction and location override size", () => {
  assert.equal(run("arachnoid").status, "none");
  assert.equal(run("arachnoid", { size: 5, hydro: "yes" }).status, "referral");
  assert.equal(run("arachnoid", { location: "sensitive" }).status, "referral");
  assert.match(run("arachnoid", { signal: "atypical" }).imaging, /diffusion/);
});
test("colloid score thresholds and obstruction", () => {
  assert.match(run("colloid").title, /0 \/ 5/);
  assert.match(
    run("colloid", {
      years: 64,
      size: 7,
      headache: "yes",
      flair: "high",
      riskZone: "yes",
    }).title,
    /5 \/ 5/,
  );
  assert.match(run("colloid", { hydro: "yes" }).title, /obstruction/);
  assert.equal(run("colloid", { riskZone: "unknown" }).status, "incomplete");
});
test("tumor progression, edema, and compression change observation", () => {
  assert.equal(run("meningioma", { edema: "yes" }).status, "referral");
  assert.match(run("meningioma").imaging, /annually for 5 years/);
  assert.equal(run("vestibular", { extent: "compression" }).status, "referral");
  assert.equal(run("vestibular", { hearing: "decline" }).status, "referral");
  assert.match(run("vestibular").imaging, /audiometry/);
});
test("white matter pattern changes the pathway and does not prescribe antiplatelets", () => {
  assert.match(
    run("white", { pattern: "demyelination" }).clinical,
    /Neurology/,
  );
  assert.match(run("white").clinical, /Do not start antiplatelets/);
});
test("aneurysm growth, location, and size trigger risk discussions without automatic surgery", () => {
  assert.match(run("aneurysm", { size: 7 }).title, /prioritize/);
  assert.match(
    run("aneurysm", { size: 3, location: "acom" }).title,
    /prioritize/,
  );
  assert.match(run("aneurysm", { change: "growth" }).title, /prioritize/);
  assert.match(
    run("aneurysm", { size: 7 }).rationale,
    /not a guideline mandate/,
  );
  assert.match(
    run("aneurysm", { location: "cavernous" }).clinical,
    /extradural/,
  );
  assert.equal(run("aneurysm", { location: "unknown" }).status, "incomplete");
});
test("carotid symptoms, NASCET thresholds, and occlusion have different care pathways", () => {
  assert.match(run("carotid").imaging, /annual duplex/);
  assert.match(
    run("carotid", { ischemia: "recent", stenosis: 70 }).clinical,
    /generally recommended/,
  );
  assert.match(
    run("carotid", { ischemia: "recent", stenosis: 50 }).clinical,
    /should be considered/,
  );
  assert.match(
    run("carotid", { ischemia: "recent", stenosis: 49 }).clinical,
    /not recommended/,
  );
  assert.match(run("carotid", { stenosis: 100 }).title, /occlusion/);
  assert.match(
    run("carotid", { stenosis: 75, highRisk: "yes" }).clinical,
    /life expectancy exceeds 5 years/,
  );
});
test("DVA preserves drainage and associated cavernoma gets a distinct pathway", () => {
  assert.equal(run("dva").status, "none");
  assert.match(
    run("dva", { isolation: "complicated" }).clinical,
    /should not be resected/,
  );
  assert.match(
    run("dva", { isolation: "cavernoma" }).imaging,
    /cavernous malformation/,
  );
});
test("cavernous and skull guidance do not invent an interval; symptoms change clinical workup", () => {
  assert.match(run("cavernous").imaging, /not well established/);
  assert.match(
    run("cavernous", { seizure: "yes" }).clinical,
    /seizure treatment/,
  );
  assert.match(
    run("skull", { appearance: "indeterminate" }).clinical,
    /invented size-based/,
  );
  assert.equal(run("skull", { cancer: "yes" }).status, "referral");
});

test("near-occlusion does not use conventional stenosis recommendations", () => {
  assert.match(
    run("carotid", { anatomy: "near", stenosis: 99, ischemia: "recent" }).title,
    /near-occlusion/,
  );
  assert.match(
    run("carotid", { anatomy: "near", stenosis: 99, ischemia: "recent" })
      .clinical,
    /Do not apply/,
  );
});
