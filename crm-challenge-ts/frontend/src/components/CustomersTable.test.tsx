import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { CustomersTable } from './CustomersTable'
import { QueryClient, QueryClientProvider } from "react-query";
import { GetCustomerDto } from "@fiskaly/customer-model";

jest.mock('react-router-dom', () => ({
  useLocation: () => { state: {}}
}))
jest.mock('../api', () => ({
  useCustomers: () => {
    return {
      data: undefined,
      isLoading: true,
      isError: false
    }
  },
  useAddTssToCustomer: () => {
    return {
      mutate: () => {},
    }
  }
}));
const queryClient = new QueryClient()

describe("CustomersTable", () => {

  test("Render loading page", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CustomersTable handleErrorNotification={() => {}} handleSuccessNotification={() => {}}/>
      </QueryClientProvider>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  })
})
