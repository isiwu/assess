import './globals.css'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Logo from './load/logo'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
  login,
  log,
}: {
  children: React.ReactNode,
  login: React.ReactNode,
  log: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className=''>
        <Suspense fallback={<Logo />}>
          {login}
          {log}
          {children}
          <ToastContainer />
        </Suspense>
      </body>
    </html>
  )
}
