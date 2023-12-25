import {useEffect, useState} from 'react'
import Layout from '../../../components/Layout'
import { Button, Card , Spinner,Alert} from 'flowbite-react';
import Link from 'next/link';
import {useForm} from "react-hook-form";
import { getError } from '../../../utils/error';
import { useEdgeStore } from '../../../utils/edgestore';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';

function EditProduct() {
    const {register,formState: { errors },handleSubmit,watch,setValue} = useForm();
    const [isFormActive,setIsFormActive] = useState(true);
    const [isUploading,setIsUploading] = useState(false);
    const [productImage,setProductImage] = useState("");
    const [progess,setProgress] = useState(0);
    const [imageUrl,setImageUrl] = useState("");
    const [error,setError] = useState("");
    const [success,setSuccess] = useState(null);
    const {edgeStore} = useEdgeStore();
    const productName = watch('productName');
    const brand = watch("brand");
    const category = watch("category");
    const description = watch("description");
    const price = watch("price");
    const countInStock = watch("countInStock");
    const condition  =  watch("condition");
    const {data:session} = useSession();
    const {product2Edit} = useSelector(state => state.products);
    
    useEffect(()=>{

        if(product2Edit){
            setValue('productName',product2Edit.name);
            setValue('brand',product2Edit.brand);
            setValue('category',product2Edit.category);
            setValue('description',product2Edit.description);
            setValue('price',product2Edit.price);
            setValue('countInStock',product2Edit.count_in_stock);
            setValue('condition',product2Edit.condition);
            setImageUrl(product2Edit.image);
        }
    },[setValue]);

    const uploadHandler = async(e,imageField = "image")=>{
        e.preventDefault();
        try {
            if(productImage){
                setIsUploading(true);
                const res = await edgeStore.publicFiles.upload({productImage,onProgressChange : (progress)=> setProgress(progress)});
                setImageUrl(res.url);
                setIsUploading(false);
                setValue(imageField,res.url);
                console.log(res);
                return
            }
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
    const editProduct = async ({productName,brand,category,description,price,countInStock,condition}) => {
        try {
            const {data} = await axios.put("/api/admin/products/edit",{productName,brand,category,description,price,image:imageUrl,countInStock,condition,admin:session.user.id,id:product2Edit.product_id});
            if(data.message === "success"){
                setSuccess(`Successfully Edited ${productName}`);
                window.scrollTo({
                    top: 0,
                    left: 100,
                    behavior: "smooth",
                })
        
            }
          
        } catch (error) {
            
        }
    }

    return (
    <Layout>
        <div className='min-w-lg '>
            <h1 className='text-center text-3xl m-7'>Edit Product</h1>
            <Link href='/admin/products' >
                <Button color='light' className='my-5 mb-10'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mx-2 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    Back to Products
                </Button>
            </Link>
            {success && <Alert color="success"className='w-fit  px-5 mx-auto my-10' onDismiss={()=>setSuccess(null)}>{success}</Alert>}
            {error && <Alert color="failure" className="my-7 px-5 font-red-700 w-fit mx-auto" onDismiss={()=>setError(false)}><span className='px-5'>{error}</span></Alert>}
            <div className='flex justify-center items-center'>
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
                                <Spinner aria-label="Default status example" className='mx-2' size="md"/>
                                Uploading Image...
                            </Button>
                            <div className='h-[6px] w-44 border rounded overflow-hidden'>
                                <div className='h-full bg-blue-500 transiton-all duration-150' style={{width:`${progess}%`}}></div>
                            </div>
                        </>
                        :
                        <Card> 
                            <div className='flex items-center justify-center'>
                                <input className="w-full" type="file"  id="imageFile" onChange={(e)=>setProductImage(e.target.files?.[0])} disabled={isUploading ? true : false} placeholder='upload product image' ></input>
                            </div>
                            <button type="button" className='small-button flex items-center justify-center'onClick={uploadHandler}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mx-2 h-6">
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

                    <button type='submit' className='big-button' onClick={handleSubmit(editProduct)}>Edit</button>
                </form>
                <div className=''>
                    <form id="preview" className={!isFormActive ? "floater overflow-x-auto min-w-[400px]" : "hidden"}>
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
                        <Card className="max-w-sm mt-6 border-2" renderImage={() => <img className='m-auto' width={150} height={150} src={imageUrl ? imageUrl : "/images/logos and icons/decode-logo.png"} alt="productImage" />}>
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


EditProduct.auth = {adminOnly:true}
export default EditProduct;