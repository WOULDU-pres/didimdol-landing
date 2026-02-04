"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

// Korean phone validation regex (010-1234-5678 or 01012345678)
const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

const formSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  phone: z
    .string()
    .min(1, "연락처를 입력해주세요")
    .regex(phoneRegex, "올바른 휴대폰 번호 형식이 아닙니다 (예: 010-1234-5678)"),
  message: z.string().optional(),
  privacy: z.boolean().refine((val) => val === true, {
    message: "개인정보 처리방침에 동의해주세요",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function Contact() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
      privacy: false,
    },
  });

  const privacyChecked = watch("privacy");

  const onSubmit = async (data: FormData) => {
    setSubmitStatus("loading");

    try {
      // CRITICAL: Only send name, phone, message to API (exclude privacy field)
      const payload = {
        name: data.name,
        phone: data.phone,
        message: data.message || "",
      };

      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "상담 신청에 실패했습니다");
      }

      setSubmitStatus("success");
      reset();

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 bg-gradient-to-b from-noble-beige to-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-noble-navy/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-noble-navy/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-5xl md:text-6xl font-bold text-noble-navy mb-4"
            >
              무료 상담 신청
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-muted-foreground max-w-xl mx-auto"
            >
              법무사가 직접 24시간 내 연락드립니다.
              <br />
              부담 없이 문의해주세요.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-noble-navy/10"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium text-foreground">
                  이름 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="홍길동"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                  className="h-12 text-base"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-medium text-foreground">
                  연락처 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="010-1234-5678"
                  aria-invalid={!!errors.phone}
                  {...register("phone")}
                  className="h-12 text-base"
                />
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.phone.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-base font-medium text-foreground">
                  상담 내용 <span className="text-muted-foreground text-sm">(선택)</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="상담받고 싶은 내용을 자유롭게 적어주세요"
                  rows={5}
                  {...register("message")}
                  className="text-base resize-none"
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.message.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-noble-beige/50 rounded-lg border border-noble-navy/10">
                  <Checkbox
                    id="privacy"
                    checked={privacyChecked}
                    onCheckedChange={(checked) => setValue("privacy", !!checked)}
                    aria-invalid={!!errors.privacy}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="privacy"
                      className="text-sm font-normal text-foreground cursor-pointer leading-relaxed"
                    >
                      개인정보 수집 및 이용에 동의합니다{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      수집 항목: 이름, 연락처, 상담 내용
                      <br />
                      이용 목적: 상담 서비스 제공
                      <br />
                      보유 기간: 상담 완료 후 1년
                    </p>
                  </div>
                </div>
                {errors.privacy && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive"
                  >
                    {errors.privacy.message}
                  </motion.p>
                )}
              </div>

              <Button
                type="submit"
                disabled={submitStatus === "loading"}
                className="w-full h-14 text-lg font-semibold bg-noble-navy hover:bg-noble-navy/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {submitStatus === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    전송 중...
                  </span>
                ) : (
                  "무료 상담 신청하기"
                )}
              </Button>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg text-center"
                >
                  <p className="font-medium text-lg mb-1">✓ 신청이 완료되었습니다!</p>
                  <p className="text-sm text-green-700">
                    빠른 시일 내에 연락드리겠습니다. 감사합니다.
                  </p>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg text-center"
                >
                  <p className="font-medium text-lg mb-1">신청 중 오류가 발생했습니다</p>
                  <p className="text-sm text-red-700">
                    잠시 후 다시 시도해주시거나, 직접 연락 부탁드립니다.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            상담 신청 시 입력하신 정보는 안전하게 보호됩니다
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground mb-2">직접 연락을 원하시면</p>
            <a 
              href="tel:010-3661-5336" 
              className="inline-flex items-center gap-2 text-2xl md:text-3xl font-bold text-noble-navy hover:text-noble-navy/80 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              010-3661-5336
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex justify-center gap-6"
          >
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-noble-navy/10 rounded-full text-noble-navy hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className="font-medium">유튜브</span>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-noble-navy/10 rounded-full text-noble-navy hover:bg-[#03C75A] hover:text-white hover:border-[#03C75A] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
              </svg>
              <span className="font-medium">블로그</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
