import type { Metadata } from "next";
import { PedidoForm } from "./pedido-form";

export const metadata: Metadata = {
  title: "Hacer pedido · Orquídeas Supreme",
  description: "Completa tu pedido de Orquídea Supreme con envío a domicilio en Bogotá.",
  robots: { index: false, follow: false },
};

export default function PedidoPage() {
  return <PedidoForm />;
}
