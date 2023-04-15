import React from 'react'

type Props = {
  labelName: string;
  type: string;
  placeholder: string;
  value: string;
  handleChange: (e: any) => void;
  name: string;
  handleSupriseMe?: (e: any) => void;
  isSupriseMe?: boolean
}

const FormField: React.FC<Props> = ({
  labelName, type, placeholder, value, handleChange, name, handleSupriseMe, isSupriseMe
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name} className='block text-sm font-medium'>
          {labelName}
        </label>
        {isSupriseMe && (
          <button onClick={handleSupriseMe} className='font-semibold text-xs bg-violet-500 py-1 px-2 rounded-md'>Suprise me</button>
        )}
      </div>
      <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={handleChange} required 
        className='bg-slate-200 border border-violet-500 rounded-md text-sm focus:ring-violet-700 focus:ring-1 outline-none p-2 w-full md:w-96' />
    </div>
  )
}

export default FormField