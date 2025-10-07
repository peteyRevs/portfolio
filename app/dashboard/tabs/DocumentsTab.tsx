import { Document } from '@/types/database';

interface DocumentsTabProps {
  documents: Document[];
}

export default function DocumentsTab({ documents }: DocumentsTabProps) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Documents</h1>
        <p className="text-slate-300">Access your project files and deliverables</p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-xl text-center">
        <p className="text-slate-400 text-lg">No documents yet</p>
        <p className="text-slate-500 text-sm mt-2">
          Your documents will appear here once they are uploaded
        </p>
      </div>
    </div>
  );
}
