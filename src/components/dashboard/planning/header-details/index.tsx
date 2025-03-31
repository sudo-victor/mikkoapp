"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const HeaderDetails = () => {
  const routes = useRouter()

  const goBack = () => {
    routes.back()
  }

  return (
    <header className="relative w-full h-24 shrink-0 flex items-center justify-center">
      <button className="absolute left-0" onClick={goBack}>
        <ChevronLeft />
      </button>

      <h1 className="font-rubik font-medium text-dark text-base">
        🚗  Guardar pro carro 2025
      </h1>
    </header>
  )
}