'use client';

import { useState } from 'react';

interface Skill {
  name: string;
  category: string;
  level: number;
  icon: string;
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const skills: Skill[] = [
    // Frontend
    { name: 'React', category: 'frontend', level: 95, icon: '⚛️' },
    { name: 'Next.js', category: 'frontend', level: 95, icon: '▲' },
    { name: 'TypeScript', category: 'frontend', level: 90, icon: 'TS' },
    { name: 'Tailwind CSS', category: 'frontend', level: 90, icon: '🎨' },
    { name: 'JavaScript', category: 'frontend', level: 95, icon: 'JS' },
    { name: 'HTML/CSS', category: 'frontend', level: 95, icon: '📄' },

    // Backend
    { name: 'Node.js', category: 'backend', level: 85, icon: '🟢' },
    { name: 'Express', category: 'backend', level: 85, icon: '⚡' },
    { name: 'PostgreSQL', category: 'backend', level: 80, icon: '🐘' },
    { name: 'MongoDB', category: 'backend', level: 75, icon: '🍃' },
    { name: 'REST APIs', category: 'backend', level: 90, icon: '🔌' },

    // Tools
    { name: 'Git', category: 'tools', level: 90, icon: '📦' },
    { name: 'Docker', category: 'tools', level: 75, icon: '🐳' },
    { name: 'Vercel', category: 'tools', level: 85, icon: '▲' },
    { name: 'VS Code', category: 'tools', level: 95, icon: '💻' },
  ];

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A decade of experience building modern web applications with cutting-edge technologies
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 hover:border-blue-200"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.05}s backwards`,
              }}
            >
              {/* Skill Icon */}
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>

              {/* Skill Name */}
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                {skill.name}
              </h3>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Proficiency</span>
                  <span className="font-semibold text-blue-600">{skill.level}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${skill.level}%`,
                      transitionDelay: `${index * 0.05}s`
                    }}
                  ></div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-indigo-600/0 group-hover:from-blue-500/5 group-hover:to-indigo-600/5 transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-2">
              10+
            </div>
            <div className="text-sm text-slate-600 font-medium">
              Years Experience
            </div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-2">
              50+
            </div>
            <div className="text-sm text-slate-600 font-medium">
              Projects Completed
            </div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-2">
              15+
            </div>
            <div className="text-sm text-slate-600 font-medium">
              Technologies
            </div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-2">
              100%
            </div>
            <div className="text-sm text-slate-600 font-medium">
              Client Satisfaction
            </div>
          </div>
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