import React from 'react'

type Props = {
  id: string
  name: string
  labelText: string
  required?: boolean
  placeholder?: string
  className?: string
}

const FormInput: React.VFC<Props> = ({
  id,
  name,
  labelText,
  required = false,
  placeholder,
  className,
}: Props) => {
  return (
    <div className={className}>
      <label
        className={'block mb-[8px] text-[16px] font-bold leading-none'}
        htmlFor={id}
      >{`${labelText}${required ? '*' : ''}`}</label>
      <textarea
        name={name}
        className={'block p-[8px] w-full h-[80px] rounded-[10px] border-4'}
        id={id}
        placeholder={placeholder}
      />
    </div>
  )
}

export default FormInput
