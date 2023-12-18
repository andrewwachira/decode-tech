import "../styles/globals.css"
import { SessionProvider, useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { EdgeStoreProvider } from '../utils/edgestore';
import { Bars } from  'react-loader-spinner'

export default function App({ Component, pageProps:{session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      {
        Component.auth ? (
          <EdgeStoreProvider>
            <Auth adminOnly = {Component.auth.adminOnly}>
                <Component {...pageProps} />
            </Auth>
          </EdgeStoreProvider>
        ): 
        ( <Component {...pageProps} />)
      }
    </SessionProvider>
  )
}

function Auth({children,adminOnly}){
  const router = useRouter();
  const {status,data:session} = useSession({
    required:true,
    onUnauthenticated(){
      router.push("/accounts/unauthorized?message=Login Required")
    }
  });
  if (status==="loading"){
    return(
      <div className='flex w-full h-screen items-center justify-center'>
        <div className=' flex items-center'>
          <Bars width={50} height={50} color="#3b82f6" />
          <span className='mx-3'>Loading ...</span>
        </div>
      </div>
    ) 
  }
  if(adminOnly && !session.user.isadmin){
      router.push("/accounts/unauthorized?message=This page is for System admins only. Please Login with admin account")
  }
  return children;
}