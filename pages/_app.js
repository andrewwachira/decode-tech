import '@/styles/globals.css'
import { SessionProvider, useSession } from "next-auth/react"
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps:{session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      {
        Component.auth ? (
          <Auth adminOnly = {Component.auth.adminOnly} stockistOnly = {Component.auth.stockistOnly}>
            <Component {...pageProps} />
          </Auth>
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
      <div className="loader">
        <div className="lds-circle">
          <div>
              <Image src={`/images/logo.png`} alt="logo" width={250} height={250}></Image>
          </div>
        </div>
        <p>Loading...</p>
      </div>
    ) 
  }
  if(adminOnly && !session.user.isadmin){
      router.push("/accounts/unauthorized?message=This page is for System admins only. Please Login with admin account")
  }
  return children;
}