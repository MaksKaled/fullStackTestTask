import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PropTypes from 'prop-types';

const MoviesTable = ({movies,setSelectedMovieId}) => {
    
    const onRowSelected = (event) => {
        
        const selectedMovieId = event.node.isSelected() ? event.data.id : null;
    
        setSelectedMovieId((prevSelectedMovieId) => {
            if (prevSelectedMovieId === selectedMovieId) {
                event.api.deselectAll(); 
                return null; 
            }
            return selectedMovieId;
        });
    };
    

    const columnDefs = [
        {headerName:'id',field:'id',width:50},
        {headerName:'title',field:'title',width:110},
        {headerName:'release date',field:'release_date',width:110,
            valueFormatter: (params) => {
                if(params.value){
                    const date = new Date(params.value);
                    if(!isNaN(date.getTime())){
                        return date.toISOString().split('T')[0]
                    }
                }
                return '';
            }
        },
        {headerName:'budget',field:'budget',width:120},
        {headerName:'duration (min)',field:'duration_minutes',width:100},
        {headerName:'director ID',field:'director_id',width:95}
    ];

    const datasource = {
        getRows: (params) => {
            const {startRow,endRow} =params;

            const rowThisPage = movies.slice(startRow,endRow);
            const lastRow = movies.length;

            params.successCallback(rowThisPage,lastRow)
            // const limit = endRow - startRow;
            // const offset = startRow
                // fetch(`http://localhost:3000/api/movies/?limit=${limit}&offset=${offset}`)
                // .then((response) => {
                //     if(!response.ok){
                //         throw new Error('network response was not ok');
                //     }
                //     return response.json()
                // })
                // .then((data)=>{
                //     params.successCallback(data.data,data.total);
                // })
                // .catch((error)=>{
                //     console.error('error fetching data: ',error);
                //     params.failCallback();
                // })
            }
            
        }

        
  return (
    <div className='ag-theme-alpine movies-table'>
        <AgGridReact
        columnDefs={columnDefs}
        rowModelType={'infinite'}
        cacheBlockSize={5}
        maxBlocksInCache={6}
        blockLoadDebounceMillis={200}
        cacheOverflowSize={1}
        datasource={datasource}
        getRowId={(params) => params.data.id.toString()}
        onRowClicked={onRowSelected}
        rowSelection={'single'}

        />
       
    </div>
  )
}

MoviesTable.propTypes = {
    setSelectedMovieId: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired,
    
};

export default React.memo(MoviesTable)