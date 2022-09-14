import { GetCustomerDto, CreateCustomerDto } from "@fiskaly/customer-model";
import config from "../config";

export class CustomerApi {

  async get(): Promise<GetCustomerDto[]> {
    const result = await fetch(
    `${getBaseUrl()}/customer`,
      {
        method: 'GET',
      }
    );
    return result.json();
  }

  async create(data: CreateCustomerDto): Promise<GetCustomerDto> {
    const result = await fetch(
      `${getBaseUrl()}/customer`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    return result.json();
  }
}

const getBaseUrl = () => {
  return `${config.BACKEND_URL}:${config.BACKEND_PORT}/api`
}
