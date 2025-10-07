'use client';

import Link from 'next/link';
import { FolderKanban, FileText, MessageSquare, FileStack, AlertCircle } from 'lucide-react';
import RocketLogo from '../components/RocketLogo';
import { TabType } from './DashboardTabs';

const navigation = [
  { name: 'Projects', tab: 'projects' as TabType, icon: FolderKanban },
  { name: 'Invoices', tab: 'invoices' as TabType, icon: FileText },
  { name: 'Messages', tab: 'messages' as TabType, icon: MessageSquare },
  { name: 'Documents', tab: 'documents' as TabType, icon: FileStack },
  { name: 'Support', tab: 'support' as TabType, icon: AlertCircle },
];

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 min-h-screen sticky top-0">
      <div className="p-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-8">
          <RocketLogo width={32} height={35} />
          <span className="text-xl font-bold text-white">Cosmic Code</span>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = activeTab === item.tab;
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => onTabChange(item.tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-500/20 text-blue-400 font-medium'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
