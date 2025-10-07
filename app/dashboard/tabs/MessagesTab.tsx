import { Message } from '@/types/database';

interface MessagesTabProps {
  messages: Message[];
}

export default function MessagesTab({ messages }: MessagesTabProps) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
        <p className="text-slate-300">Communicate with your project team</p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-xl text-center">
        <p className="text-slate-400 text-lg">Messages coming soon</p>
        <p className="text-slate-500 text-sm mt-2">
          Chat functionality will be available soon
        </p>
      </div>
    </div>
  );
}
