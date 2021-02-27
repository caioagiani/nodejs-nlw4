import 'dotenv';

export default {
  type: process.env.TYPE,
  host: process.env.HOST,
  port: 5432,
  username: process.env.UNAME,
  password: process.env.PWORD,
  database: process.env.DBASE,
  dropSchema: false,
  logging: false,
  synchroize: true,
  migrationsRun: true,
  entities: ['./src/app/models/**.ts'],
  migrations: ['./src/database/migrations/**.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
