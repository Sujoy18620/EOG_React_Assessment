import React from 'react';
import { Box, CircularProgress, Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Filter } from '../../Features/Filters/Filters.types';
import useStyles from './FiltersPanel.styles';
import { filterColors } from './constants';
import { ChartData } from '../../Features/Chart/Chart.types';

interface FiltersPanelProps {
  filters: Filter[],
  selectedFilters: Filter[],
  chartData: ChartData,
  onChange: (event: any, values: any) => void
}

const FiltersPanel = ({ filters, selectedFilters, chartData, onChange }: FiltersPanelProps) => {

  const classes = useStyles();

  return (
    <Box className={classes.filterPanel}>
      <Autocomplete
        className={classes.filtersDropdown}
        options={filters.map(m => m.title)}
        getOptionLabel={(option: any) => option}
        renderInput={(params: any) => (
          <TextField {...params} variant="outlined" label="Filters" placeholder="Select..." />
        )}
        onChange={onChange}
        multiple
      />
      {selectedFilters && selectedFilters.length > 0 && (
        <Grid container spacing={2}>
          {
            selectedFilters.map((filter, i) => (
              <Grid key={i} item xs={2}>
                <Box className={classes.filterCard} style={{ color: filterColors[i] }}>
                  <h4 className={classes.filterTitle}>{filter.title}</h4>
                  <h4 className={classes.filterValue}>{
                    chartData[filter.title] === ''
                      ? <CircularProgress />
                      : chartData[filter.title]
                  }</h4>
                </Box>
              </Grid>
            ))
          }
        </Grid>
      )}
    </Box>
  );
}

export default FiltersPanel;
