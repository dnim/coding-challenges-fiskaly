import pg, { ClientConfig } from "pg";
import Postgrator from "postgrator";
import config from "../config";
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function doMigration() {
  const client = new pg.Client({
    user: config.PSQL_USER,
    host: config.PSQL_HOST,
    database: config.PSQL_DB,
    password: config.PSQL_PASSWORD,
    port: config.PSQL_PORT,
  } as ClientConfig);

  await client.connect();

  const postgrator = new Postgrator({
    migrationPattern: path.join(__dirname, '../../migrations/*'),
    driver: "pg",
    database: config.PSQL_DB as string,
    // `pg` package was the reference for postgrator's original common client
    // So there isn't much to do for Postgres.
    execQuery: (query: string) => client.query(query),
  });

  // Migrate to latest or whatever version you want
  await postgrator.migrate();

  // close the db connection
  await client.end();
}
doMigration();
