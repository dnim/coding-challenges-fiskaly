import { Stack, Typography } from "@mui/material";
import { useCustomers } from "../api";

export const CustomersTable = (): JSX.Element => {
  const { data: customers } = useCustomers();

  return (
    <Stack>
      {customers?.map(({ mail }, index) => {
        return (
          <Typography key={index}>{mail}</Typography>
        )
      })}
    </Stack>
  )
}
