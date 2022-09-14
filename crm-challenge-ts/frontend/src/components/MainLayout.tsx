import { Grid, Stack } from "@mui/material";
import { Menu } from "./Menu";
import { Route, Routes } from "react-router-dom";
import { CustomersOverviewPage } from "../pages/CustomersOverviewPage";
import { AddCustomerPage } from "../pages/AddCustomerPage";
import { AddTssToCustomerPage } from "../pages/AddTssToCustomerPage";

export const MainLayout = (): JSX.Element => {
  return (
    <Grid container sx={{
      height: '100%',
    }} spacing={2}>
      <Grid item xs={3}>
        <Menu />
      </Grid>
      <Grid item xs={9} sx={{
        backgroundColor: 'yellow'
      }}>
        <Stack>
          <Routes>
            <Route path="/customers/list" element={<CustomersOverviewPage />}/>
            <Route path="/customers/add" element={<AddCustomerPage />}/>
            <Route path="/customers/tss-add" element={<AddTssToCustomerPage />}/>
          </Routes>
        </Stack>
      </Grid>
    </Grid>
  )
}
