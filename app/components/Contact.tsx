'use client';

import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import { sendEmail } from '../actions/sendEmail';

const subjects = [
  'General Development',
  'BigCommerce Development',
  'Shopify Development',
  'Web Design',
  'E-Commerce Solutions',
  'Platform Integrations',
  'Consulting',
  'Maintenance & Support',
  'Other',
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('subject', selectedSubject);

    try {
      const result = await sendEmail(formData);
      if (result.success) {
        setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
        form.reset();
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.log(error)
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Subject
            </label>
            <Listbox value={selectedSubject} onChange={setSelectedSubject}>
              <div className="relative">
                <Listbox.Button className="relative w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 cursor-pointer">
                  <span className="block truncate">{selectedSubject}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-slate-800 border border-slate-700 py-1 shadow-lg focus:outline-none">
                  {subjects.map((subject) => (
                    <Listbox.Option
                      key={subject}
                      value={subject}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                          active ? 'bg-blue-500 text-white' : 'text-slate-300'
                        }`
                      }
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                            {subject}
                          </span>
                          {selected && (
                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-blue-500'}`}>
                              <Check className="h-5 w-5" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
              placeholder="Tell me about your project..."
            ></textarea>
          </div>

          {/* Status Message */}
          {status && (
            <div
              className={`p-4 rounded-lg ${
                status.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/50 text-emerald-400'
                  : 'bg-red-500/10 border border-red-500/50 text-red-400'
              }`}
            >
              {status.message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Alternative Contact Info */}
        {/* <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4">Or reach out directly:</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a
              href="mailto:pete.arevalo@icloud.com"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              pete.arevalo@icloud.com
            </a>
            <span className="hidden md:block text-slate-600">•</span>
            <a
              href="tel:+16822498576"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              +1 (682) 249-8576
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
}
