import { Project } from '@/types/database';
import { Check, ExternalLink, AlertCircle } from 'lucide-react';

interface ProjectsTabProps {
  projects: Project[];
}

export default function ProjectsTab({ projects }: ProjectsTabProps) {
  console.log(projects[0].checklist)
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
        <p className="text-slate-300">View and track all your projects</p>
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {project.project_name}
                  </h3>
                  <p className="text-slate-300 mb-4">
                    {project.description || 'No description available'}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    project.status === 'completed'
                      ? 'bg-green-500/20 text-green-400'
                      : project.status === 'development'
                      ? 'bg-blue-500/20 text-blue-400'
                      : project.status === 'design'
                      ? 'bg-purple-500/20 text-purple-400'
                      : project.status === 'review'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : project.status === 'blocked'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-slate-500/20 text-slate-400'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Progress</span>
                  <span className="text-sm font-medium text-white">
                    {project.progress_percentage}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all"
                    style={{ width: `${project.progress_percentage}%` }}
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="flex items-center gap-6 text-sm text-slate-400 mb-4">
                {project.start_date && (
                  <div>
                    <span className="font-medium text-slate-300">Start:</span>{' '}
                    {new Date(project.start_date).toLocaleDateString()}
                  </div>
                )}
                {project.end_date && (
                  <div>
                    <span className="font-medium text-slate-300">Due:</span>{' '}
                    {new Date(project.end_date).toLocaleDateString()}
                  </div>
                )}
                <div>
                  <span className="font-medium text-slate-300">Created:</span>{' '}
                  {new Date(project.created_at).toLocaleDateString()}
                </div>
              </div>

              {/* Next Action */}
              {project.next_action && (
                <div className={`mb-4 p-4 rounded-lg border ${
                  project.status === 'blocked'
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-blue-500/10 border-blue-500/30'
                }`}>
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`w-5 h-5 mt-0.5 ${
                      project.status === 'blocked' ? 'text-red-400' : 'text-blue-400'
                    }`} />
                    <div>
                      <h4 className={`text-sm font-semibold mb-1 ${
                        project.status === 'blocked' ? 'text-red-400' : 'text-blue-400'
                      }`}>
                        Next Action
                      </h4>
                      <p className="text-sm text-slate-300">{project.next_action}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Preview Link */}
              {project.preview_url && (
                <div className="mb-4">
                  <a
                    href={project.preview_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Preview
                  </a>
                </div>
              )}

              {/* Checklist */}
              {project.checklist && project.checklist.length > 0 && (
                <div className="border-t border-white/10 pt-4">
                  <h4 className="text-sm font-semibold text-slate-300 mb-3">Tasks</h4>
                  <div className="space-y-2">
                    {project.checklist.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 text-sm"
                      >
                        <div
                          className={`flex items-center justify-center w-5 h-5 rounded border-2 ${
                            item.completed
                              ? 'bg-green-500 border-green-500'
                              : 'border-slate-500'
                          }`}
                        >
                          {item.completed && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span
                          className={`${
                            item.completed
                              ? 'text-slate-400 line-through'
                              : 'text-slate-200'
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-slate-500">
                    {project.checklist.filter((item) => item.completed).length} of{' '}
                    {project.checklist.length} tasks completed
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-xl text-center">
          <p className="text-slate-400 text-lg">No projects yet</p>
          <p className="text-slate-500 text-sm mt-2">
            Your projects will appear here once they are created
          </p>
        </div>
      )}
    </div>
  );
}
