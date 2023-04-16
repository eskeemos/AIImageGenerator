import React from 'react'
import { IoMdCodeDownload } from 'react-icons/io'
import { downloadImage } from '../utils'

type Props = {
  _id: string,
  name: string,
  prompt: string,
  photo: string
}

const Card = ({ _id, name, prompt, photo }: Props) => {
  return (
    <div className='rounded-xl group relative shadow-lg hover:shadow-2xl'>
      <img src={photo} alt={prompt} className='w-full h-auto objecy-cover rounded-xl' />
      <div className="group-hover:opacity-100 transition-opacity flex flex-col max-h-[95%] opacity-0 absolute bottom-0 left-0 right-0 m-2 p-4 rounded-md bg-violet-500">
        <p className='text-white text-md overflow-y-auto'>{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="uppercase w-7 h-7 rounded-full object-cover bg-white flex justify-center items-center font-bold">
              {name[0]}
            </div>
            <p className='text-white text-sm'>{name}</p>
          </div>
          <button type='button' onClick={() => downloadImage(_id, photo)}>
            <IoMdCodeDownload className='text-white text-2xl mr-2' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card