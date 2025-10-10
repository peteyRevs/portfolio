'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Document, Project } from '@/types/database';
import UploadDocumentModal from '../components/UploadDocumentModal';
import {
  File,
  Download,
  Eye,
  Calendar,
  Search,
  FileArchive,
  Upload
} from 'lucide-react';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const [docsResponse, projectsResponse] = await Promise.all([
        supabase
          .from('documents')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('projects')
          .select('*')
          .eq('client_id', user.id)
          .order('created_at', { ascending: false })
      ]);

      setDocuments(docsResponse.data || []);
      setProjects(projectsResponse.data || []);
      setLoading(false);
    }

    fetchData();
  }, []);

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-400">Loading documents...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-white">Documents</h1>
          {projects && projects.length > 0 && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
            >
              <Upload className="w-4 h-4" />
              Upload File
            </button>
          )}
        </div>
        <p className="text-slate-300 mb-6">Access your project files and deliverables</p>

        {/* Search */}
        {documents.length > 0 && (
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Documents List */}
      {filteredDocuments && filteredDocuments.length > 0 ? (
        <div className="grid gap-4">
          {filteredDocuments.map((doc) => {
            return (
              <div
                key={doc.id}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400 flex-shrink-0">
                    <File className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-1 truncate">
                          {doc.file_name}
                        </h3>
                        {doc.description && (
                          <p className="text-sm text-slate-400 mb-2">{doc.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-4">
                      {doc.file_type && (
                        <div className="flex items-center gap-1">
                          <FileArchive className="w-4 h-4" />
                          <span>{doc.file_type}</span>
                        </div>
                      )}
                      {doc.file_size && (
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          <span>{formatFileSize(doc.file_size)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </a>
                      <a
                        href={doc.file_url}
                        download
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-xl text-center">
          <FileArchive className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">
            {documents.length === 0 ? 'No documents yet' : 'No documents match your search'}
          </p>
          <p className="text-slate-500 text-sm mt-2">
            {documents.length === 0
              ? 'Your documents will appear here once they are uploaded'
              : 'Try adjusting your search or filter'}
          </p>
        </div>
      )}

      {/* Upload Modal */}
      {projects && projects.length > 0 && (
        <UploadDocumentModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          projects={projects}
        />
      )}
    </div>
  );
}
