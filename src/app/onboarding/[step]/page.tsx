import { FinancialGoal } from "@/app/components/onboarding/financial-goal";
import { FinancialStatus } from "@/app/components/onboarding/financial-status";

import { steps } from "./constants";
import { FinancialHistory } from "@/app/components/onboarding/financial-history";
import { HistoryReview } from "@/app/components/onboarding/history-review";

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