CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE customers
    ALTER COLUMN customer_id SET DEFAULT uuid_generate_v4();
