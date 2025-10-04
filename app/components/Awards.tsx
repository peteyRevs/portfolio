'use client';

import { Star, Trophy, Sparkles } from 'lucide-react';

interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: typeof Trophy;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export default function Awards() {
  const awards: Award[] = [
    {
      id: '1',
      title: 'BigCommerce Design Award',
      organization: 'BigCommerce',
      year: '2017',
      description: 'Recognized for exceptional e-commerce design excellence and innovative user experience in creating custom BigCommerce themes.',
      icon: Trophy,
    },
    {
      id: '2',
      title: 'Employee of the Year',
      organization: 'Uplift Desk',
      year: '2017',
      description: 'Awarded for outstanding contributions to the team, exceptional code quality, and leadership in mentoring junior developers.',
      icon: Sparkles,
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Brian Genchur',
      role: 'Marketing & PR Director',
      company: 'Square Grove LLC',
      content: "Pete is an incredible asset to any team. His ability to work quickly, his sense of what works and what doesn't, his thoroughness and knowledge, his ability to learn and adapt, and his work ethic are among the best I've worked with. He wants to build you the best site in the world, and he's willing to do what it takes to make that possible. Give Pete a project, and he will exceed your expectations in every way.",
      rating: 5,
    },
    {
      id: '2',
      name: 'Shannon Calderon',
      role: 'Founder',
      company: 'We Can Write That',
      content: "Pete is a talented developer, incredibly hardworking, a self-starter, super smart, creative, totally focused on doing the job right to ensure clean code and mobile responsiveness/cross-browser compatibility. He has corrected several clunky coding problems created by our initial outside development team, and has come up with solutions in an afternoon that our contracted programmers said were not possible. He is also a great communicator, a very funny guy, and an all-around pleasure to work with.",
      rating: 5,
    },
    {
      id: '3',
      name: 'Angela Arnold',
      role: 'Content Manager',
      company: 'The Human Solution',
      content: "The front end development work Peter did for our company has really taken our website to the next level. As an e-commerce site, we are always looking for ways to improve the customer experience, and Peter implemented interactive features that make the shopping experience fun for our customers. He also had several great ideas for improving the overall design. We continue to receive positive feedback about our site as a result of the work he's done!",
      rating: 5,
    },
  ];

  return (
    <section id="reviews-awards" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Client Reviews & Awards
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-slate-700/50 rounded-lg p-6 border border-slate-600"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div>
                  <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                  <p className="text-xs text-slate-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {awards.map((award) => {
            const IconComponent = award.icon;
            return (
              <div
                key={award.id}
                className="bg-slate-700/50 rounded-lg p-6 border border-slate-600"
              >
                {/* Icon */}
                <IconComponent className="w-12 h-12 text-blue-400 mb-4" />

                {/* Award Title */}
                <h4 className="text-xl font-bold text-white mb-2">
                  {award.title}
                </h4>

                {/* Organization and Year */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-blue-400">
                    {award.organization}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-sm text-slate-400">
                    {award.year}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed">
                  {award.description}
                </p>
              </div>
            );
          })}
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
