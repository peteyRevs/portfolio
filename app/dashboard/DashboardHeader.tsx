'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import RocketLogo from '../components/RocketLogo';
import { createClient } from '@/lib/supabase/client';

export default function DashboardHeader() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RocketLogo width={32} height={35} />
            <h1 className="text-xl font-bold text-white">Client Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
