"use client";
import { useState } from "react"
import { Check, ChevronLeft, ChevronRight, EllipsisVertical, Search } from "lucide-react"

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Transaction, transactionCategories, TransactionCategory } from "@/type/transaction"
import clsx from "clsx";

type TransactionEditorDrawerProps = {
  data: Transaction
  onUpdate?: (updatedTransaction: Transaction) => void
}

export const TransactionEditorDrawer = ({
  data,
  onUpdate
}: TransactionEditorDrawerProps) => {
  const [page, setPage] = useState<"selector" | "transactionName" | "category">("selector")
  const [transactionName, setTransactionName] = useState(data.title)
  const [selectedCategory, setSelectedCategory] = useState<TransactionCategory>(data.category as any)
  const [open, setOpen] = useState(false)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setTransactionName(newName)
    onUpdate?.({
      ...data,
      title: newName,
      category: selectedCategory
    })
  }

  const handleCategoryChange = (category: TransactionCategory) => {
    setSelectedCategory(category)
    onUpdate?.({
      ...data,
      title: transactionName,
      category: category
    })
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <button>
          <EllipsisVertical color="#D9D9D9" size={15} />
        </button>
      </DrawerTrigger>
      <DrawerContent className="md:h-[50vh] h-[70vh] overflow-hidden">
        <div className="w-full max-w-[400px] h-full px-6 py-5 mx-auto flex flex-col gap-5">
          {
            page === "selector" && (
              <>
                <h2 className="text-xl text-dark font-medium font-rubik">Editar transação</h2>
                <div className="flex flex-col">
                  <button
                    className="py-5 flex items-center justify-between border-b-[0.5px] border-[#DADADA] transition hover:bg-neutral-100"
                    onClick={() => setPage("transactionName")}
                  >
                    <p className="font-red-hat text-xs text-dark">
                      Editar nome da transação
                    </p>
                    <ChevronRight size={20} color="#131210" />
                  </button>
                  <button
                    className="py-5 flex items-center justify-between border-b-[0.5px] border-[#DADADA] transition hover:bg-neutral-100"
                    onClick={() => setPage("category")}
                  >
                    <p className="font-red-hat text-xs text-dark">
                      Editar categoria da transação
                    </p>
                    <ChevronRight size={20} color="#131210" />
                  </button>
                </div>
              </>
            )
          }
          {
            page === "transactionName" && (
              <>
                <button className="w-fit" onClick={() => setPage('selector')}>
                  <ChevronLeft />
                </button>
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl text-dark font-medium font-rubik">
                    Escreva um nome para esta transação
                  </h2>
                  <p className="text-xs text-[#545454]">
                    Nomes mais claros e descritivos permitem que o Mikko gere melhores análises e recomendações.
                  </p>
                </div>

                <Input
                  label="Nome da transação"
                  value={transactionName}
                  onChange={handleNameChange}
                />
              </>
            )
          }
          {
            page === "category" && (
              <>
                <header className="relative w-full flex items-center justify-center">
                  <button className="absolute w-fit left-0 " onClick={() => setPage('selector')}>
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
                          if (a === selectedCategory) return -1;
                          if (b === selectedCategory) return 1;
                          return 0;
                        })
                        .map((category) => (
                        <div
                          key={category}
                          className={clsx(
                            "w-full p-4 flex items-center gap-2 border rounded-xl",
                            {
                              "border-[#E8E8E8]": selectedCategory !== category,
                              "border-primary bg-lightRed": selectedCategory === category,
                            }
                          )}
                          onClick={() => handleCategoryChange(category)}
                        >
                          <div className={clsx(
                            "w-[14px] h-[14px] flex items-center justify-center border rounded-full",
                            {
                              "border-[#BFBFBF]": selectedCategory !== category,
                              "border-primary bg-primary": selectedCategory === category,
                            }
                          )}>
                            <Check color="#fff" />
                          </div>

                          <p className={clsx(
                            "md:text-sm text-xs font-red-hat text-dark",
                            {
                              "text-dark": selectedCategory !== category,
                              "text-primary font-medium": selectedCategory === category,
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
            )
          }

        </div>
      </DrawerContent>
    </Drawer>
  )
}