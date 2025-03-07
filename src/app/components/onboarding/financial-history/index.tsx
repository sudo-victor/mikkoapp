import Link from "next/link"
import { GrUploadOption } from "react-icons/gr"

import { Button } from "@/app/components/ui/button"

export const FinancialHistory = () => {
  return (
    <div className="h-full py-2 flex flex-col gap-5 justify-between">
      <div className="py-2 flex flex-col gap-5">
        <p className="text-xs text-[#545454] font-red-hat">
          Faça o upload de até 3 meses de extrato bancário. Faremos uma análise dos seus gastos para personalizar melhor seu planejamento financeiro.
        </p>

        <div className="flex flex-col gap-2">
          <label
            className="w-full p-5 flex flex-col items-center gap-1 text-sm text-[#545454] font-red-hat mb-2 border-dashed border-2 border-neutral-200 rounded-lg"
            htmlFor="file-upload"
          >
            <GrUploadOption size={20} />
            <div className="flex flex-col items-center">
              <p className="text-xs font-red-hat">Adicione aqui seus arquivos</p>
              <p className="text-[10px] text-[#929292] font-red-hat">Formatos aceitos: .csv, .xlsx</p>
            </div>
          </label>
          <span className="text-[10px] text-[#A4A4A4] font-red-hat">
            *O Mikko não coleta suas informações bancárias. Os dados do extrato são utilizados apenas para te ajudar com uma análise financeira.
          </span>
          <input id="file-upload" type="file" className="hidden" />
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <Button>
          Próximo
        </Button>

        <Link href="financial-goal" className="text-xs font-semibold p-2">
          Voltar
        </Link>
      </div>

    </div>
  )
}