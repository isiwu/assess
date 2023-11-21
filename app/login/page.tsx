'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Loading from '../load/loading';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false);
  const handleChange = (input: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [input]: evt.target.value,
    })
  };
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    setLoading(true);
    axios.post('https://assignment-api-spxd.onrender.com/api/login', formData)
    .then(() => {
      setLoading(false);
      //console.log(data);
      localStorage.setItem('email', formData.username);
      router.push('post/create');
    })
    .catch(err => {
      setLoading(false);
      toast.error('login failed, try again.', {position: toast.POSITION.TOP_RIGHT})
      console.log(err);
    });
  }
  return (
    <main className="h-screen bg-gray-300">
      <div className='flex justify-center items-center h-full'>
        <div>
          <div className='backdrop-blur-md bg-white px-8 pb-8'>
            <div className='text-center text-2xl uppercase font-bold underline mt-2 mb-4'>login</div>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className='block'>Email:</label>
                <input type="email" id="email" required className='md:w-96 p-2 rounded-lg border-2 border-black/20 outline-2 focus:outline-purple-500' value={formData.username} onChange={handleChange('username')} />
              </div>
              <div>
                <label htmlFor="pas" className='block'>Password:</label>
                <input type="password" id="pas" required className='p-2 md:w-96 rounded-lg border-2 border-black/20 outline-2 focus:outline-purple-500' value={formData.password} onChange={handleChange('password')} />
              </div>
              <div className={!loading?'bg-purple-700 cursor-pointer rounded-md flex justify-center items-center':'bg-purple-700 cursor-not-allowed rounded-md flex justify-center items-center'}>
                {!loading?<button type="submit" className='text-center w-full py-2 text-white text-lg font-bold'>Login</button>:<Loading />}
              </div>
            </form>
          </div>
          <div className='mt-2 text-center'>Don&apos;t have an account yet, <span className='cursor-pointer text-purple-700 hover:text-purple-900' onClick={() => router.push('signup')}>Sign Up</span></div>
        </div>
      </div>
    </main>
  )
}

export default Login