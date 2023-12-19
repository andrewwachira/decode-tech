import { getSession } from "next-auth/react";
import { pool } from "../../../../utils/db";

const handler = async (req,res) => {

    if(req.method === "PUT"){
        const session = await getSession({req});
        if(!session.user.isadmin){
            return res.status(403).send({message:"Admin access only"})
        }
        const {productName,brand,category,descripton,price,image,countInStock,condition,admin,id} = req.body;
        try{
            await pool.query('UPDATE products SET name = $1, brand = $2, category = $3, price = $4, description = $5, image = $6, count_in_stock = $7, condition = $8, admin =$9, WHERE id=$10',[productName,brand,category,price,descripton,image,countInStock,condition,admin,id]);
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