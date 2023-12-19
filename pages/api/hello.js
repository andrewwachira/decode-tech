import {pool} from "../../utils/db";

export default async  function handler(req, res) {
  
  try {
    const client = await pool.connect();
    await client.query('CREATE TABLE IF NOT EXISTS Users(name VARCHAR(255) NOT NULL,email VARCHAR(255) UNIQUE NOT NULL,phone VARCHAR(255),password VARCHAR(255),id  SERIAL NOT NULL,user_photo VARCHAR(255),isadmin BOOLEAN DEFAULT false,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,google_signin_id VARCHAR(255),isverified BOOLEAN DEFAULT false,PRIMARY KEY (id))')
    await client.query('CREATE TABLE IF NOT EXISTS Products (admin INTEGER NOT NULL,name VARCHAR(255) NOT NULL,brand VARCHAR(255) NOT NULL,category VARCHAR(255) NOT NULL,price INTEGER NOT NULL,description VARCHAR(255),image VARCHAR(255) NOT NULL,count_in_stock INTEGER NOT NULL,rating INTEGER NOT NULL DEFAULT 0,reviews JSONB[],product_id  SERIAL NOT NULL,discount INTEGER,condition VARCHAR(255) NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY (product_id),FOREIGN KEY (admin) REFERENCES Users(id))');    
    const newUser = await client.query('INSERT INTO users (name, email, phone, password, isadmin, isverified) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',["Admin User", "decode3.it@gmail.com", "254711294124","$2b$10$YTAkTsMGst0mUwuJemis4u1/Sa/kDb3SYYClQPMvhz0d.cx5idCJ.",true,true]);
   
    res.json({adminUser: newUser.rows[0],database:process.env.POSTGRES_DATABASE});
  } catch (error) {
    res.json({error:error,database:process.env.POSTGRES_DATABASE});
  }
  
}
