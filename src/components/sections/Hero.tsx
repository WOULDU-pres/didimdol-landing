"use client";

import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-noble-beige overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-0 right-0 w-1/3 h-1/3 opacity-5">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="150" cy="50" r="100" fill="currentColor" className="text-noble-navy" />
        </svg>
      </div>

      <div className="relative container mx-auto px-6 lg:px-12 py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen">
          <div className="flex flex-col justify-center space-y-8 lg:space-y-10 opacity-0 animate-fade-in-up">
            <div className="flex items-center gap-3 opacity-0 animate-fade-in-up animation-delay-200">
              <div className="w-12 h-[2px] bg-noble-navy" />
              <span className="text-sm tracking-[0.2em] uppercase text-noble-navy/60 font-medium">
                디딤돌 법무사
              </span>
            </div>

            <h1 className="opacity-0 animate-fade-in-up animation-delay-400">
              <span className="block text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-noble-navy leading-[1.1] tracking-tight">
                무거운 짐,
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-noble-navy leading-[1.1] tracking-tight mt-2">
                함께 내려놓겠습니다
              </span>
            </h1>

            <p className="text-lg md:text-xl text-noble-navy/70 font-light leading-relaxed max-w-lg opacity-0 animate-fade-in-up animation-delay-600">
              다시 시작하는 당신 곁에 디딤돌이 있습니다.
              <br />
              부담없이 상담해 주세요.
            </p>

            <div className="opacity-0 animate-fade-in-up animation-delay-600">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-noble-navy text-noble-beige font-medium rounded-full transition-all duration-300 hover:bg-noble-navy/90 hover:gap-4 hover:shadow-xl group"
              >
                <span className="text-base tracking-wide">상담 시작하기</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="flex items-center gap-8 pt-4 opacity-0 animate-fade-in-up animation-delay-600">
              <div className="text-sm text-noble-navy/50">
                <div className="font-semibold text-noble-navy text-2xl">10+</div>
                <div className="mt-1">년 경력</div>
              </div>
              <div className="w-px h-12 bg-noble-navy/10" />
              <div className="text-sm text-noble-navy/50">
                <div className="font-semibold text-noble-navy text-2xl">500+</div>
                <div className="mt-1">상담 건수</div>
              </div>
              <div className="w-px h-12 bg-noble-navy/10" />
              <div className="text-sm text-noble-navy/50">
                <div className="font-semibold text-noble-navy text-2xl">24시간</div>
                <div className="mt-1">빠른 응대</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end opacity-0 animate-fade-in animation-delay-400">
            <div className="relative w-full max-w-lg aspect-[3/4] group">
              <div className="absolute -inset-4 border-2 border-noble-navy/10 rounded-2xl transition-all duration-500 group-hover:border-noble-navy/20 group-hover:-inset-6" />
              
              <div className="relative w-full h-full bg-gradient-to-br from-noble-navy/5 to-noble-navy/10 rounded-xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-24 h-24 mx-auto rounded-full bg-noble-navy/10 flex items-center justify-center">
                      <svg 
                        className="w-12 h-12 text-noble-navy/40" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                        />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <p className="text-noble-navy/60 font-serif text-lg">법무사 사진</p>
                      <p className="text-noble-navy/40 text-sm font-light">Professional Portrait</p>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-noble-navy/5 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
    </section>
  );
}
