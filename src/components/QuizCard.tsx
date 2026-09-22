import React, { useState } from 'react';
import { Question, GameAnswer } from '../types';
import { TOPICS } from '../data/topics';
import { playCorrectSound, playWrongSound } from '../utils/audio';
import { Shield, CheckCircle2, XCircle, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  soundEnabled: boolean;
  playerRole: 'gyerek' | 'felnot';
  currentScore: number;
  onAnswerSubmit: (answer: GameAnswer) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  soundEnabled,
  playerRole,
  currentScore,
  onAnswerSubmit,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  const topic = TOPICS[question.topicId] || TOPICS.egyeb_bunmegelozes;
  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedIndex(idx);
    setHasAnswered(true);

    const isCorrect = idx === question.correctIndex;
    if (soundEnabled) {
      if (isCorrect) {
        playCorrectSound();
      } else {
        playWrongSound();
      }
    }
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    const isCorrect = selectedIndex === question.correctIndex;
    onAnswerSubmit({
      questionId: question.id,
      topicId: question.topicId,
      questionText: question.questionText,
      selectedOptionIndex: selectedIndex,
      correctOptionIndex: question.correctIndex,
      isCorrect,
      explanation: question.explanation,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center z-10 relative">
      {/* Top Header Card: Question Progress, Role & Score HUD transferred from Wheel */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-white/85 backdrop-blur-md border border-white/80 px-4 sm:px-6 py-3 rounded-2xl mb-6 shadow-md shadow-sky-500/5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm flex-shrink-0 select-none"
            style={{ backgroundColor: topic.color }}
          >
            {topic.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-sky-700 bg-sky-100 border border-sky-200 px-2.5 py-0.5 rounded-full">
                {questionNumber}. kérdés a(z) {totalQuestions}-ből
              </span>
              <span className="text-xs font-semibold text-slate-500 capitalize">
                {playerRole === 'gyerek' ? '🧒 Gyerek mód' : '🧑 Felnőtt mód'}
              </span>
            </div>
            <div className="text-xs sm:text-sm font-black text-slate-800 mt-0.5">
              {topic.name}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
            {question.difficulty === 'konnyu' ? 'Könnyű' : question.difficulty === 'kozepes' ? 'Közepes' : 'Nehéz'}
          </span>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-700 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>{currentScore} pont</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-white/90 backdrop-blur-xl rounded-3xl border-2 border-white/80 p-6 sm:p-8 shadow-2xl shadow-sky-500/10 relative overflow-hidden"
      >
        {/* Accent glow in corner */}
        <div
          className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-15 blur-xl pointer-events-none"
          style={{ backgroundColor: topic.color }}
        />

        {/* Question Text */}
        <div className="mb-6 sm:mb-8">
          <div className="text-xs font-black uppercase tracking-wider text-sky-600 mb-2 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Kérdés</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug tracking-tight">
            {question.questionText}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 sm:space-y-4 mb-6">
          {question.options.map((option, idx) => {
            const letter = optionLetters[idx] || `${idx + 1}`;
            const isSelected = selectedIndex === idx;
            const isCorrect = idx === question.correctIndex;

            let cardStyles = 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700 shadow-sm';
            let badgeStyles = 'bg-white text-slate-700 border-slate-200';

            if (hasAnswered) {
              if (isCorrect) {
                cardStyles = 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md shadow-emerald-500/10 font-medium';
                badgeStyles = 'bg-emerald-500 text-white border-emerald-500 font-black';
              } else if (isSelected && !isCorrect) {
                cardStyles = 'bg-rose-50 border-rose-400 text-rose-950 shadow-md shadow-rose-500/10';
                badgeStyles = 'bg-rose-500 text-white border-rose-500 font-black';
              } else {
                cardStyles = 'bg-slate-50/60 border-slate-200/60 text-slate-400 opacity-60';
                badgeStyles = 'bg-slate-100 text-slate-400 border-slate-200';
              }
            }

            return (
              <motion.button
                key={idx}
                id={`quiz-option-${idx}`}
                disabled={hasAnswered}
                onClick={() => handleSelectOption(idx)}
                whileHover={!hasAnswered ? { scale: 1.01 } : {}}
                whileTap={!hasAnswered ? { scale: 0.99 } : {}}
                className={`w-full p-4 sm:p-4.5 rounded-2xl border-2 flex items-center text-left transition-all relative ${cardStyles}`}
              >
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-black text-sm sm:text-base mr-3.5 flex-shrink-0 border ${badgeStyles}`}
                >
                  {letter}
                </div>

                <div className="flex-1 text-sm sm:text-base font-semibold leading-relaxed">
                  {option}
                </div>

                {hasAnswered && isCorrect && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 ml-2 flex-shrink-0 animate-bounce" />
                )}

                {hasAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-6 h-6 text-rose-500 ml-2 flex-shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Explanation & Advice box after answer */}
        <AnimatePresence>
          {hasAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div
                className={`p-4 sm:p-5 rounded-2xl mb-6 border ${
                  selectedIndex === question.correctIndex
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50/90 border-amber-300 text-amber-950'
                }`}
              >
                <div className="flex items-center gap-2 font-black text-sm mb-1.5">
                  <Shield className="w-4 h-4 text-sky-600" />
                  <span>
                    {selectedIndex === question.correctIndex
                      ? 'Helyes válasz! Rendőrségi megelőzési tanács:'
                      : 'Figyelem! Bűnmegelőzési magyarázat és tanács:'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {question.explanation}
                </p>
              </div>

              {/* Next Button */}
              <button
                id="quiz-next-question-btn"
                autoFocus
                onClick={handleNext}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-xl shadow-blue-500/25 transition-all transform hover:scale-[1.01] active:scale-95"
              >
                <span>
                  {questionNumber < totalQuestions ? 'Következő pörgetés' : 'Eredmények megtekintése'}
                </span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
