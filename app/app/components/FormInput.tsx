import React from 'react'

type Props = {
  id: string
  name: string
  labelText: string
  required?: boolean
  className?: string
}

const FormInput: React.VFC<Props> = ({
  id,
  name,
  labelText,
  required = false,
  className,
}: Props) => {
  return (
    <div className={className}>
      <label
        className={'block mb-[8px] text-[16px] font-bold leading-none'}
        htmlFor={id}
      >{`${labelText}${required ? '*' : ''}`}</label>
      <input
        name={name}
        type="text"
        className={'block p-[8px] w-full h-[56px] rounded-[10px] border-4'}
        required={required}
        id={id}
      />
    </div>
  )
}

export default FormInput
