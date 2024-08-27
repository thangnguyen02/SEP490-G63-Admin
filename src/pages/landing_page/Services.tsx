import Img1 from '~/assets/books/1.jpg'
import Img2 from '~/assets/books/2.png'
import Img3 from '~/assets/books/3.jpg'
import { FaStar } from 'react-icons/fa'

const ServicesData = [
  {
    id: 1,
    img: Img1,
    title: 'Tạo hợp đồng',
    description1: '☑️Thiết kế thông tin hợp đồng(tên, giá...)',
    step: 'Bước 1',
    description2: '☑️Thiết kế thông tin các bên tham gia',
    description3: '☑️Trình duyệt lên quản lý'
  },
  {
    id: 2,
    img: Img2,
    title: 'Gửi xem xét',
    description1: '☑️Gửi email thông báo đến người nhận',
    step: 'Bước 2',
    description2: '☑️Duyệt trước nội dung của hợp đồng',
    description3: '☑️Gửi thông báo đến giám đốc'
  },
  {
    id: 3,
    img: Img3,
    title: 'Ký hợp đồng',
    description1: '☑️Nhận email thông báo của hợp đồng',
    step: 'Bước 3',
    description2: '☑️Thực hiện ký số (chữ ký số, ký hình vẽ...)',
    description3: '☑️Xác thực thực thể'
  }
  // {
  //   id: 4,
  //   img: Img3,
  //   title: 'Lưu trữ, quản lý',
  //   description1: '☑️Gửi thông báo hoàn thành giao kết và thông tin hợp đồng',
  //   description2: 'Thống kê, báo cáo',
  //   description3: '☑️Lưu trữ hợp đồng'
  // }
]

const Services = () => {
  return (
    <>
      <span id='services'></span>
      <div className='py-10'>
        <div className='container m-auto'>
          <div className='text-center mb-20 max-w-[600px] mx-auto'>
            <span className='font-bold text-teal-500 text-2xl'>Tdocman</span>
            <h1 className='text-3xl font-bold'>Giải pháp kinh doanh toàn diện</h1>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center'>
            {ServicesData.map((service) => (
              <div
                data-aos='zoom-in'
                className='rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-black relative shadow-xl duration-high group  md:w-[250px] lg:w-[300px] xl:w-[400px]'
              >
                <div className='h-[160px]'>
                  <img
                    src={service.img}
                    alt=''
                    className='w-[200px] block mx-auto transform -translate-y-14
                  group-hover:scale-105  duration-300 shadow-md'
                  />
                </div>
                <div className='p-4 text-center'>
                  <div className='w-full flex items-center justify-center gap-1'>
                    <FaStar className='text-yellow-500' />
                    <FaStar className='text-yellow-500' />
                    <FaStar className='text-yellow-500' />
                    <FaStar className='text-yellow-500' />
                  </div>
                  <h1 className='text-xl font-bold'>{service.title}</h1>
                  <div className='text-start'>
                    <p className='text-gray-500 group-hover:text-black duration-high text-sm line-clamp-6'>
                      {service.description1}
                    </p>
                    <p className='text-gray-500 group-hover:text-black duration-high text-sm line-clamp-6'>
                      {service.description2}
                    </p>
                    <p className='text-gray-500 group-hover:text-black duration-high text-sm line-clamp-6'>
                      {service.description3}
                    </p>
                  </div>
                  <p
                    className='bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary'
                    // onClick={handleOrderPopup}
                  >
                    {service.step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Services
