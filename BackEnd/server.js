const express = require('express')
const app = express()
const port = 3003
const bodyParser = require("body-parser")
const { Pool } = require('pg')
var cors = require('cors');


var allowedOrigins = ['http://127.0.0.1:5500',
    'http://localhost:3000'];
    
app.use(cors({
    origin: function (origin, callback) {
      console.log(origin)
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

  // there are two ways to connect to a server. with client.connect and with a pool.
  // a pool is more scaleable and is probably preferable since it doesnt make a new connection every time you write a query.
  // if you close the pool connection with pool.end(); you will need to re-open it before you use it again.
  // in general though you dont need to close the pool
  
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Mybffjill1#',
    port: 5432,
  })


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', async (req, res) => {
  let temp = {}
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT * FROM public.rando limit 10', (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result.rows)
      res.json(result)
    })
  })



  // pool.query('SELECT * FROM public.rando limit 10', (error, queryres) => {
  //   if(error) console.log('there was an error with the this path :/')
  //   temp = 'test';
  //   // console.log(temp)
  //   res.json(queryres)
  // })
  // console.log(temp)
  // res.json(temp)
  // here temp is still {}, im not sure why the assignment wont stick outside the query block
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))






