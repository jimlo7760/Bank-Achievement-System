import { useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { zhCN } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/zh-cn';

import '../../App.css';


function SubmitDate(props) {
    const [date, setDate] = useState(props.date);
    const handleDateChange = (date) => {
        setDate(date);
        props.onDateChange(date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} localeText={zhCN.components.MuiLocalizationProvider.defaultProps.localeText} adapterLocale='zh-cn'>
            <DatePicker defaultValue={date} onChange={handleDateChange} sx={{minWidth: props.minwidth}}/>
        </LocalizationProvider>
    );
}

export default SubmitDate;