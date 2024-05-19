import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ComboboxMail from '~/components/Admin/SendMail/ComboboxMail'

const SendMail = () => {
  return (
    <>
      <div className='place-content-center bg-slate-200 p-12 rounded m-2'>
        <div className='bg-slate-300 rounded p-2 text-lg'>
          <span>Thư mới</span>
        </div>
        <div className='p-2 border-b-2 border-slate-500 flex'>
          <span className='w-16'>Đến</span>
          {/* <input type='text' className='w-full border-none rounded'></input> */}
          <ComboboxMail />
        </div>
        <div className='p-2 border-b-2 border-slate-500 flex'>
          <span className='w-16'>CC</span>
          <ComboboxMail />
          {/* <input type='text' className='w-full border-none rounded'></input> */}
        </div>
        <div className='p-2 border-b-2 border-slate-500 flex'>
          <span className='w-16'>Tiêu đề</span>
          <input type='text' className='w-full border-none rounded'></input>
        </div>
        <h2>Nội dung</h2>
        <CKEditor
          editor={ClassicEditor}
          data='<p>Go Youn-jung (Tiếng Hàn: 고윤정; sinh ngày 22 tháng 4 năm 1996) là nữ diễn viên và người mẫu người Hàn Quốc.[2] Cô xuất hiện lần đầu trong bộ phim truyền hình Chàng trai ngoại cảm (2019) và đã được công nhận với vai phụ trong phim Netflix Sweet Home: Thế giới ma quái (2020). Cô còn được biết đến qua các bộ phim truyền hình Trường luật (2021), Hoàn hồn (2022–2023) và phim gốc Disney+ Moving (2023) cũng như phim Săn lùng (2022).[3][4][5][6][7][8]</p>'
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor)
          }}
          onChange={(event) => {
            console.log(event)
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor)
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor)
          }}
        />
        <button className='p-2 rounded-full bg-teal-500 text-white mt-4 text-center flex justify-center mx-auto'>
          Upload file
        </button>
        {/* <CKEditor
        editor={ClassicEditor}
        // config={{
        //   plugins: [Paragraph, Bold, Italic, Essentials],
        //   toolbar: ['bold', 'italic']
        // }}
        data='<p>Hello from the second editor working with the context!</p>'
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor2 is ready to use!', editor)
        }}
      /> */}
      </div>
      <button className='py-2 px-4 rounded bg-sky-800 text-white mt-4 text-center flex justify-center mx-auto'>
        Gửi
      </button>
    </>
  )
}

export default SendMail
