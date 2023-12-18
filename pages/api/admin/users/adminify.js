import { getSession } from "next-auth/react";
import { pool } from "../../../../utils/db";

const handler = async (req,res) => {

    if(req.method === "POST"){
        const session = await getSession({req});
        // if(!session.user.isadmin){
        //     return res.status(403).send({message:"Admin access only"})
        // }
        try{
            await pool.query('UPDATE users SET isadmin = $1 WHERE id = $2 RETURNING *',[true,req.body.id]);
            res.send({message:"success"});
        }catch(error){
            res.json(error);
        }
       
    }else if(req.method === "PATCH"){
        if(req.body.id === 1){
            return res.status(500).json({message:"Cannot demote Root admin"});
        }
        try{
            await pool.query('UPDATE users SET isadmin = $1 WHERE id = $2 RETURNING *',[false,req.body.id]);
            res.send({message:"success"});
        }catch(error){
            res.json(error);
        }
    }else{
        console.log(req.method);
        return res.status(405).send({message:"Method not allowed"});
    }
}

export default handler