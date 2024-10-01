import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
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
                if (params.value) {
                    const luxonDateTime = DateTime.fromISO(params.value).setZone('local');
                    return luxonDateTime.toLocaleString(DateTime.DATE_SHORT);
                }
                return '';
            },
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