import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

function BranchComparisonTable({ minDate, maxDate }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('/branch_compare', {
      params: {
        min_date: minDate.format('YYYY-MM-DD'),
        max_date: maxDate.format('YYYY-MM-DD'),
      }
    }).then(res => {
      const data = res.data.data.map((item, index) => ({
        id: index,
        position: item.position,
        score: item.score
      }));
      setRows(data);
    }).catch(err => console.error('Fetch error', err));
  }, [minDate, maxDate]);

  const columns = [
    { field: 'position', headerName: 'Branch', flex: 1 },
    { field: 'score', headerName: 'Score', flex: 1 },
  ];
  console.log("✅ BranchComparisonTable loaded with:", rows);

  return (
    <DataGrid
    rows={rows}
    columns={columns}
    pageSizeOptions={[10]}
    sx={{
        height: 400, 
        '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#f6f0fd',
        color: '#4f3c90',
        fontWeight: 'bold',
        },
        '& .MuiDataGrid-toolbarContainer .MuiButtonBase-root': {
        color: '#4f3c90',
        },
    }}
    />

  );
}

export default BranchComparisonTable;
