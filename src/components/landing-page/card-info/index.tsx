import { IconType } from "react-icons"

type Props = {
  title: string
  description: string
  Icon: IconType
}

export function CardInfo({ title, description, Icon}: Props) {
  return (
    <article className="p-3 rounded-lg border border-neutral-200 flex gap-4">
      <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full border border-neutral-200">
        <Icon size={14} />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-xs font-semibold font-red-hat">{title}</h3>
        <p className="text-xs font-red-hat">{description}</p>
      </div>
    </article>
  )
}