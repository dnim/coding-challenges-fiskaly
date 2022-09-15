import queryDb from './queryDb';
import { CreateCustomerDto, GetCustomerDto } from "@fiskaly/customer-model";

export function getCustomer(customer_id: string): Promise<string[]> {
  const queryString: string = `
  SELECT customer_id, first_name, last_name, mail
  FROM customers
  WHERE customer_id = $1
  `;
  return queryDb(queryString, [customer_id]);
}

export async function getCustomers(): Promise<any[]> {
  const queryString: string = `
      SELECT c.customer_id, c.mail, c.first_name, c.last_name, ARRAY_AGG(ct.tss_id) as tsss
      FROM customers c
               LEFT OUTER JOIN customers_tss ct ON c.customer_id = ct.customer_id
      GROUP BY c.mail, c.first_name, c.last_name, c.customer_id;
  `;
  return queryDb(queryString);
}

export async function createCustomer({firstName, lastName, mail}: CreateCustomerDto): Promise<{ customerId: string}> {
  const queryString: string = `
  INSERT INTO customers (first_name, last_name, mail)
  VALUES ($1, $2, $3) 
  RETURNING customer_id
  `;
  const result = await queryDb(queryString, [firstName, lastName, mail]);
  console.log({result })
  return { customerId: result[0].customer_id};
}
