const express= require('express');
const mysql= require('mysql');
const bodyParser= require('body-parser');
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const path = require('path');
const cookieparser =require('cookie-parser');
require('dotenv').config();

//for data base
const db=require('../loguser/config/database');



const app= express();


const port=4000;
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieparser());


//for routesssss
const userroutes=require('./routes/userRoutes');

app.use('/',userroutes);


// 404 - Not Found handler>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.use((req, res, next) => {
    res.status(404).render('error', { status: 404, message: 'Page Not Found' });
  });
  
  // General Error Handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
      status: err.status || 500,
      message: err.message || 'Internal Server Error'
    });
  });
  

  







































