
require('dotenv').config();
const mysql= require('mysql');


const db =mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,   
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});


db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Mysql connected...');
    }
}
);

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS admin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    )
`;

db.query(createTableQuery, (err, result) => {
    if (err) {
        console.error("Error creating table:", err);
    } else {
        console.log("Users table created successfully!");
    }
});

module.exports=db;