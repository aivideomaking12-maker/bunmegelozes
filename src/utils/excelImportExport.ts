import * as XLSX from 'xlsx';
import { Question, TopicId, Difficulty, DailySummary, GameRecord } from '../types';
import { TOPICS, TOPIC_LIST } from '../data/topics';

// Normalize helper
function normalizeStr(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function mapTopicStringToId(val: string): TopicId {
  const norm = normalizeStr(String(val || ''));
  if (norm.includes('csalas') || norm.includes('phishing') || norm.includes('atveres')) return 'online_csalasok';
  if (norm.includes('kiber') || norm.includes('jelszo') || norm.includes('cyber') || norm.includes('virus')) return 'kiberbiztonsag';
  if (norm.includes('media') || norm.includes('kozosseg') || norm.includes('tiktok') || norm.includes('insta')) return 'kozossegi_media';
  if (norm.includes('drog') || norm.includes('kabitoszer') || norm.includes('alkohol') || norm.includes('egeszseg')) return 'drogprevencio';
  if (norm.includes('zaklat') || norm.includes('bullying') || norm.includes('bantalmaz')) return 'online_zaklatas';
  return 'egyeb_bunmegelozes';
}

export function mapDifficultyString(val: string): Difficulty {
  const norm = normalizeStr(String(val || ''));
  if (norm.startsWith('konny') || norm === 'k' || norm === 'easy' || norm === '1') return 'konnyu';
  if (norm.startsWith('nehez') || norm === 'n' || norm === 'hard' || norm === '3') return 'nehez';
  return 'kozepes';
}

export function parseCorrectAnswer(val: unknown): number {
  if (typeof val === 'number') {
    if (val >= 1 && val <= 4) return val - 1;
    if (val >= 0 && val <= 3) return val;
  }
  const str = String(val || '').trim().toUpperCase();
  if (str === 'A' || str === '1') return 0;
  if (str === 'B' || str === '2') return 1;
  if (str === 'C' || str === '3') return 2;
  if (str === 'D' || str === '4') return 3;
  return 0;
}

export interface ImportResult {
  success: boolean;
  importedQuestions: Question[];
  totalParsed: number;
  errors: string[];
}

export async function parseExcelOrCsvFile(file: File): Promise<ImportResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const buffer = e.target?.result;
        if (!buffer) {
          resolve({ success: false, importedQuestions: [], totalParsed: 0, errors: ['A fájl üres vagy nem olvasható.'] });
          return;
        }

        const workbook = XLSX.read(buffer, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          resolve({ success: false, importedQuestions: [], totalParsed: 0, errors: ['Nem található munkalap a fájlban.'] });
          return;
        }

        const worksheet = workbook.Sheets[firstSheetName];
        const rawJson = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, { defval: '' });

        if (!rawJson || rawJson.length === 0) {
          resolve({ success: false, importedQuestions: [], totalParsed: 0, errors: ['A táblázat nem tartalmaz sorokat.'] });
          return;
        }

        const importedQuestions: Question[] = [];
        const errors: string[] = [];

        rawJson.forEach((row, idx) => {
          const rowNum = idx + 2; // header is row 1
          // Search keys flexible
          const rowKeys = Object.keys(row);
          const findVal = (...aliases: string[]): string => {
            for (const alias of aliases) {
              const normAlias = normalizeStr(alias);
              const foundKey = rowKeys.find((k) => normalizeStr(k) === normAlias || normalizeStr(k).includes(normAlias));
              if (foundKey && row[foundKey] !== undefined && row[foundKey] !== null) {
                return String(row[foundKey]).trim();
              }
            }
            return '';
          };

          const rawTopic = findVal('temakor', 'topic', 'kategoria', 'tema', 'topicid');
          const rawDiff = findVal('nehezseg', 'difficulty', 'szint');
          const questionText = findVal('kerdes', 'question', 'kerdesszoveg');
          const optA = findVal('valasz_a', 'valasza', 'opcio_a', 'opcio1', 'valasz1', 'a');
          const optB = findVal('valasz_b', 'valaszb', 'opcio_b', 'opcio2', 'valasz2', 'b');
          const optC = findVal('valasz_c', 'valaszc', 'opcio_c', 'opcio3', 'valasz3', 'c');
          const optD = findVal('valasz_d', 'valaszd', 'opcio_d', 'opcio4', 'valasz4', 'd');
          const rawCorrect = findVal('helyes', 'helyes_valasz', 'correct', 'megoldas', 'helyesindex');
          const explanation = findVal('magyarazat', 'tanacs', 'explanation', 'indoklas') || 'Bűnmegelőzési jótanács a Somogy Megyei Rendőr-főkapitányságtól.';

          if (!questionText) {
            errors.push(`${rowNum}. sor: Hiányzó kérdésszöveg.`);
            return;
          }

          const options = [optA, optB, optC, optD].filter((o) => o && o.length > 0);
          if (options.length < 2) {
            errors.push(`${rowNum}. sor: Legalább 2 válaszlehetőség kötelező (A és B).`);
            return;
          }

          const topicId = mapTopicStringToId(rawTopic);
          const difficulty = mapDifficultyString(rawDiff);
          let correctIndex = parseCorrectAnswer(rawCorrect);
          if (correctIndex >= options.length) {
            correctIndex = 0;
          }

          importedQuestions.push({
            id: `custom_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 7)}`,
            topicId,
            difficulty,
            questionText,
            options,
            correctIndex,
            explanation,
          });
        });

        if (importedQuestions.length === 0) {
          resolve({
            success: false,
            importedQuestions: [],
            totalParsed: 0,
            errors: errors.length > 0 ? errors : ['Nem sikerült felismerni érvényes kérdéseket a fájlból.'],
          });
        } else {
          resolve({
            success: true,
            importedQuestions,
            totalParsed: importedQuestions.length,
            errors,
          });
        }
      } catch (err) {
        resolve({
          success: false,
          importedQuestions: [],
          totalParsed: 0,
          errors: [`Fájl feldolgozási hiba: ${(err as Error).message}`],
        });
      }
    };

    reader.readAsBinaryString(file);
  });
}

export function exportQuestionsToExcel(questions: Question[], format: 'xlsx' | 'csv' = 'xlsx') {
  const rows = questions.map((q, idx) => {
    const topic = TOPICS[q.topicId];
    return {
      'Sorszám': idx + 1,
      'Témakör': topic ? topic.name : q.topicId,
      'Témakör_Azonosító': q.topicId,
      'Nehézség': q.difficulty === 'konnyu' ? 'könnyű (gyerek)' : q.difficulty === 'kozepes' ? 'közepes (gyerek/felnőtt)' : 'nehéz (felnőtt)',
      'Kérdés': q.questionText,
      'Válasz_A': q.options[0] || '',
      'Válasz_B': q.options[1] || '',
      'Válasz_C': q.options[2] || '',
      'Válasz_D': q.options[3] || '',
      'Helyes_Válasz': ['A', 'B', 'C', 'D'][q.correctIndex] || 'A',
      'Magyarázat_Megelőzési_Tanács': q.explanation,
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Kérdésbank');

  const filename = `SMRFK_Bunmegelozes_Kerdesbank_${new Date().toISOString().slice(0, 10)}.${format}`;
  XLSX.writeFile(workbook, filename, { bookType: format });
}

export function downloadTemplateFile(format: 'xlsx' | 'csv' = 'xlsx') {
  const sampleRows = [
    {
      'Témakör': 'Online csalások',
      'Nehézség': 'könnyű',
      'Kérdés': 'Szabad-e ismeretlen küldőtől érkező SMS linkre kattintani?',
      'Válasz_A': 'Igen, bármikor',
      'Válasz_B': 'Nem, mert adathalász csalás lehet',
      'Válasz_C': 'Csak este 8 után',
      'Válasz_D': 'Csak hétvégén',
      'Helyes_Válasz': 'B',
      'Magyarázat': 'A kéretlen csomagküldős SMS linkek veszélyes vírusokat vagy adathalász oldalakat tartalmaznak.',
    },
    {
      'Témakör': 'Kiberbiztonság',
      'Nehézség': 'közepes',
      'Kérdés': 'Miért hasznos a kétlépcsős azonosítás (2FA)?',
      'Válasz_A': 'Mert kétszer olyan gyors lesz a gép',
      'Válasz_B': 'Mert jelszólopás esetén is megvédi a fiókot a második kód',
      'Válasz_C': 'Mert törli a vírusokat automatikusan',
      'Válasz_D': 'Mert nem kell többé jelszó',
      'Helyes_Válasz': 'B',
      'Magyarázat': 'A kétlépcsős azonosítás a leghatékonyabb védelem a fiókfeltörések ellen.',
    },
    {
      'Témakör': 'Drogprevenció',
      'Nehézség': 'könnyű',
      'Kérdés': 'Mit teszel, ha egy buliban ismeretlen szerrel kínálnak?',
      'Válasz_A': 'Kipróbálom, hogy menő legyek',
      'Válasz_B': 'Határozottan nemet mondok és eljövök onnan',
      'Válasz_C': 'Zsebre teszem későbbre',
      'Válasz_D': 'Odaadom a barátomnak',
      'Helyes_Válasz': 'B',
      'Magyarázat': 'Az igazi bátorság a nemet mondás képessége. Ismeretlen szert sose fogadj el!',
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleRows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Minta_Kerdesek');

  const filename = `SMRFK_Kerdesbank_Minta.${format}`;
  XLSX.writeFile(workbook, filename, { bookType: format });
}

export function exportDailyStatsToExcel(summary: DailySummary, games: GameRecord[], format: 'xlsx' | 'csv' = 'xlsx') {
  const workbook = XLSX.utils.book_new();

  // Sheet 1: Daily summary overview
  const summaryRows = [
    { 'Mutató': 'Dátum', 'Érték': summary.date },
    { 'Mutató': 'Összes lejátszott játék', 'Érték': summary.totalGames },
    { 'Mutató': 'Gyerek játékosok száma', 'Érték': summary.childGames },
    { 'Mutató': 'Felnőtt játékosok száma', 'Érték': summary.adultGames },
    { 'Mutató': 'Sikeres kitöltések (>= 80%)', 'Érték': summary.passedGames },
    { 'Mutató': 'Sikeres kitöltési arány', 'Érték': `${summary.totalGames > 0 ? Math.round((summary.passedGames / summary.totalGames) * 100) : 0}%` },
    { 'Mutató': 'Átlagos elért pontszám', 'Érték': `${summary.averagePercentage}%` },
  ];
  const summarySheet = XLSX.utils.json_to_sheet(summaryRows);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Napi Összesítő');

  // Sheet 2: Topic stats
  const topicRows = TOPIC_LIST.map((t) => {
    const stats = summary.topicStats[t.id] || { answeredCount: 0, correctCount: 0 };
    const rate = stats.answeredCount > 0 ? Math.round((stats.correctCount / stats.answeredCount) * 100) : 0;
    return {
      'Témakör': t.name,
      'Megválaszolt kérdések száma': stats.answeredCount,
      'Helyes válaszok száma': stats.correctCount,
      'Helyességi arány (%)': `${rate}%`,
    };
  });
  const topicSheet = XLSX.utils.json_to_sheet(topicRows);
  XLSX.utils.book_append_sheet(workbook, topicSheet, 'Témakör Statisztika');

  // Sheet 3: Individual games today
  const gameRows = games.map((g, idx) => ({
    'Játék sorszám': idx + 1,
    'Időpont': new Date(g.timestamp).toLocaleTimeString('hu-HU'),
    'Korcsoport': g.playerRole === 'gyerek' ? 'Gyerek' : 'Felnőtt',
    'Kérdések száma': g.totalQuestions,
    'Helyes válaszok': g.score,
    'Eredmény (%)': `${g.percentage}%`,
    'Kitüntetést szerzett (>=80%)': g.passed ? 'IGEN (Kiváló)' : 'Nem',
  }));
  const gamesSheet = XLSX.utils.json_to_sheet(gameRows);
  XLSX.utils.book_append_sheet(workbook, gamesSheet, 'Mai Játékok Részletesen');

  const filename = `SMRFK_Napi_Kimutatas_${summary.date}.${format}`;
  XLSX.writeFile(workbook, filename, { bookType: format });
}
