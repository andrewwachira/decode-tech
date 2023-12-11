import React from 'react'
import Layout from '@/components/Layout'
import { Alert,Button } from 'flowbite-react'
import { useRouter } from 'next/router'
import Link from 'next/link'

function Unauthorized() {
    const router = useRouter()
    const {message} = router.query
  return (
    <Layout>
        <h1 className='text-center text-3xl mt-5'>Access Denied!</h1>
        <Alert color="failure" className='mt-5'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mx-2 h-6 inline">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            {message && <div className='m-4 text-red-500 inline'>{message}</div>}
        </Alert>
        <p className='m-4'>If you happen to see this page and you are already logged in correctly, navigate back to previous page.</p>
            <Link href="/accounts/login">
                <Button color='light' className='my-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mx-2 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Go to Login
                </Button>
            </Link>

            <Button color='light' className='my-3' onClick={()=>router.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mx-2 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Go to previous page
            </Button>
    </Layout>
  )
}

export default Unauthorized;