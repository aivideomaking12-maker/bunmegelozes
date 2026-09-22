import { Question, GameSettings, GameRecord, DailySummary, TopicId } from '../types';
import { DEFAULT_QUESTIONS } from '../data/defaultQuestions';
import { TOPIC_LIST } from '../data/topics';

const QUESTIONS_KEY = 'smrfk_prevention_questions_v1';
const SETTINGS_KEY = 'smrfk_prevention_settings_v1';
const HISTORY_KEY = 'smrfk_prevention_history_v1';

export const DEFAULT_SETTINGS: GameSettings = {
  questionCount: 3,
  soundEnabled: true,
  adminPin: '12345',
};

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function loadQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(QUESTIONS_KEY);
    if (!raw) {
      saveQuestions(DEFAULT_QUESTIONS);
      return DEFAULT_QUESTIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_QUESTIONS;
  } catch (err) {
    console.error('Failed to load questions from storage', err);
    return DEFAULT_QUESTIONS;
  }
}

export function saveQuestions(questions: Question[]): void {
  try {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
  } catch (err) {
    console.error('Failed to save questions to storage', err);
  }
}

export function resetQuestionsToDefault(): Question[] {
  saveQuestions(DEFAULT_QUESTIONS);
  return DEFAULT_QUESTIONS;
}

export function loadSettings(): GameSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: GameSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings', err);
  }
}

export function loadGameHistory(): GameRecord[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveGameRecord(record: GameRecord): void {
  try {
    const history = loadGameHistory();
    history.unshift(record); // newest first
    // keep last 500 records
    const trimmed = history.slice(0, 500);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (err) {
    console.error('Failed to save game record', err);
  }
}

export function getDailySummary(dateStr: string = getTodayDateString()): DailySummary {
  const history = loadGameHistory();
  const todayGames = history.filter((g) => g.dateStr === dateStr);

  const topicStats: DailySummary['topicStats'] = {
    online_csalasok: { spunCount: 0, answeredCount: 0, correctCount: 0 },
    kiberbiztonsag: { spunCount: 0, answeredCount: 0, correctCount: 0 },
    kozossegi_media: { spunCount: 0, answeredCount: 0, correctCount: 0 },
    drogprevencio: { spunCount: 0, answeredCount: 0, correctCount: 0 },
    online_zaklatas: { spunCount: 0, answeredCount: 0, correctCount: 0 },
    egyeb_bunmegelozes: { spunCount: 0, answeredCount: 0, correctCount: 0 },
  };

  let totalScoreSum = 0;
  let childGames = 0;
  let adultGames = 0;
  let passedGames = 0;

  todayGames.forEach((game) => {
    if (game.playerRole === 'gyerek') childGames++;
    else adultGames++;

    if (game.passed) passedGames++;
    totalScoreSum += game.percentage;

    game.answers.forEach((ans) => {
      if (topicStats[ans.topicId]) {
        topicStats[ans.topicId].answeredCount++;
        if (ans.isCorrect) {
          topicStats[ans.topicId].correctCount++;
        }
      }
    });
  });

  const totalGames = todayGames.length;
  const averagePercentage = totalGames > 0 ? Math.round(totalScoreSum / totalGames) : 0;

  return {
    date: dateStr,
    totalGames,
    childGames,
    adultGames,
    passedGames,
    averagePercentage,
    topicStats,
  };
}

export function clearTodayHistory(): void {
  try {
    const today = getTodayDateString();
    const history = loadGameHistory();
    const filtered = history.filter((g) => g.dateStr !== today);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to clear today history', err);
  }
}
