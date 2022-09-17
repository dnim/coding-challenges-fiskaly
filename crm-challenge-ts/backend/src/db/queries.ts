import queryDb from './queryDb';
import type { AddTssResponse, AddTssToCustomerDto, CreateCustomerDto } from "@fiskaly/customer-model";
import type { GetCustomerQueryResult } from "../routes/api/customers";

export async function getCustomers(): Promise<GetCustomerQueryResult[]> {
  const queryString: string = `
      SELECT c.customer_id, c.mail, c.first_name, c.last_name, ARRAY_AGG(ct.tss_id) AS tsss
      FROM customers c
               LEFT OUTER JOIN customers_tss ct ON c.customer_id = ct.customer_id
      GROUP BY c.mail, c.first_name, c.last_name, c.customer_id;
  `;
  return queryDb(queryString);
}

export async function createCustomer({
                                       firstName,
                                       lastName,
                                       mail
                                     }: CreateCustomerDto): Promise<{ customerId: string }> {
  const queryString: string = `
      INSERT INTO customers (first_name, last_name, mail)
      VALUES ($1, $2, $3)
      RETURNING customer_id
  `;
  const result = await queryDb(queryString, [firstName, lastName, mail]);
  return { customerId: result[0].customer_id };
}

export async function connectTssAndCustomer({
                                              customerId,
                                              tssId
                                            }: AddTssToCustomerDto): Promise<AddTssResponse> {
  const queryString: string = `
      INSERT INTO customers_tss (customer_id, tss_id)
      VALUES ($1, $2)
      RETURNING *
  `;
  const result = await queryDb(queryString, [customerId, tssId]);
  const { customer_id, tss_id } = result[0]
  return { customerId: customer_id, tssId: tss_id };
}
