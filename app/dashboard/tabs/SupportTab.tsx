import { SupportTicket } from '@/types/database';

interface SupportTabProps {
  tickets: SupportTicket[];
}

export default function SupportTab({ tickets }: SupportTabProps) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Support</h1>
        <p className="text-slate-300">Get help and submit support tickets</p>
      </div>

      {tickets && tickets.length > 0 ? (
        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-white">{ticket.subject}</h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ticket.priority === 'urgent'
                        ? 'bg-red-500/20 text-red-400'
                        : ticket.priority === 'high'
                        ? 'bg-orange-500/20 text-orange-400'
                        : ticket.priority === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-slate-500/20 text-slate-400'
                    }`}
                  >
                    {ticket.priority}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'resolved' || ticket.status === 'closed'
                        ? 'bg-green-500/20 text-green-400'
                        : ticket.status === 'in_progress'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
              </div>
              <p className="text-slate-300 mb-3">{ticket.description}</p>
              <div className="text-sm text-slate-400">
                Created: {new Date(ticket.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-xl text-center">
          <p className="text-slate-400 text-lg">No support tickets</p>
          <p className="text-slate-500 text-sm mt-2">
            You haven't submitted any support tickets yet
          </p>
        </div>
      )}
    </div>
  );
}
