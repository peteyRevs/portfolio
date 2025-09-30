'use client';

export default function About() {
  return (
    <section id="about" className="bg-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              I&apos;m a passionate full-stack developer who loves turning complex problems
              into elegant solutions. With a strong foundation in modern web technologies,
              I specialize in building scalable applications that users love.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              My approach combines technical expertise with creative design thinking,
              ensuring every project is both functional and beautiful. I'm constantly
              learning and exploring new technologies to stay at the forefront of web development.
            </p>

            <div className="pt-4">
              <a href="#contact" className="btn-primary">
                Let&apos;s Work Together
              </a>
            </div>
          </div>

          {/* Right - Skills Grid */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Core Skills
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'React & Next.js', level: 95 },
                { name: 'TypeScript', level: 90 },
                { name: 'Node.js', level: 85 },
                { name: 'UI/UX Design', level: 80 },
              ].map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">
                      {skill.name}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                  5+
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  Years Exp
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                  50+
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  Projects
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                  100%
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
