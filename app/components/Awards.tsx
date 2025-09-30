'use client';

interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: string;
}

export default function Awards() {
  const awards: Award[] = [
    {
      id: '1',
      title: 'BigCommerce Design Award',
      organization: 'BigCommerce',
      year: '2017',
      description: 'Recognized for exceptional e-commerce design excellence and innovative user experience in creating custom BigCommerce themes.',
      icon: '🏆',
    },
    {
      id: '2',
      title: 'Employee of the Year',
      organization: 'Arctic Leaf',
      year: '2023',
      description: 'Awarded for outstanding contributions to the team, exceptional code quality, and leadership in mentoring junior developers.',
      icon: '⭐',
    },
  ];

  return (
    <section id="awards" className="py-24 md:py-32 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Awards & Recognition
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Celebrating achievements and recognition for excellence in web development and design
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {awards.map((award, index) => (
            <div
              key={award.id}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s backwards`,
              }}
            >
              {/* Icon */}
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                {award.icon}
              </div>

              {/* Award Title */}
              <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {award.title}
              </h3>

              {/* Organization and Year */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                  {award.organization}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-sm font-medium text-slate-600">
                  {award.year}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed">
                {award.description}
              </p>

              {/* Decorative Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500 transition-colors duration-500 pointer-events-none"></div>

              {/* Decorative Corner Element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-bl-full rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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