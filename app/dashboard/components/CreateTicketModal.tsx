'use client';

import { useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogPanel, DialogTitle, Listbox } from '@headlessui/react';
import { Project, TicketPriority } from '@/types/database';
import { createClient } from '@/lib/supabase/client';
import {
  X,
  Loader2,
  ChevronDown,
  Check,
  AlertCircle
} from 'lucide-react';

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  clientId: string;
}

const priorities: { value: TicketPriority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-slate-400' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-400' },
  { value: 'high', label: 'High', color: 'text-orange-400' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-400' },
];

export default function CreateTicketModal({ isOpen, onClose, projects, clientId }: CreateTicketModalProps) {
  const router = useRouter();
  const supabase = createClient();

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0] || null);
  const [selectedPriority, setSelectedPriority] = useState<typeof priorities[0]>(priorities[1]); // Default to 'medium'
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!subject.trim() || !description.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const { error: dbError } = await supabase
        .from('support_tickets')
        .insert({
          client_id: clientId,
          project_id: selectedProject?.id || null,
          subject: subject.trim(),
          description: description.trim(),
          priority: selectedPriority.value,
          status: 'open',
        });

      if (dbError) throw dbError;

      // Reset form and close modal
      setSubject('');
      setDescription('');
      setSelectedProject(projects[0] || null);
      setSelectedPriority(priorities[1]);
      onClose();

      // Refresh the page to show new ticket
      router.refresh();
    } catch (error) {
      console.error('Submit error:', error);
      setError('Failed to create ticket. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setSubject('');
      setDescription('');
      setSelectedProject(projects[0] || null);
      setSelectedPriority(priorities[1]);
      setError('');
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
                Create Support Ticket
              </DialogTitle>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                disabled={submitting}
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={submitting}
                  placeholder="Brief description of your issue"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={submitting}
                  rows={4}
                  placeholder="Provide detailed information about your request..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Project - HeadlessUI Listbox */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Related Project (Optional)
                </label>
                <Listbox value={selectedProject} onChange={setSelectedProject} disabled={submitting}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                      <span className="block truncate">{selectedProject?.project_name || 'General Support'}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                        <ChevronDown className="h-5 w-5 text-slate-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-slate-800 border border-white/20 py-1 shadow-lg focus:outline-none">
                      <Listbox.Option
                        value={null}
                        as={Fragment}
                      >
                        {({ active, selected }) => (
                          <li
                            className={`relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                              active ? 'bg-white/10 text-white' : 'text-slate-300'
                            }`}
                          >
                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                              General Support
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-400">
                                <Check className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                          </li>
                        )}
                      </Listbox.Option>
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

              {/* Priority - HeadlessUI Listbox */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Priority
                </label>
                <Listbox value={selectedPriority} onChange={setSelectedPriority} disabled={submitting}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                      <span className={`block truncate ${selectedPriority.color}`}>
                        {selectedPriority.label}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                        <ChevronDown className="h-5 w-5 text-slate-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-slate-800 border border-white/20 py-1 shadow-lg focus:outline-none">
                      {priorities.map((priority) => (
                        <Listbox.Option
                          key={priority.value}
                          value={priority}
                          as={Fragment}
                        >
                          {({ active, selected }) => (
                            <li
                              className={`relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                                active ? 'bg-white/10 text-white' : 'text-slate-300'
                              }`}
                            >
                              <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'} ${priority.color}`}>
                                {priority.label}
                              </span>
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

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={!subject.trim() || !description.trim() || submitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>Submit Ticket</>
                  )}
                </button>
                <button
                  onClick={handleClose}
                  disabled={submitting}
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
