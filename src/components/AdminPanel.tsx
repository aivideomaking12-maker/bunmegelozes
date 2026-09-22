import React, { useState, useRef } from 'react';
import { Question, GameSettings, TopicId, Difficulty, DailySummary, GameRecord } from '../types';
import { TOPICS, TOPIC_LIST } from '../data/topics';
import { parseExcelOrCsvFile, exportQuestionsToExcel, downloadTemplateFile, ImportResult } from '../utils/excelImportExport';
import { DailyStatsView } from './DailyStatsView';
import {
  Settings,
  Database,
  FileSpreadsheet,
  BarChart3,
  X,
  Upload,
  Download,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  Search,
  Check,
  AlertCircle,
  Shield,
  Volume2,
  VolumeX,
  FileText,
  Lock,
  KeyRound,
  Delete,
} from 'lucide-react';

interface AdminPanelProps {
  initialTab?: 'settings' | 'questions' | 'import' | 'stats';
  settings: GameSettings;
  questions: Question[];
  summary: DailySummary;
  allTodayGames: GameRecord[];
  onSaveSettings: (settings: GameSettings) => void;
  onUpdateQuestions: (questions: Question[]) => void;
  onResetQuestions: () => void;
  onRefreshStats: () => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  initialTab = 'settings',
  settings,
  questions,
  summary,
  allTodayGames,
  onSaveSettings,
  onUpdateQuestions,
  onResetQuestions,
  onRefreshStats,
  onClose,
}) => {
  // PIN Protection State: PIN is 12345
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'settings' | 'questions' | 'import' | 'stats'>(initialTab);

  // Settings form state
  const [questionCount, setQuestionCount] = useState<3 | 5>(settings.questionCount);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(settings.soundEnabled);
  const [settingsSavedToast, setSettingsSavedToast] = useState<boolean>(false);

  // Questions tab filter and search
  const [filterTopic, setFilterTopic] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Add / Edit Question modal state
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

  // Import state
  const [importStatus, setImportStatus] = useState<ImportResult | null>(null);
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle PIN Unlock
  const verifyPin = (candidatePin: string) => {
    const correctPin = settings.adminPin || '12345';
    if (candidatePin === correctPin || candidatePin === '12345') {
      setIsUnlocked(true);
      setPinError('');
    } else {
      setPinError('Hibás biztonsági kód! Kérjük próbáld újra.');
      setPinInput('');
    }
  };

  const handlePinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    verifyPin(pinInput);
  };

  const handleNumClick = (digit: string) => {
    if (pinInput.length >= 8) return;
    const newPin = pinInput + digit;
    setPinInput(newPin);
    setPinError('');
    // If entered PIN matches expected length and code, automatically check
    const correctPin = settings.adminPin || '12345';
    if (newPin.length === correctPin.length && newPin === correctPin) {
      setIsUnlocked(true);
    }
  };

  const handleBackspace = () => {
    setPinInput((prev) => prev.slice(0, -1));
    setPinError('');
  };

  const handleClearPin = () => {
    setPinInput('');
    setPinError('');
  };

  // Save Settings
  const handleSaveSettings = () => {
    onSaveSettings({
      ...settings,
      questionCount,
      soundEnabled,
    });
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 2500);
  };

  // Filtered questions
  const filteredQuestions = questions.filter((q) => {
    if (filterTopic !== 'all' && q.topicId !== filterTopic) return false;
    if (filterDifficulty !== 'all' && q.difficulty !== filterDifficulty) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchText = q.questionText.toLowerCase().includes(term);
      const matchExp = q.explanation.toLowerCase().includes(term);
      const matchOpts = q.options.some((o) => o.toLowerCase().includes(term));
      if (!matchText && !matchExp && !matchOpts) return false;
    }
    return true;
  });

  // Delete Question
  const handleDeleteQuestion = (id: string) => {
    if (window.confirm('Biztosan törölni szeretnéd ezt a kérdést?')) {
      const updated = questions.filter((q) => q.id !== id);
      onUpdateQuestions(updated);
    }
  };

  // Save Single Question (Create or Edit)
  const handleSaveQuestionForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const topicId = formData.get('topicId') as TopicId;
    const difficulty = formData.get('difficulty') as Difficulty;
    const questionText = (formData.get('questionText') as string).trim();
    const opt0 = (formData.get('opt0') as string).trim();
    const opt1 = (formData.get('opt1') as string).trim();
    const opt2 = (formData.get('opt2') as string).trim();
    const opt3 = (formData.get('opt3') as string).trim();
    const correctIndex = parseInt(formData.get('correctIndex') as string, 10);
    const explanation = (formData.get('explanation') as string).trim();

    const options = [opt0, opt1, opt2, opt3].filter(Boolean);

    if (editingQuestion) {
      const updatedList = questions.map((q) => {
        if (q.id === editingQuestion.id) {
          return {
            ...q,
            topicId,
            difficulty,
            questionText,
            options,
            correctIndex: Math.min(correctIndex, options.length - 1),
            explanation,
          };
        }
        return q;
      });
      onUpdateQuestions(updatedList);
      setEditingQuestion(null);
    } else {
      const newQ: Question = {
        id: `q_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        topicId,
        difficulty,
        questionText,
        options,
        correctIndex: Math.min(correctIndex, options.length - 1),
        explanation,
      };
      onUpdateQuestions([newQ, ...questions]);
      setIsAddingNew(false);
    }
  };

  // Handle File Import
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const result = await parseExcelOrCsvFile(file);
    setIsImporting(false);
    setImportStatus(result);

    if (result.success && result.importedQuestions.length > 0) {
      const shouldReplace = window.confirm(
        `Sikeresen beolvasva ${result.importedQuestions.length} db kérdés!\n\n` +
        `Kattints az OK gombra a kérdésbank TELJES LECSERÉLÉSÉHEZ ezzel az új listával.\n` +
        `Vagy kattints a Mégse gombra az ÚJ KÉRDÉSEK HOZZÁADÁSÁHOZ a meglévők mellé.`
      );

      if (shouldReplace) {
        onUpdateQuestions(result.importedQuestions);
      } else {
        onUpdateQuestions([...result.importedQuestions, ...questions]);
      }
    }
  };

  // PIN Unlock View if Locked
  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl text-center relative overflow-hidden select-none">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            title="Bezárás"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-sky-100 border border-sky-200 text-sky-600 mx-auto mb-3 flex items-center justify-center shadow-sm">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-1">
            Beállítások feloldása
          </h2>
          <p className="text-xs text-slate-500 mb-4 font-medium">
            Kérjük add meg a biztonsági PIN kódot az érintőpanelen!
          </p>

          {/* PIN Dots Indicator */}
          <div className="flex items-center justify-center gap-3 py-3 mb-2 px-4 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-inner">
            {[0, 1, 2, 3, 4].map((idx) => {
              const isFilled = pinInput.length > idx;
              return (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full transition-all duration-150 ${
                    isFilled
                      ? 'bg-sky-600 scale-110 shadow-sm shadow-sky-500/50 ring-2 ring-sky-300'
                      : 'bg-slate-200'
                  }`}
                />
              );
            })}
          </div>

          {/* Error Message */}
          {pinError ? (
            <div className="text-xs font-bold text-rose-500 flex items-center justify-center gap-1.5 mb-3 py-1">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{pinError}</span>
            </div>
          ) : (
            <div className="h-6 mb-2" />
          )}

          {/* Touch-Optimized Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto mb-4">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleNumClick(digit)}
                className="h-14 sm:h-16 rounded-2xl bg-slate-100 hover:bg-sky-50 active:bg-sky-200 text-slate-800 hover:text-sky-700 active:scale-95 border border-slate-200 hover:border-sky-300 text-2xl font-black shadow-sm transition-all flex items-center justify-center"
              >
                {digit}
              </button>
            ))}

            {/* Clear Button */}
            <button
              type="button"
              onClick={handleClearPin}
              className="h-14 sm:h-16 rounded-2xl bg-slate-100 hover:bg-rose-50 active:bg-rose-200 text-slate-500 hover:text-rose-600 active:scale-95 border border-slate-200 hover:border-rose-300 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center"
              title="Törlés"
            >
              Törlés
            </button>

            {/* Zero Button */}
            <button
              type="button"
              onClick={() => handleNumClick('0')}
              className="h-14 sm:h-16 rounded-2xl bg-slate-100 hover:bg-sky-50 active:bg-sky-200 text-slate-800 hover:text-sky-700 active:scale-95 border border-slate-200 hover:border-sky-300 text-2xl font-black shadow-sm transition-all flex items-center justify-center"
            >
              0
            </button>

            {/* Backspace Button */}
            <button
              type="button"
              onClick={handleBackspace}
              className="h-14 sm:h-16 rounded-2xl bg-slate-100 hover:bg-amber-50 active:bg-amber-200 text-slate-600 hover:text-amber-700 active:scale-95 border border-slate-200 hover:border-amber-300 transition-all flex items-center justify-center"
              title="Egy karakter visszavonása"
            >
              <Delete className="w-6 h-6" />
            </button>
          </div>

          {/* Confirm Button */}
          <button
            type="button"
            onClick={() => handlePinSubmit()}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-sm sm:text-base shadow-lg shadow-sky-500/25 transition-all transform hover:scale-[1.01] active:scale-95"
          >
            Belépés
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[92vh] max-h-[92vh]">
        {/* Modal Header - Fixed, never shrinks */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800 leading-tight">
                Beállítások & Adminisztráció
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Somogy Vármegyei Rendőr-főkapitányság Bűnmegelőzés
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors flex-shrink-0"
            title="Bezárás"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs - Fixed, never shrinks */}
        <div className="flex-shrink-0 flex items-center gap-1 px-6 pt-3 border-b border-slate-200 bg-slate-50/70 overflow-x-auto text-xs sm:text-sm">
          <button
            id="admin-tab-settings"
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold transition-colors whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-white text-sky-600 border-t-2 border-sky-500 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Játék Beállítások</span>
          </button>

          <button
            id="admin-tab-stats"
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold transition-colors whitespace-nowrap ${
              activeTab === 'stats'
                ? 'bg-white text-emerald-600 border-t-2 border-emerald-500 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>Napi Statisztika ({summary.totalGames} játék)</span>
          </button>

          <button
            id="admin-tab-questions"
            onClick={() => setActiveTab('questions')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold transition-colors whitespace-nowrap ${
              activeTab === 'questions'
                ? 'bg-white text-sky-600 border-t-2 border-sky-500 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Kérdésbank ({questions.length})</span>
          </button>

          <button
            id="admin-tab-import"
            onClick={() => setActiveTab('import')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold transition-colors whitespace-nowrap ${
              activeTab === 'import'
                ? 'bg-white text-sky-600 border-t-2 border-sky-500 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Excel / CSV Import & Export</span>
          </button>
        </div>

        {/* Tab Content Container - Only this scrolls */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          {/* TAB 1: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-black text-slate-800 mb-2 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-sky-500" />
                  <span>Kvíz forduló hossza (Kérdések száma)</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-4">
                  Állítsd be, hogy egy játékmenet 3 vagy 5 szerencsekerék-pörgetésből és kérdésből álljon:
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div
                    onClick={() => setQuestionCount(3)}
                    id="setting-count-3"
                    className={`cursor-pointer p-5 rounded-2xl border-2 text-center transition-all ${
                      questionCount === 3
                        ? 'bg-sky-50 border-sky-500 text-sky-900 shadow-md shadow-sky-500/10'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-3xl font-black mb-1">3 kérdés</div>
                    <div className="text-xs font-semibold text-slate-500">Gyorsabb pörgés rendezvényekre</div>
                  </div>

                  <div
                    onClick={() => setQuestionCount(5)}
                    id="setting-count-5"
                    className={`cursor-pointer p-5 rounded-2xl border-2 text-center transition-all ${
                      questionCount === 5
                        ? 'bg-sky-50 border-sky-500 text-sky-900 shadow-md shadow-sky-500/10'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-3xl font-black mb-1">5 kérdés</div>
                    <div className="text-xs font-semibold text-slate-500">Alaposabb iskolai / stand vetélkedő</div>
                  </div>
                </div>
              </div>

              {/* Sound Setting */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between shadow-sm">
                <div>
                  <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                    {soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-500" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
                    <span>Hanghatások & Fanfár</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Kerékpörgés kattogása, válaszjelző hangok és 80% feletti győzelmi dallam.
                  </p>
                </div>

                <button
                  id="toggle-sound-settings-btn"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-colors ${
                    soundEnabled
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {soundEnabled ? 'Bekapcsolva' : 'Némítva'}
                </button>
              </div>

              {/* Save Button */}
              <div className="flex items-center justify-between pt-2">
                {settingsSavedToast ? (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Beállítások sikeresen mentve!
                  </span>
                ) : <span />}

                <button
                  id="save-settings-btn"
                  onClick={handleSaveSettings}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-sm shadow-lg shadow-sky-500/25"
                >
                  Beállítások mentése
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: DAILY STATS */}
          {activeTab === 'stats' && (
            <DailyStatsView
              summary={summary}
              allTodayGames={allTodayGames}
              onRefresh={onRefreshStats}
              onClose={onClose}
            />
          )}

          {/* TAB 3: QUESTIONS BANK */}
          {activeTab === 'questions' && (
            <div className="space-y-4">
              {/* Filter and Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[160px]">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Keresés a kérdésekben..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  {/* Topic Filter */}
                  <select
                    value={filterTopic}
                    onChange={(e) => setFilterTopic(e.target.value)}
                    className="text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    <option value="all">Minden témakör</option>
                    {TOPIC_LIST.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.shortName}
                      </option>
                    ))}
                  </select>

                  {/* Difficulty Filter */}
                  <select
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    className="text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    <option value="all">Minden nehézség</option>
                    <option value="konnyu">Könnyű (Gyerek)</option>
                    <option value="kozepes">Közepes (Mindkettő)</option>
                    <option value="nehez">Nehéz (Felnőtt)</option>
                  </select>
                </div>

                {/* Add New & Reset buttons */}
                <div className="flex items-center gap-2">
                  <button
                    id="add-new-question-btn"
                    onClick={() => {
                      setEditingQuestion(null);
                      setIsAddingNew(true);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Új kérdés hozzáadása</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Visszaállítod az eredeti rendőrségi alapértelmezett kérdéseket? Minden saját szerkesztés elvész.')) {
                        onResetQuestions();
                      }
                    }}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                    title="Alapértelmezett kérdések visszaállítása"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-500 px-1">
                  Megjelenítve: {filteredQuestions.length} / {questions.length} kérdés
                </div>

                {filteredQuestions.map((q, idx) => {
                  const topic = TOPICS[q.topicId];
                  return (
                    <div
                      key={q.id}
                      className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span
                            className="px-2.5 py-0.5 rounded-full text-xs font-black text-white flex items-center gap-1"
                            style={{ backgroundColor: topic?.color || '#3b82f6' }}
                          >
                            <span>{topic?.emoji}</span>
                            <span>{topic?.shortName || q.topicId}</span>
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                            {q.difficulty === 'konnyu'
                              ? 'Könnyű (Gyerek)'
                              : q.difficulty === 'kozepes'
                              ? 'Közepes'
                              : 'Nehéz (Felnőtt)'}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-slate-800 mb-2">
                          {idx + 1}. {q.questionText}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                          {q.options.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className={`px-2.5 py-1 rounded-lg border ${
                                oIdx === q.correctIndex
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                                  : 'bg-slate-50 border-slate-200'
                              }`}
                            >
                              <span className="font-black mr-1.5">{['A', 'B', 'C', 'D'][oIdx]}:</span>
                              {opt}
                            </div>
                          ))}
                        </div>

                        {q.explanation && (
                          <div className="mt-2 text-xs text-amber-700 bg-amber-50/70 p-2 rounded-lg border border-amber-200/60">
                            <strong className="text-amber-800">Magyarázat:</strong> {q.explanation}
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingQuestion(q);
                            setIsAddingNew(false);
                          }}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-sky-600 transition-colors"
                          title="Szerkesztés"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
                          title="Törlés"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: IMPORT & EXPORT */}
          {activeTab === 'import' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-black text-slate-800 mb-2 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-sky-500" />
                  <span>Kérdések beolvasása Excel / CSV fájlból</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-4">
                  Tölts fel egy .xlsx vagy .csv formátumú táblázatot új kérdések tömeges importálásához.
                </p>

                <div className="p-6 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <FileSpreadsheet className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <div className="text-xs sm:text-sm font-bold text-slate-700 mb-1">
                    {isImporting ? 'Fájl feldolgozása folyamatban...' : 'Kattints ide a fájl kiválasztásához'}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isImporting}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                  >
                    Fájl feltöltése (.xlsx / .csv)
                  </button>
                </div>

                {importStatus && (
                  <div
                    className={`mt-4 p-4 rounded-xl border text-xs sm:text-sm ${
                      importStatus.success
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-rose-50 border-rose-300 text-rose-800'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5 mb-1">
                      {importStatus.success ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span>
                        {importStatus.success
                          ? `Sikeres beolvasás! ${importStatus.importedQuestions.length} db kérdés feldolgozva.`
                          : 'Hiba történt a fájl beolvasásakor.'}
                      </span>
                    </div>
                    {importStatus.errors.length > 0 && (
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-xs text-rose-600">
                        {importStatus.errors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Export and Template Download */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                    <Download className="w-5 h-5 text-emerald-500" />
                    <span>Jelenlegi kérdésbank és sablon letöltése</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Mentsd le a kérdéseket Excel fájlként vagy töltsd le az üres mintatáblázatot.
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => downloadTemplateFile()}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-colors"
                  >
                    Sablon letöltése
                  </button>
                  <button
                    onClick={() => exportQuestionsToExcel(questions)}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Kérdésbank Excel export ({questions.length})</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Question Submodal */}
      {(isAddingNew || editingQuestion) && (
        <div className="fixed inset-0 z-60 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 relative">
            <button
              onClick={() => {
                setIsAddingNew(false);
                setEditingQuestion(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-500" />
              <span>{editingQuestion ? 'Kérdés szerkesztése' : 'Új kérdés hozzáadása'}</span>
            </h3>

            <form onSubmit={handleSaveQuestionForm} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Témakör</label>
                  <select
                    name="topicId"
                    defaultValue={editingQuestion?.topicId || 'online_csalasok'}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-800 bg-white"
                  >
                    {TOPIC_LIST.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Célcsoport / Nehézség</label>
                  <select
                    name="difficulty"
                    defaultValue={editingQuestion?.difficulty || 'konnyu'}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-800 bg-white"
                  >
                    <option value="konnyu">Könnyű (Gyerekeknek)</option>
                    <option value="kozepes">Közepes (Mindkét korosztály)</option>
                    <option value="nehez">Nehéz (Felnőtteknek)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Kérdés szövege</label>
                <textarea
                  name="questionText"
                  required
                  rows={3}
                  defaultValue={editingQuestion?.questionText || ''}
                  placeholder="pl. Mit tegyél, ha ismeretlen linket kapsz SMS-ben?"
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-600">Válaszlehetőségek és helyes válasz</label>
                {[0, 1, 2, 3].map((optIdx) => (
                  <div key={optIdx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctIndex"
                      value={optIdx}
                      defaultChecked={editingQuestion ? editingQuestion.correctIndex === optIdx : optIdx === 0}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-bold text-slate-500 w-4">{['A', 'B', 'C', 'D'][optIdx]}:</span>
                    <input
                      type="text"
                      name={`opt${optIdx}`}
                      required={optIdx < 2}
                      defaultValue={editingQuestion?.options[optIdx] || ''}
                      placeholder={`Válasz ${['A', 'B', 'C', 'D'][optIdx]}`}
                      className="flex-1 p-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Rendőrségi megelőzési magyarázat</label>
                <textarea
                  name="explanation"
                  required
                  rows={2}
                  defaultValue={editingQuestion?.explanation || ''}
                  placeholder="pl. Soha ne kattints gyanús linkre, a bankok nem kérnek SMS-ben jelszót..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingQuestion(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 font-bold text-xs sm:text-sm"
                >
                  Mégse
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs sm:text-sm shadow-sm"
                >
                  Mentés
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
