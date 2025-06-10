/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { api } from "@/lib/axios";

export default function Form() {
  const [currentStep, setCurrentStep] = useState<"email" | "name" | "code">("email")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [code, setCode] = useState("")
  const router = useRouter();

  const handleSignin = async () => {
    try {
      const response = await api.post("/users/auth/signin", { email });
      setCurrentStep("code");
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setCurrentStep("name");
      } else {
        console.error("Erro ao fazer login:", error);
      }
      return null;
    }
  }

  const handleSignup = async () => {
    try {
      const response = await api.post("/users/auth/signup", {
        email,
        name,
        phoneNumber
      });
      setCurrentStep("code");
      return response.data;
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      return null;
    }
  }

  const handleValidateCode = async () => {
    try {
      const response = await api.post("/users/auth/code/validate", {
        email,
        code
      });
      const { token } = response.data.data;
      localStorage.setItem("auth_token", token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log("Código validado com sucesso");
      router.push("/dashboard/extract");
      return response.data;
    } catch (error) {
      console.error("Erro ao validar código:", error);
      return null;
    }
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const isButtonDisabled = () => {
    if (currentStep === "email") {
      return !isValidEmail(email);
    } else if (currentStep === "name") {
      return !name.trim();
    } else if (currentStep === "code") {
      return code.length !== 6;
    }
    return false;
  }

  const handleNextStep = async () => {
    if (currentStep === "email") {
      await handleSignin();
    } else if (currentStep === "name") {
      await handleSignup();
    } else if (currentStep === "code") {
      await handleValidateCode();
    }
  }

  return (
    <div className="w-full h-[88%] bg-[#F6F4F3]">
      <main className="mx-auto h-full">
        <div className="absolute bottom-0 right-0">
          <Image src="/mikko-tail-light.svg" alt="Mikko tail" width={274} height={200} />
        </div>

        <div className="h-full flex flex-col justify-between">
          {
            currentStep === "email" && (
              <div className="w-full px-9 py-6 flex flex-col gap-5">
                <h1 className="text-2xl md:text-3xl font-medium font-rubik">
                  Digite o seu e-mail.
                </h1>
                <Input label="E-mail" labelBg="bg-[#F6F4F3]" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            )
          }
          {
            currentStep === "name" && (
              <div className="w-full px-9 py-6 flex flex-col gap-5">
                <h1 className="text-2xl md:text-3xl font-medium font-rubik">
                  Primeira vez por aqui?Como podemos te chamar?
                </h1>
                <Input label="Nome" labelBg="bg-[#F6F4F3]" type="text" value={name} onChange={e => setName(e.target.value)} />
                <Input label="Celular" labelBg="bg-[#F6F4F3]" type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
              </div>
            )
          }
          {
            currentStep === "code" && (
              <div className="w-full px-9 py-6 flex flex-col gap-5">
                <div className="flex flex-col gap-4">
                  <h1 className="text-2xl md:text-3xl font-medium font-rubik">
                    Insira o código de verificação
                  </h1>
                  <p className="text-xs font-red-hat text-[#545454]">
                    Enviamos um código de verificação de 6 dígitos para seu e-mail victor.soutinho2025@gmail.com
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    value={code}
                    onChange={(e) => setCode(e)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSeparator />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <p className="text-xs font-red-hat font-medium text-[#ADADAD]">
                  Reenvie o código: disponível em 1:00
                </p>
              </div>
            )
          }

          <div className="w-full px-9 py-6 bg-white">
            <Button
              onClick={handleNextStep}
              type="button"
              disabled={isButtonDisabled()}
              className={`w-full ${isButtonDisabled() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Próximo
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}