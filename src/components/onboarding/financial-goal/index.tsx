"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import clsx from "clsx";
import { z } from 'zod';
import { MdOutlineCheck } from "react-icons/md";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NumericFormat } from "react-number-format";

import { Button } from "@/components/ui/button";

import { financialGoalOptions } from "./constants";

const schema = z.object({
  details: z.string().min(1, "Detalhes são obrigatórios"),
  goalAmount: z.coerce.number().min(1, "O valor deve ser maior que zero"),
  months: z.coerce.number().min(1, "O número de meses deve ser maior que zero"),
});

type FormData = z.infer<typeof schema>;

export const FinancialGoal = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const router = useRouter()

  const { control, handleSubmit, formState: { isValid, isSubmitting }, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get('email');

    if (email) {
      localStorage.setItem('email', email);
    }
  }, []);

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
      setSelectedOption(json.data?.goalCategory ?? null)
      setValue('details', json.data.details ?? '')
      setValue('goalAmount', json.data.goalAmount ?? '')
      setValue('months', json.data.months ?? '')
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
    const payload = {
      ...data,
      goalCategory: selectedOption,
      email: localStorage.getItem('email'),
    };

    try {
      const financialDetailsFromStorage = localStorage.getItem(`financialDetails_${payload.email}`)
      const alreadyPersisted = financialDetailsFromStorage ? JSON.parse(financialDetailsFromStorage) : {}

      const response = await fetch('http://localhost:3333/onboarding/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save financial goal');
      }
      const result = await response.json()
      const updatedData = { ...alreadyPersisted, ...result.data };
      localStorage.setItem(`financialDetails_${payload.email}`, JSON.stringify(updatedData));

      router.push('/onboarding/financial-status');
    } catch (error) {
      console.error('Error submitting financial goal:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full pt-5 flex flex-col gap-5 justify-between">
      <div className="flex flex-col gap-2">
        {financialGoalOptions.map((option) => (
          <div
            key={option}
            className={clsx(
              "p-4 flex flex-col rounded-xl border transition-all",
              {
                "border-neutral-200 bg-white": selectedOption !== option,
                "border-primary bg-[#FDEEE7]": selectedOption === option,
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
                  "border-primary bg-primary": selectedOption === option,
                }
              )}>
                <MdOutlineCheck className="text-white" size={8} />
              </div>
              <p className="md:text-sm text-xs">{option}</p>
            </div>

            <div className={clsx(
              "transition-max-height duration-300 ease-in-out overflow-hidden flex flex-col gap-3",
              {
                "max-h-0": selectedOption !== option,
                "max-h-[500px] mt-3": selectedOption === option,
              }
            )}>
              <fieldset className="flex flex-col gap-2">
                <label className="text-primary md:text-sm text-xs font-medium">
                  Dê detalhes sobre seu objetivo financeiro pessoal.
                </label>
                <Controller
                  name="details"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      placeholder="Digite aqui."
                      className="p-4 text-xs rounded-lg outline-primary"
                    />
                  )}
                />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label className="text-primary md:text-sm text-xs font-medium">
                  Quanto você precisa pra alcançar seu objetivo?
                </label>
                <Controller
                  name="goalAmount"
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
                <label className="text-primary md:text-sm text-xs font-medium">
                  Em quantos meses?
                </label>
                <Controller
                  name="months"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      min={1}
                      placeholder="12"
                      className="p-4 text-xs rounded-lg outline-primary"
                    />
                  )}
                />
              </fieldset>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid && !selectedOption}
        isLoading={isSubmitting}
      >
        Próximo
      </Button>
    </form>
  )
}