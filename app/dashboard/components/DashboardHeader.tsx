'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@/types/database';

interface DashboardHeaderProps {
  user: User | null;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* User Info */}
          {user && (
            <div>
              {user.company_name && (
                <div className="text-sm font-semibold text-white">
                  {user.company_name}
                </div>
              )}
              {user.contact_person && (
                <div className="text-xs text-slate-400">
                  {user.contact_person}
                </div>
              )}
            </div>
          )}

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
