'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ServiceTab = 'web-dev' | 'ecommerce' | 'integrations' | 'consulting';

export default function Services() {
  const [activeTab, setActiveTab] = useState<ServiceTab>('web-dev');

  const services = {
    'web-dev': {
      title: 'Full Stack Web Development',
      description: 'Custom websites and web applications built with modern technologies',
      features: [
        'Modern Frameworks (React, Next.js, Vue.js, Svelte)',
        'Responsive design & UI/UX (Figma to code)',
        'Performance & SEO optimized',
        'Accessibility-focused (WCAG compliant)',
        'Progressive Web Apps (PWA)',
        'Full-stack API development',
        'Cloud deployment & CI/CD',
      ],
      technologies: ['Next.js', 'React', 'Vue.js', 'Svelte', 'TypeScript', 'Node.js', 'Figma', 'Tailwind CSS', 'Vercel', 'Cloudflare', 'Firebase', 'Google Cloud'],
    },
    'ecommerce': {
      title: 'E-Commerce Solutions',
      description: 'Full-featured online stores that drive sales and growth',
      features: [
        'BigCommerce custom theme development',
        'Shopify store setup & customization',
        'Custom checkout experiences',
        'Product catalog management',
        'Payment gateway integration',
        'Inventory management systems',
      ],
      technologies: ['BigCommerce', 'Shopify', 'Stripe', 'PayPal', 'Next.js','Catalst', 'Stencil', 'Liquid'],
    },
    'integrations': {
      title: 'Platform Integrations',
      description: 'Seamless connections between your tools and services',
      features: [
        'Payment processors (Stripe, PayPal)',
        'Email marketing (Klaviyo, Mailchimp)',
        'Search & Discovery (SearchSpring)',
        'Analytics & tracking',
        'CRM & automation tools',
        'Custom API development',
      ],
      technologies: ['Stripe', 'PayPal', 'Klaviyo', 'SearchSpring', 'REST APIs', 'GraphQL', 'Webhooks'],
    },
    'consulting': {
      title: 'Consulting & Deployment',
      description: 'Strategic guidance and reliable infrastructure',
      features: [
        'Technical architecture planning',
        'Code reviews & optimization',
        'Performance audits',
        'Deployment to cloud platforms',
        'CI/CD pipeline setup',
        'Ongoing maintenance & support',
      ],
      technologies: ['Vercel', 'Cloudflare', 'Firebase', 'Google Cloud', 'AWS', 'Docker', 'GitHub Actions'],
    },
  };

  const tabs = [
    { id: 'web-dev', label: 'Full Stack Web Development' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'consulting', label: 'Consulting' },
  ] as const;

  return (
    <section id="services" className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
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
            Services & Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive development solutions tailored to your business needs
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ServiceTab)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-8 md:p-12">
                {/* Title & Description */}
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">
                    {services[activeTab].title}
                  </h3>
                  <p className="text-lg text-slate-600">
                    {services[activeTab].description}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">
                    What&apos;s Included:
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {services[activeTab].features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">
                    Technologies & Platforms:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {services[activeTab].technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-slate-700 rounded-full text-sm font-medium border border-blue-100"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Footer */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-t border-blue-100">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-slate-700 font-medium">
                    Ready to get started with {services[activeTab].title.toLowerCase()}?
                  </p>
                  <a href="#contact" className="btn-primary">
                    Start Your Project
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
