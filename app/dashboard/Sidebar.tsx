'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderKanban, FileText, MessageSquare, FileStack, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import RocketLogo from '../components/RocketLogo';

const navigation = [
  { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { name: 'Invoices', href: '/dashboard/invoices', icon: FileText },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Documents', href: '/dashboard/documents', icon: FileStack },
  { name: 'Support', href: '/dashboard/support', icon: AlertCircle },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white/5 backdrop-blur-xl border-r border-white/10 min-h-screen sticky top-0 transition-all duration-300`}>
      <div className="p-6">
        {/* Logo */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} mb-8`}>
          <RocketLogo width={32} height={35} />
          {!isCollapsed && <span className="text-xl font-bold text-white whitespace-nowrap">Cosmic Code</span>}
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-500/20 text-blue-400 font-medium'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`mt-8 w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-all`}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 flex-shrink-0" />
          ) : (
            <ChevronLeft className="w-5 h-5 flex-shrink-0" />
          )}
        </button>
      </div>
    </aside>
  );
}
