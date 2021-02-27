import { app } from './app';
import createConnection from './database';

app.listen(3333 || process.env.PORT, async () => {
  await createConnection();

  console.log({
    server: 'http://localhost:3333',
    database: process.env.TYPE,
  });
});
