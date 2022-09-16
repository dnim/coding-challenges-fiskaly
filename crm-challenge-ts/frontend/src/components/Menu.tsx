import { List, ListItem, Stack, Typography } from "@mui/material";
import { styled } from '@mui/system';
import { NavLink } from "react-router-dom";

export const Menu = (): JSX.Element => {

  const getStyle = ({ isActive }: { isActive: boolean }) => {
    return isActive ? { color: 'grey', fontWeight: 'bold' } : { color: 'black', fontSize: '1em', fontWeight: 'normal' }
  }

  return (
    <Stack alignItems="start" p={2}>
      <Typography variant="h5">Customers</Typography>
      <nav style={{ paddingLeft: 20 }} aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <StyledNavLink
              to="/customers/list"
              style={getStyle}
            >
              Overview
            </StyledNavLink>
          </ListItem>
          <ListItem disablePadding>
            <StyledNavLink
              to="/customers/add"
              style={getStyle}
            >
              Add customer
            </StyledNavLink>
          </ListItem>
        </List>
      </nav>
    </Stack>
  )
}

const StyledNavLink = styled(NavLink)({
  textDecoration: 'none',
  fontWeight: 'bolder',
  paddingBottom: 10,
});
