import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  PlayerRole,
  TopicId,
  Question,
  GameAnswer,
  GameRecord,
  GameSettings,
  DailySummary,
} from './types';
import { RoleSelectScreen } from './components/RoleSelectScreen';
import { FortuneWheel } from './components/FortuneWheel';
import { QuizCard } from './components/QuizCard';
import { ResultsScreen } from './components/ResultsScreen';
import { AdminPanel } from './components/AdminPanel';
import { LiquidBackground } from './components/LiquidBackground';
import {
  loadQuestions,
  saveQuestions,
  resetQuestionsToDefault,
  loadSettings,
  saveSettings,
  saveGameRecord,
  getDailySummary,
  getTodayDateString,
  loadGameHistory,
} from './utils/storage';
import { Settings, Volume2, VolumeX } from 'lucide-react';

type GameStage = 'role_select' | 'wheel' | 'quiz' | 'results';

export default function App() {
  // State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [settings, setSettings] = useState<GameSettings>(loadSettings());
  const [stage, setStage] = useState<GameStage>('role_select');
  const [playerRole, setPlayerRole] = useState<PlayerRole>('gyerek');

  // In-game round state
  const [answers, setAnswers] = useState<GameAnswer[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [completedRecord, setCompletedRecord] = useState<GameRecord | null>(null);

  // Admin Modal state
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [adminInitialTab, setAdminInitialTab] = useState<'settings' | 'questions' | 'import' | 'stats'>('settings');

  // Daily statistics state
  const [dailySummary, setDailySummary] = useState<DailySummary>(getDailySummary());
  const [allTodayGames, setAllTodayGames] = useState<GameRecord[]>([]);

  // Load questions on mount
  useEffect(() => {
    const loadedQ = loadQuestions();
    setQuestions(loadedQ);
    refreshDailyStats();
  }, []);

  const refreshDailyStats = useCallback(() => {
    const summary = getDailySummary();
    const history = loadGameHistory();
    const today = getTodayDateString();
    const todayGames = history.filter((g) => g.dateStr === today);
    setDailySummary(summary);
    setAllTodayGames(todayGames);
  }, []);

  // Update Settings
  const handleSaveSettings = (newSettings: GameSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  // Toggle Sound
  const handleToggleSound = () => {
    const updated = { ...settings, soundEnabled: !settings.soundEnabled };
    handleSaveSettings(updated);
  };

  // Update Questions
  const handleUpdateQuestions = (updated: Question[]) => {
    setQuestions(updated);
    saveQuestions(updated);
  };

  // Reset Questions to Default
  const handleResetQuestions = () => {
    const defaults = resetQuestionsToDefault();
    setQuestions(defaults);
  };

  // Open Admin Panel with specific tab
  const handleOpenAdmin = (tab: 'settings' | 'questions' | 'import' | 'stats' = 'settings') => {
    setAdminInitialTab(tab);
    setIsAdminOpen(true);
  };

  // Start new game with chosen role
  const handleSelectRole = (role: PlayerRole) => {
    setPlayerRole(role);
    setAnswers([]);
    setActiveQuestion(null);
    setCompletedRecord(null);
    setStage('wheel');
  };

  // Reset to initial screen
  const handleResetToHome = () => {
    if (stage === 'wheel' || stage === 'quiz') {
      if (!window.confirm('Biztosan visszalépsz a kezdőképernyőre?')) {
        return;
      }
    }
    setStage('role_select');
    setAnswers([]);
    setActiveQuestion(null);
    setCompletedRecord(null);
  };

  // Filter eligible questions for the current player role and topics
  const eligibleQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (playerRole === 'gyerek') {
        return q.difficulty === 'konnyu' || q.difficulty === 'kozepes';
      } else {
        return q.difficulty === 'kozepes' || q.difficulty === 'nehez';
      }
    });
  }, [questions, playerRole]);

  // Questions already used in this round
  const usedQuestionIds = useMemo(() => {
    return new Set(answers.map((a) => a.questionId));
  }, [answers]);

  // Available topics that have unused questions
  const availableTopicIds = useMemo(() => {
    const unused = eligibleQuestions.filter((q) => !usedQuestionIds.has(q.id));
    const topicsWithQuestions = new Set(unused.map((q) => q.topicId));
    return Array.from(topicsWithQuestions);
  }, [eligibleQuestions, usedQuestionIds]);

  // When Fortune Wheel lands on a topic
  const handleSelectTopicFromWheel = (topicId: TopicId) => {
    let candidates = eligibleQuestions.filter(
      (q) => q.topicId === topicId && !usedQuestionIds.has(q.id)
    );

    if (candidates.length === 0) {
      candidates = eligibleQuestions.filter((q) => q.topicId === topicId);
    }

    if (candidates.length === 0) {
      candidates = questions.filter((q) => q.topicId === topicId);
    }

    if (candidates.length === 0) {
      candidates = questions;
    }

    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    setActiveQuestion(chosen);
    setStage('quiz');
  };

  // When player answers a question
  const handleAnswerSubmit = (answer: GameAnswer) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    // Check if round is finished (reached configured 3 or 5 questions)
    if (updatedAnswers.length >= settings.questionCount) {
      const score = updatedAnswers.filter((a) => a.isCorrect).length;
      const total = updatedAnswers.length;
      const percentage = Math.round((score / total) * 100);
      const passed = percentage >= 80;

      const record: GameRecord = {
        id: `game_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        timestamp: Date.now(),
        dateStr: getTodayDateString(),
        playerRole,
        totalQuestions: total,
        score,
        percentage,
        passed,
        answers: updatedAnswers,
      };

      saveGameRecord(record);
      setCompletedRecord(record);
      refreshDailyStats();
      setStage('results');
    } else {
      setActiveQuestion(null);
      setStage('wheel');
    }
  };

  return (
    <div className="relative min-h-screen text-slate-800 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-900 overflow-x-hidden">
      {/* Animated Liquid Background with customizable image & clouds */}
      <LiquidBackground />

      {/* Floating Minimalist Utility Bar (No bulky header) */}
      <nav className="relative z-20 w-full px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-end pointer-events-auto">
        {/* Right: Sound toggle and Admin Icon Button (Stats inside Admin) */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            id="global-sound-toggle-btn"
            onClick={handleToggleSound}
            className="p-2.5 rounded-2xl bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 border border-white/80 shadow-md shadow-sky-500/10 backdrop-blur-md transition-all transform hover:scale-105 active:scale-95"
            title={settings.soundEnabled ? 'Hanghatások némítása' : 'Hanghatások bekapcsolása'}
          >
            {settings.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Settings Floating Icon */}
          <button
            id="open-admin-icon-btn"
            onClick={() => handleOpenAdmin('settings')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/85 hover:bg-white text-slate-700 hover:text-sky-700 border border-white/80 shadow-md shadow-sky-500/10 backdrop-blur-md font-bold text-xs sm:text-sm transition-all transform hover:scale-105 active:scale-95 group"
            title="Beállítások"
          >
            <Settings className="w-4 h-4 text-sky-600 group-hover:rotate-45 transition-transform" />
            <span className="hidden sm:inline">Beállítások</span>
          </button>
        </div>
      </nav>

      {/* Main Content View Switcher */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center py-2 sm:py-6">
        {stage === 'role_select' && (
          <RoleSelectScreen
            onSelectRole={handleSelectRole}
          />
        )}

        {stage === 'wheel' && (
          <FortuneWheel
            onSelectTopic={handleSelectTopicFromWheel}
            soundEnabled={settings.soundEnabled}
            playerRole={playerRole}
            questionIndex={answers.length}
            totalQuestions={settings.questionCount}
            currentScore={answers.filter((a) => a.isCorrect).length}
            availableTopicIds={availableTopicIds}
          />
        )}

        {stage === 'quiz' && activeQuestion && (
          <QuizCard
            question={activeQuestion}
            questionNumber={answers.length + 1}
            totalQuestions={settings.questionCount}
            soundEnabled={settings.soundEnabled}
            playerRole={playerRole}
            currentScore={answers.filter((a) => a.isCorrect).length}
            onAnswerSubmit={handleAnswerSubmit}
          />
        )}

        {stage === 'results' && completedRecord && (
          <ResultsScreen
            record={completedRecord}
            soundEnabled={settings.soundEnabled}
            onRestartGame={() => setStage('role_select')}
          />
        )}
      </main>

      {/* Admin Panel Modal */}
      {isAdminOpen && (
        <AdminPanel
          initialTab={adminInitialTab}
          settings={settings}
          questions={questions}
          summary={dailySummary}
          allTodayGames={allTodayGames}
          onSaveSettings={handleSaveSettings}
          onUpdateQuestions={handleUpdateQuestions}
          onResetQuestions={handleResetQuestions}
          onRefreshStats={refreshDailyStats}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {/* Cheerful Minimalist Footer */}
      <footer className="relative z-10 w-full py-2.5 px-4 text-center text-[11px] sm:text-xs text-slate-500 bg-white/40 backdrop-blur-sm border-t border-white/50">
        <span>Somogy Megyei Rendőr-főkapitányság • Bűnmegelőzési Osztály • Készítette: H. Valentin </span>
      </footer>
    </div>
  );
}
