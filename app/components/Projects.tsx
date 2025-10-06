'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  category: 'e-commerce' | 'web-app' | 'all';
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: '1',
      title: 'Ecover International',
      description: 'Contributed to a comprehensive e-commerce platform using TypeScript, Tailwind, BigCommerce, and Next.js. Integrated SearchSpring for search, Bazaar Voice for reviews, custom account pages with stored credit card features, and multi-country internationalization.',
      image: '/projects/ecover.png',
      tags: ['TypeScript', 'Next.js', 'BigCommerce', 'Tailwind', 'Vercel', 'SearchSpring', 'Bazaar Voice'],
      liveUrl: 'https://www.ecover.com/en/int/',
      category: 'e-commerce',
    },
    {
      id: '2',
      title: 'Mrs. Meyer\'s Clean Day',
      description: 'Developed interactive shopping experiences on BigCommerce Stencil theme using JavaScript and Foundation. Built custom site updates and subscription functionality using OrderGroove, with Firebase Cloud Functions for backend processing.',
      image: '/projects/mrsmeyers.png',
      tags: ['JavaScript', 'BigCommerce', 'Foundation', 'Firebase', 'OrderGroove'],
      liveUrl: 'https://mrsmeyers.com/',
      category: 'e-commerce',
    },
    {
      id: '3',
      title: 'Uplift Desk',
      description: 'Completely built this e-commerce site on BigCommerce Stencil theme using JavaScript and Foundation. Implemented custom CSS animations and developed a real-time desk builder that generates thousands of product variations dynamically.',
      image: '/projects/upliftdesk.png',
      tags: ['JavaScript', 'BigCommerce', 'Foundation', 'Firebase', 'CSS Animations', 'Product Builder'],
      liveUrl: 'https://www.upliftdesk.com',
      category: 'e-commerce',
    },
    {
      id: '4',
      title: 'Arctic Leaf Page Builder & Widgets',
      description: 'Created a BigCommerce app featuring a drag-and-drop page builder with customizable widgets for e-commerce stores. Built using Next.js, React, and Vercel with KV Redis database for real-time data management and widget configurations.',
      image: '/projects/widgetbuilder.png',
      tags: ['Next.js', 'React', 'Tailwind', 'BigCommerce', 'Vercel', 'KV Redis'],
      liveUrl: 'https://www.bigcommerce.com/apps/arctic-leaf-page-builder-widgets/',
      category: 'web-app',
    },
    {
      id: '5',
      title: 'Seek Outside',
      description: 'Built a complete e-commerce site on BigCommerce Stencil theme using JavaScript and Foundation. Implemented custom CSS animations and interactive shopping features for outdoor gear and equipment.',
      image: '/projects/seekoutside.png',
      tags: ['JavaScript', 'BigCommerce', 'Foundation', 'CSS Animations'],
      liveUrl: 'https://seekoutside.com',
      category: 'e-commerce',
    },
    {
      id: '6',
      title: 'Shannon Calderon Writes',
      description: 'Created a WordPress portfolio website for a professional writer using HTML and Bootstrap. Custom theme development with responsive design and content management features.',
      image: '/projects/shannoncalderonwrites.png',
      tags: ['WordPress', 'HTML', 'Bootstrap', 'PHP'],
      liveUrl: 'https://shannoncalderonwrites.com/',
      category: 'web-app',
    },
    {
      id: '7',
      title: 'InstaSmile Result App',
      description: 'Built a full-stack application with Next.js API routes serving the frontend and a BigCommerce draft app dashboard for backend data management. Integrated Neon DB for database operations with Big Design UI components.',
      image: '/projects/instasmile.png',
      tags: ['Next.js', 'API Routes', 'Vercel', 'Neon DB', 'BigCommerce', 'Big Design'],
      liveUrl: 'https://us.instasmile.com/pages/result/',
      category: 'web-app',
    },
  ];

  const [filter, setFilter] = useState<'all' | 'e-commerce' | 'web-app'>('all');

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From enterprise e-commerce platforms to custom BigCommerce apps - real projects delivered for real clients
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
            onClick={() => setFilter('e-commerce')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === 'e-commerce'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            E-Commerce
          </button>
          <button
            onClick={() => setFilter('web-app')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === 'web-app'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Web Apps
          </button>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-slate-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
            >
              {/* Project Image */}
              <div className="relative h-64 bg-slate-100 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-white text-slate-900 rounded-full font-medium hover:bg-blue-500 hover:text-white transition-colors duration-300"
                    >
                      View Site
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
        </motion.div>
      </div>
    </section>
  );
}
