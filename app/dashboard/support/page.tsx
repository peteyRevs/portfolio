'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { SupportTicket, Project, TicketPriority } from '@/types/database';
import { AlertCircle, Plus, Clock, CheckCircle } from 'lucide-react';
import CreateTicketModal from '../components/CreateTicketModal';

export default function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clientId, setClientId] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      setClientId(user.id);

      const [ticketsResponse, projectsResponse] = await Promise.all([
        supabase
          .from('support_tickets')
          .select('*')
          .eq('client_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('projects')
          .select('*')
          .eq('client_id', user.id)
          .order('created_at', { ascending: false })
      ]);

      setTickets(ticketsResponse.data || []);
      setProjects(projectsResponse.data || []);
      setLoading(false);
    }

    fetchData();
  }, []);

  // Group tickets by status
  const openTickets = tickets.filter(t => t.status === 'open' || t.status === 'in_progress');
  const resolvedTickets = tickets.filter(t => t.status === 'resolved' || t.status === 'closed');

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
      case 'closed': return 'bg-green-500/20 text-green-400';
      case 'in_progress': return 'bg-blue-500/20 text-blue-400';
      case 'open': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-400">Loading support tickets...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-white">Support</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            New Ticket
          </button>
        </div>
        <p className="text-slate-300 mb-6">Get help and submit support tickets</p>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-sm text-slate-400 mb-1">Open Tickets</div>
            <div className="text-2xl font-bold text-yellow-400">{openTickets.length}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-sm text-slate-400 mb-1">Resolved</div>
            <div className="text-2xl font-bold text-green-400">{resolvedTickets.length}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-sm text-slate-400 mb-1">Total Tickets</div>
            <div className="text-2xl font-bold text-white">{tickets.length}</div>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      {tickets.length > 0 ? (
        <div className="space-y-6">
          {/* Open Tickets */}
          {openTickets.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                Active Tickets ({openTickets.length})
              </h2>
              <div className="grid gap-4">
                {openTickets.map((ticket) => {
                  const project = projects.find(p => p.id === ticket.project_id);

                  return (
                    <div
                      key={ticket.id}
                      className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{ticket.subject}</h3>
                          </div>
                          {project && (
                            <div className="text-sm text-slate-400 mb-2">
                              Project: <span className="text-blue-400">{project.project_name}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                            {ticket.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-300 mb-4 whitespace-pre-wrap">{ticket.description}</p>

                      <div className="flex items-center gap-4 text-sm text-slate-400 pt-4 border-t border-white/10">
                        <div>
                          Created: {new Date(ticket.created_at).toLocaleDateString()}
                        </div>
                        {ticket.status === 'in_progress' && (
                          <div className="flex items-center gap-1 text-blue-400">
                            <AlertCircle className="w-4 h-4" />
                            <span>Team is working on this</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Resolved Tickets */}
          {resolvedTickets.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Resolved Tickets ({resolvedTickets.length})
              </h2>
              <div className="grid gap-4">
                {resolvedTickets.map((ticket) => {
                  const project = projects.find(p => p.id === ticket.project_id);

                  return (
                    <div
                      key={ticket.id}
                      className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 opacity-75"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">{ticket.subject}</h3>
                          </div>
                          {project && (
                            <div className="text-sm text-slate-400 mb-2">
                              Project: <span className="text-blue-400">{project.project_name}</span>
                            </div>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>

                      <p className="text-slate-400 mb-4 line-clamp-2">{ticket.description}</p>

                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div>Created: {new Date(ticket.created_at).toLocaleDateString()}</div>
                        {ticket.resolved_at && (
                          <div>Resolved: {new Date(ticket.resolved_at).toLocaleDateString()}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-xl text-center">
          <AlertCircle className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">No support tickets yet</p>
          <p className="text-slate-500 text-sm mt-2 mb-4">
            Need help? Create a support ticket and we'll get back to you soon
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Create Your First Ticket
          </button>
        </div>
      )}

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        projects={projects}
        clientId={clientId}
      />
    </div>
  );
}
