import React from 'react'
import { NavbarAdmin, SidebarAdmin, TableUser } from '../organisms/organisms'

import AddRecipeForm from '../organisms/forms/AddRecipeForm'

export default function AddRecipes() {
  return (  
    <div>
        <NavbarAdmin/>
        <div className='flex flex-row'>
            <SidebarAdmin />
            
            <AddRecipeForm />
        </div>
    </div>
  ) 
}