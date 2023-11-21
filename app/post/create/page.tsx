/* eslint-disable @next/next/no-img-element */
'use client'
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import Loading from '../../load/loading';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';

const CreatePost = () => {
  const router = useRouter();
  const email = typeof window !== 'undefined' && localStorage.getItem('email') as string;
  const [formData, setFormData] = useState({
    username: '',
    post: ''
  });
  const [file, setFile] = useState('');
  const [base64Str, setBase64Str] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (input: string) => (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [input]: evt.target.value,
    })
  };
  const onDrop = useCallback((files: File[]) => {
    setFile(URL.createObjectURL(files[0]))
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      const result = fileReader.result as string;
      const data = result.split(',')
      setBase64Str(data[1]);
    }
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    const data: {[index: string]: string} = {username: email as string, post: formData.post};

    if (base64Str) {
      data['base64Str'] = base64Str;
    } 

    setLoading(true);
    axios.post('https://assignment-api-spxd.onrender.com/api/createpost', data)
    .then(() => {
      setLoading(false);
      router.push(`${email}`);
    })
    .catch(err => {
      console.log(err.response.status)
      if (err.response.status === 413) toast.warn('Image content too large', {position: toast.POSITION.TOP_RIGHT})
      setLoading(false);
      //console.log(err);
    });
  }
  return (
    <main className="h-screen bg-gray-300">
      <div className='flex justify-center items-center h-full'>
        <div>
          <div className='backdrop-blur-md bg-white px-8 pb-8'>
            <div className='text-center text-2xl uppercase font-bold underline mt-2 mb-4'>Create Post</div>
            <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className='block'>Post:</label>
                <textarea rows={3} className='w-[100%] border-2 border-black/20 p-2 outline-2 focus:outline-purple-500 rounded-lg resize-none' value={formData.post} onChange={handleChange('post')} />
              </div>
              <div className='h-40 border-2 border-dashed rounded-md flex items-center justify-center px-2 cursor-pointer'>
                <div {...getRootProps()} className='outline-none'>
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <p>Drop the files here ...</p> :
                      <div>
                        <div className='flex justify-center items-center'>{file && <img src={file} alt="upload image" width={200} className='mb-2' />}</div>
                        <p>Drag and drop some file here, or click to select file</p>
                      </div>
                  }
                </div>
              </div>
              <div className={!loading?'bg-purple-700 cursor-pointer rounded-md flex justify-center items-center':'bg-purple-700 cursor-not-allowed rounded-md flex justify-center items-center'}>
                {!loading?<button type="submit" className='text-center w-full py-2 text-white text-lg font-bold'>Post</button>:<Loading />}
              </div>
            </form>
          </div>
          <div className='mt-2 text-right'><span className='cursor-pointer text-purple-700 hover:text-purple-900' onClick={email?() => router.push(`${email}`):() => {}}>See Posts</span></div>
        </div>
      </div>
    </main>
  )
}

export default CreatePost