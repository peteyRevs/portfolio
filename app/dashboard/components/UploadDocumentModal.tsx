'use client';

import { useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogPanel, DialogTitle, Listbox } from '@headlessui/react';
import { Project } from '@/types/database';
import { createClient } from '@/lib/supabase/client';
import {
  Upload,
  X,
  Loader2,
  ChevronDown,
  Check
} from 'lucide-react';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
}

export default function UploadDocumentModal({ isOpen, onClose, projects }: UploadDocumentModalProps) {
  const router = useRouter();
  const supabase = createClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0] || null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedProject) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create unique filename
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // Insert document record
      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          project_id: selectedProject.id,
          file_name: selectedFile.name,
          file_url: publicUrl,
          file_type: selectedFile.type,
          file_size: selectedFile.size,
          category: null, // Category can be set by admin later
          description: description || null,
          uploaded_by: user.id
        });

      if (dbError) throw dbError;

      // Reset form and close modal
      setSelectedFile(null);
      setSelectedProject(projects[0] || null);
      setDescription('');
      onClose();

      // Refresh the page to show new document
      router.refresh();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleClose = () => {
    if (!uploading) {
      setSelectedFile(null);
      setSelectedProject(projects[0] || null);
      setDescription('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-900 border border-white/20 text-left align-middle shadow-xl transition-all">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <DialogTitle as="h2" className="text-2xl font-bold text-white">
                Upload Document
              </DialogTitle>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                disabled={uploading}
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* File Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Select File
                </label>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {selectedFile && (
                  <div className="mt-2 text-sm text-slate-400">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </div>
                )}
              </div>

              {/* Project - HeadlessUI Listbox */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project
                </label>
                <Listbox value={selectedProject} onChange={setSelectedProject} disabled={uploading}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                      <span className="block truncate">{selectedProject?.project_name || 'Select a project'}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                        <ChevronDown className="h-5 w-5 text-slate-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-slate-800 border border-white/20 py-1 shadow-lg focus:outline-none">
                      {projects.map((project) => (
                        <Listbox.Option
                          key={project.id}
                          value={project}
                          as={Fragment}
                        >
                          {({ active, selected }) => (
                            <li
                              className={`relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                                active ? 'bg-white/10 text-white' : 'text-slate-300'
                              }`}
                            >
                              <div className="flex flex-col">
                                <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                  {project.project_name}
                                </span>
                                {project.description && (
                                  <span className="text-xs text-slate-500 truncate">
                                    {project.description}
                                  </span>
                                )}
                              </div>
                              {selected && (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-400">
                                  <Check className="h-5 w-5" aria-hidden="true" />
                                </span>
                              )}
                            </li>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={uploading}
                  rows={3}
                  placeholder="Add a description for this file..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || !selectedProject || uploading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Upload
                    </>
                  )}
                </button>
                <button
                  onClick={handleClose}
                  disabled={uploading}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
