"use client";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { RiMoneyDollarCircleLine, RiSafe3Line } from "react-icons/ri";

import { Header } from "@/components/dashboard/planning/header";
import { CategoryChart } from "@/components/dashboard/planning/category-chart";
import { TransactionCard } from "@/components/transaction/transaction-card";

export default function Extract() {
  const transactions = [
    {
      category: 'Assinaturas',
      createdAt: new Date(),
      title: 'Teste',
      transactionId: '123',
      type: 'WITHDRAW',
      value: 100
    },
    {
      category: 'Assinaturas',
      createdAt: new Date(),
      title: 'Teste',
      transactionId: '123',
      type: 'WITHDRAW',
      value: 100
    },
    {
      category: 'Assinaturas',
      createdAt: new Date(),
      title: 'Teste',
      transactionId: '123',
      type: 'WITHDRAW',
      value: 100
    }
  ]

  return (
    <>
      <Header title="Extrato" />
      <main className="w-full flex flex-col gap-6 h-[calc(100vh-96px)] overflow-y-auto pb-24 relative scroll-smooth">
        <section className="flex flex-col items-center gap-6 sticky top-0 py-3">
          <div className="w-full flex items-center justify-center gap-4">
            <button>
              <ChevronLeft />
            </button>

            <p className="text-xl text-dark font-medium font-rubik">
              Março
            </p>

            <button>
              <ChevronRight />
            </button>
          </div>

          {/* <div className="w-full rounded-lg bg-[#44C98F] p-3 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-[#1BA66A] text-white">
                <MdOutlineSentimentSatisfied />
              </div>
              <h3 className="text-base font-bold font-red-hat text-white">
                Saúde Financeira Boa
              </h3>
            </div>

            <p className="font-red-hat font-medium text-white text-xs">
              Você possui valores consideráveis de reserva e investimentos e está com suas finanças em dia. Continue assim!
            </p>
          </div> */}

          <div className="w-full grid grid-cols-2 gap-3">
            <div className="w-full px-[10px] py-3 bg-white rounded-lg flex flex-col gap-3">
              <div className="w-7 h-7 rounded-full border border-[#E8E8E8] self-end flex items-center justify-center text-dark">
                <RiMoneyDollarCircleLine />
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-rubik text-sm text-dark">
                  Saldo
                </p>
                <p className="font-rubik font-semibold text-base text-dark">
                  R$ 10.800,00
                </p>
              </div>
            </div>
            <div className="w-full px-[10px] py-3 bg-white rounded-lg flex flex-col gap-3">
              <div className="w-7 h-7 rounded-full border border-[#E8E8E8] self-end flex items-center justify-center text-dark">
                <RiSafe3Line />
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-rubik text-sm text-dark">
                  Dinheiro guardado
                </p>
                <p className="font-rubik font-semibold text-base text-dark">
                  R$ 10.800,00
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-80 z-10 w-full h-full flex-1 flex flex-col gap-3 bg-dashboardBg">
          <div className="w-full p-5 bg-white rounded-lg flex flex-col gap-3">
            <header className="w-full flex items-center justify-between">
              <h2 className="text-sm font-rubik text-dark">
                Sugestão de gastos mensais
              </h2>
              <p className="text-sm font-semibold font-rubik text-dark">
                ~ R$ 3.440,00
              </p>
            </header>

            <CategoryChart />
          </div>

          <div className="mb-80 w-full p-5 bg-white rounded-lg flex flex-col gap-4">
            <header className="w-full flex flex-col gap-2">
              <h2 className="text-sm font-rubik text-dark">
                Suas transações deste mês
              </h2>

              <div className="w-full px-4 py-3 flex items-center gap-1 rounded-md bg-[#F1F1F1]">
                <Search size={15} />
                <input className="w-full h-full bg-[#F1F1F1] text-xs text-dark outline-none font-red-hat" placeholder="Pesquise uma categoria" />
              </div>
            </header>

            <div className="flex flex-col gap-6">
              <h3 className="text-[11px] md:text-sm text-[#626262] font-red-hat font-semibold">
                Terça-feira, 18 de março de 2025
              </h3>

              <div className="flex flex-col gap-6">
                {transactions.map((transaction, index) => (
                  <div key={transaction.transactionId}>
                    <TransactionCard data={transaction as any} />
                    {index < transactions.length - 1 && (
                      <div className="mt-6 border-t border-neutral-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  )
}