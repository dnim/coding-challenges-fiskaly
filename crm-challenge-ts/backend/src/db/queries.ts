import queryDb from './queryDb';
import { GetCustomerDto } from "../../customer-model/GetCustomerDto";


export function getCustomer(customer_id: string): Promise<string[]> {
  const queryString: string = `
  SELECT customer_id, first_name, last_name, mail
  FROM customers
  WHERE customer_id = $1
  `;
  return queryDb(queryString, [customer_id]);
}

// TODO: think about partial (i.e. paginated) retrieving
export async function getCustomers(): Promise<GetCustomerDto[]> {
  const queryString: string = `
  SELECT customer_id, first_name, last_name, mail
  FROM customers
  `;
  const result = await queryDb(queryString);
  console.log({ result })
  return queryDb(queryString);
}
