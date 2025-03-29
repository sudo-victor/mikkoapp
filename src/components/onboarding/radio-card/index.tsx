import clsx from "clsx"
import { MdOutlineCheck } from "react-icons/md"

type Props = {
  value: string
  isSelected: boolean
  onSelect(): void
}

export const RadioCard = ({
  value,
  isSelected,
  onSelect
}: Props) => {
  return (
    <div
    key={value}
    className={clsx(
      "p-4 flex flex-col rounded-xl border transition-all",
      {
        "border-neutral-200 bg-white": !isSelected,
        "border-primary bg-[#FDEEE7] gap-3": isSelected,
      }
    )}
  >
    <div
      className="flex items-center gap-2"
      onClick={onSelect}
    >
      <div className={clsx(
        "w-[14px] h-[14px] flex items-center justify-center rounded-full border",
        {
          "border-neutral-200 bg-white": !isSelected,
          "border-primary bg-primary": isSelected,
        }
      )}>
        <MdOutlineCheck className="text-white" size={8} />
      </div>
      <p className="text-xs">{value}</p>
    </div>
  </div>
  )
}