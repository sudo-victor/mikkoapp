"use client";
import { useState } from "react"
import Link from "next/link"
import { GrUploadOption } from "react-icons/gr"
import { MdAttachFile } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import { Button } from "@/app/components/ui/button"
import { useRouter } from "next/navigation";

export const FinancialHistory = () => {
  const [files, setFiles] = useState<File[]>([])

  const router = useRouter()

  const onSubmit = () => {
    router.push('/onboarding/history-review');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles(state => [...state, ...selectedFiles]);
    }
  }

  const handleFileRemove = (fileName: string) => {
    setFiles(state => state.filter(file => file.name !== fileName));
  }

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
          <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} multiple />
        </div>

        <div className="flex flex-col gap-1">
          {files.map(file => (
            <article key={file.name} className="p-2 flex items-center justify-between gap-3 rounded-lg border border-neutral-200">
              <div className="flex gap-3">
                <div className="p-1 flex items-center justify-center border border-neutral-200 rounded-[4px]">
                  <MdAttachFile className="text-secondary" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xs font-medium font-red-hat">{file.name}</h4>
                  <p className="text-[10px] text-[#545454] font-red-hat">.csv | 18.36MB</p>
                </div>
              </div>

              <button className="p-1 flex items-center justify-center text-secondary" onClick={() => handleFileRemove(file.name)}>
                <RiDeleteBin6Line />
              </button>
            </article>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <Button onClick={onSubmit} disabled={files.length === 0}>
          Próximo
        </Button>

        <Link href="financial-status" className="text-xs font-semibold p-2">
          Voltar
        </Link>
      </div>
    </div>
  )
}