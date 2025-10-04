'use client';

import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution built with Next.js, featuring real-time inventory management, payment processing, and advanced analytics.',
      image: '/projects/ecommerce.jpg',
      tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
    },
    {
      id: '2',
      title: 'SaaS Dashboard',
      description: 'Modern analytics dashboard with real-time data visualization, user management, and comprehensive reporting tools.',
      image: '/projects/dashboard.jpg',
      tags: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
    },
    {
      id: '3',
      title: 'Social Media App',
      description: 'Mobile-first social platform with real-time messaging, media sharing, and advanced privacy controls.',
      image: '/projects/social.jpg',
      tags: ['Next.js', 'Socket.io', 'Redis', 'AWS'],
      liveUrl: 'https://example.com',
      featured: true,
    },
    {
      id: '4',
      title: 'Portfolio Website',
      description: 'Award-winning portfolio site with stunning animations and seamless user experience.',
      image: '/projects/portfolio.jpg',
      tags: ['Next.js', 'Tailwind', 'Framer Motion'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
    },
  ];

  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filteredProjects = filter === 'featured'
    ? projects.filter(p => p.featured)
    : projects;

  return (
    <section id="projects" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A selection of projects showcasing expertise in full-stack development and modern web technologies
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === 'featured'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Featured Only
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-slate-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
              }}
            >
              {/* Project Image Placeholder */}
              <div className="relative h-64 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                  💻
                </div>
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-white text-slate-900 rounded-full font-medium hover:bg-blue-500 hover:text-white transition-colors duration-300"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-slate-900 transition-colors duration-300"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500 transition-colors duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
