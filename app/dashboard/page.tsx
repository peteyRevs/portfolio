import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardHeader from './DashboardHeader';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <DashboardHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome, {user.email}!
          </h2>
          <p className="text-slate-300 mb-8">
            This is your client dashboard. Your project information will appear here.
          </p>

          {/* Placeholder content */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Active Projects</h3>
              <p className="text-slate-400">No active projects at the moment.</p>
            </div>

            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Recent Updates</h3>
              <p className="text-slate-400">No recent updates.</p>
            </div>

            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Support</h3>
              <p className="text-slate-400">Need help? Contact your project manager.</p>
            </div>

            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Documents</h3>
              <p className="text-slate-400">No documents available.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
