import { Quote, Star } from "lucide-react";

type ReviewItem = {
  id: number;
  name: string;
  context: string;
  comment: string;
};

const reviews: ReviewItem[] = [
  {
    id: 1,
    name: "Valentina Gómez",
    context: "Regalo de cumpleaños · Usaquén, Bogotá",
    comment:
      "Compré un arreglo para el cumpleaños de mi mamá y llegó impecable. La presentación fue elegante y la entrega se cumplió en el horario acordado.",
  },
  {
    id: 2,
    name: "Laura Restrepo",
    context: "Decoración de apartamento · Chicó, Bogotá",
    comment:
      "Pedí una orquídea para decorar la sala y el resultado fue precioso. El diseño se ve sofisticado y la calidad de la flor realmente se nota.",
  },
  {
    id: 3,
    name: "Andrés Cárdenas",
    context: "Arreglo de condolencias · Cedritos, Bogotá",
    comment:
      "Necesitaba un arreglo sobrio para una condolencia y me asesoraron muy bien por WhatsApp. El mensaje llegó tal como lo pedí.",
  },
  {
    id: 4,
    name: "Carolina Méndez",
    context: "Regalo corporativo · Santa Bárbara, Bogotá",
    comment:
      "Nos ayudaron con un detalle empresarial y todo salió perfecto. La atención fue clara, el empaque premium y la entrega muy puntual.",
  },
];

function ReviewCard({ item }: { item: ReviewItem }) {
  return (
    <article
      className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border bg-white/95 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-[#7a6ab4] hover:shadow-[8px_8px_0_0_#7a6ab4]"
      style={{ borderColor: "rgba(232,220,228,0.95)" }}
    >
      <div>
        <div className="mb-4 flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={`${item.id}-${i}`} className="h-4.5 w-4.5 fill-[#c478a0] text-[#c478a0]" />
          ))}
        </div>

        <div className="relative">
          <Quote className="absolute -left-1 -top-1 h-7 w-7 rotate-180 text-[#c478a0]/35" />
          <p className="pl-5 text-sm leading-relaxed text-[#2a1a24] sm:text-[15px]">“{item.comment}”</p>
        </div>
      </div>

      <footer className="mt-6 border-t border-[#e8dce4] pt-4">
        <p className="font-semibold text-[#2a1a24]">{item.name}</p>
        <p className="mt-1 text-xs tracking-wide text-[#9a7a8a]">{item.context}</p>
      </footer>
    </article>
  );
}

export function ReviewsGrid() {
  return (
    <section
      className="rounded-3xl border p-6 sm:p-8"
      style={{
        borderColor: "rgba(184,160,212,0.44)",
        background:
          "radial-gradient(circle at 16% 12%, rgba(212,196,240,0.32), transparent 36%), radial-gradient(circle at 88% 14%, rgba(240,200,216,0.26), transparent 34%), linear-gradient(160deg, #fdf0f4 0%, #faf7f5 100%)",
      }}
    >
      <div className="mb-7 sm:mb-9">
        <p className="eyebrow">Reseñas</p>
        <h2 className="section-title mt-2">Lo que dicen nuestros clientes</h2>
        <p className="section-copy">
          Experiencias de compra para regalos, decoración y acompañamiento en momentos especiales.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {reviews.map((item) => (
          <ReviewCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
