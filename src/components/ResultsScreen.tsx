import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { GameRecord } from '../types';
import { TOPICS } from '../data/topics';
import { playFanfareSound } from '../utils/audio';
import { Shield, CheckCircle2, XCircle, RotateCcw, Trophy, ListChecks, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResultsScreenProps {
  record: GameRecord;
  soundEnabled: boolean;
  onRestartGame: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  record,
  soundEnabled,
  onRestartGame,
}) => {
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);

  const isPassed = record.passed; // percentage >= 80

  useEffect(() => {
    if (isPassed) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FBBF24', '#38BDF8', '#34D399', '#818CF8', '#F43F5E'],
        });
      } catch (err) {
        console.error('Confetti error', err);
      }

      if (soundEnabled) {
        playFanfareSound();
      }
    }
  }, [isPassed, soundEnabled]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center z-10 relative">
      {/* Victory / Evaluation Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full rounded-3xl p-6 sm:p-10 text-center border-2 shadow-2xl relative overflow-hidden backdrop-blur-xl ${
          isPassed
            ? 'bg-white/95 border-amber-400 shadow-amber-500/15'
            : 'bg-white/95 border-sky-300 shadow-sky-500/15'
        }`}
      >
        {/* Glow */}
        {isPassed && (
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        )}

        {/* Badge Icon */}
        <div className="relative inline-flex items-center justify-center mb-4">
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl p-1 shadow-xl flex items-center justify-center ${
              isPassed
                ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-amber-400/30'
                : 'bg-gradient-to-tr from-sky-400 to-blue-500 shadow-sky-400/30'
            }`}
          >
            <div className="w-full h-full bg-white rounded-[20px] flex items-center justify-center shadow-inner">
              {isPassed ? (
                <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500 fill-amber-400/20 animate-bounce" />
              ) : (
                <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-sky-600 fill-sky-100" />
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-600 mb-2">
          {isPassed ? '★ KIVÁLÓ BŰNMEGELŐZÉSI EREDMÉNY ★' : 'JÁTÉK VÉGET ÉRT'}
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-800 mb-3">
          {isPassed
            ? record.playerRole === 'gyerek'
              ? 'Gratulálunk! Te egy igazi Bűnmegelőzési Hős vagy!'
              : 'Kiváló felkészültség és bűnmegelőzési tudatosság!'
            : 'Szép próbálkozás! Gyakorolj és érj el még jobb eredményt!'}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
          {isPassed
            ? 'Sikeresen teljesítetted a kvízt 80% feletti eredménnyel! Ügyesen alkalmazod a szabályokat.'
            : 'A sikeres szinthez legalább 80%-os eredmény szükséges. Nézd át a válaszokat és a tanácsokat, majd próbáld meg újra!'}
        </p>

        {/* Score Summary Metrics */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-6 max-w-md mx-auto mb-6 shadow-inner">
          <div className="text-center">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
              Helyes válaszok
            </div>
            <div className="text-3xl sm:text-4xl font-black text-slate-800">
              {record.score} <span className="text-lg text-slate-400 font-semibold">/ {record.totalQuestions}</span>
            </div>
          </div>

          <div className="h-10 w-px bg-slate-200" />

          <div className="text-center">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
              Százalék
            </div>
            <div
              className={`text-3xl sm:text-4xl font-black ${
                isPassed ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {record.percentage}%
            </div>
          </div>
        </div>

        {/* Action Buttons: ONLY 2 BUTTONS: Új játék indítása + Válaszok áttekintése (Popup) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6">
          <button
            id="start-new-game-btn"
            onClick={onRestartGame}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <RotateCcw className="w-5 h-5 text-white" />
            <span>Új játék indítása</span>
          </button>

          <button
            id="results-view-answers-btn"
            onClick={() => setShowReviewModal(true)}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <ListChecks className="w-5 h-5 text-sky-600" />
            <span>Válaszok áttekintése</span>
          </button>
        </div>
      </motion.div>

      {/* Answers review popup modal */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 shadow-sm">
                    <ListChecks className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-800">
                      Válaszok és Rendőrségi Tanácsok Áttekintése
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Összesen {record.answers.length} kérdés a lezárult fordulóból
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                  title="Bezárás"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: Answers List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
                {record.answers.map((ans, idx) => {
                  const topic = TOPICS[ans.topicId];
                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border shadow-sm ${
                        ans.isCorrect
                          ? 'bg-white border-emerald-300'
                          : 'bg-white border-rose-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {ans.isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                          )}
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            {idx + 1}. Kérdés • {topic?.emoji} {topic?.shortName || ans.topicId}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            ans.isCorrect
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {ans.isCorrect ? 'Helyes válasz' : 'Hibás válasz'}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-slate-800 mb-3">
                        {ans.questionText}
                      </h4>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                        <strong className="text-amber-700 block mb-1">Rendőrségi megelőzési tanács:</strong>
                        {ans.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm shadow-sm"
                >
                  Bezárás
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
