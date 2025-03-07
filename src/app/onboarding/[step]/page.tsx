import FinancialGoal from "@/components/onboarding/financial-goal";
import { steps } from "./constants";

type Props = {
  params: Promise<{ step: string }>
}

export default async function StepsOnboarding({ params }: Props) {
  const { step } = await params

  return (
    <>
      {step === steps[0].name && <FinancialGoal />}
      {step === steps[1].name && <FinancialGoal />}
    </>
  )
}