"use client";
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { NotepadText, Plus, Target } from 'lucide-react';
import Image from 'next/image';

import { StrategyIcon } from '@/components/icons/strategy-icon';
import { useRouter, usePathname } from 'next/navigation';

type PageNames = "planning" | "goals" | "extract" | "profile"

export const MobileNavbar = () => {
  const routes = useRouter()
  const pathname = usePathname()
  
  const getPageFromPath = (): PageNames => {
    if (pathname.includes("/dashboard/goals")) return "goals"
    if (pathname.includes("/dashboard/extract")) return "extract"
    if (pathname.includes("/dashboard/profile")) return "profile"
    return "planning"
  }
  
  const [currentPage, setCurrentPage] = useState<PageNames>("planning")
  
  // Atualiza a página atual após a montagem do componente
  useEffect(() => {
    setCurrentPage(getPageFromPath())
  }, [pathname])

  const goTo = (page: PageNames) => {
    setCurrentPage(page)
    routes.push(`/dashboard/${page}`)
  }

  return (
    <nav className='w-fit px-5 fixed z-10 right-0 left-0 bottom-4 flex items-center gap-5 mx-auto rounded-full bg-dashboardBg border border-white shadow-[0px_3px_6px_0px_#0000001A,0px_11px_11px_0px_#00000017,0px_24px_14px_0px_#0000000D,0px_42px_17px_0px_#00000003,0px_66px_18px_0px_#00000000] backdrop-blur-[24.3px]'>
      <button className='h-full py-2 flex flex-col gap-2 items-center' onClick={() => goTo("planning")}>
        <StrategyIcon color={currentPage === "planning" ? "#DD551B" : "#898989"} />
        <p className={clsx('text-xs font-red-hat transition', currentPage === "planning" ? "text-primary" : "text-[#898989]")}>
          Objetivos
        </p>
      </button>
      <button className='h-full py-2 flex flex-col gap-2 items-center' onClick={() => goTo("goals")}>
        <Target size={24} color={currentPage === "goals" ? "#DD551B" : "#898989"} />
        <p className={clsx('text-[#898989] text-xs font-red-hat', currentPage === "goals" ? "text-primary" : "text-[#898989]")}>
          Metas
        </p>
      </button>
      <div className='mb-4 flex flex-col gap-1 items-center'>
        <button className='w-11 h-11 flex items-center justify-center rounded-full bg-primary text-white'>
          <Plus size={20} />
        </button>
        <p className='text-[#898989] text-xs font-red-hat'>
          Adicionar
        </p>
      </div>
      <button className='h-full py-2 flex flex-col gap-2 items-center' onClick={() => goTo("extract")}>
        <NotepadText size={24} color={currentPage === "extract" ? "#DD551B" : "#898989"} />
        <p className={clsx('text-xs font-red-hat', currentPage === "extract" ? "text-primary" : "text-[#898989]")}>
          Extrato
        </p>
      </button>
      <button className='h-full py-2 flex flex-col gap-2 items-center' onClick={() => goTo("profile")}>
        <Image src="/mikko-avatar.png" alt="Mikko" width={24} height={24} />
        <p className={clsx('text-xs font-red-hat', currentPage === "profile" ? "text-primary" : "text-[#898989]")}>
          Ajustes
        </p>
      </button>
    </nav>
  )
}