import nextAuth from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { pool } from "@/utils/db";

export default nextAuth({ 
    session:{
        strategy:"jwt"
    },
    callbacks:{
        async signIn({ account, profile }) {
           let user;
            if (account.provider === "google") {
                if(!profile){
                    throw new Error("There is no such profile")
                }
                try {
                    const client = await pool.connect();
                    const {rows} = await client.query('SELECT * FROM Users WHERE email = $1',[profile.email]);
                    user = rows[0];
                    if(!user){
                        user = await client.query(
                            'INSERT INTO users (name, email, user_photo, google_signin_id, is_verified) VALUES($1, $2, $3, $4, $5) RETURNING *',
                            [ profile.name, profile.email,profile.picture,profile.sub, true]
                        );
                    }
                   
                    return user;
                } catch (error) {
                    console.log(error);
                    return false
                }
            }
            return user 
          },

        async jwt({token,user}){
            if(user?.id) token.id = user.id;
            if(user?.isadmin) token.isadmin  = user.isadmin;
            return token;
        },
        async session({token,session}){
            if(token?.id) session.user.id = token.id;
            if(token?.isadmin) session.user.isadmin  = token.isadmin;
            return session;
        }
    },
    providers:[
        CredentialsProvider({
            async authorize(credentials){
                const client = await pool.connect();
                const {rows} = await client.query(`SELECT * FROM users WHERE email = $1`,[credentials.email])
                const user = rows[0]
                if(!user){
                    throw new Error("User with the provided email not found.");
                }else if(user && !user.password && user.google_signin_id){
                    throw new Error("Your account was signed up with google, but does not have a password. Click on 'Continue with google' to login")
                }
                else if (user && user.password && !bcrypt.compareSync(credentials.password,user.password)){
                    throw new Error("Invalid Password");
                }
                else{
                    return{
                        id:user.id,
                        name:user.name,
                        email:user.email,
                        image:user.user_photo,
                        isAdmin:user.isadmin,
                    }
                }
               
            }
        }),
        GoogleProvider({
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ]
});