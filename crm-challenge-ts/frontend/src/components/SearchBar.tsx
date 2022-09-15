import { TextField } from "@mui/material";

export const SearchBar = ({ handleOnSearch }: { handleOnSearch: (searchTerm: string) => void }): JSX.Element => {
  return (
    <TextField onChange={(event) => handleOnSearch(event.target.value) } fullWidth label="Search for a customer..." id="searchBar"/>
  )
}
