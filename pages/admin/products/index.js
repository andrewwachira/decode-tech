import {useState,useEffect} from 'react'
import Layout from '../../../components/Layout'
import { Alert,Modal,Button,Table } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bars } from 'react-loader-spinner';
import { getError } from '../../../utils/error';
import {useDispatch,useSelector} from "react-redux";
import { product2Edit, fetchProducts } from '../../../redux/slices/productsSlice';

function AdminProducts() {
  const router = useRouter();
  const {products,loading:productsLoading,error} = useSelector(state =>  state.products);
  const [success,setSuccess] = useState(null);
  const [openModal,setOpenModal] = useState(false);
  const [product2Del,setProduct2Del] = useState(null);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(fetchProducts());
    }
  ,[dispatch]);

  const handleEdit = (product) => {
    dispatch(product2Edit(product));
    router.push("/admin/products/edit");
  }
  const confirmDelete = (product) => {
    setOpenModal(true);
    setProduct2Del(product);
  }
  const handleDelete = async(product) => {
    setOpenModal(false);
    try {
      const {data} = await axios.delete(`/api/admin/products/delete?id=${product.product_id}`);
      if(data.message === "success");{
        setSuccess("Product Deleted Successfully");
        window.scrollTo({
          top:0,
          left:100,
          behavior:"smooth"
        } );
        setTimeout(()=>setSuccess(null),3000);
      }
      
      
    } catch (error) {
      setError(getError(error));
      window.scrollTo({
        top:0,
        left:100,
        behavior:"smooth"
      });
    }
  }
  return (
    <Layout>
          <div className='min-w-lg '>
            {success && <Alert color="success" className='w-fit m-auto px-4' onDismiss={()=>setSuccess(null)}>{success}</Alert>}
            {error && <Alert color="failure"  className='w-fit m-auto px-4' onDismiss={()=>setError(null)}></Alert>}
            <h1 className='text-center text-3xl m-7'>Products</h1>
            <div className='flex justify-center overflow-x-auto'>
                <Button.Group className='w-fit'>
                        <Button color='light' onClick={()=>router.push("/admin/dashboard")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mr-1 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                            </svg>
                            Dashboard
                        </Button>
                        <Button color='light'  className="bg-blue-100" onClick={()=>router.push("/admin/products")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mr-1 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                            </svg>
                            Products
                        </Button>
                        <Button color='light' onClick={()=>router.push("/admin/users")}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mr-1 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>
                                Users
                        </Button>
                        <Button color='light' onClick={()=>router.push("/admin/orders")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mr-1 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            Orders
                        </Button>
                </Button.Group> 
            </div>
            <div className='my-7'>
              <Link href="/admin/products/create">
                <Button color="light" className='w-fit my-7'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mr-1 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                Create New Product
                </Button>
              </Link>
              <h1 className='text-center text-xl m-7'>All Products</h1>
              { 
                productsLoading ?
                <div className='flex mt-10 items-center justify-center'>
                  <div className=' flex items-center'><Bars width={50} height={50} color="#3b82f6" /><span className='mx-3'>Loading products...</span></div>
                </div>
                :
                <div className="overflow-x-auto">
                  <Table>
                    <Table.Head>
                      <Table.HeadCell>Product name</Table.HeadCell>
                      <Table.HeadCell>Brand</Table.HeadCell>
                      <Table.HeadCell>Category</Table.HeadCell>
                      <Table.HeadCell>Price</Table.HeadCell>
                      <Table.HeadCell>Count in Stock</Table.HeadCell>
                      <Table.HeadCell><span className="sr-only">Edit</span>Action 1</Table.HeadCell>
                      <Table.HeadCell><span className="sr-only">Delete</span>Action 2</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      { products && products?.map((product) => (
                        <Table.Row key={product.product_id} className="bg-white border-b">
                          <Table.Cell>{product.name} </Table.Cell>
                          <Table.Cell>{product.brand}</Table.Cell>
                          <Table.Cell>{product.category}</Table.Cell>
                          <Table.Cell>{product.price}</Table.Cell>
                          <Table.Cell>{product.count_in_stock}</Table.Cell>
                          <Table.Cell>
                            <Button color='light' onClick={()=>handleEdit(product)}>
                              Edit
                            </Button>
                          </Table.Cell>
                          <Table.Cell>
                            <Button color='light' onClick={()=>confirmDelete(product)}>
                              Delete
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      ) )
                          
                      }
                    
                    </Table.Body>
                  </Table>
                </div>
              }
            </div>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-16 m-auto h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={() => handleDelete(product2Del)}>
                    <span className='text-white'>Yes, I&apos;m sure</span>
                  </Button>
                  <Button color="gray" onClick={() => {setOpenModal(false),setProduct2Del(null)}}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
      </Modal>
        </div>
    </Layout>
  )
}
AdminProducts.auth = {adminOnly:true}
export default AdminProducts;