
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs'); // Import the 'fs' module to handle file system operations

const db = new sqlite3.Database('./shop.db');
const sql = fs.readFileSync('./setup.sql', 'utf8'); 

db.exec(sql, (err) => { // Execute SQL in shop.db
    if(err){
        console.error('❌Error', err.message);
    }else{
        console.log('☑️Database created and setup completed successfully.');
    }
    db.close();
});
