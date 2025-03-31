"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter()

  const goToLogin = () => {
    router.push("/login/form")
  }

  return (
    <main className="w-full h-full flex items-center justify-center" style={{
      background: "rgb(254,209,29)",
      backgroundImage: "radial-gradient(circle, rgba(254,209,29,1) 0%, rgba(221,85,27,1) 79%, rgba(221,85,27,1) 100%)"
    }}>
      <div className="absolute left-0 top-0">
        <Image src="/mikko-tail-2.svg" alt="Mikko" height={367} width={175} />
      </div>
      <div className="absolute right-0 bottom-0">
        <Image src="/mikko-tail.svg" alt="Mikko" height={70} width={255} />
      </div>
      <div className="h-full md:h-fit py-11 flex flex-col items-center justify-between gap-16">
        <Image src="/logo.png" alt="Mikko" height={70} width={255} />

        <div className="w-full max-w-[320px] flex flex-col items-center gap-6">
          <p className="font-medium font-rubik text-2xl text-white text-center">
            Nunca foi tão fácil lidar com seu dinheiro.
          </p>
          <Button onClick={goToLogin}>Faça o login ou cadastre-se</Button>
        </div>
      </div>
    </main>
  )
}