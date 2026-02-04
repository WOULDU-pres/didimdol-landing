'use client';

import { motion, useReducedMotion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Story() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.4, 0, 0.2, 1] as const,
        duration: shouldReduceMotion ? 0.01 : 0.8,
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-noble-beige py-24 md:py-32 lg:py-40">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 right-0 w-1/3 h-1/3 opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, var(--noble-navy) 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute bottom-40 left-0 w-1/4 h-1/4 opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, var(--noble-navy) 0%, transparent 70%)',
          }}
        />
      </div>

      <motion.div
        className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-4xl">
          <div className="space-y-10">
            <motion.h2
              variants={itemVariants}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight"
              style={{ color: 'var(--noble-navy)' }}
            >
              <span className="block">다시 일어서려는</span>
              <span className="block mt-2">당신의 간절한 손을</span>
              <span className="block mt-2 text-4xl md:text-5xl lg:text-6xl">디딤돌 법무사가 잡겠습니다.</span>
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
              <p
                className="text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed text-noble-navy"
                style={{ lineHeight: '1.6' }}
              >
                &quot;정말 빚에서 벗어날 수 있을까요?&quot;
              </p>

              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground" style={{ lineHeight: '1.8' }}>
                수많은 의뢰인이 떨리는 목소리로 질문하십니다.<br />
                저희의 대답은 언제나 <span className="font-bold text-noble-navy text-2xl md:text-3xl">&apos;네&apos;</span>입니다.
              </p>

              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground" style={{ lineHeight: '1.8' }}>
                저희는 책임질 수 없는 약속을 남발하지 않습니다. 수임 전 철저한 분석을 통해 가능성을 검토하며, 저희가 맡은 이상 반드시 결과로 증명합니다.
              </p>

              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground" style={{ lineHeight: '1.8' }}>
                때로는 법원의 벽이 높게 느껴질 때도 있습니다. 하지만 그 벽 너머에 의뢰인의 새로운 삶이 기다리고 있다면, 디딤돌은 결코 포기하지 않고 정면으로 마주하겠습니다.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-20 h-0.5 opacity-20"
              style={{ backgroundColor: 'var(--noble-navy)' }}
            />

            <motion.div variants={itemVariants} className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-noble-navy text-white font-medium rounded-full transition-all duration-300 hover:bg-noble-navy/90 hover:gap-4 hover:shadow-xl group"
              >
                <span className="text-base tracking-wide">상담 시작하기</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
