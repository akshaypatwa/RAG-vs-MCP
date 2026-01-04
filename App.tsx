import React, { useState, useEffect, useRef } from 'react';
import { RagVisualizer } from './components/RagVisualizer';
import { McpVisualizer } from './components/McpVisualizer';
import { SimulationStep } from './types';
import { Play, Pause, RefreshCw, Info } from 'lucide-react';

const STEPS: SimulationStep[] = [
  'idle',
  'input',
  'process_start',
  'action',
  'return',
  'synthesis',
  'complete'
];

const STEP_DURATIONS = {
  idle: 1000,
  input: 1500,
  process_start: 1000,
  action: 2500,
  return: 2000,
  synthesis: 2000,
  complete: 3000
};

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true); // Auto-start
  const [stepIndex, setStepIndex] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const timerRef = useRef<number | null>(null);

  const currentStep = STEPS[stepIndex];

  useEffect(() => {
    if (isPlaying) {
      const duration = STEP_DURATIONS[currentStep] / simulationSpeed;
      
      timerRef.current = window.setTimeout(() => {
        setStepIndex((prev) => {
          if (prev < STEPS.length - 1) {
            return prev + 1;
          } else {
            // Loop back to start after a brief pause
            setTimeout(() => setStepIndex(0), 1000); 
            return prev;
          }
        });
      }, duration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, stepIndex, simulationSpeed, currentStep]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col font-sans selection:bg-indigo-500/30 pb-20">
      {/* Centered Header */}
      <header className="px-6 py-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50 flex justify-center items-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-3">
          <span className="text-slate-500 font-medium text-lg uppercase tracking-widest">Use Case:</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Diagnose System Issue
          </span>
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-[1800px] mx-auto w-full">
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Left: RAG */}
          <div className="flex flex-col gap-4">
             <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative aspect-[16/9] md:aspect-[2/1] xl:aspect-[16/10] bg-slate-900 rounded-[1.8rem] border border-slate-800 overflow-hidden shadow-2xl">
                    <RagVisualizer isPlaying={isPlaying} step={currentStep} speed={simulationSpeed} />
                </div>
             </div>
             
             {/* RAG Info Card */}
             <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/50 transition-colors">
                <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  RAG Approach
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  The AI searches <strong>past documentation</strong> (manuals, logs, wikis) that has been indexed. It answers based on <em>what was written down</em>. Great for answering "How does this work?" based on the manual.
                </p>
             </div>
          </div>

          {/* Right: MCP */}
          <div className="flex flex-col gap-4">
             <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative aspect-[16/9] md:aspect-[2/1] xl:aspect-[16/10] bg-slate-900 rounded-[1.8rem] border border-slate-800 overflow-hidden shadow-2xl">
                    <McpVisualizer isPlaying={isPlaying} step={currentStep} speed={simulationSpeed} />
                </div>
             </div>

             {/* MCP Info Card */}
             <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/50 transition-colors">
                <h3 className="text-orange-400 font-bold mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  MCP Approach
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  The AI connects to <strong>live systems</strong> (GitHub repo, Database, Server logs) via standardized tools. It answers based on <em>current reality</em>. Great for answering "What is broken right now?" by checking the system itself.
                </p>
             </div>
          </div>
        </div>

      </main>

      {/* Floating Controls */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
        <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-full p-2 pl-6 pr-6 flex items-center gap-6 shadow-2xl ring-1 ring-white/5">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="group flex items-center justify-center w-10 h-10 bg-white text-black rounded-full hover:scale-110 hover:bg-blue-50 transition-all shadow-lg shadow-white/10"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
          
          <div className="flex flex-col gap-1 w-24">
            <div className="flex justify-between text-[9px] text-slate-500 uppercase tracking-wider font-bold">
               <span>Speed</span>
               <span className="text-slate-200">{simulationSpeed}x</span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="3" 
              step="0.5" 
              value={simulationSpeed}
              onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="h-8 w-px bg-slate-800"></div>

          <button 
             onClick={() => setStepIndex(0)}
             className="text-slate-400 hover:text-white transition-colors"
             title="Restart"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}