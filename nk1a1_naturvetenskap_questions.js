// ════════════════════════════════════════════════════════════
// NK 1a1 · NATURVETENSKAPLIGT ARBETSSÄTT — DELAD FRÅGEDATA
// Används av: nk1a1_naturvetenskap_quiz.html
//             nk1a1_naturvetenskap_flappy.html
// Ändra frågorna här — båda sidorna uppdateras samtidigt.
// EASY_Q och QUESTIONS ligger i EXAKT samma ordning; index i
// den ena motsvarar alltid samma fråga i den andra.
// ════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════
// ENKEL SVENSKA — platshållare, samma ordning som QUESTIONS
// a = rätt svar, i[] = fel svar i opts-ordning (exkl. correct)
// ════════════════════════════════════════════════════════════
const EASY_Q = [
  // A1
  {
    q: 'Vad menas med den vetenskapliga revolutionen?',
    a: 'Det skifte då man slutade lita på auktoriteter och istället testade teorier med experiment och observationer.',
    i: [
      'Den period då Galileo Galilei uppfann teleskopet och för första gången möjliggjorde systematiska astronomiska observationer.',
      'Det vetenskapliga genombrott som skedde under antiken då de grekiska filosoferna lade grunden för naturvetenskapen.',
      'Den förändring under 1800-talet då industrialiseringen skapade nya laboratorier och förbättrade de vetenskapliga metoderna.'
    ],
    expl: 'Den vetenskapliga revolutionen startade på 1500-talet. Istället för att söka svar hos kyrkan eller i gamla texter började forskare som Copernicus och Galileo testa idéer med experiment.'
  },
  {
    q: 'Vad är en frågeställning i en vetenskaplig undersökning?',
    a: 'En specifik och avgränsad fråga som talar om vad undersökningen ska ta reda på.',
    i: [
      'En hypotes formulerad som ett påstående om vad man förväntar sig hitta i experimentet.',
      'En sammanfattning av de resultat man nått fram till efter att experimentet är genomfört.',
      'En teori om hur världen fungerar som ska bevisas stämma med hjälp av insamlad data.'
    ],
    expl: 'En frågeställning är en specifik och avgränsad fråga – t.ex. "Vad beror det här på?" Den skiljer sig från hypotesen, som är ett möjligt svar formulerat som ett påstående.'
  },
  {
    q: 'Vad är en hypotes?',
    a: 'Ett testbart påstående som ger ett möjligt svar på frågeställningen – vi vet inte om det är sant.',
    i: [
      'En bekräftad slutsats som dragits efter att ett experiment upprepats ett tillräckligt stort antal gånger.',
      'En fråga om vad som ska undersökas, formulerad på ett specifikt och väl avgränsat sätt.',
      'En observation som gjorts under ett experiment och som behöver en förklaring av forskaren.'
    ],
    expl: 'En hypotes är ett påstående – ett möjligt svar på frågeställningen. Den ska vara testbar och falsifierbar. När man formulerar den vet man ännu inte om den är sann.'
  },
  {
    q: 'Vilka tre krav måste en vetenskaplig undersökning uppfylla?',
    a: 'Hypotesen ska vara testbar och falsifierbar, och experimentet ska kunna upprepas av andra.',
    i: [
      'Hypotesen ska baseras på befintlig teori, godkännas av en etikkommitté och ge signifikanta resultat.',
      'Hypotesen ska bevisas sann, formuleras av minst två oberoende forskare och publiceras i en tidskrift.',
      'Experimentet ska vara enkelt, billigt att genomföra och förståeligt för en bred allmänhet.'
    ],
    expl: 'En vetenskaplig undersökning kräver att hypotesen är testbar (kan undersökas), falsifierbar (kan motbevisas) och att experimentet är repeterbart (kan upprepas och kontrolleras av andra).'
  },
  {
    q: 'Vad menas med att en hypotes är falsifierbar?',
    a: 'Att det måste vara möjligt att motbevisa hypotesen – t.ex. om experimentets resultat strider mot den.',
    i: [
      'Att hypotesen är formulerad på ett sådant sätt att den aldrig kan motbevisas av experiment.',
      'Att hypotesen automatiskt förklaras som falsk om den inte kan testas i ett laboratorium.',
      'Att hypotesen måste testas av minst tre oberoende forskargrupper för att godkännas som vetenskaplig.'
    ],
    expl: 'Falsifierbarhet innebär att det måste vara möjligt att visa att hypotesen är fel. Om inga tänkbara resultat ens i teorin kunde motbevisa den är hypotesen inte vetenskaplig.'
  },
  {
    q: 'Vilka är stegen i den hypotetisk-deduktiva metoden i rätt ordning?',
    a: 'Frågeställning → Hypotes → Förutsägelse → Undersökning → Slutsats',
    i: [
      'Hypotes → Frågeställning → Undersökning → Förutsägelse → Slutsats',
      'Observation → Slutsats → Frågeställning → Hypotes → Experiment',
      'Frågeställning → Undersökning → Hypotes → Förutsägelse → Slutsats'
    ],
    expl: 'Den hypotetisk-deduktiva metoden: 1) Frågeställning, 2) Hypotes, 3) Förutsägelse (vad förväntar vi oss?), 4) Undersökning (experiment), 5) Slutsats (stöds eller falsifieras hypotesen?).'
  },
  {
    q: 'Vad är en vetenskaplig teori?',
    a: 'En väl underbyggd förklaringsmodell baserad på data från många noggranna och systematiska experiment.',
    i: [
      'En kvalificerad gissning om hur något fungerar som ännu inte testats i ett experiment.',
      'En slutsats som dragits utifrån ett enskilt experiment med entydiga och reproducerbara resultat.',
      'En filosofisk tanke om naturens lagar som presenteras av en erkänd auktoritet inom området.'
    ],
    expl: 'En vetenskaplig teori är långt mer än en gissning – det är en väl underbyggd förklaringsmodell som stöds av data från många experiment. Teorier är öppna för revidering om nya bevis dyker upp.'
  },
  {
    q: 'Vad innebär ett paradigmskifte?',
    a: 'Att en gammal teori byts ut mot en ny när bevisen visar att den gamla inte stämmer.',
    i: [
      'Att ett experiment misslyckas och att nya variabler måste läggas till, justeras och testas i undersökningen.',
      'Att en forskargrupp byter inriktning och börjar forska inom ett helt nytt vetenskapligt ämnesområde.',
      'Att ny teknik och förbättrad mätutrustning gör att gamla experiment kan genomföras snabbare och mer precist.'
    ],
    expl: 'Ett paradigmskifte är när en teori ersätts av en annan. Exempel: den geocentriska världsbilden ersattes av den heliocentriska. Att teorier byts ut är ett tecken på att vetenskapen fungerar.'
  },
  {
    q: 'Vad räknas som forskningsfusk?',
    a: 'Att plagiera, förfalska data eller medvetet undanhålla och dölja resultat i sin forskning.',
    i: [
      'Att använda en otillräckligt testad metod och sedan publicera resultaten utan peer review.',
      'Att utföra experiment på ryggradsdjur utan att ha fått en godkänd etikprövning i förväg.',
      'Att byta hypotes mitt i ett pågående experiment utan att börja om hela undersökningen.'
    ],
    expl: 'Forskningsfusk innebär att plagiera, förfalska data eller dölja resultat. Det skadar forskning och förtroende. Kända fall har lett till allvarliga konsekvenser – t.ex. ett fall på Karolinska där patienter dog.'
  },
  {
    q: 'Varför kan naturvetenskapen inte svara på frågan "Är klimatförändringar dåliga?"',
    a: 'Det är en värderingsfråga – naturvetenskapen mäter klimatförändringarna men kan inte avgöra om de är bra eller dåliga.',
    i: [
      'Klimatförändringar är ett för komplext fenomen för att undersökas och mätas med de metoder naturvetenskapen har.',
      'Frågans svar beror på politiska beslut och personliga värderingar och faller utanför naturvetenskapens räckvidd.',
      'Naturvetenskapen saknar tillräckliga data och tillräcklig forskning för att kunna ge ett tillförlitligt svar på frågan.'
    ],
    expl: 'Naturvetenskapen är begränsad till det som kan testas. Frågor om vad som är "bra" eller "dåligt" är värderingsfrågor. Naturvetenskapen kan beskriva klimatförändringarna men inte avgöra om de är rätt eller fel.'
  },
  // A2
  {
    q: 'Vad menas med den oberoende variabeln i ett experiment?',
    a: 'Den variabel som den som utför experimentet medvetet ändrar för att undersöka dess effekt på något annat.',
    i: [
      'Den variabel som mäts och registreras för att se om den påverkats av förändringen i experimentet.',
      'Den variabel som hålls konstant i alla försöksgrupper för att eliminera störningar från omgivningen.',
      'Den variabel som är omöjlig att kontrollera och som riskerar att påverka experimentets resultat.'
    ],
    expl: 'Den oberoende variabeln är det som forskaren aktivt ändrar – t.ex. belysningsstyrkan i ett lökexperiment. Den antas orsaka en förändring i den beroende variabeln.'
  },
  {
    q: 'Vad är en beroende variabel?',
    a: 'Det som mäts i experimentet och som antas påverkas av förändringen i den oberoende variabeln.',
    i: [
      'En variabel som inte kan ändras och som alltid hålls konstant under hela experimentet.',
      'En variabel som påverkar experimentet utan att den som forskar är medveten om det.',
      'Det som aktivt förändras av forskaren för att undersöka dess effekt på ett annat fenomen.'
    ],
    expl: 'Den beroende variabeln är det man mäter – t.ex. tillväxten hos lökplantor. Den "beror" på den oberoende variabeln (t.ex. belysningsstyrkan).'
  },
  {
    q: 'Vad är en kontrollgrupp?',
    a: 'En grupp som inte utsätts för den behandling som testas – den används för jämförelse med försöksgruppen.',
    i: [
      'En grupp som kontrollerar att experimentet genomförs korrekt och att inga procedurmisstag görs.',
      'Den grupp som utsätts för den starkaste dosen av det ämne eller den faktor som testas.',
      'En grupp bestående av externa experter som bedömer om experimentets resultat är trovärdiga.'
    ],
    expl: 'Kontrollgruppen utsätts inte för behandlingen men väljs ut och hanteras på exakt samma sätt som övriga grupper. Den minimerar störvariabler och ger en jämförelsepunkt.'
  },
  {
    q: 'Vad är placeboeffekten?',
    a: 'Att en person mår bättre av förväntan – trots att de inte fått verksam medicin.',
    i: [
      'Att ett läkemedel fungerar sämre än väntat eftersom det inte testats tillräckligt noggrant av forskargruppen.',
      'Att försöksdeltagare medvetet rapporterar felaktiga svar för att styra experimentets utfall i en viss riktning.',
      'Att effekten av ett läkemedel avtar med tiden trots att personen fortsätter ta medicinen dagligen.'
    ],
    expl: 'Placeboeffekten innebär att förväntan i sig kan ge en mätbar effekt. En person som tror de fått medicin kan känna sig bättre – även om de bara fått ett sockerpiller. Blindstudier används för att utesluta detta.'
  },
  {
    q: 'Varför genomförs blindstudier i medicinsk forskning?',
    a: 'För att utesluta placeboeffekten – deltagarna vet inte om de får verksam substans eller placebo.',
    i: [
      'För att skydda forskarnas identitet och förhindra att känsliga resultat läcker till allmänheten.',
      'För att experimentet ska kunna genomföras utan att en full etikprövning krävs i förväg.',
      'För att underlätta för deltagarna som slipper ta ställning till om de vill ha det aktiva preparatet.'
    ],
    expl: 'I en blindstudie vet inte deltagarna om de ingår i försöksgruppen eller kontrollgruppen. Det eliminerar placeboeffekten och ger mer tillförlitliga resultat.'
  },
  {
    q: 'Varför ger fler upprepningar av ett experiment säkrare slutsatser?',
    a: 'Fler mätningar minskar påverkan av slumpmässiga fel och individuella variationer i resultaten.',
    i: [
      'Varje ny upprepning genererar en ny hypotes som kan leda till bättre och mer relevanta slutsatser.',
      'Upprepningar krävs av etikkommittén innan resultaten godkänns för publicering i tidskrifter.',
      'Det ökar sannolikheten att minst ett av experimenten ger det förväntade resultatet.'
    ],
    expl: 'Individuella variationer och slumpmässiga mätfel påverkar alltid ett enskilt experiment. Ju fler repetitioner, desto mer jämnas dessa ut och desto pålitligare blir genomsnittsresultaten.'
  },
  {
    q: 'Vad menas med att samvariation inte är detsamma som orsakssamband?',
    a: 'Att två variabler kan variera ihop utan att den ena orsakar den andra – en tredje faktor kan ligga bakom.',
    i: [
      'Att starka samband alltid kräver fler oberoende experiment för att kunna bekräftas och räknas som verkliga orsakssamband.',
      'Att ett orsakssamband kan existera och vara verkligt utan att det syns som en mätbar samvariation i data.',
      'Att samvariation enbart är ett relevant begrepp inom medicin och inte inom övriga vetenskapliga fält.'
    ],
    expl: 'Klassiskt exempel: glasskonsumtion och solbränna samvarierar – men glass orsakar inte solbränna. Förklaringen är en tredje faktor: varmt och soligt väder påverkar båda. Att dra förhastade slutsatser om orsak och verkan är ett vanligt misstag.'
  },
  {
    q: 'Vilka delar ska ingå i en vetenskaplig rapport?',
    a: 'Titel, inledning, material och metod, resultat, diskussion och källförteckning.',
    i: [
      'Titel, sammanfattning, hypotes, experiment, analys och slutsatser.',
      'Bakgrund, teori, observationer, beräkningar, slutsats och bilagor.',
      'Rubrik, frågeställning, mätdata, diagram, tolkning och tacksägelse.'
    ],
    expl: 'En vetenskaplig rapport innehåller: titel, inledning (bakgrund + frågeställning), material och metod (repeterbar), resultat (tabeller/diagram), diskussion (tolkning + utvärdering) och källförteckning.'
  },
  {
    q: 'Varför ska material och metod i en rapport beskrivas noggrant?',
    a: 'Så att andra forskare kan upprepa och kontrollera experimentet – repeterbarhet är ett grundkrav i vetenskapen.',
    i: [
      'Så att läsaren enkelt kan bedöma om experimentet var tillräckligt stort för att ge statistiskt pålitliga slutsatser.',
      'Eftersom myndigheter och etikkommittéer kräver att metoden finns dokumenterad för efterhandskontroll.',
      'Så att den som utförde experimentet lättare kan gå tillbaka och korrigera eventuella procedurmisstag.'
    ],
    expl: 'Repeterbarhet är ett grundkrav i vetenskapen. Andra måste kunna göra om experimentet och kontrollera att resultaten stämmer. Utan en tydlig metodbeskrivning är det omöjligt.'
  },
  {
    q: 'Vad menas med en riskbedömning inför ett laboratoriearbete?',
    a: 'En planerad genomgång av potentiella faror med utrustning och kemikalier som görs innan det praktiska arbetet påbörjas.',
    i: [
      'En efteranalys av olyckor som inträffat i laboratoriet för att förhindra att de upprepas i framtiden.',
      'En granskning som etikkommittén genomför för att avgöra om experimentet uppfyller säkerhetskraven.',
      'En lista med laborationsregler som eleverna skriver under för att bekräfta att de deltar frivilligt.'
    ],
    expl: 'En riskbedömning görs i förväg – man går igenom vilka faror som kan finnas med kemikalier, utrustning och metoder. Syftet är att förebygga skador innan de sker.'
  },
  // A3
  {
    q: 'Vad innebär källkritik?',
    a: 'Att systematiskt granska och bedöma källors trovärdighet för att undvika vilseledande information.',
    i: [
      'Att uteslutande använda vetenskapliga artiklar som enda källtyp i all argumentation och analys.',
      'Att enbart godkänna källor som publicerats av myndigheter, lärosäten eller välkända institutioner.',
      'Att kontrollera stavning och grammatik i en källa för att bedöma om den är professionellt framtagen.'
    ],
    expl: 'Källkritik handlar om att systematiskt granska trovärdigheten hos information – är källan äkta, aktuell, oberoende, tendensiös och granskad? Syftet är att sortera bort opålitliga källor.'
  },
  {
    q: 'Vad menas med att en källa är tendensiös?',
    a: 'Att källan är vinklad på grund av bakomliggande ekonomiska, politiska eller ideologiska intressen.',
    i: [
      'Att källan saknar peer review och därmed inte kan anses vetenskapligt trovärdig.',
      'Att källan är för gammal och att informationen inte längre är relevant eller aktuell.',
      'Att källan är skriven anonymt och att det är omöjligt att verifiera upphovsmannens identitet.'
    ],
    expl: 'En tendensiös källa är vinklad – t.ex. kan en rapport om rökningens skadeverkningar som finansieras av tobaksindustrin underdriva riskerna, eftersom industrin tjänar på det.'
  },
  {
    q: 'Vad är peer review?',
    a: 'En granskningsprocess där en vetenskaplig rapport bedöms av minst två oberoende forskare innan publicering.',
    i: [
      'En statlig process där forskning utvärderas av myndigheter innan den får tillämpas i samhällspraktiken.',
      'En databas där forskare kan söka efter och jämföra varandras publicerade vetenskapliga artiklar.',
      'En metod för att räkna hur många gånger en vetenskaplig artikel citerats av andra forskare.'
    ],
    expl: 'Peer review innebär att en artikel granskas av minst två oberoende experter inom samma fält innan den publiceras. Det är en kvalitetskontroll som skiljer vetenskapliga artiklar från t.ex. bloggar.'
  },
  {
    q: 'Vad är skillnaden mellan en primärkälla och en sekundärkälla?',
    a: 'En primärkälla baseras på egna observationer och insamlade data – en sekundärkälla hämtar information från andra källor.',
    i: [
      'En primärkälla är alltid publicerad i tryckt bokform medan en sekundärkälla enbart finns på internet.',
      'En primärkälla är alltid skriven av en expert inom området medan en sekundärkälla är skriven av en journalist.',
      'En primärkälla är nyare och mer aktuell än en sekundärkälla som ofta bygger på föråldrad information.'
    ],
    expl: 'Primärkällor (t.ex. vetenskapliga artiklar) baseras på ursprunglig forskning. Sekundärkällor hämtar och tolkar information från primärkällor – de är beroende av att originalinformationen är korrekt.'
  },
  {
    q: 'Vad är desinformation?',
    a: 'Felaktig information som sprids medvetet i syfte att lura eller vilseleda mottagaren.',
    i: [
      'Information som är vetenskapligt osäker och som saknar tillräcklig forskning och evidens bakom sig.',
      'Nyheter som av misstag blivit felaktiga på grund av journalistens okunskap eller tidsbrist.',
      'Reklam som överdriver en produkts fördelar utan att tydligt lyfta fram dess eventuella nackdelar.'
    ],
    expl: 'Desinformation är medvetet vilseledande – skillnaden mot vanliga felaktigheter är avsikten. Syftet kan vara att gynna ekonomiska intressen, påverka politiken eller skapa misstro mot myndigheter och experter.'
  },
  {
    q: 'Varför kan falska nyheter spridas snabbt på sociala medier?',
    a: 'Algoritmer prioriterar innehåll som väcker starka reaktioner – sensationellt och falskt innehåll sprids snabbt.',
    i: [
      'Sociala medieplattformar har inga redaktörer och ingen kontroll av innehållet som publiceras.',
      'Falska nyheter är alltid kortare och enklare att läsa och dela än korrekta, faktabaserade nyheter.',
      'Användare på sociala medier är generellt sämre på källkritik än läsare av tryckta tidningar.'
    ],
    expl: 'Algoritmerna i sociala medier belönar engagemang – inlägg med många reaktioner och delningar sprids till fler. Sensationellt och falskt innehåll genererar ofta mer engagemang än nyanserad information.'
  },
  {
    q: 'Vad menas med faktaresistens?',
    a: 'Att en person håller fast vid sin övertygelse trots att det finns välgrundade fakta som talar emot den.',
    i: [
      'Att en person konsekvent vägrar ta del av information från källor som inte godkänts av vetenskapssamhället.',
      'Att forskning om ett visst ämne är så tekniskt komplicerad att den inte är tillgänglig för gemene man.',
      'Att myndigheter och institutioner undanhåller fakta från allmänheten av politiska eller ekonomiska skäl.'
    ],
    expl: 'Faktaresistens innebär att man inte ändrar uppfattning trots motstående bevis. Det strider mot ett vetenskapligt förhållningssätt och kan förstärka felaktiga uppfattningar – t.ex. om vaccinationer eller klimatförändringar.'
  },
  {
    q: 'Vad är en filterbubbla?',
    a: 'Ett fenomen där algoritmer anpassar ditt innehållsflöde efter din profil – du möter nästan bara bekräftande information.',
    i: [
      'En inbyggd säkerhetsfunktion i sociala medier som automatiskt identifierar och blockerar falska nyheter och desinformation.',
      'En avancerad sökmotor som automatiskt filtrerar bort opålitliga källor och enbart visar vetenskapligt granskade artiklar.',
      'En sluten grupp på sociala medier där liksinnade aktivt delar vidare och förstärker varandras gemensamma åsikter.'
    ],
    expl: 'Filterbubblor uppstår av algoritmerna – de lär sig vad du gillar och visar mer av det. Till skillnad från ekokammare uppstår filterbubblor passivt utan att man märker det.'
  },
  {
    q: 'Vad menas med bekräftelsebias?',
    a: 'Att vi omedvetet söker och tillmäter information högre trovärdighet om den stämmer med vad vi redan tänker.',
    i: [
      'Att vi alltid bekräftar att en källa är trovärdig innan vi delar vidare information på sociala medier.',
      'Att vi systematiskt litar mer på vetenskapliga källor än på folkliga uppfattningar och traditioner.',
      'Att vi lättare tar till oss information som presenteras i punktlistor och diagram än i löpande brödtext.'
    ],
    expl: 'Bekräftelsebias är en psykologisk mekanism: vi söker aktivt efter information som bekräftar vad vi redan tror och avfärdar omedvetet sådant som strider mot det. Det gör det svårt att ändra ståndpunkt.'
  },
  {
    q: 'Vad är pseudovetenskap?',
    a: 'Läror som påstår sig vara vetenskapliga men saknar vetenskapligt stöd och ofta inte kan falsifieras med experiment.',
    i: [
      'Vetenskapliga teorier som ännu inte fått tillräcklig forskning bakom sig för att accepteras av forskarsamhället.',
      'Forskning som bedrivs utanför akademiska institutioner men som ändå kan ge tillförlitliga och reproducerbara resultat.',
      'Teorier som avvisats av majoriteten av forskare men som fortfarande kan bevisas med rätt experimentell uppställning.'
    ],
    expl: 'Pseudovetenskap ser ut som vetenskap men uppfyller inte kraven – t.ex. astrologi, vars förutsägelser är för vaga för att falsifieras. Problemet är att folk kan lita på pseudovetenskapliga "behandlingar" istället för beprövad vård.'
  }
];

// ════════════════════════════════════════════════════════════
// QUESTION DATA — 30 frågor (A1×10, A2×10, A3×10)
// ════════════════════════════════════════════════════════════
const QUESTIONS = [

  // ── A1: ETT NATURVETENSKAPLIGT ARBETSSÄTT ────────────────
  {
    q: 'Vad menas med den vetenskapliga revolutionen?',
    opts: [
      'Det skifte på 1500-talet då man slutade förlita sig på auktoriteter och istället började testa teorier med experiment och observationer',
      'Den period då Galileo Galilei uppfann teleskopet och möjliggjorde systematiska astronomiska observationer',
      'Det vetenskapliga genombrott som skedde under antiken då grekiska filosofer grundade naturvetenskapen',
      'Den omvandling under 1800-talet då industrialiseringen ledde till nya vetenskapliga metoder och laboratorier'
    ],
    correct: 0,
    expl: 'Den vetenskapliga revolutionen inleddes i slutet av 1500-talet. Istället för att söka svar i kyrkans lära eller antika skrifter började man använda systematiska undersökningar och experiment – t.ex. Copernicus och Galileo Galilei.'
  },
  {
    q: 'Vad är en frågeställning i en vetenskaplig undersökning?',
    opts: [
      'En specifik och avgränsad fråga som preciserar syftet med undersökningen',
      'En hypotes formulerad som ett påstående om vad man förväntar sig hitta',
      'En sammanfattning av de resultat som uppnåtts efter att experimentet genomförts',
      'En teori om hur världen fungerar som ska bevisas stämma med hjälp av data'
    ],
    correct: 0,
    expl: 'En frågeställning är en specifik och avgränsad fråga – t.ex. "Vad beror det här på?" Det skiljer sig från hypotesen, som är ett möjligt svar formulerat som ett påstående.'
  },
  {
    q: 'Vad är en hypotes?',
    opts: [
      'Ett testbart påstående som ger ett möjligt svar på frågeställningen – vi vet inte om det är sant eller falskt',
      'En bekräftad slutsats som dragits efter att ett experiment upprepats ett stort antal gånger',
      'En fråga om vad som ska undersökas, formulerad på ett specifikt och avgränsat sätt',
      'En observation som gjorts under ett experiment och som behöver förklaras av forskaren'
    ],
    correct: 0,
    expl: 'En hypotes är ett påstående – ett möjligt svar på frågeställningen. Den ska vara testbar och falsifierbar. När den formuleras vet vi ännu inte om den är sann.'
  },
  {
    q: 'Vilka tre krav måste en vetenskaplig undersökning uppfylla?',
    opts: [
      'Hypotesen ska vara testbar och falsifierbar, och experimentet ska vara repeterbart',
      'Hypotesen ska baseras på befintlig teori, godkännas av en etikkommitté och ge signifikanta resultat',
      'Hypotesen ska bevisas sann, formuleras av minst två oberoende forskare och publiceras i en tidskrift',
      'Experimentet ska vara enkelt, billigt att genomföra och förståeligt för en bred allmänhet'
    ],
    correct: 0,
    expl: 'En vetenskaplig undersökning kräver att hypotesen är testbar (kan undersökas experimentellt), falsifierbar (kan motbevisas) och att experimentet är repeterbart (kan upprepas och kontrolleras av andra).'
  },
  {
    q: 'Vad menas med att en hypotes är falsifierbar?',
    opts: [
      'Att det måste vara möjligt att motbevisa hypotesen – t.ex. om experimentets resultat strider mot den',
      'Att hypotesen är formulerad på ett sådant sätt att den aldrig kan motbevisas av experiment',
      'Att hypotesen automatiskt förklaras som falsk om den inte kan testas i ett laboratorium',
      'Att hypotesen måste testas av minst tre oberoende forskargrupper för att godkännas'
    ],
    correct: 0,
    expl: 'Falsifierbarhet innebär att det måste vara möjligt att visa att hypotesen är fel. Om inga tänkbara resultat kunde motbevisa den är den inte vetenskaplig.'
  },
  {
    q: 'Vilka är stegen i den hypotetisk-deduktiva metoden i rätt ordning?',
    opts: [
      'Frågeställning → Hypotes → Förutsägelse → Undersökning → Slutsats',
      'Hypotes → Frågeställning → Undersökning → Förutsägelse → Slutsats',
      'Observation → Slutsats → Frågeställning → Hypotes → Experiment',
      'Frågeställning → Undersökning → Hypotes → Förutsägelse → Slutsats'
    ],
    correct: 0,
    expl: 'Den hypotetisk-deduktiva metoden: 1) Frågeställning, 2) Hypotes, 3) Förutsägelse (vad förväntar vi oss?), 4) Undersökning (experiment), 5) Slutsats (stöds eller falsifieras hypotesen?).'
  },
  {
    q: 'Vad är en vetenskaplig teori?',
    opts: [
      'En väl underbyggd förklaringsmodell baserad på data från många noggranna och systematiska experiment',
      'En kvalificerad gissning om hur något fungerar som ännu inte testats i ett experiment',
      'En slutsats som dragits utifrån ett enskilt experiment med entydiga och reproducerbara resultat',
      'En filosofisk tanke om naturens lagar som presenteras av en erkänd auktoritet inom området'
    ],
    correct: 0,
    expl: 'En vetenskaplig teori är långt mer än en gissning – det är en väl underbyggd förklaringsmodell som stöds av data från många experiment. Teorier är öppna för revidering om nya bevis dyker upp.'
  },
  {
    q: 'Vad innebär ett paradigmskifte?',
    opts: [
      'Att en etablerad vetenskaplig teori ersätts av en ny när tillräckliga bevis visar att den gamla är felaktig',
      'Att ett experiment misslyckas och att nya variabler måste introduceras i undersökningen',
      'Att en forskargrupp byter inriktning och börjar forska inom ett helt nytt ämnesområde',
      'Att en ny teknisk metod gör att gamla experiment kan genomföras snabbare och mer precist'
    ],
    correct: 0,
    expl: 'Ett paradigmskifte är när en teori ersätts av en annan. Exempel: den geocentriska världsbilden (jorden i centrum) ersattes av den heliocentriska (planeterna kretsar runt solen). Att teorier byts ut är ett tecken på att vetenskapen fungerar.'
  },
  {
    q: 'Vad räknas som forskningsfusk?',
    opts: [
      'Att plagiera, förfalska eller undanhålla resultat från sin forskning',
      'Att använda en otillräckligt testad metod och publicera resultaten utan peer review',
      'Att utföra experiment på ryggradsdjur utan att genomföra en etikprövning i förväg',
      'Att byta hypotes mitt i ett experiment utan att börja om hela undersökningen från grunden'
    ],
    correct: 0,
    expl: 'Forskningsfusk innebär att plagiera, förfalska data eller undanhålla resultat. Det skadar både forskning och förtroende. Kända fall har lett till allvarliga konsekvenser – t.ex. ett fall på Karolinska där patienter dog.'
  },
  {
    q: 'Varför kan naturvetenskapen inte svara på frågan "Är klimatförändringar dåliga?"',
    opts: [
      'Det är en värderingsfråga – naturvetenskapen kan beskriva och mäta fenomenet men inte avgöra om det är rätt eller fel',
      'Klimatförändringar är ett för komplext fenomen för att kunna undersökas med vetenskapliga metoder',
      'Frågans svar är beroende av politiska beslut och faller därmed utanför naturvetenskapens område',
      'Naturvetenskapen saknar ännu tillräckliga data för att ge ett tillförlitligt svar på frågan'
    ],
    correct: 0,
    expl: 'Naturvetenskapen är begränsad till det som kan testas. Frågor om vad som är "bra" eller "dåligt" är värderingsfrågor – de faller utanför ämnets räckvidd. Naturvetenskapen kan beskriva klimatförändringarna men inte avgöra om de är moraliskt acceptabla.'
  },

  // ── A2: EGNA NATURVETENSKAPLIGA UNDERSÖKNINGAR ───────────
  {
    q: 'Vad menas med den oberoende variabeln i ett experiment?',
    opts: [
      'Den variabel som den som utför experimentet medvetet ändrar för att undersöka dess effekt på något annat',
      'Den variabel som mäts och registreras för att se om den påverkats av förändringen i experimentet',
      'Den variabel som hålls konstant i alla försöksgrupper för att eliminera störningar från omgivningen',
      'Den variabel som är omöjlig att kontrollera och som riskerar att påverka experimentets resultat'
    ],
    correct: 0,
    expl: 'Den oberoende variabeln är det som forskaren aktivt ändrar – t.ex. belysningsstyrkan i ett lökexperiment. Den antas orsaka en förändring i den beroende variabeln.'
  },
  {
    q: 'Vad är en beroende variabel?',
    opts: [
      'Det som mäts i experimentet och som antas påverkas av förändringen i den oberoende variabeln',
      'En variabel som inte kan ändras och som alltid hålls konstant under hela experimentet',
      'En variabel som påverkar experimentet utan att den som forskar är medveten om det',
      'Det som aktivt förändras av forskaren för att undersöka dess effekt på ett annat fenomen'
    ],
    correct: 0,
    expl: 'Den beroende variabeln är det man mäter – t.ex. tillväxten (biomassa) hos lökplantor. Den "beror" på den oberoende variabeln (belysningsstyrkan).'
  },
  {
    q: 'Vad är en kontrollgrupp?',
    opts: [
      'En grupp som inte utsätts för den behandling som testas – den används för jämförelse med försöksgruppen',
      'En grupp som kontrollerar att experimentet genomförs korrekt och att inga procedurmisstag görs',
      'Den grupp som utsätts för den starkaste dosen av det ämne eller den faktor som testas',
      'En grupp bestående av externa experter som bedömer om experimentets resultat är trovärdiga'
    ],
    correct: 0,
    expl: 'Kontrollgruppen utsätts inte för behandlingen men väljs ut och hanteras på exakt samma sätt som de övriga grupperna. Den minimerar störvariabler och ger en jämförelsepunkt.'
  },
  {
    q: 'Vad är placeboeffekten?',
    opts: [
      'Att en person mår bättre enbart för att de förväntar sig det – trots att de inte fått någon verksam medicin',
      'Att ett läkemedel fungerar sämre än förväntat eftersom det inte testats tillräckligt noggrant',
      'Att försöksdeltagare medvetet rapporterar felaktiga resultat för att påverka experimentets utfall',
      'Att effekten av ett läkemedel avtar över tid även om personen fortsätter att ta medicinen'
    ],
    correct: 0,
    expl: 'Placeboeffekten innebär att förväntan i sig kan ge en mätbar effekt. En person som tror de fått medicin kan känna sig bättre – även om de bara fått en sockerpiller. Blindstudier används för att utesluta detta.'
  },
  {
    q: 'Varför genomförs blindstudier i medicinsk forskning?',
    opts: [
      'För att utesluta placeboeffekten – deltagarna vet inte om de får verksam substans eller placebo',
      'För att skydda forskarnas identitet och förhindra att känsliga resultat läcker till allmänheten',
      'För att experimentet ska kunna genomföras utan att en full etikprövning krävs i förväg',
      'För att underlätta för deltagarna som slipper ta ställning till om de vill ha det aktiva preparatet'
    ],
    correct: 0,
    expl: 'I en blindstudie vet inte deltagarna om de ingår i försöksgruppen eller kontrollgruppen. Det eliminerar placeboeffekten och ger mer tillförlitliga resultat.'
  },
  {
    q: 'Varför ger fler upprepningar av ett experiment säkrare slutsatser?',
    opts: [
      'Fler mätningar minskar påverkan av slumpmässiga fel och individuella variationer i resultaten',
      'Varje ny upprepning genererar en ny hypotes som kan leda till bättre och mer relevanta slutsatser',
      'Upprepningar krävs av etikkommittén innan resultaten godkänns för publicering i tidskrifter',
      'Det ökar sannolikheten att minst ett av experimenten ger det förväntade resultatet'
    ],
    correct: 0,
    expl: 'Individuella variationer och slumpmässiga mätfel påverkar alltid ett enskilt experiment. Ju fler repetitioner, desto mer jämnas dessa ut och desto pålitligare blir genomsnittsresultaten.'
  },
  {
    q: 'Vad menas med att samvariation inte är detsamma som orsakssamband?',
    opts: [
      'Att två variabler kan variera tillsammans utan att den ena orsakar den andra – en tredje faktor kan ligga bakom',
      'Att starka samband alltid kräver fler oberoende experiment för att bekräftas som verkliga orsakssamband',
      'Att ett orsakssamband kan existera utan att det yttrar sig som en mätbar samvariation i data',
      'Att samvariation enbart är relevant inom medicin medan orsakssamband gäller alla vetenskapliga fält'
    ],
    correct: 0,
    expl: 'Klassiskt exempel: glasskonsumtion och solbränna samvarierar – men glass orsakar inte solbränna. Förklaringen är en tredje faktor: varmt och soligt väder påverkar båda. Att dra förhastade slutsatser om orsak och verkan är ett vanligt misstag.'
  },
  {
    q: 'Vilka delar ska ingå i en vetenskaplig rapport?',
    opts: [
      'Titel, inledning, material och metod, resultat, diskussion och källförteckning',
      'Titel, sammanfattning, hypotes, experiment, analys och slutsatser',
      'Bakgrund, teori, observationer, beräkningar, slutsats och bilagor',
      'Rubrik, frågeställning, mätdata, diagram, tolkning och tacksägelse'
    ],
    correct: 0,
    expl: 'En vetenskaplig rapport innehåller: titel, inledning (bakgrund + frågeställning), material och metod (så noggrann att experimentet kan upprepas), resultat (tabeller/diagram), diskussion (tolkning + utvärdering) och källförteckning.'
  },
  {
    q: 'Varför ska material och metod i en rapport beskrivas noggrant?',
    opts: [
      'Så att andra forskare kan upprepa och kontrollera experimentet – repeterbarhet är ett grundkrav i vetenskapen',
      'Så att läsaren enkelt kan bedöma om experimentet var tillräckligt stort för att ge statistiskt pålitliga slutsatser',
      'Eftersom myndigheter och etikkommittéer kräver att metoden finns dokumenterad för efterhandskontroll',
      'Så att den som utförde experimentet lättare kan gå tillbaka och korrigera eventuella procedurmisstag'
    ],
    correct: 0,
    expl: 'Repeterbarhet är ett grundkrav i vetenskapen. Andra måste kunna göra om experimentet och kontrollera att resultaten stämmer. Utan en tydlig metodbeskrivning är det omöjligt.'
  },
  {
    q: 'Vad menas med en riskbedömning inför ett laboratoriearbete?',
    opts: [
      'En planerad genomgång av potentiella faror med utrustning och kemikalier som görs innan det praktiska arbetet påbörjas',
      'En efteranalys av olyckor som inträffat i laboratoriet för att förhindra att de upprepas i framtiden',
      'En granskning som etikkommittén genomför för att avgöra om experimentet uppfyller säkerhetskraven',
      'En lista med laborationsregler som eleverna skriver under för att bekräfta att de deltar frivilligt'
    ],
    correct: 0,
    expl: 'En riskbedömning görs i förväg – man går igenom vilka faror som kan finnas med kemikalier, utrustning och metoder. Syftet är att förebygga skador innan de sker.'
  },

  // ── A3: ATT INTE BLI LURAD ────────────────────────────────
  {
    q: 'Vad innebär källkritik?',
    opts: [
      'Att systematiskt granska och bedöma källors trovärdighet för att undvika vilseledande information',
      'Att uteslutande använda vetenskapliga artiklar som enda källtyp i all argumentation och analys',
      'Att enbart godkänna källor som publicerats av myndigheter, lärosäten eller välkända institutioner',
      'Att kontrollera stavning och grammatik i en källa för att bedöma om den är professionellt framtagen'
    ],
    correct: 0,
    expl: 'Källkritik handlar om att systematiskt granska trovärdigheten hos information – är källan äkta, aktuell, oberoende, tendensiös och granskad? Syftet är att sortera bort opålitliga källor.'
  },
  {
    q: 'Vad menas med att en källa är tendensiös?',
    opts: [
      'Att källan är vinklad på grund av bakomliggande ekonomiska, politiska eller ideologiska intressen',
      'Att källan saknar peer review och därmed inte kan anses vetenskapligt trovärdig',
      'Att källan är för gammal och att informationen inte längre är relevant eller aktuell',
      'Att källan är skriven anonymt och att det är omöjligt att verifiera upphovsmannens identitet'
    ],
    correct: 0,
    expl: 'En tendensiös källa är vinklad – t.ex. kan en rapport om rökningens skadeverkningar som finansieras av tobaksindustrin underdriva riskerna, eftersom industrin tjänar på det.'
  },
  {
    q: 'Vad är peer review?',
    opts: [
      'En granskningsprocess där en vetenskaplig rapport bedöms av minst två oberoende forskare innan publicering',
      'En statlig process där forskning utvärderas av myndigheter innan den får tillämpas i samhällspraktiken',
      'En databas där forskare kan söka efter och jämföra varandras publicerade vetenskapliga artiklar',
      'En metod för att räkna hur många gånger en vetenskaplig artikel citerats av andra forskare'
    ],
    correct: 0,
    expl: 'Peer review innebär att en artikel granskas av minst två oberoende experter inom samma fält innan den publiceras. Det är en kvalitetskontroll som skiljer vetenskapliga artiklar från t.ex. bloggar.'
  },
  {
    q: 'Vad är skillnaden mellan en primärkälla och en sekundärkälla?',
    opts: [
      'En primärkälla baseras på egna observationer och insamlade data – en sekundärkälla hämtar information från andra källor',
      'En primärkälla är alltid publicerad i tryckt bokform medan en sekundärkälla enbart finns på internet',
      'En primärkälla är alltid skriven av en expert inom området medan en sekundärkälla är skriven av en journalist',
      'En primärkälla är nyare och mer aktuell än en sekundärkälla som ofta bygger på föråldrad information'
    ],
    correct: 0,
    expl: 'Primärkällor (t.ex. vetenskapliga artiklar) baseras på ursprunglig forskning. Sekundärkällor hämtar och tolkar information från primärkällor – de är beroende av att originalinformationen är korrekt.'
  },
  {
    q: 'Vad är desinformation?',
    opts: [
      'Felaktig information som sprids medvetet i syfte att lura eller vilseleda mottagaren',
      'Information som är vetenskapligt osäker och som saknar tillräcklig forskning och evidens bakom sig',
      'Nyheter som av misstag blivit felaktiga på grund av journalistens okunskap eller tidsbrist',
      'Reklam som överdriver en produkts fördelar utan att tydligt lyfta fram dess eventuella nackdelar'
    ],
    correct: 0,
    expl: 'Desinformation är medvetet vilseledande – skillnaden mot vanliga felaktigheter är avsikten. Syftet kan vara att gynna ekonomiska intressen, påverka politiken eller skapa misstro mot myndigheter och experter.'
  },
  {
    q: 'Varför kan falska nyheter spridas snabbt på sociala medier?',
    opts: [
      'Algoritmer prioriterar innehåll som väcker starka reaktioner – sensationellt och falskt innehåll delar sig snabbt',
      'Sociala medieplattformar har inga redaktörer och ingen kontroll av innehållet som publiceras',
      'Falska nyheter är alltid kortare och enklare att läsa och dela än korrekta, faktabaserade nyheter',
      'Användare på sociala medier är generellt sämre på källkritik än läsare av tryckta tidningar'
    ],
    correct: 0,
    expl: 'Algoritmerna i sociala medier belönar engagemang – inlägg med många reaktioner, delningar och kommentarer sprids till fler. Sensationellt, provocerande och falskt innehåll genererar ofta mer engagemang än nyanserad information.'
  },
  {
    q: 'Vad menas med faktaresistens?',
    opts: [
      'Att en person håller fast vid sin övertygelse trots att det finns välgrundade fakta som talar emot den',
      'Att en person konsekvent vägrar ta del av information från källor som inte godkänts av vetenskapssamhället',
      'Att forskning om ett visst ämne är så tekniskt komplicerad att den inte är tillgänglig för gemene man',
      'Att myndigheter och institutioner undanhåller fakta från allmänheten av politiska eller ekonomiska skäl'
    ],
    correct: 0,
    expl: 'Faktaresistens innebär att man inte ändrar uppfattning trots motstående bevis. Det strider mot ett vetenskapligt förhållningssätt och kan förstärka felaktiga uppfattningar – t.ex. om vaccinationer eller klimatförändringar.'
  },
  {
    q: 'Vad är en filterbubbla?',
    opts: [
      'Ett fenomen där algoritmer anpassar innehållsflödet efter en persons profil – hen möter nästan bara information som bekräftar det hen redan tror',
      'En säkerhetsfunktion i sociala medier som automatiskt blockerar falska nyheter och desinformation',
      'En avancerad sökmotor som filtrerar bort opålitliga källor och enbart visar vetenskapligt granskade artiklar',
      'En sluten grupp på sociala medier där medlemmar aktivt delar och förstärker varandras gemensamma åsikter'
    ],
    correct: 0,
    expl: 'Filterbubblor uppstår av algoritmerna – de lär sig vad du gillar och visar mer av det. Till skillnad från ekokammare (som skapas av användarna aktivt) uppstår filterbubblor passivt utan att man märker det.'
  },
  {
    q: 'Vad menas med bekräftelsebias?',
    opts: [
      'Att vi omedvetet söker och tillmäter information högre trovärdighet om den stämmer med vad vi redan tänker',
      'Att vi alltid bekräftar att en källa är trovärdig innan vi delar vidare information på sociala medier',
      'Att vi systematiskt litar mer på vetenskapliga källor än på folkliga uppfattningar och traditioner',
      'Att vi lättare tar till oss information som presenteras i punktlistor och diagram än i löpande brödtext'
    ],
    correct: 0,
    expl: 'Bekräftelsebias är en psykologisk mekanism: vi söker aktivt efter information som bekräftar vad vi redan tror och avfärdar omedvetet sådant som strider mot det. Det gör det svårt att ändra ståndpunkt.'
  },
  {
    q: 'Vad är pseudovetenskap?',
    opts: [
      'Läror som påstår sig vara vetenskapliga men saknar vetenskapligt stöd och ofta inte kan falsifieras med experiment',
      'Vetenskapliga teorier som ännu inte fått tillräcklig forskning bakom sig för att accepteras av forskarsamhället',
      'Forskning som bedrivs utanför akademiska institutioner men som ändå kan ge tillförlitliga och reproducerbara resultat',
      'Teorier som avvisats av majoriteten av forskare men som fortfarande kan bevisas med rätt experimentell uppställning'
    ],
    correct: 0,
    expl: 'Pseudovetenskap ser ut som vetenskap men uppfyller inte kraven – t.ex. astrologi, vars förutsägelser är för vaga för att falsifieras. Problemet är att folk kan lita på pseudovetenskapliga "behandlingar" istället för beprövad vård.'
  }
];
