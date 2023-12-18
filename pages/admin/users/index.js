import {useEffect,useState} from 'react'
import Layout from '../../../components/Layout'
import { Button,Table,Alert } from 'flowbite-react';
import { Bars } from  'react-loader-spinner'
import { useRouter } from 'next/router';
import axios from 'axios';
import {getError} from "../../../utils/error";

function AdminUsers() {
  const router = useRouter();
  const [usersLoading,setUsersLoading] = useState(false);
  const [users,setUsers] = useState([]);
  const [error,setError] = useState(null);

  useEffect(()=>{
    async function getUsers(){
      setUsersLoading(true);
      const {data} = await axios.get("/api/admin/users");
      setUsersLoading(false);
      setUsers(data);
    }
    getUsers();
  },[]);

  async function makeAdmin(user){
    try {
      const {data} = await axios.post("/api/admin/users/adminify",user);
      if(data.message == "success"){
        const {data: data2} = await axios.get("/api/admin/users");
        setUsers(data2);
      }
     
    } catch (error) {
      setError(getError(error));
      window.scrollTo({
        top: 0,
        left: 100,
        behavior: "smooth",
      })
    }
  }

  async function demote(user){
    try {
      const {data} = await axios.patch("/api/admin/users/adminify",user);
      if(data.message == "success"){
        const {data: data2} = await axios.get("/api/admin/users",user);
        setUsers(data2);
      }
     
    } catch (error) {
      setError(getError(error));
      window.scrollTo({
        top: 0,
        left: 100,
        behavior: "smooth",
      })
    }
  }

  return (
    <Layout>
         <div className='min-w-lg '>
            {error && <Alert color="failure" className="my-7 px-5  w-fit mx-auto" onDismiss={()=>setError(null)}>{error}</Alert>}
              <h1 className='text-center text-3xl m-7'>Users</h1>
              <div className='flex justify-center'>
                <Button.Group className=' w-fit'>

                        <Button color='light' onClick={()=>router.push("/admin/dashboard")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mx-2 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                            </svg>
                            Dashboard
                        </Button>
                        <Button color='light' onClick={()=>router.push("/admin/products")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mx-2 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                            </svg>
                            Products
                        </Button>
                        <Button color='light' className="bg-blue-100" onClick={()=>router.push("/admin/users")}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mx-2 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>
                                Users
                        </Button>
                        <Button color='light' onClick={()=>router.push("/admin/orders")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mx-2 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            Orders
                        </Button>
                </Button.Group> 
            </div>
          {
            usersLoading ?
            <div className='flex mt-10 items-center justify-center'>
              <div className=' flex items-center'><Bars width={50} height={50} color="#3b82f6" /><span className='mx-3'>Loading users...</span></div>
            </div>
            :
            <Table className='mt-5'>
                <Table.Head>
                    <Table.HeadCell>Id</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Phone</Table.HeadCell>
                    <Table.HeadCell><span className="sr-only">Make Admin</span>Adminify</Table.HeadCell>
                    <Table.HeadCell><span className="sr-only">Delete</span>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {
                    users.map(user => (
                      <Table.Row key={user.id}>
                          <Table.Cell>{user.id}</Table.Cell>
                          <Table.Cell>{user.name}</Table.Cell>
                          <Table.Cell>{user.email}</Table.Cell>
                          <Table.Cell>+{user.phone}</Table.Cell>
                          {user.isadmin ?
                          <Table.Cell><Button onClick={()=> demote(user)} color='light'>Demote</Button></Table.Cell>
                           :
                          <Table.Cell><Button color='light'  onClick={()=>makeAdmin(user)}>Make admin</Button></Table.Cell>
                          }
                          {
                          user.isadmin && user.email === "decode3.it@gmail.com" ? 
                          <Table.Cell><span  className="font-medium text-red-600 dark:text-cyan-500"> Can&apos;t delete Root admin</span></Table.Cell>
                          :
                          <Table.Cell><Button color="light">Delete</Button></Table.Cell>
                          }
                          
                      </Table.Row>
                    ))
                  }
                </Table.Body>
            </Table>
          }
         </div>
    </Layout>
  )
}
AdminUsers.auth = {adminOnly:true}
export default AdminUsers;