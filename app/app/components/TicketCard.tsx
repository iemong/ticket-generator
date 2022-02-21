import React from 'react'
import { Link } from '@remix-run/react'

type Props = {
  name: string
  isActive: boolean
  ticketKey: string
}

const activeStyle = 'bg-black'
const inactiveStyle = 'bg-transparent border-dashed'

const TicketCard: React.VFC<Props> = ({
  name,
  isActive,
  ticketKey,
}: Props) => {
  return (
    <Link to={`/tickets/${ticketKey}`}>
      <div className={'flex min-h-[120px] rounded-[10px] sm:min-w-[320px]'}>
        <div
          className={
            'flex flex-1 items-center px-[16px] bg-black rounded-l-[10px] border border-r-0 border-gray'
          }
        >
          <p className={'text-[24px] font-bold leading-[1.5] text-white'}>{name}</p>
        </div>
        <div
          className={`w-[60px] rounded-r-[10px] border border-gray ${
            isActive ? activeStyle : inactiveStyle
          }`}
        />
      </div>
    </Link>
  )
}

export default TicketCard
