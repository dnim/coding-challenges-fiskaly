import type {
  UseMutationResult,
  UseQueryResult,
} from 'react-query';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CustomerApi } from "./api";
import type { AddTssResponse, AddTssToCustomerDto, CreateCustomerDto, GetCustomerDto } from "@fiskaly/customer-model";

const CUSTOMERS_KEY = 'customers-key';
const api = new CustomerApi()

export const useCustomers = (): UseQueryResult<GetCustomerDto[]> => {
  return useQuery([CUSTOMERS_KEY], api.get)
};

export const useCreateCustomer = (): UseMutationResult<{ id: string }, unknown, CreateCustomerDto> => {
  const queryClient = useQueryClient()
  return useMutation<{ id: string }, unknown, CreateCustomerDto>(api.create, {
    onSuccess: async (_data) => {
      await queryClient.invalidateQueries([CUSTOMERS_KEY])
    },
  })
};

export const useAddTssToCustomer = (callback: (data: AddTssResponse | ResponseError) => void): UseMutationResult<AddTssResponse | ResponseError, unknown, AddTssToCustomerDto> => {
  const queryClient = useQueryClient()
  return useMutation<AddTssResponse | ResponseError, unknown, AddTssToCustomerDto>(api.addTssToCustomer, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([CUSTOMERS_KEY])
      callback(data)
    },
  })
}

export interface ResponseError { error: string }
export const isResponseError = (data: AddTssResponse | ResponseError): data is ResponseError => {
  return (data as ResponseError).error !== undefined;
}
