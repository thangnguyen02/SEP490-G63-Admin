import React from 'react'
import Hero from '~/components/landing_page/Hero/Hero'
import Welcome from '~/assets/places/Kinh-doanh-la-gi-cho-vi-du.jpg'
import Places from '~/components/landing_page/Places/Places'
import Banner from '~/components/landing_page/Banner/Banner'
import Contact from '~/components/landing_page/BannerPic/BannerPic'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from '../../components/landing_page/Navbar/Navbar'
import Footer from '../../components/landing_page/Footer/Footer'
import Services from './Services'
import Banner1 from '~/components/landing_page/Banner/Banner1'

const Home = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: 'ease-in-sine',
      delay: 100
    })
    AOS.refresh()
  }, [])

  return (
    <div className='overflow-x-hidden'>
      <Navbar />
      <div>
        <div className='h-[700px] relative'>
          <img src={Welcome} className='absolute right-0 top-0 h-[700px] w-full object-cover z-[-1]'></img>

          <Hero />
        </div>
        <Places />
        <Services />
        <Contact />
        <Banner />
        <Banner1 />
      </div>
      <Footer />
    </div>
  )
}

export default Home
