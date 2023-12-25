import { pool } from "../../../../utils/db";

const handler = async (req,res) => {
    if(req.method === "DELETE"){
        try{
            const results = await pool.query("DELETE FROM users WHERE id=$1",[req.query.id]);
            const users = results.rows
            res.send(users);
        }catch(error){
            res.status(500).json({error});
        }
    }else{
        return res.status(405).send({message:"Method not allowed"});
    }
}

export default handler