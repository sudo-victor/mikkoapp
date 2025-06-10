"use client";
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { ChevronLeft, NotepadText, Plus, Target, Check, Search } from 'lucide-react';
import Image from 'next/image';
import { useForm, SubmitHandler } from "react-hook-form";

import { StrategyIcon } from '@/components/icons/strategy-icon';
import { useRouter, usePathname } from 'next/navigation';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { TransactionCategory, transactionCategories } from '@/type/transaction';

type PageNames = "planning" | "goals" | "extract" | "profile"

type TransactionFormValues = {
  name: string;
  value: string;
  type: "deposit" | "withdraw";
  category: TransactionCategory;
}

export const MobileNavbar = () => {
  const routes = useRouter()
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isValid } } = useForm<TransactionFormValues>({
    defaultValues: {
      name: "",
      value: "",
      type: "withdraw",
      category: "Outros"
    }
  });

  const watchType = watch("type")
  const watchCategory = watch("category")

  const getPageFromPath = (): PageNames => {
    if (pathname.includes("/dashboard/goals")) return "goals"
    if (pathname.includes("/dashboard/extract")) return "extract"
    if (pathname.includes("/dashboard/profile")) return "profile"
    return "planning"
  }

  const [currentPage, setCurrentPage] = useState<PageNames>("planning")
  const [drawerPage, setDrawerPage] = useState<"main" | "category">("main")

  useEffect(() => {
    setCurrentPage(getPageFromPath())
  }, [pathname])

  const goTo = (page: PageNames) => {
    setCurrentPage(page)
    routes.push(`/dashboard/${page}`)
  }

  const handleCategoryChange = (category: TransactionCategory) => {
    setValue("category", category, { shouldValidate: true })
    setDrawerPage("main")
  }

  const onSubmit: SubmitHandler<TransactionFormValues> = async (data) => {
    // await api.post(`/transaction/of/users/${}`, {
    //   title: data.name,
    //   value: parseFloat(data.value) * 100,
    //   type: data.type.toLocaleUpperCase(),
    //   category: data.category
    // })

    reset()
    setDrawerOpen(false)
  }

  const resetForm = () => {
    reset()
    setDrawerPage("main")
  }

  return (
    <nav className='w-fit px-5 fixed z-10 right-0 left-0 bottom-4 flex items-center gap-5 mx-auto rounded-full bg-dashboardBg border border-white shadow-[0px_3px_6px_0px_#0000001A,0px_11px_11px_0px_#00000017,0px_24px_14px_0px_#0000000D,0px_42px_17px_0px_#00000003,0px_66px_18px_0px_#00000000] backdrop-blur-[24.3px]'>
      <button className='h-full py-2 flex flex-col gap-2 items-center' onClick={() => goTo("planning")}>
        <StrategyIcon color={currentPage === "planning" ? "#DD551B" : "#898989"} />
        <p className={clsx('text-xs font-red-hat transition', currentPage === "planning" ? "text-primary" : "text-[#898989]")}>
          Objetivos
        </p>
      </button>
      <button className='h-full py-2 flex flex-col gap-2 items-center' onClick={() => goTo("goals")}>
        <Target size={24} color={currentPage === "goals" ? "#DD551B" : "#898989"} />
        <p className={clsx('text-[#898989] text-xs font-red-hat', currentPage === "goals" ? "text-primary" : "text-[#898989]")}>
          Metas
        </p>
      </button>

      <div className='mb-4 flex flex-col gap-1 items-center'>
        <Drawer open={drawerOpen} onOpenChange={(open) => {
          setDrawerOpen(open)
          if (!open) resetForm()
        }}>
          <DrawerTrigger>
            <button className='w-11 h-11 flex items-center justify-center rounded-full bg-primary text-white'>
              <Plus size={20} />
            </button>
          </DrawerTrigger>
          <DrawerContent className="h-fit overflow-hidden">
            <div className="w-full max-w-[400px] h-full px-6 py-5 mx-auto flex flex-col gap-5">
              {drawerPage === "main" && (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7 h-full">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl text-dark font-medium font-rubik">
                      Cadastrar transação
                    </h2>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-[#BFBFBF] font-medium font-red-hat">Tipo de transação</p>
                    <div className="flex gap-4">
                      <div
                        className={clsx(
                          "flex-1 p-3 flex items-center justify-center gap-2 border rounded-lg cursor-pointer",
                          watchType === "withdraw"
                            ? "bg-lightRed border-primary"
                            : "border-[#E8E8E8]"
                        )}
                        onClick={() => setValue("type", "withdraw", { shouldValidate: true })}
                      >
                        <div className={clsx(
                          "w-[14px] h-[14px] flex items-center justify-center border rounded-full",
                          watchType === "withdraw"
                            ? "border-primary bg-primary"
                            : "border-[#BFBFBF]"
                        )}>
                          {watchType === "withdraw" && <Check size={10} color="#fff" />}
                        </div>
                        <span className={clsx(
                          "text-sm font-red-hat",
                          watchType === "withdraw"
                            ? "text-primary font-medium"
                            : "text-dark"
                        )}>
                          Saída
                        </span>
                      </div>

                      <div
                        className={clsx(
                          "flex-1 p-3 flex items-center justify-center gap-2 border rounded-lg cursor-pointer",
                          watchType === "deposit"
                            ? "bg-green-50 border-green-500"
                            : "border-[#E8E8E8]"
                        )}
                        onClick={() => setValue("type", "deposit", { shouldValidate: true })}
                      >
                        <div className={clsx(
                          "w-[14px] h-[14px] flex items-center justify-center border rounded-full",
                          watchType === "deposit"
                            ? "border-green-500 bg-green-500"
                            : "border-[#BFBFBF]"
                        )}>
                          {watchType === "deposit" && <Check size={10} color="#fff" />}
                        </div>
                        <span className={clsx(
                          "text-sm font-red-hat",
                          watchType === "deposit"
                            ? "text-green-600 font-medium"
                            : "text-dark"
                        )}>
                          Entrada
                        </span>
                      </div>
                    </div>
                  </div>

                  <Input
                    label="Nome da transação"
                    {...register("name", { required: true })}
                  />

                  <Input
                    label="Valor (R$)"
                    type="number"
                    {...register("value", { required: true })}
                  />


                  <div
                    className="w-full p-3 border border-[#D0D0D0] rounded-lg cursor-pointer"
                    onClick={() => setDrawerPage("category")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-400 font-red-hat">
                        {watchCategory !== "Outros" ? watchCategory : "Selecione uma categoria"}
                      </span>
                      <ChevronLeft className="rotate-180" size={18} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-auto bg-primary text-white rounded-lg font-medium disabled:opacity-50"
                    disabled={!isValid || !watch("name") || !watch("value")}
                  >
                    Salvar transação
                  </button>
                </form>
              )}

              {drawerPage === "category" && (
                <>
                  <header className="relative w-full flex items-center justify-center">
                    <button className="absolute w-fit left-0" onClick={() => setDrawerPage("main")}>
                      <ChevronLeft />
                    </button>
                    <h2 className="md:text-base text-sm text-dark font-bold font-red-hat">
                      Selecione uma categoria
                    </h2>
                  </header>
                  <div className="flex flex-col gap-4 h-full">
                    <div className="w-full px-4 py-3 flex items-center gap-1 rounded-md bg-[#F1F1F1]">
                      <Search size={15} />
                      <input className="w-full h-full bg-[#F1F1F1] text-xs text-dark outline-none font-red-hat" placeholder="Pesquise uma categoria" />
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      <div className="flex flex-col gap-2 pb-20">
                        {transactionCategories
                          .sort((a, b) => {
                            if (a === watchCategory) return -1;
                            if (b === watchCategory) return 1;
                            return 0;
                          })
                          .map((category) => (
                            <div
                              key={category}
                              className={clsx(
                                "w-full p-4 flex items-center gap-2 border rounded-xl",
                                {
                                  "border-[#E8E8E8]": watchCategory !== category,
                                  "border-primary bg-lightRed": watchCategory === category,
                                }
                              )}
                              onClick={() => handleCategoryChange(category)}
                            >
                              <div className={clsx(
                                "w-[14px] h-[14px] flex items-center justify-center border rounded-full",
                                {
                                  "border-[#BFBFBF]": watchCategory !== category,
                                  "border-primary bg-primary": watchCategory === category,
                                }
                              )}>
                                {watchCategory === category && <Check size={10} color="#fff" />}
                              </div>

                              <p className={clsx(
                                "md:text-sm text-xs font-red-hat text-dark",
                                {
                                  "text-dark": watchCategory !== category,
                                  "text-primary font-medium": watchCategory === category,
                                }
                              )}>
                                {category}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </DrawerContent>
        </Drawer>

        <p className='text-[#898989] text-xs font-red-hat'>
          Adicionar
        </p>
      </div>
      <button className='h-full py-2 flex flex-col gap-2 items-center' onClick={() => goTo("extract")}>
        <NotepadText size={24} color={currentPage === "extract" ? "#DD551B" : "#898989"} />
        <p className={clsx('text-xs font-red-hat', currentPage === "extract" ? "text-primary" : "text-[#898989]")}>
          Extrato
        </p>
      </button>
      <button className='h-full py-2 flex flex-col gap-2 items-center' onClick={() => goTo("profile")}>
        <Image src="/mikko-avatar.png" alt="Mikko" width={24} height={24} />
        <p className={clsx('text-xs font-red-hat', currentPage === "profile" ? "text-primary" : "text-[#898989]")}>
          Ajustes
        </p>
      </button>
    </nav>
  )
}