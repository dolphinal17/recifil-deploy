import React from 'react'
import { NavbarAdmin, SidebarAdmin } from '../organisms/organisms'
import TableRecipes from '../organisms/tables/TableRecipes'

export default function AdminRecipes() {
  return (  
    <div>
        <NavbarAdmin/>
        <div className='flex flex-row'>
            <SidebarAdmin />
            
            <TableRecipes />
        </div>
    </div>
  ) 
}