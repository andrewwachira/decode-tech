import "../styles/globals.css"
import { SessionProvider, useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { EdgeStoreProvider } from '../utils/edgestore';
import { Bars } from  'react-loader-spinner';
import { Provider } from "react-redux";
import { wrapper } from "../redux/store";

export default function App({ Component, pageProps:{session, ...pageProps} }) {
  const {store} = wrapper.useWrappedStore(pageProps);
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
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
      </Provider>
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
