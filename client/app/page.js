"use client";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/cars");
  });

  return (
    <main>
      <Typography variant="caption">HELLO WORLD</Typography>
    </main>
  );
}
