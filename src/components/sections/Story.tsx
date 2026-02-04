'use client';

import { motion, useReducedMotion, Variants } from 'framer-motion';

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
    <section className="relative min-h-screen bg-white py-24 md:py-32 lg:py-40">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          <div className="lg:col-span-7 space-y-10">
            <motion.h2
              variants={itemVariants}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.15] tracking-tight"
              style={{ color: 'var(--noble-navy)' }}
            >
              진중한 당신의 손을 잡을{' '}
              <span className="block mt-2 md:mt-3">준비가 되어있습니다.</span>
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
              <p
                className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light opacity-90"
                style={{ 
                  color: 'var(--noble-navy)',
                  lineHeight: '1.8',
                }}
              >
                많은 의뢰인들이 물어봅니다. 사람과산재에 맡기면 이겨줄 수 있냐고?
              </p>

              <p
                className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light opacity-90"
                style={{ 
                  color: 'var(--noble-navy)',
                  lineHeight: '1.8',
                }}
              >
                네. 반드시 이겨드리겠습니다. 저희는 이기지 못할 사건은 처음부터 수임하지 않습니다. 
                &apos;사람과산재가 이기지 못한다면 어느 누구도 이 사건은 이길 수 없다&apos;는 저희들만의 신념이 있습니다.
              </p>

              <p
                className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light opacity-90"
                style={{ 
                  color: 'var(--noble-navy)',
                  lineHeight: '1.8',
                }}
              >
                그렇다면 사람과산재는 한 번도 진 적이 없나요?
              </p>

              <p
                className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light opacity-90"
                style={{ 
                  color: 'var(--noble-navy)',
                  lineHeight: '1.8',
                }}
              >
                있습니다. 저희도 질 때가 있습니다. 이길 가능성이 낮은 사건이라도 그 사건이 세상의 벽을 조금이라도 
                흔들 수 있는 의미 있는 사건이라면, 저희는 도전하고 당당히 부딪힙니다.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-20 h-0.5 opacity-20"
              style={{ backgroundColor: 'var(--noble-navy)' }}
            />
          </div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] lg:aspect-[4/5] w-full max-w-md mx-auto lg:ml-auto">
              <div 
                className="absolute inset-0 border-2 translate-x-4 translate-y-4 opacity-10"
                style={{ borderColor: 'var(--noble-navy)' }}
              />
              <div 
                className="absolute inset-0 border translate-x-2 translate-y-2 opacity-20"
                style={{ borderColor: 'var(--noble-navy)' }}
              />
              
              <div
                className="relative w-full h-full overflow-hidden"
                style={{ backgroundColor: 'var(--noble-beige)' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div 
                      className="w-20 h-20 mx-auto rounded-full border-2 flex items-center justify-center opacity-30"
                      style={{ borderColor: 'var(--noble-navy)' }}
                    >
                      <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        style={{ color: 'var(--noble-navy)' }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>
                    <p
                      className="text-sm font-light tracking-wide opacity-40"
                      style={{ color: 'var(--noble-navy)' }}
                    >
                      법무사 사진
                    </p>
                  </div>
                </div>

                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    background: 'linear-gradient(135deg, transparent 0%, var(--noble-navy) 100%)',
                  }}
                />
              </div>
            </div>

            <div 
              className="absolute -top-8 -left-4 text-8xl font-serif opacity-5 pointer-events-none hidden lg:block"
              style={{ color: 'var(--noble-navy)' }}
            >
              &ldquo;
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
