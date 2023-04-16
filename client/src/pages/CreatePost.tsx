import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import { MdBrokenImage } from 'react-icons/md';

type Props = {}

const CreatePost: React.FC<Props> = ({ }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch("https://eskeemos.onrender.com/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({ ...form })
        })
        await response.json();
        navigate("/")
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }

  const handleSupriseMe = () => {
    const randomPromt = getRandomPrompt(form.prompt);
    setForm({
      ...form, prompt: randomPromt
    })
  }

  const generateImg = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://eskeemos.onrender.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  return (
    <section className='max-w-[500px] mx-auto'>
      <div className='text-center'>
        <h1 className='font-bold text-3xl'>Create</h1>
        <p className='mt-2 text-md max-w-[600px]'>Create imaginative images generated by DALL-E AI</p>
      </div>
      <form action="" className='mt-5 max-w-3xl' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
            name="name" />
          <FormField
            labelName="Prompt"
            type="text"
            placeholder="A Man falling in Love with his Computer, digital art"
            value={form.prompt}
            handleChange={handleChange}
            isSupriseMe
            handleSupriseMe={handleSupriseMe}
            name="prompt" />
          <div className="flex justify-center">
            <div className=" relative bg-slate-200 border border-violet-500 rounded-lg text-sm w-64 p-3 h-64 flex justify-center items-center">
              {form.photo ? (<img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />) :
                (<MdBrokenImage className='text-[100px] opacity-40 mr-2' />)}
              {generatingImg && (
                <div className="absolute inset-0 flex z-0 justify-center items-center rounded-md bg-[#00000080]">
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button type='button' className='font-semibold text-xs lg:text-lg bg-violet-500 py-4 px-2 rounded-md w-full' onClick={generateImg}>
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className="mt-2 flex flex-col items-center text-xs lg:text-lg">
          <p className="mt-2 text-center max-w-[375px]">Once you created the image you want, you can share it with others in the community</p>
          <button type='submit' className="font-semibold bg-violet-500 py-4 px-2 rounded-md w-full mt-4">{loading ? 'Sharing...' : 'Share It'}</button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost