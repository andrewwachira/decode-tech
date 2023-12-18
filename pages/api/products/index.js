import { pool } from "../../../utils/db";

const handler = async (req,res) => {

    if(req.method === "GET"){
        try{
            const results = await pool.query("SELECT * FROM products");
            const products = results.rows
            res.send(products);
        }catch(error){
            res.json(error);
        }
       
    }else{
        return res.status(405).send({message:"Method not allowed"});
    }
}

export default handler