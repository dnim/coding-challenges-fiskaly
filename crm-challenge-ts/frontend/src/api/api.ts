import { AddTssToCustomerDto, CreateCustomerDto, GetCustomerDto } from "@fiskaly/customer-model";
import config from "../config";
import { AddTssResponse } from "./index";

const baseUrl = `${config.BACKEND_URL}:${config.BACKEND_PORT}/api`

const headers = new Headers({
  'content-type': 'application/json'
})

export class CustomerApi {

  async get(): Promise<GetCustomerDto[]> {
    const result = await fetch(
      `${baseUrl}/customer`,
      {
        method: 'GET',
      }
    );
    return result.json();
  }

  async create(data: CreateCustomerDto): Promise<GetCustomerDto> {
    const result = await fetch(
      `${baseUrl}/customer`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers
      }
    );
    return result.json();
  }

  async addTssToCustomer(data: AddTssToCustomerDto): Promise<AddTssResponse> {
    const result = await fetch(
      `${baseUrl}/customer/${data.customerId}/add-tss`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers
      }
    );
    return result.json();
  }
}

