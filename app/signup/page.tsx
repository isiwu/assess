'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Loading from '../load/loading';
import { toast } from 'react-toastify';

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [passwordMatch, setMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleChange = (input: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (input === 'confirmPassword') {
      if (formData.password !== evt.target.value) setMatch(false);
      else if (formData.password === evt.target.value) setMatch(true);
    }

    setFormData({
      ...formData,
      [input]: evt.target.value
    });
  }
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!passwordMatch) return;

    setLoading(true)
    axios.post('https://assignment-api-spxd.onrender.com/api/register', {username: formData.username, password: formData.password})
    .then(() => {
      //console.log(data)
      setLoading(false);
      router.push('login')
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
      toast.error('signup failed, try again.', {position: toast.POSITION.TOP_RIGHT})
    })
  }
  return (
    <main className="h-screen bg-gray-300">
      <div className='flex justify-center items-center h-full'>
        <div>
          <div className='backdrop-blur-md bg-white px-8 pb-8'>
            <div className='text-center text-2xl uppercase font-bold underline mt-2 mb-4'>signup</div>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className='block'>Email:</label>
                <input type="email" id="email" className='md:w-96 p-2 rounded-lg border-2 border-black/20 outline-2 focus:outline-purple-500' value={formData.username} onChange={handleChange('username')} />
              </div>
              <div>
                <label htmlFor="pas" className='block'>Password:</label>
                <input type="password" id="pas" className='p-2 md:w-96 rounded-lg border-2 border-black/20 outline-2 focus:outline-purple-500' value={formData.password} onChange={handleChange('password')} />
              </div>
              <div>
                <label htmlFor="pas" className='block'>Confirm Password:</label>
                <input type="password" id="pas" className='p-2 md:w-96 rounded-lg border-2 border-black/20 outline-2 focus:outline-purple-500' value={formData.confirmPassword} onChange={handleChange('confirmPassword')} />
                {!passwordMatch && <span className='block text-red-500'>Password did not match</span>}
              </div>
              <div className={!loading?'bg-purple-700 cursor-pointer rounded-md flex justify-center items-center':'bg-purple-700 cursor-not-allowed rounded-md flex justify-center items-center'}>
                {!loading?<button type="submit" className='text-center w-full py-2 text-white text-lg font-bold'>Submit</button>:<Loading />}
              </div>
            </form>
          </div>
          <div className='mt-2 text-center'>Already have account, <span className='cursor-pointer text-purple-700 hover:text-purple-900' onClick={() => router.push('/')}>Login</span></div>
        </div>
      </div>
    </main>
  )
}

export default Signup