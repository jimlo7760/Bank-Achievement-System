import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Position(props) {
    const [position, setPosition] = useState(props.position);
    const handleChange = (event) => {
        setPosition(event.target.value);
        props.onPositionChange(event.target.value);
    };

    useEffect(() => {
        setPosition(props.position);
    }, [props.position]);

    return ( 
        <Box sx={{ minWidth: props.minwidth }}>
            <FormControl fullWidth>
                <InputLabel>Branch</InputLabel>
                <Select
                labelId="branch-label"
                label="Branch"
                value={position}
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
                    <MenuItem value={'Troy'}>Troy</MenuItem>
                    <MenuItem value={'Albany'}>Albany</MenuItem>
                </Select>
            </FormControl>
        </Box>
     );
}

export default Position;