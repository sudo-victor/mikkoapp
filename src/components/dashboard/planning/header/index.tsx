"use client";
import Image from "next/image";

import ShinyText from "@/components/animated/shiny-text";

type Props = {
  title: string
}

export const Header = ({ title }: Props) => {
  return (
    <header className="w-full h-24 shrink-0 flex items-center justify-between">
      <h1 className='text-xl font-rubik text-dark font-medium'>
        {title} 🍌
      </h1>
      <button className="p-2 flex items-center gap-1 bg-dark rounded-full hover:brightness-90 transition">
        <Image src="/banana-prata-coin.svg" alt="Banana Prata" height={25} width={25} />
        <ShinyText text="Faça um upgrade" disabled={false} speed={3} className='text-xs font-rubik font-medium ' />
      </button>
    </header>
  )
}