import React from 'react'

export default function BtnLS( {val} ) {
  return (
    <button className={`text-primary bg-secondary px-[4rem] py-[0.75rem] text-base font-normal tablet:font-medium rounded-md cursor-pointer`}>{val}</button>
  )
}
