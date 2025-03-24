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
            />
        </Box>
     );
}

export default SubmitName;