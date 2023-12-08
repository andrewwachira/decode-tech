/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

function Layout({title,children}) {
   
    return (
        <>
            <Head>
                <title>{title ? `${title} | DecodeTech` : "shop | Decode Tech"} </title>
                <meta name='description' content='Kombucha Kenya Online Shop'/>
                <link rel="icon" type="image/x-icon" href="/images/logo.png"></link>
            </Head>
            <div className='flex min-h-screen flex-col justify-between'>
                <header>
                    <nav className='navbar bg-blue-200'>
                        <div className="flex justify-between items-center m-5">
                            <Link  className='m-3 p-2 w-16 nav-underline' href="/checkout-process/cart">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </Link>
                            <Link href="/" className='flex items-center justify-center m-5' passHref>
                                <h1 className='mx-3'>Decode Techlonolgies</h1>
                                <Image src="/images/logos and icons/decode-DarkBg.png"  alt='decode logo' width={50} height={50}/>
                            </Link>
                            <Link href="/account">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </Link>
                        </div>
                    </nav>
                </header>
                

                <main className="container m-auto mt-4 px-4">
                    <div>
                        {children}
                    </div>
                </main>
            </div>
            {/* <Footer></Footer> */}
        </>
    )
    
}

export default Layout;
