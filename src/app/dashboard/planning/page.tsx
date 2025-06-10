"use client";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Progress } from "@/components/ui/progress";
import { PlanningCard } from "@/components/dashboard/planning/planning-card";
import { Header } from "@/components/dashboard/planning/header";
import ShinyText from "@/components/animated/shiny-text";

export default function Planning() {
  return (
    <>
      <Header title="Meus objetivos" />
      <main className="pb-36 w-full flex flex-col gap-6 h-[calc(100vh-96px)] overflow-y-auto relative">
        <section className="flex flex-col items-center gap-[2px] sticky top-0 py-4">
          <p className="text-xs font-red-hat font-medium">
            No total, você precisa guardar
          </p>
          <p className="font-rubik font-semibold text-3xl text-dark">
            R$4.000,00<span className="text-sm font-normal">/mês</span>
          </p>
          <p className="text-xs font-red-hat text-dark font-light">
            para cumprir todos os seus objetivos.
          </p>
        </section>

        <section className="z-10 w-full h-full flex-1 flex flex-col gap-3 bg-dashboardBg">
          <article className="w-full p-5 bg-white rounded-lg flex flex-col gap-3">
            <header className=" w-full flex items-center justify-between">
              <h2 className="text-sm font-normal font-rubik text-dark">🐖 Fundo emergencial</h2>

              <div className="flex items-center gap-2">
                <div className="w-fit px-1 py-[2px] rounded bg-[#FFB5B5]">
                  <p className="font-red-hat text-[10px] text-hot font-medium">
                    Prioritário
                  </p>
                </div>

                <button>
                  <Ellipsis size={16} color="#A0A0A0" />
                </button>
              </div>
            </header>
            <Progress value={33} />
            <div className="w-full flex items-center justify-between">
              <p className="text-xs text-[#626262] font-red-hat">Progresso</p>
              <p className="text-xs text-[#626262] font-red-hat">R$5.000,00 / <strong className="text-dark font-bold">R$10.000,00</strong></p>
            </div>
          </article>

          <PlanningCard />

          <div className="flex py-5 items-center justify-center gap-4">
            <Link href="/planning/new" className="text-xs text-primary font-semibold font-red-hat">
              + Adicione um novo planejamento
            </Link>

            <button className="px-2 py-1 flex items-center gap-1 bg-dark rounded hover:brightness-90 transition">
              <Image src="/banana-prata-coin.svg" alt="Banana Prata" height={15} width={15} />
              <ShinyText text="Assinar" disabled={false} speed={3} className='text-[11px] font-rubik font-medium' />
            </button>
          </div>
        </section>
      </main>
    </>
  )
}