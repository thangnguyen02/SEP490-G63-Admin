import Navbar from '~/components/landing_page/Navbar/Navbar'
import About from '~/assets/books/about.jpg'

const TermsOfServiceScreen = () => {
  return (
    <>
      <Navbar />
      <div className='p-4'>
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
        <h1 className='text-2xl font-bold mb-4'>Điều Khoản Sử Dụng Dịch Vụ</h1>

        <h2 className='text-xl font-semibold mt-6 mb-2'>1. Định Nghĩa</h2>
        <p className='text-base mb-2'>
          1.1. Dịch vụ – Phần mềm quản lý hợp đồng online được cung cấp qua nền tảng web và ứng dụng di động.
        </p>
        <p className='text-base mb-2'>
          1.2. Ứng dụng – Ứng dụng di động quản lý hợp đồng được tải từ các cửa hàng ứng dụng chính thức.
        </p>
        <p className='text-base mb-2'>
          1.3. Website – Trang thông tin điện tử có thể truy cập qua địa chỉ chính thức của dịch vụ.
        </p>
        <p className='text-base mb-2'>
          1.4. Nội dung – Tất cả các hình ảnh, bài viết, video và thông tin khác được đăng tải trên Website.
        </p>
        <p className='text-base mb-2'>
          1.5. Chủ tài khoản – Người đăng ký tài khoản hoặc quản trị viên có quyền truy cập vào dịch vụ.
        </p>
        <p className='text-base mb-2'>1.6. Tài khoản quản trị – Tài khoản chính được tạo ra khi đăng ký dịch vụ.</p>
        <p className='text-base mb-2'>
          1.7. Người dùng – Chủ tài khoản và các nhân viên được cấp quyền truy cập vào dịch vụ.
        </p>
        <p className='text-base mb-2'>1.8. Dịch vụ – Công ty cung cấp dịch vụ quản lý hợp đồng online.</p>
        <p className='text-base mb-2'>
          1.9. Bên thứ ba – Khách hàng, đối tác, nhà cung cấp hoặc các bên liên quan khác.
        </p>
        <p className='text-base mb-2'>1.10. Dữ liệu hợp đồng – Dữ liệu lưu trữ liên quan đến hợp đồng trên nền tảng.</p>
        <p className='text-base mb-2'>
          1.11. Khu vực chung – Các phần công khai của Website và ứng dụng, bao gồm trang chủ và các thông tin hỗ trợ.
        </p>
        <p className='text-base mb-2'>
          1.12. Khu vực riêng – Các trang nội bộ và thông tin quản lý được bảo vệ bằng mật khẩu.
        </p>

        <h2 className='text-xl font-semibold mt-6 mb-2'>2. Phạm Vi Áp Dụng</h2>
        <p className='text-base mb-2'>
          2.1. Điều khoản sử dụng này áp dụng cho tất cả các dịch vụ quản lý hợp đồng online được cung cấp qua Website
          và ứng dụng di động. Bằng việc sử dụng dịch vụ, bạn đồng ý tuân theo các điều khoản này.
        </p>
        <p className='text-base mb-2'>
          2.2. Chúng tôi có quyền thay đổi điều khoản sử dụng. Bạn có trách nhiệm kiểm tra các cập nhật thường xuyên.
          Việc tiếp tục sử dụng dịch vụ đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
        </p>

        <h2 className='text-xl font-semibold mt-6 mb-2'>3. Sử Dụng Hợp Pháp</h2>
        <p className='text-base mb-2'>
          3.1. Bạn phải sử dụng dịch vụ cho mục đích hợp pháp và tuân thủ pháp luật hiện hành. Bạn không được sử dụng
          dịch vụ để phát tán nội dung vi phạm pháp luật hoặc gây phiền hà cho người khác.
        </p>

        <h2 className='text-xl font-semibold mt-6 mb-2'>4. Quyền Sở Hữu Trí Tuệ</h2>
        <p className='text-base mb-2'>
          4.1. Tất cả nội dung trên Website thuộc quyền sở hữu trí tuệ của chúng tôi. Bạn có thể sử dụng nội dung cho
          mục đích cá nhân và không được sao chép hay chỉnh sửa mà không có sự đồng ý trước bằng văn bản.
        </p>

        <h2 className='text-xl font-semibold mt-6 mb-2'>5. Bảo Mật Thông Tin</h2>
        <p className='text-base mb-2'>
          5.1. Bạn có trách nhiệm bảo mật thông tin tài khoản và không để lộ mật khẩu cho người khác. Chúng tôi không
          chịu trách nhiệm về sự xâm nhập trái phép do sự bất cẩn của bạn.
        </p>

        <h2 className='text-xl font-semibold mt-6 mb-2'>6. Xử Lý Sự Cố</h2>
        <p className='text-base mb-2'>
          6.1. Bạn cần thông báo ngay cho chúng tôi khi phát hiện sự cố và phối hợp để khắc phục. Chúng tôi không chịu
          trách nhiệm về thiệt hại phát sinh từ sự chậm trễ thông báo hoặc các yếu tố bất khả kháng.
        </p>

        <h2 className='text-xl font-semibold mt-6 mb-2'>7. Giới Hạn Trách Nhiệm</h2>
        <p className='text-base mb-2'>
          7.1. Chúng tôi không chịu trách nhiệm về hậu quả của việc truy cập trái phép vào hệ thống hoặc các thiệt hại
          liên quan đến việc sử dụng dịch vụ.
        </p>

        <h2 className='text-xl font-semibold mt-6 mb-2'>8. Đảm Bảo Cung Cấp Dịch Vụ</h2>
        <p className='text-base mb-2'>
          8.1. Chúng tôi cam kết nỗ lực cung cấp dịch vụ tốt nhất, tuy nhiên không đảm bảo rằng dịch vụ sẽ luôn sẵn sàng
          mà không có gián đoạn.
        </p>

        <h2 className='text-xl font-semibold mt-6 mb-2'>9. Tài Liệu Hướng Dẫn</h2>
        <p className='text-base mb-2'>
          9.1. Tài liệu hướng dẫn sử dụng có thể được cung cấp qua email hoặc trên Website. Chúng tôi không đảm bảo cung
          cấp tài liệu in ấn.
        </p>
      </div>
    </>
  )
}

export default TermsOfServiceScreen
