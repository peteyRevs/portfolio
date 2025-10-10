import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { User } from '@/types/database';
import Sidebar from './Sidebar';
import DashboardHeader from './components/DashboardHeader';

export const metadata: Metadata = {
  title: "Dashboard | Cosmic Code",
  description: "Manage your projects, invoices, documents, and support tickets with Cosmic Code.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect('/login');
  }

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .single();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader user={user as User} />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
