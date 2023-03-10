import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'

const CardEditInfo = () => {
  return (
    <div className='w-full h-100vh flex justify-center py-10'>
        <div className='sm:w-[440px] w-[340px] h-[538px] border-solid border-[1px] rounded-[5px] px-5 py-4 bg-[#FFFFFF]'>
            <div className='flex justify-between items-center'>
              <h1 className='text-[16px] font-[600] text-[#000000]'>Edit Info</h1>
              <FontAwesomeIcon icon={faXmark} className='text-[16px] font-[500] text-[#949494]'/>
            </div>
            <div className='py-5'>
              <div className='flex justify-center pb-2'>
                <img alt='' className='w-[150px] h-[150px] rounded-[50%]'/>
              </div>
              <div className='flex justify-center'>
                <button className='w-[150px] h-[36px] border-solid border-[1px] border-[#EDEDED] rounded-[3px] text-[14px] text-[#949494] font-[400]'>Change</button>
              </div>
            </div>
            <div className='max-w-[90%] m-auto'>
              <h1 className='text-[16px] text-[#353535] font-[500]'>Name</h1>
              <div className='py-3 flex justify-between'>
                <input type="text" placeholder='Ma. Elaine' className='border-solid border-[1px] text-center sm:w-[170px] w-[125px] h-[36px] placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#949494] rounded-[3px] bg-[#F2F1F0] focus:outline-none text-[14px] font-[400] text-[#000000]'></input>
                <input type="text" placeholder='Delfin' className='border-solid border-[1px] text-center sm:w-[170px] w-[125px] h-[36px] placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#949494] rounded-[3px] bg-[#F2F1F0] focus:outline-none text-[14px] font-[400] text-[#000000]'></input>
              </div>
              <h1 className='text-[16px] text-[#353535] font-[500]'>Password</h1>
              <div className='py-2 flex justify-between'>
                <input type="text" placeholder='Old Password' className='border-solid border-[1px] text-center sm:w-[170px] w-[125px] h-[36px] placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#949494] rounded-[3px] bg-[#F2F1F0] focus:outline-none text-[14px] font-[400] text-[#000000]'></input>
                <input type="text" placeholder='New Password' className='border-solid border-[1px] text-center sm:w-[170px] w-[125px] h-[36px] placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#949494] rounded-[3px] bg-[#F2F1F0] focus:outline-none text-[14px] font-[400] text-[#000000]'></input>
              </div>
            </div>
        </div>
    </div>
  )
}

export default CardEditInfo