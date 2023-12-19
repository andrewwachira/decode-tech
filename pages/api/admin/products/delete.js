import { getSession } from "next-auth/react";
import { pool } from "../../../../utils/db";

const handler = async (req,res) => {

    if(req.method === "DELETE"){
        const session = await getSession({req});
        if(!session.user.isadmin){
            return res.status(403).send({message:"Admin access only"})
        }
        try{
            await pool.query('DELETE FROM  products WHERE product_id = $1',[req.query.id]);
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