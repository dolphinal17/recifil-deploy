import React from 'react'
import { NavbarAdmin, SidebarAdmin } from '../organisms/organisms.js'
export default function () {
  return (
    <div className='flex'>
        <SidebarAdmin/>
        <NavbarAdmin/>
    </div>
  )
}