// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {pool} from "../../utils/db";

export default async  function handler(req, res) {
  const profile = {
    iss: 'https://accounts.google.com',
    azp: '652275461641-10j13fpqei2vn4peg56eco8ltipr0ckc.apps.googleusercontent.com',
    aud: '652275461641-10j13fpqei2vn4peg56eco8ltipr0ckc.apps.googleusercontent.com',
    sub: '111201777863807079766',
    email: 'andrewwachira1@gmail.com',
    email_verified: true,
    at_hash: 'o9JkVqYQK52uFMbFvzGUxg',
    name: 'Andrew',
    picture: 'https://lh3.googleusercontent.com/a/ACg8ocKexssQUhFJTmxoB8fPwdtflYCy0CciMm69wXofGUQdhA=s96-c',
    given_name: 'Andrew',
    locale: 'en',
    iat: 1702160886,
    exp: 1702164486
  }
  try {
    const client = await pool.connect();
    const {rows} = await client.query('SELECT * FROM Users WHERE email = $1',[profile.email]);
    const  user  = rows[0];
    if(!user){
      const newUser = await client.query(
        'INSERT INTO users (name, email, user_photo) VALUES ($1, $2, $3) RETURNING *',
        [profile.name, profile.email, profile.picture]
      );
      
      console.log(newUser);
    }
  } catch (error) {
    console.log(error);
  }
  
  res.status(200).json({ clientID: process.env.GOOGLE_CLIENT_ID, })
}
