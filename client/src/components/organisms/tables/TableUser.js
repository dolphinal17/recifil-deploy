import React from 'react'
import { SearchBarWBG } from '../../molecules/molecules.js'

export default function TableUser() {
  return (
    <div className='w-full flex justify-center items-center bg-bgColor py-[2rem]'>
        <div className='max-w-[80rem] w-full bg-primary rounded-xl overflow-auto pb-[2rem]'>
            {/* name and search bar */}
            <div className='flex justify-between items-center px-[1rem] tablet:px-[2rem] my-[0.5rem] tablet:my-[1rem]'>
                <span className='text-base tablet:text-xl font-normal tablet:font-medium text-mainBlack'>Recipes</span>

                <SearchBarWBG 
                    placeHolder="Search recipes"
                    bg="bgColor"
                />
            </div>

            <table className='border-collapse table-fixed w-full text-sm'>
                <thead>
                    <tr className='bg-bgColorTwo text-primary'>
                        <th className='font-normal tablet:font-medium p-4 pl-8 text-left'>Id</th>
                        <th className='font-normal tablet:font-medium p-4 text-left'>Image</th>
                        <th className='font-normal tablet:font-medium p-4 text-left'>Name</th>
                        <th className='font-normal tablet:font-medium p-4 text-left'>About</th>
                        <th className='font-normal tablet:font-medium p-4 text-left'>Integral Ingredients</th>
                        <th className='font-normal tablet:font-medium p-4 text-left'>Not Integral Ingredients</th>
                        <th className='font-normal tablet:font-medium p-4 text-left'>Action</th>
                    </tr>
                </thead>

                <tbody className='bg-primary'>
                    <tr>
                        <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 pl-8 text-left'>1</td>
                        <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 text-left text-ellipsis overflow-hidden'>Image Link</td>
                        <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 text-left'>Adobo</td>
                        <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 text-left'>This is About</td>
                        <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 text-left'>I'm Integral</td>
                        <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 text-left'>Not Integral</td>
                        <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 pr-8 text-left'></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}