BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS customers_tss
(
    customer_id UUID NOT NULL,
    tss_id      UUID NOT NULL,
    UNIQUE (customer_id, tss_id)
);

INSERT INTO customers_tss
SELECT customer_id, tss_id
FROM customers;

CREATE TEMPORARY TABLE IF NOT EXISTS temp_customers
(
    customer_id uuid,
    first_name  TEXT,
    last_name   TEXT,
    mail        TEXT
);

INSERT INTO temp_customers
SELECT DISTINCT customer_id, first_name, last_name, mail
FROM customers;

DELETE
FROM customers;

ALTER TABLE customers
    DROP COLUMN tss_id;

INSERT INTO customers
SELECT *
FROM temp_customers;

ALTER TABLE customers
    ADD UNIQUE (customer_id);

ALTER TABLE customers_tss
    ADD CONSTRAINT fk_customers FOREIGN KEY (customer_id) REFERENCES customers (customer_id);

DROP TABLE temp_customers;

END TRANSACTION;
