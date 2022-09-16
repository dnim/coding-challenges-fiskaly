import { Grid, Stack } from "@mui/material";
import { Menu } from "./Menu";
import { Route, Routes, Navigate } from "react-router-dom";
import { CustomersOverviewPage } from "../pages/CustomersOverviewPage";
import { AddCustomerPage } from "../pages/AddCustomerPage";
import { AppRoutes } from '../pages/routes'
import { MAIN_COLOR } from "../utils/constants";

export const MainLayout = (): JSX.Element => {
  return (
    <Grid container sx={{
      height: '100%',
    }} spacing={2}>
      <Grid item xs={2} sx={{
        backgroundColor: MAIN_COLOR
      }}>
        <Menu />
      </Grid>
      <Grid item xs={10}>
        <Stack>
          <Routes>
            <Route path="/" element={ <Navigate to={AppRoutes.customers} /> } />
            <Route path={AppRoutes.customers} element={<CustomersOverviewPage />}/>
            <Route path={AppRoutes.addCustomer} element={<AddCustomerPage />}/>
          </Routes>
        </Stack>
      </Grid>
    </Grid>
  )
}
