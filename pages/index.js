import Layout from '@/components/Layout';
import { Alert } from 'flowbite-react';
import { useState } from 'react';

export default function Home() {
  const [ error,setError] = useState(true);
  return (
    <Layout title="Home" >
      <h1 className=''>Decode Technologies</h1>

      { error && <Alert color="failure" onDismiss={ ()=>setError(false) }>
        <span className="font-medium">Error!</span> This is an error alert example.
      </Alert>}
    </Layout>
  )
}
