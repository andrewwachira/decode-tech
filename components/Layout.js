/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Dropdown ,DropdownItem} from 'flowbite-react';
import { signOut } from 'next-auth/react';

function Layout({title,children}) {
    const {data,status} = useSession();
    const innerWidth = window.innerWidth
    return (
        <>
            <Head>
                <title>{title ? `${title} | DecodeTech` : "shop | Decode Tech"} </title>
                <meta name='description' content='Kombucha Kenya Online Shop'/>
                <link rel="icon" type="image/x-icon" href="/images/logo.png"></link>
            </Head>
            <div className='flex min-h-screen flex-col justify-between'>
                <header className='mb-[110px]'>
                    <nav className='navbar bg-blue-200'>
                        <div className="flex justify-between items-center m-5">
                            <Link className='px-2 flex flex-col items-center' href="/checkout/cart">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <span className='p-1 hover:underline'>Cart</span>
                            </Link>
                            <Link href="/" className='flex items-between justify-center' passHref>
                                { innerWidth > 400 ? 
                                    <h1 className='text-2xl font'>DECODE Techlonolgies</h1>
                                    : 
                                    <Image src="/images/logos and icons/decode-logo.png"  alt='decode logo' width={80} height={80}/> 
                                }
                            </Link>
                            <div className=' w-fit mr-3 flex flex-col items-center'>
                                {
                                    data?.user?.image ?
                                    <img src={`${data?.user?.image}`} alt="User image" width={50} height={50} className='rounded-full' />
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                }
                                {
                                    data?.user?.name ? 
                                    <div>
                                        <Dropdown  renderTrigger={() => (
                                        <span>{data?.user?.name}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1 inline">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </span>)}
                                        >
                                            <DropdownItem className='hover:text-gray-800 hover:bg-gray-200'><Link href="/accounts/profile" className='hover:text-'>Profile</Link></DropdownItem>
                                            <DropdownItem className='hover:text-gray-800 hover:bg-gray-200'><Link href="/accounts/order-history">Order history</Link></DropdownItem>
                                            {data.user.isadmin && <Dropdown.Item className='hover:text-gray-800 hover:bg-gray-200'><Link href="/admin/dashboard">Dashboard</Link></Dropdown.Item>}
                                            <Dropdown.Divider />
                                            <DropdownItem className='hover:text-gray-800 hover:bg-gray-200' onClick={()=>signOut({callbackUrl: 'http://localhost:3000'})}>Logout</DropdownItem>
                                        </Dropdown>
                                    </div> : <Link className='p-1 hover:underline' href="/accounts/login">Login</Link>
                                }
                            </div>
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
