import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useCustomers } from "../api";
import { CONTENT_MAX_WIDTH, MAIN_COLOR } from "../utils/constants";
import { SearchBar } from "./SearchBar";
import { useState } from "react";

export const CustomersTable = (): JSX.Element => {
  const { data: customers, isLoading, isError } = useCustomers();

  const [searchTerm, setSearchTerm] = useState('')

  const handleOnSearch = (searchEntry: string) => {
    setSearchTerm(searchEntry)
  }

  if (isError) {
    return (
      <Box p={10}>
        <Typography>Error happened</Typography>
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box p={10}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    )
  }

  const filteredResult = customers?.filter(({ lastName }) => {
    return searchTerm === '' ? true : lastName.indexOf(searchTerm) !== -1
  })

  return (
    <Stack p={4} gap={1} sx={{ maxWidth: CONTENT_MAX_WIDTH }}>
      <SearchBar handleOnSearch={handleOnSearch}/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{
            backgroundColor: MAIN_COLOR,
          }}>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResult?.length !== 0 ? filteredResult?.map(({ firstName, lastName, mail, id }) => (
              <TableRow key={id}>
                <TableCell>{firstName}</TableCell>
                <TableCell>{lastName}</TableCell>
                <TableCell>{mail}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography>No results found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}
