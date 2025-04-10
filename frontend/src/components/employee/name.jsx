import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function SubmitName(props) {
    const [name, setName] = useState(props.name);
    const handleSubmit = (event) => {
        setName(event.target.value);
        props.onSubmit(name);
    }
    useEffect(() => {
        setName(props.name);
    }, [props.name]);

    return ( 
        <Box
        component="form"
        sx={{ minWidth: props.minwidth }}
        noValidate
        autoComplete="off"
        >
            <TextField
                label="Name"
                value={name}
                onChange={handleSubmit}
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      '& fieldset': {
                        borderColor: '#6750A4',
                        borderWidth: '2px',
                      },
                      '&:hover fieldset': {
                        borderColor: '#4f3c90',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#4f3c90',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#4f3c90',
                    },
                  }}
            />
        </Box>
     );
}

export default SubmitName;