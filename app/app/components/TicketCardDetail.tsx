import React from 'react'
import { Link } from '@remix-run/react'

type Props = {
  name: string
  isActive: boolean
  ticketKey: string
  description: string | null
}

const activeStyle = 'bg-black'
const inactiveStyle = 'bg-transparent border-dashed'

const TicketCard: React.VFC<Props> = ({
  name,
  isActive,
  ticketKey,
  description,
}: Props) => {
  return (
    <div className={'rounded-[10px]'}>
      <div
        className={
          'py-[24px] px-[46px] min-h-[100px] bg-black rounded-t-[10px] border border-r-0 border-gray'
        }
      >
        <p className={'text-[24px] font-bold leading-[1.5] text-white'}>
          {name}
        </p>
        <p className={'mt-[16px] text-[18px] leading-[1.5] text-white'}>
          {description}
        </p>
      </div>
      <div
        className={`py-[24px] rounded-b-[10px] border border-gray ${
          isActive ? activeStyle : inactiveStyle
        }`}
      >
        <p
          className={
            'text-[20px] font-bold leading-[1.5] text-center text-white'
          }
        >
          ID: {ticketKey}
        </p>
      </div>
    </div>
  )
}

export default TicketCard
