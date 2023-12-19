import { getSession } from "next-auth/react";
import { pool } from "../../../../utils/db";

const handler = async (req,res) => {

    if(req.method === "POST"){
        const session = await getSession({req});
        if(!session.user.isadmin){
            return res.status(403).send({message:"Admin access only"})
        }
        const {productName,brand,category,descripton,price,image,countInStock,condition,admin} = req.body;
        try{
            await pool.query('INSERT INTO  products (name,brand,category,price,description,image,count_in_stock,condition,admin) VALUES($1, $2, $3, $4, $5, $6, $7, $8 ,$9)RETURNING *',[productName,brand,category,price,descripton,image,countInStock,condition,admin]);
            res.send({message:"success"});
        }catch(error){
            console.log(error);
            res.json(error);
        }
    }else{
        console.log(req.method);
        return res.status(405).send({message:"Method not allowed"});
    }
}

export default handler