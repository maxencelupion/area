import {TextField} from '@mui/material';
import {FaSearch} from "react-icons/fa";

export default function SearchBar({setSearchInput}) {

  return (
      <TextField
        variant="outlined"
        placeholder={"Search for services.."}
        onChange={element => setSearchInput(element.target.value)}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: '#none',
            },
            '&:hover fieldset': {
              border: '2px solid #FF0054',
              borderRadius: '20px',
            },
            '&.Mui-focused fieldset': {
              border: '2px solid #FF0054',
              borderRadius: '20px',
            },
          },
          '& input': {
            color: 'white',
          },
          backgroundColor: 'rgba(31, 59, 87, 1)',
          borderRadius: '20px',
        }}
        InputProps={{
          startAdornment: (
            <div style={{marginRight: '8px', color: 'white', display: 'flex', alignItems: 'center'}}>
              <FaSearch/>
            </div>
          ),
        }}
      />
  )
}