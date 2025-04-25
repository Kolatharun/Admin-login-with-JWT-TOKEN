const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken =require('../middleware/authroutes')


// Test route
router.get('/hey', (req, res) => {
    res.send('<h1 align="center">Heyyy admin!!!!</h1> <br><br> <h1 align="center">welcome to  Admin dash board..!!!!!!!!</h1>');
});

// Login page
// router.get('/login', (req, res) => {
//     res.render('login'); // Ensure login.ejs exists in the views folder
// });


router.get('/login', (req, res) => {
    res.render('login', { query: req.query });
});

router.post('/login',userController.login);


// Register page
router.get('/register', (req, res) => {
    res.render('register'); // Ensure register.ejs exists in the views folder
});

// Register functionality
router.post('/register', userController.Register);


router.get('/protected',authenticateToken,(req,res)=>{
    res.render('protected' ,{ email: req.user.email });
});

// router.get('/update',(req,res)=>{
//     res.render('userupdate');
// });

// router.post('/userupdate',userController.updatepassword);


router.get('/userupdate', (req, res) => {
    res.render('userupdate', { query: req.query });
});

router.post('/userupdate',userController.updatepassword );








//error handleling 
router.get('/exists',(req,res)=>{
    res.render('errorpage',{ message: 'User already exists ' });
});

router.get('/limit',(req,res)=>{
    res.render('errorpage',{message: 'maxmimum user limit exists'});
});




module.exports = router;
