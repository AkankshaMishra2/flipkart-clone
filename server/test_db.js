import Connection from './database/db.js';
Connection()
  .then(() => {
    console.log("DB test done");
    process.exit(0);
  })
  .catch(err => {
    console.log("DB test failed", err);
    process.exit(1);
  });
