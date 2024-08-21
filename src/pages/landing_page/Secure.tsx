import Navbar from '~/components/landing_page/Navbar/Navbar'
import About from '~/assets/books/about.jpg'

const PrivacyPolicyScreen = () => {
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

        {/* Privacy Policy Content */}
        <div className='bg-white rounded-lg p-6 shadow-lg'>
          <h1 className='text-3xl font-bold mb-4'>Chính Sách Bảo Mật</h1>

          <h2 className='text-2xl font-semibold mb-2'>1.1. Thông tin và dữ liệu nào sẽ được thu thập</h2>
          <p className='text-lg mb-4'>Chúng tôi sẽ yêu cầu bạn cung cấp các thông tin cá nhân cơ bản, bao gồm:</p>
          <ul className='list-disc list-inside mb-4'>
            <li className='text-lg'>Tên đăng nhập, mật khẩu đăng nhập.</li>
            <li className='text-lg'>Email, số điện thoại, địa chỉ.</li>
          </ul>
          <p className='text-lg mb-4'>
            Các thông tin này sẽ được thu thập khi bạn đăng ký sử dụng dịch vụ của chúng tôi và có thể bao gồm các thông
            tin khác khi bạn tương tác với nội dung trên trang web và ứng dụng của chúng tôi.
          </p>
          <p className='text-lg mb-4'>
            Chúng tôi cam kết chỉ thu thập thông tin khi cần thiết và cho các mục đích hợp pháp nhằm phục vụ lợi ích của
            bạn trong quá trình sử dụng dịch vụ. Việc bạn truy cập và sử dụng dịch vụ đồng nghĩa với việc bạn đã hiểu và
            đồng ý với các quy định trong chính sách bảo mật của chúng tôi.
          </p>
          <p className='text-lg mb-4'>
            Bạn có trách nhiệm bảo mật thông tin tài khoản, mật khẩu, email và số điện thoại của mình. Chúng tôi không
            chịu trách nhiệm về bất kỳ mất mát dữ liệu nào do sự bất cẩn hoặc hành động của bạn.
          </p>
          <p className='text-lg mb-4'>
            Ngoài ra, bạn cũng có trách nhiệm thông báo kịp thời cho chúng tôi về bất kỳ hành vi sử dụng trái phép, lạm
            dụng, hoặc vi phạm bảo mật để chúng tôi có thể có các biện pháp xử lý thích hợp.
          </p>

          <h2 className='text-2xl font-semibold mb-2'>1.2. Dịch vụ, ứng dụng liên kết</h2>
          <p className='text-lg mb-4'>
            Để đảm bảo quyền lợi và trải nghiệm tốt nhất cho bạn, chúng tôi có thể yêu cầu quyền truy cập vào một số
            thông tin khi bạn sử dụng các dịch vụ hoặc ứng dụng liên kết với chúng tôi.
          </p>

          <h2 className='text-2xl font-semibold mb-2'>1.3. Phạm vi sử dụng thông tin</h2>
          <p className='text-lg mb-4'>Chúng tôi sử dụng thông tin bạn cung cấp để:</p>
          <ul className='list-disc list-inside mb-4'>
            <li className='text-lg'>Cung cấp các dịch vụ đến bạn.</li>
            <li className='text-lg'>Gửi thông báo về các hoạt động trao đổi thông tin giữa bạn và chúng tôi.</li>
            <li className='text-lg'>Ngăn ngừa các hoạt động phá hoại tài khoản của bạn hoặc các hành vi giả mạo.</li>
            <li className='text-lg'>Liên lạc và giải quyết các vấn đề trong những trường hợp đặc biệt.</li>
            <li className='text-lg'>Cung cấp thông tin cá nhân khi có yêu cầu từ cơ quan nhà nước có thẩm quyền.</li>
            <li className='text-lg'>Chia sẻ thông tin cần thiết cho bên đối tác nếu được sự đồng ý của bạn.</li>
          </ul>

          <h2 className='text-2xl font-semibold mb-2'>1.4. Thời gian lưu trữ thông tin</h2>
          <p className='text-lg mb-4'>
            Thông tin cá nhân của bạn sẽ được bảo mật hoàn toàn trên máy chủ của chúng tôi. Trong một số trường hợp,
            chúng tôi có thể khôi phục thông tin từ cơ sở dữ liệu của mình để giải quyết tranh chấp hoặc thực hiện yêu
            cầu pháp lý và kỹ thuật liên quan đến sự an toàn và hoạt động của dịch vụ.
          </p>

          <h2 className='text-2xl font-semibold mb-2'>
            1.5. Phương tiện và công cụ để khách hàng tiếp cận và chỉnh sửa dữ liệu
          </h2>
          <p className='text-lg mb-4'>
            Bạn có quyền kiểm tra, cập nhật, điều chỉnh thông tin cá nhân của mình bằng cách đăng nhập vào tài khoản
            hoặc yêu cầu chúng tôi thực hiện việc này. Bạn cũng có quyền gửi khiếu nại về việc lộ thông tin cá nhân cho
            bên thứ ba đến Ban quản trị của chúng tôi.
          </p>

          <h2 className='text-2xl font-semibold mb-2'>1.6. Cam kết bảo mật thông tin cá nhân</h2>
          <p className='text-lg mb-4'>
            Chúng tôi cam kết bảo mật thông tin cá nhân của bạn theo chính sách bảo vệ thông tin cá nhân và các quy định
            pháp luật hiện hành. Việc thu thập và sử dụng thông tin của bạn chỉ được thực hiện khi có sự đồng ý hợp pháp
            của bạn, trừ khi pháp luật có quy định khác. Chúng tôi cam kết không tiết lộ thông tin cá nhân của bạn cho
            bên thứ ba mà không có sự đồng ý của bạn, trừ những trường hợp pháp luật quy định khác.
          </p>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicyScreen
