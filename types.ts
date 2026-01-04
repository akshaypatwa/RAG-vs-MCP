export type SimulationStep = 
  | 'idle'
  | 'input'
  | 'process_start'
  | 'action'      // RAG: Retrieval, MCP: Tool Call
  | 'return'      // RAG: Context Return, MCP: Tool Result
  | 'synthesis'
  | 'complete';

export interface SimulationProps {
  isPlaying: boolean;
  step: SimulationStep;
  speed: number;
}