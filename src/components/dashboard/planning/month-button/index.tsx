import clsx from "clsx"
import { CalendarDays } from "lucide-react"

type Props = {
  label: string
  isActivated?: boolean
}

export const MonthButton = ({ label, isActivated = false }: Props) => {
  return (
    <button className={clsx(
      "flex items-center gap-1 p-1 border border-[#E8E8E8] rounded text-xs font-medium font-red-hat hover:brightness-90 transition",
      isActivated && "bg-lightRed text-primary border-primary",
      !isActivated && "text-[#5B5B5B]",
    )}>
      <CalendarDays size={12} />
      {label}
    </button>
  )
}