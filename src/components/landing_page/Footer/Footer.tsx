import FooterLogo from '~/assets/svg/Tdocman.svg'
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt, FaYoutube, FaGithub } from 'react-icons/fa'
import ImgFooter from '~/assets/places/business-idea-3683781_1920.jpg'

const Footer = () => {
  return (
    <>
      <div className=' dark:bg-gray-950 py-10 relative overflow-hidden'>
        <img
          src={ImgFooter}
          className='absolute right-0 top-0 h-full overflow-hidden w-full object-cover z-[-1]'
          alt=''
        />
        <div className='container mx-auto w-[60%]'>
          <div className='grid md:grid-cols-2 bg-gray-200 rounded-t-xl items-center text-justify'>
            <h1 className='flex items-center justify-center gap-3 text-xl sm:text-3xl font-bold text-justify sm:text-left'>
              <img src={FooterLogo} alt='' className='max-h-[150px] color-white pt-2' />
              {/* TravelloGo */}
            </h1>
            <div className='py-8 px-4'>
              <p className='text-sm mt-2'>
                Với hệ thống TDocMan, người dùng có thể quản lý, lưu trữ và ký hợp đồng trực tuyến một cách dễ dàng và
                thuận tiện.
              </p>
              <br />
              <div className='flex items-center gap-3 '>
                <FaLocationArrow />
                <p>Thach That, Ha Noi, Viet Nam</p>
              </div>
              <div className='flex items-center gap-3 mt-3'>
                <FaMobileAlt />
                <p>0365366081</p>
              </div>
              {/* social handles */}
              <div>
                <div className='flex items-center gap-3 mt-6'>
                  <a href='#'>
                    <FaFacebook className='text-3xl' />
                  </a>
                  <a href='#'>
                    <FaYoutube className='text-3xl' />
                  </a>
                  <a href='#'>
                    <FaGithub className='text-3xl' />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p className='flex-1 flex-shrink bg-primary text-black bg-gray-200 text-center py-2 border-t-2 border-gray-300'>
            @copyright 2024 All rights reserved || Made with ❤️ by G-63
          </p>
        </div>
      </div>
    </>
  )
}

export default Footer
