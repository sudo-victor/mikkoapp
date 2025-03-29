import { FinancialGoal } from "@/components/onboarding/financial-goal";
import { FinancialStatus } from "@/components/onboarding/financial-status";
import { FinancialHistory } from "@/components/onboarding/financial-history";
import { HistoryReview } from "@/components/onboarding/history-review";

import { steps } from "./constants";

type Props = {
  params: Promise<{ step: string }>
}

export default async function StepsOnboarding({ params }: Props) {
  const { step } = await params

  if (typeof window !== 'undefined') {
    return <></>
  }

  return (
    <>
      {step === steps[0].name && <FinancialGoal />}
      {step === steps[1].name && <FinancialStatus />}
      {step === steps[2].name && <FinancialHistory />}
      {step === steps[3].name && <HistoryReview />}
    </>
  )
}