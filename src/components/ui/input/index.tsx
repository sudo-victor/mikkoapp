import React, { InputHTMLAttributes, useState } from "react"
import clsx from "clsx"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  className?: string
}

export const Input: React.FC<Props> = ({
  label,
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative w-full p-4 border border-[#D0D0D0] rounded-lg">
      <label 
        className={clsx(
          "absolute font-red-hat text-neutral-400 transition-all duration-200",
          (isFocused || props.value) 
            ? "-top-3 left-1 text-xs bg-white px-1" 
            : "top-4 left-4 text-sm"
        )}
      >
        {label}
      </label>
      <input
        className={clsx(
          "relative w-full z-20 text-dark font-red-hat text-xs md:text-sm bg-transparent outline-none",
          className
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={props.disabled}
        {...props}
      />
    </div>
  )
}