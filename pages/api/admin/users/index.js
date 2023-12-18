import { getSession } from "next-auth/react";
import { pool } from "../../../../utils/db";

const handler = async (req,res) => {

    if(req.method === "GET"){
        const session = await getSession({req});
        console.log(session);
        if(!session.user.isadmin){
            return res.status(403).send({message:"Admin access only"})
        }
        try{
            const results = await pool.query("SELECT * FROM users");
            const users = results.rows
            res.send(users);
        }catch(error){
            res.json(error);
        }
       
    }else{
        return res.status(405).send({message:"Method not allowed"});
    }
}

export default handler