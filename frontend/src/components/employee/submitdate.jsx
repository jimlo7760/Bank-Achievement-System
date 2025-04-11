import { useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import '../../App.css';


function SubmitDate(props) {
    const [date, setDate] = useState(props.date);
    const handleDateChange = (date) => {
        setDate(date);
        props.onDateChange(date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker defaultValue={date} onChange={handleDateChange} //sx={{minWidth: props.minwidth}}
            slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    minWidth: props.minwidth,
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
                    '& .MuiInputLabel-root': {
                      color: '#6750A4',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#4f3c90',
                    },
                  },
                }
              }}
            />
        </LocalizationProvider>
    );
}

export default SubmitDate;