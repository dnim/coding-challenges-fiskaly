import pg from "pg";
import Postgrator from "postgrator";
import config from '../backend/build/backend/src/config.js'; // TODO: yep, it's hacky and need to be adjusted

async function doMigration() {
  const client = new pg.Client({
    user: config.PSQL_USER,
    host: config.PSQL_HOST,
    database: config.PSQL_DB,
    password: config.PSQL_PASSWORD,
    port: config.PSQL_PORT,
  });

  await client.connect();

  const postgrator = new Postgrator({
    migrationPattern: "./migrations/*",
    driver: "pg",
    database: config.PSQL_DB,
    execQuery: (query) => client.query(query),
  });
  await postgrator.migrate();

  await client.end();
}
doMigration();
