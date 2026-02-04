"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <section className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        
        <div className="relative z-10 flex-1 flex flex-col px-6 py-12 max-w-lg mx-auto w-full">
          <header className="text-center mb-8 opacity-0 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg 
                  className="w-5 h-5 text-primary" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" 
                  />
                </svg>
              </div>
              <span className="text-xl font-semibold tracking-tight text-foreground">
                디딤돌 법무사
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground tracking-wide uppercase mb-4">
              회생 · 파산 전문
            </p>
          </header>

          <div className="flex-1 flex flex-col justify-center mb-8">
            <div className="text-center space-y-6 opacity-0 animate-fade-in-up animation-delay-200">
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-foreground">
                무거운 짐,<br />
                <span className="text-primary">함께 내려놓겠습니다</span>
              </h1>
              
              <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
                다시 시작하는 당신 곁에 디딤돌이 있습니다.
                <br />
                부담없이 상담해 주세요.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 opacity-0 animate-fade-in-up animation-delay-400">
              {[
                { number: "1,000+", label: "상담 건수" },
                { number: "98%", label: "고객 만족도" },
                { number: "10년+", label: "실무 경력" },
              ].map((stat) => (
                <div 
                  key={stat.label} 
                  className="text-center p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm"
                >
                  <div className="text-xl font-bold text-primary">{stat.number}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="opacity-0 animate-fade-in-up animation-delay-600">
            {isSubmitted ? (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200/50 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  상담 신청이 완료되었습니다
                </h3>
                <p className="text-sm text-muted-foreground">
                  빠른 시일 내에 연락드리겠습니다.
                </p>
                <Button 
                  className="mt-6"
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                >
                  새 상담 신청
                </Button>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200/50 space-y-5"
              >
                <div className="text-center mb-2">
                  <h2 className="text-lg font-semibold text-foreground">무료 상담 신청</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    연락처를 남겨주시면 상담해 드립니다
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      이름
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      연락처
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      상담 내용
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="간단히 상황을 알려주세요"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors resize-none"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl text-base font-medium shadow-md hover:shadow-lg transition-shadow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "전송 중..." : "무료 상담 신청하기"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  상담 내용은 철저히 비밀이 보장됩니다
                </p>
              </form>
            )}
          </div>

          <footer className="mt-8 text-center text-xs text-muted-foreground opacity-0 animate-fade-in animation-delay-600">
            <p>© 2024 디딤돌 법무사. All rights reserved.</p>
          </footer>
        </div>
      </section>
    </main>
  );
}
