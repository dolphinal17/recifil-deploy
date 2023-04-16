import React from 'react'

export default function BtnLS( {val} ) {
  return (
    <button className={`text-primary bg-lime-500 px-[4rem] py-[0.75rem] text-base font-normal tablet:font-medium rounded-md cursor-pointer hover:bg-lime-600`}>{val}</button>
  )
}
