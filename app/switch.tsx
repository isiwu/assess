'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Switch = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('login')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div></div>
  )
}

export default Switch