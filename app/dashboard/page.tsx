import { createClient } from '@/lib/supabase/server';
import DashboardTabs from './DashboardTabs';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  // Fetch all data in parallel with Promise.all
  const [
    { data: user },
    { data: projects, error: projectsError },
    { data: invoices },
    { data: messages },
    { data: documents },
    { data: tickets },
  ] = await Promise.all([
    supabase.from('users').select('*').eq('id', authUser.id).single(),
    supabase
      .from('projects')
      .select('*')
      .eq('client_id', authUser.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('invoices')
      .select('*')
      .eq('client_id', authUser.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('support_tickets')
      .select('*')
      .eq('client_id', authUser.id)
      .order('created_at', { ascending: false }),
  ]);

  // Debug logging
  console.log('Auth user ID:', authUser.id);
  console.log('Projects:', projects);
  console.log('Projects error:', projectsError);

  return (
    <DashboardTabs
      user={user}
      projects={projects || []}
      invoices={invoices || []}
      messages={messages || []}
      documents={documents || []}
      tickets={tickets || []}
    />
  );
}
