"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { Button } from "@/components/ui/button";

import { financialStatusOptions } from "./constants";
import { RadioCard } from "../radio-card";

const schema = z.object({
  income: z.string().min(1, "Detalhes são obrigatórios"),
  savings: z.string().min(1, "Detalhes são obrigatórios"),
  investments: z.string().min(1, "Detalhes são obrigatórios"),
});

type FormData = z.infer<typeof schema>;

export const FinancialStatus = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const router = useRouter()

  const { control, handleSubmit, formState: { isValid, isSubmitting }, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const fetchFinancialDetails = async () => {
    const email = localStorage.getItem('email');
    const cachedData = localStorage.getItem(`financialDetails_${email}`);
    if (cachedData) {
      return { data: JSON.parse(cachedData) };
    }
    const response = await fetch(`http://localhost:3333/onboarding/details?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch financial details');
    }
    const data = await response.json();
    localStorage.setItem(`financialDetails_${email}`, JSON.stringify(data.data));
    return data;
  };

  const fetchOnboardingData = async () => {
    try {
      const json = await fetchFinancialDetails();
      setSelectedOption(json.data?.effort ?? null)
      setValue('income', json.data?.income ?? '')
      setValue('investments', json.data?.investments ?? '')
      setValue('savings', json.data?.savings ?? '')
    } catch (error) {
      console.error('Error getting financial goal:', error);
    }
  }

  useEffect(() => {
    (async () => {
      fetchOnboardingData()
    })()
  }, []);

  const onSubmit = async (data: FormData) => {
    const email = localStorage.getItem('email')
    const alreadyPersisted = localStorage.getItem(`financialDetails_${email}`)
    if (!alreadyPersisted) return
    
    const convertBRLToNumber = (value: string): number => {
      if (!value) return 0;
      return Number(value.replace("R$", "").replace(/\s/g, "").replace(/[^\d,]/g, '').replace(',', '.'));
    };
    
    const payload = {
      income: convertBRLToNumber(data.income),
      investments: convertBRLToNumber(data.investments),
      savings: convertBRLToNumber(data.savings),
      effort: selectedOption,
      email,
    };
    const onboardingId = JSON.parse(alreadyPersisted).onboardingId
    try {
      const response = await fetch(`http://localhost:3333/onboarding/${onboardingId}`, {
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
      const updatedData = { ...JSON.parse(alreadyPersisted), ...result.data };
      localStorage.setItem(`financialDetails_${payload.email}`, JSON.stringify(updatedData));
      router.push('/onboarding/financial-history');
    } catch (error) {
      console.error('Error submitting financial goal:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full pt-5 flex flex-col gap-5 justify-between">
      <div className="flex flex-col gap-5">
        <fieldset className="flex flex-col gap-2">
          <label className="text-xs font-medium">
            Quanto você recebe mensalmente?
          </label>
          <Controller
            name="income"
            control={control}
            render={({ field }) => (
              <NumericFormat
                {...field}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                placeholder="R$ 12.000,00"
                className="p-4 text-xs rounded-lg border border-neutral-200 outline-primary"
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
            name="savings"
            control={control}
            render={({ field }) => (
              <NumericFormat
                {...field}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                placeholder="R$ 12.000,00"
                className="p-4 text-xs rounded-lg border border-neutral-200 outline-primary"
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
            name="investments"
            control={control}
            render={({ field }) => (
              <NumericFormat
                {...field}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                placeholder="R$ 12.000,00"
                className="p-4 text-xs rounded-lg border border-neutral-200 outline-primary"
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
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid && !selectedOption}
          isLoading={isSubmitting}
        >
          Próximo
        </Button>

        <Link href="financial-goal" className="text-xs font-semibold p-2">
          Voltar
        </Link>
      </div>
    </form>
  )
}