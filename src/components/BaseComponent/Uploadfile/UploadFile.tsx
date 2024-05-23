import { useRef, useState } from 'react'
import PreviewFile from './PreviewFile'

const UploadFile = () => {
  const inputFileRef = useRef<any>(null)
  const [files, setFiles] = useState<any>([])
  const handUploadFile = (event: any) => {
    const files = event.target.files
    setFiles(files)
  }

  return (
    <>
      <input
        type='file'
        ref={inputFileRef}
        accept='.png, .jpg, .jpeg'
        onChange={handUploadFile}
        multiple
        className='hidden'
      />
      <button onClick={() => inputFileRef.current?.click()}>Upload</button>

      <PreviewFile files={files} />
    </>
  )
}
export default UploadFile
