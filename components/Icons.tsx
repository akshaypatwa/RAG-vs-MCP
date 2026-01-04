import React from 'react';
import { 
  Database, 
  Brain, 
  User, 
  FileText, 
  Search, 
  Server, 
  Plug, 
  Wrench, 
  MessageSquare,
  Zap,
  ClipboardList,
  Share2,
  Layers,
  Globe,
  Github,
  Folder
} from 'lucide-react';

export const UserIcon = ({ className }: { className?: string }) => <User className={className} />;
export const BrainIcon = ({ className }: { className?: string }) => <Brain className={className} />;
export const DatabaseIcon = ({ className }: { className?: string }) => <Database className={className} />;
export const DocumentIcon = ({ className }: { className?: string }) => <FileText className={className} />;
export const SearchIcon = ({ className }: { className?: string }) => <Search className={className} />;
export const ServerIcon = ({ className }: { className?: string }) => <Server className={className} />;
export const PlugIcon = ({ className }: { className?: string }) => <Plug className={className} />;
export const ToolIcon = ({ className }: { className?: string }) => <Wrench className={className} />;
export const MessageIcon = ({ className }: { className?: string }) => <MessageSquare className={className} />;
export const ZapIcon = ({ className }: { className?: string }) => <Zap className={className} />;
export const ProtocolIcon = ({ className }: { className?: string }) => <ClipboardList className={className} />;
export const NetworkIcon = ({ className }: { className?: string }) => <Share2 className={className} />;
export const LayersIcon = ({ className }: { className?: string }) => <Layers className={className} />;
export const GlobeIcon = ({ className }: { className?: string }) => <Globe className={className} />;
export const GithubIcon = ({ className }: { className?: string }) => <Github className={className} />;
export const FolderIcon = ({ className }: { className?: string }) => <Folder className={className} />;
export const FileTextIcon = ({ className }: { className?: string }) => <FileText className={className} />;