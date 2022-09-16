import type {
  UseMutationResult,
  UseQueryResult,
} from 'react-query';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CustomerApi } from "./api";
import { AddTssToCustomerDto, CreateCustomerDto, GetCustomerDto } from "@fiskaly/customer-model";

const CUSTOMERS_KEY = 'customers-key';
const api = new CustomerApi()

export const useCustomers = (): UseQueryResult<GetCustomerDto[]> => {
  return useQuery([CUSTOMERS_KEY], api.get)
};

export const useCreateCustomer = (): UseMutationResult<{ id: string }, unknown, CreateCustomerDto> => {
  const queryClient = useQueryClient()
  return useMutation<{ id: string }, unknown, CreateCustomerDto>(api.create, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([CUSTOMERS_KEY])
    },
  })
};

export interface AddTssResponse { customerId: string, ttsId: string }

export const useAddTssToCustomer = (): UseMutationResult<AddTssResponse, unknown, AddTssToCustomerDto> => {
  const queryClient = useQueryClient()
  return useMutation<AddTssResponse, unknown, AddTssToCustomerDto>(api.addTssToCustomer, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([CUSTOMERS_KEY])
    },
  })
}
