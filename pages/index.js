import Layout from '@/components/Layout';
import { Carousel } from 'flowbite-react';
import { useState } from 'react';

export default function Home() {
  const [ error,setError] = useState(true);
  return (
    <Layout title="Home" >
      <div  className="h-56 sm:h-64 xl:h-80 2xl:h-96 my-7">
        <Carousel>
          <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            Christmas offer
          </div>
          <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            Shop and receive goods same day
          </div>
          <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            We do computer repairs
          </div>
        </Carousel>
      </div>
      
    </Layout>
  )
}
