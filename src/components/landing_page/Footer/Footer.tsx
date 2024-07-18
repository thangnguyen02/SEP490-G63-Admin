import FooterLogo from '~/assets/svg/Tdocman.svg'
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt } from 'react-icons/fa'
// import NatureVid from '~/assets/video/c.mp4'
import ImgFooter from '~/assets/places/business-idea-3683781_1920.jpg'
import { Link } from 'react-router-dom'

const FooterLinks = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'About',
    link: '/about'
  },
  {
    title: 'Best Places',
    link: '/best-places'
  },
  {
    title: 'Blogs',
    link: '/blogs'
  }
]

const Footer = () => {
  return (
    <>
      <div className=' dark:bg-gray-950 py-10 relative overflow-hidden'>
        <img
          src={ImgFooter}
          className='absolute right-0 top-0 h-full overflow-hidden w-full object-cover z-[-1]'
          alt=''
        />
        <div className='container mx-auto w-[98%]'>
          <div className='grid md:grid-cols-3 bg-gray-200 rounded-t-xl items-center text-justify'>
            <div className='py-8 px-4'>
              <h1 className='flex items-center gap-3 text-xl sm:text-3xl font-bold text-justify sm:text-left'>
                <img src={FooterLogo} alt='' className='max-h-[60px] color-white' />
                {/* TravelloGo */}
              </h1>
              <p className='text-sm mt-2'>
                With TDocMan system, users can manage, store and sign contracts online easily and conveniently.
              </p>
              <br />
              <div className='flex items-center gap-3 '>
                <FaLocationArrow />
                <p>Ha Noi, Viet Nam</p>
              </div>
              <div className='flex items-center gap-3 mt-3'>
                <FaMobileAlt />
                <p>+11021997</p>
              </div>
              {/* social handles */}
              <div>
                <div className='flex items-center gap-3 mt-6'>
                  <a href='#'>
                    <FaInstagram className='text-3xl' />
                  </a>
                  <a href='#'>
                    <FaFacebook className='text-3xl' />
                  </a>
                  <a href='#'>
                    <FaLinkedin className='text-3xl' />
                  </a>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10'>
              <div>
                <div className='py-8 px-4'>
                  <h1 className='text-xl font-bold text-justify sm:text-left mb-3'>Liên hệ</h1>
                  <ul className='flex flex-col gap-3'>
                    {FooterLinks.map((link) => (
                      <li className='cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 dark:text-black-500'>
                        <Link to={link.link} onClick={() => window.scrollTo(0, 0)}>
                          <span>&#11162;</span>
                          <span>{link.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <div className='py-8 px-4'>
                  <h1 className='text-xl font-bold text-justify sm:text-left mb-3'>Dịch vụ</h1>
                  <ul className='flex flex-col gap-3'>
                    {FooterLinks.map((link) => (
                      <li className='cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 dark:text-black-500'>
                        <Link to={link.link} onClick={() => window.scrollTo(0, 0)}>
                          <span>&#11162;</span>
                          <span>{link.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <div className='py-8 px-4'>
                  <h1 className='text-xl font-bold text-justify sm:text-left mb-3'>Chính sách</h1>
                  <ul className='flex flex-col gap-3'>
                    {FooterLinks.map((link) => (
                      <li className='cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 dark:text-black-500'>
                        <Link to={link.link} onClick={() => window.scrollTo(0, 0)}>
                          <span>&#11162;</span>
                          <span>{link.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
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
