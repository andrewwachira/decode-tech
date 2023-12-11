import React,{useState,useRef}  from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useSession,signIn,signOut } from 'next-auth/react';
import { Alert } from 'flowbite-react';
import { useRouter } from 'next/router';
import {useForm} from "react-hook-form";
import axios from "axios";
import { getError } from '@/utils/error';

function Login() {
    const {register,formState: { errors },handleSubmit,} = useForm();
    const {register: register2,formState: { errors: errors2 },getValues,handleSubmit: handleSubmit2,} = useForm();
    const [isLoginActive,setIsloginActive] = useState(true);
    const [loading,setLoading] = useState(true);
    const {data} = useSession();
    const [error,setError] = useState("");
    const alertErr = useRef();
    const router = useRouter();
    const {redirect} = router.query

    const handleGoogleSignIn = async() =>{
        setLoading(true);
        await signIn("google",{ callbackUrl: `http://localhost:3000/${redirect||""}`});
    }
    const handleEmailLogin = async({emailLoginInput,passwordLoginInput}) => {
        setLoading(true);
        const result = await signIn("credentials",{
            redirect:false,
            email:emailLoginInput,
            password: passwordLoginInput
        });

        if(result.error){
            setError(result.error);
        }
    }
    const handleEmailSignup = async({nameSignupInput,emailSignupInput,phoneSignupInput,passwordSignupInput}) => {
        setLoading(true);
        try {
            const user = await axios.post("/api/auth/signUp",{name:nameSignupInput,email:emailSignupInput,phone:"254".concat(Number(phoneSignupInput)),password:passwordSignupInput})
            if(user){
                const result = await signIn("credentials",{
                    redirect:false,
                    email:emailSignupInput,
                    password: passwordSignupInput
                });
                if(result.error){
                    setError(result.error);
                }
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
        <Layout title="login">
            {error && <Alert color="failure" className="my-7 px-5  w-fit mx-auto" onDismiss={()=>setError(false)}><span ref={alertErr} className='px-5'>{error}</span></Alert>}
            <div className='max-w-md m-auto relative pb-8'>
                {
                    data?.user?.id ?
                    <>
                        <h3 className='text-center text-3xl my-9'>You are logged in</h3>
                        <button className='small-button m-3'><Link href="/accounts/profile">Go to my profile</Link></button>
                        <button className='small-button m-3' onClick={()=> signOut({callbackUrl: 'http://localhost:3000'}) }>Logout</button>
                    </>
                    :
                    <>
                        <form id='login' className={isLoginActive ? "absolute floater" : "hidden"} onSubmit={handleSubmit(handleEmailLogin)}>

                            <div className='flex'>
                                <div className='w-full'>
                                    <h3 className={isLoginActive ? "text-blue-500 cursor-pointer" : "hover:font-bold cursor-pointer"}  onClick={()=>setIsloginActive(true)}>Login</h3>
                                    <div className={isLoginActive ? "h-[3px] w-full bg-blue-500" : "h-[2px] w-full bg-gray-500" }></div>
                                </div>
                                <div className='w-full'>
                                    <h3 className={!isLoginActive ? "text-blue-500 cursor-pointer" : "hover:font-bold cursor-pointer"} onClick={()=>setIsloginActive(false)}>Sign up</h3>
                                    <div className={!isLoginActive ? "h-[3px] w-full bg-blue-500" : "h-[2px] w-full bg-gray-500" }></div>
                                </div>
                            </div>

                            <div className="social flex justify-center items-center">
                                <button onClick={handleGoogleSignIn} type='button' className="small-button flex justify-center items-center"><img width="25" height="25" className='mx-4' src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>  Continue with Google</button>
                            </div>

                            <p className='m-5 text-center'>Or login Manually</p>

                            <div>
                                <label htmlFor="emailLoginInput">Email</label>
                                <input type="text" id="emailLoginInput" placeholder="Enter Email" {...register("emailLoginInput",{required:"Please enter your email",pattern: {value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$|^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\.[a-zA-Z]{2,})$/i , message:"Please enter a valid email address"} })} />
                                {errors.emailLoginInput && (<div className="text-red-500">{errors.emailLoginInput.message}</div>)}
                            </div>
                            
                            <div>
                                <label htmlFor="passwordLoginInput">Password</label>
                                <input type="password" id="passwordLoginInput" placeholder="Enter Password" {...register("passwordLoginInput",{required:"Please enter your password",minLength:{value:6,message:"Please enter a password with more than 5 characters"}})} />
                                {errors.passwordLoginInput && (<div className="text-red-500">{errors.passwordLoginInput.message}</div>)}
                            </div>

                            <button className='big-button'>Log In</button>
                        </form>

                        <form id='signup'className={isLoginActive ? "hidden" : "absolute floater"} onSubmit={handleSubmit2(handleEmailSignup)}>

                            <div className='flex justify-around'>
                                <div className='w-full'>
                                    <h3 className={isLoginActive ? "text-blue-500 cursor-pointer" : "hover:font-bold cursor-pointer"}  onClick={()=>setIsloginActive(true)}>Login</h3>
                                    <div className={isLoginActive ? "h-[3px] w-full bg-blue-500" : "h-[2px] w-full bg-gray-500" }></div>
                                </div>
                                <div className='w-full'>
                                    <h3 className={!isLoginActive ? "text-blue-500 cursor-pointer" : "hover:font-bold cursor-pointer"} onClick={()=>setIsloginActive(false)}>Sign up</h3>
                                    <div className={!isLoginActive ? "h-[3px] w-full bg-blue-500" : "h-[2px] w-full bg-gray-500" }></div>
                                </div>
                            </div>

                            <div className="social">
                                <button type='button' onClick={handleGoogleSignIn} className="small-button flex justify-center items-center"><img width="25" height="25" className='mx-4' src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>  Continue with Google</button>
                            </div>

                            <p className=' m-5 text-center'>Or Sign up manually</p>

                            <div>
                                <label htmlFor="nameSignupInput">Name</label>
                                <input type="text" placeholder="Enter Your Name" id="nameSignupInput" {...register2("nameSignupInput",{required:"Please enter your name"})}/> 
                                {errors2.nameSignupInput && (<div className="text-red-500">{errors2.nameSignupInput.message}</div>) }
                            </div>

                            <div>
                                <label htmlFor="emailSignupInput">Email</label>
                                <input type="text" placeholder="Enter Email" id="emailSignupInput" {...register2("emailSignupInput",{required:"Please enter your email",pattern: {value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$|^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\.[a-zA-Z]{2,})$/i , message:"Please enter a valid email address"} })}/> 
                                {errors2.emailSignupInput && (<div className="text-red-500">{errors2.emailSignupInput.message}</div>)}
                            </div>

                            <div>
                                <label htmlFor="phoneSignupInput">Phone Number</label>
                                <input type="tel" placeholder="E.g 0712345678" id="phoneSignupInput" {...register2("phoneSignupInput",{required:"Please enter your kenyan phone number",pattern:{value: /^\d{10,10}$/ , message:"Please enter a valid phone number"}})}/> 
                                {errors2.phoneSignupInput && (<div className="text-red-500">{errors2.phoneSignupInput.message}</div>)}
                            </div>
                            
                            <div>
                                <label htmlFor="passwordSignupInput">Password</label>
                                <input type="password" placeholder="Enter Password" id="passwordSignupInput" {...register2("passwordSignupInput",{required:"Please enter your password",minLength:{value:6,message:"Please enter a password with more than 5 characters"}})} ></input>
                                {errors2.passwordSignupInput && (<div className="text-red-500">{errors2.passwordSignupInput.message}</div>)}
                            </div>

                            <div>
                                <label htmlFor="confirmPasswordSignupInput">Confirm password</label>
                                <input type="password" placeholder="Re-Enter Password" id="confirmPasswordSignupInput" {...register2("confirmPasswordSignupInput",{required:"Please enter your password",minLength:{value:6,message:"Please enter a password with more than 5 characters",validate: (value)=>value === getValues("passwordSignupInput")}})}/> 
                                {errors2.confirmPasswordSignupInput && (<div className="text-red-500">{errors2.confirmPasswordSignupInput.message}</div>)}
                                {errors2.confirmPasswordSignupInput && errors2.confirmPasswordSignupInput.type === "validate" && (<div className="text-red-500">Passwords do not match</div>)}
                            </div>
                            
                            <button className='big-button' type='submit'>Sign up</button>
                            
                        </form>
                    </>
                }
            </div>
                
        </Layout>
    ) 
}

export default Login