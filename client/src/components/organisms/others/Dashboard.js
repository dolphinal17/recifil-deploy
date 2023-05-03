import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className='w-full flex flex-row items-center justify-center flex-wrap gap-[2rem] m-auto'>
        <Link to="/adminuser">
        <div className="w-[21rem] h-[10.75rem] flex justify-center items-center bg-primary border border-zinc-300 shadow-md rounded-md p-4  gap-5">
            <div className='w-[5.313rem] h-[5.313rem] bg-primary rounded-[50%] flex items-center justify-center'>
                <img src='https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2Fman.png?alt=media&token=7132aeeb-7c45-4b23-9a09-b86b719cd774' className='w-[3rem]' />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <span className='text-[2.875rem] font-bold text-[#464255]'>75</span>
                
                <p className='text-[1rem] font-normal text-[#464255]'>Total Users</p>
            </div>
        </div>
        </Link>

        <Link to='/adminposts'>
        <div className="w-[21rem] h-[10.75rem] flex justify-center items-center bg-primary border border-zinc-300 shadow-md rounded-md p-4 gap-5 ">
            <div className='w-[5.313rem] h-[5.313rem] bg-primary rounded-[50%] flex items-center justify-center'>
            <img src='https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2Flike.png?alt=media&token=c34080da-0d64-4cff-a126-4c0521edc02a' className='w-[3rem] h-[2.688rem]' />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <span className='text-[2.875rem] font-bold text-[#464255]'>75</span>
                <p className='text-[1rem] font-normal text-[#464255]'>Total Posts</p>
            </div>
        </div>
        </Link>

        <Link to='/adminrecipes'>
        <div className="w-[21rem] h-[10.75rem] flex justify-center items-center bg-primary border border-zinc-300 shadow-md rounded-md p-4 gap-5">
            <div className='w-[5.313rem] h-[5.313rem] bg-primary rounded-[50%] flex items-center justify-center'>
            <img src='https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2Frecipe-book.png?alt=media&token=753ead30-2959-4455-9c86-487eb9be84f1' className='w-[3rem] h-[2.688rem]' />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <span className='text-[2.875rem] font-bold text-[#464255]'>75</span>
                <p className='text-[1rem] font-normal text-[#464255]'>Total Recipes</p>
            </div>
        </div>
        </Link>

        <div className="w-[21rem] h-[10.75rem] flex justify-center items-center bg-primary border border-zinc-300 shadow-md rounded-md p-4  gap-5">
            <div className='w-[5.313rem] h-[5.313rem] bg-primary rounded-[50%] flex items-center justify-center'>
            <img src='https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2Fgrocery.png?alt=media&token=fd661c24-bfa1-4161-a4f9-f1f32418950e' className='w-[3rem] h-[2.688rem]' />
            </div>
            <div className='flex flex-col justify-center items-center'>
            <span className='text-[2.875rem] font-bold text-[#464255]'>75</span>
            <p className='text-[1rem] font-normal text-[#464255]'>Total Ingredients</p>
            </div>
        </div>

    </div>
  )
}