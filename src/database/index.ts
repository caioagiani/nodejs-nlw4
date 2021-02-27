import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const { database } = defaultOptions;

  const replaceEnvironmentOptions =
    process.env.NODE_ENV === 'test'
      ? {
          database: `${database}_test`,
          dropSchema: true,
        }
      : {
          database,
        };

  return createConnection(
    Object.assign(defaultOptions, replaceEnvironmentOptions),
  );
};
