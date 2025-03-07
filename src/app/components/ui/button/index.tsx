import clsx from "clsx"
import React, { ButtonHTMLAttributes, ReactNode } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  className?: string
}

export const Button: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        "w-full font-rubik px-[22px] py-[10px] rounded-lg text-xs font-semibold whitespace-nowrap transition",
        {
          "bg-primary hover:brightness-90": !props.disabled,
          "bg-neutral-200 text-[#999999]": props.disabled,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}