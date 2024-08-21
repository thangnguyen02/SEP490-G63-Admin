import Navbar from '~/components/landing_page/Navbar/Navbar'
import About from '~/assets/books/about.jpg'

const AboutScreen = () => {
  return (
    <>
      <Navbar />
      <div className='flex flex-col p-4 bg-gray-100'>
        <div className='relative mb-8'>
          <img src={About} alt='Hero' className='w-full h-auto object-cover rounded-lg' />
          <div className='absolute inset-0 flex items-center justify-center  bg-slate-800 bg-opacity-40 md:mr-[20%]'>
            <div className=' text-white p-4 rounded-lg'>
              <h1 className='text-3xl md:text-7xl font-bold'>
                Giải pháp tiên phong
                <br />
                cho các mô hình
                <br />
                kinh doanh
              </h1>
            </div>
          </div>
        </div>
        {/* Thông tin dự án */}
        <section className='mb-8 bg-white rounded-lg p-6 shadow-lg'>
          <h1 className='text-3xl font-bold mb-4'>1 Thông tin dự án</h1>
          <ul className='list-disc list-inside'>
            <li className='text-lg mb-2'>
              <strong>Tên dự án:</strong> Hệ thống TDocMan
            </li>
            <li className='text-lg mb-2'>
              <strong>Tên tiếng Việt:</strong> Hệ thống quản lý hợp đồng TDocMan
            </li>
            <li className='text-lg mb-2'>
              <strong>Mã dự án:</strong> TDMS-G63
            </li>
            <li className='text-lg mb-2'>
              <strong>Tên nhóm:</strong> SEP490-G63
            </li>
            <li className='text-lg mb-2'>
              <strong>Loại phần mềm:</strong> Ứng dụng Web/App
            </li>
          </ul>
        </section>

        {/* Đội ngũ dự án */}
        <section className='mb-8 bg-white rounded-lg p-6 shadow-lg'>
          <h1 className='text-3xl font-bold mb-4'>2 Đội ngũ dự án</h1>
          <ul className='list-disc list-inside'>
            <li className='text-lg mb-2'>
              <strong>Nguyen Thanh Y:</strong> Giảng viên
            </li>
            <li className='text-lg mb-2'>
              <strong>Duong Doan Anh Tu:</strong> Trưởng nhóm
            </li>
            <li className='text-lg mb-2'>
              <strong>Ngo Tien Dat</strong> Thành viên
            </li>
            <li className='text-lg mb-2'>
              <strong>Nguyen Huu Thang</strong> Thành viên
            </li>
            <li className='text-lg mb-2'>
              <strong>Nguyen Hai nam</strong> Thành viên
            </li>
            <li className='text-lg mb-2'>
              <strong>Phan Viet Tu</strong> Thành viên
            </li>
          </ul>
        </section>

        {/* Nền tảng sản phẩm */}
        <section className='bg-white rounded-lg p-6 shadow-lg'>
          <h1 className='text-3xl font-bold mb-4'>3. Nền tảng sản phẩm</h1>
          <p className='text-lg mb-4'>
            Trước đây, tất cả các hợp đồng bao gồm hợp đồng lao động, hợp đồng bán hàng, hợp đồng ký kết, v.v. đều là
            bản sao giấy và được lưu trữ trong các kho lưu trữ tại các công ty. Điều này khá bất tiện theo nhiều cách.
          </p>
          <ul className='list-disc list-inside text-lg mb-4'>
            <li className='mb-2'>
              Thứ nhất, một lượng lớn tài liệu lưu trữ sẽ tiêu tốn không gian lưu trữ (ví dụ: kho).
            </li>
            <li className='mb-2'>
              Thứ hai, khi tìm một hợp đồng, nhân viên sẽ phải tìm từng tờ giấy và nếu không được sắp xếp và quản lý cẩn
              thận, sẽ dễ dẫn đến việc mất tài liệu.
            </li>
            <li className='mb-2'>
              Thứ ba, vì giấy là vật liệu phân hủy, theo thời gian, các hợp đồng giấy có thể bị hư hại như chữ bị mờ,
              rách, ... ảnh hưởng đến nội dung của hợp đồng.
            </li>
            <li>
              Ngoài ra, việc ký hợp đồng giấy sẽ rất bất tiện nếu khoảng cách giữa doanh nghiệp và nhân viên là rất xa.
            </li>
          </ul>
          <p className='text-lg'>
            Xuất phát từ xu hướng số hóa chung của xã hội và nhu cầu số hóa của Công ty TNHH DTC Media và Ứng dụng Công
            nghệ, nhóm chúng tôi được giao một phần của dự án mà công ty DTC đang triển khai số hóa tại doanh nghiệp của
            mình. Từ đó, chúng tôi bắt đầu xây dựng dự án này.
          </p>
          <p className='text-lg mb-4'>
            Chúng tôi nhận thấy những bất tiện trên. Bên cạnh đó, sự phát triển của xu hướng số hóa ngày càng gia tăng,
            chúng tôi quyết định phát triển Hệ thống TDocMan để giải quyết những vấn đề này. Với hệ thống này, người
            dùng có thể quản lý, lưu trữ và ký hợp đồng trực tuyến một cách dễ dàng và thuận tiện.
          </p>
        </section>
      </div>
    </>
  )
}

export default AboutScreen
