"use client";
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <header className="w-full h-[12%] px-9 py-6 bg-[#F6F4F3]">
      <div className="container mx-auto flex items-center justify-between">
        <button onClick={goBack}>
          <ChevronLeft />
        </button>

        <Image src="/logo-dark.png" alt="Mikko" width={88} height={24} />
      </div>
    </header>
  )
}