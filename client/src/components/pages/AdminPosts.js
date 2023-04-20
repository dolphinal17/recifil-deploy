import React from 'react'
import { NavbarAdmin, SidebarAdmin } from '../organisms/organisms'
import TablePosts from '../organisms/tables/TablePosts'

export default function AdminPosts() {
  return (  
    <div>
        <NavbarAdmin/>
        <div className='flex flex-row'>
            <SidebarAdmin />
            
            <TablePosts />
        </div>
    </div>
  ) 
}