"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useId, useState } from "react";

const faqs = [
  {
    question: "¿Cómo puedo hacer un pedido en Orquídeas Garden?",
    answer:
      "Puedes elegir tu arreglo desde el catálogo y continuar por el enlace de compra. Si prefieres asesoría personalizada, también puedes escribirnos por WhatsApp.",
  },
  {
    question: "¿Tienen entregas el mismo día en Bogotá?",
    answer:
      "Sí, contamos con entregas el mismo día según disponibilidad de producto y zona. Te recomendamos realizar tu pedido con la mayor anticipación posible.",
  },
  {
    question: "¿Puedo incluir una tarjeta con mensaje personalizado?",
    answer:
      "Claro. Puedes agregar tu mensaje al momento de comprar y lo enviamos con una presentación cuidada para la ocasión.",
  },
  {
    question: "¿Qué medios de pago manejan?",
    answer:
      "Trabajamos con Bold, así que recibimos todos los medios de pago, siempre seguros y disponibles en el proceso de compra. Si necesitas apoyo, te guiamos paso a paso por WhatsApp.",
  },
  {
    question: "¿Manejan arreglos para condolencias y eventos especiales?",
    answer:
      "Sí, diseñamos opciones para condolencias, cumpleaños, aniversarios y detalles corporativos, manteniendo un estilo elegante y sobrio cuando se requiere.",
  },
  {
    question: "¿Cómo cuido la orquídea después de recibirla?",
    answer:
      "Entregamos recomendaciones básicas de cuidado para conservarla por más tiempo: luz indirecta, riego moderado y buena ventilación.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section
      id="faqs"
      className="w-full rounded-3xl border px-4 py-14 sm:px-8 sm:py-16"
      style={{
        borderColor: "rgba(184,160,212,0.44)",
        background:
          "radial-gradient(circle at 12% 16%, rgba(212,196,240,0.3), transparent 36%), radial-gradient(circle at 88% 14%, rgba(240,200,216,0.24), transparent 34%), linear-gradient(160deg, #fdf0f4 0%, #faf7f5 100%)",
      }}
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.3 }}
            className="mb-4 inline-flex rounded-full border border-[#e0a8c0]/60 bg-white/80 p-3"
            aria-hidden="true"
          >
            <HelpCircle className="h-7 w-7 text-[#7a6ab4]" aria-hidden="true" />
          </motion.div>
          <p className="eyebrow">Preguntas Frecuentes</p>
          <h2 className="section-title mt-2">Resolvemos tus dudas antes de comprar</h2>
          <p className="section-copy mx-auto mt-3 max-w-2xl">
            Aquí encuentras respuestas rápidas sobre pedidos, entregas, personalización y cuidados de tus orquídeas.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const questionId = `${baseId}-question-${index}`;
            const answerId = `${baseId}-answer-${index}`;
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Card className="overflow-hidden rounded-2xl border-[#e8dce4] bg-white/95 shadow-soft">
                  <CardHeader className="p-5 sm:p-6">
                    <motion.button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7a6ab4]/60 focus-visible:ring-offset-2"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      id={questionId}
                    >
                      <span className="text-base font-semibold text-[#2a1a24] sm:text-lg">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        aria-hidden="true"
                        className="shrink-0 rounded-full border border-[#e8dce4] bg-[#faf7f5] p-1"
                      >
                        <ChevronDown className="h-5 w-5 text-[#7a6ab4]" />
                      </motion.div>
                    </motion.button>
                  </CardHeader>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        role="region"
                        id={answerId}
                        aria-labelledby={questionId}
                      >
                        <CardContent className="px-5 pb-6 pt-0 sm:px-6">
                          <p className="text-sm leading-relaxed text-[#6e5665] sm:text-[15px]">
                            {faq.answer}
                          </p>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
