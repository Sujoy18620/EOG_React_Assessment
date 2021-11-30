import { createSelector } from "reselect";
import { AppState } from "../../store";
import { ChartData } from "../Chart/Chart.types";
import { Filter } from "./Filters.types";

const getAppState = (state: AppState) => state;

export const getFilters = createSelector(getAppState, (state) => state.filters.list);

export const getSelectedFilter = createSelector(getFilters, (filters: Filter[]) => filters.filter(m => m.selected));

export const getChartData = (state: AppState) => state.chart;

export const getLatestChartData = createSelector(getAppState, (state) => {
  const { filters, chart } = state;
  const { list: filterList } = filters;
  const result: ChartData = {};
  filterList.forEach(filter => {
    const points = chart[filter.title]?.points;
    console.log(points);
    // result[filter.title] = measurement && measurement.size() ? measurement.atLast().get("value") : '';
    result[filter.title] = points?.length ? points[points.length - 1][1] : '';
  });
  return result;
});