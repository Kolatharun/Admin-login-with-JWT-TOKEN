const db=require('../config/database');
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
require('dotenv').config;

const JWT_SECRET=process.env.JWT_SECRET;

function Register(req, res) {
    const { email, password } = req.body;

    // Check if email already exists
    db.query('SELECT * FROM admin WHERE email = ?', [email], (err, results) => {
        if (err) return res.send(err + ' Database query error');
      //  if (results.length > 0) return res.send('Email ID already exists');
      if (results.length > 0) return res.redirect('/exists');    


        db.query('select count(*) AS totalcount from admin ',(err,result)=>{
               if(err) return res.send('database error in count');
            if(result.length==0) return res.send('no resulst found');
          const totaladmin=result[0].totalcount;
          if(totaladmin>=3) return res.redirect('/limit'); 
  

        // Hash the password and save to the database
        bcrypt.hash(password, 10, (err, hashed) => {
            if (err) return res.send('Error hashing password');

            db.query('INSERT INTO admin (email, password) VALUES (?, ?)', [email, hashed], (err, result) => {
                if (err) return res.send(err + ' Error saving user');
                res.redirect('/login'); // Redirect to login page
            });
        });
    });
    });
}

function login(req,res){
   const {email,password}= req.body;
   //check email is present or not
   db.query('SELECT * FROM admin WHERE email=?',[email],(err,results)=>{
    if(err) return res.send(err+'data base error');
   //if(results.length==0) return res.send("no user found on this email   please register")
   if(results.length==0) return res.redirect('/login?invalidemail=1');
        const user = results[0];
        bcrypt.compare(password,user.password,(err,isMatch)=>{
           if (err) return res.send('Error comparing passwords');
          // if (!isMatch) return res.send('Invalid credentials');
          if (!isMatch) return res.redirect('/login?invalidpassword=1');


           const token=jwt.sign({id:user.id,email:user.email},JWT_SECRET,{expiresIn:'1h'});
           res.cookie('token', token, { httpOnly: true });
           res.redirect('/protected');
        });

   });

};



//for update the password

function updatepassword(req,res){
    const{email,password,newpassword}=req.body;
    console.log({email,password,newpassword});
   
    db.query('SELECT * FROM admin WHERE email=? ',[email],(err,results)=>{
        if(err) return res.send(err+'data base error');
       if(results.length==0) return res.redirect('/userupdate?invalid=1');

        const user=results[0];
        bcrypt.compare(password,user.password,(err,isMatch)=>{
            if (err) return res.send('Error comparing passwords');
            if (!isMatch) return res.redirect('/userupdate?invalidpassword=1');


            //forhashig and update 
            bcrypt.hash(newpassword, 10, (err, hashed) => {
                if (err) return res.send('Error hashing password');
    
                db.query('UPDATE admin SET password=? WHERE email=?', [hashed,user.email], (err, result) => {
                    if (err) return res.send(err + ' Error saving user');
                   // res.redirect('/login'); // Redirect to login page
                  // res.send("password updated sucessfully");
                  res.redirect('/userupdate?success=1');
                });
            });
        });


    });

}


 module.exports={Register,login,updatepassword};