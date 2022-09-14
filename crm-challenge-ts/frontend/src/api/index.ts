import type {
  UseMutationResult,
  UseQueryResult,
} from 'react-query';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CustomerApi } from "./api";
import { GetCustomerDto } from "@fiskaly/customer-model";

const CUSTOMERS_KEY = 'customers-key';
const api = new CustomerApi()

export const useCustomers = (): UseQueryResult<GetCustomerDto[]> => {
  return useQuery([CUSTOMERS_KEY], api.get)
};

export const useCreateCustomer = (): UseMutationResult<GetCustomerDto, unknown, GetCustomerDto> => {
  const queryClient = useQueryClient()
  return useMutation<GetCustomerDto, unknown, GetCustomerDto>(api.create, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([CUSTOMERS_KEY])
    },
  })
};
