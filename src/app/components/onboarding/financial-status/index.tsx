"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { Button } from "@/app/components/ui/button";

import { financialStatusOptions } from "./constants";
import { RadioCard } from "../radio-card";

const schema = z.object({
  detailsIncome: z.string().min(1, "Detalhes são obrigatórios"),
  detailsSavings: z.string().min(1, "Detalhes são obrigatórios"),
  detailsInvestments: z.string().min(1, "Detalhes são obrigatórios"),
});

type FormData = z.infer<typeof schema>;

export const FinancialStatus = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const router = useRouter()

  const { control, handleSubmit, formState: { isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    console.log(data)
    router.push('/onboarding/financial-history');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full pt-5 flex flex-col gap-5 justify-between">
      <div className="flex flex-col gap-5">
        <fieldset className="flex flex-col gap-2">
          <label className="text-xs font-medium">
            Quanto você recebe mensalmente?
          </label>
          <Controller
            name="detailsIncome"
            control={control}
            render={({ field }) => (
              <NumericFormat
                {...field}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                placeholder="R$ 12.000,00"
                className="p-4 text-xs rounded-lg border border-neutral-200 outline-secondary"
                onValueChange={(values) => {
                  const { value } = values;
                  field.onChange(value);
                }}
              />
            )}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label className="text-xs font-medium">
            Quanto você tem guardado?
          </label>
          <Controller
            name="detailsSavings"
            control={control}
            render={({ field }) => (
              <NumericFormat
                {...field}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                placeholder="R$ 12.000,00"
                className="p-4 text-xs rounded-lg border border-neutral-200 outline-secondary"
                onValueChange={(values) => {
                  const { value } = values;
                  field.onChange(value);
                }}
              />
            )}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label className="text-xs font-medium">
            Quanto você tem investido?
          </label>
          <Controller
            name="detailsInvestments"
            control={control}
            render={({ field }) => (
              <NumericFormat
                {...field}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                placeholder="R$ 12.000,00"
                className="p-4 text-xs rounded-lg border border-neutral-200 outline-secondary"
                onValueChange={(values) => {
                  const { value } = values;
                  field.onChange(value);
                }}
              />
            )}
          />
        </fieldset>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium">
          Quanto enforço você quer colocar no seu objetivo?
        </p>
        {financialStatusOptions.map((option) => (
          <RadioCard
            key={option}
            value={option}
            isSelected={selectedOption === option}
            onSelect={() => setSelectedOption(state => state === option ? null : option)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2 items-center">
        <Button onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          Próximo
        </Button>

        <Link href="financial-goal" className="text-xs font-semibold p-2">
          Voltar
        </Link>
      </div>
    </form>
  )
}