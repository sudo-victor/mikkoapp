import clsx from "clsx"
import { LoaderCircle } from "lucide-react"
import React, { ButtonHTMLAttributes, ReactNode } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  className?: string
  isLoading?: boolean
}

export const Button: React.FC<Props> = ({
  children,
  className,
  isLoading,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "w-full flex items-center justify-center font-rubik px-[22px] py-[10px] rounded-lg md:text-sm text-xs font-semibold whitespace-nowrap transition",
        {
          "bg-secondary hover:brightness-90 text-secondaryFg": !props.disabled && !isLoading,
          "bg-neutral-200 text-[#999999]": props.disabled && !isLoading,
        },
        className
      )}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {
        isLoading ? <LoaderCircle className="text-secondaryFg animate-spin" /> : children
      }
    </button>
  )
}