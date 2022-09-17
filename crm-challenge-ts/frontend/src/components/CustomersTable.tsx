import {
  Box, Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Tooltip,
  Typography
} from "@mui/material";
import { isResponseError, useAddTssToCustomer, useCustomers } from "../api";
import { CONTENT_MAX_WIDTH, MAIN_COLOR } from "../utils/constants";
import { SearchBar } from "./SearchBar";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface CustomersTableProps {
  handleErrorNotification: (error: string) => void
  handleSuccessNotification: (message: string) => void
}

export const CustomersTable = ({ handleErrorNotification, handleSuccessNotification }: CustomersTableProps ): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: customers, isLoading, isError } = useCustomers();
  const { mutate: addTssToCustomer } = useAddTssToCustomer((data) => {
    if (isResponseError(data)) {
      handleErrorNotification(data.error);
    } else {
      handleSuccessNotification(`New TSS ${data.tssId} was added to the customer ${data.customerId}`);
    }
  });

  const handleOnSearch = (searchEntry: string) => {
    setSearchTerm(searchEntry)
  }

  const handleAddTssToCustomer = async (customerId: string) => {
    await addTssToCustomer({
      customerId,
      tssId: uuidv4(),
    });
  }

  const renderTsss = (tsss: string[]) => {
    const renderTooltipContent = () => {
      return tsss.map((tss) => (
        <div>{tss}</div>
      ))
    }
    return tsss.length === 0 ? (
      <Typography variant="subtitle2">--</Typography>
    ) : (
      <Tooltip placement="top" title={renderTooltipContent()}>
       <Typography>{tsss.length}</Typography>
      </Tooltip>
    )
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
              {/* TODO: changed naming after figuring out what TSS is that */}
              <TableCell align="center">
                <Typography variant="subtitle2">Connected TSSs count</Typography>
                <Typography variant="subtitle2">(hover the number to see the details)</Typography>
              </TableCell>
              <TableCell>Add random TSS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResult?.length !== 0 ? filteredResult?.map(({ firstName, lastName, mail, id, tsss }) => (
              <TableRow key={id}>
                <TableCell>{firstName}</TableCell>
                <TableCell>{lastName}</TableCell>
                <TableCell>{mail}</TableCell>
                <TableCell align="center">{renderTsss(tsss)}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleAddTssToCustomer(id)}>Add TSS</Button>
                </TableCell>
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
