import {useEffect, useState} from 'react'
import Layout from '../../../components/Layout'
import { Button, Card , Spinner,Alert} from 'flowbite-react';
import {useForm} from "react-hook-form";
import { getError } from '../../../utils/error';
import { useEdgeStore } from '../../../utils/edgestore';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Bars } from 'react-loader-spinner';

function CreateProduct() {
    const {register,formState: { errors },handleSubmit,watch,setValue} = useForm();
    const [isFormActive,setIsFormActive] = useState(true);
    const [isUploading,setIsUploading] = useState(false);
    const [productImage,setProductImage] = useState("");
    const [progess,setProgress] = useState(0);
    const [error,setError] = useState("");
    const [imageUrl,setImageUrl] = useState("");
    const [success,setSuccess] = useState(null);
    const {edgestore} = useEdgeStore();
    const productName = watch('productName');
    const brand = watch("brand");
    const category = watch("category");
    const description = watch("description");
    const price = watch("price");
    const countInStock = watch("countInStock");
    const condition  =  watch("condition");
    const router = useRouter();
    const {data:session} = useSession();

    const uploadHandler = async()=>{
        try {
            if(!productImage) return
            setIsUploading(true);
            const res = await edgestore.publicFiles.upload({file:productImage,onProgressChange : (progress)=> setProgress(progress)});
            setIsUploading(false);
            setImageUrl(res.url);
            setValue("productImage",res.url);
            return
        } catch (error) {
            console.log(error);
            setIsUploading(false);
            setError(getError(error));
            window.scrollTo({
                top: 0,
                left: 100,
                behavior: "smooth",
              })
        }
    } 
    const createProduct = async ({productName,brand,category,description,price,countInStock,condition}) => {
        if(!imageUrl){
            setError("Product Image is required");
            window.scrollTo({
                top:0,
                left:100,
                behavior:'smooth'
            })
            return 
        }
        try {
            const {data} = await axios.post("/api/admin/products/create",{productName,brand,category,description,price,image:imageUrl,countInStock,condition,admin:session.user.id});
            if(data.message === "success"){
                setSuccess(`Successfully Created ${productName}`);
                window.scrollTo({
                    top: 0,
                    left: 100,
                    behavior: "smooth",
                })
            }
          
        } catch (error) {
            setError(getError(error));
            window.scrollTo({
                top:0,
                left:100,
                behavior:'smooth'
            })
        }
    }

    return (
    <Layout>
        <div className='min-w-lg '>
            <h1 className='text-center text-3xl m-7'>Create Product</h1>
            <div className='flex justify-center overflow-x-auto mb-20'>
                <Button.Group className='w-fit'>
                        <Button color='light' onClick={()=>router.push("/admin/dashboard")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mr-1 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                            </svg>
                            Dashboard
                        </Button>
                        <Button color='light' onClick={()=>router.push("/admin/products")}>
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
            {success && <Alert color="success"className='w-fit  px-5 mx-auto my-10' onDismiss={()=>setSuccess(null)}>{success}</Alert>}
            {error && <Alert color="failure" className="my-7 px-5 font-red-700 w-fit mx-auto" onDismiss={()=>setError(false)}><span className='px-5'>{error}</span></Alert>}
            <div className='flex justify-center mt-30 items-center'>
                <form   className={isFormActive ? "floater" : "hidden"}>
                    <div className='flex mb-4'>
                        <div className='w-full'>
                            <h3 className={isFormActive ? "text-blue-500 cursor-pointer" : "hover:font-bold cursor-pointer"}  onClick={()=>setIsFormActive(true)}>Form</h3>
                            <div className={isFormActive ? "h-[3px] w-full bg-blue-500" : "h-[2px] w-full bg-gray-500" }></div>
                        </div>
                        <div className='w-full'>
                            <h3 className={!isFormActive ? "text-blue-500 cursor-pointer" : "hover:font-bold cursor-pointer"} onClick={()=>setIsFormActive()}>Preview</h3>
                            <div className={!isFormActive ? "h-[3px] w-full bg-blue-500" : "h-[2px] w-full bg-gray-500" }></div>
                        </div>
                    </div>
                    {
                        isUploading ?
                        <>
                            <Button color='light' disabled className='flex items-center justify-center w-full'>
                                <Bars width={50} height={50} color="#3b82f6"  className='mr-1' size="md"/>
                                <span className='ml-3'>Uploading Image...</span>
                            </Button>
                            <div className='h-[6px] w-44 border rounded overflow-hidden'>
                                <div className='h-full bg-blue-500 transiton-all duration-150' style={{width:`${progess}%`}}></div>
                            </div>
                        </>
                        :
                        <Card> 
                            <div className='flex items-center justify-center'>
                                <input className="w-full" type="file"  onChange={(e)=>setProductImage(e.target.files?.[0])} disabled={isUploading ? true : false} placeholder='upload product image' ></input>
                            </div>
                            <button type="button" className='small-button flex items-center justify-center'onClick={uploadHandler}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mr-1 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                </svg>
                                <span className='p-2'>Upload product Image</span>
                            </button>
                        </Card>
                       
                    }
                    
                    <div>
                        <label htmlFor="productName">Product Name</label>
                        <input type="text" id="productName"  placeholder="Enter product name" {...register("productName",{required:"Product name cannot be blank"})} />
                        {errors.productName && (<div className="text-red-500">{errors.productName.message}</div>)}
                    </div>
                    
                    <div>
                        <label htmlFor="brand">Brand</label>
                        <input type="text" id="brand" placeholder="Enter Brand" {...register("brand",{required:"Enter brand of the product"})} />
                        {errors.brand && (<div className="text-red-500">{errors.brand.message}</div>)}
                    </div>

                    <div>
                        <label htmlFor="category">Category</label>
                        <input type="text" id="category"  placeholder="Enter Category" {...register("category",{required:"Enter category of the product"})} />
                        {errors.category && (<div className="text-red-500">{errors.category.message}</div>)}
                    </div>

                    <div>
                        <label htmlFor="description">Product Description</label>
                        <textarea type="text" id="description"  placeholder="Enter Description" {...register("description",{required:"Enter description of the product"})} />
                        {errors.description && (<div className="text-red-500">{errors.description.message}</div>)}
                    </div>

                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price"  placeholder="Enter Price" {...register("price",{required:"Enter price of the product"})} />
                        {errors.price && (<div className="text-red-500">{errors.price.message}</div>)}
                    </div>

                    <div>
                        <label htmlFor="countInStock">Count in Stock</label>
                        <input type="text" id="countInStock" placeholder="Enter the count in stock" {...register("countInStock",{required:"Enter countInStock of the product"})} />
                        {errors.countInStock && (<div className="text-red-500">{errors.countInStock.message}</div>)}
                    </div>

                    <div>
                        <label htmlFor="condition">Condition</label>
                        <input type="text" id="condition"  placeholder="Enter condition of the product" {...register("condition",{required:"Enter condition of the product"})} />
                        {errors.condition && (<div className="text-red-500">{errors.condition.message}</div>)}
                    </div>

                    <button type='submit' className='big-button' onClick={handleSubmit(createProduct)}>Create</button>
                </form>
                <div className='flex justify-center mt-30 items-center'>
                    <form id="preview" className={!isFormActive ? "floater overflow-x-auto min-w-[300px]" : "hidden"}>
                        <div className='flex'>
                            <div className='w-full'>
                                <h3 className={isFormActive ? "text-blue-500 cursor-pointer" : "hover:font-bold cursor-pointer"}  onClick={()=>setIsFormActive(true)}>Form</h3>
                                <div className={isFormActive ? "h-[3px] w-full bg-blue-500" : "h-[2px] w-full bg-gray-500" }></div>
                            </div>
                            <div className='w-full'>
                                <h3 className={!isFormActive ? "text-blue-500 cursor-pointer" : "hover:font-bold cursor-pointer"} onClick={()=>setIsFormActive(false)}>Preview</h3>
                                <div className={!isFormActive ? "h-[3px] w-full bg-blue-500" : "h-[2px] w-full bg-gray-500" }></div>
                            </div>
                        </div>
                        <Card className="max-w-sm mt-6 border-2" renderImage={() => <img className='m-auto' src={imageUrl ? imageUrl : "/images/logos and icons/decode-logo.png"} alt="productImage" />}>
                            <h5 className="text-center text-lg font-bold tracking-tight text-gray-900 dark:text-white">{productName}</h5>
                            <p className="text-center tracking-tight text-gray-900 dark:text-white break-words"><h6 className='font-thin'>{description}</h6></p>
                            <p className="text-center flex flex-col tracking-tight text-gray-900 dark:text-white">
                                <span className='font-bold '>Brand</span>
                                <span className='font-thin'>{brand}</span>
                            </p>
                            <p className="text-center flex flex-col tracking-tight text-gray-900 dark:text-white">
                                <span className='font-bold '>Category</span>
                                <span className='font-thin'>{category}</span>
                            </p>
                            <p className="text-center flex flex-col tracking-tight text-gray-900 dark:text-white">
                                <span className='font-bold '>Price</span>
                                <span className='font-thin'>{price}</span>
                            </p>
                            <p className="text-center flex flex-col tracking-tight text-gray-900 dark:text-white">
                                <span className='font-bold '>Count in Stock</span>
                                <span className='font-thin'>{countInStock}</span>
                            </p>
                            <p className="text-center flex flex-col tracking-tight text-gray-900 dark:text-white">
                                <span className='font-bold '>Condition</span>
                                <span className='font-thin'>{condition}</span>
                            </p>
                        </Card>
                    </form> 
                 </div>
            </div>
        </div>
    </Layout>
  )
}

CreateProduct.auth = {adminOnly:true}
export default CreateProduct;