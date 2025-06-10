"use client";
import { ImSpinner2 } from "react-icons/im";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { CategorizeExtract } from "@/type/categorize-extract";
import { Transaction } from "@/type/transaction";

import { TransactionCard } from "../../transaction/transaction-card";

export const HistoryReview = () => {
  const [categorizeExtract, setCategorizeExtract] = useState<CategorizeExtract | null>()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [modifiedTransactions, setModifiedTransactions] = useState<Transaction[]>([])

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

  const fetchCategorizeExtract = async (onboardingId: string): Promise<{ data: CategorizeExtract }> => {
    const response = await fetch(`http://localhost:3333/onboarding/${onboardingId}/categorize/extract`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch financial details');
    }
    const data = await response.json();
    return data;
  };

  const fetchTransactions = async (userId: string): Promise<{ data: Transaction[] }> => {
    const response = await fetch(`http://localhost:3333/transactions/by/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch financial details');
    }
    const data = await response.json();
    return data;
  };

  const fetchOnboardingData = async () => {
    try {
      setIsFetching(true)
      const json = await fetchFinancialDetails();
      const fetchedCategorizeExtract = await fetchCategorizeExtract(json.data.id)
      if (fetchedCategorizeExtract.data.status === 'PROCESSED') {
        const fetchedTransactions = await fetchTransactions(json.data.userId)
        setTransactions(fetchedTransactions.data)
      }
      setCategorizeExtract(fetchedCategorizeExtract.data)
    } catch (error) {
      console.error('Error getting financial goal:', error);
    } finally {
      setIsFetching(false)
    }
  }

  const handleTransactionUpdate = (updatedTransaction: Transaction) => {
    setTransactions(prevTransactions =>
      prevTransactions.map(transaction =>
        transaction.transactionId === updatedTransaction.transactionId ? updatedTransaction : transaction
      )
    )
    setModifiedTransactions(prev => {
      const exists = prev.some(t => t.transactionId === updatedTransaction.transactionId)
      if (!exists) {
        return [...prev, updatedTransaction]
      }
      return prev.map(t =>
        t.transactionId === updatedTransaction.transactionId ? updatedTransaction : t
      )
    })
  }

  const handleSubmitTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:3333/onboarding/${categorizeExtract?.onboardingId}/planning`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to update transactions')
      }

      setModifiedTransactions([])
    } catch (error) {
      console.error('Error updating transactions:', error)
    }
  }

  useEffect(() => {
    (async () => {
      fetchOnboardingData()
    })()
  }, []);

  return (
    <div className="h-full py-2 flex flex-col gap-5 justify-between">
      <div className="flex flex-col gap-5">
        <div className="py-2 flex flex-col gap-5">
          <p className="text-xs md:text-sm text-[#545454] font-red-hat">
            Categorizamos suas transações pra realizar um planejamento mais detalhado. Dá uma conferida, vai que precisa ser feito algum ajuste nas informações.
          </p>
        </div>

        {
          (isFetching || categorizeExtract?.status === 'PENDING') && (
            <div className="w-full p-3 flex flex-col gap-2 items-center rounded-md bg-[#F6F6F6]">
              <ImSpinner2 className="animate-spin text-primary text-3xl" />
              <div className="flex flex-col items-center">
                <p className="text-xs font-red-hat font-semibold">Por favor, aguarde...</p>
                <p className="text-xs text-[#626262] font-red-hat">O Mikko está dando uma olhada no seu extrato.</p>
              </div>
            </div>
          )
        }

        {
          (!isFetching && categorizeExtract?.status === 'PROCESSED') && (
            <div className="flex flex-col gap-3 h-full overflow-x-auto">
              <span className="text-xs text-[#9A9A9A]">
                {transactions.length} itens para revisar
              </span>
              <div className="flex flex-col gap-6">
                {transactions.map((transaction, index) => (
                  <div key={transaction.transactionId}>
                    <TransactionCard
                      data={transaction}
                      onTransactionUpdate={handleTransactionUpdate}
                    />
                    {index < transactions.length - 1 && (
                      <div className="mt-6 border-t border-neutral-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        }
      </div>

      <div className="flex flex-col gap-2 items-center">
        <Button
          disabled={isFetching || categorizeExtract?.status === 'PENDING'}
          onClick={handleSubmitTransactions}
        >
          {modifiedTransactions.length > 0 ? 'Salvar transações' : 'Gerar planejamento'}
        </Button>
      </div>
    </div>
  )
}