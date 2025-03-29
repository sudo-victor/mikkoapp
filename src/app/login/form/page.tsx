"use client";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Form() {
  const [currentStep, setCurrentStep] = useState<"email" | "name" | "code">("email")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const handleNextStep = () => {
    const steps = ["email", "name", "code"] as ("email" | "name" | "code")[]
    const currentStepIndex = steps.findIndex(s => s === currentStep)
    const isLastStep = (steps.length - 1) === currentStepIndex
    if (isLastStep) return
    setCurrentStep(steps[currentStepIndex + 1])
  }

  return (
    <div className="w-full h-[88%] bg-[#F6F4F3]">
      <main className="mx-auto h-full">
        <div className="absolute bottom-0 right-0">
          <Image src="/mikko-tail-light.svg" alt="Mikko tail" width={274} height={200} />
        </div>

        <form className="h-full flex flex-col justify-between">
          {
            currentStep === "email" && (
              <div className="w-full px-9 py-6 flex flex-col gap-5">
                <h1 className="text-2xl md:text-3xl font-medium font-rubik">
                  Digite o seu e-mail.
                </h1>
                <Input label="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            )
          }
          {
            currentStep === "name" && (
              <div className="w-full px-9 py-6 flex flex-col gap-5">
                <h1 className="text-2xl md:text-3xl font-medium font-rubik">
                  Primeira vez por aqui?Como podemos te chamar?
                </h1>
                <Input label="Nome" type="text" value={name} onChange={e => setName(e.target.value)} />
              </div>
            )
          }

          <div className="w-full px-9 py-6 bg-white">
            <Button onClick={handleNextStep} type="button">
              Próximo
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}