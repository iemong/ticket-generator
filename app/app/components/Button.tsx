import React from 'react'

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children: React.ReactNode
  className?: string
}

const Button: React.VFC<Props> = ({ children, className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`h-[56px] px-[16px] w-full min-w-[200px] rounded-[10px] text-white bg-black disabled:bg-gray font-bold ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
