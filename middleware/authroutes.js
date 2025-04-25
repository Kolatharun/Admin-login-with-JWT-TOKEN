const jwt=require('jsonwebtoken');
require('dotenv').config;

const JWT_SECRET=process.env.JWT_SECRET ||kkkk;

function authenticateToken(req,res,next){
    const token=req.cookies.token;
         console.log(token);
    if(!token) return res.redirect('/login');

    jwt.verify(token,JWT_SECRET,(err,user)=>{
        if(err) return res.redirect('/login');
        req.user=user;
        next();
    });
}

module.exports=authenticateToken;