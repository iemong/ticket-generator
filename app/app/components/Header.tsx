import React from 'react'

const Header: React.VFC = () => {
  return (
    <>
      <header className={'flex justify-center items-center px-[16px] h-[48px] bg-black'}>
        <div className={'w-[24px]'} />
        <h1 className={'mx-auto w-auto text-[18px] font-bold text-white'}>
          Ticket Generator
        </h1>
        <div className={'w-[24px]'}>
          <button
            className={'flex flex-col justify-center items-center h-[24px]'}
          >
            <div className={'w-[24px] h-[1px] bg-white'} />
            <div className={'mt-[8px] w-[24px] h-[1px] bg-white'} />
          </button>
        </div>
      </header>
    </>
  )
}

export default Header
