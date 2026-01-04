import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimulationProps } from '../types';
import { UserIcon, BrainIcon, LayersIcon, FileTextIcon, SearchIcon, MessageIcon, DatabaseIcon } from './Icons';

// --- Configuration ---
const POS = {
  USER: { x: 20, y: 60 }, // Moved inwards to prevent clipping
  DOCS: { x: 50, y: 15 }, // Centered
  DB:   { x: 50, y: 60 }, // Centered
  LLM:  { x: 80, y: 60 }, // Moved inwards
};

// --- Logs per step ---
const LOGS = {
  idle: "System standing by...",
  input: "User asks: 'How do I reset the API key?'",
  process_start: "Converting query to vector embedding...",
  action: "Scanning Vector Database for semantic matches...",
  return: "Found relevant sections in 'Platform Docs v2.pdf'...",
  synthesis: "LLM reading retrieved context...",
  complete: "Generating answer based on documentation..."
};

export const RagVisualizer: React.FC<SimulationProps> = ({ step }) => {
  const isAction = step === 'action'; 
  const isReturn = step === 'return'; 
  const isSynthesis = step === 'synthesis';
  const isComplete = step === 'complete';
  const isInput = step === 'input' || step === 'process_start';

  // Helper for node rendering
  const Node = ({ x, y, icon: Icon, label, subLabel, color, isActive, activeColor, description }: any) => (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 w-32 md:w-48 transition-all duration-500"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {/* Glow Effect */}
      {isActive && (
        <div className={`absolute inset-0 bg-${activeColor}-500/40 blur-[40px] rounded-full scale-110 animate-pulse`} />
      )}
      
      {/* Card Container - Filled on Highlight */}
      <div 
        className={`
          relative flex flex-col items-center p-3 rounded-2xl border transition-all duration-500 backdrop-blur-xl w-full
          ${isActive 
            ? `bg-${activeColor}-900/40 border-${activeColor}-500/50 shadow-[0_0_30px_rgba(var(--${activeColor}-rgb),0.2)] scale-105 z-30` 
            : `bg-slate-900/80 border-slate-700/50 shadow-lg z-10 hover:bg-slate-800/80`
          }
        `}
      >
        <div className={`p-3 rounded-xl mb-2 border ${isActive ? `bg-${activeColor}-500/20 border-${activeColor}-500/30 text-${activeColor}-200` : `bg-slate-950/50 border-slate-800 text-${color}-400`}`}>
             <Icon className="w-6 h-6 md:w-8 md:h-8" />
        </div>

        <div className="text-center w-full">
            <div className={`text-xs md:text-sm font-bold mb-1 ${isActive ? `text-${activeColor}-100` : 'text-slate-200'}`}>
                {label}
            </div>
            <div className={`text-[9px] md:text-[10px] font-medium leading-relaxed px-1 ${isActive ? `text-${activeColor}-200/80` : 'text-slate-400'}`}>
                {description}
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full relative font-sans text-slate-200 overflow-hidden bg-slate-950">
      <style>{`
        :root {
          --blue-rgb: 96, 165, 250;
          --indigo-rgb: 129, 140, 248;
          --green-rgb: 74, 222, 128;
          --slate-rgb: 148, 163, 184;
        }
      `}</style>

      {/* Modern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.15),rgba(2,6,23,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] pointer-events-none" />

      {/* Header */}
      <div className="absolute top-6 left-6 z-30 pointer-events-none select-none">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
             <DatabaseIcon className="w-6 h-6 text-blue-400" />
          </div>
          <div>
             <h2 className="text-xl font-bold text-white tracking-tight drop-shadow-md">RAG</h2>
          </div>
        </div>
      </div>

      {/* Diagram Area */}
      <div className="absolute inset-0 top-0">
        
        {/* --- Connections --- */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
               <marker id="arrow-blue" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                  <path d="M0,0 L4,2 L0,4 L0,0" fill="#60A5FA" />
               </marker>
               <marker id="arrow-green" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                  <path d="M0,0 L4,2 L0,4 L0,0" fill="#4ADE80" />
               </marker>
               <marker id="arrow-indigo" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                  <path d="M0,0 L4,2 L0,4 L0,0" fill="#818CF8" />
               </marker>
               <marker id="arrow-slate" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                  <path d="M0,0 L4,2 L0,4 L0,0" fill="#475569" />
               </marker>
            </defs>

            {/* Path 0: Docs -> DB (Indexing) */}
            <path 
                d={`M ${POS.DOCS.x} ${POS.DOCS.y+12} L ${POS.DB.x} ${POS.DB.y-12}`} 
                stroke="#334155" 
                strokeWidth="0.5" 
                fill="none" 
                markerEnd="url(#arrow-slate)"
            />
            
            {/* Path 1: User -> Retrieval */}
            <path 
                d={`M ${POS.USER.x + 8} ${POS.USER.y} L ${POS.DB.x - 8} ${POS.DB.y}`} 
                stroke={isInput || isAction ? "#60A5FA" : "#1e293b"} 
                strokeWidth={isInput || isAction ? "0.8" : "0.3"} 
                fill="none" 
                markerEnd={isInput || isAction ? "url(#arrow-blue)" : ""}
                className="transition-all duration-500"
            />

            {/* Path 2: Retrieval -> LLM */}
            <path 
                d={`M ${POS.DB.x + 8} ${POS.DB.y} L ${POS.LLM.x - 8} ${POS.LLM.y}`} 
                stroke={isReturn ? "#818CF8" : "#1e293b"} 
                strokeWidth={isReturn ? "0.8" : "0.3"} 
                fill="none" 
                markerEnd={isReturn ? "url(#arrow-indigo)" : ""}
                className="transition-all duration-500"
            />

            {/* Path 3: LLM -> User (Curved Return) */}
            <path 
                d={`M ${POS.LLM.x} ${POS.LLM.y + 12} C ${POS.LLM.x} 90, ${POS.USER.x} 90, ${POS.USER.x} ${POS.USER.y + 12}`} 
                stroke={isComplete ? "#4ADE80" : "#1e293b"} 
                strokeWidth={isComplete ? "0.8" : "0.3"} 
                fill="none" 
                markerEnd={isComplete ? "url(#arrow-green)" : ""}
                className="transition-all duration-500"
            />
        </svg>

        {/* --- Nodes --- */}
        
        {/* Indexing Badge (Matched Style) */}
        <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10" 
            style={{ left: `${POS.DOCS.x}%`, top: `${(POS.DOCS.y + POS.DB.y)/2}%` }}
        >
            <div className="bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-xl px-4 py-1.5 shadow-lg">
                <div className="text-[10px] md:text-xs font-bold text-slate-300 font-sans flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
                    Indexing
                </div>
            </div>
        </div>

        <Node 
          id="user"
          x={POS.USER.x} y={POS.USER.y} 
          icon={UserIcon} 
          label="User" 
          subLabel="Prompt"
          color="slate"
          isActive={isInput || isComplete}
          activeColor={isComplete ? "green" : "blue"}
          description="Asks: 'How do I reset keys?'"
        />

        {/* Static Docs Node */}
        <Node
            id="docs"
            x={POS.DOCS.x} y={POS.DOCS.y}
            icon={FileTextIcon}
            label="Knowledge Base"
            subLabel="Source"
            color="slate"
            isActive={false}
            description="PDFs, Wikis, Manuals."
        />

        <Node 
          id="db"
          x={POS.DB.x} y={POS.DB.y} 
          icon={LayersIcon} 
          label="Vector DB" 
          subLabel="Retrieval"
          color="indigo"
          isActive={isAction || isReturn}
          activeColor="indigo"
          description="Stores embeddings of the docs. Finds text relevant to the query."
        />

        <Node 
          id="llm"
          x={POS.LLM.x} y={POS.LLM.y} 
          icon={BrainIcon} 
          label="LLM" 
          subLabel="Generation"
          color="blue"
          isActive={isSynthesis || isReturn}
          activeColor="blue"
          description="Reads the retrieved text chunks to form an answer."
        />

        {/* --- Moving Packets --- */}
        
        {/* 1. Query Packet */}
        <AnimatePresence>
            {(isInput || isAction) && (
                <motion.div
                    className="absolute z-50 top-0 left-0"
                    initial={{ left: `${POS.USER.x}%`, top: `${POS.USER.y}%` }}
                    animate={{ left: `${POS.DB.x}%`, top: `${POS.DB.y}%` }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    style={{ marginLeft: '-20px', marginTop: '-25px' }}
                >
                    <div className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.8)] border border-blue-400 flex items-center gap-2">
                        <SearchIcon className="w-3 h-3" />
                        Query
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* 2. Context Packet */}
        <AnimatePresence>
            {isReturn && (
                <motion.div
                    className="absolute z-50 top-0 left-0"
                    initial={{ left: `${POS.DB.x}%`, top: `${POS.DB.y}%` }}
                    animate={{ left: `${POS.LLM.x}%`, top: `${POS.LLM.y}%` }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    style={{ marginLeft: '-20px', marginTop: '-25px' }}
                >
                    <div className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.8)] border border-indigo-400 flex items-center gap-2">
                        <FileTextIcon className="w-3 h-3" />
                        Relevant Info
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* 3. Response Packet */}
        <AnimatePresence>
            {isComplete && (
                <motion.div
                    className="absolute z-50"
                    initial={{ left: `${POS.LLM.x}%`, top: `${POS.LLM.y}%`, opacity: 1 }}
                    animate={{ 
                        left: [`${POS.LLM.x}%`, '50%', `${POS.USER.x}%`], 
                        top: [`${POS.LLM.y}%`, '85%', `${POS.USER.y}%`] 
                    }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    style={{ marginLeft: '-20px', marginTop: '-15px' }}
                >
                    <div className="bg-green-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(22,163,74,0.8)] border border-green-400 flex items-center gap-2">
                        <MessageIcon className="w-3 h-3" />
                        Answer
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>

      {/* Terminal / Log Footer */}
      <div className="absolute bottom-0 w-full bg-slate-950/90 backdrop-blur border-t border-slate-800 p-4 font-mono text-sm md:text-base text-blue-300 flex items-center gap-4 shadow-2xl z-40">
         <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)] shrink-0"></div>
         <span className="opacity-50 text-slate-500 shrink-0">STATUS_</span>
         <span className="font-bold tracking-wide truncate">{LOGS[step] || "Idle"}</span>
      </div>
    </div>
  );
};