import { CustomersTable } from "../components/CustomersTable";
import { useLocation, } from "react-router-dom";
import { Alert } from "@mui/material";
import { useState } from "react";

export const CustomersOverviewPage = (): JSX.Element => {

  const { state } = useLocation();
  const [displayNotification, setDisplayNotification]  = useState(state?.newCustomerWasAdded ?? false)

  const handleCloseNotification = () => {
    setDisplayNotification(false)
  }
  return (
    <>
      {displayNotification && (
        <Alert onClose={handleCloseNotification}>The new customer was successfully added!</Alert>
      )}
      <CustomersTable />
    </>

  )
}
