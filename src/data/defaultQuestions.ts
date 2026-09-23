import { Question } from '../types';

export const DEFAULT_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. ONLINE CSALÁSOK (11 kérdés: 4 könnyű, 4 közepes, 3 nehéz)
  // =========================================================================
  {
    id: 'oc_1',
    topicId: 'online_csalasok',
    difficulty: 'konnyu',
    questionText: 'Egy ismeretlen weboldal azt írja: „Gratulálunk! Te nyertél egy vadiúj iPhone-t, csak kattints ide és add meg a címed!”. Mit teszel?',
    options: [
      'Azonnal rákattintok, nehogy lemaradjak róla!',
      'Megadom a bankkártya adatokat, mert biztos csak a szállítási díjat kérik.',
      'Gyanakvó leszek: senki sem osztogat ingyen telefont, bezárom az oldalt és szólok a szüleimnek.',
      'Elküldöm az összes barátomnak is, hogy ők is nyerjenek.'
    ],
    correctIndex: 2,
    explanation: 'A túl szépnek tűnő online nyeremények szinte mindig adathalász csalások. Soha ne kattints gyanús felugró ablakokra!'
  },
  {
    id: 'oc_2',
    topicId: 'online_csalasok',
    difficulty: 'konnyu',
    questionText: 'Játék közben egy ismeretlen játékos azt írja chaten, hogy ad neked ingyenes ritka skineket/kristályokat, ha megadod a jelszavad. Mit teszel?',
    options: [
      'Soha senkinek nem adom meg a jelszavam, azonnal letiltom és jelentem a játékost.',
      'Megadom, mert nagyon szeretném azt a skint.',
      'Csak a felét árulom el a jelszavamnak.',
      'Megadom a telefonszámom és a lakcímem helyette.'
    ],
    correctIndex: 0,
    explanation: 'A jelszavad olyan, mint a fogkeféd: senkivel sem osztod meg! A hivatalos adminok és játékfejlesztők sosem kérik el a jelszavadat.'
  },
  {
    id: 'oc_3',
    topicId: 'online_csalasok',
    difficulty: 'konnyu',
    questionText: 'A nagymamád kapott egy SMS-t: „Csomagja érkezett, kattintson a linkre a kézbesítéshez”. Nem rendelt semmit. Mi a helyes lépés?',
    options: [
      'Válaszolni az SMS-re a lakcímével.',
      'Hívni a díjköteles emelt díjas számot az SMS-ben.',
      'Rákattintani a linkre és letölteni amit kér.',
      'Figyelmeztetni a nagymamát: ez egy ismert csomagküldős csalás (adathalászat), törölje az SMS-t!'
    ],
    correctIndex: 3,
    explanation: 'A csomagküldő szolgálatok nevében küldött kéretlen linkek kártékony alkalmazást akarnak telepíteni a telefonra, amivel pénzt emelhetnek le.'
  },
  {
    id: 'oc_4',
    topicId: 'online_csalasok',
    difficulty: 'konnyu',
    questionText: 'Mit jelent az „adathalászat” (phishing) az interneten?',
    options: [
      'Amikor csalók hamis üzenetekkel vagy oldalakkal próbálják megszerezni a titkos adatainkat és jelszavainkat.',
      'Amikor halas képeket töltünk le a tengeri állatokról.',
      'Egy népszerű horgász szimulátor játék.',
      'A lassú internetkapcsolat hivatalos neve.'
    ],
    correctIndex: 0,
    explanation: 'Az adathalászat során a csalók hivatalos szervnek (bank, futárcég, közösségi oldal) adják ki magukat, hogy jelszavakat vagy banki adatokat csaljanak ki.'
  },
  {
    id: 'oc_5',
    topicId: 'online_csalasok',
    difficulty: 'kozepes',
    questionText: 'Használt cikkeket adsz el a neten (pl. Vinted, Jófogás, Marketplace). Egy érdeklődő küld egy linket, ahol állítólag „jóvá kell hagynod a pénz fogadását a bankkártya adataiddal”. Mi ez?',
    options: [
      'Csak a futárcég igazolása, nyugodtan kitöltheted.',
      'Tipikus eladói csalás! Pénz fogadásához SOHA nem kell megadni a kártya lejárati idejét és a CVC/CVV kódját, sem belépni a netbankba.',
      'Teljesen normális banki átutalási eljárás.',
      'A rendőrség biztonsági ellenőrzése.'
    ],
    correctIndex: 1,
    explanation: 'Pénz fogadásához kizárólag a bankszámlaszámra (vagy másodlagos azonosítóra, pl. e-mailre) van szükség. A bankkártya adatokat és CVC kódot soha ne add meg pénz fogadására hivatkozva!'
  },
  {
    id: 'oc_6',
    topicId: 'online_csalasok',
    difficulty: 'kozepes',
    questionText: 'Egy ismerősöd messengeren sürgős üzenetet küld: „Kérlek segíts, bajban vagyok, utalj gyorsan 30 ezer forintot erre a számra!”. Mi a legfontosabb lépés?',
    options: [
      'Elküldeni a bankkártyád fotóját mindkét oldalról.',
      'Azonnal átutalni a pénzt, elvégre barát.',
      'Továbbítani a kérést az összes többi közös barátnak.',
      'Felhívni őt telefonon vagy személyesen beszélni vele, mert gyakran feltörik a fiókokat a csalók.'
    ],
    correctIndex: 3,
    explanation: 'Gyakori módszer, hogy feltört profilokból a csalók pénzt kérnek a kontaktoktól. Mindig ellenőrizd más független csatornán (pl. közvetlen telefonhívással)!'
  },
  {
    id: 'oc_7',
    topicId: 'online_csalasok',
    difficulty: 'kozepes',
    questionText: 'Miről ismerhető fel a legkönnyebben egy megbízhatatlan, hamis webáruház?',
    options: [
      'Gyanúsan olcsó márkás árucikkek, magyartalan gépi fordítás, hiányzó céges elérhetőség (ÁSZF, székhely, adószám), és kizárólag előre fizetés lehetséges.',
      'Van rajta keresőmező és kosár gomb.',
      'Színes a weboldal fejlécének a háttere.',
      'Lehet bankkártyával fizetni.'
    ],
    correctIndex: 0,
    explanation: 'A hamis webshopok hihetetlen 80-90%-os akciókkal csábítanak, nincs valós céges adatuk és vevőszolgálatuk. Mindig ellenőrizd a webáruház megbízhatóságát!'
  },
  {
    id: 'oc_8',
    topicId: 'online_csalasok',
    difficulty: 'kozepes',
    questionText: 'A „Banki biztonsági osztály” nevében hív valaki, és azt mondja, feltörték a számládat, ezért sürgősen telepítened kell az „AnyDesk” vagy „TeamViewer” alkalmazást a „védelemhez”. Mit teszel?',
    options: [
      'Megadom a mobilbankos belépési kódomat, hogy ő maga elhárítsa a hibát.',
      'Átutalom a pénzem az általa megadott „biztonsági számlára”.',
      'Gyorsan feltelepítem és megadom neki a képernyőn látható kódot.',
      'Azonnal leteszem a telefont! A bankok sosem kérik távoli hozzáférésű képernyőmegosztó program telepítését.'
    ],
    correctIndex: 3,
    explanation: 'A csalók távoli asztal elérést (pl. AnyDesk) kérve átveszik az uralmat a számítógép vagy telefon felett, és ellopják a pénzt. A bank sosem kér ilyet!'
  },
  {
    id: 'oc_9',
    topicId: 'online_csalasok',
    difficulty: 'nehez',
    questionText: 'Mit jelent a „kriptovaluta- és befektetési csalás” (pig butchering / hamis brókerek)?',
    options: [
      'Egy digitális fizetőeszköz ingyenes bányászata.',
      'Hírességek (pl. miniszterelnök, üzletemberek) arcával reklámozott irreális hozamot ígérő kamu platformok, ahol a befizetett pénz sosem vehető fel.',
      'Kriptopiacok legális felügyeleti vizsgálata az MNB által.',
      'Pénzügyi applikációk automatikus szoftverfrissítése.'
    ],
    correctIndex: 1,
    explanation: 'A csalók mesterséges intelligenciával gyártott deepfake videókkal vagy hamis brókerekkel hihetetlen gyors gazdagodást ígérnek, majd a befektetett összeget eltüntetik.'
  },
  {
    id: 'oc_10',
    topicId: 'online_csalasok',
    difficulty: 'nehez',
    questionText: 'Mit jelent az „URL spoofing” vagy typosquatting az adathalászatban?',
    options: [
      'A weboldalak gyorsabb betöltését segítő szervertechnológia.',
      'A számítógépes egeret gyorsító szoftver.',
      'Csalók az eredeti banki/szolgáltatói webcímhez megtévesztésig hasonlító domaint regisztrálnak (pl. otpbamk.hu vagy otp-belepes.hu) a felhasználók becsapására.',
      'A böngészési előzmények titkosítása.'
    ],
    correctIndex: 2,
    explanation: 'Mindig ellenőrizd a böngésző címsorában a pontos címet és a biztonságos protokollt! Egyetlen elgépelt betű hamis csaló oldalra vezethet.'
  },
  {
    id: 'oc_11',
    topicId: 'online_csalasok',
    difficulty: 'nehez',
    questionText: 'Ha gyanús tranzakciót észlelsz vagy véletlenül megadtad a banki adataidat egy csaló oldalon, mi a helyes protokoll?',
    options: [
      'Azonnal felhívni a saját bankod hivatalos ügyfélszolgálatát és letiltatni a bankkártyát/hozzáférést, majd feljelentést tenni a Rendőrségen.',
      'Várni néhány napot, hátha nem történik semmi.',
      'Megkérdezni a közösségi médiában a kommentelőket.',
      'Újra megpróbálni belépni a csaló oldalra és kérni a törlést.'
    ],
    correctIndex: 0,
    explanation: 'A gyors reakció kulcsfontosságú! Az azonnali banki tiltás megakadályozhatja az összeg levonását vagy átutalását, a rendőrségi bejelentés pedig segít a felderítésben.'
  },

  // =========================================================================
  // 2. KIBERBIZTONSÁG & JELSZÓVÉDELEM (11 kérdés)
  // =========================================================================
  {
    id: 'kb_1',
    topicId: 'kiberbiztonsag',
    difficulty: 'konnyu',
    questionText: 'Melyik a legbiztonságosabb jelszó az alábbiak közül?',
    options: [
      '123456',
      'jelszo2024',
      'a keresztneved és a születési éved',
      'K$9mP#z7!wL2@'
    ],
    correctIndex: 3,
    explanation: 'Az erős jelszó legalább 12-14 karakteres, tartalmaz kis- és nagybetűket, számokat és speciális karaktereket, és nem tartalmaz személyes adatot.'
  },
  {
    id: 'kb_2',
    topicId: 'kiberbiztonsag',
    difficulty: 'konnyu',
    questionText: 'Szabad-e minden weboldalon és játékban ugyanazt a jelszót használni?',
    options: [
      'Nem, mert ha egyetlen oldal adatbázisát feltörik, a bűnözők az összes többi fiókodba is bejuthatnak!',
      'Igen, mert így könnyebb megjegyezni és nem felejtem el.',
      'Igen, ha a jelszóban van legalább egy felkiáltójel.',
      'Csak akkor, ha a barátaid is azt használják.'
    ],
    correctIndex: 0,
    explanation: 'A jelszó-újrafelhasználás óriási biztonsági kockázat. Minden fontos fiókhoz használj egyedi jelszót vagy megbízható jelszókezelőt!'
  },
  {
    id: 'kb_3',
    topicId: 'kiberbiztonsag',
    difficulty: 'konnyu',
    questionText: 'Az iskolai vagy könyvtári számítógépen bejelentkezel a levelezésedbe vagy közösségi oldaladra. Mit kell tenned, amikor felállsz a géptől?',
    options: [
      'Semmit, a gép automatikusan elfelejti magától.',
      'Kijelentkezni a fiókból, törölni a bejelentkezési pipát és bezárni a böngészőt.',
      'Csak simán becsukni a böngészőablakot.',
      'Kikapcsolni a monitort.'
    ],
    correctIndex: 1,
    explanation: 'Idegen vagy nyilvános gépen mindig nyomj a „Kijelentkezés” gombra, különben a következő felhasználó szabadon hozzáfér a privát fiókodhoz!'
  },
  {
    id: 'kb_4',
    topicId: 'kiberbiztonsag',
    difficulty: 'konnyu',
    questionText: 'A telefonod jelez, hogy elérhető egy új rendszerfrissítés (biztonsági frissítés). Mit érdemes tenned?',
    options: [
      'Soha ne frissíts, mert csak lassítja a telefont.',
      'Várd meg, amíg eltelt legalább 3 év.',
      'Frissítsd a telefont, mert a biztonsági frissítések kijavítják a veszélyes biztonsági réseket, amiket a vírusok kihasználhatnának.',
      'Töröld le a beállítások menüt.'
    ],
    correctIndex: 2,
    explanation: 'A szoftver- és rendszerfrissítések nemcsak új funkciókat adnak, hanem a frissen felfedezett biztonsági réseket is befoltozzák.'
  },
  {
    id: 'kb_5',
    topicId: 'kiberbiztonsag',
    difficulty: 'kozepes',
    questionText: 'Mit jelent a „kétlépcsős azonosítás” (2FA / MFA)?',
    options: [
      'A jelszavad mellett egy második igazoló tényező is szükséges (pl. telefonos kód, ujjlenyomat vagy hitelesítő applikáció).',
      'Kétszer kell gyorsan beírnod ugyanazt a jelszót egymás után.',
      'Amikor két ember egyszerre játszik egy gépen.',
      'Amikor két számítógépes vírus harcol egymással.'
    ],
    correctIndex: 0,
    explanation: 'A kétlépcsős azonosítás a leghatékonyabb védelem: még ha a jelszavad ki is szivárog, a támadó a második tényező (pl. SMS vagy hitelesítő app) nélkül nem tud belépni.'
  },
  {
    id: 'kb_6',
    topicId: 'kiberbiztonsag',
    difficulty: 'kozepes',
    questionText: 'Nyilvános helyen vagy (pl. pláza, gyorsétterem, vasútállomás) és találsz egy jelszó nélküli, ingyenes nyílt Wi-Fi hálózatot. Mire kell nagyon figyelni?',
    options: [
      'Bármit csinálhatsz rajta, a nyilvános hálózatok a legbiztonságosabbak.',
      'Nyílt Wi-Fi-re csak éjszaka szabad kapcsolódni.',
      'Kerüld a banki belépést, a jelszavak megadását és a vásárlást nyílt hálózaton, mert a forgalmat a csalók lehallgathatják; inkább használj mobilinternetet vagy VPN-t.',
      'A nyílt Wi-Fi-n nem terjedhet vírus.'
    ],
    correctIndex: 2,
    explanation: 'A titkosítás nélküli nyilvános Wi-Fi hálózatokon a csalók könnyen lehallgathatják az adatforgalmat, vagy kamu hálózatot hozhatnak létre az adatok ellopására.'
  },
  {
    id: 'kb_7',
    topicId: 'kiberbiztonsag',
    difficulty: 'kozepes',
    questionText: 'Mit nevezünk „zsarolóvírusnak” (ransomware)?',
    options: [
      'Egy kártékony szoftvert, amely titkosítja a számítógépen lévő fájlokat, képeket, és pénzt követel a feloldásukért.',
      'Egy olyan programot, ami zenéket játszik le a háttérben.',
      'Egy ingyenes vírusirtó szoftvert.',
      'A merevlemez fizikai ventilátorának meghibásodását.'
    ],
    correctIndex: 0,
    explanation: 'A zsarolóvírusok zárolják az adataidat és váltságdíjat követelnek. A rendőrség javaslata: soha ne fizess a bűnözőknek, és mindig készíts offline biztonsági másolatot a fontos fájljaidról!'
  },
  {
    id: 'kb_8',
    topicId: 'kiberbiztonsag',
    difficulty: 'kozepes',
    questionText: 'Mit csinál egy megbízható jelszókezelő (Password Manager) program?',
    options: [
      'Mindenkinek elküldi a jelszavadat e-mailben.',
      'Erős, egyedi jelszavakat generál és biztonságosan, titkosítva tárolja őket, neked csak egyetlen mesterjelszót kell megjegyezned.',
      'Automatikus lájkokat küld a képeidre.',
      'Törli az internetet a gépedről.'
    ],
    correctIndex: 1,
    explanation: 'A jelszókezelők leveszik a terhet a vállunkról: minden oldalhoz komplex jelszót állítanak elő, így nem kell füzetbe felírni őket.'
  },
  {
    id: 'kb_9',
    topicId: 'kiberbiztonsag',
    difficulty: 'nehez',
    questionText: 'Mit jelent a „Social Engineering” (társadalmi manipuláció / pszichológiai megtévesztés) a kiberbűnözésben?',
    options: [
      'Közösségi média felületek programozása.',
      'Robotok tervezése gyárakban.',
      'Tudományos kutatás a digitális eszközök képernyőidejéről.',
      'A támadó az emberi hiszékenységet, félelmet, segítőkészséget vagy sürgetést használja ki, hogy a célszemély maga adja ki a bizalmas adatokat vagy indítsa el a kártevőt.'
    ],
    correctIndex: 3,
    explanation: 'A kiberbűnözők gyakran nem a bonyolult rendszereket törik fel, hanem az emberi tényezőt használják ki sürgetéssel vagy tekintélyszeméllyel való fenyegetéssel.'
  },
  {
    id: 'kb_10',
    topicId: 'kiberbiztonsag',
    difficulty: 'nehez',
    questionText: 'Találsz egy USB pendrive-ot az iskola folyosóján vagy a parkolóban egy padon. Mit szabad tenned?',
    options: [
      'Azonnal bedugni az otthoni vagy munkahelyi gépbe, megnézni mi van rajta.',
      'SOHA ne csatlakoztasd a gépedhez! Át kell adni a tanárnak vagy biztonsági szolgálatnak, mert célzott vírusfertőzést (BadUSB) hordozhat.',
      'Megpróbálni formázni anélkül, hogy megnyitnád a fájlokat.',
      'Bedugni a TV készülékbe.'
    ],
    correctIndex: 1,
    explanation: 'A bűnözők szándékosan „elhagynak” pendrive-okat, amelyek automatikusan lefutó kártékony kódot tartalmaznak a csatlakoztatás pillanatában.'
  },
  {
    id: 'kb_11',
    topicId: 'kiberbiztonsag',
    difficulty: 'nehez',
    questionText: 'Melyik a legbiztonságosabb módszer a fontos személyes és céges adatok mentésére?',
    options: [
      'Csak a számítógép Asztal (Desktop) mappájában hagyni a fájlokat.',
      'Kinyomtatni minden fájlt fekete-fehérben.',
      'A 3-2-1 biztonsági mentési szabály: legalább 3 példány, 2 különböző adathordozón, és 1 példány külön helyen (pl. titkosított felhőben vagy offline lecsatlakoztatott lemezen).',
      'Elküldeni mindent egy nyilvános fórumba.'
    ],
    correctIndex: 2,
    explanation: 'A 3-2-1 szabály biztosítja, hogy hardverhiba, tűzeset vagy zsarolóvírus-fertőzés esetén is visszaállíthatók maradjanak az értékes adatok.'
  },

  // =========================================================================
  // 3. BIZTONSÁGOS KÖZÖSSÉGI MÉDIA (11 kérdés)
  // =========================================================================
  {
    id: 'km_1',
    topicId: 'kozossegi_media',
    difficulty: 'konnyu',
    questionText: 'Milyen adatokat NEM szabad nyilvánosan kiírni a közösségi média profilodra (Instagram, TikTok, Facebook)?',
    options: [
      'A pontos lakcímedet, telefonszámodat, iskolád nevét és a napirendedet.',
      'A kedvenc színedet és a kedvenc ételedet.',
      'A kedvenc focicsapatod nevét.',
      'Hogy szereted a fagyit.'
    ],
    correctIndex: 0,
    explanation: 'A személyes adatok (lakcím, iskola, telefonszám) kiadása veszélybe sodorhat téged és a családodat. Tartsd privátban a profilodat!'
  },
  {
    id: 'km_2',
    topicId: 'kozossegi_media',
    difficulty: 'konnyu',
    questionText: 'Egy ismeretlen felnőtt bejelöl ismerősnek a neten, és elkezd kérdezgetni a családodról, és képeket kér rólad. Mit kell tenned?',
    options: [
      'Azonnal küldeni neki képeket, hogy jó barátok legyetek.',
      'Nem válaszolni neki, azonnal szólni a szüleidnek vagy egy megbízható felnőttnek, és letiltani az illetőt!',
      'Találkozni vele egyedül a parkban suli után.',
      'Elküldeni neki a lakáskulcs fotóját.'
    ],
    correctIndex: 1,
    explanation: 'A neten bárki kiadhatja magát bárkinek (más fotójával, kamu profillal). Ismeretlenekkel sose ossz meg privát képet és sose találkozz velük egyedül!'
  },
  {
    id: 'km_3',
    topicId: 'kozossegi_media',
    difficulty: 'konnyu',
    questionText: 'A család elutazik nyaralni 2 hétre a tengerpartra. Mikor érdemes kitenni a nyaralós fotókat a közösségi médiába?',
    options: [
      'Azonnal a repülőtérről: „Üres a lakásunk 2 hétig, végre nyaralunk!”.',
      'Minden nap pontos élő bejelentkezést tartani a lakás ürességéről.',
      'Kitenni a házkulcsot és a kapukódot is a poszt mellé.',
      'Csak azután, hogy épségben hazaértetek a nyaralásból.'
    ],
    correctIndex: 3,
    explanation: 'A betörők figyelik a közösségi médiát! Ha valós időben kiírod, hogy hetekig üres a lakás, közvetlen célponttá teheted az otthonotokat.'
  },
  {
    id: 'km_4',
    topicId: 'kozossegi_media',
    difficulty: 'konnyu',
    questionText: 'Készítettél egy vicces fotót az osztálytársadról a szünetben. Mikor töltheted fel az internetre?',
    options: [
      'Bármikor, hiszen te csináltad a képet.',
      'Csak este 8 óra után.',
      'Akkor, ha sok lájkot fog kapni.',
      'Csak akkor, ha ő maga kifejezetten megengedte és beleegyezett a megosztásba!'
    ],
    correctIndex: 3,
    explanation: 'Másokról képet megosztani csak az ő kifejezett engedélyükkel szabad. A gúnyos vagy engedély nélküli képek közzététele jogsértő és megbánthatja a másikat.'
  },
  {
    id: 'km_5',
    topicId: 'kozossegi_media',
    difficulty: 'kozepes',
    questionText: 'Mit jelent a „digitális lábnyom” (digital footprint)?',
    options: [
      'Minden olyan adat, bejegyzés, komment és fotó összessége, amit az interneten valaha közzétettél vagy rólad megosztottak.',
      'Egy lépésszámláló alkalmazás a telefonon.',
      'Egy cipőmárka webáruháza.',
      'A tablet képernyőjén maradt ujjlenyomatok.'
    ],
    correctIndex: 0,
    explanation: 'Ami egyszer felkerül a netre, az szinte örökre megmarad! Évek múlva akár továbbtanulásnál vagy munkahelyi jelentkezésnél is előkerülhet.'
  },
  {
    id: 'km_6',
    topicId: 'kozossegi_media',
    difficulty: 'kozepes',
    questionText: 'Mi a legbiztonságosabb profilbeállítás a közösségi média fiókjaidon (Instagram, TikTok stb.)?',
    options: [
      'Teljesen nyilvános, hogy minél több ismeretlen lájkoló és követő legyen.',
      'Minden követési kérés automatikus jóváhagyása.',
      'Privát profil, ahol te magad döntöd el és ellenőrzöd, hogy ki láthatja a posztjaidat és történeteidet.',
      'A pontos élő GPS tartózkodási hely folyamatos engedélyezése minden posztnál.'
    ],
    correctIndex: 2,
    explanation: 'A privát profil biztosítja, hogy csak azok az ismerőseid lássák a tartalmaidat, akiket a valós életből is ismersz és akikben megbízol.'
  },
  {
    id: 'km_7',
    topicId: 'kozossegi_media',
    difficulty: 'kozepes',
    questionText: 'Mit jelent a „sextortion” (szexuális zsarolás az interneten)?',
    options: [
      'Egy internetes vásárlási akció.',
      'Amikor csalók vagy manipulátorok intim képet csalnak ki valakitől, majd azzal zsarolják, hogy nyilvánosságra hozzák, ha nem fizet vagy nem küld még többet.',
      'Közösségi média szűrők alkalmazása a képeken.',
      'Videójátékos streamelés szabályzata.'
    ],
    correctIndex: 1,
    explanation: 'Soha ne küldj magadról intim fotót senkinek! Ha ilyen zsarolás áldozatává válsz: NE fizess, NE töröld a bizonyítékokat, és azonnal kérj segítséget felnőttől vagy a rendőrségtől!'
  },
  {
    id: 'km_8',
    topicId: 'kozossegi_media',
    difficulty: 'kozepes',
    questionText: 'Mit jelent az „online kihívások” (TikTok challenges) veszélye?',
    options: [
      'Csak az a veszélyes, ami 5 percnél tovább tart.',
      'Egyes felkapott kihívások súlyos testi sérülést, fulladást vagy életveszélyt okozhatnak; sose végezz olyan feladatot, ami károsíthatja az egészségedet!',
      'Nincs bennük veszély, minden kihívás szórakoztató.',
      'Csak felnőttek próbálhatják ki őket.'
    ],
    correctIndex: 1,
    explanation: 'Sok népszerű online trend kifejezetten veszélyes vagy törvénybe ütköző. Mindig gondold át a következményeket, a lájkok nem érik meg az épséged kockáztatását!'
  },
  {
    id: 'km_9',
    topicId: 'kozossegi_media',
    difficulty: 'nehez',
    questionText: 'Mit tehetsz jogilag, ha valaki az engedélyed nélkül visszaél a fotóiddal vagy kamu profilt hozott létre a nevedben?',
    options: [
      'Semmit, az interneten mindent szabad.',
      'Bosszúból te is csinálsz róla egy kamu profilt.',
      'Jelented a platform adminisztrátorainak, lemented a képernyőképeket bizonyítékként, és személyes adattal való visszaélés miatt a Rendőrséghez fordulhatsz.',
      'Törlöd az otthoni internet előfizetést.'
    ],
    correctIndex: 2,
    explanation: 'A más nevével, adataival és képeivel való visszaélés büntetőjogi következményekkel jár. A bizonyítékok rögzítése és a hatósági bejelentés a törvényes út.'
  },
  {
    id: 'km_10',
    topicId: 'kozossegi_media',
    difficulty: 'nehez',
    questionText: 'Mit jelent a „Sharenting” jelenség a digitális korban?',
    options: [
      'Amikor a szülők túlzott mértékben és a gyermek beleegyezése nélkül osztanak meg intim pillanatokat, fotókat a gyermekükről a közösségi oldalakon.',
      'Közös családi internetes bevásárlás.',
      'Gyerekeknek szóló oktató játékok.',
      'Közös videójátékozás a szülőkkel.'
    ],
    correctIndex: 0,
    explanation: 'A sharenting sértheti a gyermek személyiségi jogait és visszaélésekre (pl. pedofil hálózatok, zaklatás) adhat lehetőséget.'
  },
  {
    id: 'km_11',
    topicId: 'kozossegi_media',
    difficulty: 'nehez',
    questionText: 'Melyik az a magyar államilag támogatott szervezet és segélyvonal, amely kifejezetten a gyermekek internetes jogsértéseinek eltávolításában segít?',
    options: [
      'Magyar Nemzeti Bank',
      'Országos Meteorológiai Szolgálat',
      'Biztonságosinternet Hotline és Kék Vonal Gyermekkrízis Alapítvány (116-111)',
      'Nemzetközi Postaszolgálat'
    ],
    correctIndex: 2,
    explanation: 'A Kék Vonal (116-111) éjjel-nappal ingyenesen hívható lelki segélyvonal, a Biztonságosinternet Hotline pedig segít a jogellenes tartalmak és képek eltávolításában.'
  },

  // =========================================================================
  // 4. DROGPREVENCIÓ & EGÉSZSÉGES ÉLET (11 kérdés)
  // =========================================================================
  {
    id: 'dp_1',
    topicId: 'drogprevencio',
    difficulty: 'konnyu',
    questionText: 'Egy buliban vagy játszótéren egy ismerős fiú színes cukorkának látszó bogyót vagy gyanús italt kínál, mondván: „kóstold meg, ettől leszel menő”. Mit teszel?',
    options: [
      'Határozottan NEM-et mondok, eljövök onnan és szólok a szüleimnek vagy egy tanárnak!',
      'Kipróbálom, mert nem akarom, hogy kinevessenek.',
      'Zsebre teszem és később megeszem.',
      'Odaadom a kistestvéremnek.'
    ],
    correctIndex: 0,
    explanation: 'Az igazi bátorság az, amikor képes vagy nemet mondani a veszélyes dolgokra. Soha ne fogadj el ismeretlen eredetű szert vagy nyitott italt!'
  },
  {
    id: 'dp_2',
    topicId: 'drogprevencio',
    difficulty: 'konnyu',
    questionText: 'Miért veszélyes az energiaitalok túlzott fogyasztása gyermekek és fiatalok számára?',
    options: [
      'Mert finom az ízük.',
      'Mert a magas koffein- és cukortartalom szívritmuszavart, magas vérnyomást, szorongást és hirtelen rosszullétet okozhat.',
      'Mert világít tőle az ember a sötétben.',
      'Semmilyen veszélye sincs.'
    ],
    correctIndex: 1,
    explanation: 'A fiatalok szervezete sokkal érzékenyebb a koffeinre. A mértéktelen energiaital-fogyasztás komoly szív- és idegrendszeri panaszokhoz vezethet.'
  },
  {
    id: 'dp_3',
    topicId: 'drogprevencio',
    difficulty: 'konnyu',
    questionText: 'Igaz-e, hogy az elektromos cigaretta („manórúd”, Elf Bar, vape) teljesen ártalmatlan és csak ízesített vízpára?',
    options: [
      'Igen, teljesen egészséges vitaminos gőz.',
      'Csak a felnőtteknek káros, a gyerekeknek nem.',
      'Segíti a sportteljesítményt.',
      'NEM IGAZ! Erős nikotinfüggőséget okoz, mérgező vegyi anyagokat és nehézfémeket tartalmaz, és a forgalmazása illegális.'
    ],
    correctIndex: 3,
    explanation: 'Az Elf Bar és az e-cigaretták nem vízpárát, hanem függőséget okozó nikotint és rákkeltő aeroszolt tartalmaznak, ráadásul súlyos tüdőkárosodást okozhatnak.'
  },
  {
    id: 'dp_4',
    topicId: 'drogprevencio',
    difficulty: 'konnyu',
    questionText: 'Mit csinálsz, ha egy barátod a társaságban hirtelen rosszul lesz, szédül vagy eszméletét veszti gyanús szer fogyasztása után?',
    options: [
      'Azonnal segítséget kérsz: tárcsázod a 112-es segélyhívót vagy szólsz a legközelebbi felnőttnek!',
      'Otthagyod a fűben és hazamész, hogy ne kerülj bajba.',
      'Lefotózod és kiteszed a közösségi médiára.',
      'Megvárod, amíg magától felébred.'
    ],
    correctIndex: 0,
    explanation: 'Minden másodperc számít! A mentők és a rendőrség életet menteni érkezik. Sose hagyd magára a bajba jutott társadat!'
  },
  {
    id: 'dp_5',
    topicId: 'drogprevencio',
    difficulty: 'kozepes',
    questionText: 'Mit jelent a „designer drog” (új pszichoaktív anyag) kifejezés?',
    options: [
      'Híres divattervezők által készített ruhák.',
      'Ismeretlen, laboratóriumokban kotyvasztott vegyi szerek, amelyek összetétele kiszámíthatatlan, és már egyetlen adagjuk halálos mérgezést okozhat.',
      'Gyógyszertárban recept nélkül kapható vitaminok.',
      'Egészséges táplálékkiegészítők.'
    ],
    correctIndex: 1,
    explanation: 'A designer drogok óriási veszélye, hogy sem a fogyasztó, sem a mentős nem tudja, milyen mérgező vegyület van bennük. Kiszámíthatatlan reakciót és agykárosodást okozhatnak.'
  },
  {
    id: 'dp_6',
    topicId: 'drogprevencio',
    difficulty: 'kozepes',
    questionText: 'Egy szórakozóhelyen kimentél a mosdóba, és az asztalon hagytad az üdítődet. Amikor visszamész, mit teszel vele?',
    options: [
      'Nyugodtan megiszom, hiszen az asztalon volt.',
      'Belekeverek egy kis vizet.',
      'Megkínálom vele a legközelebbi idegent.',
      'Nem iszom belőle többet, újat kérek, mert észrevétlenül bódító szert (pl. Gina / randevú-drogot) csempészhettek bele!'
    ],
    correctIndex: 3,
    explanation: 'A felügyelet nélkül hagyott pohárba másodpercek alatt kábító hatású szert tehetnek. Mindig tartsd szemmel a poharadat, vagy kérj újat zárt üvegben!'
  },
  {
    id: 'dp_7',
    topicId: 'drogprevencio',
    difficulty: 'kozepes',
    questionText: 'Mit jelent a „fizikai és pszichikai függőség” a drogok és az alkohol kapcsán?',
    options: [
      'Amikor valaki nagyon szeret aludni.',
      'Amikor a szervezet és az elme annyira hozzászokik a szerhez, hogy annak hiányában súlyos elvonási tünetek, szorongás, fájdalom és kényszeres vágyakozás alakul ki.',
      'Egy új típusú fitnesz edzésforma.',
      'A mobiltelefon akkumulátorának lemerülése.'
    ],
    correctIndex: 1,
    explanation: 'A függőség betegség, amelyből rendkívül nehéz kiszállni. A legjobb védekezés a megelőzés: ki se próbáld!'
  },
  {
    id: 'dp_8',
    topicId: 'drogprevencio',
    difficulty: 'kozepes',
    questionText: 'Hogyan mondhatsz határozottan és menőn „NEM”-et, ha a társaság cigarettával vagy droggal kínál?',
    options: [
      'Sírva fakadok és bocsánatot kérek.',
      'Elfogadom, csak hogy ne cikizzenek.',
      'Egyenes testtartással, szemkontaktussal, magabiztosan: „Köszi, de én nem élek ilyesmivel / sportolok / nem az én műfajom”.',
      'A földre dobom és ráugrok.'
    ],
    correctIndex: 2,
    explanation: 'Az asszertív kommunikáció lényege a magabiztos, nyugodt határozottság. Azok a valódi barátok, akik tiszteletben tartják a döntésedet!'
  },
  {
    id: 'dp_9',
    topicId: 'drogprevencio',
    difficulty: 'nehez',
    questionText: 'Büntetendő-e Magyarországon a kábítószer tartása, fogyasztása vagy másoknak való átadása?',
    options: [
      'Nem, saját használatra minden legális.',
      'Csak akkor büntetendő, ha a tévé bemondja.',
      'IGEN! A Büntető Törvénykönyv szigorúan bünteti a kábítószer birtoklását, fogyasztását, átadását és a kereskedelmet is.',
      'Csak 30 éves kor felett büntetendő.'
    ],
    correctIndex: 2,
    explanation: 'A magyar jogszabályok zéró toleranciát alkalmaznak: a kábítószer birtoklása és fogyasztása is bűncselekmény, ami büntetett előéletet és akár szabadságvesztést vonhat maga után.'
  },
  {
    id: 'dp_10',
    topicId: 'drogprevencio',
    difficulty: 'nehez',
    questionText: 'Mit jelent az „elterelés” intézménye a magyar büntetőjogban fiatalkorúak vagy alkalmi fogyasztók esetében?',
    options: [
      'A büntetőeljárás felfüggesztése mellett legalább 6 hónapos megelőző-felvilágosító vagy kezelési programban való kötelező részvétel.',
      'Közúti forgalomelterelés útépítés miatt.',
      'Büntetés helyett ingyenes nyaralás.',
      'Iskolaváltásra való kötelezés.'
    ],
    correctIndex: 0,
    explanation: 'A törvény lehetőséget ad az alkalmi fogyasztóknak, hogy kezelés és felvilágosítás útján elkerüljék a bírósági büntetést, ezzel esélyt kapva az egészséges életre.'
  },
  {
    id: 'dp_11',
    topicId: 'drogprevencio',
    difficulty: 'nehez',
    questionText: 'Milyen súlyos mentális és pszichés következményei lehetnek a marihuána és a szintetikus kannabinoidok korai használatának?',
    options: [
      'Jobb tanulmányi eredmények és memóriafejlődés.',
      'Szemüveg elhagyásának képessége.',
      'Kiváló zenei hallás kifejlődése.',
      'Pánikrohamok, tartós motivációvesztés, memóriazavar és hajlam esetén skizofrénia vagy pszichózis kiváltása.'
    ],
    correctIndex: 3,
    explanation: 'A fejlődésben lévő kamasz agyban a bódítószerek maradandó idegrendszeri károsodást okozhatnak és lappangó pszichiátriai betegségeket lobbanthatnak be.'
  },

  // =========================================================================
  // 5. ONLINE ZAKLATÁS & CYBERBULLYING (11 kérdés)
  // =========================================================================
  {
    id: 'oz_1',
    topicId: 'online_zaklatas',
    difficulty: 'konnyu',
    questionText: 'Az osztály közös csetcsoportjában néhányan folyamatosan csúfolnak és kinevetnek egy osztálytársat. Mit a helyes tenni?',
    options: [
      'Te is csatlakozol a gúnyolódáshoz, hogy ne téged pécézzenek ki.',
      'Nem veszel részt a gúnyolódásban, kiállsz mellette, és szólsz az osztályfőnöknek vagy a szüleidnek!',
      'Továbbküldöd a sértő képeket más iskolásoknak is.',
      'Lájkolod a bántó üzeneteket.'
    ],
    correctIndex: 1,
    explanation: 'A csendes szemlélődés is bátorítja a zaklatókat. Ha kiállsz a bántott társad mellett vagy segítséget kérsz egy tanártól, megállíthatod a bajt!'
  },
  {
    id: 'oz_2',
    topicId: 'online_zaklatas',
    difficulty: 'konnyu',
    questionText: 'Mit jelent a „cyberbullying” szó?',
    options: [
      'Egy népszerű sci-fi társasjáték.',
      'Egy új okostelefonos márka.',
      'Internetes zaklatás: amikor valakit a digitális térben ismétlődően bántanak, megaláznak, fenyegetnek vagy kirekesztenek.',
      'Gyors gépelés a billentyűzeten.'
    ],
    correctIndex: 2,
    explanation: 'A cyberbullying épp olyan fájdalmas, mint a fizikai bántás, sőt a nap 24 órájában elérheti az áldozatot. Sose bánts másokat a neten!'
  },
  {
    id: 'oz_3',
    topicId: 'online_zaklatas',
    difficulty: 'konnyu',
    questionText: 'Egy ismeretlen vagy haragos felhasználó fenyegető üzeneteket küld neked a neten. Mi az ELSŐ dolog, amit NEM szabad tenned?',
    options: [
      'Képernyőképet menteni a bizonyítékokról.',
      'Szólni a szüleidnek.',
      'Letiltani az illetőt.',
      'Visszafenyegetni és durván káromkodva vitatkozni vele.'
    ],
    correctIndex: 3,
    explanation: 'A zaklatók pontosan az érzelmi reakcióra és a vitára vágynak. Ne menj bele a sárdobálásba: mentsd le a bizonyítékokat, tiltsd le, és szólj felnőttnek!'
  },
  {
    id: 'oz_4',
    topicId: 'online_zaklatas',
    difficulty: 'konnyu',
    questionText: 'Mit jelent a képernyőkép (screenshot) mentése, ha zaklatnak az interneten?',
    options: [
      'Fontos bizonyítékot rögzítesz a dátummal, névvel és az üzenettel, ami segít a rendőrségnek és a tanároknak a kivizsgálásban.',
      'Hogy a képernyőt lefényképezve törlődik a zaklató profilja.',
      'A képernyőkép elküldi a vírust a másik félnek.',
      'A telefon háttérképének megváltoztatása.'
    ],
    correctIndex: 0,
    explanation: 'A zaklatók gyakran utólag letörlik a bántó üzeneteket. A mentett képernyőképek (screenshotok) perdöntő bizonyítékok!'
  },
  {
    id: 'oz_5',
    topicId: 'online_zaklatas',
    difficulty: 'kozepes',
    questionText: 'Mit jelent a „doxxing” kifejezés a kiberzaklatásban?',
    options: [
      'Online orvosi vizsgálat webkamerán.',
      'Videójátékbeli pontszerzés.',
      'Valakinek a személyes, titkos adatainak (pl. valódi neve, lakcíme, telefonszáma, iskolája) rosszindulatú nyilvánosságra hozatala a neten, hogy mások zaklassák.',
      'A profilkép levédése szerzői joggal.'
    ],
    correctIndex: 2,
    explanation: 'A doxxing veszélyes jogsértés, amely a valós fizikai biztonságot is fenyegeti. Soha ne hozz nyilvánosságra másokról személyes adatokat!'
  },
  {
    id: 'oz_6',
    topicId: 'online_zaklatas',
    difficulty: 'kozepes',
    questionText: 'Miért érzik magukat sokan bátrabbnak a neten bántó kommenteket írni, mint a valóságban?',
    options: [
      'Mert a billentyűzet erőt ad a kezüknek.',
      'Mert az interneten nincsenek törvények.',
      'Mert a monitor elnyeli a haragot.',
      'Az anonimitás hamis illúziója és a közvetlen szemkontaktus hiánya miatt (online diszgátlás), ám a tetteik a valóságban is bűncselekménynek számíthatnak.'
    ],
    correctIndex: 3,
    explanation: 'Sokan azt hiszik, hogy egy kamu profil mögé bújva bármit megtehetnek. A rendőrség és a hatóságok azonban az IP-cím alapján azonosítani tudják az elkövetőket!'
  },
  {
    id: 'oz_7',
    topicId: 'online_zaklatas',
    difficulty: 'kozepes',
    questionText: 'Mit jelent a csoportos kirekesztés (social exclusion) egy osztályközösségben online?',
    options: [
      'Amikor elfelejtenek feladni egy házi feladatot.',
      'Amikor szándékosan kihagynak valakit a közös csoportból, kibeszélik és elszigetelik őt, ezzel súlyos lelki fájdalmat okozva.',
      'Amikor lejár a mobilnet előfizetés.',
      'Amikor közös online vetélkedőt szerveznek.'
    ],
    correctIndex: 1,
    explanation: 'A szándékos kirekesztés a cyberbullying egyik legfájdalmasabb formája. Figyeljünk egymásra, senki se maradjon egyedül a közösségben!'
  },
  {
    id: 'oz_8',
    topicId: 'online_zaklatas',
    difficulty: 'kozepes',
    questionText: 'Kit hívhat fel teljesen ingyen és névtelenül bármelyik fiatal Magyarországon, ha bántják az iskolában vagy a neten?',
    options: [
      'A Kék Vonal Gyermekkrízis Alapítványt a 116-111-es számon.',
      'A Tudakozót.',
      'A helyi pizzafutárt.',
      'A Meteorológiai Intézetet.'
    ],
    correctIndex: 0,
    explanation: 'A 116-111 egy anonim, ingyenes lelki segélyvonal fiataloknak, ahol szakemberek segítenek bántalmazás, zaklatás és lelki problémák esetén.'
  },
  {
    id: 'oz_9',
    topicId: 'online_zaklatas',
    difficulty: 'nehez',
    questionText: 'Melyik bűncselekményt követi el az, aki nagy nyilvánosság előtt valótlan, becsület csorbítására alkalmas tényt állít vagy híresztel valakiről?',
    options: [
      'Közlekedési szabálysértést.',
      'Szerzői jogok megsértését.',
      'Rágalmazást vagy becsületsértést (Btk. 226. § / 227. §).',
      'Katasztrófavédelmi mulasztást.'
    ],
    correctIndex: 2,
    explanation: 'A netes pletykák, hazugságok terjesztése nem játék: a Büntető Törvénykönyv alapján rágalmazásért és becsületsértésért büntetőjogi felelősségre vonás jár!'
  },
  {
    id: 'oz_10',
    topicId: 'online_zaklatas',
    difficulty: 'nehez',
    questionText: 'Milyen jogi felelőssége van egy 14. életévét betöltött fiatalkorúnak online zaklatás, fenyegetés esetén?',
    options: [
      'Semmilyen felelőssége sincs 18 éves koráig.',
      'Csak intőt kaphat a szüleitől.',
      'Csak a telefonját tilthatják le 1 hétre.',
      'A magyar törvények szerint 14 éves kortól (egyes súlyos bűncselekményeknél 12 évtől) büntethetővé válik, és bíróság elé állítható.'
    ],
    correctIndex: 3,
    explanation: '14 éves kortól a fiatalok büntetőjogilag felelősségre vonhatók! A zaklatás miatti eljárás, próbára bocsátás vagy javítóintézeti nevelés a jövőjüket is tönkreteheti.'
  },
  {
    id: 'oz_11',
    topicId: 'online_zaklatas',
    difficulty: 'nehez',
    questionText: 'Mit jelent a „flaming” és a „trolling” a netes fórumokon?',
    options: [
      'Tűzvédelmi oktatás és horgászat.',
      'Hasznos tanácsok megosztása a házi feladathoz.',
      'Fotószerkesztési stílusirányzat.',
      'Szándékos provokáció, gyűlöletkeltés és agresszív indulatkeltés azzal a céllal, hogy felbosszantsák a többieket és tönkretegyék a beszélgetést.'
    ],
    correctIndex: 3,
    explanation: 'A netes trollok a haragodból táplálkoznak. Az aranyszabály: „Don\'t feed the troll!” – ne válaszolj nekik, jelentsd és tiltsd le őket!'
  },

  // =========================================================================
  // 6. ÁLTALÁNOS BŰNMEGELŐZÉS & 112 (11 kérdés)
  // =========================================================================
  {
    id: 'eb_1',
    topicId: 'egyeb_bunmegelozes',
    difficulty: 'konnyu',
    questionText: 'Mi az Egységes Európai Segélyhívó telefonszám Magyarországon, amit vészhelyzetben díjmentesen hívhatsz?',
    options: [
      '911',
      '123',
      '112',
      '999'
    ],
    correctIndex: 2,
    explanation: 'A 112 a nap 24 órájában ingyenesen hívható bármilyen telefonról (akár SIM kártya nélkül is), ha rendőrre, mentőre vagy tűzoltóra van szükség!'
  },
  {
    id: 'eb_2',
    topicId: 'egyeb_bunmegelozes',
    difficulty: 'konnyu',
    questionText: 'Szabad-e a 112-es segélyhívót viccből vagy unalomból felhívni?',
    options: [
      'Igen, ha utána gyorsan leteszed a kagylót.',
      'Csak délután szabad viccelődni.',
      'Igen, ha a barátaiddal vagy.',
      'SZIGORÚAN TILOS! A kamu hívások leterhelik a vonalat, miközben valaki valóban életveszélyben van, ráadásul súlyos szabálysértési bírsággal jár!'
    ],
    correctIndex: 3,
    explanation: 'A segélyhívóval szórakozni tilos és büntetendő! Amíg az operátor egy viccelődővel beszél, más ember élete múlhat a várakozáson.'
  },
  {
    id: 'eb_3',
    topicId: 'egyeb_bunmegelozes',
    difficulty: 'konnyu',
    questionText: 'Hogyan előzheted meg legbiztosabban, hogy ellopják a kerékpárodat a boltnál vagy az iskolánál?',
    options: [
      'Csak letámasztod a falhoz, úgysem viszi el senki.',
      'Egy vékony madzaggal megkötöd a kormányt.',
      'Egy masszív (pl. U-lakattal vagy vastag lánccal) a vázat és a kereket egy stabil, fix tárgyhoz (pl. biciklitárolóhoz) rögzíted.',
      'Ráírod egy papírra, hogy „Kérlek ne lopd el!”.'
    ],
    correctIndex: 2,
    explanation: 'A vékony sodronyzárakat másodpercek alatt elcsípik a tolvajok. Használj minőségi U-lakatot és rögzítsd szilárd tereptárgyhoz a biciklit!'
  },
  {
    id: 'eb_4',
    topicId: 'egyeb_bunmegelozes',
    difficulty: 'konnyu',
    questionText: 'Sötétben vagy szürkületben sétálsz vagy kerékpározol hazafelé. Mi a legfontosabb a biztonságod érdekében?',
    options: [
      'Hogy teljesen fekete ruhában legyél, mint egy nindzsa.',
      'Látni és látszani! Bekapcsolt kerékpáros lámpák, prizmák és fényvisszaverő mellény/karkötő viselése.',
      'Hogy csukott szemmel menj.',
      'Hogy ne legyen nálad semmilyen fényforrás.'
    ],
    correctIndex: 1,
    explanation: 'A láthatóság életet menthet! A fényvisszaverő mellényt viselő gyalogost az autó fényszórója már 150 méterről észleli, a sötét ruhást csak 20 méterről.'
  },
  {
    id: 'eb_5',
    topicId: 'egyeb_bunmegelozes',
    difficulty: 'kozepes',
    questionText: 'Egyedül vagy otthon, és becsönget egy idegen, aki azt mondja, hogy a vízművektől/gázművektől jött leolvasni az órát. Mit teszel?',
    options: [
      'Azonnal kinyitod az ajtót és beengeded a lakásba.',
      'Megmutatod neki, hol tartjátok a családi spórolt pénzt.',
      'Nem nyitsz ajtót idegennek! Zárt ajtón keresztül mondod, hogy a szüleid nincsenek otthon, és jöjjön vissza később, miközben felhívod a szüleidet.',
      'Elmész vele a pincébe.'
    ],
    correctIndex: 2,
    explanation: 'Soha ne engedj be idegent a lakásba, bármilyen hivatalosnak is mondja magát! A valódi szolgáltatók előre értesítést küldenek a felnőtteknek.'
  },
  {
    id: 'eb_6',
    topicId: 'egyeb_bunmegelozes',
    difficulty: 'kozepes',
    questionText: 'Mit jelent a Rendőrség „Házhoz megyünk!” és „BikeSafe” programja?',
    options: [
      'Rendőrautók házhozszállítása játéküzletből.',
      'Ingyenes bűnmegelőzési vagyonvédelmi tanácsadás a lakosságnak, illetve kerékpárok országos rendőrségi adatbázisba történő regisztrálása a lopások megelőzésére.',
      'Rendőrségi pizzarendelés.',
      'Gépjárművezetési vizsga gyerekeknek.'
    ],
    correctIndex: 1,
    explanation: 'A BikeSafe programban a rendőrség regisztrálja a kerékpár vázszámát és fotóit, így lopás esetén a megtalált bringa azonnal visszajuttatható a tulajdonosnak!'
  },
  {
    id: 'eb_7',
    topicId: 'egyeb_bunmegelozes',
    difficulty: 'kozepes',
    questionText: 'Mit kell elmondanod legelőször, amikor felhívod a 112-es segélyhívót vészhelyzetben?',
    options: [
      'A kedvenc zenédet és az időjárást.',
      'Hogy milyen jegyet kaptál ma az iskolában.',
      'PONTOSAN HOL történt a baj (város, utca, házszám, tájékozódási pont), MI történt, és HÁNY sérült van.',
      'A telefonszámlád egyenlegét.'
    ],
    correctIndex: 2,
    explanation: 'A segélyhívás alapszabálya: a HELYSZÍN a legfontosabb! Ha a vonal megszakadna, a mentők/rendőrök csak akkor tudnak indulni, ha tudják, hova kell menniük.'
  },
  {
    id: 'eb_8',
    topicId: 'egyeb_bunmegelozes',
    difficulty: 'kozepes',
    questionText: 'Zsúfolt buszon, vonaton vagy piacon utazol. Hol a legbiztonságosabb a pénztárcádat és a telefonodat tartani a zsebtolvajok ellen?',
    options: [
      'A hátizsák legkülső, nyitott cipzáras zsebében.',
      'A kabátod belső, zárt zsebében vagy magad előtt szorosan tartott táskában.',
      'A nadrágod hátsó zsebében félig kilógva.',
      'A bevásárlókocsi tetején őrizetlenül.'
    ],
    correctIndex: 1,
    explanation: 'A zsebtolvajok a tömegben a könnyen elérhető külső és hátsó zsebekre vadásznak. Mindig zárt, belső zsebben tartsd az értékeidet!'
  },
  {
    id: 'eb_9',
    topicId: 'egyeb_bunmegelozes',
    difficulty: 'nehez',
    questionText: 'Mit jelent a bűnmegelőzésben az „áldozattá válás elkerülése” (viktimológiai prevenció)?',
    options: [
      'Az áldozat hibáztatása a bűncselekményért.',
      'Olyan tudatos viselkedésformák, szokások és biztonsági intézkedések elsajátítása, amelyek minimálisra csökkentik annak az esélyét, hogy bűncselekmény célpontjává váljunk.',
      'Bírósági tárgyalások kötelező látogatása.',
      'Rendőrségi egyenruha viselése civilként.'
    ],
    correctIndex: 1,
    explanation: 'A bűnmegelőzés célja, hogy felkészültséggel, körültekintéssel és tudatossággal elejét vegyük a veszélyes helyzetek kialakulásának.'
  },
  {
    id: 'eb_10',
    topicId: 'egyeb_bunmegelozes',
    difficulty: 'nehez',
    questionText: 'Melyik hatóság felelős az áldozatsegítésért Magyarországon, ha valakit bűncselekmény károsultjaként anyagi vagy lelki kár ért?',
    options: [
      'Az Állami Számvevőszék.',
      'A Fogyasztóvédelmi Főfelügyelőség.',
      'A Nemzeti Média- és Hírközlési Hatóság.',
      'Az Igazságügyi Minisztérium Áldozatsegítő Szolgálata és Központjai (06-80-225-225 ingyenes Áldozatsegítő Vonal).'
    ],
    correctIndex: 3,
    explanation: 'Az Áldozatsegítő Központok ingyenes jogi, pszichológiai és krízishelyzet esetén azonnali pénzügyi segélyt nyújtanak a bűncselekmények áldozatainak.'
  },
  {
    id: 'eb_11',
    topicId: 'egyeb_bunmegelozes',
    difficulty: 'nehez',
    questionText: 'Mit jelent a Somogy Vármegyei Rendőr-főkapitányság Bűnmegelőzési Osztályának kiemelt prioritása, a „KiberPajzs” és a „Mátrix Projekt”?',
    options: [
      'Sci-fi filmek forgatása a Balaton partján.',
      'Országos rendőrségi és banki együttműködés a digitális csalások visszaszorítására, a lakosság tudatformálására és a csalók hálózatainak felszámolására.',
      'Új típusú számítógépes vírusok tesztelése.',
      'Ingyenes laptopok osztása iskolákban.'
    ],
    correctIndex: 1,
    explanation: 'A KiberPajzs és a Mátrix Projekt a rendőrség, a bankok és a szakhatóságok összefogása, amely a lakosságot védi a kifinomult online és telefonos csalókkal szemben.'
  }
];
