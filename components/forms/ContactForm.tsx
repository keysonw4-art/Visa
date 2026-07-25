"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import { contactSchema, type ContactInput } from "@/lib/validation/contact";

type Status = "idle" | "sending" | "success" | "error";

/** Formulário de contato completo (Nome, WhatsApp, E-mail, Mensagem + consentimento). */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { message: "", company: "", consent: false },
  });

  // Timestamp de render (anti-bot por timing) — gravado no form após o mount.
  useEffect(() => {
    setValue("renderedAt", Date.now());
  }, [setValue]);

  async function onSubmit(values: ContactInput) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contato/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-teal-300 bg-teal-50 p-8 text-center">
        <h3 className="text-lg font-bold text-teal-600">Mensagem enviada!</h3>
        <p className="mt-2 text-ink-600">
          Recebemos seu contato e nossa equipe retornará o mais breve possível.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Enviar outra mensagem
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot — invisível para humanos, isca para bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Empresa
          <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
        </label>
      </div>

      <Field label="Nome completo" error={errors.name?.message}>
        <input
          type="text"
          autoComplete="name"
          className={inputClass}
          {...register("name")}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="WhatsApp" error={errors.phone?.message}>
          <input type="tel" autoComplete="tel" className={inputClass} {...register("phone")} />
        </Field>
        <Field label="E-mail" error={errors.email?.message}>
          <input type="email" autoComplete="email" className={inputClass} {...register("email")} />
        </Field>
      </div>

      <Field label="Mensagem" error={errors.message?.message}>
        <textarea rows={4} className={inputClass} {...register("message")} />
      </Field>

      <label className="flex items-start gap-3 text-sm text-ink-600">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-brand-500" {...register("consent")} />
        <span>
          Li e concordo com a{" "}
          <Link href="/politica-de-privacidade/" className="font-semibold text-brand-600 underline">
            Política de Privacidade
          </Link>
          .
        </span>
      </label>
      {errors.consent?.message && <p className="text-sm text-accent-red">{errors.consent.message}</p>}

      {status === "error" && (
        <p className="text-sm text-accent-red">
          Não foi possível enviar sua mensagem. Tente novamente em instantes.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-800 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-700">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-accent-red">{error}</span>}
    </label>
  );
}
