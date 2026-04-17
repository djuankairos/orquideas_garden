import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DemoOne() {
  return (
    <div className="container-shell py-10 sm:py-14">
      <p className="section-copy text-center">Demo en construcción.</p>
    </div>
  );
}

