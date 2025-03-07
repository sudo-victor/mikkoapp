"use client";
import { useState } from "react";
import clsx from "clsx";
import { MdOutlineCheck } from "react-icons/md";

import { financialGoalOptions } from "./constants";

export default function FinancialStatus() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  return (
    <div className="pt-5">
      <div className="flex flex-col gap-2">
        {financialGoalOptions.map((option) => (
          <div
            key={option}
            className={clsx(
              "p-4 flex flex-col rounded-xl border transition-all",
              {
                "border-neutral-200 bg-white": selectedOption !== option,
                "border-secondary bg-[#FDEEE7] gap-3": selectedOption === option,
              }
            )}
          >
            <div
              className="flex items-center gap-2"
              onClick={() => setSelectedOption(state => state === option ? null : option)}
            >
              <div className={clsx(
                "w-[14px] h-[14px] flex items-center justify-center rounded-full border",
                {
                  "border-neutral-200 bg-white": selectedOption !== option,
                  "border-secondary bg-secondary": selectedOption === option,
                }
              )}>
                <MdOutlineCheck className="text-white" size={8} />
              </div>
              <p className="text-xs">{option}</p>
            </div>

            <div className={clsx(
              "transition-max-height duration-300 ease-in-out overflow-hidden",
              {
                "max-h-0": selectedOption !== option,
                "max-h-[500px]": selectedOption === option,
              }
            )}>
              <fieldset className="flex flex-col gap-2">
                <label className="text-secondary text-xs font-medium">
                  Dê detalhes sobre seu objetivo financeiro pessoal.
                </label>
                <textarea placeholder="Digite aqui." className="p-4 text-xs rounded-lg outline-secondary" />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label className="text-secondary text-xs font-medium">
                Quanto você precisa pra alcançar seu objetivo?
                </label>
                <input placeholder="R$ 12.000,00" className="p-4 text-xs rounded-lg outline-secondary" />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label className="text-secondary text-xs font-medium">
                Em quantos meses?
                </label>
                <input placeholder="12" type="number" min={1} className="p-4 text-xs rounded-lg outline-secondary" />
              </fieldset>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}