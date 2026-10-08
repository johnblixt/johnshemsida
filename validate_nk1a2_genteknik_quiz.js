// Validering av nk1a2_genteknik_questions.js
// Kör:  node validate_nk1a2_genteknik_quiz.js
//
// Kontrollerar:
//  1. exakt 30 frågor, 10 per del
//  2. exakt 4 alternativ (sv, Enkel svenska, arabiska), inga dubbletter
//  3. exakt 1 rätt svar (correct = giltigt index 0–3)
//  4. q / opts / rätt svar / källa är ordagrant lika DEL C i källmaterialet
//  5. längdskillnad: rätt svar jämfört med snittet av distraktorerna – skriver ut allt över 40 %

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const DATA = path.join(__dirname, 'nk1a2_genteknik_questions.js');
const SRC  = path.join(__dirname, 'nk1a2_genteknik_kallmaterial.md');
const LIMIT = 0.40;

const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(DATA, 'utf8') + '\nthis.QUESTIONS = QUESTIONS;', ctx);
const QUESTIONS = ctx.QUESTIONS;

const errors = [];
const err = (id, msg) => errors.push(`  ✗ ${id}: ${msg}`);

// ── Läs DEL C ur källmaterialet ──
const md = fs.readFileSync(SRC, 'utf8');
const delC = md.slice(md.indexOf('# DEL C'), md.indexOf('## Svarsnyckel'));
const source = {};
const blockRe = /\*\*(\d+\.\d+)\*\* (.+)\n((?:- [A-D]\) .+\n){4})- \*\*Rätt svar: ([A-D])\*\* · Källa: ([^·]+?) · Nivå: (.+)/g;
let m;
while ((m = blockRe.exec(delC))) {
  source[m[1]] = {
    q: m[2].trim(),
    opts: m[3].trim().split('\n').map(l => l.replace(/^- [A-D]\) /, '').trim()),
    correct: 'ABCD'.indexOf(m[4]),
    kalla: m[5].trim(),
    niva: m[6].trim()
  };
}
const keyLine = (md.match(/## Svarsnyckel[^\n]*\n\n([^\n]+)/) || [])[1] || '';
const answerKey = Object.fromEntries(keyLine.split(',').map(s => s.trim()).filter(Boolean)
  .map(s => [s.slice(0, -1), 'ABCD'.indexOf(s.slice(-1))]));

// ── 1. Antal ──
console.log('NK 1a2 Genteknik – validering av quizdata');
console.log('═'.repeat(64));
console.log(`Frågor i datafilen:        ${QUESTIONS.length}  (krav: 30)`);
console.log(`Frågor i DEL C (källan):   ${Object.keys(source).length}`);
console.log(`Svarsnyckel i källan:      ${Object.keys(answerKey).length}`);
if (QUESTIONS.length !== 30) err('alla', `${QUESTIONS.length} frågor, ska vara 30`);
[1, 2, 3].forEach(d => {
  const n = QUESTIONS.filter(q => q.del === d).length;
  console.log(`  Del ${d}: ${n} frågor`);
  if (n !== 10) err(`Del ${d}`, `${n} frågor, ska vara 10`);
});
const ids = QUESTIONS.map(q => q.id);
if (new Set(ids).size !== ids.length) err('alla', 'dubblerade id');

// ── 2–4. Per fråga ──
QUESTIONS.forEach(q => {
  ['opts', 'optsEnkel', 'optsAr'].forEach(f => {
    if (!Array.isArray(q[f]) || q[f].length !== 4) err(q.id, `${f} har ${q[f] ? q[f].length : 0} alternativ, ska vara 4`);
    else if (new Set(q[f]).size !== 4) err(q.id, `${f} har dubblerade alternativ`);
  });
  if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct > 3) err(q.id, `correct=${q.correct} är inte ett giltigt index`);
  ['q', 'expl', 'qEnkel', 'expEnkel', 'qAr', 'expAr', 'kalla'].forEach(f => { if (!q[f]) err(q.id, `${f} saknas`); });

  const s = source[q.id];
  if (!s) { err(q.id, 'finns inte i DEL C'); return; }
  if (s.q !== q.q) err(q.id, `frågetexten skiljer sig från källan\n      källa: ${s.q}\n      data:  ${q.q}`);
  s.opts.forEach((o, i) => { if (o !== q.opts[i]) err(q.id, `alternativ ${'ABCD'[i]} skiljer sig\n      källa: ${o}\n      data:  ${q.opts[i]}`); });
  if (s.correct !== q.correct) err(q.id, `rätt svar ${'ABCD'[q.correct]}, källan säger ${'ABCD'[s.correct]}`);
  if (answerKey[q.id] !== q.correct) err(q.id, `rätt svar ${'ABCD'[q.correct]}, svarsnyckeln säger ${'ABCD'[answerKey[q.id]]}`);
  if (s.kalla !== q.kalla) err(q.id, `källa "${q.kalla}", källmaterialet säger "${s.kalla}"`);
});

// ── 5. Längdskillnader ──
function lengthReport(field, label) {
  const rows = [];
  QUESTIONS.forEach(q => {
    const opts = q[field];
    if (!opts || opts.length !== 4) return;
    const c = opts[q.correct].length;
    const ds = opts.filter((_, i) => i !== q.correct).map(o => o.length);
    const avg = ds.reduce((a, b) => a + b, 0) / ds.length;
    const diff = (c - avg) / avg;
    const longest = Math.max(...opts.map(o => o.length)) === c && ds.every(d => d < c);
    if (Math.abs(diff) > LIMIT) rows.push({ id: q.id, c, ds, diff, longest });
  });
  console.log(`\nLängdskillnad > ${LIMIT * 100} % – ${label}`);
  console.log('(rätt svar jämfört med snittet av de tre distraktorerna, antal tecken)');
  if (!rows.length) { console.log('  Inga.'); return rows; }
  rows.forEach(r => {
    const sign = r.diff > 0 ? '+' : '';
    console.log(`  ${r.id.padEnd(5)} rätt ${String(r.c).padStart(3)} tkn · distraktorer ${r.ds.map(d => String(d).padStart(2)).join(' / ')}`
      + ` · ${sign}${Math.round(r.diff * 100)} %${r.longest ? '  ← rätt svar är längst' : ''}`);
  });
  return rows;
}
const origRows = lengthReport('opts', 'originaltext (DEL C, får inte ändras)');
const easyRows = lengthReport('optsEnkel', 'Enkel svenska');

// ── Positionsfördelning i källan (före blandning) ──
const pos = [0, 0, 0, 0];
QUESTIONS.forEach(q => pos[q.correct]++);
console.log(`\nRätt svar per position i källan: A=${pos[0]} B=${pos[1]} C=${pos[2]} D=${pos[3]}  (blandas ändå med Fisher-Yates i quizet)`);

console.log('\n' + '═'.repeat(64));
if (errors.length) {
  console.log(`FEL (${errors.length}):`);
  errors.forEach(e => console.log(e));
  process.exitCode = 1;
} else {
  console.log('✓ 30 frågor · 4 alternativ var · exakt 1 rätt · ordagrant lika DEL C och svarsnyckeln');
  console.log(`  Längdvarningar: ${origRows.length} i originaltexten, ${easyRows.length} i Enkel svenska`);
}
