"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackCheckoutClick, type CheckoutEventPayload } from "@/lib/analytics";

type CheckoutLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  eventPayload: CheckoutEventPayload;
};

export function CheckoutLink({
  href,
  className,
  children,
  eventPayload,
}: CheckoutLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackCheckoutClick(eventPayload)}
    >
      {children}
    </Link>
  );
}
