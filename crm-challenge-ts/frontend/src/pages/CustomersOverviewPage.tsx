import { CustomersTable } from "../components/CustomersTable";
import { useLocation, } from "react-router-dom";
import { Alert, Stack } from "@mui/material";
import { useState } from "react";

export const CustomersOverviewPage = (): JSX.Element => {

  const { state } = useLocation();
  const [displayNotification, setDisplayNotification]  =
    useState<string | undefined>(state?.successfulNotification ?? undefined)
  const [displayErrorNotification, setDisplayErrorNotification]  = useState<string | undefined>(undefined)

  const handleCloseNotification = () => {
    setDisplayNotification(undefined);
    setDisplayErrorNotification(undefined);
    window.history.replaceState({}, document.title);
  }

  const handleErrorNotification = (error: string) => {
    setDisplayErrorNotification(error);
  }

  const handleSuccessNotification = (message: string) => {
    setDisplayNotification(message);
  }

  return (
    <Stack maxWidth={840}>
      {displayNotification && (
        <Alert severity="success" onClose={handleCloseNotification}>{displayNotification}</Alert>
      )}
      {displayErrorNotification && (
        <Alert severity="error" onClose={handleCloseNotification}>{displayErrorNotification}</Alert>
      )}
      <CustomersTable handleErrorNotification={handleErrorNotification} handleSuccessNotification={handleSuccessNotification} />
    </Stack>
  )
}
