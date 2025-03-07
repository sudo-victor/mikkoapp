"use client";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io"

import {
  Sheet,
  SheetContent, SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { Button } from "@/app/components/ui/button";

import { RadioCard } from "../radio-card"
import { Transaction, transactionCategories, transactionTypes } from "@/type/transaction";
import clsx from "clsx";

type Props = {
  data: Transaction
}

const formatCurrency = (value: number, movementType: string) => {
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Math.abs(value));

  return movementType === 'withdraw' ? `-${formattedValue}` : `+${formattedValue}`;
};

export const TransactionCard = ({ data }: Props) => {
  const [categorySelected, setCategorySelected] = useState<string | null>(null)

  const movementType = data.type.includes('Receita') ? 'deposit' : 'withdraw'

  return (
    <article className="flex flex-col gap-3">
      <header className="flex items-end justify-between">
        <h3 className="text-xs font-semibold font-red-hat">{data.title}</h3>
        <p className={clsx(
          "text-xs font-red-hat",
          {
            "text-secondary": movementType === 'withdraw',
            "text-green-600": movementType === 'deposit',
          }
        )}>
          {formatCurrency(data.value, movementType)}
          </p>
      </header>
      <div className="grid grid-cols-2 gap-3">
        <fieldset className="flex flex-col gap-1">
          <label className="text-xs font-medium font-red-hat">Category</label>
          <Sheet>
            <SheetTrigger>
              <button className="w-full flex items-center justify-between px-3 py-2 bg-[#FDEEE7] hover:brightness-95 transition rounded-lg">
                <p className="text-xs font-medium text-secondary font-red-hat">
                  {data.category}
                </p>
                <IoMdArrowDropdown className="text-secondary" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Selecione uma categoria</SheetTitle>
              </SheetHeader>

              <div className="py-3 flex flex-col gap-3">
                {
                  transactionCategories.map(category => (
                    <RadioCard
                      key={category}
                      value={category}
                      isSelected={categorySelected === category}
                      onSelect={() => setCategorySelected(state => state === category ? null : category)}
                    />
                  ))
                }
              </div>

              <Button>
                Aplicar
              </Button>
            </SheetContent>
          </Sheet>
        </fieldset>
        <fieldset className="flex flex-col gap-1">
          <label className="text-xs font-medium font-red-hat">Perfil da Transação</label>
          <Sheet>
            <SheetTrigger>
              <button className="w-full flex items-center justify-between px-3 py-2 bg-[#FDEEE7] hover:brightness-95 transition rounded-lg">
                <p className="text-xs font-medium text-secondary font-red-hat">
                {data.type}
                </p>
                <IoMdArrowDropdown className="text-secondary" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Selecione uma categoria</SheetTitle>
              </SheetHeader>

              <div className="py-3 flex flex-col gap-3">
                {
                  transactionTypes.map(category => (
                    <RadioCard
                      key={category}
                      value={category}
                      isSelected={categorySelected === category}
                      onSelect={() => setCategorySelected(state => state === category ? null : category)}
                    />
                  ))
                }
              </div>

              <Button>
                Aplicar
              </Button>
            </SheetContent>
          </Sheet>
        </fieldset>
      </div>
    </article>)
}