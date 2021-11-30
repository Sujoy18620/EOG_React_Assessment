import { createSlice, PayloadAction } from 'redux-starter-kit';
import { produce } from 'immer';
// import { timeSeries, TimeSeries } from 'pondjs';
import { ChartData, ChartDataPoint, ChartDataResponse } from './Chart.types';

const initialState: ChartData = {};

const slice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setChartData: (state, { payload }: PayloadAction<ChartDataResponse[]>) => {
      return produce(state, draftState => {
        draftState = payload.reduce((items, item) => {
          const { metric, measurements } = item;
          const points = measurements.map(m => [m.at, m.value, m.unit]);
          // const series = timeSeries({
          //   name: metric,
          //   columns: ["time", "value", "unit"],
          //   points
          // });
          const series = {
            name: metric,
            columns: ["time", "value", "unit"],
            points
          };
          items[metric] = series;
          return items;
        }, draftState);
        return draftState;
      });
    },
    updateChartData: (state, { payload }: PayloadAction<ChartDataPoint[]>) => {
      return produce(state, draftState => {
        payload && payload.forEach(item => {
          const { metric, at, value, unit } = item;
          // const series = timeSeries({
          //   name: metric,
          //   columns: ["time", "value", "unit"],
          //   points: [[at, value, unit]]
          // });
          const series = {
            name: metric,
            columns: ["time", "value", "unit"],
            points: [[at, value, unit]]
          };
          if (!draftState[metric]) {
            draftState[metric] = series;
          } else {
            draftState[metric].points.push(...series.points);
            // draftState[metric] = TimeSeries.timeSeriesListMerge({
            //   name: metric,
            //   seriesList: [series, draftState[metric]]
            // });
          }
        });
        return draftState;
      });
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
