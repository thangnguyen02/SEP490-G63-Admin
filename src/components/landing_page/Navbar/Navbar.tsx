import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { FaCircleInfo } from 'react-icons/fa6'
import { GrServices } from 'react-icons/gr'
import { MdOutlineSecurity } from 'react-icons/md'
import Logo from '~/assets/svg/Tdocman.svg'
import ResponsiveMenu from './ResponsiveMenu'
import { HiMenuAlt3, HiMenuAlt1 } from 'react-icons/hi'

export const NavbarLinks = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Blogs',
    link: '/blogs'
  },
  {
    name: 'Blogs',
    link: '/blogs'
  },
  {
    name: 'Rule',
    link: '/rule'
  },
  {
    name: 'Secure',
    link: '/Secure'
  }
]

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <>
      <nav className='fixed top-0 right-0 w-full z-50 bg-white backdrop-blur-sm text-black shadow-md'>
        <div className='container py-3 px-5 sm:py-0'>
          <div className='flex justify-center items-center'>
            <div className='flex items-center gap-4 py-1 font-bold text-2xl'>
              <Link to={'/'} onClick={() => window.scrollTo(0, 0)}>
                <img src={Logo} alt='' className='h-16' />
              </Link>
            </div>
            <div className='hidden md:block grow'>
              <ul className='flex justify-center items-center gap-14'>
                <li className='py-4 flex justify-center items-center text-lg font-semibold'>
                  <FaHome className='mr-1' />
                  <NavLink to='/' style={({ isActive }) => (isActive ? { borderBottom: '4px solid blue' } : {})}>
                    Trang chủ
                  </NavLink>
                </li>
                <li className='py-4 flex justify-center items-center text-lg font-semibold'>
                  <FaCircleInfo className='mr-1' />
                  <NavLink to='/blog' style={({ isActive }) => (isActive ? { borderBottom: '4px solid blue' } : {})}>
                    Thông tin
                  </NavLink>
                </li>
                <li className='py-4 flex justify-center items-center text-lg font-semibold'>
                  <GrServices className='mr-1' />
                  <NavLink to='/rule' style={({ isActive }) => (isActive ? { borderBottom: '4px solid blue' } : {})}>
                    Dịch vụ
                  </NavLink>
                </li>
                <li className='py-4 flex justify-center items-center text-lg font-semibold'>
                  <MdOutlineSecurity className='mr-1' />
                  <NavLink to='/secure' style={({ isActive }) => (isActive ? { borderBottom: '4px solid blue' } : {})}>
                    Điều khoản & Bảo mật
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className='flex items-center gap-4'>
              <button
                className='bg-gradient-to-r from-red-500 to-red-500 hover:bg-bg-gradient-to-r hover:from-red hover:bg-red-500 transition-all duration-600 text-white px-3 py-1 rounded-full'
                onClick={() => navigate('/login')}
              >
                Đăng nhập
              </button>
              <button
                className='bg-gradient-to-r from-cyan-500 to-teal-500 hover:bg-bg-gradient-to-r hover:from-secondary hover:bg-primary transition-all duration-600 text-white px-3 py-1 rounded-full'
                onClick={() => navigate('/register')}
              >
                Đăng ký
              </button>
              <div className='md:hidden block'>
                {showMenu ? (
                  <HiMenuAlt1 onClick={toggleMenu} className='cursor-pointer transition-all' size={30} />
                ) : (
                  <HiMenuAlt3 onClick={toggleMenu} className='cursor-pointer transition-all' size={30} />
                )}
              </div>
            </div>
          </div>
        </div>
        <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      </nav>
    </>
  )
}

export default Navbar
