const path = require('path');
const pg = require('pg');
require('dotenv/config');

//setting up connection to the database
var pool = new pg.Pool({
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  max: 20,
  host: process.env.DB_HOST,
  user:process.env.DB_USER
});

//connecting test to the database
pool.connect((error, db, done)=>{
  if(error){
    return console.log(error);
  }
  else {
    db.query('SELECT * from USERS',(error, table)=>{
      done();
      if(error){
        return console.log(error);
      }
    })
  }
});
//exporting are function that returns pool variable if not present
module.exports = {
    getPool: function () {
      if (pool){
      return pool;
    }
}};
