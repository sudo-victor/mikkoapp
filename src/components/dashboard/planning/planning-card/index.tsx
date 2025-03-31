import { Ellipsis } from "lucide-react"

import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export const PlanningCard = () => {
  return (
    <article className="w-full p-5 bg-white rounded-lg flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <header className=" w-full flex items-center justify-between">
          <h2 className="text-sm font-normal font-rubik text-dark">🚗 Guardar pro carro 2025</h2>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/planning/teste">
              <Ellipsis size={16} color="#A0A0A0" />
            </Link>
            
          </div>
        </header>
        <Progress value={33} />
        <div className="w-full flex items-center justify-between">
          <p className="text-xs text-[#626262] font-red-hat">Progresso</p>
          <p className="text-xs text-[#626262] font-red-hat">R$5.000,00 / <strong className="text-dark font-bold">R$10.000,00</strong></p>
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
    </article>
  )
}