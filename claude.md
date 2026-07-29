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
- ✅ Fullständigt facit på resultatskärmen – alla frågor med rätt/fel-markering och elevens svar
- ✅ Bakåtnavigering under quizet – eleven kan gå tillbaka till tidigare besvarade frågor
- ✅ Knapp för enkel svenska – alla frågor och svar finns i en förenklad version utan fackspråk

### Facit på resultatskärmen – obligatoriskt

Resultatskärmen ska alltid visa ett fullständigt facit med **alla** frågor, inte bara de missade.

- Varje fråga listas i ordning med frågenummer
- Korrekt besvarade frågor markeras tydligt (grön färg eller ikon)
- Felaktigt besvarade frågor markeras tydligt (röd färg eller ikon)
- **Elevens valda svar visas alltid**, formulerat exakt som det stod under quizet
- **Vid fel visas dessutom det rätta svaret** under elevens svar
- Obesvarade frågor (om bakåtnavigering används och eleven hoppat över) redovisas som saknade
- Facitlistan renderas efter poäng/statistik-rutan och före "Gör om"-knappen

**Flerspråkigt quiz:** Alla UI-etiketter i facit måste finnas i samtliga språk quizet stödjer — t.ex.:
`reviewTitle` (sektionsrubrik), `counter` ("Fråga"), `lblCorrect` ("Rätt"), `lblWrong` ("Fel"), `lblYourAnswer` ("Ditt svar"), `lblCorrectAnswer` ("Rätt svar")

### Bakåtnavigering mellan frågor – obligatoriskt

Eleven ska kunna navigera bakåt till en tidigare fråga under quizet. Reglerna gäller oavsett om quizet är byggt med vanilla JS eller React.

**Blandning sker en gång och sparas:**
- Frågorna och varje frågas svarsalternativ blandas **en enda gång** vid quizstart
- Den blandade ordningen sparas per fråga och förändras aldrig vid navigation

**Per-fråga-tillstånd sparas:**
- Varje fråga håller reda på: (a) sin sparade alternativordning, (b) vilket alternativ eleven valt (eller null om obesvarad)
- Vid navigation bakåt/framåt återställs frågans sparade tillstånd exakt — ingen ny blandning

**Låsning av besvarade frågor:**
- En besvarad fråga visas alltid låst: rätt alternativ markerat grönt, elevens felval markerat rött, övriga nedtonade, alla knappar inaktiverade
- En obesvarad fråga visas olåst och klickbar som vanligt

**Poängräkning:**
- Poäng räknas **exakt en gång per fråga**, vid det initiala svaret
- Navigation bakåt eller framåt påverkar aldrig poängen

**Navigeringsknappar:**
- Bakåt-knappen visas bara när eleven inte är på den första frågan
- Framåt/Nästa-knappen visas bara efter att frågan är besvarad (eller om frågan redan besvarats)

**Flerspråkigt quiz:** Bakåt-knappens text (t.ex. `backBtn`) måste finnas i samtliga språk quizet stödjer.

### Enkel svenska – obligatoriskt

Varje quiz ska ha ett alternativ som visar frågorna och svaren på ett enkelt, lättläst språk. Gäller oavsett om quizet är flerspråkigt eller enbart på svenska.

**Knapp och placering:**
- En knapp märkt **📖 Enkel svenska** ska finnas tillgänglig under hela quizet
- Placeras lämpligen i språkmenyn (separerad med en linje från övriga språk) eller som en fristående toggle
- Aktiveras och avaktiveras med ett klick

**Innehåll – enkel version:**
- Alla **30 frågor** skrivs om till korta, enkla meningar utan fackspråk
- Alla **4 svarsalternativ per fråga** skrivs om på samma sätt
- Inga tekniska termer eller ämnesspecifika ord i formuleringen — använd vardagliga ord
- Den enkla versionen visas som en kompletterande rad direkt under originaltexten (samma stil som övriga språköversättningar)
- Originaltexten på svenska behålls synlig ovanför

**Vad "enkel svenska" innebär:**
- Korta meningar (helst under 15 ord)
- Vanliga ord som en lågstadieelev förstår
- Inga bisatser eller nominaliseringar om det går att undvika
- Förklara med exempel snarare än definitioner när det är möjligt

### Översättningsfunktion – obligatoriskt

Varje quiz ska ha en språkväljare (🌐-knapp, fast uppe till höger) där eleven kan se frågorna och svaren även på sitt modersmål. Översättningen visas som en kompletterande rad direkt under den svenska texten — originalet på svenska behålls alltid synligt.

**Stödda språk — alla ska finnas med:**

| Språk | Flagga | Kod | Skriptriktning |
|-------|--------|-----|----------------|
| Engelska | 🇬🇧 | `en` | LTR |
| Arabiska | 🇸🇦 | `ar` | RTL |
| Persiska (Farsi) | 🇮🇷 | `fa` | RTL |
| Bosniska | 🇧🇦 | `bs` | LTR |
| Turkiska | 🇹🇷 | `tr` | LTR |
| Somaliska | 🇸🇴 | `so` | LTR |
| Tigrinja | 🇪🇷 | `ti` | LTR |
| Albanska | 🇦🇱 | `sq` | LTR |
| Urdu | 🇵🇰 | `ur` | RTL |
| Pashto | 🇦🇫 | `ps` | RTL |
| Dari | 🇦🇫 | `prs` | RTL |

**Tekniska krav:**
- RTL-språk (arabiska, persiska, urdu, pashto, dari) visas högerställda med `direction:rtl; text-align:right`
- Språkkoden läggs i `LANG_FLAGS`, `LANG_LABELS` och `RTL`-arrayen (om tillämpligt)
- Alla **frågor**, **svarsalternativ** och **ledtrådar/förklaringar** översätts
- Alla **UI-strängar** (knappar, etiketter, facitrubriker) översätts till samtliga språk
- Enkel svenska (📖) placeras sist i menyn, separerad med en linje

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

### Toggle – Lista vs Flashcards vs Lucktext vs Test av begrepp 1 vs Test av begrepp 2
- Pill-formad toggle högst upp: **Lista** | **Flashcards** | **Lucktext** | **Test av begrepp 1** | **Test av begrepp 2**
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

### Flashcard-vy – Sortering i högar (obligatoriskt)

Varje flashcard-vy ska ha ett inbyggt sorteringssystem med två högar. Reglerna gäller oavsett om komponenten är byggd med React-CDN eller vanilla JS.

**Sorteringsknappar:**
- När eleven har vänt kortet (sett svaret) visas två knappar: **"Kunde inte"** och **"Kunde"**
- Knapparna visas aldrig på framsidan — eleven måste vända kortet innan hen sorterar
- "Kunde inte"-knappen är röd/varningsfärgad; "Kunde"-knappen är grön
- Inget swipe — sortering sker uteslutande via knapptryck

**Högar och räknare:**
- Varje kort placeras i exakt en av högarna när eleven klickar en knapp
- Antal kort kvar i **"Kunde inte"-högen** och antal i **"Kunde"-högen** visas tydligt under hela övningen, t.ex. `Kunde inte: 8 | Kunde: 4`
- Räknarna uppdateras direkt när ett kort sorteras

**Flöde efter att hela leken är genomgången:**
- När sista kortet sorterats visas en skärm med två val:
  - **"Öva på Kunde inte"** — startar en ny runda med enbart korten i "Kunde inte"-högen, i ny slumpmässig ordning
  - **"Börja om med alla"** — nollställer båda högarna och startar om med hela leken
- Om "Kunde inte"-högen redan är tom när leken är slut visas direkt sammanfattningsskärmen

**Rundor tills högen är tom:**
- Eleven kan repetera "Kunde inte"-rundan hur många gånger som helst
- Varje runda börjar med korten i ny slumpmässig ordning
- Kort som sorteras till "Kunde" under en runda tas bort från nästa runda
- Processen upprepas tills "Kunde inte"-högen är tom

**Avslutning och sammanfattning:**
- När "Kunde inte"-högen är tom visas en kompakt sammanfattning: hur många begrepp eleven behärskar av totalen, t.ex. `Du kan 18 av 20 begrepp!`
- Knappen **"Börja om med alla"** finns alltid tillgänglig — även mitt i en runda — för att nollställa och starta från början

### Flashcard-vy – React-komponent (kopiera exakt)

```jsx
function FlashcardView() {
  const total = concepts.length;
  const [deck, setDeck] = useState(() => shuffleArray([...concepts]));
  const [deckIdx, setDeckIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [kudeInte, setKudeInte] = useState([]);
  const [kunde, setKunde] = useState([]);
  const [phase, setPhase] = useState('playing'); // 'playing' | 'roundEnd' | 'allDone'

  const restartAll = () => {
    setDeck(shuffleArray([...concepts]));
    setDeckIdx(0);
    setIsFlipped(false);
    setKudeInte([]);
    setKunde([]);
    setPhase('playing');
  };

  const sort = (pile) => {
    const card = deck[deckIdx];
    const newKudeInte = pile === 'kudeInte' ? [...kudeInte, card] : kudeInte;
    const newKunde    = pile === 'kunde'    ? [...kunde, card]    : kunde;
    const nextIdx = deckIdx + 1;
    setKudeInte(newKudeInte);
    setKunde(newKunde);
    setIsFlipped(false);
    if (nextIdx >= deck.length) {
      setDeckIdx(nextIdx);
      setPhase(newKudeInte.length === 0 ? 'allDone' : 'roundEnd');
    } else {
      setDeckIdx(nextIdx);
    }
  };

  const nextRound = () => {
    setDeck(shuffleArray([...kudeInte]));
    setDeckIdx(0);
    setIsFlipped(false);
    setKudeInte([]);
    setPhase('playing');
  };

  if (phase === 'allDone') return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-green-50 border-2 border-green-400 rounded-3xl p-8 text-center w-full max-w-sm">
        <div className="text-5xl mb-4">🎉</div>
        <p className="text-2xl font-bold text-green-700 mb-2">Alla kort klarade!</p>
        <p className="text-slate-600 mb-6">Du behärskar <span className="font-bold text-green-700">{kunde.length} av {total}</span> begrepp.</p>
        <button onClick={restartAll} className="w-full bg-[PRIMARY] text-white px-8 py-3 rounded-2xl font-bold transition-colors">Börja om med alla</button>
      </div>
    </div>
  );

  if (phase === 'roundEnd') return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 text-center w-full max-w-sm shadow-sm">
        <p className="text-lg font-bold text-slate-700 mb-4">Runda klar!</p>
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{kunde.length}</p>
            <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">Kunde</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">{kudeInte.length}</p>
            <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">Kunde inte</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={nextRound} className="w-full bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-colors">
            Öva på Kunde inte ({kudeInte.length} kort) →
          </button>
          <button onClick={restartAll} className="w-full bg-[PRIMARY] text-white px-8 py-3 rounded-2xl font-bold transition-colors">
            Börja om med alla
          </button>
        </div>
      </div>
    </div>
  );

  const card = deck[deckIdx];
  const remaining = deck.length - deckIdx;

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-3 mb-5 w-full max-w-sm">
        <div className="flex-1 bg-red-50 border border-red-200 rounded-xl p-2 text-center">
          <p className="text-xl font-bold text-red-500">{kudeInte.length}</p>
          <p className="text-[10px] text-red-400 uppercase tracking-wide font-bold">Kunde inte</p>
        </div>
        <div className="flex-1 bg-slate-100 border border-slate-200 rounded-xl p-2 text-center">
          <p className="text-xl font-bold text-slate-400">{remaining}</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wide font-bold">Kvar</p>
        </div>
        <div className="flex-1 bg-green-50 border border-green-200 rounded-xl p-2 text-center">
          <p className="text-xl font-bold text-green-500">{kunde.length}</p>
          <p className="text-[10px] text-green-400 uppercase tracking-wide font-bold">Kunde</p>
        </div>
      </div>
      <div className="flip-card mb-5" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`flip-card-inner ${isFlipped ? 'flipped-classes' : ''}`}>
          <div className="flip-card-front">
            <h2 className="text-3xl font-bold text-white text-center px-4">{card.term}</h2>
            <div className="absolute bottom-6 animate-pulse">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white font-bold opacity-70">Klicka för svar</span>
            </div>
          </div>
          <div className="flip-card-back">
            <p className="text-xl leading-relaxed text-slate-800 font-medium px-4">{card.definition}</p>
            <div className="absolute bottom-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Klicka för att vända</span>
            </div>
          </div>
        </div>
      </div>
      {isFlipped && (
        <div className="flex gap-3 w-full max-w-sm mb-4">
          <button onClick={() => sort('kudeInte')} className="flex-1 bg-red-100 text-red-700 border-2 border-red-300 font-bold py-3 rounded-2xl hover:bg-red-200 active:scale-95 transition-all">
            ✗ Kunde inte
          </button>
          <button onClick={() => sort('kunde')} className="flex-1 bg-green-100 text-green-700 border-2 border-green-300 font-bold py-3 rounded-2xl hover:bg-green-200 active:scale-95 transition-all">
            ✓ Kunde
          </button>
        </div>
      )}
      <div className="flex flex-col items-center gap-2 mt-1">
        <p className="text-slate-500 font-medium bg-slate-200 px-4 py-1 rounded-full text-xs">{deckIdx + 1} av {deck.length}</p>
        <button onClick={restartAll} className="text-slate-400 text-xs hover:text-slate-600 transition-colors underline">↺ Börja om med alla</button>
      </div>
    </div>
  );
}
```

> Ersätt `bg-[PRIMARY]` med ämnets primärfärg, t.ex. `bg-teal-600` eller använd inline `style={{background:P}}`.

### CSS för flip-animation (kopiera exakt)
```css
.flip-card { perspective: 1000px; height: 350px; width: 100%; max-width: 400px; cursor: pointer; }
.flip-card-inner { position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; }
.flipped-classes { transform: rotateY(180deg); }
.flip-card-front, .flip-card-back { position: absolute; width: 100%; height: 100%; -webkit-backface-visibility: hidden; backface-visibility: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; border-radius: 1.5rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); }
.flip-card-back { transform: rotateY(180deg); }
```

### Lucktext-vy
- Varje begrepp i listan ska ha **en egen mening** — antalet meningar = antalet begrepp
- Meningarna ska visa begreppet i ett **verkligt sammanhang** så eleven förstår när och hur det används
- Alla begrepp visas i en **begreppsbank** högst upp som referens
- Eleven skriver in svaret i textfältet och trycker Enter
- **Rätt stavning:** begreppet stryks automatiskt över i begreppsbanken, grön ram och förklaring visas
- **Fel stavning (första gången):** texten "Är du säker att du stavat rätt?" visas i orange — eleven får försöka igen
- **Fel stavning (andra gången):** röd feedback, fältet förblir redigerbart tills "Rätta alla" trycks
- **"Rätta alla"-knapp:** rättar alla återstående luckor, visar rätt svar + förklaring för fel svar
- Slutresultat visas: "X / Y rätt" med betygsliknande feedback
- "Börja om"-knapp nollställer allt
- Stavningen måste vara **exakt rätt** — inga gissningar godkänns

### Scenario-matchning i begreppslista
När begreppslistan skapas, generera matchningspar för varje begrepp med fokus på begreppets kärna snarare än ytliga detaljer.
- Begrepp: den tekniska termen
- Scenario: en kort situation som beskriver begreppet utan att använda nyckelord från begreppsnamnet
- Om flera begrepp liknar varandra, skapa scenarier som kräver att eleven förstår den exakta skillnaden
- Exempel: Begrepp 'Statisk elektricitet' → Scenario: 'Du drar av dig en fleecetröja i ett mörkt rum och hör ett knastrande ljud samtidigt som håret ställer sig upp'

### Interaktiv Icke-exempel-vy i begreppslista
Gäller ENDAST begreppslistor. Lägg till en femte vy i toggle-raden: Lista | Flashcards | Lucktext | Test av begrepp 1 | Test av begrepp 2
Icke-exempel-vyn är en interaktiv 'Välj rätt tillämpning'-övning där eleven aktivt måste skilja på en korrekt användning och en trovärdig fälla:
- Visa ett begrepp och två alternativ (A och B)
- Eleven klickar på det alternativ de tror är korrekt
- Rätt svar: grön feedback
- Fel svar: röd feedback
- Förklaringen visas FÖRST efter att eleven klickat — aldrig innan
- Variera vilket alternativ (A eller B) som är rätt
- Fällorna ska använda rätt terminologi men beskriva vanliga missuppfattningar
- Undvik att kopiera definitioner — använd situationer och scenarier
- Poängräknare och slutresultat när alla begrepp är genomgångna
- 'Börja om'-knapp som blandar om ordningen

### Tillbaka-knapp — gäller ALLA filer
- Varje fil (quiz, begreppslista, lucktext, uppgifter) ska ha en **tillbaka-knapp** (se [Tillbaka-navigering](#tillbaka-navigering) för vart den ska länka)
- Placeras högst upp till vänster
- Text: "← Tillbaka till startsidan"
- Stil: diskret, matchar ämnets färg vid hover

## Tillbaka-navigering

Alla tillbaka-knappar/länkar ska använda smart navigering, aldrig hårdkodas till index.html:

- Om document.referrer finns och tillhör samma domän → history.back()
- Om referrer saknas (direktlänk/bokmärke) → fallback till områdets portalsida
  (t.ex. jur1-portal.html, nk-portal.html), inte startsidan
- Implementera som en delad funktion (gemensam JS-fil eller redan återanvänt inline-script),
  aldrig kopierad kod i varje fil
- Detta gäller alla nya sidor som skapas framöver (quiz, begreppslistor, pluggmaterial)

### Header i begreppsfil
- Tillbaka-länk till `index.html` (pil + "Tillbaka till startsidan")
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
2. Du skapar en HTML-fil med **Lista**, **Flashcards** och **Lucktext** i samma fil
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

---

## Pluggmaterial — Textfiler

### PDF-visning i Fördjupning-vyn
- Bädda ALDRIG in PDF:er med iframe — det fungerar inte på Netlify
- Visa istället snygga kort för varje PDF med: en ikon, en kort beskrivande titel och en tydlig 'Öppna dokument →'-knapp som öppnar PDF:en i en ny flik
- Korten ska vara mobilanpassade och matcha ämnets färg
- Lägg till en kort instruktionstext högst upp i Fördjupning-vyn: 'Tryck på ett dokument för att öppna det. Du kan zooma och bläddra fritt.'

---

## Styrdokument för nya kurser

Allt som skapas för de fyra nya kurserna — quiz, begreppslista, pluggmaterial — ska utgå strikt från kursens officiella styrdokument. Hitta på inget som inte finns i respektive PDF.

| Kurs | Styrdokument |
|------|-------------|
| Juridik nivå 1 | `Juridik nivå 1.pdf` |
| Samhällskunskap nivå 1a1 | `Samhällskunskap nivå 1a1.pdf` |
| Naturkunskap nivå 1a1 | `Naturkunskap nivå 1.pdf` |
| Rätten och samhället | `rätten och samhället.pdf` |

- Läs styrdokumentet noggrant innan du skapar något
- Begrepp, frågor och förklaringar ska spegla kursens centrala innehåll och kunskapskrav enligt PDF:en
- Om ett begrepp eller en fråga inte kan härledas ur styrdokumentet ska det inte inkluderas

---

## Progress- och rank-system för begreppsövningsfiler

Alla begreppsfiler med flera övningsvyer (Lista/Flashcards/Lucktext/Scenario/Icke-ex. eller motsvarande) ska ha progress-tracking enligt denna standard:

- **Lagring:** sessionStorage, nyckel-mönster `<prefix>_progress` (t.ex. `jur1_block1_progress`, `nk_a1_progress`). Rensas när fliken stängs — ingen inloggning.
- **Klart-kriterier:**
  - Läsvy (Lista): scrollat till botten (IntersectionObserver)
  - Flashcards: sorterat alla kort en gång
  - Poängbaserade vyer (quiz/scenario/lucktext-typ): minst 80% rätt
- **Rank:** baseras på antal avklarade vyer av totalt antal (5 = S om samtliga poängvyer även har 100%, annars A; 4=A, 3=B, 2=C, 1=D, 0=ingen)
- **UI:** bock på toggle-pill, progressrad med "X/N avsnitt klara" + rank-badge, firande overlay vid ny rank
- **Verifieringskod:** "PREFIX-XXXX" genererad från datum + avklarade vyer + rank + saltsträng (unik per fil), ändras dagligen — låter läraren snabbt syna en skärmdump utan att behöva logga in eleven någonstans

Använd samma mönster (state lyft till toppkomponenten, onComplete-callback till varje vy-komponent) oavsett antal vyer i filen.
