"use client";
import Link from "next/link";

import { Button } from "@/app/components/ui/button";
// import { ImSpinner2 } from "react-icons/im";

import { TransactionCard } from "../transaction-card";
import { transactionsMock } from "../../../../../mocks/transactions-mock";

export const HistoryReview = () => {
  return (
    <div className="h-full py-2 flex flex-col gap-5 justify-between">
      <div className="flex flex-col gap-5">
        <div className="py-2 flex flex-col gap-5">
          <p className="text-xs text-[#545454] font-red-hat">
            Categorizamos suas transações pra realizar um planejamento mais detalhado. Dá uma conferida, vai que precisa ser feito algum ajuste nas informações.
          </p>
        </div>

        {/* <div className="w-full p-3 flex flex-col gap-2 items-center rounded-md bg-[#F6F6F6]">
          <ImSpinner2 className="animate-spin text-secondary text-3xl" />
          <div className="flex flex-col items-center">
            <p className="text-xs font-red-hat font-semibold">Por favor, aguarde...</p>
            <p className="text-xs text-[#626262] font-red-hat">O Mikko está dando uma olhada no seu extrato.</p>
          </div>
        </div> */}

        <div className="flex flex-col gap-3 h-full overflow-x-auto">
          <span className="text-xs text-[#9A9A9A]">16 itens para revisar</span>
          <div className="flex flex-col gap-6">
            {transactionsMock.map((transaction, index) => (
              <div key={transaction.id}>
                <TransactionCard data={transaction} />
                {index < transactionsMock.length - 1 && (
                  <div className="mt-6 border-t border-neutral-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>



      <div className="flex flex-col gap-2 items-center">
        <Button>
          Gerar planejamento
        </Button>

        <Link href="financial-history" className="text-xs font-semibold p-2">
          Voltar
        </Link>
      </div>
    </div>
  )
}