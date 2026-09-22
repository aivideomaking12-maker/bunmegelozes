import React, { useRef, useState, useEffect, useCallback } from 'react';
import { TopicInfo, TopicId } from '../types';
import { TOPIC_LIST } from '../data/topics';
import { playWheelTickSound } from '../utils/audio';
import { Shield, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FortuneWheelProps {
  onSelectTopic: (topicId: TopicId) => void;
  soundEnabled: boolean;
  playerRole: 'gyerek' | 'felnot';
  questionIndex: number;
  totalQuestions: number;
  currentScore: number;
  availableTopicIds?: TopicId[];
}

export const FortuneWheel: React.FC<FortuneWheelProps> = ({
  onSelectTopic,
  soundEnabled,
  availableTopicIds,
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<TopicInfo | null>(null);

  const wheelRef = useRef<HTMLDivElement>(null);
  const currentRotationRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartAngleRef = useRef<number>(0);
  const dragStartRotationRef = useRef<number>(0);
  const lastAngleRef = useRef<number>(0);
  const angularVelocityRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const lastTickSectorRef = useRef<number>(-1);

  const totalSectors = TOPIC_LIST.length; // 6 sectors = 60 deg each
  const sliceAngle = 360 / totalSectors;

  // Cleanup anim frame
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Determine which sector is aligned under the top pointer
  const getSectorAtPointer = (currentRot: number): number => {
    const normalized = ((currentRot % 360) + 360) % 360;
    const effectiveAngle = (360 - normalized) % 360;
    return Math.floor(effectiveAngle / sliceAngle) % totalSectors;
  };

  // Automated or triggered spin
  const startSpin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedTopic(null);

    // Pick a random topic from pool
    const pool = availableTopicIds && availableTopicIds.length > 0
      ? availableTopicIds
      : TOPIC_LIST.map((t) => t.id);
    const chosenTopicId = pool[Math.floor(Math.random() * pool.length)];
    const chosenIndex = TOPIC_LIST.findIndex((t) => t.id === chosenTopicId);

    // Target slice angle in our coordinate system:
    // Slice center: chosenIndex * 60 + 30
    const jitter = (Math.random() - 0.5) * 30; // within slice safely
    const targetSliceAngle = (chosenIndex * sliceAngle + sliceAngle / 2 + jitter + 360) % 360;
    const requiredModulo = (360 - targetSliceAngle + 360) % 360;

    const currentRot = currentRotationRef.current;
    const currentModulo = ((currentRot % 360) + 360) % 360;
    let delta = (requiredModulo - currentModulo + 360) % 360;

    // Add 5 to 7 full rotations
    const fullSpins = 360 * (5 + Math.floor(Math.random() * 3));
    const targetRotation = currentRot + fullSpins + delta;

    const duration = 4000; // ms
    const startTime = performance.now();
    const startRot = currentRot;
    const totalDist = targetRotation - startRot;

    // Smooth cubic deceleration
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3.2);
    };

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);
      const currentAngle = startRot + totalDist * eased;

      currentRotationRef.current = currentAngle;
      setRotation(currentAngle);

      // Check for sector boundary crossing to play tick sound
      const currentSector = getSectorAtPointer(currentAngle);
      if (currentSector !== lastTickSectorRef.current) {
        lastTickSectorRef.current = currentSector;
        if (soundEnabled) {
          playWheelTickSound(1 + (1 - progress) * 0.5);
        }
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Spin finished
        setIsSpinning(false);
        const finalSectorIdx = getSectorAtPointer(currentAngle);
        const winningTopic = TOPIC_LIST[finalSectorIdx];
        setSelectedTopic(winningTopic);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [isSpinning, availableTopicIds, sliceAngle, soundEnabled, totalSectors]);

  // Touch & Pointer Drag mechanics
  const getPointerAngle = (clientX: number, clientY: number): number => {
    if (!wheelRef.current) return 0;
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const deg = (Math.atan2(dy, dx) * 180) / Math.PI;
    return deg >= 0 ? deg : deg + 360;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isSpinning) return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    isDraggingRef.current = true;
    const angle = getPointerAngle(e.clientX, e.clientY);
    dragStartAngleRef.current = angle;
    dragStartRotationRef.current = currentRotationRef.current;
    lastAngleRef.current = angle;
    angularVelocityRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const angle = getPointerAngle(e.clientX, e.clientY);

    let deltaAngle = angle - lastAngleRef.current;
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;

    angularVelocityRef.current = deltaAngle;
    lastAngleRef.current = angle;

    let totalDragDelta = angle - dragStartAngleRef.current;
    if (totalDragDelta > 180) totalDragDelta -= 360;
    if (totalDragDelta < -180) totalDragDelta += 360;

    const newRot = dragStartRotationRef.current + totalDragDelta;
    currentRotationRef.current = newRot;
    setRotation(newRot);

    const curSector = getSectorAtPointer(newRot);
    if (curSector !== lastTickSectorRef.current) {
      lastTickSectorRef.current = curSector;
      if (soundEnabled) playWheelTickSound(1.1);
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const velocity = Math.abs(angularVelocityRef.current);
    if (velocity > 0.15) {
      startSpin();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-6 pb-2 sm:pt-8 sm:pb-4 flex flex-col items-center z-10 relative overflow-visible">
      {/* Main Wheel Area - Maximized size, filling screen */}
      <div className="relative flex flex-col items-center justify-center my-1 sm:my-3 pt-6 sm:pt-8 overflow-visible">
        {/* Fixed Pointer Needle at TOP - STATIC (does not shake or bounce) */}
        <div className="absolute top-0 sm:top-1 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none drop-shadow-2xl">
          <div className="w-10 sm:w-14 h-14 sm:h-18 flex items-center justify-center overflow-visible">
            {/* Triangular Golden Pointer */}
            <svg viewBox="0 0 40 50" className="w-full h-full filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)] overflow-visible">
              <path
                d="M 20 50 L 5 10 A 15 15 0 0 1 35 10 Z"
                fill="#FBBF24"
                stroke="#D97706"
                strokeWidth="2.5"
              />
              <circle cx="20" cy="14" r="5" fill="#FEF3C7" />
            </svg>
          </div>
        </div>

        {/* Outer circular bezel - enlarged to fill screen comfortably */}
        <div
          ref={wheelRef}
          id="fortune-wheel-interactive"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[530px] md:h-[530px] lg:w-[560px] lg:h-[560px] rounded-full p-3 sm:p-5 bg-white/90 backdrop-blur-md border-4 border-amber-400 shadow-2xl shadow-sky-500/20 select-none cursor-grab active:cursor-grabbing touch-none transition-shadow ${
            isSpinning ? 'shadow-amber-400/35' : 'hover:shadow-sky-400/30'
          }`}
        >
          {/* Outer carnival rim dots */}
          <div className="absolute inset-1.5 rounded-full border-2 border-dashed border-amber-300 pointer-events-none opacity-85" />

          {/* ROTATING ELEMENT: Perfectly centered rotation at 50% 50% */}
          <div
            className="w-full h-full rounded-full overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: '50% 50%',
              transition: isDraggingRef.current ? 'none' : 'transform 0.05s linear',
            }}
          >
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full block"
            >
              {TOPIC_LIST.map((topic, index) => {
                const startAngle = index * 60;
                const endAngle = (index + 1) * 60;

                // 0 deg in SVG starts at top (12 o'clock, which is -90 deg from 3 o'clock)
                const startRad = ((startAngle - 90) * Math.PI) / 180;
                const endRad = ((endAngle - 90) * Math.PI) / 180;

                const x1 = 200 + 195 * Math.cos(startRad);
                const y1 = 200 + 195 * Math.sin(startRad);
                const x2 = 200 + 195 * Math.cos(endRad);
                const y2 = 200 + 195 * Math.sin(endRad);

                // Pie slice path
                const pathData = `M 200 200 L ${x1} ${y1} A 195 195 0 0 1 ${x2} ${y2} Z`;

                // Text label anchor at slice midpoint
                const midAngle = startAngle + 30;
                const midRad = ((midAngle - 90) * Math.PI) / 180;
                const labelDist = 128;
                const lx = 200 + labelDist * Math.cos(midRad);
                const ly = 200 + labelDist * Math.sin(midRad);

                // Multi-line topic label breaking
                const words = topic.shortName.split(' ');
                const line1 = words.length > 1 ? words[0] : topic.shortName;
                const line2 = words.length > 1 ? words.slice(1).join(' ') : '';

                return (
                  <g key={topic.id} id={`wheel-slice-${topic.id}`}>
                    <path
                      d={pathData}
                      fill={topic.color}
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />

                    {/* Sector text and emoji label */}
                    <g
                      transform={`translate(${lx}, ${ly}) rotate(${midAngle})`}
                      textAnchor="middle"
                      className="pointer-events-none select-none"
                    >
                      {/* Topic Emoji */}
                      <text
                        y="-18"
                        fontSize="20"
                        textAnchor="middle"
                        className="select-none"
                      >
                        {topic.emoji}
                      </text>

                      {line2 ? (
                        <>
                          <text
                            y="0"
                            fill="#FFFFFF"
                            fontSize="13"
                            fontWeight="900"
                            fontFamily="sans-serif"
                            stroke="#0F172A"
                            strokeWidth="3.5"
                            paintOrder="stroke fill"
                          >
                            {line1}
                          </text>
                          <text
                            y="15"
                            fill="#FFFFFF"
                            fontSize="13"
                            fontWeight="900"
                            fontFamily="sans-serif"
                            stroke="#0F172A"
                            strokeWidth="3.5"
                            paintOrder="stroke fill"
                          >
                            {line2}
                          </text>
                        </>
                      ) : (
                        <text
                          y="6"
                          fill="#FFFFFF"
                          fontSize="14"
                          fontWeight="900"
                          fontFamily="sans-serif"
                          stroke="#0F172A"
                          strokeWidth="3.5"
                          paintOrder="stroke fill"
                        >
                          {line1}
                        </text>
                      )}
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

         {/* Center Hub Button: Police Blue & Gold Design (Not black) */}
          <div
            onClick={startSpin}
            id="wheel-center-hub-button"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-100 p-1.5 shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform z-10"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-b from-sky-600 to-blue-900 border-2 border-white/80 flex flex-col items-center justify-center p-1 text-center select-none shadow-inner overflow-hidden">
              <img 
                src="/button_logo.png" 
                alt="Pörgetés logó" 
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Control Instruction & Large Spin Button */}
      <div className="w-full max-w-sm flex flex-col items-center gap-2.5 mt-2">
        <div className="text-center text-xs sm:text-sm font-semibold text-slate-600 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/80 shadow-sm">
          <span>Húzd el a kereket kézzel, vagy nyomd meg a gombot a pörgetéshez!</span>
        </div>

        {/* Big tactile spin button - Clean text without arrow/rotate icon */}
        <button
          id="spin-wheel-action-btn"
          disabled={isSpinning}
          onClick={startSpin}
          className={`w-full py-3.5 sm:py-4 px-8 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center shadow-xl transition-all duration-200 active:scale-95 ${
            isSpinning
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed border border-slate-300'
              : 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-900 border-2 border-amber-300 shadow-amber-500/25 hover:shadow-amber-500/40'
          }`}
        >
          <span>{isSpinning ? 'A kerék pörög...' : 'PÖRGETÉS INDÍTÁSA'}</span>
        </button>
      </div>

      {/* Modal / Overlay when Topic is Selected */}
      <AnimatePresence>
        {selectedTopic && !isSpinning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              className="w-full max-w-md rounded-3xl bg-white border-2 border-amber-400 p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden"
            >
              {/* Soft glow accent */}
              <div
                className="absolute -top-24 -left-24 w-48 h-48 rounded-full opacity-20 blur-2xl pointer-events-none"
                style={{ backgroundColor: selectedTopic.color }}
              />

              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg text-3xl sm:text-4xl select-none"
                style={{ backgroundColor: selectedTopic.color }}
              >
                {selectedTopic.emoji}
              </div>

              <div className="text-xs font-black uppercase tracking-widest text-amber-600 mb-1">
                Kisorsolt témakör
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-3">
                {selectedTopic.name}
              </h2>

              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                {selectedTopic.description}
              </p>

              <button
                id="proceed-to-question-btn"
                autoFocus
                onClick={() => onSelectTopic(selectedTopic.id)}
                className="w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg text-white flex items-center justify-center gap-2 shadow-lg transition-all transform hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: selectedTopic.color }}
              >
                <span>Tovább a kérdéshez</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
