import config from '../config';
import { Pool, PoolConfig } from 'pg';

const v1: Pool = new Pool({
    user: config.PSQL_USER,
    host: config.PSQL_HOST,
    database: config.PSQL_DB,
    password: config.PSQL_PASSWORD,
    port: config.PSQL_PORT,
  } as PoolConfig
);

export default function queryDb(query: string):Promise<any[]> {
  return v1.query(query)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
      console.log(query);
      throw(err);
    });
}
