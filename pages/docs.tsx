"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Documentation() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/docs/getting-started/overview");
  }, [router]);

  return null;
}
