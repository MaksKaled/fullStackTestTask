import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './tables.css'

function DirectorsTable() {
  const columnDefs = [
    { headerName: 'id', field: 'id',width: 50 },
    { headerName: 'name', field: 'name',width: 150 },
    { headerName: 'birth Date', field: 'birth_date' ,width: 110,
        valueFormatter: (params) => {
            
            if (params.value) {
              const date = new Date(params.value);
              if (!isNaN(date.getTime())) {
                return date.toISOString().split('T')[0]; 
              }
            }
            return ''; 
          }
    },
    { headerName: 'nationality', field: 'nationality',width: 100 },
    { headerName: 'experience Years', field: 'experience_years',width: 130 },
    { headerName: 'rating', field: 'rating',width: 70 }
  ];

  const datasource = {
    getRows: (params) => {

      const { startRow, endRow } = params;
      console.log(startRow,endRow)


      const limit = endRow - startRow; 
      const offset = startRow; 


      fetch(`http://localhost:3000/api/directors?limit=${limit}&offset=${offset}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          params.successCallback(data.data,data.total); 
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          params.failCallback(); 
        });
    }
  };

  return (
   
      <div className="ag-theme-alpine directors-table">
        <AgGridReact
          columnDefs={columnDefs}
          rowModelType={'infinite'}
          cacheBlockSize={10}
          maxBlocksInCache={6}
          blockLoadDebounceMillis={200}
          cacheOverflowSize={1}
          datasource={datasource}
          getRowId={(params) => params.data.id.toString()}
        />
      </div>

  );
}

export default DirectorsTable;
