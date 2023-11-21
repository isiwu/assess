'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';

const Post = () => {
  const email = typeof window !== 'undefined' && localStorage.getItem('email') as string;
  const [posts, setPosts] = useState([]);
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (
      async () => {
        try {
          setLoading(true)
          const {data} = await axios.get(`https://assignment-api-spxd.onrender.com/api/posts/${email}`);
          setPosts(data.data);
          setLoading(false)
        } catch (error) {
          setLoading(false);
        }
      }
    )()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='h-screen'>
      <div className='h-full'>
        {!loading?<div className='space-y-2'>
          <div className='text-right'><span className='mr-2 cursor-pointer text-purple-600 hover:text-purple-950' onClick={() => router.push('create')}>Create Post</span></div>
          {posts.length > 0? <>
            <div className='text-center text-lg font-semibold'>Posts</div>
            {posts.map((post: any, index) => <div key={++index} className='border pl-2'><span className='mr-3'>{++index}.</span> {post.post}</div>)}
          </>:<div className='text-center text-red-200'>No posts yet!</div>}
        </div>:<div className='flex justify-center items-center h-full'>
          <div className='w-8 h-8 rounded-full border border-t-black border-r-black animate-spin'></div>
        </div>}
      </div>
    </div>
  )
}

export default Post