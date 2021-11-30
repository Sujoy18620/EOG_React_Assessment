import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'urql';
import FiltersPanel from '../../components/FiltersPanel';
import { actions } from './Filters.reducer';
import { getFilters, getLatestChartData, getSelectedFilter } from './Filters.selectors';

const query = `{
  getMetrics
}`;

const FiltersContainer = () => {
  const filters = useSelector(getFilters);
  const selectedFilters = useSelector(getSelectedFilter);
  const chartData = useSelector(getLatestChartData);
  const dispatch = useDispatch();
  const [result] = useQuery({ query });
  const { fetching, data, error } = result;

  const handleChange = (_: any, values: any) => dispatch(actions.filtersApplied(values))

  useEffect(() => {
    if (!error && data) {
      const { getMetrics } = data;
      dispatch(actions.filtersSuccess(getMetrics));
    } else {
      dispatch(actions.filtersFailure({ error: error?.message || '' }));
    }
    // eslint-disable-next-line
  }, [data, error]);

  return (
    fetching
      ? <CircularProgress />
      : <FiltersPanel
        filters={filters}
        selectedFilters={selectedFilters}
        chartData={chartData}
        onChange={handleChange}
      />
  )

}

export default FiltersContainer;
