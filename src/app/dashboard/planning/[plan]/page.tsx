"use client";

import { CountUp } from "@/components/animated/countup-text";
import { CategoryChart } from "@/components/dashboard/planning/category-chart";
import { HeaderDetails } from "@/components/dashboard/planning/header-details";
import { MonthButton } from "@/components/dashboard/planning/month-button";
import { ProjectionChart } from "@/components/dashboard/planning/projection-chart";
import { Progress } from "@/components/ui/progress";

export default function PlanningDetails() {
  return (
    <>
      <HeaderDetails />
      <main className="w-full pb-28 flex flex-col gap-6 h-[calc(100vh-96px)] overflow-auto relative">
        <section className="flex flex-col items-center gap-[2px] sticky top-0 py-4">
          <p className="text-xs font-red-hat font-medium">
            Para este objetivo, separe
          </p>
          <p className="font-rubik font-semibold text-3xl text-dark">
            R$
            <CountUp
              from={0}
              to={2160.00}
              separator="."
              direction="up"
              duration={0.5}
              onStart={() => {}}
              onEnd={() => {}}
            />
            <span className="text-sm font-normal">/mês</span>
          </p>
          <p className="text-xs font-red-hat text-dark font-light">
            Este valor representa 20% da sua renda mensal.
          </p>
        </section>

        <div className="w-full flex flex-col gap-6 bg-dashboardBg z-10">
          <section className="w-full p-5 bg-white rounded-lg flex flex-col gap-3">
            <header className=" w-full flex flex-col gap-1">
              <h2 className="text-sm font-normal font-rubik text-dark">
                Objetivo Financeiro
              </h2>
              <p className="text-xs font-red-hat text-[#626262]">
                &quot;Alugar apartamento de no máximo 2000; pagar 3 meses de depósito de aluguel; comprar os móveis necessários para a casa.&quot;
              </p>
            </header>
            <div className="flex flex-col gap-2">
              <Progress value={33} />
              <div className="w-full flex items-center justify-between">
                <p className="text-xs text-[#626262] font-red-hat">R$0,00 de R$20.000,00</p>
                <p className="text-xs text-[#626262] font-red-hat">0%</p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="w-full py-3 flex items-center justify-between border-b border-[#D0D0D0]">
                <p className="text-xs text-[#626262] font-red-hat">Prazo</p>
                <p className="text-xs text-dark font-bold font-red-hat">Faltam 6 meses</p>
              </div>
              <div className="w-full py-3 flex items-center justify-between">
                <p className="text-xs text-[#626262] font-red-hat">Status</p>

                <div className="w-fit px-1 py-[2px] rounded bg-[#BCF4D6]">
                  <p className="font-red-hat text-[11px] text-[#2EB36D] font-medium">
                    No caminho certo
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full p-5 bg-white rounded-lg flex flex-col gap-3">
            <header className="w-full flex items-center justify-between">
              <h2 className="text-sm font-rubik text-dark">
                Sugestão de gastos mensais
              </h2>
              <p className="text-sm font-semibold font-rubik text-dark">
                ~ R$ 3.440,00
              </p>
            </header>

            <CategoryChart />
          </section>

          <section className="w-full p-5 bg-white rounded-lg flex flex-col gap-3">
            <header className=" w-full flex flex-col gap-1">
              <h2 className="text-sm font-normal font-rubik text-dark">
                Projeção Financeira
              </h2>
              <p className="text-xs font-red-hat text-[#626262]">
                Veja a sua possível evolução financeira com a execução deste planejamento.
              </p>
            </header>

            <div className="flex items-center gap-2">
              <MonthButton label="3 meses" isActivated />
              <MonthButton label="6 meses" />
              <MonthButton label="12 meses" />
            </div>

            <ProjectionChart />
          </section>
        </div>
      </main>
    </>
  )
}