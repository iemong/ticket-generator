import React from 'react'

type Props = {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
}

const Headline: React.VFC<Props> = ({
  as: CustomTag = 'p',
  children,
  className,
}: Props) => {
  return (
    <CustomTag className={`text-[36px] font-bold leading-[1.5] ${className}`}>
      {children}
    </CustomTag>
  )
}

export default Headline
