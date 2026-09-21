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

### Regler för svarsalternativ i quiz

- Alla fyra alternativ i en flervalsfråga ska vara ungefär lika långa
  (räknat i antal ord/tecken). Om det korrekta svaret naturligt blir
  längre än distraktorerna, förläng distraktorerna med jämförbar
  detaljnivå istället för att korta ner det rätta svaret.
- Det korrekta alternativet får INTE vara systematiskt längre, mer
  detaljerat, eller mer "komplett" formulerat än de tre felaktiga.
  Distraktorerna ska vara lika specifika och använda samma typ av
  terminologi som det rätta svaret.
- Variera vilken position (A/B/C/D) det rätta svaret hamnar på — inte
  bara genom Fisher-Yates-shuffle av ordningen, utan säkerställ även
  vid genereringen att inget annat mönster (längd, meningsbyggnad,
  användning av fackterm) läcker vilket alternativ som är rätt.
- Efter att frågorna genererats: gör en självgranskning där du jämför
  ordlängden på rätt svar mot de tre distraktorerna för varje fråga.
  Om skillnaden är påtaglig (t.ex. rätt svar är dubbelt så långt),
  skriv om de korta distraktorerna innan filen sparas.

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

### Namngivning av vyerna
De fem vyerna heter **Lista**, **Flashcards**, **Lucktext**, **Test 1** (tidigare kallad Scenario) och **Test 2** (tidigare kallad Icke-ex.). Använd dessa etiketter i alla nya begreppsfiler.

Interna nycklar (VIEWS-array, ACTIVE_VIEWS, SCORE_VIEWS, sessionStorage, markComplete-anrop) använder fortfarande de ursprungliga strängarna `'Scenario'` och `'Icke-ex.'` — byt dem aldrig utan att uppdatera alla beroenden. Vad eleven ser styr du via en separat `VIEW_LABELS`-konstant:
```js
const VIEW_LABELS = { 'Scenario': 'Test 1', 'Icke-ex.': 'Test 2' };
```
Rendera `{VIEW_LABELS[key] || key}` i toggle-pillen, inte `{key}` direkt.

### Svarsalternativ i Test 1-vyn (Scenario) — hjälpfunktion
Svarsalternativ ska alltid byggas via en helper som tar det visade begreppet (eller dess index i den blandade arrayen) som argument. Indexera aldrig mot originalarrayen — blandad och ursprunglig ordning är inte samma sak. Helpern ska anropas från både useState-initialiseraren och nästa-frågan-handlern så att logiken finns på ett enda ställe. Rätt svar läggs in först, distraktorer hämtas från samma blandade array, hela listan shufflas sist.

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

---

## Jeopardy-spel (standard v2)

### Syfte och grundform
Ett jeopardy-spel bygger om ett arbetsområdes befintliga quiz-/begreppsinnehåll till ett lagspel som **vikarier** kan köra på lektionen utan att själva kunna ämnet. Spelledaren ska aldrig behöva gissa vad som är rätt svar — spelet rättar själv.

Fil: `[kurs]_[omrade]_jeopardy.html`, länkas som eget kort på områdets hubbsida direkt efter quiz-kortet (och före ett eventuellt miljonär-kort). Referens: `nk1a1_naturvetenskap_jeopardy.html`.

Mörk helskärmsbräda, **en egen färg per kategori**, vikarieledd, auto-rättning, slumpat startlag, regelskärm efter lagnamn.

### Teknikstack
- Fristående HTML-fil, samma mönster som quiz-/begreppsfiler: Tailwind CSS via CDN + EB Garamond och Fredoka (Google Fonts)
- Ingen fil-uppladdning (varken bild eller ljud) — spelet ska fungera direkt i webbläsaren utan externa filer eller inställningar innan lektionen
- Ingen inloggning, inga sparade resultat mellan lektioner (samma princip som under "Vad som INTE ska finnas")

### Två omgångar
- **Omgång 1:** 4 kategorier × 5 frågor, 100–500p
- **Omgång 2:** 4 **nya** kategorier × 5 frågor, 600–1000p
- Kategorierna i omgång 2 får vara fördjupningar av teman i omgång 1
- **1000p/500p högst upp på brädet** (högsta värdet överst, lägsta nederst)
- **Mellanskärm** när omgång 1 är tömd: ställning + knapparna "Starta omgång 2" och "Avsluta spelet" (vikarien kan avsluta vid tidsbrist)
- "Avsluta spelet" leder till slutställning oavsett omgång

### Svårighetstrappa (gäller alla nya frågor)

| Poäng    | Frågetyp                                   |
|----------|--------------------------------------------|
| 100–200  | Fakta, begrepp ("Vad kallas…?")            |
| 300–400  | Förklara, orsak och verkan                 |
| 500–700  | Tillämpa: kort scenario                    |
| 800–1000 | Jämföra, analysera, flera steg             |

Frågor hämtas från uppgifter-filer, svar från teorifiler. Hitta aldrig på nytt sakinnehåll.

Samma regler för svarsalternativ gäller som under **Quiz** ovan: exakt 4 alternativ, ungefär lika långa och lika detaljerade, trovärdiga och pedagogiskt relevanta distraktorer, inget mönster (längd/formulering/fackterm) som läcker rätt svar.

### Tid skalad efter poäng
- **100–300p:** 45 s
- **400–700p:** 60 s
- **800–1000p:** 75 s
- **När frågan går vidare till nästa lag:** 20 s (frågan är redan läst)
- Tiden styrs av frågans **ursprungliga poängvärde**, inte det halverade

### Turordning – strikt rotation
- Lagen väljer fråga i **fast ordning** (A → B → C → A …) oavsett resultat
- Rätt svar ger poäng men **inte** nästa val
- **Stöld ger inte turen:** laget som tar poäng på ett annat lags fråga väljer inte nästa fråga — rotationen fortsätter som vanligt
- Vid fel svar går frågan vidare enligt befintlig logik med **halverande poängstege** (t.ex. 1000 → 500 → 250)
- Rotationen fortsätter in i omgång 2 där omgång 1 slutade
- Visa tydligt på brädet vilket lag som väljer härnäst

### Facit alltid tillgängligt för spelledaren
- Varje fråga har ett "Visa svar"-läge som markerar rätt alternativ grönt **och** visar en kort (1–2 meningar) pedagogisk förklaring till varför svaret är rätt
- Förklaringen ska vara skriven så att en vikarie utan ämneskunskap direkt kan avgöra om ett elevsvar räknas som rätt eller fel

### Lag och poäng
- Startskärm: valfritt antal lag (2–4) med fritextfält för lagnamn — inga förifyllda festrelaterade exempelnamn
- Poängpanel alltid synlig under spelets gång: lagnamn + löpande poäng
- Lagens färger är **fasta genom hela spelet** och får aldrig följa kategorifärgerna — de byts ut i omgång 2
- Spelledaren kan justera poäng manuellt (snabbknappar +100/−100) för varje lag, för rättningar eller bonuspoäng

### Frågeflöde
- Klick på en ruta öppnar frågan i en modal med nedräkningstimer (skalad enligt tabellen ovan) och progressbar
- Laget vars tur det är svarar muntligt; spelledaren klickar på det alternativ laget väljer
- **Stöld-regel:** Vid fel svar eller om tiden tar slut går frågan vidare till nästa lag som inte redan svarat fel, till halverat värde och med 20 s betänketid. Ingen uppoffring, shot eller fysisk uppgift ska förekomma
- Har alla lag svarat fel visas rätt svar automatiskt utan att någon får poäng
- Rutan markeras som spelad när modalen stängs, och turen går vidare till nästa lag i rotationen

### Regelskärmen
Visas efter att lagnamnen matats in, innan spelplanen kan användas. Den ska förklara:
- att spelet har **två omgångar** (100–500p och 600–1000p, med mellanskärm emellan)
- **strikt turordning** — lagen väljer fråga i fast ordning oavsett om de svarar rätt eller fel
- att **stöld inte ger turen** — man kan ta poäng på ett annat lags fråga men väljer ändå inte nästa
- att **tiden är längre på svårare frågor**, och att ett stulet försök har 20 s
- att spelledaren inte behöver kunna ämnet — spelet rättar själv och visar förklaringen

### Spelplan
- Rutnät: 4 kolumner × 5 rader, kategori-header överst i respektive kategorifärg
- Högsta poängvärdet överst, lägsta nederst
- Redan spelade rutor markeras som "använda" — gråtonas och går inte att klicka igen

### Helskärm — projektorläge (obligatoriskt)

Spelet projiceras i klassrummet och eleverna ska kunna läsa frågor och svarsalternativ själva från sina platser. Därför ska allt läsbart innehåll skalas upp **enbart i helskärmsläge**.

**Var skalningen gäller:**
- Reglerna skrivs mot `#jp-stage.jp-fs`, `#jp-stage:fullscreen` och `#jp-stage:-webkit-full-screen` — alla tre, som separata selektorer i samma selektorlista. `.jp-fs` sätts alltid av `jpToggleFullscreen()` och är därmed den som i praktiken träffar; `:fullscreen`/`:-webkit-full-screen` fångar äkta helskärm
- **Normalvyn i webbläsarfönstret ska vara exakt oförändrad** — inga storlekar utanför helskärmsblocket får röras

**Vad som ska skalas upp:**

| Element | Selektor | Normalvy | Helskärm |
|---------|----------|----------|----------|
| Svarsalternativ (viktigast) | `#jp-opts .jp-opt` | `clamp(.85rem,1.9vh,1.05rem)` | `clamp(1.15rem,2.8vh,2.3rem)` |
| Frågetext | `#jp-q` | `clamp(1.05rem,2.7vh,1.6rem)` | `clamp(1.35rem,3.2vh,2.4rem)` |
| Kategorirubriker | `.jp-head` | `clamp(.6rem,1.5vh,.95rem)` | `clamp(.85rem,2.1vh,1.7rem)` |
| Poängvärden i rutorna | `.jp-cell` / `.jp-used` | `clamp(1.3rem,4.6vh,3.1rem)` | `clamp(1.8rem,6.2vh,4.6rem)` |
| Lagnamn | `.jp-team .nm` | `clamp(.7rem,1.6vh,.95rem)` | `clamp(.95rem,2.3vh,1.8rem)` |
| Poängställning | `.jp-team .sc` | `clamp(1rem,2.6vh,1.6rem)` | `clamp(1.3rem,3.4vh,2.6rem)` |
| Förklaring i modalen | `#jp-expl-wrap` | `.875rem` (`text-sm`) | `clamp(1rem,2.1vh,1.5rem)` |
| Turtext | `#jp-turn` | `clamp(.8rem,2vh,1.1rem)` | `clamp(1.05rem,2.8vh,2rem)` |
| Omgångspill | `#jp-round` | `clamp(.55rem,1.3vh,.72rem)` | `clamp(.75rem,1.8vh,1.2rem)` |

Dessutom skalas `#jp-cat`, `#jp-val`, `#jp-time`, `#jp-answering`, `#jp-banner p`, `#jp-board`-gap och `.jp-step`.

**Tekniska krav:**
- Använd alltid `clamp()` med **viewport-enheter** (`vh` för text, `vw` för horisontell padding) så att storleken följer duken — aldrig fasta px-värden
- Sätt **aldrig** `font-size` inline i markup på `#jp-q` eller `#jp-turn` — inline-stil slår ut helskärmsreglerna. Basstorlekarna hör hemma i `<style>`
- Frågekortet: `max-width:min(1500px,94vw)`, `max-height:96%`, `overflow-y:auto` — modalen kan därmed aldrig svämma över scenkanten
- Långa svarsalternativ måste radbryta snyggt: `overflow-wrap:anywhere` på `.jp-opt`, `overflow-wrap:break-word` på `#jp-q` och `.jp-head`
- Spelplanens 4×5-rutnät ska hålla ihop utan scroll — `#jp-board` är `flex:1;min-height:0` med `grid-template-rows:auto repeat(5,1fr)`, så raderna krymper i stället för att spilla över
- Kontrollera alltid mot **16:9** och mot **projektorupplösning 1280×720** att inget bryter layouten

### Vad som INTE ska finnas i ett Jeopardy-spel
- ❌ Referenser till fest, alkohol/shots eller personer utanför klassrumskontexten
- ❌ Beroende av externa bild- eller ljudfiler som inte redan finns i repot
- ❌ Elevnamn eller resultat som sparas mellan lektioner
- ❌ Streak-/svitregler — de ersattes av strikt rotation i v2

### Tillbaka-navigering och namngivning
- Samma tillbaka-knapp-mönster som övriga filer (se [Tillbaka-navigering](#tillbaka-navigering))
- Filnamn: `<prefix>_jeopardy.html` (t.ex. `sh_demokrati_jeopardy.html`, `jur1_block2_jeopardy.html`)

---

## När John ber dig skapa ett Jeopardy-spel

1. Han anger vilket arbetsområde det gäller (t.ex. pekar på ett områdeskort eller en befintlig fil)
2. Du läser områdets uppgifter-fil för frågorna och teorifilen (samt `_quiz.html` / `_begrepp_data.md`) för svar och förklaringar — du hittar inte på nytt innehåll
3. Du delar in innehållet i **två omgångar**: 4 kategorier × 100–500p och 4 nya kategorier × 600–1000p, enligt svårighetstrappan
4. Du skapar hela HTML-filen direkt, klar att lägga in i GitHub, och matchar ämnets färg från tabellen
5. Du lägger till ett Jeopardy-kort på områdets hubbsida direkt efter quiz-kortet

*John ska inte behöva ändra något manuellt.*

---

## Jeopardy – teknisk referensimplementation

`nk1a1_naturvetenskap_jeopardy.html` är **facit** för alla framtida Jeopardy-spel — både markup, spellogik och design. Bygg nya spel genom att kopiera den filen och byta ut `JP_ROUNDS` samt back-länkens fallback. Ändra aldrig funktions- eller variabelnamnen nedan utan att uppdatera alla beroenden. Reglerna i avsnittet ovan ("Jeopardy-spel (standard v2)") gäller fortfarande för *innehållet*; det här avsnittet låser *implementationen*.

### Filplacering och portalintegration
- Egen fil per område: `[kurs]_[omrade]_jeopardy.html` (t.ex. `nk1a1_naturvetenskap_jeopardy.html`, `sh_demokrati_jeopardy.html`)
- Eget kort på **områdessidan** (inte `index.html`), alltid **direkt efter quiz-kortet** — och före ett eventuellt miljonär-kort. Kanonisk kortordning på ett områdeskort: **material → begrepp → quiz → jeopardy → miljonär** (se [Miljonär-spel](#miljonär-spel))
- Kortbeskrivningen ska nämna att spelet kan **ledas av en vikarie** som inte kan ämnet
- Back-länk uppe till vänster med `smartBack(event)`: `history.back()` om `document.referrer` är samma origin, annars fallback till områdessidan (aldrig hårdkodat `index.html`)
- Footer `Designad av John`, `<script src="feedback-widget.js" defer>` och GoatCounter-snippet (`johnblixt.goatcounter.com`) sist i `<body>` — exakt som i referensfilen

### Innehåll och data (`JP_ROUNDS`, `JP_TEAM_COLORS`)
- `JP_ROUNDS`: array med **exakt 2 omgångsobjekt**, `{ label, cats }`
  - `label`: kort etikett som visas i `#jp-round`-pillen, t.ex. `'Omgång 1 · 100–500p'`
  - `cats`: **exakt 4 kategoriobjekt** `{ name, color, rgb, qs }` — omgång 2 har helt nya kategorier
    - `color`: kategorins hex-kulör · `rgb`: samma färg som `"r,g,b"`-sträng (används för `rgba()`-bakgrunder)
    - `qs`: **exakt 5 frågeobjekt**, sorterade lägsta → högsta värde i arrayen; brädet vänder ordningen visuellt så högsta värdet hamnar överst
  - Omgång 1 använder `v:100…500`, omgång 2 `v:600…1000`
- `JP_TEAM_COLORS`: fyra fasta lagfärger, **frikopplade från kategorifärgerna** — annars byter lagen färg när omgång 2 börjar. `jpTeamColor(i)` läser ur denna array
- `let JP_CATEGORIES = JP_ROUNDS[0].cats` är den aktiva omgångens kategorier; `jpStartRound(n)` pekar om den
- Frågeobjekt: `{ v, q, opts:[4 st], correct:<index i opts>, expl }`
  - Frågorna (`q`) hämtas från områdets uppgifter-fil/`_quiz.html`; förklaringen (`expl`) bygger på teori-/begreppsfilen
  - `opts`: fyra alternativ, ungefär lika långa och lika detaljerade (kvalitetsreglerna under **Quiz**). `correct` pekar på rätt alternativ i den **oblandade** arrayen — blandning sker i runtime
  - `expl`: 1–2 meningar, skrivet så att en vikarie kan läsa upp det rakt av och direkt se varför svaret är rätt
  - Frågetypen ska följa svårighetstrappan i avsnittet ovan (fakta → förklara → tillämpa → analysera)

### Design (lås mot referensfilen)
- Mörk spelplan (`--navy #0b1120`, `--navy2 #111c33`), **fyra tydligt åtskilda kategorikulörer per omgång** (omgång 1: `#06b6d4`, `#a855f7`, `#f59e0b`, `#f43f5e` · omgång 2: `#34d399`, `#818cf8`, `#fb923c`, `#e879f9`)
- Kategorifärgen följer med överallt: `.jp-head`, `.jp-cell` (bakgrund `rgba(rgb,.13)`, hover fylls med `color`), kategoripill `#jp-cat`, timerbar `#jp-bar` och förklaringsruta `#jp-expl-wrap`. Lagpanelen, `#jp-turn` och slutlistan använder däremot **`jpTeamColor(i)`**
- `#jp-board`: `grid-template-columns:repeat(4,1fr); grid-template-rows:auto repeat(5,1fr)` — rutnätet fyller scenens höjd. **Högsta värdet överst** (`jpBuildBoard` loopar `row=4→0`)
- All typografi skalar med `clamp(min, <n>vh, max)` så den syns från bakre bänkraden. Spelade rutor: `.jp-used` (gråtonad, ej klickbar, `✓`)
- Typsnitt: **Fredoka** på siffror (`.num`, poäng, rutvärden, timer), **EB Garamond** på all brödtext
- Helskärm: `jpToggleFullscreen()` försöker Fullscreen API på `#jp-stage` och lägger alltid på `.jp-fs` (`position:fixed; inset:0`) som fallback. `keydown` Escape stänger **modal först** (`jpCloseModal`), annars regelrutan, annars helskärm. `fullscreenchange` utan `fullscreenElement` → `jpExitFullscreen()`
- Sist i `<style>`, precis före `@media (prefers-reduced-motion)`, ligger helskärmsblocket som skalar upp all läsbar text — se [Helskärm — projektorläge](#helskärm--projektorläge-obligatoriskt) för tabellen med exakta `clamp()`-värden. Blocket kopieras oförändrat mellan spelen
- `#jp-modal`, `#jp-rules`, `#jp-inter` och `#jp-end` ligger **inuti `#jp-stage`** (annars försvinner de i helskärmsläge)

### Spellogik (vikarievänlig – spelledaren behöver inte kunna ämnet)
Centrala tillståndsvariabler (globala): `jpTeamCount`, `jpTeams` (`[{name,score}]`), `jpTurn` (lag som **väljer** ruta), `jpRound` (0 eller 1), `jpUsed` (antal spelade rutor i **aktuell omgång**, omgången slut vid 20). Per fråga: `jpCat`, `jpRow`, `jpCell`, `jpOpts` (blandade `{text,isCorrect}`), `jpValue` (aktuellt, sjunkande värde), `jpBaseValue` (frågans ursprungliga värde — styr timern), `jpChooser` (laget som valde rutan), `jpAnswering` (laget som svarar nu), `jpFailed` (lag som svarat fel på denna fråga), `jpWrong` (låsta felaktiga alternativindex), `jpResolved`, `jpRevealed`, `jpWinner`, `jpTimer`, `jpTime`, `jpTimeTotal`.

> **v2:** `jpStreak` och all streak-logik är borttagen. Turordningen är strikt rotation — inget lag kan behålla eller vinna turen.

- **Setup:** `jpRenderTeamInputs` / `jpChangeTeamCount(±1)` (2–4 lag, fritextnamn). `jpStartGame` fyller `jpTeams`, slumpar `jpTurn`, sätter `--tc`, anropar `jpStartRound(0)` och sedan `jpShowRules(true)`
- **Omgångar:** `jpStartRound(n)` sätter `jpRound=n`, pekar om `JP_CATEGORIES=JP_ROUNDS[n].cats`, nollställer `jpUsed`, ritar brädet och uppdaterar `#jp-round`-pillen. `jpTurn` rörs **aldrig** här — rotationen fortsätter där omgång 1 slutade
- **Mellanskärm:** när `jpUsed>=20` i `jpCloseModal` → `jpShowIntermission()` om `jpRound===0`, annars `jpShowEnd()`. `#jp-inter` visar ställningen plus `jpStartRound2()` ("Starta omgång 2") och `jpShowEnd()` ("Avsluta spelet")
- **Regelruta:** `#jp-rules` visas efter lagvalet, innan spelplanen används; `jpShowRules(false)` / `jpHideRules` öppnar/stänger den igen via "Regler" i toppraden. Frågor kan inte öppnas medan regelrutan eller mellanskärmen är uppe
- **Turordning (strikt rotation):** `jpOpenQuestion` sätter `jpChooser = jpAnswering = jpTurn`, `jpValue = jpBaseValue = q.v`, blandar `jpOpts` med `jpShuffle`, startar timern. `jpCloseModal` sätter **alltid** `jpTurn=(jpChooser+1)%jpTeams.length` — oavsett rätt, fel, stöld eller "Visa svar". Ingen annan funktion får skriva till `jpTurn`
- **Rätt svar** (`jpPick` → `o.isCorrect`): `jpValue` läggs på `jpTeams[jpAnswering].score`, `expl` visas och bannern anger i lagets färg vem som fick poängen **och vilket lag som väljer nästa fråga**. Ingen manuell bedömning — spelet rättar själv
- **Fel svar** (`jpPick` → fel, eller timeout via `jpStartTimer`): `jpFailAndAdvance` låser alternativet (`jpWrong`), lägger laget i `jpFailed`, halverar värdet med **`jpLowerValue`** (`Math.floor(v/2)` → nedåt till närmaste 50 → `Math.max(50, …)`; 1000→500→250→100→50), `jpNextAnswerer` ger nästa lag som inte finns i `jpFailed` (cykliskt), timern startar om på `JP_STEAL_TIME`
- **Alla lag fel / alla alternativ slut:** `jpNextAnswerer` returnerar `null` → rätt svar + `expl` visas, `jpWinner=null`, ingen poäng
- **Timer:** `jpBaseTime(v)` ger 45 s (`v<=300`), 60 s (`v<=700`) eller 75 s (annars) utifrån **`jpBaseValue`**, inte det halverade värdet. `JP_STEAL_TIME = 20` används vid varje stöldförsök. `jpStartTimer(sec)` sätter `jpTimeTotal=sec`, `#jp-bar` krymper linjärt mot `jpTimeTotal`, växlar rött ≤10 s, vid 0 anropas `jpFailAndAdvance({timedOut:true})`
- **`jpRevealAnswer`** ("Visa svar"): nödknapp som avslöjar facit utan poäng; turen flyttas av `jpCloseModal` som vanligt
- **`jpCloseModal`:** markerar rutan `.jp-used`, `jpUsed++`, roterar turen, och vid `jpUsed>=20` → mellanskärm eller slut
- **Lagpanel:** `jpRenderTeams` – aktivt lag (`jpTurn`) markeras med färgram, övriga tonas ned. `jpAdjust(i,±100)` är spelledarens manuella nödutgång för poäng
- **Slut:** `jpShowEnd` – `#jp-end`-overlay med lagen sorterade på poäng, 🏆 på ettan, "Spela igen" → `jpNewGame`

---

## Miljonär-spel

### Syfte
Ett spel i formatet "Vem vill bli miljonär?" som bygger om ett arbetsområdes befintliga flervalsfrågor till en soloklättring genom en prisstege — för egen övning eller som lektionsmoment. Till skillnad från Jeopardy kräver spelet ingen spelledare eller lagindelning.

### Teknikstack
- Fristående HTML-fil, samma mönster som quiz-/begrepp-/jeopardy-filer: ingen extern CSS-/JS-lib, allt körs i webbläsaren
- Google Fonts: **EB Garamond** (brödtext) + **Fredoka** (rubriker, belopp, spelkomponenter) — samma typsnittspar som begreppslistorna
- Ingen inloggning, ingen `localStorage`/`sessionStorage` — varje omgång är fristående och nollställs vid omstart (samma princip som under "Vad som INTE ska finnas")
- Sist i `<body>`: `<script src="feedback-widget.js" defer>` och GoatCounter-snippet (`johnblixt.goatcounter.com`) — samma två rader som i övriga filer

### Endast fyrsvarsfrågor
- Formatet kräver exakt fyra svarsalternativ per fråga (A–D). Rätt/Fel-påståenden fungerar inte som de är och får **aldrig** läggas in i det formatet
- Två sätt att hantera sant/falskt-frågor när frågor återanvänds från ett områdes `_quiz.html`:
  - **Filtrera bort dem** — standard när frågebanken ändå räcker till 24 frågor
  - **Skriva om dem till fyra alternativ** — när John bett om full täckning av quizets frågor. Frågan ska då pröva exakt samma kunskap som originalet: sakinnehållet får inte ändras, bara formen. Gör originalets korrekta bedömning till det rätta alternativet och skriv tre nya distraktorer enligt kvalitetsreglerna. Samma sak gäller flervalsfrågor med färre än fyra alternativ — fyll på med nya felaktiga alternativ, ändra aldrig frågans innehåll
- Är originalfrågan numrerad som deluppgift (`a)`, `b)`) tas prefixet bort — frågan står fristående i miljonär-spelet

### Frågebank och urval
- Frågorna hämtas **alltid** från områdets befintliga `_quiz.html` (endast flervalsfrågorna) och/eller `_begrepp_data.md` — hitta aldrig på nytt sakinnehåll
- Frågebanken delas in i **tre svårighetsnivåer** (1 = lättast, 3 = svårast) med **8 frågor per nivå = 24 totalt**. Bedöm svårighetsgrad utifrån hur mycket syntes/tillämpning frågan kräver (definitioner → organisation/principer → tillämpade scenarier), aldrig genom att hitta på nytt innehåll
- **Variant — full täckning:** har John bett om att *alla* frågor i områdets quiz ska med, får banken vara större eller mindre än 24. Fördela frågorna så jämnt som möjligt över de tre nivåerna, med **minst 5 per nivå** (annars går det inte att dra en omgång). Exempel: 29 frågor → 10 / 10 / 9
- Varje omgång slumpar **5 frågor per nivå = 15 frågor**, som spelas i stigande svårighet (nivå 1 → nivå 2 → nivå 3)
- Fisher-Yates-shuffle används både för frågeurvalet inom varje nivå och för svarsalternativens ordning — samma kvalitetsregler som under **Quiz** gäller (fyra ungefär lika långa och lika detaljerade alternativ, inget mönster som läcker rätt svar). Kontrollera ordlängden på rätt svar mot distraktorerna innan filen sparas; är skillnaden påtaglig förlängs distraktorerna, aldrig tvärtom
- Svåra frågor (nivå 3): distraktorerna ska vara rimliga missuppfattningar hämtade ur ämnet självt — t.ex. att förväxla korrelation med kausalitet, eller validitet med relevans
- **"Spela igen" drar i första hand ospelade frågor.** Vilka frågor som spelats hålls i sidans eget state (`playedIds` per nivå) — ingen `localStorage`/`sessionStorage`, allt nollställs när fliken laddas om. Tar en nivå slut på ospelade frågor fylls omgången på med redan spelade, och nivåns räkning börjar om från de frågor som drogs. Med en bank på 29 frågor täcker alltså två omgångar hela quizet

### Prisstege och säkra nivåer
- 15 steg, 1 000 → 1 000 000 kr: `1000, 2000, 3000, 5000, 10000, 15000, 20000, 30000, 50000, 100000, 150000, 250000, 500000, 750000, 1000000`
- **Säkra nivåer** på steg 5 (10 000 kr) och steg 10 (100 000 kr). Ett fel svar faller alltid tillbaka till senast passerade säkra nivå — aldrig lägre
- "Stanna och ta hem summan" är synlig och klickbar från fråga 2 och ger eleven det senast säkrade beloppet

### Lås-svaret-flödet (två klick, obligatoriskt)
1. Klick på ett alternativ **markerar** det (ingen bedömning ännu)
2. En bekräftelserad visas: **"Är det ditt slutgiltiga svar?"** med knapparna **Ändra** (avmarkerar, eleven får välja om) och **Lås svaret** (låser)
3. Efter låsning: **1,3 sekunders paus**, sedan avslöjas facit (rätt alternativ grönt, ev. felval rött)

### De tre livlinjerna (en gång var per omgång, inte per fråga)
- **50:50** — döljer två av de tre felaktiga alternativen
- **Fråga klassen** — stapeldiagram viktat mot rätt svar. Basandel för rätt svar per svårighetsnivå: **62 % (nivå 1) / 48 % (nivå 2) / 38 % (nivå 3)** — resten fördelas slumpmässigt mellan de kvarvarande felaktiga alternativen. Nivå 3 ger alltså en betydligt jämnare — mindre avslöjande — fördelning än nivå 1
- **Ring en vän** — ger ett svarsförslag som brödtext. Felchans per svårighetsnivå: **0 % (nivå 1) / 10 % (nivå 2) / 25 % (nivå 3)**. Formuleringen ska spegla säkerhetsgraden: självsäker fras när vännen har rätt, tveksam/hedgande fras när vännen (slumpmässigt, enligt felchansen) föreslår ett felaktigt alternativ

### Pedagogik och facit
- Förklaringen visas **alltid** i en modal efter att eleven svarat — minst efter varje rätt svar, men rekommenderat efter varje besvarad fråga (rätt och fel) för bästa inlärningseffekt
- Resultatskärmen listar **alla besvarade frågor** i ordning med elevens svar, rätt svar (vid fel) och förklaring — även vid tidigt avbrott (stannat eller svarat fel)

### Färgprincip
- **Mörkt spelbräde** i samma anda som Jeopardy-sidorna, men i **navy/guld** i stället för Jeopardys navy/regnbåge: `--navy-900:#050c22`, `--navy-800:#0a1533`, `--navy-700:#132146`, `--navy-600:#1c2f60`, `--gold:#f0b429`, `--gold-soft:#f7d774`
- **Kursens/ämnets primärfärg** (se färgtabellen) används enbart som **accent** — i eyebrow-badgen ("Kurs · Block") och för att markera de säkra nivåerna i prisstegen. Guld används genomgående för primära knappar, aktuell nivå i stegen och slutsummans belopp

### Layout
- Två kolumner: fråga + svarsalternativ till vänster, prisstege till höger
- Under 860 px: stegen flyttas överst som en kompakt horisontell, scrollbar rad
- Under 768 px (mobilläge): sidans padding och textstorlekar krymper — frågetext, svarsalternativ och livlinjeknappar skalas ned så att hela frågan ryms på en mobilskärm utan att brytas
- Under 560 px: svarsalternativen läggs i en kolumn (annars två kolumner à två alternativ)
- `prefers-reduced-motion` respekteras (transitions/animationer stängs av)

### Tillbaka-navigering och namngivning
- Samma tillbaka-knapp-mönster som övriga filer (se [Tillbaka-navigering](#tillbaka-navigering)) — för Juridik 1-filer specifikt: `<script src="jur1_nav.js">` och `jur1GoBack(event)`. Saknar kursen en delad nav-fil används en inline `smartBack(event)` med samma logik: `history.back()` när `document.referrer` ligger på samma domän, annars fallback till **områdessidan** (aldrig hårdkodat `index.html`)
- Filnamn: `[kurs]_[omrade]_miljonar.html` (t.ex. `jur1_block1_miljonar.html`, `sh_demokrati_miljonar.html`)
- Kortordning på områdessidan: **material → begrepp → quiz → jeopardy → miljonär** — miljonär-kortet placeras alltid sist

---

## När John ber dig skapa ett Miljonär-spel

1. Han anger vilket arbetsområde det gäller (t.ex. pekar på ett områdeskort eller en befintlig fil)
2. Du läser motsvarande `_quiz.html` (endast flervalsfrågorna) och/eller `_begrepp_data.md`/pluggmaterial för att hämta sakinnehåll och förklaringar — du hittar inte på nytt innehåll
3. Du delar in frågorna i tre svårighetsnivåer × 8 frågor enligt reglerna ovan
4. Du skapar hela HTML-filen direkt, klar att lägga in i GitHub, och matchar ämnets färg som accent
5. Du lägger till ett miljonär-kort sist på områdessidan, efter quiz- och jeopardy-korten

*John ska inte behöva ändra något manuellt.*

---

## Miljonär-spel – teknisk referensimplementation

`jur1_block1_miljonar.html` är **facit** för alla framtida miljonär-spel — både markup, spellogik och design. Bygg nya spel genom att kopiera den filen och byta ut `QUESTION_BANK` samt back-länkens fallback. Ändra aldrig funktions- eller variabelnamnen nedan utan att uppdatera alla beroenden. Reglerna i avsnitten ovan ("Miljonär-spel" m.fl.) gäller fortfarande för *innehållet*; det här avsnittet låser *implementationen*.

### Data (`QUESTION_BANK`, `LADDER`, `SECURE_IDX`)
- `QUESTION_BANK`: objekt med nycklarna `1`, `2`, `3` (svårighetsnivå), varje värde en array med **exakt 8 frågeobjekt** `{ q, opts:[4 st], correct:<index i opts>, expl }` i den **oblandade** originalordningen — urval och blandning sker i runtime via `buildRound()`
- `LADDER`: array med de 15 beloppen i stigande ordning. `SECURE_IDX`: ett `Set` med de 0-indexerade positionerna för de säkra nivåerna (`4` och `9`)
- `AUDIENCE_BASE` och `FRIEND_ERROR`: objekt nycklade på svårighetsnivå (`1`/`2`/`3`) med respektive procenttal

### Spelflöde
- **`buildRound()`**: slumpar 5 frågor per nivå ur `QUESTION_BANK` (Fisher-Yates), blandar varje frågas alternativ, returnerar en array med 15 runtime-frågor i stigande svårighet — anropas av `startGame()`
- **Tillståndsvariabler:** `round` (de 15 frågorna), `qIndex` (0–14, aktuell fråga), `log` (besvarade frågor för facit), `lifelines` (`{fifty,audience,friend}`, en gång per omgång), `hiddenOptions` (dolda av 50:50 för aktuell fråga), `pendingSelection`, `isLocked`
- **`renderQuestion()`**: ritar fråga, alternativ, prisstege (`renderLadder()`) och "Stanna"-knappen (synlig/aktiv från `qIndex>=1`)
- **`selectOption(i)` → `changeAnswer()` / `lockAnswer()` → `revealAnswer()`**: implementerar lås-svaret-flödet i två steg exakt som beskrivet ovan; `lockAnswer()` väntar 1300 ms innan `revealAnswer()` anropas
- **`revealAnswer()`** loggar frågan till `log` och öppnar **`openExplainModal(wasCorrect, expl)`** efter ytterligare en kort paus — vid rätt svar fortsätter `qIndex++` till nästa fråga (eller `finishGame('won')` efter fråga 15), vid fel svar → `finishGame('lost')`
- **`stopGame()`**: endast tillgänglig när `qIndex>=1` och inget svar är låst just nu → `finishGame('stopped')` med beloppet `LADDER[qIndex-1]`
- **Livlinjer:** `useFifty()`, `useAudience()`, `useFriend()` — var och en kontrollerar `lifelines.<namn>` innan den kan användas, inaktiverar sin egen knapp permanent för omgången. `useAudience()` bygger `shares` med `AUDIENCE_BASE[q.level]` till rätt svar och slumpad fördelning av resten. `useFriend()` slår slumpmässigt upp fel enligt `FRIEND_ERROR[q.level]` och väljer fras ur `CONFIDENT_PHRASES`/`HESITANT_PHRASES`
- **`finishGame(reason)`**: `reason` är `'won'`, `'stopped'` eller `'lost'`; beräknar slutbelopp (för `'lost'`: `LADDER[9]` om `qIndex>=10`, `LADDER[4]` om `qIndex>=5`, annars `0`), renderar hela `log` som facit och visar resultatskärmen. "Spela igen" anropar `startGame()` igen (ny `buildRound()`, alla livlinjer återställs)

### Design (lås mot referensfilen)
- CSS-variabler: `--navy-900`, `--navy-800`, `--navy-700`, `--navy-600`, `--gold`, `--gold-soft` för spelbrädet; ämnets primärfärg sätts inline/via klass enbart på `.badge` (eyebrow) och `.rung.secure` (säkra nivåer i stegen)
- Typsnitt: **Fredoka** på rubriker, belopp, prisstegens siffror och livlinje-/knapptext; **EB Garamond** på frågetext, alternativ och förklaringar
- `.game-wrap`: `grid-template-columns:1fr 300px` (fråga/alternativ + prisstege). Under 860 px: `grid-template-columns:1fr` och prisstegen (`.ladder-panel`) blir en horisontell, scrollbar rad ovanför frågan. Under 560 px: `.opts` går från två kolumner till en
- `.rung.current` markeras i guld, `.rung.secure` i ämnets accentfärg (teal i referensfilen) med skölden `🛡`, `.rung.passed` tonas upp i vanlig textfärg
- `prefers-reduced-motion:reduce` stänger av alla transitions/animationer, samma mönster som i Jeopardy-referensen

---

## Flappy-spel ("Flaxa & forska")

### Syfte och grundform
Ett Flappy Bird-spel där **quizfrågor styr progressionen**: eleven flyger mellan provrör, och varje passerat rör öppnar en fråga ur områdets frågebank. Spelet är en solo-repetition för eleven själv — ingen spelledare, ingen lagindelning, ingen inloggning.

Fil: `[kurs]_[omrade]_flappy.html` (t.ex. `nk1a1_naturvetenskap_flappy.html`). Referens: `nk1a1_naturvetenskap_flappy.html`.

**Crediten `Spelidé: Edvin Maloku` står alltid på startskärmen, i liten dämpad text direkt under Starta-knappen. Den följer med när spelet återanvänds för andra kurser och områden — ta aldrig bort den.**

### Delad frågedata — `[kurs]_[omrade]_questions.js`
Flappy-spelet och områdets quiz delar **samma** frågebank. Frågorna ligger aldrig inline i någon av HTML-filerna.

- Filnamn: `[kurs]_[omrade]_questions.js` (t.ex. `nk1a1_naturvetenskap_questions.js`)
- Innehåller exakt två globala arrayer: **`QUESTIONS`** (30 frågor, `{ q, opts:[4], correct, expl }`) och **`EASY_Q`** (30 objekt, `{ q, a, i:[3], expl }`)
- `EASY_Q[i]` motsvarar alltid `QUESTIONS[i]` — **samma ordning, samma längd**. `EASY_Q[i].i[]` listar de felaktiga alternativen i `opts`-ordning med det rätta borttaget
- Laddas med `<script src="[kurs]_[omrade]_questions.js"></script>` **före** sidans egen `<script>` i både quiz- och flappy-filen
- Bryter man ut data ur ett befintligt quiz: kontrollera efteråt att quizet fungerar exakt som innan — shuffle, `origIdx`-mappning, facit och Enkel svenska

### Frågeflöde
- Frågor dras **utan upprepning** tills poolen är slut, sedan blandas hela poolen om (`pool` med index, Fisher-Yates)
- Svarsalternativen blandas per fråga: `order` mappar visad plats → index i `opts`. **Rättningen utgår alltid från `QUESTIONS[i].correct`** — aldrig från visad text
- Efter varje passerat rör (`CFG.askEvery = 1`) pausas spelet och en fråga visas. Eleven fortsätter med **"Flyg vidare"** och därefter ett tryck — aldrig direkt tillbaka i fritt fall
- **Krasch ger en fråga:** rätt svar återupplivar (rör nära fågeln rensas, `CFG.invincibleTime` osårbarhet, vänta på tryck), fel svar är game over. Max `CFG.maxLives = 3` andra chanser, visade som ♥ i HUD:en. En lyckad återupplivning förbrukar ett hjärta
- `expl` visas efter **varje** svar, rätt som fel
- Tangent **1–4** väljer svar, **Enter/mellanslag** fortsätter. Både svarsknappar och fortsätt-knappen är låsta `CFG.answerLockMs = 400` ms efter att de visats, så att elever som hamrar på mellanslag inte råkar svara eller hoppa över förklaringen

### Poäng och streak
- **+1 poäng** per passerat rör (`CFG.pointsPerPipe`)
- **Rätt svar:** `CFG.pointsPerCorrect` (10) × multiplikatorn
- **Streak** = antal rätt svar i rad, räknas **över både rör- och dödsfrågor**. Fel svar nollställer streaken
- **Multiplikator** styrs av `CFG.tiers` (högsta tröskeln först, så nivåerna är lätta att justera): 3 i rad ×2, 5 i rad ×3, 7 i rad ×4, 10 i rad ×5. Multiplikatorn beräknas på streaken **inklusive** det aktuella svaret
- **HUD:** poäng + sessionens rekord, streak-pill ("🔥 5 i rad") + multiplikator-pill, hjärtan. Toast när en ny multiplikatornivå nås. Glödande ring runt fågeln vid streak ≥ `CFG.glowStreak` (3)
- **Poängrad under förklaringen efter varje svar:** `+30 poäng (10 × 3, 5 i rad)` vid rätt, `Streaken bröts efter 6 i rad` vid fel
- **Sessionsrekord** i sessionStorage, nyckel `[prefix]_flappy_best`
- **Slutskärm:** poäng, passerade rör, rätt/totalt, längsta streak, "Nytt rekord" vid sessionsrekord, samt listan **"Frågor att repetera"** med varje missad fråga och dess rätta svar

### CFG — alla spelkonstanter överst i filen
Spelet får inte ha magiska tal utspridda i koden. Allt samlas i ett `CFG`-objekt högst upp:

| Grupp | Nycklar |
|-------|---------|
| Skala | `designHeight` (640), `minScale`, `maxScale` |
| Fysik | `gravity` (1900), `flapVelocity` (−520), `maxFallSpeed` (900), `maxStep` (0.05) |
| Rör | `pipeSpeed` (170), `pipeGap` (200), `pipeSpacing` (268), `pipeWidth` (72), `pipeMargin` (58), `firstPipeDelay` |
| Fågel | `birdRadius` (16), `birdXFrac` (0.28), `glowStreak` (3) |
| Mark | `groundHeight` (84) |
| Frågor | `askEvery` (1), `answerLockMs` (400) |
| Liv | `maxLives` (3), `invincibleTime` (1.5), `reviveClearAhead` (300) |
| Poäng | `pointsPerPipe` (1), `pointsPerCorrect` (10), `tiers` |
| Lagring | `storeBest`, `storeEasy` |

Fysik och mått anges i **designenheter** för en spelyta som är `CFG.designHeight` hög och skalas med `S = clamp(H / designHeight, minScale, maxScale)`. Då blir svårighetsgraden densamma på mobil som på projektor. Rörens öppning sparas som `gapFrac` (0–1), aldrig som absolut y — det gör spelet resize- och rotationssäkert.

### Teknik och grafik
- Fristående HTML-fil, **canvas + vanilla JS**, ingen extern lib. **Deltatidsbaserad** loop (`requestAnimationFrame`, delta klampat till `CFG.maxStep` så att ett flikbyte inte hoppar fram spelet)
- Tryck/klick/mellanslag/↑ = flaxa. `pointerdown` på canvasen + `touchstart` med `preventDefault`
- **Grafik:** provrör som hinder (glaskropp med vätska, bubblor, graderingsstreck och dager), rutat labbpapper som bakgrund med parallaxade labbklotter, labbänk som mark. Fågeln bär skyddsglasögon
- Ämnets primärfärg enligt färgtabellen (NK 1a1: `#22c55e`), **Fredoka** i spel-UI (HUD, knappar, rubriker), **EB Garamond** i frågetext, alternativ och förklaringar
- **Mobil först:** `position:fixed` scen, `overflow:hidden` + `overscroll-behavior:none` på `html,body`, `touch-action:none` på canvasen, safe-area-insets på HUD, back-knapp och overlays — inga scrollhopp
- `prefers-reduced-motion` stänger av transitions, skakning och pulserande animationer. `prefers-color-scheme: dark` byter både CSS-variabler och canvas-paletten (`pal()`)
- Byter eleven flik mitt i flykten pausas spelet till READY i stället för att fågeln dör
- Sist i `<body>`: `<script src="feedback-widget.js" defer>` och GoatCounter-snippet — som i quizfilen

### Enkel svenska
Samma logik som quizet: `EASY_Q` + `mapOpt`, sessionStorage-nyckel `[prefix]_flappy_easy`. Toggeln finns på startskärmen, i varje frågepanel och på slutskärmen, och påverkar **frågor, svarsalternativ, förklaringar, regeltext och slutskärm — aldrig rättningen**.

### Tillbaka-navigering
Samma mönster som övriga filer (se [Tillbaka-navigering](#tillbaka-navigering)): `smartBack(event)` med `history.back()` vid samma origin, annars fallback till **områdessidan**.

### Kortordning på områdessidan
Flappy-kortet läggs efter Jeopardy. Kanonisk ordning blir därmed: **material → begrepp → quiz → jeopardy → flappy → miljonär**.

---

## När John ber dig skapa ett Flappy-spel

1. Han anger vilket arbetsområde det gäller
2. Du bryter ut `QUESTIONS` och `EASY_Q` ur områdets `_quiz.html` till `[kurs]_[omrade]_questions.js` (finns filen redan återanvänder du den) och laddar den i båda filerna — du hittar inte på nytt sakinnehåll
3. Du verifierar att quizet fungerar exakt som innan: shuffle, `origIdx`-mappning, facit och Enkel svenska
4. Du kopierar `nk1a1_naturvetenskap_flappy.html`, byter frågedatafil, ämnesfärg och back-länkens fallback — och behåller crediten `Spelidé: Edvin Maloku`
5. Du lägger till ett flappy-kort på områdessidan direkt efter Jeopardy-kortet

*John ska inte behöva ändra något manuellt.*
