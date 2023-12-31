import { pool } from "../../../../utils/db";

const handler = async (req,res) => {

    if(req.method === "GET"){
        try{
            const results = await pool.query("SELECT * FROM users");
            const users = results.rows
            res.send(users);
        }catch(error){
            res.json(error);
        }
    }else{
        return res.status(405).json({message:"Method not allowed"});
    }
}

export default handler