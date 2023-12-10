import bcrypt from "bcrypt";
import {pool} from "@/utils/db";

export default async function handler(req,res){
    if(req.method !== "POST"){
        return res.status(405).send({message:"Method not allowed"})
    }else{

        const {name,email,password,phone} = req.body;
        const pattern  = /^\d{12,12}$/

        if(!name){
            res.status(422).json({message:"Name not provided"})
            return
        }
        else if( !email || !email.includes("@")){
            res.status(422).json({message:"Invalid email"})
            return
        }
        else if(!password || password.length < 5 ){
            res.status(422).json({message:"Password not provided or password length too short"})
            return
        }
        else if( !phone){
            res.status(422).json({message:"Phone not provided"})
            return
        }
        else if(!pattern.test(phone)){
            res.status(422).json({message:"wrong phone number format"});
            return
        }else{
            const client = await pool.connect();
            const existsEmail = await  client.query('SELECT * FROM users WHERE email = $1',[email]);
            if(existsEmail.rows.length > 0){
                res.status(422).send({message:"User with the provided email already exists. Login instead."});
                return;
            }else {
                const {rows} = await client.query('INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4)',[name,email,phone,bcrypt.hashSync(password,10)]);
                res.status(201).send(rows[0]);
            }
        }
    }
}