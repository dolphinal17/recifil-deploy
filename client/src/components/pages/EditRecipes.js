import React from 'react'
import { NavbarAdmin, SidebarAdmin, TableUser } from '../organisms/organisms'
import RecipesForm from '../organisms/forms/RecipesForm'

export default function EditRecipes() {
  return (  
    <div>
        <NavbarAdmin/>
        <div className='flex flex-row'>
            <SidebarAdmin />
            
            <RecipesForm />
        </div>
    </div>
  ) 
}