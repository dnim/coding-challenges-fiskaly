import { AddCustomerForm, CustomerFormValues } from "../components/AddCustomerForm";
import { useCreateCustomer } from "../api";
import { useNavigate } from "react-router-dom";
import { CreateCustomerDto } from "@fiskaly/customer-model";
import { AppRoutes } from "./routes";

export const AddCustomerPage = (): JSX.Element => {

  // TODO: provide callback to onSuccess method to display created customer id
  const { mutate: createCustomer } = useCreateCustomer();
  const navigate = useNavigate();

  const handleNewCustomerSubmit = async (customer: CustomerFormValues) => {
    await createCustomer(customer as CreateCustomerDto);
    navigate(AppRoutes.customers, { state: { successfulNotification: 'The new customer was successfully added!' } })
  }

  return (
    <AddCustomerForm onSubmit={handleNewCustomerSubmit}/>
  )
}
