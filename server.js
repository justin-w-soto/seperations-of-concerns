const app = require('./lib/app');
const pool = require('./lib/utils/pool');

const PORT = process.env.PORT || 5432;

app.listen(PORT, () => {
  console.log(`Started on ${PORT}`);
});

process.on('exit', () => {
  console.log('Goodbye!');
  pool.end();
});
