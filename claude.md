# CLAUDE.md – Johns Repetitionsportal

## Vad är det här projektet?
En studieportal för gymnasieelever som övar inför prov i Samhällskunskap, Naturkunskap och AI.
Målet är att eleverna ska befästa grundläggande begrepp och fakta så att de klarar svårare examinationsformer på lektionerna.
Portalen används anonymt – ingen inloggning, ingen registrering.

---

## Projektstruktur

```
index.html                  ← Startsida/portal med alla ämnesområden
portalbild.png              ← Profilbild i headern

/samhallskunskap/
  sh_demokrati.html
  sh_demokratibegrepp.html
  sh_styrning_val.html
  sh_styrningbegrepp.html
  sh_privatekonomi.html
  sh_privatekonomibegrepp.html
  sh_arbetsmarknad.html
  sh_arbetsmarknadbegrepp.html
  sh_ideologier.html
  sh_ideologibegrepp.html
  sh_massmedia.html
  sh_massmediabegrepp.html
  sh_ekonomi.html
  sh_ekonomibegrepp.html
  sh_kursprovsa1a2.html

/naturkunskap/
  nk_hallbarhet_val.html
  nk_hallbarhet_begrepp.html
  sex.html
  nk_sex_begrepp.html
  nk_vetenskap.html
  nk_vetenskap_begrepp.html
  nk2_genteknik.html
  nk2_genteknik_begrepp.html
  nk2_folkhalsa.html
  nk2_folkhalsa_begrepp.html
  nk2_hallbarhet.html
  nk2_hallbarhet_begrepp.html
  nk2_vetenskap.html
  nk2_vetenskap_begrepp.html

/ai/
  ai_quiz.html
  ai_begrepp.html
  ai_framtiden.html
  ai_manniska.html
  ai_prog.html
```

---

## Design – Portalen (index.html)

- **Typsnitt:** EB Garamond (Google Fonts) – klassisk, seriös stil
- **Färgkodning:**
  - 🟡 Gult (`#fbbf24`) = Samhällskunskap Sa1a1
  - 🟠 Orange (`#fb923c`) = Samhällskunskap Sa1a2
  - 🟢 Grönt (`#22c55e`) = Naturkunskap 1a1
  - 💚 Ljusgrönt (`#4ade80`) = Naturkunskap 1a2
  - 🔴 Rött (`#ef4444`) = Artificiell Intelligens
- **Layout:** Kort med border-top i ämnets färg, knappar i botten av kortet
- **Stil:** Rundade hörn (rounded-3xl), skuggor, hover-effekt (translateY)
- Rubriker: stora, fetstil, kursiv, versaler med letter-spacing
- Footer: "Designad av John"

---

## Quiz – Regler som ALLTID ska gälla

När du skapar eller modifierar ett quiz, följ dessa regler utan undantag:

### Antal frågor
- Varje quiz ska alltid ha exakt **30 frågor**

### Frågor
- Skriv på **svenska**
- Testa **förståelse**, inte bara memorering
- Frågorna ska vara relevanta för **gymnasienivå**
- Varje fråga ska ha exakt **4 svarsalternativ**
- Alla svarsalternativ ska vara **ungefär likalånga**

### Distraktorer (felaktiga svar)
- Ska vara **trovärdiga och pedagogiskt relevanta**
- Ska inte vara uppenbart fel (inga absurda alternativ)
- Ska representera vanliga **missförstånd** inom ämnet

### Blandning – förhindra mekanisk inlärning
- **Frågorna** ska blandas i slumpmässig ordning varje gång
- **Svarsalternativen** ska blandas i slumpmässig ordning varje gång
- Använd alltid **Fisher-Yates shuffle**:
```javascript
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
```

### Förklaringar
- Varje fråga ska ha en **förklaring** som visas efter svar
- Förklaringen ska vara pedagogisk och förklara *varför* svaret är rätt
- Visas i en **popup-modal** med 600ms fördröjning efter att eleven svarat

---

## Quiz – Teknisk struktur

Varje quiz-fil ska följa detta mönster:

```
1. Startskärm    – titel, kort beskrivning, "Starta Quiz"-knapp
2. Quizskärm     – fråga, 4 alternativ, progressbar, poängräknare, timer
3. Feedback-modal – rätt/fel-ikon, förklaring, "Nästa fråga"-knapp
4. Resultatskärm  – poäng, tid, betygsliknande feedback, lista över missade frågor, "Gör om"-knapp
```

### Färger i quiz
- Rätt svar: `#dcfce7` bakgrund, `#16a34a` kantlinje och text
- Fel svar: `#fee2e2` bakgrund, `#dc2626` kantlinje och text
- Primärfärg för knappar: matcha ämnets färg från tabellen nedan

### Vad som alltid ska finnas med
- ✅ Timer (MM:SS format)
- ✅ Löpande poängräknare under quizet
- ✅ Progressbar (visuell, inte bara text)
- ✅ "Fråga X av Y"-text
- ✅ Feedback-modal med förklaring efter varje svar
- ✅ Betygsliknande slutfeedback (t.ex. "Redo för provet!" / "Öva lite till")
- ✅ Lista över missade frågor på slutskärmen
- ✅ "Gör om"-knapp som blandar om allt igen

---

## Begreppslista + Flashcards – Regler som ALLTID ska gälla

Varje begreppsfil innehåller **både en begreppslista och flashcards i samma fil** — eleven växlar mellan vyerna med en toggle-knapp.

### Teknikstack
- **React 18** (via CDN, UMD) + **Babel Standalone** för JSX direkt i webbläsaren
- **Tailwind CSS** (via CDN)
- **Fredoka** (Google Fonts) – rundat, lättläst typsnitt för begrepp

```html
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

### Toggle – Lista vs Flashcards
- Pill-formad toggle högst upp: **Lista** | **Flashcards**
- Aktiv vy markeras med ämnets primärfärg
- Inaktiv vy är grå text

### Listvy
- Vit kortbakgrund med `border-left-8` i ämnets primärfärg
- Numrerad badge i ämnets ljusa färg + begreppets namn i fetstil
- Definition i grå text under begreppet
- `hover:shadow-md` för interaktivitet

### Flashcard-vy
- **Framsida:** Ämnets primärfärg som bakgrund, begreppet i stor fetstil, "Klicka för svar" längst ner med pulse-animation
- **Baksida:** Vit bakgrund med ämnets primärfärg som kantlinje, definitionen i mellanstor text, "Klicka för att vända" längst ner
- **Flip-animation:** 3D-rotation med `perspective: 1000px` och `rotateY(180deg)`
- Flashcards visas i **slumpmässig ordning** (aldrig samma kort två gånger i rad)
- "Nästa begrepp →"-knapp i mörkgrå (`bg-slate-900`)
- Räknare: "X av Y" i pill-format under knappen

### CSS för flip-animation (kopiera exakt)
```css
.flip-card { perspective: 1000px; height: 350px; width: 100%; max-width: 400px; cursor: pointer; }
.flip-card-inner { position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; }
.flipped-classes { transform: rotateY(180deg); }
.flip-card-front, .flip-card-back { position: absolute; width: 100%; height: 100%; -webkit-backface-visibility: hidden; backface-visibility: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; border-radius: 1.5rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); }
.flip-card-back { transform: rotateY(180deg); }
```

### Header i begreppsfil
- Tillbaka-länk till `index.html` (pil + "Portal")
- Titel centrerad med ämnets namn
- Tomt div för symmetri (flexbox-trick)

### Footer i begreppsfil
- Kursiv, diskret: `Källa: [ämne] begreppslista`

---

## Färger per ämne – gäller både quiz och begreppslista

| Ämne | Primärfärg | Ljus bakgrund | Text på färg |
|------|-----------|--------------|--------------|
| Samhällskunskap Sa1a1 | `#fbbf24` | `#fef9c3` | `#78350f` |
| Samhällskunskap Sa1a2 | `#fb923c` | `#ffedd5` | `#7c2d12` |
| Naturkunskap 1a1 | `#22c55e` | `#dcfce7` | `#14532d` |
| Naturkunskap 1a2 | `#4ade80` | `#f0fdf4` | `#14532d` |
| Artificiell Intelligens | `#ef4444` | `#fee2e2` | `#7f1d1d` |

---

## När John ber dig skapa ett nytt quiz

1. Han klistrar in text (från prov, PowerPoint eller lärobok)
2. Du genererar exakt **30 frågor** enligt reglerna ovan
3. Du skapar hela HTML-filen direkt, klar att lägga in i GitHub
4. Du uppdaterar `index.html` med länk till den nya filen
5. Du matchar ämnets färg från tabellen ovan

*John ska inte behöva ändra något manuellt.*

---

## När John ber dig skapa en ny begreppslista

1. Han klistrar in begrepp eller text att generera begrepp från
2. Du skapar en HTML-fil med både **Lista** och **Flashcards** i samma fil
3. Du följer strukturen, CSS och teknikstack ovan exakt
4. Du matchar ämnets färg från tabellen ovan
5. Du uppdaterar `index.html` med länk till den nya filen

*John ska inte behöva ändra något manuellt.*

---

## Vad som INTE ska finnas

- ❌ Inloggning eller registrering
- ❌ Lagring av elevresultat
- ❌ Reklam
- ❌ Komplicerad backend – allt körs lokalt i webbläsaren
