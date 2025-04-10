import { useState,  useEffect } from 'react';
import { DataGrid, zhCN } from '@mui/x-data-grid';
import CustomeToolBar from './customToolbar';
import axios from 'axios';
import dayjs from 'dayjs';

import GeneralQuestionFrame from '../employee/general_question_frame';
import SubmitDate from '../employee/SubmitDate';

function DataTable(props) {
    const columns = [
        { field: 'name', headerName: 'Name', width:80 },
        { field: 'title', headerName: 'Title', width: 100 },
        { field: 'position', headerName: 'Branch', width: 130 },
        { field: 'score', headerName: 'Score', width: 90 },
    ];
    const [visible_columns, setVisibleColumns] = useState({
        name: true,
        title: true,
        position: true,
        score: true,
    });

    const min_wdith = 250;
    const [max_date, setMaxDate] = useState(dayjs());
    const [min_date, setMinDate] = useState(dayjs().subtract(7, 'day'));

    const [rows, setRows] = useState([]);
    useEffect(() => {
        axios.get('https://sdd-test-project-cma8b0b7ayc4duhx.canadacentral-01.azurewebsites.net//data?min_date=' + min_date.format('YYYY-MM-DD') + '&max_date=' + max_date.format('YYYY-MM-DD'), {
            withCredentials: true
        }).then((response) => {
            if (response.data.result === "OK") {
                // for every tow, set a unique id
                let data = response.data.data;
                let new_rows = [];
                for (let i = 0; i < data.length; i++) {
                    let row = data[i];
                    row.id = i;
                    new_rows.push(row);
                }
                setRows(new_rows);
            } else {
                alert(response.message.data.data);
            }
        });
    }, [min_date, max_date]);

    return ( 
        <div style={{ height: 550 }}>
            <GeneralQuestionFrame type='admin' question='Start Date' input={<SubmitDate date={min_date} onDateChange={setMinDate} minwidth={min_wdith} />} />
            <GeneralQuestionFrame type='admin' question='End Date' input={<SubmitDate date={max_date} onDateChange={setMaxDate} minwidth={min_wdith} />} />
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 20, 50]}
                slots={{toolbar: CustomeToolBar}}
                columnVisibilityModel={visible_columns}
                onColumnVisibilityModelChange={(newModel) => {
                    setVisibleColumns(newModel);
                }}
            />
        </div>
     );
}

export default DataTable;