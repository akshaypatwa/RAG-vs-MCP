import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimulationProps } from '../types';
import { UserIcon, ProtocolIcon, DatabaseIcon, MessageIcon, ZapIcon, ToolIcon, GithubIcon, FolderIcon } from './Icons';

// --- Configuration ---
const POS = {
  USER:   { x: 20, y: 50 }, // Moved inwards
  HOST:   { x: 50, y: 50 }, // Centered
  // Exploded Tools
  TOOL_1: { x: 80, y: 20 }, // Moved inwards
  TOOL_2: { x: 80, y: 50 }, 
  TOOL_3: { x: 80, y: 80 }, 
};

// --- Logs ---
const LOGS = {
  idle: "MCP Host connected to GitHub, Postgres, and File servers.",
  input: "User asks: 'Why is the login API failing?'",
  process_start: "Host analyzes request: Needs Code + Logs.",
  action: "Routing: Call GitHub (get_code) & Postgres (get_logs)...",
  return: "Received: 'Error 500 in auth.ts' and 'Timeout in DB'.",
  synthesis: "Synthesizing full diagnosis...",
  complete: "Response: 'The DB is timing out causing auth.ts to fail.'"
};

export const McpVisualizer: React.FC<SimulationProps> = ({ step }) => {
  const isAction = step === 'action'; 
  const isReturn = step === 'return'; 
  const isSynthesis = step === 'synthesis'; 
  const isComplete = step === 'complete'; 
  const isInput = step === 'input'; 
  const isProcessing = step === 'process_start'; 

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

  // Small Satellite Node for tools
  const ToolNode = ({ x, y, icon: Icon, label, color, isActive, description }: any) => (
    <div 
       className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-start gap-1 p-3 rounded-xl border transition-all duration-500 backdrop-blur-xl z-10 w-32 md:w-48
       ${isActive 
           ? `bg-${color}-900/40 border-${color}-500/50 shadow-[0_0_30px_rgba(var(--${color}-rgb),0.2)] scale-105` 
           : 'bg-slate-900/80 border-slate-700/50 hover:bg-slate-800/80'
       }`}
       style={{ left: `${x}%`, top: `${y}%` }}
    >
        <div className="flex items-center gap-2 w-full">
            <div className={`p-1.5 rounded-lg border ${isActive ? `bg-${color}-500/20 border-${color}-500/30 text-${color}-200` : `bg-slate-950 border-slate-800/50 text-${color}-400`}`}>
                <Icon className="w-4 h-4" />
            </div>
            <div className={`text-xs font-bold ${isActive ? `text-${color}-100` : 'text-slate-200'}`}>{label}</div>
        </div>
        <div className={`text-[9px] leading-tight pl-0.5 mt-1 ${isActive ? `text-${color}-200/80` : 'text-slate-400'}`}>{description}</div>
    </div>
  );

  return (
    <div className="w-full h-full relative font-sans text-slate-200 overflow-hidden bg-slate-950">
       <style>{`
        :root {
          --orange-rgb: 249, 115, 22;
          --emerald-rgb: 16, 185, 129;
          --blue-rgb: 96, 165, 250;
          --slate-rgb: 148, 163, 184;
        }
      `}</style>

       {/* Modern Background - Different tone for MCP */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,45,18,0.15),rgba(2,6,23,0))]" />
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] pointer-events-none" />


      {/* Header */}
      <div className="absolute top-6 left-6 z-30 pointer-events-none select-none">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-orange-500/20 rounded-lg border border-orange-400/30 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
             <ProtocolIcon className="w-6 h-6 text-orange-400" />
          </div>
          <div>
             <h2 className="text-xl font-bold text-white tracking-tight drop-shadow-md">MCP</h2>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 top-0">
         
         {/* --- Connections --- */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
               <marker id="arrow-orange" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                  <path d="M0,0 L4,2 L0,4 L0,0" fill="#F97316" />
               </marker>
               <marker id="arrow-emerald" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                  <path d="M0,0 L4,2 L0,4 L0,0" fill="#10B981" />
               </marker>
               <marker id="arrow-blue-mcp" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                  <path d="M0,0 L4,2 L0,4 L0,0" fill="#60A5FA" />
               </marker>
            </defs>
            
            {/* Path 1: User -> Protocol */}
            <path 
                d={`M ${POS.USER.x + 8} ${POS.USER.y} L ${POS.HOST.x - 8} ${POS.HOST.y}`} 
                stroke={isInput || isComplete ? "#F97316" : "#334155"} 
                strokeWidth={isInput || isComplete ? "0.8" : "0.3"} 
                fill="none" 
                markerEnd={isInput || isComplete ? "url(#arrow-orange)" : ""}
                className="transition-all duration-500"
            />

            {/* Path 2: Host <-> GitHub (Active) */}
            <path 
                d={`M ${POS.HOST.x + 8} ${POS.HOST.y} C ${POS.HOST.x + 20} ${POS.HOST.y}, ${POS.TOOL_1.x - 20} ${POS.TOOL_1.y}, ${POS.TOOL_1.x - 10} ${POS.TOOL_1.y}`} 
                stroke={isAction || isReturn ? "#10B981" : "#334155"} 
                strokeWidth={isAction || isReturn ? "0.6" : "0.2"} 
                fill="none" 
                markerEnd={isAction ? "url(#arrow-emerald)" : ""}
                strokeDasharray={isAction || isReturn ? "0" : "4 4"}
                className="transition-all duration-500"
            />

             {/* Path 3: Host <-> DB (Active) */}
             <path 
                d={`M ${POS.HOST.x + 8} ${POS.HOST.y} L ${POS.TOOL_2.x - 10} ${POS.TOOL_2.y}`} 
                stroke={isAction || isReturn ? "#60A5FA" : "#334155"} 
                strokeWidth={isAction || isReturn ? "0.6" : "0.2"} 
                fill="none" 
                markerEnd={isAction ? "url(#arrow-blue-mcp)" : ""}
                strokeDasharray={isAction || isReturn ? "0" : "4 4"}
                className="transition-all duration-500"
            />

             {/* Path 4: Host <-> Files (Inactive) */}
             <path 
                d={`M ${POS.HOST.x + 8} ${POS.HOST.y} C ${POS.HOST.x + 20} ${POS.HOST.y}, ${POS.TOOL_3.x - 20} ${POS.TOOL_3.y}, ${POS.TOOL_3.x - 10} ${POS.TOOL_3.y}`} 
                stroke="#334155" 
                strokeWidth="0.2" 
                strokeDasharray="4 4" 
                fill="none" 
            />
         </svg>

         {/* --- Nodes --- */}
         
         <Node 
            x={POS.USER.x} y={POS.USER.y} 
            icon={UserIcon} label="User + Client" subLabel="Initiator" color="slate"
            isActive={isInput || isComplete} activeColor="orange"
            description="Asks: 'Why login failing?'"
         />

         <Node 
            x={POS.HOST.x} y={POS.HOST.y} 
            icon={ProtocolIcon} label="MCP Host" subLabel="Coordinator" color="orange"
            isActive={isProcessing || isSynthesis || isInput || isComplete} activeColor="orange"
            description="Connects to tools."
         />

         {/* Exploded Tools */}
         <ToolNode 
             x={POS.TOOL_1.x} y={POS.TOOL_1.y} 
             icon={GithubIcon} label="GitHub Server" color="emerald"
             isActive={isAction || isReturn}
             description="Reads src/auth.ts"
         />
          <ToolNode 
             x={POS.TOOL_2.x} y={POS.TOOL_2.y} 
             icon={DatabaseIcon} label="PostgreSQL" color="blue"
             isActive={isAction || isReturn}
             description="Reads system_logs"
         />
          <ToolNode 
             x={POS.TOOL_3.x} y={POS.TOOL_3.y} 
             icon={FolderIcon} label="Local Files" color="indigo"
             isActive={false}
             description="Reads config.json"
         />


         {/* --- Moving Packets --- */}

         {/* 1. Prompt Packet (User -> Host) */}
         <AnimatePresence>
            {isInput && (
                <motion.div
                    className="absolute z-50 top-0 left-0"
                    initial={{ left: `${POS.USER.x}%`, top: `${POS.USER.y}%` }}
                    animate={{ left: `${POS.HOST.x}%`, top: `${POS.HOST.y}%` }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    style={{ marginLeft: '-20px', marginTop: '-25px' }}
                >
                     <div className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.8)] border border-orange-400 flex items-center gap-2">
                        <MessageIcon className="w-3 h-3" />
                        Prompt
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* 2. Tool Calls (Host -> GitHub & DB) */}
        <AnimatePresence>
            {isAction && (
                <>
                {/* To GitHub */}
                <motion.div
                    className="absolute z-50 top-0 left-0"
                    initial={{ left: `${POS.HOST.x}%`, top: `${POS.HOST.y}%` }}
                    animate={{ left: `${POS.TOOL_1.x}%`, top: `${POS.TOOL_1.y}%` }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    style={{ marginLeft: '-20px', marginTop: '-25px' }}
                >
                    <div className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] border border-emerald-400 flex items-center gap-2">
                        <ZapIcon className="w-3 h-3" />
                        Read Code
                    </div>
                </motion.div>
                {/* To DB */}
                <motion.div
                    className="absolute z-50 top-0 left-0"
                    initial={{ left: `${POS.HOST.x}%`, top: `${POS.HOST.y}%` }}
                    animate={{ left: `${POS.TOOL_2.x}%`, top: `${POS.TOOL_2.y}%` }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    style={{ marginLeft: '-20px', marginTop: '-15px' }}
                >
                    <div className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.8)] border border-blue-400 flex items-center gap-2">
                        <ZapIcon className="w-3 h-3" />
                        Check Logs
                    </div>
                </motion.div>
                </>
            )}
        </AnimatePresence>

        {/* 3. Result (GitHub -> Host) */}
        <AnimatePresence>
            {isReturn && (
                <>
                 <motion.div
                    className="absolute z-50 top-0 left-0"
                    initial={{ left: `${POS.TOOL_1.x}%`, top: `${POS.TOOL_1.y}%` }}
                    animate={{ left: `${POS.HOST.x}%`, top: `${POS.HOST.y}%` }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    style={{ marginLeft: '-20px', marginTop: '-25px' }}
                >
                     <div className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] border border-emerald-400 flex items-center gap-2">
                        <ToolIcon className="w-3 h-3" />
                        Code Data
                    </div>
                </motion.div>
                 <motion.div
                    className="absolute z-50 top-0 left-0"
                    initial={{ left: `${POS.TOOL_2.x}%`, top: `${POS.TOOL_2.y}%` }}
                    animate={{ left: `${POS.HOST.x}%`, top: `${POS.HOST.y}%` }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    style={{ marginLeft: '-20px', marginTop: '-25px' }}
                >
                     <div className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.8)] border border-blue-400 flex items-center gap-2">
                        <ToolIcon className="w-3 h-3" />
                        Log Rows
                    </div>
                </motion.div>
                </>
            )}
        </AnimatePresence>

        {/* 4. Final Answer (Host -> User) */}
        <AnimatePresence>
            {isComplete && (
                <motion.div
                    className="absolute z-50 top-0 left-0"
                    initial={{ left: `${POS.HOST.x}%`, top: `${POS.HOST.y}%` }}
                    animate={{ left: `${POS.USER.x}%`, top: `${POS.USER.y}%` }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    style={{ marginLeft: '-20px', marginTop: '-25px' }}
                >
                     <div className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.8)] border border-orange-400 flex items-center gap-2">
                        <MessageIcon className="w-3 h-3" />
                        Diagnosis
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

       {/* Terminal / Log Footer */}
       <div className="absolute bottom-0 w-full bg-slate-950/90 backdrop-blur border-t border-slate-800 p-4 font-mono text-sm md:text-base text-orange-300 flex items-center gap-4 shadow-2xl z-40">
         <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)] shrink-0"></div>
         <span className="opacity-50 text-slate-500 shrink-0">STATUS_</span>
         <span className="font-bold tracking-wide truncate">{LOGS[step] || "Idle"}</span>
      </div>
    </div>
  );
};