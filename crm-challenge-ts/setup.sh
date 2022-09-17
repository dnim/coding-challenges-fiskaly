#!/bin/bash

export PG_USER="postgres"

docker-compose up -d
docker-compose exec -d database psql -U "$PG_USER" -f /postgres/createTable.sql
docker-compose exec -d database psql -U "$PG_USER" -f /postgres/importCustomers.sql
docker-compose exec -d backend npm run migrate
