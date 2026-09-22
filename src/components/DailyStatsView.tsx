import React, { useState } from 'react';
import { DailySummary, GameRecord } from '../types';
import { TOPIC_LIST } from '../data/topics';
import { exportDailyStatsToExcel } from '../utils/excelImportExport';
import { clearTodayHistory } from '../utils/storage';
import {
  BarChart3,
  Calendar,
  Users,
  Trophy,
  Download,
  Trash2,
  FileSpreadsheet,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface DailyStatsViewProps {
  summary: DailySummary;
  allTodayGames: GameRecord[];
  onRefresh: () => void;
  onClose: () => void;
}

export const DailyStatsView: React.FC<DailyStatsViewProps> = ({
  summary,
  allTodayGames,
  onRefresh,
  onClose,
}) => {
  const [filterRole, setFilterRole] = useState<'all' | 'gyerek' | 'felnot'>('all');
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  const filteredGames = allTodayGames.filter((g) => {
    if (filterRole === 'all') return true;
    return g.playerRole === filterRole;
  });

  const handleExport = (format: 'xlsx' | 'csv') => {
    exportDailyStatsToExcel(summary, allTodayGames, format);
  };

  const handleClearToday = () => {
    clearTodayHistory();
    setShowClearConfirm(false);
    onRefresh();
  };

  const passRate = summary.totalGames > 0
    ? Math.round((summary.passedGames / summary.totalGames) * 100)
    : 0;

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Top Banner with Today Date & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Napi Részletes Kimutatás • {summary.date}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800">
            Mai Rendezvényi & Kioszk Statisztikák
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A mai napon lefolytatott bűnmegelőzési játékok összegzése és kimutatása.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            id="export-stats-excel-btn"
            onClick={() => handleExport('xlsx')}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Excel Export (.xlsx)</span>
          </button>

          <button
            id="export-stats-csv-btn"
            onClick={() => handleExport('csv')}
            className="flex-1 sm:flex-initial px-3 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors border border-slate-200 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Games */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Összes Játék</span>
            <Users className="w-5 h-5 text-sky-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-800">{summary.totalGames}</div>
          <div className="text-xs text-slate-500 mt-1">
            <span className="text-sky-600 font-bold">{summary.childGames}</span> gyerek,{' '}
            <span className="text-indigo-600 font-bold">{summary.adultGames}</span> felnőtt
          </div>
        </div>

        {/* Success Rate */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Kitüntetés (≥80%)</span>
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">{passRate}%</div>
          <div className="text-xs text-slate-500 mt-1">
            {summary.passedGames} / {summary.totalGames} sikeres kitöltő
          </div>
        </div>

        {/* Average Score */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Átlagos Eredmény</span>
            <BarChart3 className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">{summary.averagePercentage}%</div>
          <div className="text-xs text-slate-500 mt-1">Átlagos helyességi pont</div>
        </div>

        {/* Active Topics */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Prevenciós Témák</span>
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-800">6 témakör</div>
          <div className="text-xs text-slate-500 mt-1">Szerencsekerékkel sorsolva</div>
        </div>
      </div>

      {/* Topic Performance Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-sky-500" />
          <span>Témakörönkénti Eredmények a Mai Napon</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {TOPIC_LIST.map((topic) => {
            const stats = summary.topicStats[topic.id] || { answeredCount: 0, correctCount: 0 };
            const rate = stats.answeredCount > 0 ? Math.round((stats.correctCount / stats.answeredCount) * 100) : 0;

            return (
              <div
                key={topic.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800 truncate max-w-[170px]" title={topic.name}>
                    {topic.shortName}
                  </span>
                  <span
                    className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: topic.color }}
                  >
                    {stats.answeredCount} db
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 mb-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${rate}%`, backgroundColor: topic.color }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Helyes: {stats.correctCount} / {stats.answeredCount}</span>
                  <span className="font-bold text-slate-800">{rate}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Games History Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Mai Játékok Részletes Naplója ({filteredGames.length})</span>
          </h3>

          {/* Filter by role */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setFilterRole('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                filterRole === 'all' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mind ({allTodayGames.length})
            </button>
            <button
              onClick={() => setFilterRole('gyerek')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                filterRole === 'gyerek' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🧒 Gyerek
            </button>
            <button
              onClick={() => setFilterRole('felnot')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                filterRole === 'felnot' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🧑 Felnőtt
            </button>
          </div>
        </div>

        {filteredGames.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            Még nem indítottak játékot a kiválasztott szűrővel a mai napon.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase">
                  <th className="py-2.5 px-3">Időpont</th>
                  <th className="py-2.5 px-3">Szerepkör</th>
                  <th className="py-2.5 px-3">Kérdések</th>
                  <th className="py-2.5 px-3">Helyes válasz</th>
                  <th className="py-2.5 px-3">Eredmény</th>
                  <th className="py-2.5 px-3">Kitüntetés</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredGames.map((game) => (
                  <tr key={game.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-slate-600">
                      {new Date(game.timestamp).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-xs ${
                          game.playerRole === 'gyerek'
                            ? 'bg-sky-100 text-sky-700'
                            : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        {game.playerRole === 'gyerek' ? '🧒 Gyerek' : '🧑 Felnőtt'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-700">
                      {game.totalQuestions} db
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-700">
                      {game.score} / {game.totalQuestions}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`font-black ${game.passed ? 'text-emerald-600' : 'text-slate-700'}`}>
                        {game.percentage}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      {game.passed ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <Trophy className="w-3.5 h-3.5" /> Megkapta
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">Nem érte el</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Clear today data button */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            A statisztikák a böngésző helyi tárolójában biztonságosan megmaradnak az exportálásig.
          </div>

          {showClearConfirm ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-rose-600 font-bold">Biztosan törlöd a mai adatokat?</span>
              <button
                onClick={handleClearToday}
                className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
              >
                Igen, törlés
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1 rounded-lg bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Mégse
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 font-semibold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Mai adatok nullázása</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
