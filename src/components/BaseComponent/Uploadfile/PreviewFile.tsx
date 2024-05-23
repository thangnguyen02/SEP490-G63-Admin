import { useCallback, useEffect, useRef, useState } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import update from 'immutability-helper'
import ItemImage from './ItemImage'
interface Iprops {
  files: any[]
}
export interface Item {
  id: number
  file: any
  base64: string
}

const PreviewFile = ({ files }: Iprops) => {
  const [listUrl, setListUrl] = useState<any>()
  const getBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (err) => reject(err)
    })

  const submitImages = async () => {
    const images = await Promise.all([...files].map((imageInput) => (imageInput ? getBase64(imageInput) : null)))
    setListUrl(() => [...(files || [])].map((file, index) => ({ id: index, file: file, base64: images[index] })))
  }
  useEffect(() => {
    submitImages()
  }, [files])
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setListUrl((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item]
        ]
      })
    )
  }, [])
  const removeCard = useCallback((index: number) => {
    setListUrl((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [[index, 1]]
      })
    )
  }, [])

  const renderCard = useCallback((image: { id: number; file: any; base64: string }, index: number) => {
    return (
      <ItemImage
        key={image.id}
        index={index}
        id={image.id}
        file={image.file}
        base64={image.base64}
        moveCard={moveCard}
        removeCard={removeCard}
      />
    )
  }, [])
  return (
    <div className='flex gap-4 px-4'>
      {/* <button
        onClick={() => {
          console.log(listUrl)
        }}
      >
        Show file
      </button> */}
      {listUrl?.map((image: Item, i: number) => renderCard(image, i))}
    </div>
  )
}
export default PreviewFile
