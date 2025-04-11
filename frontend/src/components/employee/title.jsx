import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Title(props) {
    const [title, setTitle] = useState(props.title);
    const handleChange = (event) => {
        setTitle(event.target.value);
        props.onTitleChange(event.target.value);
    }
    useEffect(() => {
        setTitle(props.title);
    }, [props.title]);

    return ( 
        <Box sx={{ minWidth: props.minwidth }}>
            <FormControl fullWidth>
                <InputLabel>Title</InputLabel>
                <Select
                value={title}
                label="title"
                onChange={handleChange}
                fullWidth
                sx={{
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#6750A4',
                    borderWidth: '2px',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4f3c90',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4f3c90',
                  },
                }}
                >
                    <MenuItem value={'ClientManager'}>Client Manager</MenuItem>
                    <MenuItem value={'CustomerServiceManager'}>Customer Service Manager</MenuItem>
                </Select>
                
            </FormControl>
        </Box>
     );
}

export default Title;