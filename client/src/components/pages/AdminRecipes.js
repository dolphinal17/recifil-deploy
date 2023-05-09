import React, {useState} from 'react'
import { NavbarAdmin, SidebarAdmin, TableRecipes, AddRecipeForm } from '../organisms/organisms'

export default function AdminRecipes() {
  const [openModal, setOpenModal] = useState(false)

  return (  
    <div className='h-screen w-full bg-green-400 relative'>
        <AddRecipeForm open={openModal} onClose={() => setOpenModal(false)}/>

        <div className='flex'>
          <SidebarAdmin/>

          <div className='w-full flex flex-1 flex-col'>
              <NavbarAdmin/>
              
              <div className='bg-bgColor h-full p-[1rem]'>
                  <div className='flex justify-between items-center mb-[1.5rem]'>
                      <h1 className='text-xl font-medium text-mainBlack'>Manage Recipes</h1>

                      <button onClick={() => setOpenModal(true)} className='w-[9rem] bg-secondary text-white p-2 rounded-lg'>Add a New Recipe</button>
                  </div>

                  <TableRecipes/>
              </div>
          </div>
        </div>

        {/* <NavbarAdmin/>
        <div className='flex flex-row'>
            <SidebarAdmin />
            
            <TableRecipes />
        </div> */}
    </div>
  ) 
}