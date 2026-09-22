export type TopicId =
  | 'online_csalasok'
  | 'kiberbiztonsag'
  | 'kozossegi_media'
  | 'drogprevencio'
  | 'online_zaklatas'
  | 'egyeb_bunmegelozes';

export type Difficulty = 'konnyu' | 'kozepes' | 'nehez';

export type PlayerRole = 'gyerek' | 'felnot';

export interface TopicInfo {
  id: TopicId;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  emoji: string;
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  gradient: string;
}

export interface Question {
  id: string;
  topicId: TopicId;
  difficulty: Difficulty;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GameAnswer {
  questionId: string;
  topicId: TopicId;
  questionText: string;
  selectedOptionIndex: number;
  correctOptionIndex: number;
  isCorrect: boolean;
  explanation: string;
}

export interface GameRecord {
  id: string;
  timestamp: number;
  dateStr: string; // YYYY-MM-DD
  playerRole: PlayerRole;
  totalQuestions: number;
  score: number;
  percentage: number;
  passed: boolean; // >= 80%
  answers: GameAnswer[];
}

export interface GameSettings {
  questionCount: 3 | 5;
  soundEnabled: boolean;
  adminPin: string;
}

export interface DailySummary {
  date: string;
  totalGames: number;
  childGames: number;
  adultGames: number;
  passedGames: number; // >=80%
  averagePercentage: number;
  topicStats: Record<TopicId, {
    spunCount: number;
    answeredCount: number;
    correctCount: number;
  }>;
}
