const pg = require(`pg`);
const url = require(`url`);

let config = {};
if(process.env.DATABASE_URL){
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(`:`);
  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true,
    max: 10,
    idleTimeoutMillis: 30000
  };
}
else{
  config = {
    host: `localhost`,
    port: 5432,
    database: `herb_stock`,
    max: 10,
    idleTimeoutMillis: 30000
  };
}

const pool = pg.Pool(config);

pool.on(`connect`, ()=>{
  console.log('pg connected');
});

pool.on(`error`, (error)=>{
  console.log('Unexpected error in pg', error);
  process.exit(-1);
});

module.exports = pool;