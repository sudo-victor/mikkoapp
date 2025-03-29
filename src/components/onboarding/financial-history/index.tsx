"use client";
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { GrUploadOption } from "react-icons/gr"
import { MdAttachFile } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import { Button } from "@/components/ui/button"
import { Info } from "lucide-react";

export const FinancialHistory = () => {
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  const onSubmit = async () => {
    setIsSubmitting(true)
    const email = localStorage.getItem('email')
    const alreadyPersisted = localStorage.getItem(`financialDetails_${email}`)
    if (!alreadyPersisted) return
    const onboardingId = JSON.parse(alreadyPersisted).onboardingId
    try {
      const payload = {
        fileName: files[0].name,
        fileType: files[0].type,
      }
      const response = await fetch(`http://localhost:3333/onboarding/${onboardingId}/upload/extract`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Failed to save financial goal');
      }
      const result = await response.json()

      try {
        const uploadResponse = await fetch(result.data.signedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': files[0].type,
          },
          body: files[0]
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to send file to s3');
        }

        router.push('history-review')
      } catch (uploadError) {
        console.error('Error uploading file:', uploadError);
      }
    } catch (error) {
      console.error('Error submitting financial goal:', error);
    } finally {
      setIsSubmitting(false)
    }
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
        <div className="flex flex-col gap-2">
          <p className="md:text-sm text-xs text-[#545454] font-red-hat">
            Faça o upload de até 3 meses de extrato bancário. Faremos uma análise dos seus gastos para personalizar melhor seu planejamento financeiro.
          </p>

          <div className="flex items-center gap-2 md:text-sm text-xs text-primary cursor-pointer">
            <Info size={12} />
            <p className="font-semibold font-red-hat">Como baixo meu extrato?</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="w-full p-5 flex flex-col items-center gap-1 text-sm text-[#545454] font-red-hat mb-2 border-dashed border-2 border-neutral-200 rounded-lg"
            htmlFor="file-upload"
          >
            <GrUploadOption size={20} />
            <div className="flex flex-col items-center">
              <p className="md:text-sm text-xs font-red-hat">Adicione aqui seus arquivos</p>
              <p className="md:text-xs text-[10px] text-[#929292] font-red-hat">Formatos aceitos: .csv, .ofx</p>
            </div>
          </label>
          <span className="md:text-xs text-[10px] text-neutral-500 font-red-hat">
            *O Mikko não coleta suas informações bancárias. Os dados do extrato são utilizados apenas para te ajudar com uma análise financeira.
          </span>
          <input id="file-upload" type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
        </div>

        <div className="flex flex-col gap-1">
          {files.map(file => (
            <article key={file.name} className="p-2 flex items-center justify-between gap-3 rounded-lg border border-neutral-200">
              <div className="flex gap-3 max-w-[80%]">
                <div className="p-1 flex items-center justify-center border border-neutral-200 rounded-[4px]">
                  <MdAttachFile className="text-primary" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xs font-medium font-red-hat truncate max-w-[90%]">{file.name}</h4>
                  <p className="text-[10px] text-neutral-800 font-red-hat">.csv | 18.36MB</p>
                </div>
              </div>

              <button className="p-1 flex-shrink-0 flex items-center justify-center text-primary" onClick={() => handleFileRemove(file.name)}>
                <RiDeleteBin6Line />
              </button>
            </article>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <Button
          onClick={onSubmit}
          disabled={files.length === 0}
          isLoading={isSubmitting}
        >
          Próximo
        </Button>

        <Link href="financial-status" className="text-xs font-semibold p-2">
          Voltar
        </Link>
      </div>
    </div>
  )
}