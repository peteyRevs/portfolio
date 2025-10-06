'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observerRef.current.observe(ref.current);
    }

    return () => {
      if (observerRef.current && ref.current) {
        observerRef.current.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { count, ref };
}

export default function Mission() {
  const years = useCountUp(10);
  const savings = useCountUp(50);
  const quality = useCountUp(100);
  return (
    <section id="mission" className="bg-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Mission
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Delivering enterprise-quality solutions at half the cost
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="max-w-4xl mx-auto space-y-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 border border-blue-100">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              With over <span className="font-semibold text-blue-600">10 years of experience</span> working
              for professional agencies, I recognized an opportunity to deliver top-quality solutions at
              a fraction of traditional agency costs.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              <span className="font-semibold text-slate-900">How we achieve this:</span>
            </p>

            <div className="space-y-4">
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Direct Communication</h3>
                  <p className="text-slate-700">
                    From proprietor directly to creative technologist - no middlemen, no miscommunication,
                    no inflated costs.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">End-to-End Expertise</h3>
                  <p className="text-slate-700">
                    As a highly skilled full-stack developer, I understand every phase from concept to
                    deployment, ensuring seamless execution.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">AI-Powered Efficiency</h3>
                  <p className="text-slate-700">
                    Leveraging cutting-edge AI for testing, code reviews, and streamlining development -
                    delivering faster without compromising quality.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div
            ref={years.ref}
            className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-2">
              {years.count}+
            </div>
            <div className="text-slate-600 font-medium">
              Years Experience
            </div>
          </motion.div>
          <motion.div
            ref={savings.ref}
            className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-2">
              {savings.count}%
            </div>
            <div className="text-slate-600 font-medium">
              Cost Savings
            </div>
          </motion.div>
          <motion.div
            ref={quality.ref}
            className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-2">
              {quality.count}%
            </div>
            <div className="text-slate-600 font-medium">
              Enterprise Quality
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <a href="#contact" className="btn-primary">
            Launch Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
